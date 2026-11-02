// Glosario — motor. Después de dibujar una sección:
//  1) agrega a cada .formula una leyenda visible con el nombre y el concepto de cada variable;
//  2) marca siglas y símbolos en el texto (definición al pasar el cursor o al tocar) y expande cada sigla la primera vez que aparece en la sección.
// Un MutationObserver repite el paso 2 en lo que los laboratorios y el simulacro vuelven a dibujar.
(function () {
  'use strict';
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const BL = '(?<![\\p{L}\\p{N}_*¥$ᵉ])', BR = '(?![\\p{L}\\p{N}_*ᵉ\\u0303])'; // ̃ = tilde combinante de k̃
  const OP = '=+−·×÷/^≈<>≥≤';
  // Palabra antes de una letra que la vuelve un nombre, no una variable: "país A", "Basilea I", "siglo X".
  const PRE_NAME = /(?:^|[\s(])(?:pa[ií]s(?:es)?|pobres?|ricos?|bancos?|empresas?|grupos?|clases?|tipos?|planes?|plan|series?|fondos?|casos?|opci[oó]n|opciones|fases?|etapas?|partes?|basilea|mundial|cap[ií]tulo|tier|l[aá]mina|anexo|exhibit|secci[oó]n|escenarios?|perfil(?:es)?|versi[oó]n|siglo|tomo|inciso|equipo|mundo|modelos?|generaci[oó]n)\s+$/iu;
  // ¿Esta letra suelta es una variable? Se decide por su contexto en el texto.
  const isSymbol = (k, s, i, node) => {
    const before = s.slice(0, i), after = s.slice(i + k.length);
    const prev = before.trimEnd().slice(-1), next = after.trimStart().slice(0, 1);
    if (k === 'I' && after.startsWith('+D')) return false;                   // I+D
    if (k === 'E' && after.startsWith('(')) return false;                    // E(Δe): valor esperado
    if (/^\/o\b/.test(after)) return false;                                  // y/o
    if (/[’'´]$/.test(before)) return false;                                 // Moody's
    if (/[-‑&]$/.test(before) || /^[-‑&]\p{L}/u.test(after)) return false;   // T-bills, R&D
    if (k === 't' && before.endsWith('/')) return false;                     // $85/t: toneladas
    if (/\.$/.test(before) || /^\.\p{L}/u.test(after) || after.startsWith('º')) return false; // U.S., i.e., n.º
    if (/^\s*·\s*(y\b|crece)/.test(after)) return false;                     // "A · y hoy": país A
    if (/^\s+(y|o|vs\.?|contra)\s+B\b/.test(after)) return false;            // "A y B": países
    if (PRE_NAME.test(before)) return false;
    if (k.length === 1 && /\p{Lu}/u.test(k) && /^\.\s+\p{Lu}/u.test(after) && /\p{Lu}\.\s*$/u.test(before)) return false; // J. P. Morgan
    const isOp = (prev && OP.includes(prev) && !(k === 'y' && prev === '≈')) || (next && OP.includes(next) && !(k === 'y' && next === '≈'));
    if (k === 'y') return isOp || (/(?:^|[\s(])[\p{L}α-ω][₀-₉*]?,\s*$|\(\s*$/u.test(before) && /[,)]/.test(next)) || /^\s+y\s/.test(after) && !/\p{L}\s*$/u.test(before); // conjunción salvo "(k, y)" o "y y s·y"
    if (isOp) return true;
    if (/^\p{Ll}$/u.test(k)) {
      if (/\d\s*$/.test(before)) return false;                               // 5 g, 10 m: unidades
      if (next === ')' && !before.includes('(')) return false;               // incisos: "b) algo"
      return true;
    }
    if (k === 'M' && /(?:mil|millones|\$)\s*$/i.test(before)) return false;  // US$50 mil M
    if (k === 'A' && /^\s+crece más hoy/.test(after)) return false;          // laboratorio: país A
    if (k === 'A' || k === 'Y' || k === 'E') {                               // también son palabras: sólo a media oración son variables
      if (!prev || /[.!?¿¡:;→•]/.test(prev)) return /^\s+(crece|crecen|sube|suben|baja|bajan|cae|caen|aumenta|cambia)\b/.test(after);
    }
    return true;
  };

  // ---------------------------------------------------- texto de una fórmula con sub/superíndices normalizados
  const formulaText = (el) => {
    const c = el.cloneNode(true);
    c.querySelectorAll('.fvars,.nm').forEach((x) => x.remove());
    c.querySelectorAll('sub').forEach((x) => x.replaceWith(document.createTextNode('_' + x.textContent)));
    c.querySelectorAll('sup').forEach((x) => { const t = x.textContent.trim(); x.replaceWith(document.createTextNode(t === '*' ? '*' : t === 'e' || t === 'ᵉ' ? 'ᵉ' : t === 'd' ? 'ᵈ' : ` ^ ${t} `)); });
    c.querySelectorAll('.frac>span').forEach((x) => x.append(' '));
    return c.textContent;
  };

  const tokenRe = (k) => new RegExp(BL + esc(k) + BR, 'u');
  // ¿qué entradas del diccionario aparecen en este texto? (orden de aparición; las más largas se quedan con el texto)
  const findVars = (txt, dict) => {
    const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
    const found = []; let rest = txt;
    keys.forEach((k) => {
      const re = new RegExp(BL + esc(k) + BR, 'gu');
      let m, first = -1;
      while ((m = re.exec(rest))) { if (first < 0) first = m.index; }
      if (first >= 0) { found.push([k, first]); rest = rest.replace(re, (s) => ' '.repeat(s.length)); }
    });
    return found.sort((a, b) => a[1] - b[1]).map((x) => x[0]);
  };

  const row = (k, n, d) => `<div class="fv"><b>${k.replace(/_(.+)$/, '<sub>$1</sub>').replace(/ᵉ/g, '<sup>e</sup>').replace(/ᵈ/g, '<sup>d</sup>')}</b><span><i>${n}.</i> ${d}</span></div>`;

  // dedupe: dos claves con la misma definición y distinta grafía (i$ / i_$) no se repiten
  const legend = (el, dict) => {
    if (el.querySelector('.fvars')) return;
    const txt = formulaText(el);
    const ks = findVars(txt, dict);
    const sigs = (txt.match(new RegExp(BL + '[A-Z][A-Za-z&-]*[A-Z₂]' + BR, 'gu')) || []).filter((a) => E.SIG[a] && !dict[a] && !dict['Δ' + a]);
    const rows = ks.map((k) => row(k, dict[k][0], dict[k][1])).concat([...new Set(sigs)].map((a) => row(a, E.SIG[a].n, E.SIG[a].d)));
    if (!rows.length) return;
    el.insertAdjacentHTML('beforeend', `<div class="fvars">${rows.join('')}</div>`);
  };

  // ---------------------------------------------------- marcado de texto
  const SKIP = 'svg,canvas,textarea,input,select,option,script,style,.formula,.fvars,.glx,abbr.gl,output,.gl-no';
  const NOEXPAND = 'button,th,.tile,label,summary,a,h1,h2,h3,h4,h5,h6,.tl,.kh,.side,.badge,.kicker,.ty,.sec-head';
  const SIGKEYS = Object.keys(E.SIG).sort((a, b) => b.length - a.length);
  const SIGRE = new RegExp(`(?<![\\p{L}\\p{N}_-])(${SIGKEYS.map(esc).join('|')})(?![\\p{L}\\p{N}_])(?!-[\\p{L}])`, 'gu');
  const reCache = {};
  const varRe = (sec) => {
    if (reCache[sec]) return reCache[sec];
    const d = E.VARS[sec]; if (!d) return (reCache[sec] = null);
    const keys = Object.keys(d).filter((k) => !/ /.test(k) && !['Flujo', 'brecha', 'Duración', 'Emisiones', 'Daño', 'Prob', 'traslado'].includes(k)).sort((a, b) => b.length - a.length);
    return (reCache[sec] = new RegExp(`${BL}(${keys.map(esc).join('|')})${BR}`, 'gu'));
  };
  const ctx = { seen: new Set() };

  const sigFor = (a, sec) => (a === 'PRI' && sec === 'clima' ? { n: 'Principles for Responsible Investment', d: 'Principios de inversión responsable, respaldados por la ONU.' } : a === 'FA' && sec === 'flujos' ? E.SIG.FA : E.SIG[a]);

  const mark = (root, section) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (!n.nodeValue.trim() || n.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    const nodes = []; let w; while ((w = walker.nextNode())) nodes.push(w);
    nodes.forEach((node) => {
      const parent = node.parentElement, s = node.nodeValue;
      // en un contenedor flex o grid, cada elemento marcado se volvería una columna aparte
      if (/flex|grid/.test(getComputedStyle(parent).display)) return;
      const sec = (parent.closest('[data-sec]') || {}).dataset?.sec || section;
      const hits = [];
      let m; SIGRE.lastIndex = 0;
      while ((m = SIGRE.exec(s))) hits.push({ i: m.index, l: m[0].length, k: m[0], kind: 'sig' });
      const vr = parent.closest('sub') ? null : varRe(sec); // el subíndice de g_Y no es la variable Y
      if (vr) {
        vr.lastIndex = 0;
        while ((m = vr.exec(s))) {
          let k = m[0], key = k;
          if (k.length === 1 && !/[α-ωΔ]/.test(k) && !isSymbol(k, s, m.index, node)) continue;
          if (hits.some((h) => m.index < h.i + h.l && h.i < m.index + k.length)) continue;
          // g<sub>Y</sub>: la letra es parte de un símbolo con subíndice
          const nx = node.nextSibling;
          if (m.index + k.length === s.length && nx && nx.nodeName === 'SUB') {
            key = `${k}_${nx.textContent.trim()}`;
            if (!E.VARS[sec][key]) continue;
          }
          hits.push({ i: m.index, l: k.length, k: key, kind: 'var', sec });
        }
      }
      if (!hits.length) return;
      hits.sort((a, b) => a.i - b.i);
      const f = document.createDocumentFragment(); let p = 0;
      hits.forEach((h) => {
        if (h.i > p) f.append(s.slice(p, h.i));
        const def = h.kind === 'sig' ? sigFor(h.k, sec) : { n: E.VARS[h.sec][h.k][0], d: E.VARS[h.sec][h.k][1] };
        const ab = document.createElement('abbr');
        ab.className = 'gl'; ab.textContent = s.slice(h.i, h.i + h.l);
        ab.dataset.k = h.k; ab.dataset.n = def.n; ab.dataset.d = def.d;
        f.append(ab);
        if (h.kind === 'sig' && E.SIG[h.k].x !== 0 && !ctx.seen.has(h.k) && !parent.closest(NOEXPAND)) {
          ctx.seen.add(h.k);
          const first = def.n.toLowerCase().split(' ')[0];
          const ctxTxt = (parent.textContent || '').toLowerCase();
          if (!ctxTxt.includes(first) || first.length < 4) { const sp = document.createElement('span'); sp.className = 'glx'; sp.textContent = ` (${def.n})`; f.append(sp); }
        }
        p = h.i + h.l;
      });
      if (p < s.length) f.append(s.slice(p));
      node.replaceWith(f);
    });
  };

  // ---------------------------------------------------- popover
  const pop = document.createElement('div'); pop.id = 'glpop'; pop.setAttribute('role', 'tooltip'); pop.hidden = true; document.body.append(pop);
  let pinned = false;
  const show = (a) => {
    pop.innerHTML = `<b>${E.esc(a.dataset.k).replace(/_(.+)$/, '<sub>$1</sub>').replace(/ᵉ/g, '<sup>e</sup>').replace(/ᵈ/g, '<sup>d</sup>')}</b><div class="pn">${E.esc(a.dataset.n)}</div><div class="pd">${E.esc(a.dataset.d)}</div>`;
    pop.hidden = false;
    const r = a.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
    pop.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
    pop.style.top = (r.top - h - 8 < 60 ? r.bottom + 8 : r.top - h - 8) + 'px';
  };
  const hide = () => { pop.hidden = true; pinned = false; };
  document.addEventListener('mouseover', (e) => { const a = e.target.closest && e.target.closest('abbr.gl'); if (a && !pinned) show(a); });
  document.addEventListener('mouseout', (e) => { if (!pinned && e.target.closest && e.target.closest('abbr.gl')) pop.hidden = true; });
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('abbr.gl');
    if (a && !a.closest('button,a,summary')) { pinned = true; show(a); e.stopPropagation(); return; }
    if (!e.target.closest || !e.target.closest('#glpop')) hide();
  });
  document.addEventListener('scroll', () => { if (!pop.hidden) hide(); }, { passive: true });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });

  // ---------------------------------------------------- bloque de símbolos y siglas de un tema
  const sigsOf = (t) => Object.entries(E.SIG).filter(([k, v]) => v.t === t && k !== 'CO2');
  E.glosRows = (sec) => {
    const t = E.SEC_TOPIC[sec]; const seen = new Set();
    const vars = Object.entries(E.VARS[sec] || {}).filter(([k, v]) => { const id = v[0] + v[1]; if (seen.has(id)) return false; seen.add(id); return true; });
    return { vars, sigs: sigsOf(t) };
  };
  E.glosTemaHTML = (sec) => {
    const { vars, sigs } = E.glosRows(sec);
    return `<div class="gl-no"><h4 style="margin:0 0 6px">Símbolos</h4><div class="fvars open">${vars.map(([k, v]) => row(k, v[0], v[1])).join('')}</div><h4 style="margin:14px 0 6px">Siglas</h4><div class="fvars open">${sigs.map(([k, v]) => row(k, v.n, v.d)).join('')}</div></div>`;
  };

  // ---------------------------------------------------- entrada
  let mo = null;
  E.annotate = (root, sec) => {
    if (mo) mo.disconnect();
    ctx.seen = new Set();
    hide();
    if (E.VARS[sec]) root.insertAdjacentHTML('afterbegin', `<div class="gl-no gl-tema">${E.reveal('🔤 Símbolos y siglas de este tema', E.glosTemaHTML(sec))}</div>`);
    const dictFor = (el) => E.VARS[(el.closest('[data-sec]') || {}).dataset?.sec || sec] || null;
    root.querySelectorAll('.formula').forEach((f) => { const d = dictFor(f); if (d) legend(f, d); });
    const head = document.querySelector('.sec-head');
    if (head) mark(head, sec);
    mark(root, sec);
    mo = new MutationObserver((muts) => {
      mo.disconnect();
      muts.forEach((m) => m.addedNodes.forEach((n) => {
        if (n.nodeType === 3 && n.isConnected && n.parentElement && !n.parentElement.closest(SKIP)) { mark(n.parentElement, sec); return; } // texto plano de un laboratorio
        if (n.nodeType !== 1 || !n.isConnected || n.closest(SKIP)) return;
        const fs = n.matches('.formula') ? [n] : n.querySelectorAll('.formula');
        fs.forEach((f) => { const d = dictFor(f); if (d) legend(f, d); });
        mark(n, sec);
      }));
      mo.observe(root, { childList: true, subtree: true });
    });
    mo.observe(root, { childList: true, subtree: true });
  };
  E._gl = { formulaText, findVars };
})();
