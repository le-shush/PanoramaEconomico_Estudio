// S7 — Riesgo climático: riesgo físico vs transición, costo social del carbono, ISSB (NIIF S1/S2).
// OJO: la clase del 2-nov-2026 con la invitada no está grabada. Base: guía del profe, lectura BNEF y fuentes públicas.
(function () {
  const F = E.fmt;
  const TOPIC = 'S7';

  // ---------------------------------------------------------------- matemática de los laboratorios
  // Valor presente de un flujo de daños por tonelada: d0 el año 1, crece a g, descontado a r, durante T años.
  const scc = (r, g, T, d0) => { let s = 0; for (let t = 1; t <= T; t++) s += d0 * Math.pow(1 + g, t - 1) / Math.pow(1 + r, t); return s; };
  const sccAfter = (r, g, T, d0, from) => { let s = 0; for (let t = from + 1; t <= T; t++) s += d0 * Math.pow(1 + g, t - 1) / Math.pow(1 + r, t); return s; };
  const R_STERN = 0.014, R_EPA = 0.02, R_NORD = 0.043;

  const empresa = (x) => {
    const R = 1000; // ingresos fijos: $1,000 M
    const ebitda0 = R * x.m;
    const mt = (R * x.i) / 1e6;                 // t/$M × $M = t → Mt
    const bruto = mt * x.p;                     // Mt × $/t = $M
    const trans = bruto * (1 - x.pass);
    const danoEvento = ebitda0 * x.sev;
    const retenido = x.prob * danoEvento * (1 - x.cob);
    const prima = x.prob * danoEvento * x.cob * 1.3; // 30% de carga sobre la pérdida esperada cubierta
    const fis = retenido + prima;
    const adj = ebitda0 - trans - fis;
    const adjEvento = ebitda0 - trans - prima - danoEvento * (1 - x.cob);
    const deuda = 3 * ebitda0;
    return { ebitda0, mt, bruto, trans, danoEvento, retenido, prima, fis, adj, adjEvento, deuda, ev0: x.mult * ebitda0, ev: Math.max(0, x.mult * adj) };
  };

  // ---------------------------------------------------------------- ilustraciones
  const figTradeoff = `<svg class="ill" viewBox="0 0 640 310" role="img" aria-label="Al aumentar la ambición climática baja el riesgo físico y sube el de transición; actuar tarde y de golpe combina lo peor de los dos">
    <line x1="60" y1="250" x2="610" y2="250" class="lnm"/><line x1="60" y1="30" x2="60" y2="250" class="lnm"/>
    <text x="335" y="280" text-anchor="middle" font-size="13" class="t2">Ambición y rapidez de la política climática →</text>
    <text x="24" y="145" text-anchor="middle" font-size="13" class="t2" transform="rotate(-90 24 145)">Costo para la empresa</text>
    <path d="M70 50 C 200 150, 340 215, 600 232" class="ln s5" stroke-width="3"/>
    <path d="M70 232 C 300 218, 450 150, 600 50" class="ln s1" stroke-width="3"/>
    <text x="84" y="42" font-size="13" font-weight="700">🌪️ Riesgo físico</text>
    <text x="474" y="42" font-size="13" font-weight="700">🏭 Riesgo de transición</text>
    <circle cx="328" cy="193" r="7" class="fgood"/>
    <text x="328" y="172" text-anchor="middle" font-size="12" class="t2">Ordenada: temprano y predecible</text>
    <circle cx="462" cy="72" r="8" class="fbad"/>
    <text x="440" y="96" text-anchor="end" font-size="12" class="t2">Tarde y de golpe: lo peor de ambos</text>
    <text x="72" y="268" font-size="12" class="tm">Nadie actúa</text>
    <text x="608" y="268" text-anchor="end" font-size="12" class="tm">Se actúa ya</text>
  </svg>`;

  const figScc = `<svg class="ill" viewBox="0 0 700 300" role="img" aria-label="Cadena del costo social: una tonelada adicional sube concentración y temperatura, genera daños cada año y estos se traen a valor presente. Cien dólares de daño en cien años valen 24.9 a 1.4 por ciento y 1.5 a 4.3 por ciento">
    <g font-size="12" text-anchor="middle">
      <rect x="10" y="20" width="100" height="58" rx="9" class="f1"/><text x="60" y="46" class="tw" font-weight="700">1 tonelada</text><text x="60" y="63" class="tw">extra de CO₂</text>
      <rect x="130" y="20" width="100" height="58" rx="9" class="w1"/><text x="180" y="46">Clima</text><text x="180" y="63" class="t2">concentración, °C</text>
      <rect x="250" y="20" width="100" height="58" rx="9" class="w5"/><text x="300" y="46">Daños</text><text x="300" y="63" class="t2">$ cada año, 200+ años</text>
      <rect x="370" y="20" width="130" height="58" rx="9" class="w4"/><text x="435" y="46" font-weight="700">Descuento</text><text x="435" y="63" class="t2">÷ (1 + r)ᵗ</text>
      <rect x="520" y="20" width="170" height="58" rx="9" class="f5"/><text x="605" y="46" class="tw" font-weight="700">Costo social</text><text x="605" y="63" class="tw">$ por tonelada, hoy</text>
    </g>
    <g class="lnm"><path d="M110 49h20M230 49h20M350 49h20M500 49h20" class="ln"/></g>
    <text x="350" y="118" text-anchor="middle" font-size="14" font-weight="700">¿Cuánto vale hoy un daño de $100 en el año 100?</text>
    <rect x="150" y="138" width="400" height="26" rx="5" class="w2"/><text x="146" y="156" text-anchor="end" font-size="12">Sin descontar</text><text x="540" y="156" text-anchor="end" font-size="12" font-weight="700">$100</text>
    <rect x="150" y="176" width="100" height="26" rx="5" class="f1"/><text x="146" y="194" text-anchor="end" font-size="12">r = 1.4% (Stern)</text><text x="258" y="194" font-size="12" font-weight="700">$24.9</text>
    <rect x="150" y="214" width="6" height="26" rx="2" class="f5"/><text x="146" y="232" text-anchor="end" font-size="12">r = 4.3% (Nordhaus)</text><text x="164" y="232" font-size="12" font-weight="700">$1.5</text>
    <text x="350" y="276" text-anchor="middle" font-size="13" class="t2">Misma física, mismo daño: 3 puntos de tasa cambian el valor presente unas 17 veces.</text>
  </svg>`;

  const figSopa = `<svg class="ill" viewBox="0 0 680 280" role="img" aria-label="TCFD, SASB, IR y CDSB alimentan a ISSB, que emite S1 y S2; GRI, GHG Protocol, CDP y PRI siguen con propósito propio">
    <g font-size="13" text-anchor="middle" font-weight="700">
      <rect x="10" y="22" width="110" height="38" rx="8" class="w1"/><text x="65" y="46">TCFD</text>
      <rect x="10" y="70" width="110" height="38" rx="8" class="w1"/><text x="65" y="94">SASB</text>
      <rect x="10" y="118" width="110" height="38" rx="8" class="w1"/><text x="65" y="142">IR</text>
      <rect x="10" y="166" width="110" height="38" rx="8" class="w1"/><text x="65" y="190">CDSB</text>
    </g>
    <path d="M120 41 L230 100 M120 89 L230 110 M120 137 L230 120 M120 185 L230 130" class="ln"/>
    <rect x="230" y="70" width="130" height="90" rx="12" class="f1"/>
    <text x="295" y="108" text-anchor="middle" font-size="19" class="tw" font-weight="800">ISSB</text><text x="295" y="130" text-anchor="middle" font-size="12" class="tw">Fundación IFRS · 2021</text>
    <path d="M360 100 L430 62 M360 130 L430 168" class="ln"/>
    <rect x="430" y="30" width="240" height="64" rx="10" class="f2"/>
    <text x="550" y="56" text-anchor="middle" font-size="15" class="tw" font-weight="700">NIIF S1 · marco general</text><text x="550" y="77" text-anchor="middle" font-size="12" class="tw">riesgos y oportunidades de sostenibilidad</text>
    <rect x="430" y="136" width="240" height="64" rx="10" class="f5"/>
    <text x="550" y="162" text-anchor="middle" font-size="15" class="tw" font-weight="700">NIIF S2 · clima</text><text x="550" y="183" text-anchor="middle" font-size="12" class="tw">escenarios, Alcances 1, 2 y 3</text>
    <text x="340" y="248" text-anchor="middle" font-size="13" class="t2">Siguen con propósito propio: GRI (impacto) · GHG Protocol (cómo medir) · CDP (cuestionario) · PRI (principios)</text>
  </svg>`;

  const figScope = `<svg class="ill" viewBox="0 0 680 220" role="img" aria-label="Cadena de valor: Alcance 3 aguas arriba, Alcances 1 y 2 en la empresa, Alcance 3 aguas abajo">
    <rect x="10" y="50" width="190" height="110" rx="12" class="w3"/>
    <text x="105" y="78" text-anchor="middle" font-size="14" font-weight="700">Alcance 3 · aguas arriba</text>
    <text x="105" y="102" text-anchor="middle" font-size="12" class="t2">insumos comprados</text><text x="105" y="120" text-anchor="middle" font-size="12" class="t2">fletes de terceros</text><text x="105" y="138" text-anchor="middle" font-size="12" class="t2">viajes de negocio</text>
    <rect x="240" y="30" width="200" height="72" rx="12" class="f5"/>
    <text x="340" y="60" text-anchor="middle" font-size="14" class="tw" font-weight="700">Alcance 1 · lo que quemas tú</text><text x="340" y="82" text-anchor="middle" font-size="12" class="tw">hornos, flotilla propia, fugas</text>
    <rect x="240" y="114" width="200" height="72" rx="12" class="f2"/>
    <text x="340" y="144" text-anchor="middle" font-size="14" class="tw" font-weight="700">Alcance 2 · lo que te venden</text><text x="340" y="166" text-anchor="middle" font-size="12" class="tw">electricidad, vapor, calor</text>
    <rect x="480" y="50" width="190" height="110" rx="12" class="w3"/>
    <text x="575" y="78" text-anchor="middle" font-size="14" font-weight="700">Alcance 3 · aguas abajo</text>
    <text x="575" y="102" text-anchor="middle" font-size="12" class="t2">uso de lo vendido</text><text x="575" y="120" text-anchor="middle" font-size="12" class="t2">fin de vida</text><text x="575" y="138" text-anchor="middle" font-size="12" class="t2">inversiones y créditos</text>
    <path d="M200 105h40M440 105h40" class="ln"/>
    <text x="340" y="212" text-anchor="middle" font-size="12" class="tm">Directo → comprado → cadena de valor. Para un banco, casi todo está en sus créditos (emisiones financiadas).</text>
  </svg>`;

  // ---------------------------------------------------------------- render
  const render = (root) => {
    const newsHtml = E.news.filter((n) => n.topic === TOPIC).map((n) => `<div class="card2"><div class="small muted">${n.date} · ${n.source} · 🔧 ${n.tool}</div><h4 style="margin-top:4px"><a href="${n.url}" target="_blank" rel="noopener">${n.title}</a></h4><p class="small" style="margin:0">${n.read}</p></div>`).join('');
    root.innerHTML = `
    <style>
      #body .tbl th,#body .tbl td{white-space:normal;text-align:left;vertical-align:top}
      #body .lab .g2{grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))}
      .sx-cl-grid{display:flex;flex-direction:column;gap:8px}
      .sx-cl-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:9px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card)}
      .sx-cl-row .btn.good-pick{outline:2px solid var(--good)}.sx-cl-row .btn.bad-pick{outline:2px solid var(--bad)}
      .sx-cl-why{flex-basis:100%;font-size:13px;color:var(--ink2)}
      .sx-cl-notes{width:100%;min-height:130px;box-sizing:border-box;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);font:inherit}
    </style>

    ${E.note(`<p style="margin:.3em 0"><b>Esta sección se basa en la guía de estudio del profe, dos lecturas (BloombergNEF sobre ISSB y Estimating Climate Cost) y fuentes públicas.</b> El tema se vio con una invitada el lunes 2-nov-2026 y esa clase <b>no está grabada ni hay diapositivas en la carpeta</b>. Te toca completar con tus apuntes de esa clase; si la invitada dijo algo distinto, gana lo que dijo ella.</p>
      <p style="margin:.3em 0">El profe dijo el 28-oct que en este tema no hay caso y que hay un video que tienen que ver. <b>Ese video no lo tenemos.</b></p>
      <p style="margin:.3em 0"><b>Lecturas:</b> ✅ "Estimating Climate Cost" ya está integrada, con el texto real que conseguiste (${E.link('clima/ecc', 'ir a la ficha')}). ⚠️ "Who Killed ESG" sigue sin identificarse: pregúntale hoy al profe. Sus dos candidatos, y la hipótesis sobre el video, siguen <b>sin confirmar</b>.</p>`, '⚠️ Lee esto primero: clase sin grabar')}
    ${E.reveal('📝 Tus apuntes de la clase con la invitada (se guardan en este navegador)', `
      <p class="small">Lo que más vale capturar: ¿qué marco usó? ¿qué ejemplos dio? ¿mencionó México, CNBV, Pemex o aseguradoras? ¿cuál es su mensaje en una frase? ¿qué video es el del profe?</p>
      <textarea class="sx-cl-notes" id="clNotes" placeholder="Escribe aquí lo que dijo la invitada…"></textarea>`)}

    <h2 id="narrativa">1 · La narrativa que califica el profe</h2>
    ${E.tip('En la primera clase conectó clima con crecimiento por la vía de la energía: crecer requiere energía y, sin transición energética, sube la temperatura. La IA agudiza el dilema, porque los centros de datos podrían consumir en ≈5 años lo que consume Japón (la estimación que él vio; no tiene fuente en la clase). Mostró qué haría falta para una trayectoria menor a 2 °C: más eficiencia y pasar de fósiles a renovables. Y dijo que Trump y la guerra con Irán han postergado el tema.', 'Clase 1')}
    ${E.key('París 2015 pone precio político al carbono → <b>por eso</b> nace la pregunta financiera y crecen ESG y TCFD → <b>como</b> hay decenas de marcos y mucho greenwashing, ISSB unifica → <b>pero</b> tasas altas, política y credibilidad provocan el retroceso del ESG en EUA → <b>mientras</b> los eventos extremos siguen cobrando en aseguradoras. <b>Murió la etiqueta, no el riesgo.</b>', 'La historia en una frase')}
    ${E.timeline([
      { y: '2015', t: 'París y la "tragedia del horizonte"', d: 'El Acuerdo de París fija la meta de limitar el calentamiento muy por debajo de 2 °C. Ese año, Mark Carney (Banco de Inglaterra) plantea el riesgo climático como riesgo financiero, y el FSB crea el TCFD. <b>Por eso</b> el tema deja de ser sólo moral y llega a los consejos.' },
      { y: '2017–21', t: 'Auge ESG y TCFD', d: 'Recomendaciones TCFD (2017): gobernanza, estrategia, riesgos, métricas. Con tasas bajas, dinero entra a fondos ESG y a alianzas net zero. <b>Pero</b> florece una "sopa de letras" de marcos voluntarios: costo alto y poca comparabilidad.' },
      { y: '2021–24', t: 'ISSB: el estándar global', d: 'La Fundación IFRS crea ISSB en COP26 (nov-2021) y publica NIIF S1 y S2 (26-jun-2023), vigentes para periodos desde el 1-ene-2024. <b>Por eso</b> sostenibilidad se reporta con lógica de información financiera, para inversionistas. ISSB no puede obligar: decide cada jurisdicción.' },
      { y: '2022–26', t: 'Retroceso político en EUA', d: 'Las tasas suben y golpean activos de larga duración; llegan acusaciones de greenwashing y la reacción política. La SEC deja de defender su regla (mar-2025) y propone derogarla (may-2026); la orden ejecutiva 14154 retira el costo social del carbono (ene-2025); se disuelve la Net-Zero Banking Alliance (oct-2025); EPA deroga el <i>endangerment finding</i> (feb-2026).' },
      { y: '2025–26', t: 'El mapa se fragmenta: México avanza', d: 'CNBV exige informe alineado a NIIF S1/S2 (DOF 28-ene-2025): ejercicio 2025, primer reporte en 2026. California también avanza con SB 253. <b>Por eso</b> una empresa global no se libra de medir aunque Washington retroceda.' },
      { y: 'Hoy', t: 'Extremos y aseguradoras', d: 'Las pérdidas aseguradas superaron $100 mil M en 2025 (Swiss Re, fuente pública). 2026 va bajo (≈$91–92 mil M a 9 meses), y las reaseguradoras advierten que un año tranquilo no significa menos riesgo. Las tormentas convectivas ya pesan casi 60%. <b>Por eso</b> el canal financiero sigue vivo: primas, cobertura, garantías y deuda pública.' },
    ])}
    ${E.note('¿Cuánto cuesta el clima? En 1991 Nordhaus tenía una corazonada de 1–2% del PIB con 3 °C → la EPA propuso en 2022 subir su SCC de $51 a $190 → Bilal y Känzig llegan a $1,056. <b>Por eso</b> las métricas de riesgo importan más para valuar, aunque el número exacto siga siendo incierto y EUA lo haya sacado de su política federal en 2025. ' + E.link('clima/ecc', 'Ver la lectura') + '.', 'Hilo paralelo: de corazonada a rango')}
    <p class="small muted">Fechas y cifras: fuente pública (lista al final), lectura BNEF o "Estimating Climate Cost". Son para ubicarte: el profe pregunta la narrativa, no el dato.</p>

    <h2 id="herramientas">2 · Herramientas</h2>
    ${E.concept({ id: 'fis-trans', title: '🌪️ Riesgo físico vs riesgo de transición', badge: 'in', html: `
      <div class="cols"><div>
        ${E.table([
          ['<b>Físico</b>', 'El clima te pega directo', '<b>Agudo:</b> huracán, inundación, incendio. <b>Crónico:</b> calor, sequía, nivel del mar', 'Destruye activos, frena operación, sube seguros'],
          ['<b>Transición</b>', 'El cambio hacia baja emisión te pega', 'Precio al carbono, regulación, tecnología, preferencias, litigio', 'Sube costos, baja demanda, activos varados'],
        ], { head: ['Riesgo', 'Qué es', 'Ejemplos', 'Canal financiero'] })}
        ${E.formula('Impacto en EBITDA (simple)', 'ΔEBITDA', '− Emisiones × Precio CO₂ × (1 − traslado) − Prob × Daño')}
        <p><b>La clave:</b> se mueven en sentidos opuestos. Si el mundo actúa, baja el físico y sube el de transición; si no actúa, al revés. <b>Lo peor es actuar tarde y de golpe</b>: tienes los dos.</p>
        ${E.kid('Tu casa está junto a un río que crece. Riesgo físico: que se inunde. Riesgo de transición: que el gobierno prohíba vivir ahí o que nadie quiera asegurarla, y que tu casa valga menos aunque nunca se moje.')}
      </div><div>
        ${E.fig(figTradeoff, 'Esquema conceptual, no datos. La lógica de escenarios es la de NGFS y TCFD.')}
        ${E.tip('En su resumen del curso, el profe señala qué conceptos debes conocer de cada tema; para S7 su guía lista <b>riesgo físico vs transición, costo social del carbono e ISSB/NIIF S1 y S2</b>. Antes, en fiscal, puso cambio climático entre los riesgos que empujan el gasto al alza: incendios y ciclones.', 'Clases 28-oct ≈02:43 y 19-oct ≈02:03 (paráfrasis)')}
        ${E.warn('Decir que ESG "ya pasó" y por eso el riesgo climático desapareció. Un huracán no lee las reglas de la SEC. También: confundir físico con transición. <b>Regla rápida:</b> si la causa es el clima, es físico; si la causa es la respuesta al clima, es de transición.')}
      </div></div>` })}

    ${E.concept({ id: 'scc', title: '💨 Costo social del carbono (SCC)', badge: 'in', html: `
      <div class="cols"><div>
        <p><b>Definición:</b> el daño, en valor presente, de emitir <b>una tonelada adicional</b> de CO₂. Es una externalidad: quien emite no paga el daño. Si se cobrara un impuesto igual al SCC (impuesto pigouviano), el emisor internalizaría ese costo.</p>
        ${E.formula('SCC', 'SCC', 'Σ<sub>t</sub> ' + E.frac('Daño<sub>t</sub> por tonelada', '(1 + r)<sup>t</sup>'), 'Lo discutible: la función de daños y r. Las dos mueven el resultado en grande')}
        ${E.formula('Regla de Ramsey', 'r', 'ρ + η · g', 'ρ: impaciencia pura · η: aversión a la desigualdad entre generaciones · g: crecimiento del consumo')}
        ${E.table([
          ['<b>Stern</b> (2006)', '0.1% + 1 × 1.3%', '≈1.4%', 'Ética: casi no cuenta menos una generación futura', '≈$85/t'],
          ['<b>Nordhaus</b> (DICE)', '1.5% + 2 × 1.4%*', '≈4.3%', 'Mercado: r debe parecerse al rendimiento del capital', '$31/t (2017)'],
        ], { head: ['Quién', 'ρ + η·g', 'r', 'Argumento', 'SCC']})}
        <p class="small muted">*Reconstrucción para el pizarrón: DICE usa g variable y parámetros distintos por versión. Fuente pública; no es de tu carpeta.</p>
        ${E.kid('¿Pagarías $100 hoy para evitar un daño de $1,000 a tus tataranietos? Si crees que ellos cuentan igual que tú, sí. Si crees que serán muy ricos o que tus $100 invertidos rendirán más, quizá no. Esa es toda la pelea.')}
      </div><div>
        ${E.fig(figScc, 'Calculado: 100/1.014¹⁰⁰ = 24.9 y 100/1.043¹⁰⁰ = 1.5.')}
        ${E.tip('No hay grabación donde el profe explique el SCC: está en su guía como concepto del tema. Para el ensayo, usa su fórmula de siempre: <b>herramienta → mecanismo → implicación</b>, no opinión.', 'Guía del profe y clase 28-oct')}
        ${E.warn('Reducir todo el debate a la tasa de descuento. <b>Dos perillas abren la brecha:</b> r explica mucho del pleito Stern vs Nordhaus, pero la <b>función de daños</b> también: de $190 (EPA) a $1,056 (Bilal y Känzig) el salto viene de medir distinto el daño. Y no confundas SCC (daño social) con el precio de mercado del carbono (lo que se paga).')}
      </div></div>
      <h4>El rango público: misma pregunta, cifras muy distintas (no memorices, entiende el porqué)</h4>
      ${E.table([
        ['Stern Review', '2006', '≈$85', 'r ≈1.4%; daños catastróficos con peso alto'],
        ['Nordhaus, DICE-2016R', '2017', '$31', 'Dólares de 2010, emisiones de 2015; r de mercado'],
        ['EUA, primera administración Trump', '2017–20', '≈$1–7', 'Sólo daños domésticos y tasas altas (Greenstone lo critica)'],
        ['Rennert et al., <i>Nature</i>', '2022', '$185', 'r cercana a 2%; más del triple de los $51 federales de entonces'],
        ['EPA (borrador)', '2022–23', '$120 / $190 / $340', 'Sube desde $51. r = 2.5% / 2% / 1.5%: el descuento en una sola fila'],
        ['Bilal y Känzig (paper de trabajo)', '2024', '≈$1,056', 'Otra función de daños: choques de temperatura global, +1 °C → −12% del PIB. 5.6 veces los $190 de EPA. Puede sobrestimar; otras versiones públicas del paper dan cifras distintas'],
        ['EUA, Orden Ejecutiva 14154', '2025', 'Retirado', 'Disuelve el grupo de trabajo; casi sin uso federal'],
      ], { head: ['Fuente pública', 'Año', 'SCC, $/tCO₂', 'Qué explica el número'] })}` })}

    ${E.concept({ id: 'issb', title: '📐 ISSB, NIIF S1 y NIIF S2', badge: 'in', html: `
      <div class="cols"><div>
        <p><b>Problema:</b> sostenibilidad ya entraba a decisiones de inversión, pero con una "sopa de letras" de marcos voluntarios que se traslapan. Más costo, más riesgo, menos comparabilidad. <b>Solución:</b> una línea base global, respaldada por G7, G20, IOSCO y FSB (lectura BNEF).</p>
        ${E.table([
          ['<b>Alcance</b>', 'Todo riesgo u oportunidad de sostenibilidad que afecte financieramente', 'Sólo clima'],
          ['<b>Qué agrega</b>', 'Requisitos generales, materialidad, cadena de valor', 'Análisis de escenarios, metas, Alcances 1, 2 y 3'],
          ['<b>Raíz</b>', 'TCFD, SASB, IR, CDSB; GRI como fuente complementaria', 'TCFD; GHG Protocol para medir'],
          ['<b>Aplicación</b>', 'Se aplican juntas', 'No exige usar NIIF contables en tus estados financieros'],
        ], { head: ['', 'NIIF S1', 'NIIF S2'] })}
        ${E.key('<b>ISSB no puede obligar a nadie.</b> Decide cada jurisdicción (por ejemplo, CNBV). Por eso la derogación en la SEC no borra a ISSB: sólo cambia el mapa.')}
        ${E.kid('Antes cada empresa hablaba su propio idioma de sostenibilidad y el inversionista necesitaba diez traductores. ISSB propone un solo idioma, con la gramática de los estados financieros.')}
      </div><div>
        ${E.fig(figSopa, 'Basado en la lectura de BloombergNEF (10-jul-2023).')}
        ${E.warn('<b>Ojo con la lectura:</b> BNEF dice que ISSB parte de "doble materialidad", pero el estándar se dirige a inversionistas y usa <b>materialidad financiera</b>: cómo el mundo afecta a la empresa. La doble suma cómo la empresa afecta al mundo, lógica de GRI y de la CSRD europea. Si el profe pregunta, responde financiera y aclara la diferencia.')}
        ${E.tip('Su guía coloca aquí <b>ISSB y NIIF S1/S2</b>, y entre las noticias tipo pone NIIF S1/S2 en México con la CNBV. Espéralo como ángulo de ensayo.', 'Guía del profe')}
      </div></div>` })}

    <h2 id="labs">3 · Laboratorios</h2>
    <p class="small muted">Todo es <b>ilustrativo</b>: modelos de pizarrón para ver la causalidad, no estimaciones reales.</p>

    <section class="concept" id="lab-scc">
      <header><h3>🔬 Lab 1 · Calculadora del costo social: la perilla que decide todo</h3></header>
      <div class="lab">
        <div class="lab-k">
          <div class="btnrow"><button class="btn sm" id="bStern" type="button">Stern 1.4%</button><button class="btn sm" id="bEpa" type="button">EPA 2%</button><button class="btn sm" id="bNord" type="button">Nordhaus 4.3%</button><button class="btn sm" id="bDano" type="button">Daños × 5.6</button></div>
          <div id="kScc"></div>
        </div>
        <div>
          <div id="tScc"></div>
          ${E.key('<span id="readScc"></span>', 'Cómo leerlo')}
          <div class="g2"><div class="chart h220" id="cScc1"></div><div class="chart h220" id="cScc2"></div></div>
          <p class="small muted">Modelo: una tonelada causa $d₀ de daño el año 1, ese daño crece a <abbr class="gl" data-k="g" data-n="Crecimiento del daño" data-d="Tasa a la que crece cada año el daño de una tonelada en el modelo.">g</abbr> y dura T años; todo se descuenta a r. Con d₀ = $1.20, <abbr class="gl" data-k="g" data-n="Crecimiento del daño" data-d="Tasa a la que crece cada año el daño de una tonelada en el modelo.">g</abbr> = 1.5%, T = 300 y r = 2% da ≈$185: elegí d₀ para que el orden de magnitud coincida con Rennert (2022). <b>d₀ y <abbr class="gl" data-k="g" data-n="Crecimiento del daño" data-d="Tasa a la que crece cada año el daño de una tonelada en el modelo.">g</abbr> son tu función de daños.</b> "Daños × 5.6" sólo escala d₀ para acercarse a los $1,056 de Bilal y Känzig con r = 2%; no replica su método. No es un modelo climático.</p>
          <div class="g2"><div id="kRam"></div><div class="card2"><h4>¿De dónde sale tu r?</h4><p class="small" id="ramOut"></p><button class="btn sm" id="bRam" type="button">Usar esta r en la perilla</button></div></div>
        </div>
      </div>
    </section>

    <section class="concept" id="lab-emp">
      <header><h3>🏭 Lab 2 · Riesgo físico vs transición en una empresa (ilustrativo)</h3></header>
      <div class="lab">
        <div class="lab-k">
          <div class="btnrow"><button class="btn sm" id="bCem" type="button">🧱 Cementera</button><button class="btn sm" id="bHot" type="button">🏖️ Hotel costero</button><button class="btn sm" id="bSof" type="button">💻 Software</button></div>
          <div id="kEmp"></div>
        </div>
        <div>
          <div id="tEmp"></div>
          ${E.key('<span id="readEmp"></span>', 'Cómo leerlo')}
          <div class="g2"><div class="chart h220" id="cEmp1"></div><div class="chart h220" id="cEmp2"></div></div>
          <p class="small muted">Empresa ficticia: ingresos $1,000 M, deuda = 3× EBITDA base. Los tres perfiles usan valores inventados para mostrar contraste; la prima carga 30% sobre la pérdida esperada cubierta.</p>
        </div>
      </div>
    </section>

    <section class="concept" id="lab-issb">
      <header><h3>🗺️ Lab 3 · Mapa de NIIF S1/S2 y Alcances 1, 2 y 3</h3></header>
      ${E.fig(figScope, 'Alcances del GHG Protocol, que NIIF S2 pide reportar. Hay alivios para Alcance 3.', true)}
      <h4>Clasifica cada emisión: ¿qué Alcance es para la empresa?</h4>
      <div class="sx-cl-grid" id="clScope"></div>
      <p class="small" id="clScore"></p>
      <h4>Los cuatro pilares (herencia de TCFD): abre cada uno</h4>
      ${E.reveal('🏛️ Gobernanza', '<b>S1:</b> quién supervisa los riesgos de sostenibilidad en el consejo y la dirección. <b>S2:</b> lo mismo para clima, incluyendo competencias e incentivos. <i>Pregunta de examen:</i> ¿quién responde?')}
      ${E.reveal('🧭 Estrategia', '<b>S1:</b> riesgos y oportunidades que afectan modelo de negocio, cadena de valor y flujos. <b>S2:</b> agrega <b>análisis de escenarios</b> y resiliencia del negocio; distingue riesgo físico y de transición. <i>Aquí conecta directo con el Lab 2.</i>')}
      ${E.reveal('🛡️ Gestión de riesgos', '<b>S1 y S2:</b> cómo se identifica, evalúa, prioriza y monitorea el riesgo, y cómo se integra al proceso general de riesgos de la empresa.')}
      ${E.reveal('📏 Métricas y objetivos', '<b>S2:</b> Alcances 1, 2 (basado en ubicación) y 3; metas climáticas, incluso si un tercero las validó; métricas por industria, basadas en SASB. Intensidad de emisiones no es obligatoria, según BNEF. <b>Enmienda dic-2025 (fuente pública):</b> la categoría 15 del Alcance 3 puede limitarse a emisiones financiadas, excluyendo derivados y actividades facilitadas y de seguros.')}
      <h4>¿Qué pasa con los demás marcos? (lectura BNEF)</h4>
      ${E.table([
        ['TCFD, SASB, IR, CDSB', 'Son la base de ISSB', 'Pueden volverse redundantes, aunque quedan como referencia'],
        ['GRI', 'Sigue', 'El más usado y antiguo (1997); inercia, sobre todo en empresas chicas; foco en impacto'],
        ['GHG Protocol', 'Sigue', 'Es la contabilidad de carbono que S1/S2 necesitan para calcular'],
        ['CDP', 'Sigue', 'Cuestionario estandarizado y cuantitativo; la "lista A" motiva a las empresas'],
        ['PRI', 'Sigue', 'Seis principios de inversión: más filosofía que guía práctica'],
      ], { head: ['Marco', 'Estado', 'Por qué'] })}
    </section>

    <h2 id="conexiones">4 · Conecta S7 con el resto del curso</h2>
    <p class="small">Este es tu mejor truco para ensayos: el clima rara vez llega solo; usa las herramientas que ya dominas.</p>
    ${E.table([
      [`<b>S6 ${E.link('bancos', 'Bancos y aseguradoras')}</b>`, 'Evento físico → la aseguradora sube primas o se retira → la casa pierde asegurabilidad y valor → cae la garantía del crédito hipotecario → el riesgo pasa al banco.', 'Un seguro comparte el riesgo, no lo elimina. Y activos varados afectan capital, como los bonos de SVB.'],
      [`<b>S3 ${E.link('fiscal', 'Deuda y fiscal')}</b>`, 'Lo no asegurado cae en el gobierno: reconstrucción y pasivos contingentes. Menos g y más balance primario negativo.', 'Dinámica de deuda: empeora r − g y el balance primario. El impuesto al carbono recauda, pero la transición también pide gasto.'],
      [`<b>S4 ${E.link('monetaria', 'Inflación y bancos centrales')}</b>`, 'Sequía o precio del carbono = choque de oferta: inflación sube y producto baja. El banco central enfrenta un dilema.', 'Fisher: i = r + πᵉ. Tasas altas castigan activos verdes de larga duración, igual que en el Lab 1.'],
      [`<b>S1 ${E.link('crecimiento', 'Productividad')}</b>`, 'Solow: destruir capital baja k; calor y sequía bajan productividad; desviar inversión a sustituir capital sucio no suma de inmediato.', 'Baja el estado estacionario o la PTF; g menor también cambia la r de Ramsey.'],
    ], { head: ['Tema', 'Mecanismo', 'Herramienta para tu ensayo'] })}

    <h2 id="casos">5 · Lecturas (sin caso Harvard)</h2>
    ${E.tip('Sobre este último tema: <q>no hay un caso</q>. Dijo que hay un video que tienen que ver. La transcripción de esa parte es confusa, así que confirma en Canvas cuál es.', 'Clase 28-oct ≈02:45')}

    ${E.concept({ id: 'bnef', title: '📄 "Mother of All Sustainability Reporting Standards Unveiled" (BNEF, 2023)', html: `
      ${E.note('✅ <b>En tu carpeta.</b> Helen Dewhurst, BloombergNEF, 10-jul-2023.', 'Fuente')}
      ${E.table([
        ['<b>De qué trata</b>', 'ISSB publica NIIF S1 y S2 y sostenibilidad pasa de imperativo moral a riesgo de negocio.'],
        ['<b>Actores y decisión</b>', 'Empresas, inversionistas y reguladores: ¿un estándar común o seguir con marcos que se enciman?'],
        ['<b>Qué pasó</b>', 'Fundación IFRS forma ISSB (14 miembros) en COP26; más de 1,400 comentarios y 400 eventos; vigencia desde 2024.'],
        ['<b>Por qué</b>', 'Fragmentación = costo, doble reporte y poca comparabilidad. Un lenguaje común baja costos de información.'],
        ['<b>Límites</b>', 'ISSB no obliga; hay alivios en Alcance 3; GRI, CDP, PRI y GHG Protocol siguen.'],
        ['<b>Lección</b>', 'Medir es el primer paso: <q>You can\'t manage what you can\'t measure</q>.'],
      ])}` })}

    ${E.concept({ id: 'wke', title: '🕵️ "Who Killed ESG" — ⚠️ no está en tu carpeta', html: `
      ${E.note('No identifiqué la lectura exacta; pregúntale hoy al profe. Hay dos candidatos públicos, <b>sin confirmar</b>: el corto del Financial Times <a href="https://www.the180i.com/who-killed-the-esg-party-a-short-film-by-the-financial-times/" target="_blank" rel="noopener"><i>Who Killed the ESG Party?</i></a> (2024) y la opinión de Kossovsky <a href="https://www.directorsandboards.com/board-issues/esg/opinion-what-killed-esg/" target="_blank" rel="noopener"><i>What Killed ESG?</i></a>. <b>Hipótesis mía:</b> el corto del FT podría ser también el "video" del que habló el profe. Revísalo en Canvas.', 'Resumen de fuente pública')}
      ${E.table([
        ['🏛️ <b>Política</b>', 'Reacción conservadora en EUA; presión antimonopolio sobre alianzas net zero.', 'Salidas de bancos y cierre de NZBA (oct-2025).'],
        ['📉 <b>Rendimiento</b>', 'Peor desempeño, en parte por tasas: activos cuyo valor está lejos en el tiempo sufren más.', 'Misma lógica del Lab 1 y de los bonos de SVB (mi lectura).'],
        ['🎭 <b>Credibilidad</b>', 'Acusaciones de greenwashing; promesas sin medición común.', 'Morningstar retiró la etiqueta "sustentable" a más de 1,200 fondos (según comentario público).'],
      ], { head: ['Sospechoso', 'Argumento', 'Pista'] })}
      ${E.key('<b>El veredicto útil para el examen:</b> murió el término de moda, no el riesgo. Lo material sigue en estados financieros y seguros. Matiz: en el 2T-2026 los fondos sustentables de EUA tuvieron la primera entrada neta desde 2022, muy concentrada en un ETF de infraestructura eléctrica: <b>el dinero sigue el negocio, no la etiqueta</b>.', 'Lección')}
    ` })}

    ${E.concept({ id: 'ecc', title: '🧮 "Estimating Climate Cost": por qué toda estimación tendrá fallas', html: `
      ${E.note('✅ <b>Texto que pasaste por chat.</b> Título real: "Why any estimate of the cost of climate change will be flawed". El texto no trae medio ni fecha. Resumen con mis palabras.', 'Fuente')}
      ${E.key('No hay dos planetas para comparar, así que <b>todo método de estimar el daño climático falla en algo</b>. Aun así, todos apuntan a costos muy superiores a los que imaginó Nordhaus. Incierto no significa pequeño.', 'La tesis')}
      <div class="g2">
        <div class="card2"><h4>1991: tierra desconocida</h4><p class="small">La <b>función de daños</b> traduce grados extra en daño económico. Nordhaus llamó a ese terreno <i>terra incognita</i>, y su cifra, 1–2% del PIB con 3 °C, era sólo una corazonada informada.</p></div>
        <div class="card2"><h4>Hoy: el número que sacude</h4><p class="small">Bilal y Känzig usan <b>volcanes y El Niño</b> como choques de temperatura global: +1 °C → −12% del PIB; más de 3 °C equivale a una guerra permanente. SCC de $1,056/t, contra los $190 que propuso EPA (antes $51). Con eso, a EUA le convendría descarbonizarse aunque nadie más lo haga: su propio beneficio ya paga el costo.</p></div>
      </div>
      <h4>El problema de identificación y cada intento de resolverlo</h4>
      <p class="small">Lo ideal serían dos planetas idénticos, uno calentándose y otro no. Como no existen, cada método busca un contrafactual en la Tierra.</p>
      ${E.table([
        ['<b>Corte transversal</b>', 'Compara países calientes y fríos', 'Simple; mucha variación de temperatura', 'Noruega no es más rica que Nigeria sólo por su clima, y ningún control captura todas las diferencias', 'Contaminado por variables omitidas'],
        ['<b>Panel top-down</b>', 'Sigue regiones en el tiempo', 'Cada región se compara consigo misma', 'Temperatura y crecimiento son <b>no estacionarios y autocorrelacionados</b>: como un borracho, cada posición acumula tropiezos pasados', 'Correlación espuria: dos series con tendencia parecen relacionadas'],
        ['<b>Choques en áreas chicas</b>', 'Mide si un área crece menos tras un año caliente', 'Quita la tendencia: resuelve lo espurio', '<b>Adaptación:</b> nadie cambia de cultivo por un año caliente, sí por décadas. <b>Área chica:</b> un condado con sequía compra comida fuera; el mundo no', 'Sin adaptación, tiende a exagerar*; sin efecto global, a quedarse corto*'],
        ['<b>Panel global</b> (Bilal y Känzig)', 'Usa el mundo entero como panel', 'Captura el efecto global', 'Variación histórica ≈0.1 °C, frente a los 2–3 °C que vienen; muestra desde 1960; El Niño coincidió con crisis de deuda en Latinoamérica y financiera en Asia', '<b>Puede sobrestimar</b> la caída del PIB: pocos datos para aislar esas crisis'],
        ['<b>Bottom-up</b> (EPA)', 'Suma daños por canal: cosechas, mortalidad, nivel del mar, energía para enfriar', 'Se ve de dónde viene cada dólar', 'La lista no es exhaustiva y omite efectos globales, como comercio interrumpido', 'Tiende a quedarse corto*'],
      ], { head: ['Método', 'Qué hace', 'Ventaja', 'Problema', 'Sesgo'] })}
      <p class="small muted">*Dirección inferida por mí del mecanismo; la lectura sólo afirma el sesgo explícitamente para el panel global.</p>
      ${E.kid('El borracho camina a casa dando tumbos. Su perro también camina hacia allá. Que ambos avancen no significa que uno cause al otro: sólo comparten dirección. Por eso se miran los tropiezos, no la posición.')}
      ${E.table([
        ['<b>Clima</b>', 'Sistema complejo: hasta el calentamiento extra por tonelada es incierto. Puntos de inflexión podrían acelerarlo', 'Puede subir el daño'],
        ['<b>Humanos</b>', 'Migración o tecnología de enfriamiento pueden reducir mucho el daño', 'Puede bajar el daño'],
      ], { head: ['Lo que nadie modela bien', 'Por qué', 'Efecto'] })}
      ${E.key('SCC = <b>función de daños</b> × <b>descuento</b>. En el ' + E.link('clima/lab-scc', 'Lab 1') + ', d₀ y <abbr class="gl" data-k="g" data-n="Crecimiento del daño" data-d="Tasa a la que crece cada año el daño de una tonelada en el modelo.">g</abbr> son tu función de daños y r es tu descuento. Stern vs Nordhaus es la pelea por r; esta lectura es la pelea por los daños. Multiplicar los daños multiplica el SCC en la misma proporción.', 'Conexión con el SCC')}
      ${E.warn('<b>No mezcles "más de cinco veces" con "seis veces".</b> Lo de la lectura compara SCC: $1,056 ÷ $190 ≈ 5.6. Un resumen público del paper habla de daños "seis" veces mayores, pero sólo vi un fragmento incompleto; no lo uses. Y no presentes el −12% como hecho: la propia lectura advierte que puede estar sobrestimado.')}
      ${E.tip('Su guía de S7 pone esta lectura como requerida y pide narrativa, no cifras. En examen, explica <b>por qué falla cada método</b>.', 'Guía del profe y clase 28-oct')}
    ` })}

    <h2 id="quiz">6 · Quiz rápido</h2>
    <div id="clQuiz"></div>

    <h2 id="noticias">7 · Noticias de hoy</h2>
    <p class="small">Plantilla del profe: <b>herramienta → mecanismo → implicación</b>. Verificadas el 2-nov-2026 en la fuente enlazada.</p>
    <div class="g2">${newsHtml}</div>

    <h2>Fuentes públicas usadas</h2>
    ${E.reveal('Ver lista', `<ul class="small">
      <li><b>Lecturas del curso:</b> Dewhurst, BloombergNEF (2023), en tu carpeta · "Why any estimate of the cost of climate change will be flawed" (lectura "Estimating Climate Cost"), texto que pasaste por chat.</li>
      <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5321009" target="_blank" rel="noopener">Nordhaus (2017), PNAS</a> · <a href="https://www.eenews.net/articles/epa-floats-sharply-increased-social-cost-of-carbon/" target="_blank" rel="noopener">E&amp;E News: EPA $120/$190/$340</a> · <a href="https://rff.org/news/media-highlights/barons-the-damage-from-carbon-is-more-costly-than-we-thought" target="_blank" rel="noopener">RFF: Rennert et al.</a> · <a href="https://preventionweb.net/quick/86137" target="_blank" rel="noopener">Bilal y Känzig</a> · <a href="https://impactlab.org/?p=1441" target="_blank" rel="noopener">Greenstone, testimonio</a></li>
      <li><a href="https://eelp.law.harvard.edu/tracker/the-social-cost-of-carbon/" target="_blank" rel="noopener">Harvard EELP: seguimiento del SCC</a> · <a href="https://www.jonesday.com/en/insights/2026/02/epa-finalizes-repeal-of-greenhouse-gas-endangerment-finding" target="_blank" rel="noopener">Jones Day: <i>endangerment finding</i></a> · <a href="https://www.esgtoday.com/?p=21507" target="_blank" rel="noopener">ESG Today: NZBA</a></li>
      <li><a href="https://www.iasplus.com/en/news/2025/12/ghg-emissions-amendments" target="_blank" rel="noopener">IAS Plus: enmiendas a NIIF S2</a> · <a href="https://asg.cnbv.gob.mx/sites/default/files/2026-03/documento_de_apoyo_para_la_elaboracion_del_informe_de_sostenibilidad_version_final_marzo_2026_vf.pdf" target="_blank" rel="noopener">CNBV: documento de apoyo (mar-2026)</a> · <a href="https://www.spglobal.com/sustainable1/en/insights/research-reports/issb-q3-2026" target="_blank" rel="noopener">S&amp;P Global: adopción de ISSB</a></li>
      <li><a href="https://www.swissre.com/press-release/Rising-heat-growing-exposure-changing-hazards-benign-first-half-of-2026-masks-rising-natural-catastrophe-risk-finds-Swiss-Re-Institute/f7d55896-a23e-43fa-9dd4-f6b17ed152e6" target="_blank" rel="noopener">Swiss Re: 1S-2026</a> · <a href="https://riskandinsurance.com/natural-catastrophe-insured-losses-hit-107-billion-in-2025-as-wildfire-and-storm-risks-accelerate/" target="_blank" rel="noopener">Risk &amp; Insurance: 2025</a> · <a href="https://www.claimsjournal.com/news/national/2026/10/29/340993.htm" target="_blank" rel="noopener">Aon vía Claims Journal: 9M-2026</a></li>
    </ul>`)}
    `;

    // ---- apuntes
    const notes = root.querySelector('#clNotes');
    try { notes.value = localStorage.getItem('clima_notas_invitada') || ''; } catch (e) {}
    notes.addEventListener('input', () => { try { localStorage.setItem('clima_notas_invitada', notes.value); } catch (e) {} });

    // ---- Lab 1
    let s1 = null, c1a = null, c1b = null;
    const rGrid = []; for (let r = 0.01; r <= 0.0701; r += 0.0025) rGrid.push(+r.toFixed(4));
    const upd1 = (x) => {
      const v = scc(x.r, x.g, x.T, x.d0), after = sccAfter(x.r, x.g, x.T, x.d0, 100), sh = v ? after / v : 0;
      const f100 = 100 / Math.pow(1 + x.r, 100);
      const total = x.em * v, gap = x.em * Math.max(0, v - x.pc);
      s1 = x;
      E.tiles(root.querySelector('#tScc'), [
        { label: 'Costo social, modelo', v, fmt: '$', dec: 0, note: 'por tonelada de CO₂', hl: true },
        { label: '$100 de daño en año 100', v: f100, fmt: '$', dec: 1, note: 'valen esto hoy' },
        { label: 'Daño social de tus emisiones', v: total, fmt: '$', dec: 0, note: '$ M: emisiones × SCC' },
        { label: 'Externalidad sin pagar', v: gap, fmt: '$', dec: 0, note: '$ M: (SCC − precio) × emisiones' },
        { label: 'Peso de después del año 100', v: sh, fmt: 'pct', dec: 0, note: 'del SCC total' },
      ]);
      const postura = x.r < 0.02 ? 'Estás del lado de <b>Stern</b>: casi no castigas el futuro' : x.r <= 0.035 ? 'Estás en la <b>zona media</b>, cerca de las tasas recientes de EPA y de Rennert' : 'Estás del lado de <b>Nordhaus</b>: el futuro se descuenta como un rendimiento de mercado';
      const precio = v > x.pc ? `Al precio de mercado de ${F.$(x.pc)}, cada tonelada sigue dejando ${F.$(v - x.pc)} de daño sin pagar: se emite de más.` : `El precio de ${F.$(x.pc)} ya cubre el daño del modelo: aquí no habría externalidad pendiente.`;
      root.querySelector('#readScc').innerHTML = `${postura}. El SCC sale en <b>${F.$(v)}</b> por tonelada. ${precio} Además, <b>${F.pct(sh, 0)}</b> del valor viene de daños después del año 100: ${sh >= 0.4 ? 'buena parte del costo cae en gente que no ha nacido, y por eso el debate es ético.' : sh >= 0.1 ? 'lo lejano todavía pesa, pero ya manda lo que ocurre en este siglo.' : 'con esta r, lo muy lejano casi no cuenta, y por eso la política recomendada es gradual.'} <b>Dos perillas abren la brecha:</b> con estos daños, pasar de 4.3% a 1.4% multiplica el SCC ×${F.n(scc(R_STERN, x.g, x.T, x.d0) / scc(R_NORD, x.g, x.T, x.d0), 1)}; y tu función de daños ya está en ×${F.n(x.d0 / 1.2, 1)} frente a la base (d₀ = $1.20), y esa perilla mueve el SCC en la misma proporción.`;
      if (c1a) c1a.refresh(); if (c1b) c1b.refresh();
    };
    const k1 = E.knobs(root.querySelector('#kScc'), [
      { k: 'r', label: 'Tasa de descuento (r)', min: 0.01, max: 0.07, step: 0.001, v: R_EPA, fmt: 'pct', dec: 1, hint: 'La perilla que más mueve el resultado' },
      { k: 'd0', label: 'Daño inicial por tonelada, $/año (d₀)', min: 0.2, max: 8, step: 0.1, v: 1.2, fmt: '$', dec: 2, hint: 'Tu función de daños' },
      { k: 'g', label: 'Crecimiento del daño (<abbr class="gl" data-k="g" data-n="Crecimiento del daño" data-d="Tasa a la que crece cada año el daño de una tonelada en el modelo.">g</abbr>)', min: 0, max: 0.025, step: 0.001, v: 0.015, fmt: 'pct', dec: 1 },
      { k: 'T', label: 'Horizonte (años)', min: 100, max: 400, step: 50, v: 300, fmt: 'n' },
      { k: 'em', label: 'Emisiones, MtCO₂ al año', min: 1, max: 500, step: 1, v: 100, fmt: 'n' },
      { k: 'pc', label: 'Precio de mercado, $/tCO₂', min: 0, max: 200, step: 5, v: 30, fmt: '$' },
    ], upd1, { title: '🎛️ Perillas del costo social' });
    root.querySelector('#bStern').onclick = () => k1.set({ r: R_STERN });
    root.querySelector('#bEpa').onclick = () => k1.set({ r: R_EPA });
    root.querySelector('#bNord').onclick = () => k1.set({ r: R_NORD });
    root.querySelector('#bDano').onclick = () => k1.set({ d0: 6.8, r: R_EPA, g: 0.015, T: 300 });
    let ramR = R_STERN;
    const kR = E.knobs(root.querySelector('#kRam'), [
      { k: 'rho', label: 'ρ: impaciencia pura', min: 0, max: 0.03, step: 0.001, v: 0.001, fmt: 'pct', dec: 1 },
      { k: 'eta', label: 'η: aversión a desigualdad', min: 0.5, max: 3, step: 0.1, v: 1, fmt: 'n', dec: 1 },
      { k: 'gc', label: 'g: crecimiento del consumo', min: 0, max: 0.03, step: 0.001, v: 0.013, fmt: 'pct', dec: 1 },
    ], (x) => { ramR = x.rho + x.eta * x.gc; const o = root.querySelector('#ramOut'); if (o) o.innerHTML = `<b>Ramsey:</b> r = ${F.pct(x.rho, 1)} + ${F.n(x.eta, 1)} × ${F.pct(x.gc, 1)} = <b>${F.pct(ramR, 1)}</b>. Si el futuro será más rico, un peso le vale menos: sube r.`; }, { title: '⚖️ ¿De dónde sale r?' });
    root.querySelector('#bRam').onclick = () => k1.set({ r: Math.min(0.07, Math.max(0.01, +ramR.toFixed(3))) });
    void kR;

    c1a = E.chart(root.querySelector('#cScc1'), (T) => {
      const x = s1;
      return { ...E.baseOpt(T), title: { text: 'SCC según la tasa de descuento', left: 0, top: 0, textStyle: { fontSize: 13, color: T.ink } },
        grid: { left: 8, right: 16, top: 56, bottom: 22, containLabel: true }, legend: { top: 22, left: 0, textStyle: { color: T.ink2, fontSize: 11 }, itemWidth: 10, itemHeight: 10 },
        tooltip: { trigger: 'item', backgroundColor: T.card, borderColor: T.line, textStyle: { color: T.ink, fontSize: 13 }, formatter: (p) => `${p.seriesName}<br>r = ${(p.value[0]).toFixed(1)}% → ${F.$(p.value[1])}/t` },
        xAxis: E.axisVal(T, (v) => v + '%', { min: 1, max: 7, name: 'r', nameLocation: 'end', nameTextStyle: { color: T.muted } }),
        yAxis: E.axisVal(T, (v) => '$' + v),
        series: [
          { name: 'Modelo', type: 'line', showSymbol: false, data: rGrid.map((r) => [r * 100, scc(r, x.g, x.T, x.d0)]), lineStyle: { color: T.c1, width: 3 }, itemStyle: { color: T.c1 } },
          { name: 'Stern', type: 'scatter', symbolSize: 11, data: [[R_STERN * 100, scc(R_STERN, x.g, x.T, x.d0)]], itemStyle: { color: T.c2 } },
          { name: 'Nordhaus', type: 'scatter', symbolSize: 11, data: [[R_NORD * 100, scc(R_NORD, x.g, x.T, x.d0)]], itemStyle: { color: T.c3 } },
          { name: 'Tu r', type: 'scatter', symbolSize: 15, data: [[x.r * 100, scc(x.r, x.g, x.T, x.d0)]], itemStyle: { color: T.c5 } },
        ] };
    });
    const yrs = []; for (let t = 0; t <= 200; t += 10) yrs.push(t);
    c1b = E.chart(root.querySelector('#cScc2'), (T) => {
      const x = s1;
      const ln = (name, r, c, w) => ({ name, type: 'line', showSymbol: false, data: yrs.map((t) => +(100 / Math.pow(1 + r, t)).toFixed(2)), lineStyle: { color: c, width: w }, itemStyle: { color: c } });
      return { ...E.baseOpt(T), title: { text: 'Lo que vale hoy un daño de $100, según cuándo ocurre', left: 0, top: 0, textStyle: { fontSize: 13, color: T.ink } },
        grid: { left: 8, right: 16, top: 56, bottom: 8, containLabel: true }, legend: { top: 22, left: 0, textStyle: { color: T.ink2, fontSize: 11 }, itemWidth: 10, itemHeight: 10 },
        tooltip: { trigger: 'axis', backgroundColor: T.card, borderColor: T.line, textStyle: { color: T.ink, fontSize: 13 }, valueFormatter: (v) => '$' + v },
        xAxis: E.axisCat(yrs, T, { axisLabel: { color: T.ink2, fontSize: 11, interval: 4 }, boundaryGap: false }),
        yAxis: E.axisVal(T, (v) => '$' + v, { max: 100 }),
        series: [ln('Stern 1.4%', R_STERN, T.c2, 2), ln('Nordhaus 4.3%', R_NORD, T.c3, 2), ln('Tu r', x.r, T.c5, 3)] };
    });

    // ---- Lab 2
    let s2 = null, c2a = null, c2b = null;
    const baseEmp = { m: 0.25, i: 500, p: 75, pass: 0.3, prob: 0.05, sev: 0.6, cob: 0.5, mult: 8 };
    const upd2 = (x) => {
      const o = empresa(x); s2 = x;
      E.tiles(root.querySelector('#tEmp'), [
        { label: 'EBITDA esperado', v: o.adj, fmt: '$', dec: 0, base: o.ebitda0, better: 'up', note: '$ M, con clima', hl: true },
        { label: 'Valor de la empresa', v: o.ev, fmt: '$', dec: 0, base: o.ev0, better: 'up', note: '$ M, múltiplo × EBITDA' },
        { label: 'Costo de transición', v: o.trans, fmt: '$', dec: 1, note: `$ M, ${F.n(o.mt, 2)} Mt × precio, neto de traslado` },
        { label: 'Costo físico esperado', v: o.fis, fmt: '$', dec: 1, note: '$ M, retenido + prima' },
        { label: 'EBITDA si ocurre el evento', v: o.adjEvento, fmt: '$', dec: 0, note: '$ M, el año malo' },
        { label: 'Deuda / EBITDA, año malo', v: o.adjEvento > 0 ? o.deuda / o.adjEvento : NaN, fmt: 'x', dec: 1, note: `normal: ${o.adj > 0 ? F.x(o.deuda / o.adj, 1) : '—'}` },
      ]);
      const domina = Math.abs(o.trans - o.fis) < 0.15 * Math.max(o.trans, o.fis, 1e-9) ? 'Los dos riesgos pesan parecido' : o.trans > o.fis ? '<b>Domina transición</b>: lo que te pega es la respuesta al clima' : '<b>Domina físico</b>: lo que te pega es el clima mismo';
      const caida = o.ev0 ? 1 - o.ev / o.ev0 : 0;
      const palanca = o.adjEvento <= 0 ? 'En el año malo el EBITDA ya es negativo: no hay con qué pagar intereses, y el riesgo llega al banco.' : o.deuda / o.adjEvento > 4.5 ? `En el año malo el apalancamiento llega a ${F.x(o.deuda / o.adjEvento, 1)}: el banco acreedor lo nota (S6).` : `En el año malo el apalancamiento llega a ${F.x(o.deuda / o.adjEvento, 1)}: incómodo pero manejable.`;
      const seguro = x.cob > 0.7 ? 'Con tanta cobertura pagas más en promedio por la carga de la prima, pero el año malo duele menos: el seguro compra estabilidad, no ganancia.' : x.cob < 0.2 ? 'Con poca cobertura te ahorras la prima, pero el año malo cae casi todo en ti.' : 'Sube la cobertura y verás el truco: el costo promedio sube un poco, y el año malo mejora mucho.';
      root.querySelector('#readEmp').innerHTML = `${domina}. El valor cae <b>${F.pct(caida, 0)}</b>, de ${F.$(o.ev0)} M a ${F.$(o.ev)} M. ${palanca} ${seguro}`;
      if (c2a) c2a.refresh(); if (c2b) c2b.refresh();
    };
    const k2 = E.knobs(root.querySelector('#kEmp'), [
      { k: 'p', label: 'Precio al carbono, $/tCO₂', min: 0, max: 200, step: 5, v: baseEmp.p, fmt: '$' },
      { k: 'i', label: 'Intensidad, tCO₂ por $M de ingresos', min: 0, max: 3000, step: 10, v: baseEmp.i, fmt: 'n' },
      { k: 'pass', label: 'Traslado del costo al cliente', min: 0, max: 1, step: 0.05, v: baseEmp.pass, fmt: 'pct', dec: 0, hint: 'Poder de mercado' },
      { k: 'm', label: 'Margen EBITDA base', min: 0.05, max: 0.5, step: 0.01, v: baseEmp.m, fmt: 'pct', dec: 0 },
      { k: 'prob', label: 'Prob. anual de evento físico', min: 0, max: 0.3, step: 0.01, v: baseEmp.prob, fmt: 'pct', dec: 0 },
      { k: 'sev', label: 'Severidad, % del EBITDA base', min: 0, max: 1, step: 0.05, v: baseEmp.sev, fmt: 'pct', dec: 0 },
      { k: 'cob', label: 'Cobertura de seguro', min: 0, max: 1, step: 0.05, v: baseEmp.cob, fmt: 'pct', dec: 0 },
      { k: 'mult', label: 'Múltiplo EV/EBITDA', min: 4, max: 15, step: 0.5, v: baseEmp.mult, fmt: 'x', dec: 1 },
    ], upd2, { title: '🎛️ Perillas de la empresa' });
    root.querySelector('#bCem').onclick = () => k2.set({ m: 0.25, i: 2500, pass: 0.3, prob: 0.03, sev: 0.4, cob: 0.6 });
    root.querySelector('#bHot').onclick = () => k2.set({ m: 0.3, i: 100, pass: 0.1, prob: 0.2, sev: 0.8, cob: 0.5 });
    root.querySelector('#bSof').onclick = () => k2.set({ m: 0.35, i: 10, pass: 0.5, prob: 0.01, sev: 0.2, cob: 0.5 });
    c2a = E.chart(root.querySelector('#cEmp1'), (T) => {
      const o = empresa(s2);
      const cats = ['EBITDA base', 'Transición', 'Físico ret.', 'Prima', 'EBITDA esp.'];
      const l1 = o.ebitda0 - o.trans, l2 = l1 - o.retenido, l3 = l2 - o.prima;
      return { ...E.baseOpt(T), title: { text: 'Del EBITDA base al esperado ($ M)', left: 0, top: 0, textStyle: { fontSize: 13, color: T.ink } }, grid: { left: 8, right: 16, top: 34, bottom: 8, containLabel: true },
        legend: { show: false }, tooltip: { trigger: 'item', backgroundColor: T.card, borderColor: T.line, textStyle: { color: T.ink, fontSize: 13 }, formatter: (p) => `${p.name}: ${F.$(p.value, 1)} M` },
        xAxis: E.axisCat(cats, T, { axisLabel: { color: T.ink2, fontSize: 11, interval: 0 } }), yAxis: E.axisVal(T, (v) => '$' + v),
        series: [
          { type: 'bar', stack: 'w', silent: true, itemStyle: { color: 'transparent' }, data: [0, Math.max(0, l1), Math.max(0, l2), Math.max(0, l3), 0] },
          { type: 'bar', stack: 'w', barMaxWidth: 54, label: { show: true, position: 'top', color: T.ink, fontSize: 11, formatter: (p) => F.n(p.value, 0) },
            data: [{ value: o.ebitda0, itemStyle: { color: T.c2 } }, { value: o.trans, itemStyle: { color: T.c1 } }, { value: o.retenido, itemStyle: { color: T.c5 } }, { value: o.prima, itemStyle: { color: T.c4 } }, { value: o.adj, itemStyle: { color: T.c3 } }] },
        ] };
    });
    const precios = []; for (let p = 0; p <= 200; p += 10) precios.push(p);
    c2b = E.chart(root.querySelector('#cEmp2'), (T) => {
      const x = s2;
      const line = (name, pass, c, w) => ({ name, type: 'line', showSymbol: false, data: precios.map((p) => +empresa({ ...x, p, pass }).ev.toFixed(0)), lineStyle: { color: c, width: w }, itemStyle: { color: c } });
      return { ...E.baseOpt(T), title: { text: 'Valor según el precio al carbono ($ M)', left: 0, top: 0, textStyle: { fontSize: 13, color: T.ink } }, grid: { left: 8, right: 16, top: 56, bottom: 8, containLabel: true },
        legend: { top: 22, left: 0, textStyle: { color: T.ink2, fontSize: 11 }, itemWidth: 10, itemHeight: 10 },
        tooltip: { trigger: 'axis', backgroundColor: T.card, borderColor: T.line, textStyle: { color: T.ink, fontSize: 13 }, valueFormatter: (v) => '$' + F.n(v) },
        xAxis: E.axisCat(precios, T, { axisLabel: { color: T.ink2, fontSize: 11, interval: 3 }, boundaryGap: false }), yAxis: E.axisVal(T, (v) => '$' + v, { min: 0 }),
        series: [line(`Tu traslado (${F.pct(x.pass, 0)})`, x.pass, T.c1, 3), line('Sin traslado', 0, T.c5, 2)] };
    });

    // ---- Lab 3: clasificador
    const items = [
      ['Gas natural quemado en los hornos de una cementera propia', 1, 'Combustión directa en activos propios.'],
      ['Diésel de la flotilla propia de camiones', 1, 'La empresa controla el vehículo y lo quema ella.'],
      ['Electricidad comprada a CFE para una planta', 2, 'Energía comprada: se emitió en otra parte, por tu consumo.'],
      ['Vapor comprado a un parque industrial', 2, 'Igual que electricidad: energía adquirida.'],
      ['Acero comprado a un proveedor para fabricar coches', 3, 'Aguas arriba: es Alcance 1 del proveedor y Alcance 3 tuyo.'],
      ['Gasolina vendida por una petrolera, quemada por sus clientes', 3, 'Aguas abajo: uso de productos vendidos. Suele ser lo más grande en petróleo.'],
      ['Emisiones de una cementera a la que un banco le prestó', 3, 'Emisiones financiadas: categoría 15 del Alcance 3.'],
    ];
    const box = root.querySelector('#clScope'), done = new Set(); let okCount = 0;
    items.forEach(([txt, ans, why], idx) => {
      const row = E.el(`<div class="sx-cl-row"><span>${txt}</span><span class="btnrow">${[1, 2, 3].map((n) => `<button class="btn sm" type="button" data-n="${n}">Alcance ${n}</button>`).join('')}</span><div class="sx-cl-why" hidden></div></div>`);
      row.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
        row.querySelectorAll('button').forEach((y) => y.classList.remove('good-pick', 'bad-pick'));
        const n = +b.dataset.n; b.classList.add(n === ans ? 'good-pick' : 'bad-pick');
        if (n !== ans) row.querySelector(`button[data-n="${ans}"]`).classList.add('good-pick');
        const w = row.querySelector('.sx-cl-why'); w.hidden = false; w.textContent = (n === ans ? '✓ ' : `✗ Es Alcance ${ans}. `) + why;
        if (!done.has(idx)) { done.add(idx); if (n === ans) okCount++; root.querySelector('#clScore').textContent = `Llevas ${okCount} de ${done.size} al primer intento (total ${items.length}).`; }
      }));
      box.appendChild(row);
    });

    // ---- quiz
    E.quiz(root.querySelector('#clQuiz'), [
      { q: 'Una aerolínea enfrenta un nuevo impuesto a la turbosina y un huracán le cierra su principal centro de conexión. ¿Cómo se clasifican, en ese orden?', o: ['Físico y físico', 'Transición y físico', 'Físico y transición', 'Transición y transición'], a: 1, w: 'El impuesto es la respuesta al clima (transición); el huracán es el clima mismo (físico).' },
      { q: 'Si la tasa de descuento baja de 4.3% a 1.4%, con los mismos daños, el costo social del carbono…', o: ['Baja, porque el dinero vale menos', 'No cambia, porque los daños son iguales', 'Sube, porque los daños lejanos pesan más hoy', 'Sube sólo si también crece el PIB'], a: 2, w: 'Con r menor, el factor 1/(1+r)ᵗ cae más despacio; como los daños son muy lejanos, el efecto es enorme.' },
      { q: 'Tu empresa mexicana cotiza en BMV. La SEC propone derogar su regla climática. ¿Qué es lo más correcto?', o: ['Tus obligaciones mexicanas dependen de CNBV, no de la SEC', 'Ya no debes reportar nada', 'ISSB queda derogado en el mundo', 'Sólo cambian tus Alcances 1 y 2'], a: 0, w: 'ISSB no obliga: cada jurisdicción decide. CNBV adoptó su propia regla alineada a NIIF S1/S2.' },
      { q: 'Un año de pérdidas aseguradas bajas significa que…', o: ['El riesgo climático bajó de forma permanente', 'Las primas deben caer a niveles previos', 'El cambio climático no afecta a las aseguradoras', 'Un dato bajo no prueba menor riesgo subyacente: las pérdidas son muy volátiles'], a: 3, w: 'Las catástrofes tienen colas gruesas. Por eso se evalúa tendencia y exposición, no un solo año.' },
      { q: 'Un banco quiere reportar sus emisiones relevantes bajo NIIF S2. ¿Dónde estará lo principal?', o: ['Alcance 1: sus sucursales', 'Alcance 3: emisiones financiadas', 'Alcance 2: electricidad', 'Ninguno: los bancos están exentos'], a: 1, w: 'Su impacto climático y su riesgo están en a quién presta e invierte: categoría 15 del Alcance 3.' },
    ]);
  };

  // ---------------------------------------------------------------- bancos: MCQ
  E.bank.push(
    { topic: TOPIC, q: 'Un banco hipotecario presta en una costa donde las aseguradoras se están retirando. ¿Cuál es el principal canal de riesgo físico para el banco?', o: ['Sube el capital regulatorio por decreto', 'Cae el valor de la garantía y aumenta la probabilidad de impago', 'Sus depositantes reciben más intereses', 'Aumentan sus emisiones de Alcance 1'], a: 1, w: 'Sin seguro, el inmueble vale menos y el acreditado queda más expuesto. El riesgo físico llega al balance por la garantía y el impago.' },
    { topic: TOPIC, q: '¿Por qué riesgo físico y de transición tienden a moverse en sentidos opuestos a nivel global?', o: ['Porque los regulan autoridades distintas', 'Porque uno es de corto plazo y el otro no existe en el largo', 'Porque una política climática más ambiciosa eleva costos de ajuste, pero limita daños futuros', 'Porque el físico sólo afecta a países pobres'], a: 2, w: 'Es el dilema de escenarios: actuar reduce daños físicos pero aumenta costos de transición. Actuar tarde y de golpe combina ambos.' },
    { topic: TOPIC, q: 'Una petrolera tiene reservas que quizá nunca pueda extraer con rentabilidad si sube el precio al carbono. Eso se conoce como:', o: ['Riesgo físico crónico', 'Protección por transferencia', 'Prima de plazo', 'Activos varados, un riesgo de transición'], a: 3, w: 'La política y la tecnología pueden hacer que un activo pierda valor antes de terminar su vida útil.' },
    { topic: TOPIC, q: 'El costo social del carbono mide:', o: ['El valor presente del daño de una tonelada adicional de CO₂', 'El precio promedio de los bonos de carbono', 'Lo que cuesta capturar una tonelada', 'El costo total de cumplir con NIIF S2'], a: 0, w: 'Es una externalidad medida al margen y traída a valor presente. No es precio de mercado ni costo de abatimiento.' },
    { topic: TOPIC, q: 'En esencia, la diferencia entre Stern y Nordhaus está en:', o: ['Si el CO₂ calienta o no el planeta', 'El valor de la tasa de descuento: ética intergeneracional contra rendimiento de mercado', 'La moneda en que se mide el daño', 'El número de países incluidos en el G20'], a: 1, w: 'Con daños lejanos, r pesa muchísimo: Stern usa ≈1.4% y Nordhaus ≈4.3%. Ojo: en el debate más amplio del SCC, la función de daños también abre una brecha enorme.' },
    { topic: TOPIC, q: 'En la regla de Ramsey (r = ρ + η·g), si se espera un mayor crecimiento del consumo futuro:', o: ['r baja, porque habrá más ahorro', 'r no cambia, porque g no influye', 'r sube, y entonces el costo social tiende a bajar', 'η se vuelve negativa'], a: 2, w: 'Generaciones futuras más ricas valoran menos un peso adicional; sube el descuento y baja el peso de sus daños.' },
    { topic: TOPIC, q: 'Un impuesto pigouviano al carbono igual al costo social busca principalmente:', o: ['Financiar pensiones', 'Eliminar por completo las emisiones', 'Reducir el déficit externo', 'Que el emisor internalice el daño externo que causa'], a: 3, w: 'Corrige la externalidad: el precio privado incorpora el costo social. Lo eficiente no suele ser cero emisiones.' },
    { topic: TOPIC, q: 'Según la lectura de BNEF, ¿cuál fue la razón principal para crear ISSB?', o: ['Una "sopa de letras" de marcos voluntarios que encarecía y dificultaba comparar', 'Sustituir las normas contables NIIF', 'Fijar un impuesto global al carbono', 'Obligar a los bancos centrales a reportar emisiones'], a: 0, w: 'Había demanda de información comparable y un paisaje fragmentado que causaba doble reporte y costos.' },
    { topic: TOPIC, q: '¿Cuál es la diferencia correcta entre NIIF S1 y NIIF S2?', o: ['S1 es obligatoria y S2 es voluntaria', 'S1 es para bancos y S2 para el sector real', 'S1 da requisitos generales de sostenibilidad; S2 se concentra en clima', 'S1 mide Alcance 1 y S2 mide Alcance 2'], a: 2, w: 'S1 es el marco general; S2 añade lo climático, como escenarios y Alcances. Se aplican juntas.' },
    { topic: TOPIC, q: 'ISSB publicó sus normas. ¿Quién decide si una empresa de un país está obligada a aplicarlas?', o: ['El propio ISSB', 'La autoridad de cada jurisdicción', 'El FMI', 'El GHG Protocol'], a: 1, w: 'ISSB no tiene facultad para exigir su aplicación. En México, esa decisión pasó por CNBV.' },
    { topic: TOPIC, q: 'La materialidad que usa ISSB se enfoca sobre todo en:', o: ['El daño de la empresa a comunidades, aunque no afecte sus finanzas', 'Lo que pidan las ONG', 'El efecto sobre la reputación del CEO', 'Lo que puede afectar razonablemente las decisiones de inversionistas y prestamistas'], a: 3, w: 'Es materialidad financiera. La doble materialidad suma el impacto hacia afuera (GRI, CSRD). La lectura BNEF usa el término con poca precisión.' },
    { topic: TOPIC, q: 'Una planta compra electricidad generada con carbón a un tercero. Para la planta, esas emisiones son:', o: ['Alcance 2', 'Alcance 1', 'Alcance 3, categoría 15', 'No se reportan'], a: 0, w: 'Es energía adquirida: Alcance 2. Para la generadora serían Alcance 1.' },
    { topic: TOPIC, q: '¿Cuál secuencia refleja mejor la narrativa de la guía del profe?', o: ['ISSB → París → auge ESG → retroceso', 'París → auge ESG y TCFD → ISSB → retroceso político en EUA → extremos y costos para aseguradoras', 'Retroceso ESG → París → TCFD → ISSB', 'Auge ESG → retroceso → París → ISSB'], a: 1, w: 'Es la línea causal: compromiso político, demanda financiera, estandarización, reacción política y costo físico persistente.' },
    { topic: TOPIC, q: 'La SEC propone derogar su regla climática. Con las herramientas del curso, la mejor lectura es:', o: ['El riesgo climático dejó de ser material', 'Todas las empresas en EUA dejan de medir emisiones', 'ISSB queda sin efecto en México', 'Cambia la obligación federal, pero lo material sigue reportable y otras jurisdicciones mantienen reglas'], a: 3, w: 'La propuesta no elimina la obligación general de revelar riesgos materiales; California, México y otros van por otro lado: fragmentación, no desaparición.' },
    { topic: TOPIC, q: 'Las pérdidas aseguradas por catástrofes a 9 meses de 2026 son las más bajas desde 2019. La conclusión más sólida es:', o: ['Las primas deben volver al nivel de 2019', 'El cambio climático se revirtió', 'Es un dato volátil: no demuestra menor riesgo subyacente, y aumenta la exposición', 'Las aseguradoras pueden cancelar su reaseguro'], a: 2, w: 'Lo señala la propia Gallagher Re. Aseguradoras modelan colas y tendencias, no un solo año.' },
    { topic: TOPIC, q: 'Las pérdidas no aseguradas por eventos climáticos suelen presionar las finanzas públicas porque:', o: ['Se vuelven pasivos contingentes: reconstrucción y apoyo que empeoran el balance primario', 'Aumentan automáticamente g', 'Reducen r a cero', 'Sólo se pagan con reservas internacionales'], a: 0, w: 'En la dinámica de deuda, más gasto y menos crecimiento presionan por dos lados: balance primario y r − g.' },
    { topic: TOPIC, q: 'Una sequía encarece alimentos y reduce producto. Para un banco central, esto es difícil porque:', o: ['Es un choque de demanda que se corrige bajando tasas', 'Es un choque de oferta: subir tasas enfría demanda sin crear oferta y baja la actividad', 'No afecta la inflación esperada', 'Obliga a fijar el tipo de cambio'], a: 1, w: 'Es el dilema clásico de oferta. Importa si se contaminan las expectativas, πᵉ en Fisher.' },
    { topic: TOPIC, q: 'En 2022 las acciones de energía limpia cayeron cuando subieron las tasas. El mecanismo financiero más directo es:', o: ['Bajó el precio de la electricidad a cero', 'Desaparecieron las metas de París', 'Los fondos ESG tienen prohibido comprar bonos', 'Sus flujos están lejos en el tiempo: al subir r cae más su valor presente'], a: 3, w: 'Es duración, la misma lógica de los bonos de SVB y del descuento del costo social.' },
    { topic: TOPIC, q: 'Comparar el PIB de Noruega y Nigeria para estimar el daño del calor falla principalmente porque:', o: ['Ambos países tienen la misma temperatura', 'Las diferencias de ingreso también reflejan muchos otros factores que los controles no capturan', 'Los datos de PIB no existen antes de 2000', 'El método ignora la tasa de descuento'], a: 1, w: 'Es sesgo por variables omitidas: el clima se lleva el crédito de diferencias que tienen otras causas.' },
    { topic: TOPIC, q: 'Un economista corre una regresión entre el nivel de temperatura y el PIB de una región durante décadas, y halla una relación fuerte. ¿Por qué desconfiar?', o: ['Porque las dos series tienen tendencia y acumulan desviaciones pasadas: la correlación puede ser espuria', 'Porque la temperatura sólo cambia en países ricos', 'Porque seguir una región en el tiempo siempre da cero', 'Porque el PIB no se puede medir en términos reales'], a: 0, w: 'Es el problema de series no estacionarias y autocorrelacionadas, como el borracho: comparten rumbo sin que una cause a la otra.' },
    { topic: TOPIC, q: 'Usar choques de temperatura de un año para proyectar daños de décadas puede exagerar el daño porque:', o: ['Un año caliente siempre eleva la productividad', 'Los choques son demasiado grandes', 'Se excluye al sector agrícola', 'Con un año caliente nadie se adapta, pero con décadas sí puede cambiar de cultivo o tecnología'], a: 3, w: 'Mide la reacción de corto plazo, sin adaptación. La dirección es una inferencia del mecanismo.' },
    { topic: TOPIC, q: 'Estimar el daño con datos de condados puede quedarse corto, sobre todo porque:', o: ['Los condados tienen demasiados datos', 'Las áreas chicas siempre son más pobres', 'Un área afectada puede comprar fuera, algo que el mundo entero no podría hacer', 'Las áreas chicas no tienen temperatura medible'], a: 2, w: 'El comercio amortigua un choque local. Un choque global no tiene ese "afuera".' },
    { topic: TOPIC, q: '¿Por qué el panel global de Bilal y Känzig podría sobrestimar el daño?', o: ['Porque descarta volcanes y El Niño', 'Porque tiene pocas observaciones desde 1960, y es difícil separar El Niño de crisis económicas coincidentes', 'Porque usa una tasa de descuento de cero', 'Porque sólo mide a EUA'], a: 1, w: 'Parte de la caída atribuida a la temperatura podría deberse a esas crisis, como la de deuda en Latinoamérica.' },
    { topic: TOPIC, q: 'Otra debilidad del panel global es que la variación histórica es de ≈0.1 °C. ¿Qué problema crea eso?', o: ['Obliga a extrapolar a 2–3 °C desde choques mucho menores, fuera de lo observado', 'Hace imposible calcular el PIB mundial', 'Elimina el efecto de adaptación por completo', 'Garantiza que el daño estimado sea exacto'], a: 0, w: 'Es extrapolación: un calentamiento grande y persistente podría comportarse distinto, con puntos de inflexión o adaptación.' },
    { topic: TOPIC, q: 'El enfoque bottom-up de EPA suma daños por canal. ¿Cuál es su principal limitación?', o: ['No puede expresarse en dólares', 'Sólo mide choques de El Niño', 'Confunde a Noruega con Nigeria', 'La lista de daños no es exhaustiva y omite efectos globales como el comercio interrumpido'], a: 3, w: 'Lo que no está en la lista vale cero, así que tiende a quedarse corto. La dirección es inferencia del mecanismo.' },
    { topic: TOPIC, q: 'Si todos los métodos tienen fallas, ¿cuál es la conclusión más sólida de la lectura?', o: ['No hay que usar ningún SCC', 'El número exacto seguirá incierto, pero los métodos coinciden en costos muy superiores a la corazonada de Nordhaus', 'El panel global es el correcto y el costo es exactamente $1,056', 'La adaptación eliminará todo el daño'], a: 1, w: 'Incierto no significa pequeño. Es la tesis que debes llevar al ensayo.' },
    { topic: TOPIC, q: 'En un Solow con daño climático, una destrucción recurrente de capital y menor productividad implican:', o: ['Mayor convergencia automática sin costo', 'Un estado estacionario más bajo', 'Mayor PTF por reconstrucción, siempre', 'Un efecto nulo en el largo plazo'], a: 1, w: 'Más depreciación efectiva y menor A reducen k y y de estado estacionario. Reconstruir repone, pero no suma.' },
  );

  // ---------------------------------------------------------------- bancos: ensayos
  E.essays.push(
    { topic: TOPIC, type: 'caso', prompt: 'Con base en la lectura de BloombergNEF: ¿por qué hacían falta las normas de ISSB, qué cambian NIIF S1 y S2, y cuáles son sus límites?', tools: ['ISSB', 'NIIF S1 y S2', 'Materialidad financiera', 'Alcances 1, 2 y 3', 'Riesgo físico y de transición'], outline: ['Problema: sopa de letras, costo y poca comparabilidad', 'Solución: S1 marco general, S2 clima; base en TCFD, SASB, IR y CDSB', 'Cambio de fondo: de imperativo moral a riesgo financiero', 'Límites: ISSB no obliga, alivios en Alcance 3, otros marcos siguen', 'México: CNBV muestra cómo opera la adopción por jurisdicción'],
      model: 'Las normas de ISSB responden a una contradicción que describe BloombergNEF: los factores de sostenibilidad ya pesaban en decisiones de inversión, pero la información disponible venía de una "sopa de letras" de marcos voluntarios. CDP miraba hacia atrás, TCFD hacia adelante, y muchas empresas combinaban varios. El resultado era doble reporte, más costos y datos difíciles de comparar. En términos económicos, había un problema de información: si el inversionista no puede comparar, no puede poner bien el precio del riesgo.\n\nPor eso la Fundación IFRS creó ISSB en la COP26 de 2021, con respaldo del G7, el G20, IOSCO y el FSB. En junio de 2023 publicó dos normas que se aplican juntas. NIIF S1 da los requisitos generales para revelar riesgos y oportunidades de sostenibilidad que puedan afectar financieramente a la empresa, en toda su cadena de valor. NIIF S2 se concentra en clima: exige análisis de escenarios, metas y emisiones de Alcance 1, 2 y, salvo alivios, 3. Ambas toman la estructura de TCFD: gobernanza, estrategia, gestión de riesgos, y métricas y objetivos.\n\nLo importante es el cambio de lógica. El clima deja de ser un tema de reputación y se trata como riesgo de negocio, a la par de la información financiera. Una cementera debe explicar cuánto la afecta un precio al carbono, que es riesgo de transición, y una cadena hotelera costera cuánto la afectan los huracanes, que es riesgo físico. Esa información permite comparar el impacto en flujos y valor.\n\nSin embargo, las normas tienen límites. Primero, ISSB no puede obligar: cada jurisdicción decide. México la adoptó vía CNBV, mientras la SEC en Estados Unidos va en dirección contraria, así que la meta de un lenguaje global queda incompleta. Segundo, el Alcance 3 tiene alivios y datos de terceros poco confiables. Tercero, marcos como GRI, CDP y PRI seguirán, porque cumplen otras funciones; GRI, por ejemplo, se enfoca en impacto. Además, ISSB usa materialidad financiera: no mide todo el daño que una empresa causa al mundo, sino lo que afecta a sus inversionistas.\n\nEn conclusión, ISSB no resuelve el cambio climático, pero sí reduce un problema de información. Es condición necesaria para valuar bien el riesgo, no suficiente para reducirlo.' },
    { topic: TOPIC, type: 'caso', prompt: '¿"Quién mató" al ESG? Explica las causas de su retroceso y si eso significa que el riesgo climático dejó de importar para empresas e inversionistas.', tools: ['Narrativa ESG', 'Tasa de descuento y duración', 'Fisher', 'Riesgo físico y de transición', 'ISSB y materialidad'], outline: ['Auge: tasas bajas, París, TCFD, promesas', 'Sospechoso 1: tasas altas y rendimiento', 'Sospechoso 2: política en EUA', 'Sospechoso 3: greenwashing y medición', 'Veredicto: murió la etiqueta, no el riesgo'],
      model: 'El ESG creció tras el Acuerdo de París de 2015, apoyado en TCFD y en un entorno de tasas bajas. Prometía a la vez hacer el bien y ganar más. Su retroceso, sobre todo en Estados Unidos, no tiene un solo culpable: combina finanzas, política y credibilidad.\n\nEl primer sospechoso es el rendimiento. Al subir las tasas tras la pandemia, cayó el valor de los activos cuyos flujos están lejos en el tiempo, como muchas empresas de energía limpia. Es la misma lógica de duración que golpeó los bonos de Silicon Valley Bank: una r más alta reduce el valor presente. Si además la promesa era superar al mercado, el golpe también fue narrativo.\n\nEl segundo sospechoso es la política. En Estados Unidos, ESG se volvió tema partidista. Bancos abandonaron alianzas climáticas por presiones políticas y antimonopolio, y la Net-Zero Banking Alliance dejó de operar en 2025. Washington retiró el costo social del carbono, y la SEC dejó de defender su regla climática y propuso derogarla en 2026.\n\nEl tercer sospechoso es la credibilidad. Las acusaciones de greenwashing mostraron que un mismo fondo podía llamarse sustentable sin una medición común. Además, juntar ambiente, sociedad y gobierno en una sola etiqueta dificultaba saber qué se compraba.\n\nAhora bien, retroceso no significa que el riesgo desapareció. Un huracán no depende de quién esté en la SEC. Las aseguradoras siguen viendo pérdidas altas por tormentas e incendios, y Gallagher Re advierte que un año tranquilo no prueba menor riesgo. A eso se suma el riesgo de transición: California exige reportar emisiones y México adoptó NIIF S1 y S2. Incluso Morningstar reportó en el segundo trimestre de 2026 la primera entrada neta a fondos sustentables de Estados Unidos desde 2022, concentrada en infraestructura eléctrica: el capital sigue una oportunidad de negocio, no una etiqueta.\n\nPor eso mi veredicto es que murió el término de moda y lo que queda es más serio: tratar el clima como riesgo financiero material. Para un inversionista, la pregunta correcta ya no es si una empresa es "ESG", sino cuánto caen su EBITDA y su valor con un precio al carbono o con un evento físico. ISSB apunta justo ahí: menos moral y más flujo de efectivo.' },
    { topic: TOPIC, type: 'caso', prompt: 'Dos economistas aceptan casi los mismos daños físicos y llegan a costos sociales del carbono muy distintos. Explica por qué y qué implica para la política climática y para la valuación de una empresa.', tools: ['Costo social del carbono', 'Valor presente y tasa de descuento', 'Regla de Ramsey', 'Stern vs Nordhaus', 'Impuesto pigouviano'], outline: ['SCC: daño marginal en valor presente', 'r domina porque los daños son lejanos', 'Ramsey: Stern 0.1 + 1×1.3; Nordhaus mercado', 'Política: actuar fuerte vs gradual', 'Empresa: precio interno, activos varados; rango como riesgo'],
      model: 'El costo social del carbono mide el daño, en valor presente, de emitir una tonelada adicional de CO₂. Es una externalidad: quien emite no paga ese daño. Su cálculo tiene tres pasos: traducir emisiones a temperatura, temperatura a daños económicos, y esos daños futuros a dólares de hoy. Dos economistas pueden coincidir bastante en los dos primeros y aun así llegar a cifras muy distintas por el tercero.\n\nLa razón es matemática. Como los daños climáticos duran siglos, la tasa de descuento domina. Un daño de 100 dólares dentro de cien años vale hoy cerca de 25 dólares a 1.4%, pero apenas 1.5 a 4.3%. Es el mismo daño con un valor unas 17 veces distinto.\n\nEse es el núcleo del debate entre Stern y Nordhaus. La regla de Ramsey separa la tasa en dos partes: r = ρ + η·g. Stern usa una impaciencia pura casi nula, de 0.1%, porque considera que una persona futura vale éticamente lo mismo; su r queda cerca de 1.4%. Nordhaus argumenta que r debe parecerse al rendimiento observado del capital, cerca de 4.3%: si invertir rinde más, podríamos dejar a las futuras generaciones más riqueza productiva que un menor nivel de emisiones. Por eso Stern sugirió cerca de 85 dólares por tonelada en 2006, mientras que Nordhaus estimó 31 en 2017. Pero el descuento no explica todo el rango: con otra función de daños, Bilal y Känzig llegan a más de mil dólares.\n\nLa implicación de política es directa. Un impuesto pigouviano igual al costo social haría que el emisor internalice el daño. Con costo alto conviene actuar pronto y con fuerza; con costo bajo, una ruta gradual. Por eso el debate no es sólo técnico: elegir r es elegir cuánto pesan las generaciones futuras. También explica por qué un gobierno puede cambiar el resultado, como pasó en Estados Unidos, al usar tasas altas o sólo daños domésticos.\n\nPara una empresa, la lección es que el precio futuro del carbono es incierto. Una cementera debería valuar proyectos con varios precios internos, porque un activo rentable a 30 dólares puede quedar varado a 150. Ese rango no es una falla del análisis: es el riesgo de transición que debe entrar en su valuación y en la revelación por escenarios de NIIF S2.' },
    { topic: TOPIC, type: 'caso', prompt: 'Con base en la lectura "Estimating Climate Cost": ¿por qué es tan difícil estimar el costo del cambio climático, qué falla en cada método y qué se puede concluir para la política y los negocios?', tools: ['Función de daños', 'Costo social del carbono', 'Identificación y variables omitidas', 'Correlación espuria', 'Enfoques top-down y bottom-up'], outline: ['Sin dos planetas: el problema de identificación', 'Corte transversal y panel: variables omitidas y correlación espuria', 'Choques: adaptación y áreas chicas', 'Panel global: Bilal y Känzig, y por qué puede sobrestimar', 'Bottom-up y conclusión: incierto, pero alto'],
      model: 'Estimar el costo del cambio climático significa construir una función de daños: traducir grados adicionales en pérdida económica. De ella depende, junto con la tasa de descuento, el costo social del carbono. En 1991, Nordhaus sólo tenía una corazonada informada: 1 a 2% del PIB con 3 °C. Hoy hay mejores métodos, pero el problema de fondo sigue: no existen dos planetas idénticos, uno que se calienta y otro que no. Sin ese contrafactual, cada método introduce su propia falla.\n\nEl primer intento comparó países calientes y fríos. Falla por variables omitidas: Noruega no es más rica que Nigeria sólo por su temperatura. Seguir regiones en el tiempo mejora, pero temperatura y crecimiento tienen tendencia y acumulan desviaciones pasadas, como un borracho que camina hacia su casa. Comparar esas series puede dar una correlación espuria.\n\nLa solución fue mirar choques de temperatura. Esto limpia la tendencia, pero abre dos problemas. Un año caliente no provoca adaptación, y décadas sí, por lo que el efecto de corto plazo puede exagerar el daño. Además, un área chica puede comprar alimentos fuera, algo que el mundo no puede hacer, lo que puede subestimarlo.\n\nBilal y Känzig atacan ese último punto usando el mundo entero como panel, con volcanes y El Niño como choques. Encuentran que 1 °C adicional reduce 12% el PIB, y un costo social de 1,056 dólares por tonelada, más de cinco veces los 190 que propuso la EPA. Sin embargo, su variación histórica ronda una décima de grado, tienen pocos datos desde 1960 y El Niño coincidió con crisis financieras, así que pueden sobrestimar. Por su parte, el enfoque bottom-up de la EPA suma cosechas, mortalidad, nivel del mar y energía, pero su lista es incompleta y omite efectos globales como el comercio.\n\nAdemás, puntos de inflexión podrían elevar el daño, y la adaptación, reducirlo. Por eso el número exacto seguirá siendo incierto.\n\nLa conclusión no es que el costo no se pueda usar. Todos los métodos, pese a sus fallas, apuntan a costos muy superiores a la corazonada original. Para política, esto justifica tomar decisiones con rangos, no con una cifra. Para una empresa, significa valuar proyectos con varios escenarios de precio al carbono y riesgo físico, como pide NIIF S2. Incierto no significa pequeño.' },
    { topic: TOPIC, type: 'noticia', prompt: 'Noticia: Gallagher Re estima pérdidas aseguradas por catástrofes de $92 mil millones en los primeros nueve meses de 2026, las más bajas desde 2019, y advierte que eso no significa menor riesgo. Interprétala con las herramientas del curso.', tools: ['Riesgo físico', 'Intermediación y transferencia de riesgo', 'Dinámica de deuda', 'Choques de oferta'], outline: ['Hecho: bajo el promedio, pero tormentas ≈60%', 'Herramienta: riesgo físico y colas, año vs tendencia', 'Mecanismo: primas → cobertura → garantías → bancos', 'Fiscal: lo no asegurado se vuelve pasivo contingente', 'Implicación para México y qué vigilar'],
      model: 'Gallagher Re estimó en octubre de 2026 que las pérdidas aseguradas por catástrofes naturales llegaron a unos 92 mil millones de dólares a septiembre, 29% por debajo del promedio de diez años y las más bajas desde 2019. Aon reportó una cifra parecida. A primera vista parece que el riesgo físico bajó. Con las herramientas del curso, la lectura es distinta.\n\nPrimero, un dato de un año no mide la tendencia. Las catástrofes son eventos de cola: pocos eventos explican gran parte de la pérdida. Este año ningún evento superó 10 mil millones asegurados y la temporada de huracanes fue benigna en pérdidas, pero la propia Gallagher Re advierte que no debe interpretarse como un menor riesgo subyacente. Además, las tormentas convectivas ya son casi 60% del total. El riesgo no sólo vive en grandes huracanes: también en eventos frecuentes que erosionan las utilidades de las aseguradoras.\n\nSegundo, el mecanismo financiero importa más que el titular. Una aseguradora funciona como intermediario de riesgo: cobra primas hoy y paga si ocurre el evento. Si espera pérdidas mayores, sube primas o se retira de ciertas zonas. Esto se transmite como en el tema de bancos: sin seguro, un inmueble pierde valor como garantía, lo que aumenta el riesgo del crédito hipotecario. Por lo tanto, un año tranquilo puede aliviar primas, pero no cambia el problema de fondo si la exposición sigue creciendo.\n\nTercero, está la parte que nadie aseguró. Aon estima pérdidas económicas de 204 mil millones de dólares a septiembre: menos de la mitad estaba asegurada. Esa brecha recae en hogares, empresas y gobiernos. En la dinámica de deuda, la reconstrucción empeora el balance primario y un menor crecimiento afecta r − g. Para un país con poco espacio fiscal como México, un gran huracán es un pasivo contingente, igual que lo son otras contingencias que el curso discutió para las finanzas públicas.\n\nLa implicación es que no conviene celebrar demasiado. Los inversionistas deberían separar el ciclo de pérdidas de la tendencia, y las empresas deberían revelar su exposición con escenarios, como pide NIIF S2. Yo vigilaría dos cosas: si las primas bajan por la competencia entre reaseguradoras, y qué ocurre con la cobertura en las zonas más expuestas.' },
    { topic: TOPIC, type: 'noticia', prompt: 'Noticia: mientras la SEC propone derogar su regla climática federal, California mantiene el 10 de noviembre de 2026 como primer plazo para reportar emisiones de Alcance 1 y 2 bajo SB 253. Interpreta qué significa para empresas e inversionistas.', tools: ['ISSB y materialidad financiera', 'Alcances 1, 2 y 3', 'Riesgo de transición', 'Narrativa de retroceso ESG'], outline: ['Hecho: SEC retrocede, California avanza', 'Herramienta: el reporte es información para valuar riesgo', 'Mecanismo: fragmentación, costo y arbitraje regulatorio', 'Riesgo de transición ahora también regulatorio', 'Implicación: medir de todos modos; México y CNBV'],
      model: 'La SEC propuso en mayo de 2026 (publicado el 3 de junio) derogar por completo su regla climática de 2024, que nunca entró en vigor, con el argumento de que excede sus facultades y se aparta de la materialidad tradicional. Al mismo tiempo, California fijó el 10 de noviembre de 2026 como primer plazo de SB 253 para que empresas con ingresos mayores a mil millones de dólares que hagan negocios en ese estado reporten emisiones de Alcance 1 y 2. Parecen noticias contrarias, y en parte lo son, pero juntas revelan el verdadero estado del tema.\n\nEsto encaja en la narrativa del curso: después de París vino el auge ESG, luego ISSB como estándar global y, finalmente, el retroceso político en Estados Unidos. Sin embargo, no significa que el reporte desaparezca. Significa que se fragmenta. ISSB no puede obligar a nadie; cada jurisdicción decide. Así, la misma multinacional puede enfrentar a la vez una SEC que retrocede, a California que exige emisiones y a México, donde CNBV pidió informes alineados a NIIF S1 y S2.\n\nEl mecanismo económico es de información y costos. El objetivo de ISSB era reducir la "sopa de letras" que encarecía el reporte y dificultaba comparar. Si cada jurisdicción sigue su propio camino, regresa parte de ese costo, y el inversionista pierde comparabilidad justo cuando necesita valuar riesgos. Además, la propuesta de la SEC no elimina la obligación general de revelar riesgos materiales; sólo quita una regla específica. Un riesgo físico o un precio al carbono que afecte los flujos debería seguir revelándose.\n\nTambién cambia el riesgo de transición. Normalmente pensamos en un precio al carbono, pero la incertidumbre regulatoria es parte del mismo riesgo. La empresa no sabe qué regla sobrevivirá: SB 253 enfrenta litigio y la derogación federal aún no es definitiva. Ante esa incertidumbre, lo racional es seguir midiendo Alcance 1 y 2, porque el costo de medir es bajo frente al de quedar fuera de mercados o de financiamiento.\n\nLa implicación para un inversionista es no confundir menos regla federal con menos riesgo. Un dato escaso no elimina el riesgo; lo vuelve más difícil de valuar, y eso puede encarecer el capital de quien no informe. Para una empresa mexicana con negocios en California, el mensaje es claro: la medición llegó para quedarse.' },
    { topic: TOPIC, type: 'noticia', prompt: 'Noticia: 2026 es el primer ciclo en que emisoras mexicanas presentan su informe de sostenibilidad alineado a NIIF S1 y S2 por disposición de CNBV. Interpreta qué cambia para las empresas, los bancos y el costo de capital.', tools: ['NIIF S1 y S2', 'Materialidad financiera', 'Riesgo físico y de transición', 'Costo de capital', 'Alcance 3 y emisiones financiadas'], outline: ['Hecho: DOF ene-2025; ejercicio 2025, reporte en 2026; aseguramiento gradual', 'Herramienta: ISSB y adopción por jurisdicción', 'Mecanismo: información comparable reduce incertidumbre y afecta costo de capital', 'Bancos: cadena de valor y emisiones financiadas', 'Contraste con EUA y qué vigilar'],
      model: 'La CNBV publicó en enero de 2025 una resolución que pide a las emisoras mexicanas un informe de sostenibilidad alineado a NIIF S1 y S2. El primer reporte, sobre el ejercicio 2025, se presenta en 2026, y el aseguramiento externo avanza por etapas. Es una noticia técnica con una lectura económica interesante.\n\nPrimero, muestra cómo funciona ISSB. Como lo explica BloombergNEF, ISSB no puede obligar a nadie: cada jurisdicción decide. México decidió adoptarlo, justo cuando la SEC propone derogar su regla climática. Esto contradice la idea de que el retroceso del ESG en Estados Unidos terminó con el tema. Para México, además, tiene lógica financiera: muchas emisoras necesitan capital global, y hablar el lenguaje que piden los inversionistas internacionales puede facilitar su acceso.\n\nSegundo, cambia qué información recibe el mercado. NIIF S2 obliga a explicar riesgo físico y de transición con escenarios, además de emisiones de Alcance 1, 2 y, con alivios, 3. Una cementera tendría que mostrar qué pasa con su EBITDA a distintos precios del carbono; un grupo hotelero en el Caribe, qué pasa con un huracán. El mecanismo es de información: si el inversionista compara mejor, puede poner mejor el precio del riesgo. Eso no significa que el capital sea más barato para todos. Quien tenga exposición alta y sin plan podría pagar más; quien la gestione bien podría pagar menos. Es una redistribución del costo de capital, no un regalo.\n\nTercero, el efecto llega a la cadena de valor y a los bancos. Una emisora grande va a pedir datos a sus proveedores, incluidas empresas no listadas. Los bancos, por su parte, tienen su principal exposición en lo que prestan: las emisiones financiadas del Alcance 3. Según BIVA, a abril de 2026 la obligación de las instituciones financieras seguía en proyecto, así que ese frente aún se está definiendo. Cuando llegue, conectará este tema con el riesgo de crédito y la garantía, como vimos en intermediación.\n\nHay riesgos. El primer año pueden verse informes poco comparables y datos de Alcance 3 débiles; y reportar no reduce emisiones por sí mismo. Por eso vigilaría la calidad del aseguramiento en 2027 y 2028 y si los inversionistas realmente lo incorporan en precios. Ahí se verá si fue trámite o información útil.' },
  );

  // ---------------------------------------------------------------- bancos: noticias
  E.news.push(
    { topic: TOPIC, date: '2026-10-21', title: 'Gallagher Re: pérdidas aseguradas de $92 mil M a 9 meses, las más bajas desde 2019', source: 'Artemis', url: 'https://www.artemis.bm/news/gallagher-re-estimates-global-insured-cat-losses-at-92bn-for-9m26-lowest-since-2019/', tool: 'Riesgo físico; transferencia de riesgo', read: 'Quedan 29% debajo del promedio de 10 años, pero Gallagher Re advierte que no prueban menor riesgo subyacente, y las tormentas convectivas son casi 60%. Riesgo físico es de colas: un año no hace tendencia. Si las primas bajan por esto, conviene vigilar si la cobertura vuelve donde más se necesita.' },
    { topic: TOPIC, date: '2026-10-16', title: 'California: el 10 de noviembre vence el primer reporte de Alcance 1 y 2 de SB 253', source: 'Greenberg Traurig', url: 'https://www.gtlaw.com/en/insights/2026/10/california-sb-253-carb-sets-nov-10-2026-deadline-for-scope-1-and-scope-2-emissions-reports', tool: 'Alcances; riesgo de transición regulatorio', read: 'Aplica a empresas con ingresos globales mayores a $1,000 M que hagan negocios en California. Mientras Washington retrocede, un estado exige medir: no desaparece el reporte, se fragmenta. La incertidumbre regulatoria es parte del riesgo de transición; SB 261 sigue suspendida por una corte.' },
    { topic: TOPIC, date: '2026-10-08', title: 'México: 2026 es el primer ciclo de informes bajo NIIF S1 y S2 (CNBV)', source: 'CapacitaRSE (fuente secundaria); CNBV para el marco', url: 'https://www.cursosderse.com/2026/10/mexico-sostenible-2026-analisis-esg/', tool: 'ISSB; adopción por jurisdicción', read: 'ISSB no obliga, pero CNBV sí decidió adoptarlo: ejercicio 2025, primer informe en 2026, aseguramiento opcional en 2026 y gradual después. Más comparabilidad puede repartir distinto el costo de capital: paga más quien tiene exposición sin plan. Entidades financieras van en calendario aparte; verifica el alcance en CNBV.' },
    { topic: TOPIC, date: '2026-07-30', title: 'Morningstar: fondos sustentables de EUA tienen su primera entrada neta desde 2022', source: 'ESG Today', url: 'https://www.esgtoday.com/u-s-sustainable-fund-flows-turn-positive-for-first-time-since-2022-morningstar/', tool: 'Narrativa ESG; valor presente', read: 'Unos $3 mil M tras 14 trimestres de salidas, pero un solo ETF de red eléctrica captó $3.1 mil M. No es regreso del ESG general: el capital sigue una tesis de negocio, ligada a infraestructura y demanda de electricidad. Murió la etiqueta, sigue la oportunidad. Fecha aproximada, por cobertura de finales de julio.' },
    { topic: TOPIC, date: '2026-06-03', title: 'La SEC propone derogar su regla climática; comentarios hasta el 3 de agosto', source: 'Federal Register', url: 'https://www.federalregister.gov/documents/2026/06/03/2026-11091/rescission-of-climate-related-disclosure-rules', tool: 'Materialidad; retroceso ESG', read: 'Argumenta exceso de facultades y costos mayores que beneficios; la regla nunca entró en vigor y aún falta voto final. No elimina la obligación de revelar riesgos materiales: cambia la regla federal, no el riesgo. Fuera de la ventana de 3 meses por publicación, pero el periodo de comentarios cerró en agosto.' },
  );

  // ---------------------------------------------------------------- repaso
  E.repaso.push({ topic: TOPIC, icon: '🌡️', title: 'S7 · Riesgo climático', items: [
    ['Narrativa', 'París 2015 → auge ESG y TCFD → ISSB → retroceso en EUA → extremos y costos a aseguradoras'],
    ['Riesgo físico', 'El clima pega directo: agudo (huracán) o crónico (calor, sequía)'],
    ['Riesgo de transición', 'Pega la respuesta al clima: precio al carbono, regulación, tecnología, activos varados'],
    ['Escenarios', 'Más acción: menos físico, más transición; tarde y de golpe: lo peor de ambos'],
    ['Costo social (SCC)', 'Valor presente del daño de una tonelada adicional; cobrarlo es un impuesto pigouviano'],
    ['Función de daños', 'Traduce grados en daño económico; junto con r, decide el SCC'],
    ['Métodos y fallas', 'Corte: variables omitidas; panel: espuria; choques: adaptación y área chica; global: pocos datos, puede sobrestimar; bottom-up: lista incompleta'],
    ['Ramsey', 'r = ρ + η·g: impaciencia + aversión a desigualdad × crecimiento'],
    ['Stern vs Nordhaus', '≈1.4% ética, SCC alto, actuar ya vs ≈4.3% mercado, SCC menor, gradual'],
    ['ISSB', 'Línea base global, Fundación IFRS 2021; no obliga: decide cada jurisdicción (México: CNBV, primer reporte en 2026)'],
    ['NIIF S1 / S2', 'S1 general de sostenibilidad; S2 clima con escenarios y Alcances; se aplican juntas'],
    ['Materialidad', 'ISSB: financiera (afecta al inversionista). Doble suma impacto hacia afuera (GRI, CSRD)'],
    ['Alcances', '1: lo que quemas; 2: energía comprada; 3: cadena de valor (banco: emisiones financiadas)'],
    ['Conexiones', 'S6 garantías y seguros; S3 pasivos contingentes; S4 choque de oferta; S1 menos k y PTF'],
  ] });

  // ---------------------------------------------------------------- sección
  E.section({
    id: 'clima', n: 70, group: 'temas', icon: '🌡️', short: 'S7 · Riesgo climático', exam: 'in',
    title: 'S7 · Riesgo climático',
    kicker: 'Los 7 temas · sin caso Harvard',
    lead: 'Murió la etiqueta ESG, no el riesgo: físico vs transición, costo social del carbono e ISSB. Sección basada en fuentes públicas; complétala con tus apuntes de la invitada.',
    render,
  });
})();
