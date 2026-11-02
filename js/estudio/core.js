// Central de estudio — núcleo compartido (window.E).
// Cada archivo de sección llama E.section({...}); boot.js arma la navegación y el router (#/id).
// Vanilla JS + ECharts (assets/echarts.min.js). Sin build. Portado de la Central de estudio de Análisis Financiero.
(function () {
  'use strict';
  const E = (window.E = {});

  // ---------------------------------------------------------------- formato
  const nf = (d) => new Intl.NumberFormat('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d });
  const NF = [0, 1, 2, 3].map(nf);
  const ok = (v) => v !== null && v !== undefined && isFinite(v);
  const z = (v, d) => (Math.abs(v) < 0.5 * Math.pow(10, -d) ? 0 : v); // evita "−0"
  E.fmt = {
    n: (v, d = 0) => (ok(v) ? NF[d].format(z(v, d)) : '—'),                        // 1,234
    pct: (v, d = 1) => (ok(v) ? NF[d].format(v * 100) + '%' : '—'),          // 0.123 -> 12.3%
    x: (v, d = 2) => (ok(v) ? NF[d].format(v) + 'x' : '—'),                  // 1.85x
    d: (v, d = 0) => (ok(v) ? NF[d].format(v) + ' días' : '—'),              // 45 días
    $: (v, d = 0) => (ok(v) ? (v < 0 ? '−$' : '$') + NF[d].format(Math.abs(v)) : '—'), // $1,234
    sgn: (v, d = 0) => (ok(v) ? (v > 0 ? '+' : v < 0 ? '−' : '') + NF[d].format(Math.abs(v)) : '—'), // +12 / −12
  };
  E.fmtBy = (kind, v, d) => (E.fmt[kind] || E.fmt.n)(v, d);

  // ---------------------------------------------------------------- html helpers (devuelven strings)
  E.frac = (n, d) => `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
  E.formula = (name, lhs, rhs, note) =>
    `<div class="formula">${name ? `<span class="nm">${name}</span>` : ''}<span class="eq">${lhs}</span><span>=</span><span>${rhs}</span>${note ? `<small>${note}</small>` : ''}</div>`;
  E.tip = (html, src) => `<div class="co tip"><b>Lo que dijo el profe</b>${html}${src ? `<span class="src">${src}</span>` : ''}</div>`;
  E.warn = (html) => `<div class="co warn"><b>Error común</b>${html}</div>`;
  E.kid = (html) => `<div class="co kid"><b>Explicado fácil</b>${html}</div>`;
  E.key = (html, title = 'Idea clave') => `<div class="co key"><b>${title}</b>${html}</div>`;
  E.note = (html, title = 'Nota') => `<div class="co note"><b>${title}</b>${html}</div>`;
  E.fig = (svg, caption, full) => `<figure class="fig${full ? ' full' : ''}">${svg}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
  E.reveal = (summary, html, open) => `<details class="reveal"${open ? ' open' : ''}><summary>${summary}</summary><div class="rb">${html}</div></details>`;
  E.badge = (kind) =>
    ({ in: '<span class="badge in">● Entra al examen</span>', star: '<span class="badge star">★ Pregunta que no falla</span>', out: '<span class="badge out">No entra al examen · para saber más</span>' }[kind] || '');
  E.link = (id, text) => `<a href="#/${id}">${text}</a>`;
  E.esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // ficha de concepto: E.concept({id, title, badge, html}) — html puede incluir <div class="cols">…</div>
  E.concept = ({ id, title, badge, html }) =>
    `<section class="concept"${id ? ` id="${id}"` : ''}><header><h3>${title}</h3>${badge ? E.badge(badge) : ''}</header>${html}</section>`;
  // crea un elemento a partir de html
  E.el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  E.$ = (sel, root = document) => root.querySelector(sel);
  E.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------------------------------------------------------------- tema / tokens
  E.T = {};
  E.readTheme = () => {
    const cs = getComputedStyle(document.documentElement);
    const g = (k) => cs.getPropertyValue('--' + k).trim();
    ['page', 'surface', 'card', 'ink', 'ink2', 'muted', 'axis', 'line', 'line2', 'grid', 'accent', 'accent-ink', 'accent-wash', 'good', 'bad', 'seq0', 'seq1', 'div-mid',
      'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'].forEach((k) => (E.T[k.replace('-', '_')] = g(k)));
    E.T.c = [E.T.c1, E.T.c2, E.T.c3, E.T.c4, E.T.c5, E.T.c6, E.T.c7, E.T.c8];
    return E.T;
  };

  // ---------------------------------------------------------------- gráficas (ECharts)
  // E.chart(el, (T) => option) -> {refresh(), inst}. Redibuja al cambiar tema y al cambiar tamaño.
  const charts = new Set();
  E.baseOpt = (T = E.T) => ({
    animationDuration: 350, animationDurationUpdate: 300,
    textStyle: { fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif', color: T.ink2 },
    grid: { left: 8, right: 16, top: 30, bottom: 8, containLabel: true },
    tooltip: { trigger: 'axis', backgroundColor: T.card, borderColor: T.line, textStyle: { color: T.ink, fontSize: 13 }, axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(127,127,127,.08)' } } },
    legend: { top: 0, left: 0, textStyle: { color: T.ink2, fontSize: 12 }, itemWidth: 12, itemHeight: 12, icon: 'roundRect' },
  });
  E.axisCat = (data, T = E.T, extra = {}) => ({ type: 'category', data, axisLine: { lineStyle: { color: T.axis } }, axisTick: { show: false }, axisLabel: { color: T.ink2, fontSize: 12, interval: 0, hideOverlap: true }, ...extra });
  E.axisVal = (T = E.T, fmt, extra = {}) => ({ type: 'value', splitLine: { lineStyle: { color: T.grid } }, axisLabel: { color: T.muted, fontSize: 11, formatter: fmt }, ...extra });
  E.chart = (el, fn) => {
    if (typeof el === 'string') el = document.querySelector(el);
    const inst = echarts.init(el, null, { renderer: 'canvas' });
    const c = { el, inst, fn, refresh() { if (!el.isConnected) return; inst.setOption(fn(E.T), true); } };
    c.refresh();
    const ro = new ResizeObserver(() => inst.resize());
    ro.observe(el);
    charts.add(c);
    return c;
  };
  E.disposeCharts = () => { charts.forEach((c) => { try { c.inst.dispose(); } catch (e) {} }); charts.clear(); };
  E.redrawAll = () => { E.readTheme(); charts.forEach((c) => c.refresh()); };

  // ---------------------------------------------------------------- knobs
  // E.knobs(container, defs, onChange, {title}) ; defs: [{k,label,min,max,step,v,fmt:'pct'|'x'|'d'|'$'|'n',dec,hint}]
  // Los valores 'pct' se guardan como fracción (0.35) y el slider trabaja en fracción.
  E.knobs = (container, defs, onChange, opts = {}) => {
    if (typeof container === 'string') container = document.querySelector(container);
    const st = {}; const base = {};
    const box = E.el(`<div class="knobs"><div class="kh"><span>${opts.title || '🎛️ Mueve las perillas'}</span><button class="btn sm" type="button">↺ Reiniciar</button></div></div>`);
    const rows = {};
    defs.forEach((d) => {
      st[d.k] = base[d.k] = d.v;
      const id = 'k' + Math.random().toString(36).slice(2, 8);
      const r = E.el(`<div class="knob"><label for="${id}">${d.label}</label><output></output><input id="${id}" type="range" min="${d.min}" max="${d.max}" step="${d.step}" value="${d.v}">${d.hint ? `<div class="hint">${d.hint}</div>` : ''}</div>`);
      const inp = r.querySelector('input'); const out = r.querySelector('output');
      const show = () => { out.textContent = E.fmtBy(d.fmt || 'n', st[d.k], d.dec ?? (d.fmt === 'pct' ? 1 : d.fmt === 'x' ? 2 : 0)); r.classList.toggle('changed', st[d.k] !== base[d.k]); };
      inp.addEventListener('input', () => { st[d.k] = +inp.value; show(); onChange && onChange({ ...st }, d.k); });
      rows[d.k] = { inp, show }; show(); box.appendChild(r);
    });
    box.querySelector('.kh button').addEventListener('click', () => { Object.keys(base).forEach((k) => { st[k] = base[k]; rows[k].inp.value = base[k]; rows[k].show(); }); onChange && onChange({ ...st }, null); });
    container.appendChild(box);
    const api = {
      el: box, get: () => ({ ...st }),
      set(vals, fire = true) { Object.entries(vals).forEach(([k, v]) => { if (k in st) { st[k] = v; rows[k].inp.value = v; rows[k].show(); } }); if (fire && onChange) onChange({ ...st }, null); },
    };
    onChange && onChange({ ...st }, null);
    return api;
  };

  // ---------------------------------------------------------------- tiles (indicadores)
  // E.tiles(container, [{label, v, fmt, dec, base, better:'up'|'down'|null, note, hl}])  -> redibuja el contenedor
  E.tiles = (container, items) => {
    if (typeof container === 'string') container = document.querySelector(container);
    container.classList.add('tiles');
    container.innerHTML = items.map((t) => {
      let delta = '';
      if (t.base !== undefined && ok(t.base) && ok(t.v) && Math.abs(t.v - t.base) > 1e-9) {
        const diff = t.v - t.base; const better = t.better === 'up' ? diff > 0 : t.better === 'down' ? diff < 0 : null;
        const txt = (diff > 0 ? '▲ ' : '▼ ') + E.fmtBy(t.fmt, Math.abs(diff), t.dec) + ' vs base';
        delta = `<div class="td ${better === null ? '' : better ? 'up' : 'dn'}">${txt}${better === null ? '' : better ? ' · mejor' : ' · peor'}</div>`;
      }
      return `<div class="tile${t.hl ? ' hl' : ''}"><div class="tl">${t.label}</div><div class="tv">${E.fmtBy(t.fmt, t.v, t.dec)}</div>${delta}${t.note ? `<div class="tn">${t.note}</div>` : ''}</div>`;
    }).join('');
  };

  // ---------------------------------------------------------------- quiz
  // E.quiz(container, [{q, o:[...], a:index, w:'por qué'}])
  E.quiz = (container, items) => {
    if (typeof container === 'string') container = document.querySelector(container);
    container.classList.add('quiz');
    items.forEach((it) => {
      const q = E.el(`<div class="qz"><div class="qq">${it.q}</div><div class="qo">${it.o.map((o, i) => `<button type="button" data-i="${i}">${o}</button>`).join('')}</div><div class="qw">${it.w || ''}</div></div>`);
      q.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
        q.querySelectorAll('button').forEach((x) => x.classList.remove('ok', 'ko'));
        const i = +b.dataset.i; b.classList.add(i === it.a ? 'ok' : 'ko'); q.querySelector(`button[data-i="${it.a}"]`).classList.add('ok'); q.classList.add('done');
      }));
      container.appendChild(q);
    });
  };

  // ---------------------------------------------------------------- tabla simple
  // E.table(rows, {head:[...], fmt:[fn|null...]}) -> html. rows: [[label, v1, v2...], ...] ; fila con {cls:'tot'} como último elemento
  E.table = (rows, { head, fmt = [], cls = '' } = {}) => {
    const long = (c) => typeof c === 'string' && c.replace(/<[^>]+>/g, '').length > 26;
    const body = (r) => (r[r.length - 1] && typeof r[r.length - 1] === 'object' && !Array.isArray(r[r.length - 1]) ? r.slice(0, -1) : r);
    const wrapCol = new Set(); rows.forEach((r) => body(r).forEach((c, i) => { if (long(c)) wrapCol.add(i); }));
    return `<div class="tblwrap"><table class="tbl ${cls}">${head ? `<thead><tr>${head.map((h, i) => `<th${wrapCol.has(i) ? ' class="wrap"' : ''}>${h}</th>`).join('')}</tr></thead>` : ''}<tbody>${rows.map((r) => {
      const meta = r[r.length - 1] && typeof r[r.length - 1] === 'object' && !Array.isArray(r[r.length - 1]) ? r[r.length - 1] : null; const cells = body(r);
      return `<tr${meta && meta.cls ? ` class="${meta.cls}"` : ''}>${cells.map((c, i) => `<td${wrapCol.has(i) ? ' class="wrap"' : ''}>${i && fmt[i] && typeof c === 'number' ? fmt[i](c) : c}</td>`).join('')}</tr>`; }).join('')}</tbody></table></div>`;
  };

  // ---------------------------------------------------------------- narrativa (línea de tiempo)
  // E.timeline([{y:'1945–73', t:'Título', d:'qué pasó y por qué importa'}, ...]) -> html
  E.timeline = (items) => `<ol class="tline">${items.map((i) => `<li><span class="ty">${i.y}</span><div><b>${i.t}</b>${i.d ? `<p>${i.d}</p>` : ''}</div></li>`).join('')}</ol>`;

  // ---------------------------------------------------------------- bancos compartidos: cada tema aporta, Simulacro/Noticias/Repaso consumen
  E.bank = [];    // {topic:'S1', q, o:[4 opciones], a:índice, w:'por qué'} — opción múltiple
  E.essays = [];  // {topic:'S1', type:'caso'|'noticia', prompt, tools:['...'], outline:['...'], model:'≈350 palabras'}
  E.news = [];    // {topic:'S1', date:'2026-10-28', title, source, url, tool:'herramienta del curso', read:'interpretación con la herramienta'}
  E.repaso = [];  // {topic:'S1', icon:'📈', title, items:[['Concepto', 'definición o fórmula en una línea'], ...]}

  // ---------------------------------------------------------------- secciones
  E.sections = [];
  // E.section({id, n, group, title, short, lead, exam:'in'|'star'|'out'|null, render(root)})
  E.section = (s) => { E.sections.push(s); };
  E.GROUPS = [
    ['inicio', 'Empieza aquí'], ['temas', 'Los 7 temas'], ['examen', 'Para el examen'],
  ];

})();
