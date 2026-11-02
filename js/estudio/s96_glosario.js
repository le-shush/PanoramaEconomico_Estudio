// Sección 96 — Glosario: todas las siglas y símbolos del curso, con buscador y filtro por tema.
(function () {
  const TOPICS = [['S1', '📈 Crecimiento'], ['S2', '🌐 Flujos'], ['S3', '🏛️ Fiscal'], ['S4', '🏦 Monetaria'], ['S5', '💱 Cambio'], ['S6', '🏧 Bancos'], ['S7', '🌡️ Clima']];
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  E.section({
    id: 'glosario', n: 96, group: 'examen', icon: '🔤', short: 'Glosario',
    title: 'Glosario de siglas y símbolos',
    lead: 'Qué significa cada sigla y cada letra de las fórmulas. Una misma letra puede cambiar según el tema: por eso los símbolos van por tema.',
    render(root) {
      const sigs = Object.entries(E.SIG).filter(([k]) => k !== 'CO2').sort((a, b) => a[0].localeCompare(b[0]));
      const vars = Object.entries(E.VARS).flatMap(([sec, d]) => Object.entries(d).map(([k, v]) => ({ k, n: v[0], d: v[1], t: E.SEC_TOPIC[sec] })));
      const seen = new Set(); const vs = vars.filter((v) => { const id = v.t + v.n + v.d; if (seen.has(id)) return false; seen.add(id); return true; });
      root.innerHTML = `
      <div class="gl-no">
        <input id="gq" type="search" placeholder="Busca una sigla, letra o concepto: PTF, δ, deuda…" aria-label="Buscar en el glosario" style="width:100%;max-width:560px;font:inherit;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink)">
        <div class="btnrow" id="gt" style="margin:12px 0"><button class="btn sm on" data-t="" type="button">Todos</button>${TOPICS.map(([k, l]) => `<button class="btn sm" data-t="${k}" type="button">${l}</button>`).join('')}</div>
        <p class="small muted" id="gc"></p>
        <div id="gout"></div>
      </div>`;
      const q = root.querySelector('#gq'), out = root.querySelector('#gout'), cnt = root.querySelector('#gc');
      let topic = '';
      const fmtK = (k) => k.replace(/_(.+)$/, '<sub>$1</sub>').replace(/ᵉ/g, '<sup>e</sup>').replace(/ᵈ/g, '<sup>d</sup>');
      const card = (k, n, d, tag) => `<div class="fv"><b>${fmtK(k)}</b><span><i>${n}.</i> ${d}${tag ? ` <span class="small muted">· ${tag}</span>` : ''}</span></div>`;
      const draw = () => {
        const t = norm(q.value.trim());
        const hit = (...x) => !t || x.some((s) => norm(String(s)).includes(t));
        const a = sigs.filter(([k, v]) => (!topic || v.t === topic) && hit(k, v.n, v.d));
        const b = vs.filter((v) => (!topic || v.t === topic) && hit(v.k, v.n, v.d));
        cnt.textContent = `${a.length} siglas · ${b.length} símbolos`;
        out.innerHTML = `${b.length ? `<h2>Símbolos de las fórmulas</h2><div class="fvars open">${b.map((v) => card(v.k, v.n, v.d, v.t)).join('')}</div>` : ''}${a.length ? `<h2>Siglas</h2><div class="fvars open">${a.map(([k, v]) => card(k, v.n, v.d, v.t || '')).join('')}</div>` : ''}${!a.length && !b.length ? '<p class="muted">Nada con esa búsqueda.</p>' : ''}`;
      };
      q.addEventListener('input', draw);
      root.querySelector('#gt').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; topic = b.dataset.t; root.querySelectorAll('#gt button').forEach((x) => x.classList.toggle('on', x === b)); draw(); });
      draw();
    },
  });
})();
