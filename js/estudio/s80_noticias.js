// Sección 80 — Noticias: las de Canvas (E.canvasNews) con filtros por tema y fecha, ensayos de práctica, y las anteriores (E.news) sólo para contexto.
(function () {
  const TOPICS = [['S1', '📈 Crecimiento'], ['S2', '🌐 Flujos'], ['S3', '🏛️ Fiscal'], ['S4', '🏦 Monetaria'], ['S5', '💱 Cambio'], ['S6', '🏧 Bancos'], ['S7', '🌡️ Clima']];
  const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const fecha = (d) => { const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(d || ''); return m ? `${m[3] ? +m[3] + ' ' : ''}${MES[+m[2] - 1]} ${m[1]}` : (d || ''); };
  const safeUrl = (u) => (/^https?:\/\//.test(u || '') ? u : '');
  const SRC = { FT: 'Financial Times' };
  const reciente = (n) => String(n.date) >= '2025';
  const ORDEN = { required: 0, ejemplo: 1 };
  const orden = (a, b) => ((ORDEN[a.flag] ?? 2) - (ORDEN[b.flag] ?? 2)) || String(b.date).localeCompare(String(a.date));
  const lista = (xs) => `<ul class="small">${xs.map((x) => `<li>${x}</li>`).join('')}</ul>`;

  const tarjeta = (n) => {
    const u = safeUrl(n.url);
    const tags = [
      `<span class="badge in">${n.topic}</span>`,
      n.flag === 'required' ? '<span class="badge star">Required</span>' : '',
      n.flag === 'ejemplo' ? '<span class="badge star">Ejemplo del profe</span>' : '',
      reciente(n) ? '' : '<span class="badge out">Marco</span>',
    ].join('');
    const titulo = u ? `<a href="${E.esc(u)}" target="_blank" rel="noopener noreferrer">${n.title}</a>` : n.title;
    return `<article class="card2 sx-nw-card" data-sec="${E.TOPIC_SEC[n.topic]}">
      <div class="sx-nw-tags">${tags}<span class="small muted">${E.esc(SRC[n.source] || n.source)} · ${fecha(n.date)}</span></div>
      <h4>${titulo}</h4>
      <p class="small muted sx-nw-cv">En Canvas: ${E.esc(n.canvasTitle || n.title)}${u ? '' : `. ${E.esc(n.note || 'Está en Canvas, sin enlace público.')}`}</p>
      <p class="small">${n.thesis}</p>
      ${E.reveal('Puntos, datos y pregunta probable', `
        <p class="small"><b>Puntos</b></p>${lista(n.points)}
        <p class="small"><b>Datos</b></p>${lista(n.data)}
        <p class="small"><b>Herramienta:</b> ${n.tool}</p>
        <p class="small"><b>Pregunta probable:</b> ${n.question}</p>
        <p class="small"><b>Vigencia:</b> ${n.vigencia}</p>`)}
    </article>`;
  };
  const ensayo = (e) => `<div data-sec="${E.TOPIC_SEC[e.topic]}">` + E.reveal(`${e.topic} · ${e.prompt}`, `<p class="small"><b>Herramientas:</b> ${(e.tools || []).join(' · ')}</p><ul class="small">${(e.outline || []).map((x) => `<li>${x}</li>`).join('')}</ul><div class="prose">${String(e.model || '').split(/\n+/).map((p) => `<p>${p}</p>`).join('')}</div>`) + '</div>';
  const vieja = (n) => {
    const u = safeUrl(n.url);
    return `<article class="card2" data-sec="${E.TOPIC_SEC[n.topic]}"><div class="small muted">${n.topic} · ${fecha(n.date)} · ${E.esc(n.source || '')}</div><h4 style="margin:4px 0 6px">${u ? `<a href="${E.esc(u)}" target="_blank" rel="noopener noreferrer">${n.title}</a>` : n.title}</h4><p class="small"><b>Herramienta:</b> ${n.tool}</p><p class="small">${n.read}</p></article>`;
  };

  E.section({
    id: 'noticias', n: 80, group: 'examen', icon: '📰', short: 'Noticias', exam: 'star',
    title: 'Noticias',
    lead: 'Dos ensayos de noticias valen 35 puntos. Apóyate en las que el profe dejó en Canvas y léelas con las herramientas del curso.',
    render(root) {
      const canvas = (E.canvasNews || []).slice().sort(orden);
      const eCanvas = E.essays.filter((e) => e.type === 'noticia' && e.canvas);
      const eOtros = E.essays.filter((e) => e.type === 'noticia' && !e.canvas);
      const nOtras = E.news.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
      const st = { t: '', modo: 'rec' };
      root.innerHTML = `
      <style>
        .sx-nw-flt{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:14px 0 8px;max-width:1180px}
        .sx-nw-seg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin:0 0 8px;max-width:560px}
        .sx-nw-flt .btn,.sx-nw-seg .btn{justify-content:center;min-width:0;white-space:normal;text-align:center;line-height:1.25;padding:6px 8px}
        .sx-nw-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:14px 0;align-items:start;max-width:1180px}
        .sx-nw-card{overflow-wrap:anywhere}
        .sx-nw-card h4{margin:8px 0 2px}
        .sx-nw-cv{margin:0 0 8px}
        .sx-nw-tags{display:flex;flex-wrap:wrap;align-items:center;gap:6px}
        .sx-nw-card details.reveal{margin:8px 0 0}
        @media(max-width:720px){.sx-nw-flt{grid-template-columns:repeat(2,minmax(0,1fr))}.sx-nw-list{grid-template-columns:minmax(0,1fr)}}
      </style>
      ${E.tip('Te sirven las notas que dejó en Canvas. Cuando preguntaron si se podía usar una más reciente, dijo que sí, pero advirtió: <q>lo que no quisiera yo es que me chorearas</q>. Si citas una que él no conoce, lo ve como choro. <q>Preferiría que si es algo de lo que está ahí, pues que fuera una noticia que ya les dije yo.</q>', 'Clase 2-nov')}
      ${E.tip('En el ensayo te muestra un artículo. Si sólo lo resumes, demuestras que lo entendiste, pero lo que califica es el análisis crítico y el uso de las herramientas. Su ejemplo fue el artículo de Daniel Gros: identificó S − I, Solow y globalización. También ayuda decir que la historia es consistente con otras lecturas del curso.', 'Clase 2-nov')}
      ${E.key('<b>1. Herramienta:</b> nómbrala en la primera línea.<br><b>2. Mecanismo:</b> esto sube → por eso esto baja, en cadena.<br><b>3. Implicación:</b> qué significa para México, los emergentes o un inversionista.<br><b>4. Matiz:</b> qué podría hacer que no ocurra así.', 'La plantilla para 350 palabras: herramienta → mecanismo → implicación → matiz')}
      <div data-sec="flujos">${E.formula('S − I = CA, sin atajo', 'S − I', '(G − T) + (X − M)', 'Cuando una nota dice «S − I = CA», es el atajo. Con gobierno, usa esta identidad.')}</div>
      <h2>Las noticias de Canvas</h2>
      <p class="prose small muted">Los enlaces llevan al artículo original y requieren la suscripción del curso. Cada tarjeta da la idea central; abre el desplegable para ver lo demás. <b>Marco</b> señala una pieza anterior a 2025: sirve por su mecanismo, no como actualidad. Lo marcado «fuera del artículo» o «contexto externo» no viene en el texto, y lo debes verificar antes de citarlo. Un billón es un millón de millones (<i>trillion</i> en inglés).</p>
      <div class="sx-nw-seg" id="nwModo" role="group" aria-label="Periodo">
        <button class="btn sm on" type="button" data-m="rec" aria-pressed="true">Recientes (2025–2026)</button>
        <button class="btn sm" type="button" data-m="all" aria-pressed="false">Todas</button>
      </div>
      <div class="sx-nw-flt" id="flt" role="group" aria-label="Tema">
        <button class="btn sm on" type="button" data-t="" aria-pressed="true">Todos los temas</button>
        ${TOPICS.map(([k, l]) => `<button class="btn sm" type="button" data-t="${k}" aria-pressed="false">${k} ${l}</button>`).join('')}
      </div>
      <p class="small muted" id="nwCount" aria-live="polite"></p>
      <p class="small" id="nwAlso"></p>
      <div id="nl" class="sx-nw-list"></div>
      <h2>Practica con ensayos de Canvas</h2>
      <p class="prose">Intenta escribir el tuyo antes de abrir el modelo. Son los que salen en el ${E.link('simulacro', 'simulacro')}.</p>
      <div id="el"></div>
      <h2>Otras noticias</h2>
      ${E.reveal('Otras noticias, sólo para contexto: no las uses como tu noticia principal', '<p class="small muted">Las buscamos al preparar esta guía, y no son de la lista de Canvas. Sirven para ubicarte, no como la noticia central de tu ensayo.</p><div id="nwOld" class="sx-nw-list"></div><div id="elOld"></div>')}
      `;
      const nl = root.querySelector('#nl'), el = root.querySelector('#el'), old = root.querySelector('#nwOld'), elOld = root.querySelector('#elOld');
      const count = root.querySelector('#nwCount'), also = root.querySelector('#nwAlso');
      const draw = () => {
        const porTema = st.t ? canvas.filter((n) => n.topic === st.t) : canvas;
        // las marcadas por el profe siguen visibles en Recientes aunque sean anteriores a 2025
        const f = st.modo === 'rec' ? porTema.filter((n) => reciente(n) || n.flag) : porTema;
        nl.innerHTML = f.length ? f.map(tarjeta).join('') : '<p class="muted">Sin noticias recientes para este tema. Cambia a «Todas».</p>';
        count.textContent = `${f.length} de ${porTema.length} noticias${st.t ? ` de ${st.t}` : ''}.`;
        const extra = st.t ? canvas.filter((n) => n.also === st.t) : [];
        also.innerHTML = extra.map((n) => `También sirve para este tema: <b>${n.title}</b> (${E.esc(SRC[n.source] || n.source)}), que está en ${n.topic}.`).join(' ');
        also.hidden = !extra.length;
        const g = (xs) => (st.t ? xs.filter((e) => e.topic === st.t) : xs);
        el.innerHTML = g(eCanvas).map(ensayo).join('') || '<p class="muted">Sin ensayos para este tema.</p>';
        const o = st.t ? nOtras.filter((n) => n.topic === st.t) : nOtras;
        old.innerHTML = o.length ? o.map(vieja).join('') : '<p class="muted">Sin otras noticias para este tema.</p>';
        const eo = g(eOtros);
        elOld.innerHTML = eo.length ? `<p class="small"><b>Ensayos sobre estas noticias</b></p>${eo.map(ensayo).join('')}` : '';
      };
      const marca = (box, b) => box.querySelectorAll('button').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      root.querySelector('#flt').addEventListener('click', (ev) => {
        const b = ev.target.closest('button'); if (!b) return;
        marca(ev.currentTarget, b); st.t = b.dataset.t; draw();
      });
      root.querySelector('#nwModo').addEventListener('click', (ev) => {
        const b = ev.target.closest('button'); if (!b) return;
        marca(ev.currentTarget, b); st.modo = b.dataset.m; draw();
      });
      draw();
    },
  });
})();
