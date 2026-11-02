// Sección 90 — Simulacro: replica el examen real (15 MCQ + 3 casos + 2 noticias, una a la vez, sin regresar, con cronómetro)
// a partir de los bancos E.bank y E.essays, más práctica libre por tema.
(function () {
  const TOPICS = [['S1', '📈 Crecimiento'], ['S2', '🌐 Flujos'], ['S3', '🏛️ Fiscal'], ['S4', '🏦 Monetaria'], ['S5', '💱 Cambio'], ['S6', '🏧 Bancos'], ['S7', '🌡️ Clima']];
  const MODES = {
    full: { label: 'Examen completo', mcq: 15, caso: 3, noticia: 2, min: 120, desc: '15 + 3 + 2 en 120 minutos, como el real.' },
    mcq: { label: 'Sólo opción múltiple', mcq: 15, caso: 0, noticia: 0, min: 25, desc: '15 preguntas en 25 minutos.' },
    casos: { label: 'Sólo ensayos de casos', mcq: 0, caso: 3, noticia: 0, min: 50, desc: '3 ensayos en 50 minutos.' },
    noticias: { label: 'Sólo ensayos de noticias', mcq: 0, caso: 0, noticia: 2, min: 35, desc: '2 ensayos en 35 minutos.' },
  };
  const PTS = { mcq: 2, caso: 35 / 3, noticia: 17.5 };
  const HIST = 'pei-simulacros';
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // reparte equilibrado entre temas: una vuelta por tema hasta juntar n
  const sample = (pool, n) => {
    const by = {}; shuffle(pool).forEach((p) => (by[p.topic] = by[p.topic] || []).push(p));
    const out = []; let keys = shuffle(Object.keys(by));
    while (out.length < n && keys.length) {
      keys.forEach((k) => { if (out.length < n && by[k].length) out.push(by[k].pop()); });
      keys = keys.filter((k) => by[k].length);
    }
    return shuffle(out);
  };
  const words = (s) => (String(s).trim().match(/\S+/g) || []).length;
  const hist = () => { try { return JSON.parse(localStorage.getItem(HIST) || '[]') || []; } catch (e) { return []; } };
  const pushHist = (r) => { try { localStorage.setItem(HIST, JSON.stringify([r, ...hist()].slice(0, 8))); } catch (e) {} };
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  let run = null; // estado vivo: sobrevive al cambiar de sección dentro de la guía

  const start = (mode) => {
    const m = MODES[mode];
    const q = [];
    sample(E.bank, m.mcq).forEach((b) => {
      const order = shuffle(b.o.map((_, i) => i));
      q.push({ kind: 'mcq', topic: b.topic, q: b.q, o: order.map((i) => b.o[i]), a: order.indexOf(b.a), w: b.w, ans: null });
    });
    sample(E.essays.filter((e) => e.type === 'caso'), m.caso).forEach((e) => q.push({ kind: 'caso', e, topic: e.topic, text: '' }));
    sample(E.essays.filter((e) => e.type === 'noticia'), m.noticia).forEach((e) => q.push({ kind: 'noticia', e, topic: e.topic, text: '' }));
    run = { mode, q, i: 0, end: Date.now() + m.min * 60000, started: Date.now(), done: false };
  };

  const toolHit = (text, t) => {
    const n = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const hay = n(text);
    const keys = n(t).split(/[\s/(),·–-]+/).filter((w) => w.length > 3);
    return keys.length ? keys.some((k) => hay.includes(k)) : false;
  };

  function viewStart(root) {
    const h = hist();
    root.innerHTML = `
      ${E.note('Igual que en Canvas: una pregunta a la vez, <b>sin botón de regresar</b> y sin retroalimentación hasta el final. Las preguntas salen al azar y repartidas entre los 7 temas, así que cada intento es distinto.', 'Cómo funciona')}
      <div class="g2" id="modes" style="margin:14px 0">${Object.entries(MODES).map(([k, m]) => `<button class="card2" data-m="${k}" style="text-align:left;cursor:pointer"><h4 style="margin:0 0 4px">${k === 'full' ? '⏱️ ' : ''}${m.label}</h4><span class="small muted">${m.desc}</span></button>`).join('')}</div>
      ${h.length ? `<h2>Tus últimos intentos</h2>${E.table(h.map((r) => [r.when, r.label, r.mcq !== null ? `${r.mcq}/${r.mcqN}` : '—', r.ess ? `${r.ess} ensayos · ${r.avg} palabras promedio` : '—', r.time]), { head: ['Cuándo', 'Modo', 'Opción múltiple', 'Ensayos', 'Tiempo'] })}` : ''}
      <h2>Práctica libre por tema</h2>
      <p class="prose">Con retroalimentación inmediata. Aquí sí te puedes equivocar y regresar.</p>
      <div class="btnrow" id="pt">${TOPICS.map(([k, l]) => `<button class="btn sm" data-t="${k}">${l} <span class="muted">(${E.bank.filter((b) => b.topic === k).length})</span></button>`).join('')}</div>
      <div id="free"></div>
      <h2>Todos los ensayos de casos</h2>
      <div id="eas"></div>
    `;
    root.querySelector('#modes').addEventListener('click', (ev) => {
      const b = ev.target.closest('button'); if (!b) return;
      start(b.dataset.m); draw(root); window.scrollTo({ top: 0, behavior: 'instant' });
    });
    const free = root.querySelector('#free');
    root.querySelector('#pt').addEventListener('click', (ev) => {
      const b = ev.target.closest('button'); if (!b) return;
      root.querySelectorAll('#pt button').forEach((x) => x.classList.toggle('on', x === b));
      free.innerHTML = '<div></div>';
      free.firstChild.dataset.sec = E.TOPIC_SEC[b.dataset.t];
      E.quiz(free.firstChild, shuffle(E.bank.filter((x) => x.topic === b.dataset.t)).map(({ q, o, a, w }) => ({ q, o, a, w })));
    });
    root.querySelector('#eas').innerHTML = E.essays.filter((e) => e.type === 'caso').map((e) => `<div data-sec="${E.TOPIC_SEC[e.topic]}">${E.reveal(`${e.topic} · ${e.prompt}`, essayKey(e))}</div>`).join('');
  }

  const essayKey = (e) => `<p class="small"><b>Herramientas:</b> ${(e.tools || []).join(' · ')}</p><ul class="small">${(e.outline || []).map((x) => `<li>${x}</li>`).join('')}</ul><div class="prose">${String(e.model || '').split(/\n+/).map((p) => `<p>${p}</p>`).join('')}</div>`;

  function viewQ(root) {
    const c = run.q[run.i], last = run.i === run.q.length - 1, m = MODES[run.mode];
    const secLeft = () => Math.max(0, Math.round((run.end - Date.now()) / 1000));
    const label = c.kind === 'mcq' ? `Opción múltiple · ${PTS.mcq} pts` : c.kind === 'caso' ? `Ensayo de caso · ≈${E.fmt.n(PTS.caso, 1)} pts` : `Ensayo de noticia · ${PTS.noticia} pts`;
    root.innerHTML = `
      <div class="card2" style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;position:sticky;top:64px;z-index:5">
        <span><b>Pregunta ${run.i + 1} de ${run.q.length}</b> · <span class="small muted">${label}</span></span>
        <span style="font-variant-numeric:tabular-nums;font-size:20px;font-weight:700" id="clk"></span>
      </div>
      <div class="card2" data-sec="${E.TOPIC_SEC[c.topic]}" style="margin-top:14px">
        <h3 style="margin-top:0;color:var(--ink)">${c.kind === 'mcq' ? c.q : c.e.prompt}</h3>
        ${c.kind === 'mcq'
          ? `<div class="qz" style="border:0;padding:0;background:none"><div class="qo">${c.o.map((o, i) => `<button type="button" data-i="${i}">${o}</button>`).join('')}</div></div>`
          : `<textarea id="tx" rows="14" spellcheck="true" placeholder="Herramienta → mecanismo → implicación. ≈350 palabras." style="width:100%;font:inherit;padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);line-height:1.5"></textarea>
             <div class="small" id="wc" style="margin-top:6px"></div>`}
      </div>
      <div class="btnrow" style="justify-content:space-between;margin-top:14px">
        <button class="btn sm" id="quit" type="button">Abandonar</button>
        <button class="btn pri" id="next" type="button" ${c.kind === 'mcq' ? 'disabled' : ''}>${last ? 'Terminar' : 'Siguiente → (sin regreso)'}</button>
      </div>
      <p class="small muted">Ritmo sugerido del modo: ${m.min} min en total.</p>
    `;
    const clk = root.querySelector('#clk');
    const paint = () => { if (!clk.isConnected) return clearInterval(tk); const s = secLeft(); clk.textContent = mmss(s); clk.style.color = s < 300 ? 'var(--bad)' : ''; if (s <= 0) { clearInterval(tk); finish(root, true); } };
    const tk = setInterval(paint, 1000); paint();
    if (c.kind === 'mcq') {
      const next = root.querySelector('#next');
      root.querySelectorAll('.qo button').forEach((b) => b.addEventListener('click', () => {
        c.ans = +b.dataset.i; next.disabled = false;
        root.querySelectorAll('.qo button').forEach((x) => { x.style.outline = x === b ? '2px solid var(--accent)' : ''; x.setAttribute('aria-pressed', x === b); });
      }));
    } else {
      const tx = root.querySelector('#tx'), wc = root.querySelector('#wc');
      const upd = () => { c.text = tx.value; const n = words(tx.value); wc.innerHTML = `<b>${n}</b> palabras · meta ≈350 ${n >= 300 && n <= 420 ? '<span class="good">✓</span>' : ''}`; };
      tx.value = c.text || ''; tx.addEventListener('input', upd); upd(); tx.focus();
    }
    root.querySelector('#next').addEventListener('click', () => {
      clearInterval(tk);
      if (last) finish(root, false); else { run.i++; draw(root); window.scrollTo({ top: 0, behavior: 'instant' }); }
    });
    root.querySelector('#quit').addEventListener('click', () => { clearInterval(tk); if (confirm('¿Abandonar el simulacro? Se pierde lo escrito.')) { run = null; draw(root); } else { draw(root); } });
  }

  function finish(root, timedOut) {
    run.done = true; run.timedOut = timedOut; run.finished = Math.min(Date.now(), run.end);
    const mcq = run.q.filter((c) => c.kind === 'mcq'), ess = run.q.filter((c) => c.kind !== 'mcq');
    const good = mcq.filter((c) => c.ans === c.a).length;
    pushHist({
      when: new Date().toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' }), label: MODES[run.mode].label,
      mcq: mcq.length ? good : null, mcqN: mcq.length, ess: ess.length, avg: ess.length ? Math.round(ess.reduce((s, c) => s + words(c.text), 0) / ess.length) : 0,
      time: mmss(Math.round((run.finished - run.started) / 1000)),
    });
    draw(root); window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function viewResult(root) {
    const mcq = run.q.filter((c) => c.kind === 'mcq'), ess = run.q.filter((c) => c.kind !== 'mcq');
    const good = mcq.filter((c) => c.ans === c.a).length;
    const blank = run.q.length - run.q.filter((c) => (c.kind === 'mcq' ? c.ans !== null : words(c.text) > 0)).length;
    root.innerHTML = `
      ${run.timedOut ? E.warn('Se acabó el tiempo. Justo esto es lo que el profe dice que es el peor error: lo que no contestaste ya no cuenta.') : ''}
      <div id="tl"></div>
      ${mcq.length ? `<h2>Opción múltiple</h2><div id="rm"></div>` : ''}
      ${ess.length ? `<h2>Ensayos: compáralos contra el modelo</h2><p class="prose">Los ensayos no se califican solos. Compara el tuyo con el modelo y revisa si nombraste las herramientas; la detección de abajo sólo busca palabras, no evalúa tu razonamiento.</p><div id="re"></div>` : ''}
      <div class="btnrow" style="margin-top:18px"><button class="btn pri" id="again" type="button">Hacer otro simulacro</button></div>
    `;
    E.tiles(root.querySelector('#tl'), [
      ...(mcq.length ? [{ label: 'Opción múltiple', v: good, fmt: 'n', note: `de ${mcq.length} · ${good * PTS.mcq} de ${mcq.length * PTS.mcq} pts`, hl: true }] : []),
      ...(ess.length ? [{ label: 'Palabras promedio por ensayo', v: Math.round(ess.reduce((s, c) => s + words(c.text), 0) / ess.length), fmt: 'n', note: 'meta ≈350' }] : []),
      { label: 'Sin contestar', v: blank, fmt: 'n', note: blank ? 'prioridad para la próxima' : 'contestaste todo' },
    ]);
    const rm = root.querySelector('#rm');
    if (rm) rm.innerHTML = mcq.map((c, n) => `<div class="qz done" data-sec="${E.TOPIC_SEC[c.topic]}" style="margin-bottom:10px"><div class="qq">${n + 1}. <span class="small muted">${c.topic}</span> ${c.q}</div><div class="qo">${c.o.map((o, i) => `<button type="button" disabled class="${i === c.a ? 'ok' : i === c.ans ? 'ko' : ''}">${o}</button>`).join('')}</div><div class="qw" style="display:block">${c.w || ''}</div></div>`).join('');
    const re = root.querySelector('#re');
    if (re) re.innerHTML = ess.map((c) => {
      const tools = (c.e.tools || []).map((t) => `<li>${toolHit(c.text, t) ? '✅' : '⬜'} ${t}</li>`).join('');
      return `<section class="card2" data-sec="${E.TOPIC_SEC[c.topic]}" style="margin-bottom:14px"><h4>${c.topic} · ${c.e.prompt}</h4>
        <p class="small muted">${words(c.text)} palabras</p>
        ${c.text.trim() ? `<div class="small" style="white-space:pre-wrap;border-left:3px solid var(--line);padding-left:10px;margin:8px 0">${E.esc(c.text)}</div>` : '<p class="bad small">No escribiste nada.</p>'}
        <p class="small"><b>¿Nombraste las herramientas?</b></p><ul class="small" style="list-style:none;padding-left:0">${tools}</ul>
        ${E.reveal('Ver ensayo modelo', essayKey(c.e))}</section>`;
    }).join('');
    root.querySelector('#again').addEventListener('click', () => { run = null; draw(root); });
  }

  function draw(root) {
    if (!run) return viewStart(root);
    if (run.done) return viewResult(root);
    return viewQ(root);
  }

  E.section({
    id: 'simulacro', n: 90, group: 'examen', icon: '⏱️', short: 'Simulacro', exam: 'in',
    title: 'Simulacro de examen',
    lead: 'Practica el ritmo real: lo que más castiga este examen es que se acabe el tiempo.',
    render(root) { draw(root); },
  });
})();
