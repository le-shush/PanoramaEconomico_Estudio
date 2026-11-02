// Sección 80 — Noticias de hoy: reúne E.news de todos los temas y enseña la plantilla herramienta → mecanismo → implicación.
(function () {
  const TOPICS = [['S1', '📈 Crecimiento'], ['S2', '🌐 Flujos'], ['S3', '🏛️ Fiscal'], ['S4', '🏦 Monetaria'], ['S5', '💱 Cambio'], ['S6', '🏧 Bancos'], ['S7', '🌡️ Clima']];
  const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const fecha = (d) => { const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(d || ''); return m ? `${m[3] ? +m[3] + ' ' : ''}${MES[+m[2] - 1]} ${m[1]}` : (d || ''); };
  const safeUrl = (u) => (/^https?:\/\//.test(u || '') ? u : '');

  E.section({
    id: 'noticias', n: 80, group: 'examen', icon: '📰', short: 'Noticias de hoy', exam: 'star',
    title: 'Noticias de hoy, leídas con las herramientas',
    lead: 'Dos ensayos de noticias valen 35 puntos. El profe no te dice qué leer: quiere ver que sabes aplicar el curso a lo que está pasando.',
    render(root) {
      const list = E.news.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
      const essays = E.essays.filter((e) => e.type === 'noticia');
      root.innerHTML = `
      ${E.key('<b>1. Herramienta:</b> nómbrala en la primera línea.<br><b>2. Mecanismo:</b> esto sube → por eso esto baja, en cadena.<br><b>3. Implicación:</b> qué significa para México, los emergentes o un inversionista.<br><b>4. El matiz:</b> qué podría hacer que no ocurra así.', 'La plantilla para 350 palabras')}
      ${E.tip('Su ejemplo: si la Fed deja las tasas constantes y la inflación sigue bajando, Fisher dice que la tasa real sube, y otros países emergentes tienen menos margen para bajar sus tasas.', 'Clase 28-oct')}
      <div class="btnrow" id="flt" style="margin:18px 0 8px"><button class="btn sm on" data-t="">Todas</button>${TOPICS.map(([k, l]) => `<button class="btn sm" data-t="${k}">${l}</button>`).join('')}</div>
      <p class="small muted">Noticias verificadas al preparar esta guía (2 de noviembre de 2026). Revisa lo que salga el martes y el miércoles: puede caer algo más reciente.</p>
      <div id="nl" class="g2"></div>
      <h2>Practica con ensayos de noticia</h2>
      <p class="prose">Intenta escribir el tuyo antes de abrir el modelo. También aparecen en el ${E.link('simulacro', 'simulacro')}.</p>
      <div id="el"></div>
      `;
      const nl = root.querySelector('#nl'), el = root.querySelector('#el');
      const draw = (t) => {
        const f = t ? list.filter((n) => n.topic === t) : list;
        nl.innerHTML = f.length ? f.map((n) => {
          const u = safeUrl(n.url);
          return `<article class="card2" data-sec="${E.TOPIC_SEC[n.topic]}"><div class="small muted">${n.topic} · ${fecha(n.date)} · ${E.esc(n.source || '')}</div><h4 style="margin:4px 0 6px">${u ? `<a href="${E.esc(u)}" target="_blank" rel="noopener noreferrer">${n.title}</a>` : n.title}</h4><p class="small"><b>Herramienta:</b> ${n.tool}</p><p class="small">${n.read}</p></article>`;
        }).join('') : '<p class="muted">Sin noticias para este tema.</p>';
        const g = t ? essays.filter((e) => e.topic === t) : essays;
        el.innerHTML = g.map((e) => `<div data-sec="${E.TOPIC_SEC[e.topic]}">` + E.reveal(`${e.topic} · ${e.prompt}`, `<p class="small"><b>Herramientas:</b> ${(e.tools || []).join(' · ')}</p><ul class="small">${(e.outline || []).map((x) => `<li>${x}</li>`).join('')}</ul><div class="prose">${String(e.model || '').split(/\n+/).map((p) => `<p>${p}</p>`).join('')}</div>`) + '</div>').join('');
      };
      root.querySelector('#flt').addEventListener('click', (ev) => {
        const b = ev.target.closest('button'); if (!b) return;
        root.querySelectorAll('#flt button').forEach((x) => x.classList.toggle('on', x === b));
        draw(b.dataset.t);
      });
      draw('');
    },
  });
})();
