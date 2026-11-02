// Sección 95 — Hoja de repaso imprimible: reúne E.repaso de todos los temas. El examen es a libro cerrado: es para estudiar, no para llevar.
(function () {
  E.section({
    id: 'repaso', n: 95, group: 'examen', icon: '🖨️', short: 'Hoja de repaso', exam: 'in',
    title: 'Hoja de repaso',
    lead: 'Los conceptos de cada tema en una línea, para memorizar antes de entrar.',
    render(root) {
      const list = E.repaso.slice().sort((a, b) => String(a.topic).localeCompare(String(b.topic)));
      root.innerHTML = `
      <style>
        .sx-rp .fx{column-count:2;column-gap:22px}
        @media(max-width:1100px){.sx-rp .fx{column-count:1}}
        .sx-rp .blk{break-inside:avoid;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin:0 0 14px;display:inline-block;width:100%}
        .sx-rp h4{margin:0 0 6px;font-size:14px;border-bottom:2px solid var(--accent);padding-bottom:3px}
        .sx-rp table{width:100%;border-collapse:collapse;font-size:13px;line-height:1.35}
        .sx-rp th,.sx-rp td{text-align:left;vertical-align:top;padding:4px 6px;border-bottom:1px solid var(--line2);white-space:normal!important;overflow-wrap:anywhere}
        .sx-rp tr:last-child th,.sx-rp tr:last-child td{border-bottom:0}
        .sx-rp th{font-weight:700;width:34%;color:var(--ink)}
        @media print{
          .topbar,.side,.pager,.sec-head,.sx-rp .bar,.scrim2{display:none!important}
          .est-layout{display:block!important}.main{padding:0!important;max-width:none!important;margin:0!important}
          body.est{background:#fff}
          .sx-rp .fx{column-count:2!important;column-gap:12px}
          .sx-rp .blk{border-color:#bbb;margin-bottom:6px;padding:4px 6px;background:#fff}
          .sx-rp table{font-size:9.5px;line-height:1.2}.sx-rp h4{font-size:11px}.sx-rp th,.sx-rp td{padding:1.5px 3px}
          @page{size:letter;margin:9mm}
        }
      </style>
      <div class="sx-rp">
        <div class="bar">
          ${E.warn('El examen es a <b>libro cerrado</b>: esta hoja es para repasar antes de entrar, no para llevarla. Consultar material durante el examen es deshonestidad académica.')}
          <div class="btnrow" style="margin:10px 0 16px"><button class="btn pri" id="pr" type="button">🖨️ Imprimir para estudiar</button></div>
        </div>
        <div class="fx">${list.map((b) => `<div class="blk" data-sec="${E.TOPIC_SEC[b.topic]}"><h4>${b.icon || ''} ${b.topic} · ${String(b.title).replace(/^S\d\s*·\s*/, '')}</h4><table>${(b.items || []).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</table></div>`).join('')}${Object.keys(E.TOPIC_SEC).map((t) => { const { vars, sigs } = E.glosRows(E.TOPIC_SEC[t]); const fila = (k, n, d) => `<tr><th>${k.replace(/_(.+)$/, '<sub>$1</sub>').replace(/ᵉ/g, '<sup>e</sup>').replace(/ᵈ/g, '<sup>d</sup>')}</th><td><i>${n}.</i> ${d}</td></tr>`; return `<div class="blk gl-no"><h4>🔤 ${t} · Símbolos y siglas</h4><table>${vars.map(([k, v]) => fila(k, v[0], v[1])).join('')}${sigs.map(([k, v]) => fila(k, v.n, v.d)).join('')}</table></div>`; }).join('')}</div>
      </div>`;
      root.querySelector('#pr').addEventListener('click', () => window.print());
    },
  });
})();
