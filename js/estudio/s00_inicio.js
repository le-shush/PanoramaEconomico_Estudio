// Sección 0 — Inicio: el examen en una pantalla, la lógica del curso y plan de repaso.
(function () {
  const EXAM = new Date('2026-11-04T18:30:00-06:00'); // horario de clase (hora aproximada; hora CDMX)

  // Mapa: la lógica del curso según el profe (herramientas → casos → noticias)
  const mapa = `<svg class="ill" viewBox="0 0 900 250" role="img" aria-label="La lógica del curso: herramientas analíticas, luego casos, luego noticias, y qué parte del examen evalúa cada una">
    <defs><marker id="ah0" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="f5"/></marker></defs>
    <rect x="20" y="30" width="250" height="150" rx="16" class="w1"/>
    <text x="145" y="64" text-anchor="middle" font-size="18" font-weight="700">🧰 Herramientas</text>
    <text x="145" y="92" text-anchor="middle" font-size="14" class="t2">Solow, S − I = CA, r − g,</text>
    <text x="145" y="112" text-anchor="middle" font-size="14" class="t2">Fisher, paridades, trilema,</text>
    <text x="145" y="132" text-anchor="middle" font-size="14" class="t2">corridas, costo del carbono</text>
    <rect x="325" y="30" width="250" height="150" rx="16" class="w3"/>
    <text x="450" y="64" text-anchor="middle" font-size="18" font-weight="700">📚 Casos</text>
    <text x="450" y="92" text-anchor="middle" font-size="14" class="t2">China vs México, 2008 y COVID,</text>
    <text x="450" y="112" text-anchor="middle" font-size="14" class="t2">Japón, Tequila 94–95,</text>
    <text x="450" y="132" text-anchor="middle" font-size="14" class="t2">Silicon Valley Bank</text>
    <rect x="630" y="30" width="250" height="150" rx="16" class="w4"/>
    <text x="755" y="64" text-anchor="middle" font-size="18" font-weight="700">📰 Noticias</text>
    <text x="755" y="92" text-anchor="middle" font-size="14" class="t2">Interpreta lo que pasó hoy</text>
    <text x="755" y="112" text-anchor="middle" font-size="14" class="t2">usando las herramientas,</text>
    <text x="755" y="132" text-anchor="middle" font-size="14" class="t2">no tu opinión de café</text>
    <path d="M270 105 L323 105" class="ln s5 anim-flow" marker-end="url(#ah0)"/>
    <path d="M575 105 L628 105" class="ln s5 anim-flow" marker-end="url(#ah0)"/>
    <g font-size="14" font-weight="700" text-anchor="middle">
      <text x="145" y="212">Opción múltiple · 30 pts</text>
      <text x="450" y="212">3 ensayos de casos · 35 pts</text>
      <text x="755" y="212">2 ensayos de noticias · 35 pts</text>
    </g>
  </svg>`;

  const groups = [
    ['examen', '🎓', 'Lo que dijo el profe', 'Formato, cómo califica, estrategia de tiempo y logística.'],
    ['crecimiento', '📈', 'S1 · Crecimiento', 'Solow, contabilidad del crecimiento, PTF, los próximos BRICs.'],
    ['flujos', '🌐', 'S2 · Flujos y aranceles', 'S − I = CA, Bernanke, China vs México, aranceles.'],
    ['fiscal', '🏛️', 'S3 · Política fiscal', 'Multiplicador, r − g, balance primario, 2008 y COVID.'],
    ['monetaria', '🏦', 'S4 · Política monetaria', '★ Fisher, paridades, carry trade, Japón y su curva.'],
    ['cambio', '💱', 'S5 · Tipo de cambio', '★ Trilema, ataques especulativos, Tequila 94–95.'],
    ['bancos', '🏧', 'S6 · Bancos y corridas', 'Transformación de plazos, corridas, SVB.'],
    ['clima', '🌡️', 'S7 · Riesgo climático', 'Físico vs transición, costo del carbono, ISSB.'],
    ['noticias', '📰', 'Noticias', 'Las que dejó el profe en Canvas, leídas con la herramienta del curso.'],
    ['intuicion', '🧭', 'Reglas de dedo', 'La idea de cada fórmula y qué se mueve con qué, sin memorizar.'],
    ['contexto', '🗺️', 'Puntos clave', 'El panorama económico actual y qué retener de cada documento.'],
    ['simulacro', '⏱️', 'Simulacro', '15 + 3 + 2 con cronómetro y sin poder regresar, como el real.'],
    ['repaso', '🖨️', 'Hoja de repaso', 'Conceptos en una línea para memorizar antes de entrar.'],
    ['glosario', '🔤', 'Glosario', 'Qué significa cada sigla y cada letra de las fórmulas, con buscador.'],
  ];

  E.section({
    id: 'inicio', n: 0, group: 'inicio', icon: '🏠', short: 'Inicio',
    title: 'Central de estudio de Perspectivas Económicas Internacionales',
    kicker: 'Examen final · miércoles 4 de noviembre, en horario de clase',
    lead: 'Todo el curso en un solo lugar: las herramientas con perillas para jugar, la historia que el profe quiere que sepas contar, los casos y las noticias recientes.',
    render(root) {
      root.innerHTML = `
      <div class="hero2">
        <div>
          <h3 style="margin-top:0">El examen en 30 segundos</h3>
          <ul>
            <li><b>Libro cerrado</b>, presencial, en Canvas con <b>LockDown Browser</b>.</li>
            <li><b>15 de opción múltiple</b> (30 pts) · <b>3 ensayos de casos</b> (35 pts) · <b>2 ensayos de noticias</b> (35 pts). Ensayos de ≈350 palabras.</li>
            <li><b>Una pregunta a la vez y sin regresar.</b> ≈120 minutos con el tiempo justo a propósito.</li>
            <li>Los ensayos valen <b>70%</b>: no dejes ninguno sin responder.</li>
          </ul>
          ${E.tip('El peor error es que se te acabe el tiempo: lo que no alcanzas a contestar ya no se puede calificar. Y aclaró que no te va a pedir datos puntuales, sino que sepas contar lo que pasó y por qué.', 'Clase 28-oct')}
        </div>
        <div>
          <h3 style="margin-top:0">Faltan</h3>
          <div class="count" id="cd"></div>
          <p class="small muted" style="margin-top:10px">Referencia: 18:30 (CDMX), hora aproximada del horario de clase.</p>
          <div class="btnrow"><a class="btn pri" href="#/examen">Ver los tips del profe →</a><a class="btn" href="#/simulacro">⏱️ Simulacro</a><a class="btn" href="#/repaso">🖨️ Repaso</a></div>
        </div>
      </div>

      <h2>La lógica de todo el curso</h2>
      <p class="prose">El profe lo resume en una línea: <b>herramientas analíticas → casos → noticias</b>. Primero aprendes el modelo, luego ves cómo explica lo que pasó en un país real, y al final lo usas para leer lo que está pasando hoy. El examen evalúa justo esos tres niveles.</p>
      ${E.fig(mapa, 'Cada parte del examen corresponde a un nivel de la lógica del curso.', true)}
      ${E.kid('Las herramientas son como aprender a usar un termómetro. Los casos son pacientes que ya se enfermaron y se curaron: ves qué decía el termómetro antes. Las noticias son el paciente de hoy, y el profe te pide el diagnóstico con el termómetro, no con lo que dice tu compadre.')}

      <h2>Temas</h2>
      <div class="map">${groups.map(([id, ic, t, d], i) => `<a href="#/${id}"><span class="n">${ic} ${String(i + 1).padStart(2, '0')}</span><b>${t}</b><span>${d}</span></a>`).join('')}</div>

      <h2>Plan de repaso para los 2 días que quedan</h2>
      <div class="tblwrap">${E.table([
        ['<b>Lunes 2 · noche</b>', 'Tips del profe y primera pasada por S1–S3', '2–3 h', 'Cuenta en voz alta cada narrativa. Si no puedes contarla como historia causal, regrésate.'],
        ['<b>Martes 3 · mañana</b>', 'S4 y S5 (★), con sus laboratorios', '2–3 h', 'Fisher, paridades, trilema y Tequila son la columna de los ensayos de noticias.'],
        ['<b>Martes 3 · tarde</b>', 'S6, S7 y las noticias de Canvas', '2 h', 'El profe prefiere las noticias que dejó en Canvas: elige 2 por tema y di qué herramienta usarías con cada una.'],
        ['<b>Martes 3 · noche</b>', 'Simulacro completo con cronómetro', '2 h', 'Practica escribir 350 palabras en 12–15 minutos.'],
        ['<b>Miércoles 4</b>', 'Hoja de repaso; revisar LockDown Browser', '1 h', 'Prueba LockDown en tu computadora personal, no en la del trabajo.'],
      ], { head: ['Cuándo', 'Qué', 'Tiempo', 'Cómo'] })}</div>
      ${E.key('Para cada ensayo, escribe 3 cosas: <b>(1) nombra la herramienta</b> del curso, <b>(2) aplícala con su mecanismo causal</b> (esto sube → por eso esto baja) y <b>(3) saca la implicación</b> para el país o el inversionista.', 'La receta para cada ensayo')}
      `;
      const cd = root.querySelector('#cd');
      const tick = () => {
        if (!cd.isConnected) return clearInterval(t);
        let s = Math.max(0, Math.floor((EXAM - new Date()) / 1000));
        const d = Math.floor(s / 86400); s -= d * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60);
        cd.innerHTML = [[d, 'días'], [h, 'horas'], [m, 'min']].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('');
      };
      const t = setInterval(tick, 30000); tick();
    },
  });
})();
