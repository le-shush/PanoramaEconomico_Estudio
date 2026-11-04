// Sección S1 — Crecimiento económico y globalización: Solow, convergencia condicional, contabilidad del crecimiento y PTF.
// Laboratorios: simulador de Solow con choques, contabilidad del crecimiento (PTF como residuo) y convergencia de dos países.
(function () {
  const F = E.fmt;
  const CLASE = 'Clase 14-oct-2026';
  const C1 = 'Clase 1';

  // ================================================================ modelo (Y = K^α (AL)^(1−α), como en el caso y en Rodriguez)
  // En unidades de trabajador efectivo: k̃ = k/A, ỹ = k̃^α ; Δk̃ = s·ỹ − (δ+n+g)·k̃ ; y = ỹ·A
  const SS = (p) => { const d = p.d + p.n + p.g; const kt = Math.pow(p.s / d, 1 / (1 - p.a)); return { kt, yt: Math.pow(kt, p.a), k: kt * p.A, y: Math.pow(kt, p.a) * p.A }; };
  // Trayectoria anual; shock opcional en tS: 's' (+5 pp), 'A' (+20 %), 'war' (−50 % de k)
  const path = (p, T, shock, tS) => {
    let A = p.A, kt = p.k0 / p.A, s = p.s; const d = p.d + p.n + p.g; const out = [];
    for (let t = 0; t <= T; t++) {
      if (shock && t === tS) {
        if (shock === 's') s += 0.05;
        if (shock === 'A') { kt /= 1.2; A *= 1.2; }
        if (shock === 'war') kt *= 0.5;
      }
      out.push({ t, y: Math.pow(kt, p.a) * A, k: kt * A, kt, A });
      kt = kt + s * Math.pow(kt, p.a) - d * kt;
      A *= 1 + p.g;
    }
    out.forEach((r, i) => { r.gy = i < out.length - 1 ? out[i + 1].y / r.y - 1 : null; });
    return out;
  };
  const pp = (v, d = 1) => F.pct(v, d);

  // ================================================================ ilustraciones (trazos calculados, no a ojo)
  const pathD = (fn, x0, x1, X, Y, n = 60) => { let s = ''; for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; s += `${i ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(fn(x)).toFixed(1)} `; } return s; };

  const illProd = (() => {
    const X = (k) => 50 + 44 * k, Y = (v) => 262 - 24 * v, f = (k) => 3 * Math.sqrt(k);
    const step = (k, c, txt) => `<path d="M${X(k)} ${Y(f(k))} H${X(k + 1)} V${Y(f(k + 1))}" class="ln ${c}" stroke-width="2.5"/><text x="${X(k + 1) + 6}" y="${(Y(f(k)) + Y(f(k + 1))) / 2 + 4}" font-size="12" font-weight="700">${txt}</text>`;
    return `<svg class="ill" viewBox="0 0 540 300" role="img" aria-label="Función de producción cóncava: cada máquina adicional aporta menos producción que la anterior">
      <path d="M50 262 H510 M50 262 V20" class="lnm"/>
      <path d="${pathD(f, 0, 10, X, Y)}" class="ln s1" stroke-width="3"/>
      ${step(1, 's3', '+1 máquina: Δy grande')}
      ${step(6, 's5', '+1 máquina: Δy chica')}
      <text x="490" y="282" text-anchor="end" font-size="13" class="t2">capital por trabajador, k</text>
      <text x="58" y="26" font-size="13" class="t2">producción por trabajador, y</text>
      <text x="${X(9)}" y="${Y(f(9)) - 12}" text-anchor="middle" font-size="13" font-weight="700">y = A·k^α</text>
    </svg>`;
  })();

  const illSolow = (() => {
    const X = (k) => 50 + 44 * k, Y = (v) => 262 - 36 * v, yf = (k) => 2 * Math.sqrt(k), sf = (k) => 0.8 * Math.sqrt(k), lf = (k) => 0.3266 * k;
    return `<svg class="ill" viewBox="0 0 540 310" role="img" aria-label="Diagrama de Solow: producción, inversión y reposición de capital se cruzan en el estado estacionario">
      <path d="M50 262 H510 M50 262 V20" class="lnm"/>
      <path d="${pathD(yf, 0, 10, X, Y)}" class="ln s1" stroke-width="3"/>
      <path d="${pathD(sf, 0, 10, X, Y)}" class="ln s2" stroke-width="3"/>
      <path d="${pathD(lf, 0, 10, X, Y)}" class="ln s3" stroke-width="3"/>
      <text x="${X(10) + 2}" y="${Y(yf(10)) - 8}" text-anchor="end" font-size="13" font-weight="700">y</text>
      <text x="${X(10) + 2}" y="${Y(sf(10)) + 18}" text-anchor="end" font-size="13" font-weight="700">s·y (inversión)</text>
      <text x="${X(9.1)}" y="${Y(lf(9.1)) - 10}" text-anchor="end" font-size="13" font-weight="700">(δ+n)·k (reposición)</text>
      <path d="M${X(6)} 262 V${Y(yf(6))}" class="lnm dash"/>
      <circle cx="${X(6)}" cy="${Y(sf(6))}" r="6" class="f4"/>
      <text x="${X(6)}" y="282" text-anchor="middle" font-size="14" font-weight="700">k*</text>
      <text x="${X(6) + 8}" y="${Y(yf(6)) - 6}" font-size="13" font-weight="700">y*</text>
      <path d="M${X(1)} 274 H${X(4.7)}" class="ln sgood anim-flow" stroke-width="2.5"/>
      <text x="${X(2.8)}" y="296" text-anchor="middle" font-size="12" class="t2">s·y &gt; (δ+n)k: k sube</text>
      <path d="M${X(9.8)} 274 H${X(7.3)}" class="ln sbad anim-flow" stroke-width="2.5"/>
      <text x="${X(8.5)}" y="296" text-anchor="middle" font-size="12" class="t2">s·y &lt; (δ+n)k: k baja</text>
    </svg>`;
  })();

  const illTwo = `<svg class="ill" viewBox="0 0 680 250" role="img" aria-label="Dos paneles: subir el ahorro da un salto de nivel y regresa a la misma pendiente; más productividad cambia la pendiente para siempre">
    <text x="165" y="20" text-anchor="middle" font-size="14" font-weight="700">Acumulación: sube s</text>
    <path d="M30 210 H310 M30 210 V34" class="lnm"/>
    <path d="M30 170 L120 150" class="ln s1" stroke-width="3"/>
    <path d="M120 150 C150 118 175 104 215 102 L310 81" class="ln s1" stroke-width="3"/>
    <path d="M120 150 L310 108" class="lnm dash"/>
    <text x="120" y="228" text-anchor="middle" font-size="12" class="t2">↑ s</text>
    <text x="300" y="228" text-anchor="end" font-size="12" class="t2">tiempo</text>
    <text x="36" y="44" font-size="12" class="t2">ln y</text>
    <text x="225" y="140" font-size="12" class="t2">salto de nivel,</text>
    <text x="225" y="156" font-size="12" class="t2">misma pendiente</text>
    <text x="515" y="20" text-anchor="middle" font-size="14" font-weight="700">Productividad: sube g</text>
    <path d="M380 210 H660 M380 210 V34" class="lnm"/>
    <path d="M380 170 L470 150" class="ln s3" stroke-width="3"/>
    <path d="M470 150 L660 50" class="ln s3" stroke-width="3"/>
    <path d="M470 150 L660 108" class="lnm dash"/>
    <text x="470" y="228" text-anchor="middle" font-size="12" class="t2">↑ g</text>
    <text x="650" y="228" text-anchor="end" font-size="12" class="t2">tiempo</text>
    <text x="386" y="44" font-size="12" class="t2">ln y</text>
    <text x="668" y="136" font-size="12" class="t2" text-anchor="end">la pendiente cambia</text>
    <text x="575" y="152" font-size="12" class="t2">para siempre</text>
  </svg>`;

  const illConv = (() => {
    const X = (t) => 50 + t * 4.4, Y = (v) => 240 - v * 44;
    const cur = (y0, ys) => (t) => ys - (ys - y0) * Math.exp(-t / 22);
    return `<svg class="ill" viewBox="0 0 540 270" role="img" aria-label="Convergencia condicional: cada país se acerca a su propio techo; el pobre con techo alto crece más que el rico, el pobre con techo bajo no lo alcanza">
      <path d="M50 240 H510 M50 240 V16" class="lnm"/>
      <path d="M50 ${Y(4.4)} H510" class="lnm dash"/><text x="505" y="${Y(4.4) - 6}" text-anchor="end" font-size="12" class="t2">techo de Rico y de Pobre A</text>
      <path d="M50 ${Y(2.4)} H510" class="lnm dash"/><text x="505" y="${Y(2.4) - 6}" text-anchor="end" font-size="12" class="t2">techo de Pobre B</text>
      <path d="${pathD(cur(3.9, 4.4), 0, 100, X, Y)}" class="ln s2" stroke-width="3"/>
      <path d="${pathD(cur(1, 4.4), 0, 100, X, Y)}" class="ln s1" stroke-width="3"/>
      <path d="${pathD(cur(1.1, 2.4), 0, 100, X, Y)}" class="ln s3" stroke-width="3"/>
      <text x="58" y="${Y(3.9) - 8}" font-size="13" font-weight="700">Rico</text>
      <text x="58" y="${Y(1) + 18}" font-size="13" font-weight="700">Pobre B</text>
      <text x="${X(30)}" y="${Y(3.2)}" font-size="13" font-weight="700">Pobre A</text>
      <text x="505" y="258" text-anchor="end" font-size="12" class="t2">tiempo</text>
      <text x="58" y="24" font-size="12" class="t2">y (sin tendencia de A)</text>
    </svg>`;
  })();

  const illResid = `<svg class="ill" viewBox="0 0 560 220" role="img" aria-label="El crecimiento del PIB se reparte en capital, trabajo y un residuo que es la productividad total de los factores">
    <text x="20" y="28" font-size="14" font-weight="700">Lo que creció el PIB (lo mides)</text>
    <rect x="20" y="40" width="520" height="44" rx="6" class="f4"/><text x="280" y="68" text-anchor="middle" font-size="15" class="tw" font-weight="700">g_Y</text>
    <text x="20" y="118" font-size="14" font-weight="700">Lo que explican los factores (lo mides) y lo que sobra (no se mide: se despeja)</text>
    <rect x="20" y="130" width="200" height="44" rx="6" class="f1"/><text x="120" y="158" text-anchor="middle" font-size="14" class="tw" font-weight="700">α · g_K</text>
    <rect x="224" y="130" width="130" height="44" rx="6" class="f2"/><text x="289" y="158" text-anchor="middle" font-size="14" class="tw" font-weight="700">(1−α) · g_L</text>
    <rect x="358" y="130" width="182" height="44" rx="6" class="f3"/><text x="449" y="158" text-anchor="middle" font-size="14" class="tw" font-weight="700">g_A = residuo (PTF)</text>
    <text x="449" y="198" text-anchor="middle" font-size="12" class="t2">"lo que no explican trabajo y capital"</text>
  </svg>`;

  // ================================================================ sección
  E.section({
    id: 'crecimiento', n: 10, group: 'temas', icon: '📈', short: 'S1 · Crecimiento', exam: 'in',
    title: 'Crecimiento económico y globalización',
    kicker: 'S1 · Solow, convergencia y productividad',
    lead: 'Acumular capital tiene techo por los rendimientos decrecientes. Sólo la productividad mueve el techo. Con esa frase lees casi cualquier noticia de crecimiento: China, la IA, el envejecimiento o México.',
    render(root) {
      root.innerHTML = `
      <style>@media(max-width:900px){.sx-cr .concept .cols{grid-template-columns:minmax(0,1fr)}}@media(max-width:720px){.sx-cr .g2{grid-template-columns:minmax(0,1fr)}}</style>
      <div class="wide sx-cr">
      ${E.key('Los mercados dan los incentivos → los incentivos generan inversión e innovación → la inversión choca con rendimientos decrecientes y se estanca en un estado estacionario → sólo la tecnología (A, la PTF) lo mueve. <b>En el examen separa siempre crecimiento por acumulación (con techo) de crecimiento por productividad.</b>', 'La historia en una línea')}

      ${E.concept({ id: 'porque', title: '¿Por qué un MBA lleva economía?', html: `
        <div class="cols"><div>
          ${E.table([
            ['1. Valor de la empresa', 'Tipo de cambio, tasas y commodities pegan en ventas, costos, deuda y CapEx. Es el puente con Análisis Financiero', '≈35 % de las empresas de EUA tiene exposición suficiente para que un dólar fuerte les pegue (lámina 12)'],
            ['2. Analizar un país', 'Así como analizaste una empresa, aquí aprendes en qué variables "picar" para ver si un país está bien o mal: tus mercados de venta o de suministro', 'Es el proyecto final'],
            ['3. Cadenas de valor', 'Entender flujos comerciales para decidir dónde poner cada parte de la operación', 'Apple: la obra de Tim Cook no fue un producto nuevo, sino diseñar qué se queda en EUA y qué va a China, y luego a India con la guerra comercial'],
          ], { head: ['Razón', 'Qué significa', 'Ejemplo de clase'] })}
          <p><b>La primera métrica de cualquier país:</b> PIB per cápita, porque mide poder de compra y permite comparar economías de distinto tamaño (Suiza vs. EUA). Órdenes de magnitud del profe, de memoria: mundo ≈22 mil dólares, desarrollados ≈50 mil, América Latina ≈15 mil.</p>
        </div><div>
          ${E.tip('Su historia personal: creció con devaluaciones cada seis años e inflación de 80 %, y nunca imaginó ver inflación de 4 % ni tasas a 30 años en México. <q>Y sin embargo estamos acá y sin embargo el país no crece.</q> Estabilizar no bastó: ni bajar el déficit, ni bajar la inflación, ni mejorar los mercados financieros. Cómo hacer crecer a México, dice, es el reto de su generación.', C1)}
          ${E.key('Estabilidad macro es condición, no motor. Si te preguntan por México, separa lo que ya se logró (estabilidad) de lo que falta (productividad).', 'Encuadre de todo el curso')}
        </div></div>` })}

      <h2>1 · La narrativa</h2>
      <p class="prose">Esto es lo que califica: contarla como cadena causal, no como lista de fechas.</p>
      ${E.timeline([
        { y: 'Antes de 1800', t: 'Malthus: estancamiento, con Asia al centro', d: 'Sube el salario → la gente tiene más hijos → más trabajadores sobre la misma tierra rinden menos → el salario regresa a subsistencia. Con la peste negra de 1350 cayó la población y subió el salario; luego volvió a bajar. Asia producía ≈60 % del producto mundial hasta ≈1800: desde la óptica china, la supremacía occidental es un paréntesis.' },
        { y: '1800–1914', t: 'Revolución Industrial y primera globalización', d: 'Mercados + tecnología rompen la trampa: la población sigue creciendo y el salario también. Inglaterra domina el comercio con ferrocarriles y vapor, y parte del ascenso europeo coincide con la caída de Asia. El despegue arranca ≈1820, pero el crecimiento fuerte y sostenido se ve sobre todo desde 1950: llevamos menos de cien años así. Las guerras mundiales colapsan el comercio.' },
        { y: '1945–73', t: 'Aceleración de posguerra', d: 'Reconstrucción (Solow puro: mucho capital destruido = muy por debajo de k*, por eso Francia y Alemania crecen rápido) + segunda globalización bajo dominio de EUA + contenedores que abaratan el comercio.' },
        { y: 'Años 70', t: 'Desaceleración y estanflación', d: 'El embargo petrolero dispara el precio del crudo → sube la inflación → suben las tasas → EUA se frena. El profe lo compara con el choque actual por Irán.' },
        { y: '1990–2008', t: 'Globalización e integración de China', d: 'Cae la URSS (no pudo competir en productividad) y China entra a la OMC (2001). El mercado se agranda: Adam Smith en acción. China crece por capital y sobre todo por PTF; sus salarios convergen y deja de ser tan barata.' },
        { y: '2008–2016', t: 'Crisis y descontento', d: 'Lehman: como es crisis bancaria, no se arregla rápido y vienen años de crecimiento lento. Las ganancias se reparten mal: productos más baratos, pero salarios estancados en países ricos → Brexit, Trump, proteccionismo.' },
        { y: '2020–2025', t: 'COVID y caída de la PTF', d: 'Dos choques globales adversos (2009 y COVID), luego Ucrania y aranceles: ≈12 años de economía apagada, y hay quien habla de 20 sin crecimiento sólido. Tras el COVID, Europa crece menos de 2 % y en América Latina cae la productividad. La productividad laboral de la OCDE ya había bajado de ≈2 % a ≈1 % desde mediados de los 2000 (lámina 77). Menos población activa y estancamiento de A.' },
        { y: 'Hoy', t: '¿La IA como respuesta?', d: 'Si la IA sólo es construir centros de datos, es acumulación y tiene techo. Sólo si sube A mueve el estado estacionario. En EUA ya se ve más K, pero todavía no la productividad. Esa es la pregunta abierta del curso.' },
      ])}
      ${E.tip('El profe insiste en que todo el debate de la IA es, al final, si vamos a crecer o no, y que esos conceptos salen de Solow. Por eso pide sentirse cómodo con el modelo aunque suene abstracto.', CLASE)}

      ${E.concept({ id: 'hechos', title: 'El diagnóstico: qué hay que explicar', html: `
        <div class="cols"><div>
          <p><b>Los hechos (Susskind, lámina 28):</b></p>
          <ol>
            <li>Casi 300 mil años de estancamiento.</li>
            <li>El crecimiento empezó hace apenas ≈200 años.</li>
            <li><b>Se ha mantenido.</b> Esta es la parte clave: las pirámides o las minas de plata también dieron crecimiento, pero no duró.</li>
            <li>Tuvo un costo enorme: recursos naturales, desolación cultural y desigualdad.</li>
          </ol>
          ${E.table([
            ['Pobreza extrema', '≈60 % de la población mundial en 1900 → ≈9 % hoy', 'Para eliminar pobreza hay que crecer'],
            ['Esperanza de vida', 'De ≈30 años a ≈75–80; la brecha entre países se reduce', 'El logro más emblemático'],
            ['Desigualdad', 'Coeficiente de Gini de la lámina 26: México 0.725, Brasil 0.719, Indonesia 0.645, España 0.484, Dinamarca 0.477', 'El promedio esconde la distribución; mayor Gini, más desigualdad'],
          ], { head: ['Dimensión', 'Dato (no lo memorices)', 'Lectura'] })}
        </div><div>
          ${E.tip('Sobre qué causó el crecimiento: <q>Nadie sabe.</q> No hay receta mecánica. Hay países con tecnología que no crecieron y otros que crecieron sin ella. Candidatos de la lámina 31: tecnología, colonización, recursos naturales, cultura, comercio e instituciones. De ahí su foco: tecnología y mercados.', C1)}
          ${E.note('En América Latina, de los años 50 a los 70, pesó mucho la <b>teoría de la dependencia</b>: somos pobres porque los países ricos nos extraen el excedente. El profe la presenta como hipótesis, y subraya que fue una ideología muy potente en la región.', 'Historia de las ideas')}
          ${E.note('Los economistas lo abordan de dos formas: <b>histórica</b> (incentivos, instituciones y derechos de propiedad en cada época) y <b>analítica</b> (Solow). Crecimiento también es energía: más PIB pide más energía, y si es fósil choca con el clima; de ahí los movimientos anticrecimiento (lámina 71) y el tema S7.', 'Dos lentes y un dilema')}
        </div></div>` })}

      <h2>2 · Las herramientas</h2>

      ${E.concept({ id: 'mercados', title: 'Punto de partida: mercados, incentivos y especialización', badge: 'in', html: `
        <div class="cols"><div>
          <p><b>Por qué abre el curso con esto:</b> los modelos dicen <i>qué</i> hace crecer (K, L, A). Los mercados explican <i>por qué alguien se molesta</i> en invertir o innovar.</p>
          <ul>
            <li><b>Incentivos:</b> precios y derechos de propiedad premian producir mejor.</li>
            <li><b>Especialización:</b> el ejemplo de Adam Smith de los clavos. Un mercado más grande permite dividir más el trabajo, y por eso la globalización importa.</li>
            <li><b>Evidencia:</b> Inglaterra, Asia del Este y el fin de la Guerra Fría.</li>
          </ul>
          <p><b>La cadena de Smith:</b> mayores mercados → mayor especialización → mayor eficiencia → mayor crecimiento. El carnicero y el panadero te dan la cena por su propio interés, no por benevolencia. En los clavos, una persona sola haría ≈100 al día; con el trabajo dividido en 18 operaciones, ≈4,000 por persona (cifras como las dijo el profe).</p>
          <p><b>México:</b> donde falta mercado hay cuello de botella. El profe señala energía y Pemex (nadie invierte sin derechos de propiedad claros) y la concentración en finanzas y telecom. Es incentivo y marco institucional, no tecnología.</p>
        </div><div>
          ${E.tip('<q>Si un país quiere crecer, el día de hoy no hay más remedio que adoptar medidas de mercado.</q> Aclara que no está contra el Estado: salud, seguridad e infraestructura le parecen importantes. Su punto es empírico: <q>los países que más crecen son aquellos países que tienen lo más parecido a una economía de mercado.</q>', CLASE)}
          ${E.tip('Cuando pregunta qué causa el crecimiento, todo mundo responde "la tecnología", y él lo llama falso, en el sentido de incompleto: la tecnología es el vehículo, pero no existiría sin incentivos. Sus ejemplos: los parques solares exigieron baterías y eso creó el incentivo para desarrollarlas; la vacuna del COVID llegó porque había incentivos poderosísimos para descubrirla.', C1)}
          ${E.kid('Si cocinar más rico no te trae más clientes, ¿para qué mejorar la receta? El precio y la competencia son el premio de hacerlo mejor.')}
          ${E.note('Los mercados no son sólo macro: Uber creó un mercado con precios que se ajustan solos, y los mercados de predicción resumen lo que la gente espera. El profe lo propone como herramienta de MBA: no tienes que tener la superidea, sino crear las condiciones para que el mercado dé la respuesta. Y un matiz suyo: los mercados nos sacaron de las cavernas, y también nos dejaron el problema ambiental.', 'Para el MBA')}
          ${E.note('Lámina 78: Acemoglu, Johnson y Robinson (Nobel 2024): instituciones inclusivas vs. extractivas. Lámina 77: Mokyr, Aghion y Howitt (Nobel 2025): destrucción creativa, empresas nuevas desbancan a las viejas. Por eso la concentración frena A.', 'Los Nobel de la lámina')}
        </div></div>` })}

      ${E.concept({ id: 'prod', title: 'Herramienta 1 · Función de producción y rendimientos decrecientes', badge: 'in', html: `
        <div class="cols"><div>
          ${E.formula('Cobb-Douglas (láminas)', 'Y', 'A · K<sup>α</sup> · L<sup>1−α</sup>', 'α ≈ 0.30–0.40: parte del PIB que se llevan los dueños del capital')}
          ${E.formula('Por trabajador', 'y', 'A · k<sup>α</sup>', 'k = K/L, y = Y/L')}
          <p><b>Por qué Cobb-Douglas:</b> tiene las dos propiedades que Solow necesita, con la forma más sencilla posible.</p>
          <ul>
            <li><b>Rendimientos constantes a escala:</b> duplicas K y L → se duplica Y.</li>
            <li><b>Rendimientos decrecientes de cada factor:</b> duplicas sólo K → Y crece menos del doble.</li>
            <li><b>α estable:</b> la participación del capital es muy estable en el tiempo (Rodriguez: EUA ≈ 30 % capital, 70 % trabajo).</li>
          </ul>
          ${E.warn('El caso y Rodriguez escriben <b>Y = K<sup>α</sup>(AL)<sup>1−α</sup></b> y las láminas <b>Y = A K<sup>α</sup> L<sup>1−α</sup></b>. Es la misma idea con A definida distinto. Si te dan una, usa esa. El laboratorio de Solow usa la del caso; la calculadora de contabilidad, la de las láminas.')}
          ${E.warn('En clase y en la lámina 38 se oye "rendimientos decrecientes a escala". Con precisión: a escala son <b>constantes</b>; lo decreciente es <b>cada factor por separado</b>. Di ambas partes y no te equivocas.')}
        </div><div>
          ${E.fig(illProd, 'Mismo tamaño de paso en k, cada vez menos y. Esta concavidad es toda la razón del estado estacionario.')}
          ${E.kid('Una computadora en la oficina cambia tu vida. La segunda ayuda. La número 50 sólo estorba.')}
          ${E.tip('<q>Toda la economía descansa en esta grafiquita.</q> La llama la maldición de la concavidad y viene de Malthus: tierra fija, cada diez trabajadores nuevos añaden menos. Solow retoma esa idea para el capital. Con raíz cuadrada se ve rápido: pasar de y = 2 a y = 4 exige subir k de 4 a 16. También lo aplica a los equipos del curso: con más de cuatro personas, la última ya no agrega valor.', C1)}
          ${E.tip('Sus ejemplos: 1,000 pesos en marketing rinden muy bien pero un millón ya no; cien Oxxos en una calle no ganan dinero. Reta a la clase a encontrar una industria donde no se cumpla. Economías de escala en electricidad: sí existen, pero para efectos analíticos el punto siempre son los rendimientos decrecientes.', CLASE)}
        </div></div>` })}

      ${E.concept({ id: 'si', title: 'Herramienta 2 · Ahorro = inversión y acumulación de capital', badge: 'in', html: `
        <div class="cols"><div>
          ${E.formula('Economía cerrada sin gobierno', 'Y − C', 'S = I')}
          ${E.formula('Acumulación', 'ΔK', 'I − δK = sY − δK')}
          ${E.formula('Por trabajador', 'Δk', 's·y − (δ + n)·k', 'con tecnología: (δ + n + g)')}
          <p>La inversión es el flujo que llena la tina de capital. La depreciación y la población nueva la vacían. Solow habla de ahorro en lugar de inversión porque en su modelo son lo mismo.</p>
          ${E.warn('Solow no explica por qué la gente ahorra: <b>s es dato</b>, igual que n y g. Tampoco hay rendimiento que decida la inversión: todo lo ahorrado se invierte (Rodriguez lo aclara). Y la economía del modelo básico es cerrada: al abrirla, S − I = CA. Eso es el tema S2.')}
        </div><div>
          ${E.tip('En una economía cerrada, <q>el ahorro tiene que ser igual a la inversión</q>: lo que no se consume es lo que compran las empresas. Y añade: el consumo es lo que más pesa en el PIB, pero la inversión es la más volátil, así que es la que te dice si el ciclo sube o baja.', CLASE + ' (tramo 2:00–2:10)')}
          ${E.kid('Tu alcancía de herramientas: cada mes metes parte de lo que ganas y se te rompen algunas. Si llega un primo nuevo al taller, también hay que darle herramientas. Sólo avanzas si lo que metes supera lo que se rompe más lo del primo.')}
        </div></div>` })}

      ${E.concept({ id: 'solow', title: 'Herramienta 3 · Modelo de Solow y estado estacionario', badge: 'star', html: `
        <div class="cols"><div>
          ${E.fig(illSolow, 'El diagrama de Solow. Punto clave: en k* la inversión apenas repone lo que se pierde.')}
          ${E.formula('Estado estacionario', 's·y*', '(δ + n + g)·k*', 'k por trabajador efectivo deja de crecer')}
          ${E.formula('Solución (forma del caso)', 'y*', 'A · (s / (δ+n+g))<sup>α/(1−α)</sup>', 'Vale cuando A aumenta el trabajo: Y = K<sup>α</sup>(AL)<sup>1−α</sup>. Si partes de y = A·k<sup>α</sup>, A queda elevada a 1/(1−α). La dirección es la misma.')}
          <p class="small muted">Con α = 1/3 el exponente es 1/2: duplicar s sube y* ≈ 41 %, una sola vez.</p>
        </div><div>
          <p><b>Las tres conclusiones que debes poder decir:</b></p>
          <ol>
            <li><b>Abajo de k*</b> crecen rápido; entre más lejos, más rápido. La velocidad se va apagando.</li>
            <li><b>Más ahorro sube el nivel, no la tasa de largo plazo.</b> Hay crecimiento extra sólo en la transición.</li>
            <li><b>Sólo la tecnología sostiene el crecimiento por persona.</b> En el largo plazo, g<sub>y</sub> = g.</li>
          </ol>
          ${E.note('Solow escribe en los 50, con Europa destruida y la Guerra Fría: lo urgente era el capital y cómo ganarle a los rusos. Por eso deja de lado la historia y lo piensa analíticamente: une la oferta (función de producción) con la demanda (C + I), de donde S = I, y supone lo más simple para el ahorro: una fracción s del ingreso.', 'Por qué ese modelo en ese momento')}
          ${E.tip('<q>La tecnología es la única que nos va a sacar de este problema.</q> Su mensaje: no basta con más carreteras, puertos o centros de datos. Ayudan a crecer, pero llega un punto en el que te estancas.', CLASE)}
          ${E.warn('En clase lo explica como "la producción extra contra el desgaste de la máquina". Para el examen di la mecánica exacta: la comparación es <b>inversión s·y contra reposición (δ+n)·k</b>. Tampoco digas "en el estado estacionario no hay crecimiento": el PIB total crece a n + g y el PIB por trabajador a g.')}
          ${E.warn('En la Clase 1 un alumno pregunta qué países ya llegaron a ese límite y el profe contesta "todos", y por eso ya no crecen rápido. Es una frase para enfatizar: luego él mismo pide ubicar qué tan lejos está cada país, que es todo el caso. En el examen di: los ricos están cerca; muchos emergentes siguen abajo. También llama a k* "capital óptimo", y aclara que no es <q>el mejor de todos los mundos</q>: es el equilibrio con tus condiciones actuales.')}
        </div></div>
        <h4>Los choques que usó el profe (ten uno a la mano para cada perilla)</h4>
        ${E.table([
          ['Destrucción de capital', 'k cae, k* no cambia', 'Alemania y Francia tras la guerra; Ucrania cuando termine', 'Crece muy rápido por un rato (reconstrucción)'],
          ['Sube s', 'Sube la curva s·y, sube k*', 'China y Sureste Asiático', 'Crece más en la transición; nivel mayor; luego se apaga'],
          ['Sube δ', 'Se empina la recta, baja k*', 'Pozos de Pemex: la inversión no repone el agotamiento', 'Baja el nivel de y*'],
          ['Cae n', 'Se aplana la recta, sube k*', 'Japón: población decreciente', 'Más k por trabajador, pero menos PIB total y menos tendencia'],
          ['Sube A', 'Sube y y s·y, sube k*', 'El "holy grail" (láminas 66 y 69)', 'Mueve el techo. Si g es permanente, crecimiento sostenido'],
        ], { head: ['Choque', 'En el diagrama', 'Ejemplo de clase', 'Resultado'] })}
        ${E.fig(illTwo, 'La gráfica que resume el examen: la acumulación da salto de nivel; la productividad cambia la pendiente.', true)}
        ` })}

      <section class="concept" id="labSolow">
        <header><h3>🧪 Laboratorio 1 · Simulador de Solow</h3></header>
        <p class="small muted">Y = K<sup>α</sup>(AL)<sup>1−α</sup>; Δk̃ = s·k̃<sup>α</sup> − (δ+n+g)·k̃ con k̃ = k/A; pasos anuales. El choque ocurre en el año 10; en las gráficas la línea punteada es la economía sin choque.</p>
        <div class="cols"><div>
          <div id="kSol"></div>
          <div class="btnrow" id="shk" style="margin-top:10px">
            <button class="btn sm on" data-s="">Sin choque</button>
            <button class="btn sm" data-s="s">Sube s (+5 pp)</button>
            <button class="btn sm" data-s="A">Sube A (+20 %)</button>
            <button class="btn sm" data-s="war">Guerra (−50 % de k)</button>
          </div>
        </div><div>
          <div class="chart h360" id="cDiag"></div>
          <p class="small muted">Si k* se sale de la vista, los dos ejes cambian de escala juntos. Así, la pendiente en pantalla sólo cambia cuando mueves δ, n o g.</p>
        </div></div>
        <div id="tSol" style="margin-top:12px"></div>
        <div class="g2">
          <div class="card2"><h4>PIB por trabajador, y(t)</h4><div class="chart h220" id="cY"></div></div>
          <div class="card2"><h4>Crecimiento anual de y</h4><div class="chart h220" id="cG"></div></div>
        </div>
        <div class="co key" id="rSol"></div>
        ${E.reveal('Prueba esto (5 experimentos de 1 minuto)', `<ol>
          <li><b>g = 0 y aprieta "Sube s".</b> El crecimiento salta y regresa a cero. Ese es el techo.</li>
          <li><b>g = 0 y aprieta "Sube A".</b> Un solo salto de A también se apaga: da nivel, no tasa. Para crecimiento sostenido, g &gt; 0.</li>
          <li><b>Sube g de 2 % a 3 %.</b> Compara con el punto 1: esto sí cambia la pendiente para siempre.</li>
          <li><b>Guerra.</b> No cambia el techo, pero el país crece rapidísimo después. Por eso Ucrania.</li>
          <li><b>Sube α a 0.50.</b> Rendimientos decrecientes más lentos: techo más alto y transición más larga.</li>
        </ol>`)}
      </section>

      ${E.concept({ id: 'conv', title: 'Herramienta 4 · Convergencia condicional', badge: 'star', html: `
        <div class="cols"><div>
          ${E.table([
            ['Absoluta', 'Los pobres alcanzan a los ricos', 'Sólo si todos tienen iguales s, n, δ y A'],
            ['Condicional', 'Cada país converge a <b>su propio</b> estado estacionario', 'Lo que predice Solow cuando los fundamentales difieren'],
          ], { head: ['Tipo', 'Qué dice', 'Cuándo aplica'] })}
          <p><b>La regla:</b> el crecimiento depende de la <b>distancia a tu propio k*</b>, no de qué tan pobre eres en abstracto. Un país pobre con ahorro bajo, instituciones malas o A baja puede estar ya cerca de su techo y no crecer nada.</p>
          <p><b>El caso BRICs usa exactamente esto:</b> China tenía inversión y capital humano altos para su PIB per cápita; por eso estaba lejos de su k*.</p>
          ${E.warn('"Es pobre, entonces va a crecer" es el error clásico. Argentina, Sudáfrica, Brasil y México son relativamente pobres frente a EUA y no se están acercando: con datos de Penn World Table, su razón K/Y ÷ K/Y* es cercana a 1 o mayor (México 0.77 es la excepción) y su Y/L cae.')}
        </div><div>
          ${E.fig(illConv, 'Pobre A y Pobre B empiezan casi igual. A tiene techo alto: alcanza al rico. B no, y no es falla del modelo.')}
          ${E.tip('La convergencia también explica los salarios: el profe usa este factor de convergencia para decir que China ya no es tan barata, porque el salario chino empezó a subir mientras el mexicano no.', CLASE)}
          ${E.kid('Dos niños corren a sus metas. Gana velocidad el que está más lejos de la suya, pero no necesariamente llega al mismo lugar.')}
        </div></div>` })}

      <section class="concept" id="labConv">
        <header><h3>🧪 Laboratorio 2 · Convergencia con dos países</h3></header>
        <div class="btnrow" id="cvPre" style="margin-bottom:6px">
          <button class="btn sm on" data-p="cond">Condicional</button>
          <button class="btn sm" data-p="abs">Absoluta</button>
          <button class="btn sm" data-p="trap">Trampa: pobre sin margen</button>
          <button class="btn sm" data-p="vm">Vietnam vs. México (estilizado)</button>
        </div>
        <p class="small muted" id="cvTxt"></p>
        <div class="g2"><div id="kPa"></div><div id="kPb"></div></div>
        <div id="kAl"></div>
        <div id="tCv" style="margin-top:12px"></div>
        <div class="g2">
          <div class="card2"><h4>PIB por trabajador, 60 años</h4><div class="chart h220" id="cCvY"></div></div>
          <div class="card2"><h4>Crecimiento anual de y</h4><div class="chart h220" id="cCvG"></div></div>
        </div>
        <div class="co key" id="rCv"></div>
      </section>

      ${E.concept({ id: 'ptf', title: 'Herramienta 5 · Contabilidad del crecimiento y PTF', badge: 'star', html: `
        <div class="cols"><div>
          ${E.formula('Contabilidad', 'g<sub>Y</sub>', 'g<sub>A</sub> + α·g<sub>K</sub> + (1−α)·g<sub>L</sub>')}
          ${E.formula('PTF como residuo', 'g<sub>A</sub>', 'g<sub>Y</sub> − α·g<sub>K</sub> − (1−α)·g<sub>L</sub>')}
          ${E.formula('Por trabajador', 'g<sub>y</sub>', 'g<sub>A</sub> + α·g<sub>k</sub>')}
          <p><b>Procedimiento:</b> mides Y, K y L → multiplicas por sus participaciones → lo que no se explica es la PTF. No se observa directamente: se despeja.</p>
          <p><b>Cómo leerla:</b> el residuo incluye tecnología, pero también eficiencia, instituciones, mala asignación y error de medición. Por eso se le llama <i>medida de nuestra ignorancia</i>.</p>
          ${E.warn('<b>Productividad laboral ≠ PTF.</b> Y/L sube también si cada trabajador tiene más máquinas (α·g<sub>k</sub>). Un trimestre con Y/L alta puede ser sólo capital, por ejemplo centros de datos. Sólo el residuo mide "hacer más con lo mismo".')}
        </div><div>
          ${E.fig(illResid, 'El residuo no se mide: es lo que queda.')}
          ${E.tip('Para México y China: mides cuánto creció el producto, cuánto L y cuánto K; la diferencia <i>es la tecnología, la productividad</i>. En México, estancada. Las dos economías se abrieron (TLCAN y OMC) y sus exportaciones crecieron, pero en una la productividad se estancó y en la otra aumentó.', CLASE)}
          ${E.note('Lámina 67 (Lipschitz y Schadler): en 10 países avanzados el crecimiento potencial bajó de ≈2.4 % (2001–03) a ≈1.2 % (2008–10), y gran parte de la caída es PTF. Lámina 68: "<i>Productivity isn\'t everything, but in the long run it is almost everything</i>" (Krugman). Lámina 72: en Latinoamérica la PTF ha estado estancada y lo que hubo vino de más trabajadores.', 'Láminas')}
          ${E.tip('<q>Ustedes son el TFP.</q> El cambio tecnológico lo gestionan los directivos dentro de las empresas: si no se les ocurren ideas para hacerlas más productivas, nadie lo hará. Remata pidiendo <q>productividad, productividad, productividad</q> como única salida del estancamiento.', C1)}
          ${E.note('Pequeños cambios en g pesan: con 30 mil dólares en 2000, a 1 % anual llegas a ≈49 mil en 2050 y a 3 % a ≈132 mil (lámina 75). Por eso se pelea por medio punto.', 'Interés compuesto')}
          ${E.kid('Dos taquerías con los mismos cocineros y las mismas planchas, y una vende el doble. Esa diferencia que no se explica con gente ni con equipo es la PTF.')}
        </div></div>` })}

      <section class="concept" id="labPtf">
        <header><h3>🧪 Laboratorio 3 · Calculadora de contabilidad del crecimiento</h3></header>
        <div class="btnrow" id="ptfPre" style="margin-bottom:6px">
          <button class="btn sm" data-p="china">China 1999–2005</button>
          <button class="btn sm" data-p="latam">Latinoamérica 1999–2005</button>
          <button class="btn sm" data-p="av1">Avanzados 2001–03</button>
          <button class="btn sm" data-p="av2">Avanzados 2008–10</button>
          <button class="btn sm" data-p="acum">Sólo acumulación (ejemplo)</button>
        </div>
        <p class="small muted" id="ptfTxt">Mueve las perillas o elige un punto de partida. Los botones son aproximaciones leídas de las gráficas de las láminas 67 y 68, convertidas con α = 0.35; no memorices las cifras.</p>
        <div class="cols"><div><div id="kPtf"></div></div><div><div class="chart h220" id="cPtf"></div></div></div>
        <div id="tPtf" style="margin-top:12px"></div>
        <div class="co key" id="rPtf"></div>
      </section>

      ${E.concept({ id: 'ia', title: 'La IA con lente de Solow', badge: 'in', html: `
        <div class="cols"><div>
          ${E.table([
            ['Hoy se observa', 'Gasto brutal en centros de datos', 'Sube K: es acumulación'],
            ['Aún no se observa', 'Que suba la productividad', 'g_A: es lo que movería el techo'],
            ['Tampoco se observa', 'Desempleo masivo por IA', 'Sólo anécdotas, según los estudios que cita'],
          ], { head: ['Evidencia', 'Qué', 'En el modelo'] })}
          <p><b>Dos fuerzas opuestas:</b> reemplaza personas o hace crecer la economía y pide nuevos perfiles. <b>Tres escenarios:</b> todos más productivos; todos reemplazados; o intermedio, con unos muy ricos y otros peor. El último se conecta con la desigualdad.</p>
          <p><b>¿Cuánto tarda?</b> Según el profe, se dice que la electricidad tardó ≈50 años en reflejarse y el Internet ≈5; él esperaría ≈3 a 5 años para la IA.</p>
        </div><div>
          ${E.tip('<q>Al día de hoy todavía no se ha visto que el AI realmente impacte la productividad.</q> Sobre EUA: <q>ha habido más K, pero todavía no vemos la productividad.</q> Y si le preguntan cuál escenario ganará: no lo sabemos.', C1)}
          ${E.note('Antes de la IA, Google, Microsoft y Apple ya topaban con límites antimonopolio y buscaban ingresos en otros lados (Apple Pay, tarjeta de Amazon). La IA y la nube les dieron una nueva fuente. El profe también trae el dato de que los centros de datos podrían consumir en ≈5 años lo que Japón (estimación que vio, sin fuente en clase): la IA también es un problema de energía.', 'Contexto de negocio')}
          ${E.warn('No afirmes en el examen que la IA "ya subió" o "no va a subir" la productividad. La respuesta madura es condicional: qué tendría que verse en el residuo y qué riesgo hay si no aparece.')}
        </div></div>` })}

      <h2>3 · Los casos</h2>

      ${E.concept({ id: 'ww', title: 'Predicting the Next High-Growth Economies (Warnock y Walsh, Darden 2024)', badge: 'star', html: `
        <div class="cols"><div>
          <p><b>De qué trata:</b> Arturo Rodrigo, inversionista en Greenwich, a inicios de 2023, tras COVID y la invasión de Ucrania, debe decidir qué economías están listas para crecer fuerte. Vuelve a la llamada BRICs de Jim O'Neill (Goldman Sachs, 2001): ¿qué había detrás y se puede repetir?</p>
          <p><b>Qué pasó:</b> O'Neill acertó. Los cuatro superaron con holgura a EUA, Reino Unido y Alemania (≈2 %) entre 2001 y 2014. Brasil y Rusia menos que India y China.</p>
          <p><b>Por qué, con Solow:</b> crecen rápido quienes están (i) abajo de su estado estacionario o (ii) con productividad en aumento. En 2000 eso se veía en los datos:</p>
          ${E.table([
            ['China', 'Inversión muy alta, capital humano arriba del promedio, PIB pc bajo', 'Muy abajo de k*'],
            ['India', 'PIB pc aún menor, inversión arriba del promedio', 'Abajo de k*'],
            ['Brasil', 'Más pobre que México y Argentina, con inversión alta', 'Margen'],
            ['Rusia', 'Capital humano muy alto, más pobre que Polonia o Argentina', 'Margen'],
          ], { head: ['País', 'Señal en 2000', 'Lectura'] })}
          <p><b>Lección:</b> no busques "el país pobre", busca la <b>distancia a su propio estado estacionario</b> y si tiene momentum de A.</p>
          ${E.tip('Cómo plantea el caso: eres responsable de identificar el mercado de mayor crecimiento. No basta con ver qué pasó el año pasado: aplica Solow y ubica si el país ya está cerca del punto de equilibrio o lejos; entre más lejos, mejor su perspectiva.', C1)}
        </div><div>
          <h4>Señales de estar abajo de k*</h4>
          <ul><li>Perdió capital por causa externa (guerra)</li><li>Choque positivo al ahorro o nuevo acceso a tecnología</li><li>Más IED o menor servicio de deuda</li></ul>
          <h4>¿Para quién importa el PIB? (el caso lo pregunta)</h4>
          ${E.table([
            ['Inversionista de cartera', 'Sí, pero imperfecto: importa cuánto crecimiento llega a empresas listadas y la protección al inversionista'],
            ['Exportador', 'Sí: el PIB es demanda'],
            ['IED vertical', 'Poco: produce barato para exportar. Importan costos'],
            ['IED horizontal', 'Mucho: produce allá para vender allá'],
          ], { head: ['Quién', '¿Le importa?'] })}
          <h4>Sharma: lo que Solow no ve</h4>
          <ul class="small">
            <li><b>Competitividad:</b> si un país se siente caro a un visitante rico, no es breakout</li>
            <li><b>Billonarios buenos vs. malos:</b> innovación vs. conexiones, recursos o herencia</li>
            <li><b>Segunda ciudad:</b> mal signo si es menos de 1/3 de la principal</li>
            <li><b>Infraestructura:</b> importa la composición de la inversión</li>
            <li><b>Maldición de recursos:</b> enfermedad holandesa y capital mal asignado</li>
          </ul>
        </div></div>
        <h4>Las preguntas del caso, respondidas</h4>
        ${E.reveal('1. ¿Qué determina el crecimiento? ¿Acumulación o productividad? ¿Por qué Cobb-Douglas?', `<p>K, L y A, con s, δ, n y α como parámetros. La acumulación explica el crecimiento <b>en transición</b> y el <b>nivel</b>; la productividad explica el crecimiento <b>sostenido</b> por persona. En el Banco Mundial (lámina 68) la PTF explica la mayor parte del aumento de ingreso de emergentes en 1999–2005. Cobb-Douglas sirve porque da rendimientos constantes a escala, decrecientes por factor y participaciones estables, y se puede descomponer en tasas de crecimiento.</p>`)}
        ${E.reveal('2. ¿Cómo aparecen los rendimientos decrecientes? Diagrama, estado estacionario y convergencia', `<p>En α &lt; 1: y = A·k<sup>α</sup> es cóncava, mientras que la reposición (δ+n+g)k es recta. Por eso s·y arranca arriba y termina abajo, y se cruzan. Abajo de k* la inversión supera la reposición y k sube; arriba, baja. El cruce es estable, y por eso los países convergen a él, cada uno al suyo. Lo ves en el Laboratorio 1.</p>`)}
        ${E.reveal('3. Corto vs. largo plazo: qué importa en cada uno', `<p><b>Corto y mediano plazo (transición):</b> distancia a k*, s, IED, δ. <b>Largo plazo:</b> sólo g; s, n y δ determinan el nivel y*, no la tasa. <b>Sensibilidad</b> con y* = A·(s/(δ+n+g))<sup>α/(1−α)</sup>: con α = 1/3 la elasticidad de y* a s es 0.5 (+10 % en s ≈ +5 % en y*), y a A es 1. Un Excel del modelo debería mostrar eso.</p><p class="small muted">El ciclo es otra cosa: Solow es crecimiento potencial, no explica recesiones.</p>`)}
        ${E.reveal('4. ¿Dónde falla Solow?', `<ul><li><b>A es exógena:</b> el modelo la necesita pero no la explica.</li><li><b>Capital humano:</b> educación y salud no están.</li><li><b>Población:</b> efecto mecánico negativo en y, pero más gente puede dar más ideas; el caso lo llama ambiguo.</li><li><b>Economía cerrada:</b> abierta hay ahorro externo e IED con derramas.</li><li><b>Gobierno e instituciones:</b> déficits bajan s; infraestructura y educación suben A; corrupción lo contrario.</li><li><b>Señales de Sharma:</b> calidad y composición, que Solow no ve.</li></ul>`)}
        ${E.reveal('5. Recomendación: ¿en dónde invertir?', `<p>La guía de la actividad pide hacerla explícita: <b>acumulación con techo vs. momentum de productividad</b>. Con datos de Penn World Table (PWT 11, 2013–23; K/Y ÷ K/Y* es la distancia al estado estacionario, menos de 1 = abajo):</p>
          ${E.table([
            ['Vietnam', '18 %', '27 %', '+5.5', '0.67', 'Margen + inversión + momentum: el perfil más completo'],
            ['Bangladesh', '11 %', '27 %', '+4.7', '0.60', 'Margen claro; depende de ahorro externo (S &lt; I)'],
            ['Etiopía', '4 %', '21 %', '+4.9', '0.43', 'Máxima distancia; muy dependiente del exterior'],
            ['India', '12 %', '28 %', '+2.5', '0.78', 'Margen, ahorro propio; revisa datos de empleo'],
            ['México', '27 %', '20 %', '−0.5', '0.77', 'Hay margen pero Y/L cae: problema de A, no de k'],
            ['Rusia', '54 %', '20 %', '+0.8', '1.33', 'Mucho capital: más ahorro rinde poco'],
          ], { head: ['País', 'PIB pc % EUA', 'I/PIB', 'Y/L % anual', 'K/Y ÷ K/Y*', 'Lectura'] })}
          <p>Una respuesta defendible: <b>Vietnam primero</b>, Bangladesh e India como segunda línea, y Etiopía como apuesta de mayor riesgo. <i>Es interpretación, no una conclusión del caso; el caso cierra sin respuesta</i>. Lo que se califica es que siga del modelo.</p>
          <p class="small muted">Ojo con la fuente: el ahorro de México es 23 % en el Exhibit 3 del caso y ≈14 % en PWT, según la definición. Cita cuál usas.</p>`)}
        ` })}

      ${E.concept({ id: 'rod', title: 'A Note on Long-Run Models of Economic Growth (Rodriguez, Darden)', badge: 'in', html: `
        <div class="cols"><div>
          <p><b>De qué trata:</b> nota técnica, sin personajes. Abre con la pregunta de Robert Lucas: ¿qué podría hacer un gobierno para que su país crezca como otros? La consecuencia humana de esa pregunta es enorme. La nota construye Solow paso a paso y cierra con preguntas sobre sus límites.</p>
          <p><b>Supuestos:</b> economía cerrada (S = I), rendimientos constantes a escala, decrecientes en capital, tecnología exógena.</p>
          <p><b>Tres implicaciones:</b></p>
          <ol>
            <li>Mientras menor sea k respecto a k*, más rápido crece; sin cambios, el crecimiento se desacelera siempre.</li>
            <li>El ahorro sube el nivel y el crecimiento de transición, pero no tiene efecto permanente en la tasa.</li>
            <li>El progreso tecnológico exógeno es la única fuente duradera de mejora.</li>
          </ol>
          ${E.note('Usa "trabajador efectivo" (AL): al sumar tecnología la recta pasa a (δ+n+g)k. En el estado estacionario k por trabajador efectivo no crece, pero k y y por trabajador real crecen a g.', 'El detalle técnico')}
        </div><div>
          <h4>Las preguntas con que cierra</h4>
          ${E.reveal('Si el rendimiento del capital es mayor en países pobres, ¿por qué no fluye el capital de ricos a pobres?', `<p>Solow predice rendimientos altos en países con poco capital, así que el dinero debería ir hacia allá. Los datos muestran mucho menos flujo. Razones: A y capital humano no son iguales, así que el rendimiento real es menor del que sugiere k; hay riesgo e instituciones débiles. El tema S2 muestra algo más fuerte: emergentes prestándole a EUA (saving glut de Bernanke).</p>`)}
          ${E.reveal('¿Los pobres alcanzan a los ricos?', `<p>Sólo si comparten fundamentales. La convergencia absoluta no se sostiene en general. Hay convergencia <b>condicional</b>: sólo entre países con s, n, A e instituciones parecidas o una vez que controlas por ellas.</p>`)}
          ${E.reveal('¿Todos tienen la misma tecnología y trabajadores igual de capaces?', `<p>El modelo lo supone; la realidad no. De ahí capital humano, instituciones (Acemoglu, Johnson y Robinson) y conocimiento y destrucción creativa (Mokyr, Aghion y Howitt), que es lo que explica por qué A difiere entre países.</p>`)}
          ${E.tip('Sobre el trabajo: el profe advirtió que no quiere ver temas fuera de lo visto. Dijo <q>¿Yo cuándo hablé de crecimiento endógeno?</q> y remató con <q>tiene que usar lo que está en el curso.</q> En el ensayo, usa Solow y los Nobel de la lámina; no te vayas a modelos que no vio.', CLASE)}
          ${E.tip('Sobre IA para estudiar: si le dices "resuelve este caso", no aprendes; si lees y le preguntas "no entendí qué es el TFP" o "por qué llego al steady state", tu aprendizaje crece. Te conviene para el examen, que es a libro cerrado.', C1)}
        </div></div>` })}

      <h2>4 · Quiz rápido</h2>
      <div id="qz1"></div>

      <h2>5 · Noticias recientes, para contexto</h2>
      <p class="prose">Hechos verificados al 2-nov-2026. Más ensayos en ${E.link('noticias', 'Noticias')} y en el ${E.link('simulacro', 'simulacro')}.</p>
      <div class="g2" id="nw1"></div>
      </div>`;

      // ------------------------------------------------------------ Lab 1 · Solow
      let st = null, shock = '', cD, cY, cG;
      const T_MAX = 80, TS = 10;
      const P = (x) => ({ s: x.s, d: x.d, n: x.n, g: x.g, a: x.a, A: x.A, k0: x.k0 });
      const shocked = (p) => { const q = { ...p }; if (shock === 's') q.s += 0.05; if (shock === 'A') q.A *= 1.2; return q; };

      const drawSol = () => {
        if (!st) return;
        const p = P(st), base = SS(p), nw = SS(shocked(p));
        const pB = path(p, T_MAX), pS = shock ? path(p, T_MAX, shock, TS) : pB;
        const dist = p.k0 / base.k, g0 = pB[0].gy, half = Math.log(2) / ((1 - p.a) * (p.d + p.n + p.g));
        const hl = !!shock && shock !== 'war';
        E.tiles(root.querySelector('#tSol'), [
          { label: 'k* (hoy)', v: nw.k, fmt: 'n', dec: 2, base: hl ? base.k : undefined, better: 'up', note: 'capital por trabajador de largo plazo', hl: true },
          { label: 'y* (hoy)', v: nw.y, fmt: 'n', dec: 2, base: hl ? base.y : undefined, better: 'up', note: 'producción por trabajador de largo plazo', hl: true },
          { label: 'Distancia k₀ / k*', v: dist, fmt: 'pct', dec: 0, note: dist < 0.97 ? 'abajo del techo' : dist > 1.03 ? 'arriba del techo' : 'en el techo' },
          { label: 'Crecimiento de transición', v: g0, fmt: 'pct', dec: 1, note: 'y por trabajador, año 0' },
          { label: 'Crecimiento de largo plazo', v: p.g, fmt: 'pct', dec: 1, note: 'sólo g, ni s ni n ni δ' },
          { label: 'Vida media de la brecha', v: half, fmt: 'n', dec: 0, note: 'años para cerrar la mitad, ≈' },
        ]);
        [cD, cY, cG].forEach((c) => c && c.refresh());

        // lectura dinámica
        const t0 = shock ? TS : 0;
        const split = (H) => { const a = pS[t0], b = pS[t0 + H]; const conv = p.a * Math.log(b.kt / a.kt), tech = Math.log(b.A / a.A), tot = conv + tech; return { conv, tot, acc: tot > 1e-6 ? conv / tot : null }; };
        const w10 = split(10), w40 = split(40);
        let txt = '';
        if (dist < 0.97) txt += `Empiezas al <b>${pp(dist, 0)} de k*</b>: la inversión supera a la reposición y y crece <b>${pp(g0)}</b>, por arriba de su ritmo de largo plazo (${pp(p.g)}). Ese extra es <b>convergencia</b>: se va apagando conforme k sube, porque cada máquina rinde menos. `;
        else if (dist > 1.03) txt += `Empiezas <b>arriba de k*</b> (${pp(dist, 0)}): la reposición supera a la inversión y k por trabajador efectivo cae. y crece <b>${pp(g0)}</b>, menos que g (${pp(p.g)}). Tienes más capital del que tu ahorro puede sostener. `;
        else txt += `Estás prácticamente <b>en el estado estacionario</b>: la inversión apenas repone. y crece a g = <b>${pp(p.g)}</b>, ni más ni menos. `;
        if (shock === 's') {
          const gA = pS[TS].gy, gB = pB[TS].gy, lv = pS[T_MAX].y / pB[T_MAX].y - 1;
          txt += `<br><b>Choque de ahorro:</b> al año ${TS} el crecimiento pasa de ${pp(gB)} a ${pp(gA)}, pero es transitorio. Al final y queda <b>${pp(lv, 0)} arriba</b> de la trayectoria sin choque y con la misma pendiente. Es <b>acumulación: tiene techo</b>. `;
        } else if (shock === 'A') {
          const lv = pS[T_MAX].y / pB[T_MAX].y - 1;
          txt += `<br><b>Choque de productividad:</b> la curva completa sube y k* con ella: y salta de inmediato y sigue subiendo mientras k se ajusta, hasta quedar <b>${pp(lv, 0)} arriba</b>. Este salto es de una vez: lo que da crecimiento <i>sostenido</i> es que g sea alta, no un solo salto. `;
        } else if (shock === 'war') {
          txt += `<br><b>Guerra:</b> se destruye capital pero <b>no cambia el techo</b>. Quedas más lejos de k* y el crecimiento posterior sube a ${pp(pS[TS].gy)}: reconstrucción. Por eso Alemania, Francia y, según el profe, Ucrania cuando termine. `;
        }
        if (p.g === 0) txt += `<br><b>Con g = 0 el crecimiento por trabajador termina en cero.</b> Es la "mala noticia" de Solow: sin tecnología, invertir no te hace crecer para siempre. `;
        else if (w10.acc !== null && w40.acc !== null) {
          const lbl = (x) => pp(Math.max(0, Math.min(1, x)), 0);
          txt += `<br><b>¿De dónde viene${shock ? ' desde el choque' : ''}?</b> En los primeros 10 años, <b>${lbl(w10.acc)} del crecimiento de y es acumulación</b> y el resto PTF. A 40 años, la acumulación pesa sólo ${lbl(w40.acc)}. `;
          if (w10.conv < 0) txt += 'Aquí la acumulación resta, porque k̃ va bajando. ';
          else if (w10.acc >= 0.5) txt += 'Mucho crecimiento de hoy es <b>acumulación: sirve, pero tiene techo</b>. Si eres inversionista, pregúntate qué queda cuando se agote: lo que queda es g.';
          else txt += 'Ya pesa más la <b>PTF</b>, que es lo que dura; lo que aporta la acumulación se sigue apagando.';
        }
        root.querySelector('#rSol').innerHTML = `<b>Lectura</b>${txt}`;
      };

      E.knobs(root.querySelector('#kSol'), [
        { k: 's', label: 's · Tasa de ahorro', min: 0.05, max: 0.45, step: 0.01, v: 0.25, fmt: 'pct', dec: 0, hint: 'Sube la curva s·y' },
        { k: 'd', label: 'δ · Depreciación', min: 0.02, max: 0.1, step: 0.005, v: 0.05, fmt: 'pct', hint: 'Empina la recta' },
        { k: 'n', label: 'n · Crecimiento de la población', min: -0.01, max: 0.03, step: 0.001, v: 0.01, fmt: 'pct', hint: 'Empina la recta; negativo = Japón' },
        { k: 'g', label: 'g · Progreso tecnológico', min: 0, max: 0.05, step: 0.001, v: 0.02, fmt: 'pct', hint: 'Lo único que sostiene el crecimiento' },
        { k: 'A', label: 'A · Nivel de productividad', min: 0.5, max: 3, step: 0.05, v: 1, fmt: 'n', dec: 2 },
        { k: 'a', label: 'α · Participación del capital', min: 0.2, max: 0.5, step: 0.01, v: 0.33, fmt: 'n', dec: 2, hint: 'Más α: rendimientos decrecen más lento' },
        { k: 'k0', label: 'k₀ · Capital inicial por trabajador', min: 0.2, max: 12, step: 0.1, v: 1.5, fmt: 'n', dec: 1 },
      ], (x) => { st = x; drawSol(); }, { title: '🎛️ Perillas' });

      const line = (T, name, data, color, extra = {}) => ({ name, type: 'line', data, showSymbol: false, lineStyle: { color, width: 2, ...(extra.dash ? { type: 'dashed' } : {}) }, itemStyle: { color }, ...(extra.more || {}) });

      cD = E.chart(root.querySelector('#cDiag'), (T) => {
        const p = P(st), q = shocked(p), b = SS(p), nw = SS(q);
        // Los ejes cambian juntos (y máx = 0.3 · k máx), para que la pendiente en pantalla sólo cambie si cambia de verdad. El mínimo hace que y(k) siempre quepa.
        const RATIO = 0.3, need = Math.max(Math.max(b.k, nw.k, p.k0) * 1.2, Math.max(p.A, q.A) / Math.pow(RATIO, 1 / (1 - p.a)));
        const mag = Math.pow(10, Math.floor(Math.log10(need))), xm = [1, 1.5, 2, 3, 4, 6, 8, 10].find((m) => m * mag >= need - 1e-9) * mag, ym = xm * RATIO, N = 120;
        const pts = (fn) => Array.from({ length: N + 1 }, (_, i) => { const k = (xm * i) / N; return [k, fn(k)]; });
        const yF = (r) => (k) => Math.pow(k, r.a) * Math.pow(r.A, 1 - r.a);
        const d = p.d + p.n + p.g;
        const ser = [
          line(T, 'y(k)', pts(yF(p)), T.c1),
          line(T, 's·y', pts((k) => p.s * yF(p)(k)), T.c2),
          line(T, p.g ? '(δ+n+g)·k' : '(δ+n)·k', pts((k) => d * k), T.c3),
        ];
        if (shock === 'A') ser.push(line(T, 'y(k) con choque', pts(yF(q)), T.c1, { dash: true }));
        if (shock === 's' || shock === 'A') ser.push(line(T, 's·y con choque', pts((k) => q.s * yF(q)(k)), T.c2, { dash: true }));
        const mark = (x, yv, nm, c, pos) => ({ value: [x, yv], name: nm, itemStyle: { color: c, borderColor: T.card, borderWidth: 2 }, label: { show: true, formatter: nm, position: pos || 'top', color: T.ink, fontSize: 12, fontWeight: 700 } });
        const marks = [mark(b.k, d * b.k, 'k*', T.c4)];
        if (shock === 's' || shock === 'A') marks.push(mark(nw.k, d * nw.k, 'k* nuevo', T.c4));
        const k00 = shock === 'war' ? p.k0 * 0.5 : p.k0;
        marks.push(mark(k00, p.s * yF(p)(k00), shock === 'war' ? 'k tras guerra' : 'k₀', T.c5, 'left'));
        ser.push({ name: 'Puntos', type: 'scatter', symbolSize: 11, data: marks, z: 5, tooltip: { show: false } });
        return { ...E.baseOpt(T), legend: { ...E.baseOpt(T).legend, data: ser.filter((s) => s.name !== 'Puntos').map((s) => s.name) }, grid: { left: 8, right: 16, top: 34, bottom: 26, containLabel: true },
          tooltip: { ...E.baseOpt(T).tooltip, axisPointer: { type: 'line', lineStyle: { color: T.axis } }, valueFormatter: (v) => F.n(v, 2) },
          xAxis: E.axisVal(T, (v) => F.n(v, xm < 10 ? 1 : 0), { name: 'k', nameLocation: 'end', nameTextStyle: { color: T.muted }, max: xm, min: 0, interval: xm / 5, splitLine: { show: false }, axisLine: { show: true, lineStyle: { color: T.axis } } }),
          yAxis: E.axisVal(T, (v) => F.n(v, 1), { min: 0, max: ym, interval: ym / 5 }), series: ser };
      });

      const years = Array.from({ length: T_MAX + 1 }, (_, i) => i);
      const cat = (T) => E.axisCat(years, T, { axisLabel: { color: T.ink2, fontSize: 11, interval: 9 }, boundaryGap: false });
      cY = E.chart(root.querySelector('#cY'), (T) => {
        const p = P(st), b = path(p, T_MAX), s = shock ? path(p, T_MAX, shock, TS) : null;
        const ser = s ? [line(T, 'Con choque', s.map((r) => r.y), T.c1), line(T, 'Sin choque', b.map((r) => r.y), T.c2, { dash: true })] : [line(T, 'y(t)', b.map((r) => r.y), T.c1)];
        return { ...E.baseOpt(T), legend: { ...E.baseOpt(T).legend, show: !!s }, tooltip: { ...E.baseOpt(T).tooltip, axisPointer: { type: 'line', lineStyle: { color: T.axis } }, valueFormatter: (v) => F.n(v, 2) }, xAxis: cat(T), yAxis: E.axisVal(T, (v) => F.n(v, 1), { scale: true }), series: ser };
      });
      cG = E.chart(root.querySelector('#cG'), (T) => {
        const p = P(st), b = path(p, T_MAX), s = shock ? path(p, T_MAX, shock, TS) : null;
        const toP = (a) => a.map((r) => (r.gy === null ? null : r.gy * 100));
        const gl = line(T, 'g (largo plazo)', years.map(() => p.g * 100), T.c3, { dash: true });
        const ser = s ? [line(T, 'Con choque', toP(s), T.c1), line(T, 'Sin choque', toP(b), T.c2, { dash: true }), gl] : [line(T, 'Crecimiento de y', toP(b), T.c1), gl];
        return { ...E.baseOpt(T), tooltip: { ...E.baseOpt(T).tooltip, axisPointer: { type: 'line', lineStyle: { color: T.axis } }, valueFormatter: (v) => (v === null || v === undefined ? '—' : F.n(v, 1) + '%') }, xAxis: cat(T), yAxis: E.axisVal(T, (v) => F.n(v, 1) + '%'), series: ser };
      });
      drawSol();
      root.querySelector('#shk').addEventListener('click', (ev) => {
        const b = ev.target.closest('button'); if (!b) return;
        shock = b.dataset.s; root.querySelectorAll('#shk button').forEach((x) => x.classList.toggle('on', x === b));
        drawSol();
      });

      // ------------------------------------------------------------ Lab 2 · Convergencia
      const PRE = {
        cond: { txt: 'Mismo A y g, pero el rico ahorra más. El pobre crece más rápido y se acerca, pero se queda en su propio techo.', a: { s: 0.25, n: 0.01, d: 0.05, g: 0.02, A: 1, k0: 1 }, b: { s: 0.35, n: 0.01, d: 0.05, g: 0.02, A: 1, k0: 5 } },
        abs: { txt: 'Fundamentales idénticos, sólo cambia el capital inicial. Es el único caso en que los dos llegan al mismo lugar.', a: { s: 0.25, n: 0.01, d: 0.05, g: 0.02, A: 1, k0: 1 }, b: { s: 0.25, n: 0.01, d: 0.05, g: 0.02, A: 1, k0: 5 } },
        trap: { txt: 'El pobre ahorra poco, su población crece mucho y su A es baja: ya está arriba de su propio k*. Ser pobre no le garantiza crecer.', a: { s: 0.1, n: 0.025, d: 0.05, g: 0.02, A: 0.5, k0: 1.2 }, b: { s: 0.3, n: 0.01, d: 0.05, g: 0.02, A: 1, k0: 6 } },
        vm: { txt: 'A = Vietnam, B = México. Estilizado: s, n y δ vienen del Exhibit 3 del caso (Vietnam 31/0.8/5.4; México 20/0.6/3.9). g, A y k₀ son supuestos del ejercicio para reproducir una razón de PIB pc ≈0.65 (PWT, 2023) y distancias parecidas; g refleja la PTF estancada de México que comentó el profe. No es un pronóstico.', a: { s: 0.31, n: 0.008, d: 0.054, g: 0.02, A: 0.72, k0: 2.9 }, b: { s: 0.2, n: 0.006, d: 0.039, g: 0.005, A: 1, k0: 5.44 } },
      };
      let cvA = null, cvB = null, cvAl = 0.33, cCvY, cCvG;
      const HZ = 60, yrs2 = Array.from({ length: HZ + 1 }, (_, i) => i);
      const cvP = (x) => ({ ...x, a: cvAl });
      const drawCv = () => {
        if (!cvA || !cvB) return;
        const pa = cvP(cvA), pb = cvP(cvB), ra = path(pa, HZ), rb = path(pb, HZ), sa = SS(pa), sb = SS(pb);
        E.tiles(root.querySelector('#tCv'), [
          { label: 'A · y hoy', v: ra[0].y, fmt: 'n', dec: 2 }, { label: 'A · y*', v: sa.y, fmt: 'n', dec: 2, note: 'su propio techo, con A de hoy' }, { label: 'A · crece hoy', v: ra[0].gy, fmt: 'pct', dec: 1, hl: true },
          { label: 'B · y hoy', v: rb[0].y, fmt: 'n', dec: 2 }, { label: 'B · y*', v: sb.y, fmt: 'n', dec: 2, note: 'su propio techo, con A de hoy' }, { label: 'B · crece hoy', v: rb[0].gy, fmt: 'pct', dec: 1, hl: true },
        ]);
        cCvY && cCvY.refresh(); cCvG && cCvG.refresh();
        const aPoor = ra[0].y <= rb[0].y, poor = aPoor ? 'A' : 'B', rich = aPoor ? 'B' : 'A';
        const rp = aPoor ? ra : rb, rr = aPoor ? rb : ra, pp2 = aPoor ? pa : pb, pr = aPoor ? pb : pa, sp = aPoor ? sa : sb, sr = aPoor ? sb : sa;
        const g0p = rp[0].gy, g0r = rr[0].gy, r0 = rp[0].y / rr[0].y, rH = rp[HZ].y / rr[HZ].y, dP = pp2.k0 / sp.k, dR = pr.k0 / sr.k;
        let t = `El más pobre hoy es <b>${poor}</b> (${F.n(r0 * 100, 0)} % del ingreso de ${rich}) y está al <b>${pp(dP, 0)} de su k*</b>; ${rich} está al ${pp(dR, 0)} del suyo. `;
        if (g0p > g0r + 0.0005) t += `${poor} crece más hoy (${pp(g0p)} vs. ${pp(g0r)}): <b>hay convergencia</b> porque está más lejos de su propio techo. `;
        else t += `${poor} <b>no crece más</b> (${pp(g0p)} vs. ${pp(g0r)}): ser pobre no basta, porque ya está cerca o arriba de su propio techo. `;
        if (Math.abs(pp2.g - pr.g) > 1e-6) {
          const lead = pp2.g > pr.g ? poor : rich;
          t += `<br><b>Las g son distintas</b> (${pp(pp2.g)} vs. ${pp(pr.g)}): en el largo plazo domina ${lead}, y la brecha se abre sin límite a su favor. A ${HZ} años, ${poor} ya está en ${F.n(rH * 100, 0)} % de ${rich}. Ningún ahorro compensa una diferencia permanente de productividad.`;
        } else {
          const lim = sp.y / sr.y;
          if (Math.abs(lim - 1) < 0.02) t += `<br><b>Convergencia absoluta:</b> con los mismos fundamentales la brecha desaparece: ${pp(r0, 0)} → ${pp(rH, 0)} a ${HZ} años.`;
          else if (lim < r0) t += `<br><b>Ni siquiera converge:</b> su propio techo es sólo ${pp(lim, 0)} de ${rich}, por debajo del ${pp(r0, 0)} de hoy, así que la brecha se abre (a ${HZ} años va en ${pp(rH, 0)}). Tiene que cambiar sus fundamentales: s, n o A.`;
          else t += `<br><b>Convergencia condicional:</b> ${poor} se acerca sólo a ${pp(lim, 0)} de ${rich}, no a 100 % (a ${HZ} años va en ${pp(rH, 0)}). Para cerrar el resto debe cambiar sus fundamentales: s, n o A.`;
        }
        root.querySelector('#rCv').innerHTML = `<b>Lectura</b>${t}`;
      };
      const cvKnobs = (t) => [
        { k: 's', label: 's · Ahorro', min: 0.05, max: 0.5, step: 0.01, v: t.s, fmt: 'pct', dec: 0 },
        { k: 'n', label: 'n · Población', min: -0.01, max: 0.03, step: 0.001, v: t.n, fmt: 'pct' },
        { k: 'd', label: 'δ · Depreciación', min: 0.02, max: 0.1, step: 0.001, v: t.d, fmt: 'pct' },
        { k: 'g', label: 'g · Tecnología', min: 0, max: 0.05, step: 0.001, v: t.g, fmt: 'pct' },
        { k: 'A', label: 'A · Productividad', min: 0.3, max: 3, step: 0.01, v: t.A, fmt: 'n', dec: 2 },
        { k: 'k0', label: 'k₀ · Capital inicial', min: 0.2, max: 12, step: 0.01, v: t.k0, fmt: 'n', dec: 2 },
      ];
      const kPa = E.knobs(root.querySelector('#kPa'), cvKnobs(PRE.cond.a), (x) => { cvA = x; drawCv(); }, { title: '🅰️ País A' });
      const kPb = E.knobs(root.querySelector('#kPb'), cvKnobs(PRE.cond.b), (x) => { cvB = x; drawCv(); }, { title: '🅱️ País B' });
      E.knobs(root.querySelector('#kAl'), [{ k: 'a', label: 'α · Común a los dos', min: 0.2, max: 0.5, step: 0.01, v: 0.33, fmt: 'n', dec: 2 }], (x) => { cvAl = x.a; drawCv(); }, { title: '⚖️ Común' });
      const cvCat = (T) => E.axisCat(yrs2, T, { axisLabel: { color: T.ink2, fontSize: 11, interval: 9 }, boundaryGap: false });
      const ttl = (T, f) => ({ ...E.baseOpt(T).tooltip, axisPointer: { type: 'line', lineStyle: { color: T.axis } }, valueFormatter: f });
      cCvY = E.chart(root.querySelector('#cCvY'), (T) => ({ ...E.baseOpt(T), tooltip: ttl(T, (v) => F.n(v, 2)), xAxis: cvCat(T), yAxis: E.axisVal(T, (v) => F.n(v, 1), { scale: true }), series: [line(T, 'País A', path(cvP(cvA), HZ).map((r) => r.y), T.c1), line(T, 'País B', path(cvP(cvB), HZ).map((r) => r.y), T.c2)] }));
      cCvG = E.chart(root.querySelector('#cCvG'), (T) => ({ ...E.baseOpt(T), tooltip: ttl(T, (v) => (v === null || v === undefined ? '—' : F.n(v, 1) + '%')), xAxis: cvCat(T), yAxis: E.axisVal(T, (v) => F.n(v, 1) + '%'), series: [line(T, 'País A', path(cvP(cvA), HZ).map((r) => (r.gy === null ? null : r.gy * 100)), T.c1), line(T, 'País B', path(cvP(cvB), HZ).map((r) => (r.gy === null ? null : r.gy * 100)), T.c2)] }));
      root.querySelector('#cvTxt').textContent = PRE.cond.txt;
      drawCv();
      root.querySelector('#cvPre').addEventListener('click', (ev) => {
        const b = ev.target.closest('button'); if (!b) return;
        const p = PRE[b.dataset.p]; root.querySelectorAll('#cvPre button').forEach((x) => x.classList.toggle('on', x === b));
        root.querySelector('#cvTxt').textContent = p.txt;
        kPa.set(p.a, false); kPb.set(p.b, false); cvA = kPa.get(); cvB = kPb.get(); drawCv();
      });

      // ------------------------------------------------------------ Lab 3 · Contabilidad del crecimiento
      const PP = {
        china: { gY: 0.088, gK: 0.097, gL: 0.009, a: 0.35, txt: 'Lámina 68 (Banco Mundial, ≈ leído de la gráfica): capital fuerte, pero la mayor parte es PTF.' },
        latam: { gY: 0.025, gK: 0.029, gL: 0.023, a: 0.35, txt: 'Lámina 68 (≈ leído de la gráfica): todo es factores; la PTF apenas aparece. Es el problema de la región y de México.' },
        av1: { gY: 0.024, gK: 0.022, gL: 0.011, a: 0.35, txt: 'Lámina 67 (Lipschitz y Schadler, ≈): crecimiento potencial, 10 países avanzados, antes de la crisis.' },
        av2: { gY: 0.012, gK: 0.016, gL: 0.005, a: 0.35, txt: 'Lámina 67 (≈): con la crisis la PTF casi desaparece. Es el centro de la desaceleración.' },
        acum: { gY: 0.058, gK: 0.11, gL: 0.03, a: 0.35, txt: 'Ejemplo inventado: gran crecimiento casi sin PTF. Se ve espectacular hoy, pero tiene techo.' },
      };
      let ps = null, cP;
      const drawP = () => {
        if (!ps) return;
        const cK = ps.a * ps.gK, cL = (1 - ps.a) * ps.gL, gA = ps.gY - cK - cL, share = ps.gY > 0 ? gA / ps.gY : null, gy = ps.gY - ps.gL;
        const mult = Math.pow(1 + Math.max(gA, -0.05), 50), twoX = gA > 0.0005 ? 70 / (gA * 100) : null;
        E.tiles(root.querySelector('#tPtf'), [
          { label: 'g_A · PTF (residuo)', v: Math.abs(gA) < 0.0005 ? 0 : gA, fmt: 'pct', dec: 1, hl: true, note: 'lo que no explican K ni L' },
          { label: 'Parte de g_Y que es PTF', v: Math.abs(gA) < 0.0005 ? 0 : share, fmt: 'pct', dec: 0 },
          { label: 'α·g_K (capital)', v: cK, fmt: 'pct', dec: 1 },
          { label: '(1−α)·g_L (trabajo)', v: cL, fmt: 'pct', dec: 1 },
          { label: 'Y por trabajador', v: gy, fmt: 'pct', dec: 1, note: 'g_Y − g_L' },
          { label: 'A en 50 años', v: mult, fmt: 'x', dec: 1, note: twoX ? `se duplica en ≈${F.n(twoX, 0)} años` : 'no se duplica' },
        ]);
        cP && cP.refresh();
        let t = `De ${pp(ps.gY)} de crecimiento, capital aporta ${pp(cK)}, trabajo ${pp(cL)} y queda <b>${pp(Math.abs(gA) < 0.0005 ? 0 : gA)} de PTF</b>. `;
        if (ps.gY <= 0) t += 'Con un PIB que no crece, el reparto en porcentaje pierde sentido: mira los niveles.';
        else if (gA < -0.0005) t += '<b>PTF negativa:</b> los factores crecieron más que el producto. Estás invirtiendo cada vez peor. Es el peor escenario para un inversionista.';
        else if (share < 0.2) t += '<b>Crecimiento por acumulación:</b> casi todo es poner más capital y más gente. Tiene techo por rendimientos decrecientes y porque la demografía se acaba. Es el perfil de Latinoamérica.';
        else if (share < 0.5) t += '<b>Mezcla:</b> hay productividad, pero la mayor parte es acumulación. Pregúntate cuánto dura.';
        else t += '<b>Crecimiento por productividad:</b> más de la mitad es hacer más con lo mismo. Eso es lo que Solow dice que puede durar.';
        t += ' <span class="small muted">Recuerda: el residuo incluye tecnología, eficiencia, instituciones y error de medición.</span>';
        root.querySelector('#rPtf').innerHTML = `<b>Lectura</b>${t}`;
      };
      const kp = E.knobs(root.querySelector('#kPtf'), [
        { k: 'gY', label: 'g_Y · Crecimiento del PIB', min: -0.02, max: 0.12, step: 0.001, v: 0.04, fmt: 'pct' },
        { k: 'gK', label: 'g_K · Crecimiento del capital', min: -0.01, max: 0.14, step: 0.001, v: 0.05, fmt: 'pct' },
        { k: 'gL', label: 'g_L · Crecimiento del trabajo', min: -0.02, max: 0.05, step: 0.001, v: 0.015, fmt: 'pct' },
        { k: 'a', label: 'α · Participación del capital', min: 0.2, max: 0.5, step: 0.01, v: 0.35, fmt: 'n', dec: 2, hint: 'Kehoe y Xu usan 0.35' },
      ], (x) => { ps = x; drawP(); }, { title: '🎛️ Datos de crecimiento (% anual)' });
      cP = E.chart(root.querySelector('#cPtf'), (T) => {
        const cK = ps.a * ps.gK * 100, cL = (1 - ps.a) * ps.gL * 100, gA = ps.gY * 100 - cK - cL;
        const colr = [T.c1, T.c2, T.c3, T.c4];
        const lab = (v) => F.n(v, 1) + '%';
        return { ...E.baseOpt(T), legend: { show: false }, tooltip: { ...E.baseOpt(T).tooltip, valueFormatter: lab },
          xAxis: E.axisCat(['Capital α·g_K', 'Trabajo (1−α)·g_L', 'PTF (residuo)', 'g_Y total'], T),
          yAxis: E.axisVal(T, (v) => F.n(v, 1) + '%'),
          series: [{ name: 'Aporte', type: 'bar', barMaxWidth: 46, data: [cK, cL, gA, ps.gY * 100].map((v, i) => ({ value: v, itemStyle: { color: colr[i], borderRadius: v >= 0 ? [4, 4, 0, 0] : [0, 0, 4, 4] } })), label: { show: true, position: 'top', color: T.ink2, formatter: (p) => lab(p.value) } }] };
      });
      drawP();
      root.querySelector('#ptfPre').addEventListener('click', (ev) => {
        const b = ev.target.closest('button'); if (!b) return;
        const p = PP[b.dataset.p]; root.querySelectorAll('#ptfPre button').forEach((x) => x.classList.toggle('on', x === b));
        root.querySelector('#ptfTxt').textContent = p.txt;
        kp.set({ gY: p.gY, gK: p.gK, gL: p.gL, a: p.a }, true);
      });

      // ------------------------------------------------------------ Quiz y noticias
      E.quiz(root.querySelector('#qz1'), [
        { q: 'Un país duplica su tasa de ahorro de forma permanente. Según Solow, en el largo plazo:', o: ['Su crecimiento por trabajador se duplica para siempre', 'Sube su nivel de ingreso, pero su tasa de largo plazo sigue siendo g', 'No cambia nada, ni el nivel ni la tasa', 'Su ingreso baja porque consume menos'], a: 1, w: 'Más s sube k* y y*: da un salto de nivel y crecimiento extra sólo en la transición. La tasa de largo plazo es g.' },
        { q: '¿Qué hace que exista un estado estacionario?', o: ['Que la gente deje de ahorrar al hacerse rica', 'Que el gobierno limite la inversión', 'Que la inversión crezca cada vez menos con k por rendimientos decrecientes, mientras la reposición crece proporcional a k', 'Que la tecnología se agote'], a: 2, w: 's·y es cóncava y (δ+n)k es recta: tienen que cruzarse.' },
        { q: 'Un país pobre crece lento durante décadas. ¿Contradice a Solow?', o: ['Sí: Solow dice que todos los pobres crecen rápido', 'Sí, salvo que tenga guerras', 'No, porque Solow no habla de países pobres', 'No: puede estar cerca de su propio estado estacionario por s baja o A baja'], a: 3, w: 'Convergencia condicional: lo que importa es la distancia a tu propio k*.' },
        { q: 'g_Y = 5 %, g_K = 6 %, g_L = 2 %, α = 0.3. ¿Cuánto es la PTF?', o: ['1.8 %', '−3 %', '3.2 %', '5 %'], a: 0, w: '5 − 0.3·6 − 0.7·2 = 5 − 1.8 − 1.4 = 1.8 %.' },
        { q: 'Tras una guerra, un país pierde gran parte de su capital sin cambiar s, n, δ ni A. El modelo predice:', o: ['Estancamiento permanente en un nivel más bajo', 'Crecimiento rápido y regreso al mismo estado estacionario', 'Que k* cae a la mitad', 'Que g aumenta permanentemente'], a: 1, w: 'k cae, k* no: queda más lejos de su techo y crece rápido al reconstruir. Alemania, Francia y, según el profe, Ucrania.' },
        { q: 'México y China se abrieron al comercio y sus exportaciones crecieron. Según la clase, ¿qué los distingue?', o: ['México comercia mucho menos que China', 'China invirtió y México no invirtió nada', 'En China la productividad creció y en México se estancó', 'México firmó el TLCAN y por eso frenó'], a: 2, w: 'La diferencia está en la PTF, no en la apertura: México es incluso más abierto que China, y el profe rechaza que el tratado sea la causa.' },
      ]);
      const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
      const fch = (d) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d); return m ? `${+m[3]} ${MES[+m[2] - 1]} ${m[1]}` : d; };
      root.querySelector('#nw1').innerHTML = E.news.filter((n) => n.topic === 'S1').sort((a, b) => b.date.localeCompare(a.date)).map((n) => `<article class="card2"><div class="small muted">${fch(n.date)} · ${E.esc(n.source)}</div><h4 style="margin:4px 0 6px"><a href="${E.esc(n.url)}" target="_blank" rel="noopener noreferrer">${n.title}</a></h4><p class="small" style="margin:0 0 6px"><b>${n.tool}</b></p><p class="small" style="margin:0">${n.read}</p></article>`).join('');
    },
  });

  // ================================================================ BANCOS
  E.news.push(
    { topic: 'S1', date: '2026-10-13', title: 'FMI: el mundo crecerá 3.1 % en 2026 y 3.4 % en 2027, con la inversión en IA compensando el choque de energía', source: 'CGTN sobre WEO del FMI', url: 'https://news.cgtn.com/news/2026-10-13/IMF-raises-2026-global-growth-forecast-to-3-1--1RcEPm28WWI/index.html', tool: 'Solow: acumulación vs. PTF', read: 'Hoy la IA sostiene la demanda vía inversión: sube K y eso, por rendimientos decrecientes, tiene techo. El crecimiento de largo plazo sólo cambia si esa inversión termina subiendo A. El dato de emergentes (3.7 % a 4.4 %) contra avanzados (2.1 % a 1.8 %) es compatible con convergencia, pero condicional: según Reuters vía investingLive, sólo 32 países explican 95 % del crecimiento y México aparece entre los proveedores de hardware de IA.' },
    { topic: 'S1', date: '2026-10-19', title: 'China crece 4.5 % en el tercer trimestre, pero la inversión fija cae 7.2 % en el acumulado y la inmobiliaria 20.6 %', source: 'China Daily HK / ANI (datos de la Oficina Nacional de Estadística)', url: 'https://www.chinadailyhk.com/article/641311', tool: 'Solow: rendimientos decrecientes; contabilidad del crecimiento', read: 'Una economía que invirtió más de 40 % del PIB (Exhibit 3) se acerca a su techo: cada peso rinde menos, y la caída inmobiliaria lo hace visible. Si K deja de empujar y la población baja, el crecimiento queda en manos de la PTF.' },
    { topic: 'S1', date: '2026-09-23', title: 'OCDE sube a 2.9 % su pronóstico global de 2026, con la IA y un choque energético mejor absorbido; ve 3.0 % en 2027', source: 'Euronews sobre el reporte interino de la OCDE', url: 'https://euronews.com/2026/09/23/oecd-lifts-2026-global-economic-growth-forecast-to-29-despite-iran-war-disruption', tool: 'Crecimiento potencial vs. ciclo', read: 'Es una lectura de corto plazo, y Solow no habla de eso: un choque de energía es ciclo, no potencial. Para el largo plazo, la pregunta es si el gasto en IA trae retornos: la OCDE misma lo pone como riesgo.' },
    { topic: 'S1', date: '2026-09-01', title: 'NBER: la baja natalidad se asocia con más PIB por trabajador, compensando la caída de población (Acemoglu, Autor, Beirne y Scott)', source: 'NBER Digest, sep-2026', url: 'https://www.nber.org/digest/202609/how-do-falling-birth-rates-affect-economic-growth', tool: 'Solow: efecto de n; PTF', read: 'Solow predice que menor n sube k por trabajador pero baja el PIB total. El estudio encuentra más: escasez de trabajo asociada con más automatización y PTF, justo la ambigüedad que señala el caso de Warnock y Walsh. Por eso envejecer no equivale automáticamente a menos crecimiento.' },
    { topic: 'S1', date: '2026-08-06', title: 'EUA: la productividad laboral sube 1.4 % en el 2T-2026, con producto +1.7 % y horas +0.3 % (BLS, preliminar)', source: 'Indeed Hiring Lab', url: 'https://hiringlab.indeed.com/2026/08/06/q2-productivity-and-costs-release/', tool: 'Contabilidad del crecimiento', read: 'Y crece más que L: suena a IA, pero g_y = g_A + α·g_k. Si lo que creció fue el capital por trabajador, es acumulación y no PTF. Para saberlo hay que restar el capital; la misma nota dice que aún no está claro cómo aparecerá la IA en los datos.' },
  );

  E.repaso.push({
    topic: 'S1', icon: '📈', title: 'Crecimiento y globalización', items: [
      ['Función de producción', 'Y = A·K^α·L^(1−α): constantes a escala; decrecientes en cada factor; α ≈ 1/3'],
      ['Acumulación', 'Δk = s·y − (δ+n+g)·k; en economía cerrada S = I'],
      ['Estado estacionario', 's·y* = (δ+n+g)·k*: la inversión apenas repone. y por trabajador crece a g'],
      ['Solución', 'y* = A·(s/(δ+n+g))^(α/(1−α)); con α = 1/3, duplicar s sube y* ≈ 41 %'],
      ['Sube s', 'Sube nivel y crecimiento de transición. No cambia la tasa de largo plazo'],
      ['Sube n o δ', 'Baja k* y y*. n más bajo: más k por trabajador, menos PIB total'],
      ['Guerra', 'k cae, k* no: crece rápido al reconstruir'],
      ['Tecnología', 'Única fuente de crecimiento sostenido por persona'],
      ['Convergencia condicional', 'Cada país converge a su propio k*: importa la distancia, no ser pobre'],
      ['Contabilidad', 'g_Y = g_A + α·g_K + (1−α)·g_L'],
      ['PTF', 'Residuo: g_Y − α·g_K − (1−α)·g_L. Tecnología, eficiencia, instituciones y error'],
      ['Productividad laboral', 'g_y = g_A + α·g_k: puede subir sólo por capital. No es PTF'],
      ['Sharma', 'Competitividad, billonarios buenos/malos, segunda ciudad, infraestructura, maldición de recursos'],
      ['Narrativa', 'Posguerra → estanflación 70s → China y globalización → descontento → COVID y PTF → ¿IA?'],
    ],
  });

  E.repaso.push({
    topic: 'S1', icon: '🏛️', title: 'Historia del crecimiento y mercados', items: [
      ['Por qué economía en un MBA', 'Riesgos macro en el valor de la empresa; analizar países; cadenas de valor'],
      ['Hechos de Susskind', 'Estancamiento milenario; despegue hace ≈200 años; se ha mantenido; a un costo enorme'],
      ['Trampa malthusiana', 'Más salario → más población → menor producto por trabajador → salario de subsistencia'],
      ['Qué rompió la trampa', 'Tecnología y mercados: la población y el salario crecen juntos'],
      ['Incentivos', 'La tecnología es el vehículo; sin incentivos de mercado no se desarrolla'],
      ['Adam Smith', 'Propio interés + mercados mayores → especialización → eficiencia → crecimiento'],
      ['México', 'Se estabilizó (inflación, déficit, tasas largas) y no crece: falta productividad'],
      ['IA hoy', 'Más K, sin evidencia aún de más PTF ni de desempleo masivo'],
      ['Gini', 'Mide la distancia entre la distribución real y la igualdad perfecta; mayor es más desigual'],
      ['Directivos y PTF', '"Ustedes son el TFP": la productividad se gestiona dentro de las empresas'],
    ],
  });

  E.bank.push(
    { topic: 'S1', q: 'México bajó su inflación de niveles muy altos a cerca de 4 %, redujo su déficit y hoy coloca deuda a 30 años, pero no crece. ¿Cuál es la mejor lectura según el curso?', o: ['La estabilización fue un error porque frenó la inversión', 'México ya está en su máximo tecnológico mundial', 'La estabilidad era necesaria pero no suficiente: el faltante está en productividad e incentivos', 'La baja inflación causa por sí misma bajo crecimiento'], a: 2, w: 'Es el encuadre de la Clase 1: se logró lo que se creía que traería crecimiento y no llegó. Con Solow, el problema es A, no estabilidad.' },
    { topic: 'S1', q: 'Un colega dice: "El crecimiento moderno lo causó la tecnología, punto". ¿Cuál es la objeción del profe?', o: ['La tecnología es el vehículo, pero se desarrolla por los incentivos que generan los mercados', 'La tecnología no tuvo ningún papel; todo fue colonización', 'El crecimiento moderno se explica sólo por el aumento de la población', 'La tecnología sólo importa en países con recursos naturales'], a: 0, w: 'Ejemplos de clase: baterías para parques solares y vacuna del COVID. Sin incentivo no hay invento.' },
    { topic: 'S1', q: 'En la trampa de Malthus, ¿qué pasa después de que una innovación sube los salarios?', o: ['Los salarios quedan altos de manera permanente', 'La población cae y los salarios bajan', 'Las empresas sustituyen tierra por capital de inmediato', 'La población aumenta y, por rendimientos decrecientes de la tierra, el salario regresa a subsistencia'], a: 3, w: 'Es la misma concavidad que Solow aplica después al capital. La trampa se rompe cuando población y salario crecen juntos.' },
    { topic: 'S1', q: 'Para Susskind y el profe, ¿qué es lo verdaderamente distintivo de los últimos 200 años?', o: ['Que hubo episodios de riqueza por primera vez en la historia', 'Que el crecimiento se ha mantenido, no sólo que haya ocurrido', 'Que el crecimiento se dio sin costos ambientales', 'Que la desigualdad desapareció'], a: 1, w: 'Las pirámides o las minas dieron auges pasajeros. Lo nuevo es la persistencia, y por eso la pregunta central es cómo sostenerla.' },
    { topic: 'S1', q: 'EUA registra un auge de inversión en centros de datos. Con lo visto en clase, ¿qué se puede afirmar hoy?', o: ['Que la IA ya elevó la tasa de crecimiento de largo plazo', 'Que la IA ya causó desempleo masivo', 'Que hay más K, pero aún no hay evidencia clara de mayor productividad', 'Que la inversión no aporta nada al PIB'], a: 2, w: 'Esa fue la postura del profe. En Solow, K tiene techo; sólo un aumento de A mueve el estado estacionario.' },
    { topic: 'S1', q: 'Tim Cook aparece en clase como ejemplo de la tercera razón para estudiar economía en un MBA porque:', o: ['Inventó el iPhone', 'Rediseñó las cadenas de valor globales para generar margen', 'Cubrió el riesgo cambiario de Apple con derivados', 'Convenció a Trump de eliminar aranceles'], a: 1, w: 'Su aportación fue decidir qué se hace dónde: EUA, China y luego India. Entender flujos comerciales también crea valor.' },
    { topic: 'S1', q: 'Un país gana mucha participación en el comercio mundial. Según la cadena de Smith, el crecimiento debería venir porque:', o: ['Exportar eleva automáticamente el tipo de cambio', 'Los aranceles recaudan más', 'El consumo interno deja de importar', 'Un mercado mayor permite más especialización y eficiencia'], a: 3, w: 'Mayores mercados → especialización → eficiencia → crecimiento. Es una hipótesis: Corea la confirma; México queda a media tabla, y ahí entra la PTF.' },
    { topic: 'S1', q: 'Según el modelo de Solow, ¿por qué invertir más no garantiza crecer para siempre?', o: ['Porque el gobierno termina gravando el capital', 'Porque cada unidad adicional de capital aporta menos y la reposición crece con k, hasta igualar a la inversión', 'Porque la población deja de ahorrar cuando se enriquece', 'Porque los mercados de capital se saturan de deuda'], a: 1, w: 'Rendimientos decrecientes: s·y es cóncava, (δ+n+g)k es recta. Al cruzarse, k por trabajador efectivo deja de crecer.' },
    { topic: 'S1', q: 'Un inversionista compara dos países con el mismo crecimiento de 6 %. En el país X, casi todo proviene de g_K. En el país Y, la mayor parte es PTF. Con Solow, ¿cuál es la mejor conclusión?', o: ['Son equivalentes: 6 % es 6 %', 'X es mejor porque el capital es tangible', 'Y porque su crecimiento no enfrenta el techo de los rendimientos decrecientes', 'X porque invertir siempre eleva la tasa de largo plazo'], a: 2, w: 'La acumulación tiene techo; la productividad es lo único que Solow permite sostener. Es la distinción que pide la guía de la actividad.' },
    { topic: 'S1', q: 'Un país con población decreciente, como Japón, según el modelo básico:', o: ['Cae su PIB por trabajador porque hay menos gente', 'No tiene efecto alguno sobre el estado estacionario', 'Aumenta su tasa de progreso tecnológico de manera automática', 'Tiene más capital por trabajador en el estado estacionario, pero pierde tendencia de PIB total'], a: 3, w: 'Menor n aplana la recta y sube k*. El PIB total crece a n + g, así que con n negativo pierde tendencia. El caso llama ambiguo el efecto completo por los clusters de innovación.' },
    { topic: 'S1', q: '¿Qué significa "convergencia condicional"?', o: ['Los países convergen a su propio estado estacionario según sus fundamentales', 'Todos los países pobres alcanzarán a los ricos', 'Los países convergen sólo si firman tratados de libre comercio', 'Los tipos de cambio convergen a la paridad de poder de compra'], a: 0, w: 'Condicional a s, n, δ y A. Sólo con fundamentales iguales sería absoluta.' },
    { topic: 'S1', q: 'En 2000, China tenía inversión muy alta, capital humano arriba del promedio y PIB per cápita bajo. ¿Por qué eso señalaba potencial, según Warnock y Walsh?', o: ['Porque tenía el mercado bursátil más grande de los emergentes', 'Porque sus fundamentales indicaban un estado estacionario muy por encima de su nivel actual', 'Porque tenía la mayor deuda externa', 'Porque su población crecía más rápido que la de los demás'], a: 1, w: 'Lógica central del caso: comparas fundamentales contra el ingreso actual para inferir la distancia a k*.' },
    { topic: 'S1', q: '¿Para quién importa menos el crecimiento del PIB del país destino, según el caso?', o: ['El inversionista de cartera', 'El exportador que vende en ese país', 'La multinacional con IED vertical que produce para exportar', 'La multinacional con IED horizontal'], a: 2, w: 'La IED vertical busca costos: los bienes se venden en otro lado. La horizontal y el exportador dependen de esa demanda.' },
    { topic: 'S1', q: 'Sharma diría que es mala señal de crecimiento que:', o: ['El país tenga algunos billonarios surgidos de la tecnología', 'Exista una segunda ciudad grande', 'Los precios locales sean bajos para un visitante extranjero', 'La riqueza de los billonarios venga de conexiones políticas, recursos naturales o herencia'], a: 3, w: 'Billonarios "malos": señal de capitalismo de cuates. Los billonarios innovadores son buena señal; segunda ciudad grande y precios bajos también.' },
    { topic: 'S1', q: 'La PTF en la contabilidad del crecimiento es:', o: ['El residuo que queda tras restar las contribuciones del capital y el trabajo', 'El gasto en investigación y desarrollo sobre el PIB', 'El PIB dividido entre el número de trabajadores', 'La tasa de ahorro multiplicada por la productividad marginal'], a: 0, w: 'No se observa: se despeja. Y por eso también recoge eficiencia, instituciones y error de medición.' },
    { topic: 'S1', q: 'La productividad laboral de un país sube fuerte durante un auge de construcción de centros de datos. ¿Qué se puede concluir?', o: ['Que la PTF subió, porque productividad es PTF', 'Nada aún sobre PTF: puede ser más capital por trabajador, y hay que restarlo', 'Que el país alcanzó su estado estacionario', 'Que los rendimientos decrecientes dejaron de aplicar'], a: 1, w: 'g_y = g_A + α·g_k. El profe lo plantea directo: por más centros de datos, llega el punto en que te estancas.' },
    { topic: 'S1', q: 'Según la narrativa de clase, ¿qué explica principalmente la desaceleración de los años 70?', o: ['La entrada de China a la OMC', 'La crisis de 2008', 'El choque petrolero, que elevó inflación y tasas de interés', 'El fin de la Revolución Industrial'], a: 2, w: 'El embargo disparó el crudo → inflación → tasas → EUA se frena. Lo compara con el choque actual por Irán.' },
    { topic: 'S1', q: 'Al preguntar por qué China y México divergieron tras abrirse, el argumento del curso es:', o: ['Que México firmó el TLCAN y China no firmó ningún acuerdo', 'Que China comerció más como porcentaje del PIB', 'Que México nunca recibió inversión', 'Que ambos expandieron su mercado, pero sólo en China la productividad siguió creciendo'], a: 3, w: 'Las dos se abren; México incluso es más abierto. La diferencia es la PTF: México se quedó en productos similares y no subió en la cadena de valor (Kehoe y Xu).' },
    { topic: 'S1', q: 'Solow implica que el capital debería fluir de países ricos a pobres. El hecho de que fluya mucho menos sugiere que:', o: ['A, capital humano, riesgo e instituciones difieren, así que el rendimiento real no es tan alto', 'Los rendimientos decrecientes no existen', 'Los países pobres tienen demasiado ahorro', 'El modelo de Solow es de corto plazo'], a: 0, w: 'Es una pregunta explícita de Rodriguez: el supuesto de tecnología y capacidades iguales no se sostiene.' },
    { topic: 'S1', q: '¿Por qué el descontento con la globalización apareció aun cuando el comercio abarató los productos?', o: ['Porque el comercio cayó a mínimos históricos', 'Porque los beneficios se repartieron de forma desigual: precios bajos, poco visibles, pero salarios estancados y grandes ganancias empresariales', 'Porque los costos de transporte subieron mucho', 'Porque China dejó de exportar'], a: 1, w: 'Es la lectura del profe del Brexit y de Trump. Añade que parte de la pérdida industrial de EUA es de productividad propia, no sólo China.' },
    { topic: 'S1', q: 'Si los pozos de un país se agotan rápido, de modo que hay que reinvertir mucho sólo para reponerlos, como en el ejemplo de Pemex, en Solow esto se parece a:', o: ['Un aumento de g', 'Un aumento de s', 'Un aumento de δ, que baja k* y el nivel de ingreso', 'Una caída de α'], a: 2, w: 'El profe usa los pozos como ejemplo de alta depreciación: la recta se empina y el techo baja.' },
    { topic: 'S1', q: '¿Por qué se usa la función Cobb-Douglas en el caso?', o: ['Porque incluye explícitamente instituciones y capital humano', 'Porque implica rendimientos crecientes en capital', 'Porque elimina la necesidad de medir la productividad', 'Porque combina rendimientos constantes a escala, decrecientes por factor y participaciones estables, con una forma simple'], a: 3, w: 'Con pocos supuestos captura lo esencial. Solow buscó sacar lo más posible con lo menos.' },
    { topic: 'S1', q: 'Un país pobre aumenta su crecimiento porque recibe mucha IED que trae conocimiento. En términos de Solow con economía abierta, eso:', o: ['Sube el ahorro disponible y puede además elevar A por derramas', 'Sólo eleva el consumo presente', 'Baja el estado estacionario', 'No tiene efecto porque Solow prohíbe flujos externos en cualquier versión'], a: 0, w: 'El caso: abrir da acceso a ahorro externo (s) y, con IED, derramas de conocimiento (A). El básico es cerrado, pero el caso lo extiende.' },
    { topic: 'S1', q: 'En el Laboratorio de Solow con g = 0, un solo aumento de A produce:', o: ['Crecimiento permanente mayor', 'Un salto de nivel y una transición que al final se apaga', 'Ninguna variación en k*', 'Caída del ingreso por menor ahorro'], a: 1, w: 'Una mejora de una vez da nivel. Lo que da crecimiento sostenido es que A crezca continuamente (g > 0).' },
    { topic: 'S1', q: 'Un analista afirma: "Etiopía está mucho más lejos de su estado estacionario que México, luego es una apuesta sin riesgo". ¿Cuál es la mejor crítica?', o: ['Solow no tiene nada que decir de países africanos', 'México está siempre más cerca de EUA', 'La distancia indica potencial, pero su inversión depende de ahorro externo y su A e instituciones pueden fallar', 'La distancia no importa en Solow'], a: 2, w: 'Distancia es condición necesaria, no garantía. Penn World Table muestra a Etiopía con inversión muy financiada por el exterior e inflación alta en el Exhibit 4.' },
  );

  E.essays.push(
    {
      topic: 'S1', type: 'caso', prompt: 'México logró estabilidad macroeconómica y, sin embargo, no crece. ¿Por qué no fue suficiente? Responde con las herramientas del curso.',
      tools: ['Solow', 'Contabilidad del crecimiento', 'PTF', 'Incentivos y mercados'],
      outline: ['El hecho: de crisis sexenales a inflación de ≈4 %', 'Qué esperábamos y por qué estabilidad no es motor', 'Diagnóstico con la contabilidad: PTF estancada', 'Causa: incentivos y competencia', 'Implicación y matiz'],
      model: 'Durante décadas, el problema de México parecía evidente: devaluaciones cada sexenio e inflación que llegó a ser muy alta. La hipótesis era que, una vez estabilizada la economía, el país crecería. Se logró lo que parecía imposible: inflación cercana a 4 %, menor déficit público, mercados financieros más profundos y deuda a treinta años. Aun así, México no crece. Mi tesis es que la estabilidad es condición necesaria, pero no es un motor de crecimiento.\nEl modelo de Solow explica por qué. El crecimiento de largo plazo no depende del nivel de inflación, sino de la acumulación en transición y, sobre todo, de la productividad. La estabilidad ayuda porque reduce riesgo y favorece la inversión, pero, aunque suba la inversión, los rendimientos decrecientes imponen un techo. Lo único que sostiene el crecimiento por persona es el aumento de A.\nLa contabilidad del crecimiento apunta justo ahí. Si restamos al crecimiento del PIB las contribuciones del capital y del trabajo, g_A = g_Y − α·g_K − (1−α)·g_L, el residuo de México ha estado estancado. México sí invirtió y se abrió: entró al TLCAN y es incluso más abierto que China. Pero, como documentan Kehoe y Xu, China subió en la cadena de valor y México se quedó en productos similares. Con datos de Penn World Table, el producto por trabajador cae entre 2013 y 2023 aunque el país tiene cierto margen frente a su estado estacionario: no parece problema de falta de capital, sino de productividad.\n¿Por qué no sube A? Aquí entra la primera idea del curso: la tecnología es el vehículo, pero los incentivos son la causa. Donde no hay competencia ni derechos de propiedad claros, no hay razón para invertir e innovar. El profesor señala a Pemex y el sector energético como cuello de botella, y la concentración en banca y telecomunicaciones. Sin empresas nuevas que desbanquen a las viejas, como plantean Aghion y Howitt, no hay destrucción creativa.\nLa implicación es que otra ronda de estabilidad o de inversión, sin más, rendirá poco. La agenda es de competencia, energía e instituciones, y también de empresas: la productividad se gestiona dentro de ellas.\nEl matiz: nadie tiene una receta mecánica, y la estabilidad no fue en vano, porque evitar crisis recurrentes también eleva el bienestar. Pero ya no alcanza.',
    },
    {
      topic: 'S1', type: 'caso', prompt: '"El crecimiento moderno se debe a la tecnología." Evalúa esta afirmación desde Malthus hasta Solow y explica qué papel juegan los mercados.',
      tools: ['Malthus', 'Rendimientos decrecientes', 'Solow', 'Adam Smith', 'Incentivos'],
      outline: ['Tesis: cierta pero incompleta', 'Malthus: la trampa', 'Qué la rompió', 'Solow confirma el papel de A', 'Smith e incentivos; matiz: no hay receta'],
      model: 'La afirmación es correcta pero incompleta. La tecnología es el vehículo del crecimiento moderno, pero no explica por qué apareció ni por qué se ha mantenido. Para eso hay que agregar los incentivos que genera una economía de mercado.\nDurante casi toda la historia, la economía estuvo estancada, y Malthus explicó por qué. Cuando subían los salarios, la gente tenía más hijos; más trabajadores sobre la misma tierra producían cada vez menos, y el salario regresaba a subsistencia. La peste negra lo ilustra: cayó la población, subió el salario y, al recuperarse la población, volvió a bajar. Una innovación sólo daba un respiro. Esa es la idea de los rendimientos decrecientes, la curva cóncava en que descansa buena parte de la economía.\nHace unos doscientos años la trampa se rompió: población y salarios empezaron a crecer juntos. Lo importante es que el crecimiento se ha mantenido, a diferencia de auges pasajeros como el de las minas o las pirámides.\nSolow formaliza por qué esto tuvo que venir de la tecnología. Con Y = A·K^α·L^(1−α) y acumulación ΔK = sY − δK, invertir tiene techo: la reposición termina por igualar a la inversión y el país llega a un estado estacionario. Ahorrar más da un salto de nivel, no crecimiento permanente. Sólo un aumento continuo de A sostiene el crecimiento por persona. La contabilidad del crecimiento lo confirma: en 1999–2005, la mayor parte del crecimiento de China fue productividad, mientras en Latinoamérica casi no aparece.\nPero Solow toma A como dada, y esa es la parte que falta. ¿Por qué se inventa algo? Por incentivos. Adam Smith explicó que, buscando su propio interés, la gente produce para otros, y que mercados mayores permiten más especialización, como en sus clavos. Los ejemplos modernos son claros: el requisito de almacenamiento creó el incentivo para mejorar las baterías, y la carrera por la vacuna del COVID tuvo premios enormes. Instituciones que protegen ese premio, como muestran Acemoglu, Johnson y Robinson, marcan la diferencia entre países.\nEl matiz es doble. Primero, no hay receta mecánica: hay países con tecnología que no crecieron, y el debate sigue abierto, como con la IA, donde hoy se ve más capital pero aún no productividad. Segundo, los mercados también han traído costos: desigualdad y daño ambiental. Concluyo que la tecnología fue la palanca, y los incentivos, la mano que la movió.',
    },
    {
      topic: 'S1', type: 'caso', prompt: 'Warnock y Walsh: usa el modelo de Solow para explicar por qué acertó la llamada BRICs de 2001 y cómo buscarías hoy las próximas economías de alto crecimiento.',
      tools: ['Solow', 'Estado estacionario', 'Convergencia condicional', 'Rendimientos decrecientes', 'PTF'],
      outline: ['Pregunta de Rodrigo y lo que hizo O\'Neill', 'Dos fuentes de crecimiento en Solow: distancia a k* y momentum de A', 'Lectura de cada BRIC en 2000', 'Cómo aplicarlo hoy, sumando a Sharma', 'Matiz: ser pobre no basta; Solow no es todo'],
      model: 'Arturo Rodrigo, inversionista en 2023, debe decidir qué economías crecerán fuerte tras el COVID y la guerra en Ucrania. Vuelve a la llamada de Jim O\'Neill en 2001, que resultó correcta: los BRICs crecieron bastante más que Estados Unidos, Reino Unido y Alemania entre 2001 y 2014. Mi argumento es que la llamada no fue intuición: fue Solow.\nEl modelo combina Y = K^α(AL)^(1−α) con la acumulación ΔK = sY − δK. Como el capital tiene rendimientos decrecientes, la inversión deja de superar la reposición en un punto: el estado estacionario. De ahí salen dos fuentes de crecimiento rápido: estar abajo de ese estado estacionario, o tener productividad creciendo fuerte. La clave es que cada país converge a su propio techo; es convergencia condicional, no absoluta.\nCon esa lente, los datos de 2000 hablaban. China tenía inversión altísima y capital humano arriba del promedio, pero un PIB per cápita menor que países con fundamentales similares o peores: estaba muy abajo de su estado estacionario. India era aún más pobre, con inversión arriba del promedio. Brasil era más pobre que México y Argentina pese a invertir bien. Rusia tenía capital humano muy alto, pero menor ingreso que Polonia. En los cuatro, fundamentales fuertes frente a un ingreso bajo significaban distancia, y la distancia significaba crecimiento.\nHoy haría lo mismo: buscaría países con inversión y ahorro altos respecto a su ingreso, y señales de estar abajo de su techo, como IED, menor servicio de deuda o nuevo acceso a tecnología. Con el Exhibit 3, Vietnam destaca: inversión de 31 % y ahorro de 34 % con ingreso aún bajo. Luego separaría lo más importante para un inversionista: crecimiento por acumulación, que tiene techo, contra momentum de productividad. Sumaría las señales de Sharma, que capturan lo que Solow no ve: billonarios productivos o conectados, tamaño de la segunda ciudad, infraestructura y maldición de recursos.\nEl matiz: ser pobre no basta. México y Sudáfrica son pobres frente a Estados Unidos y no se acercan, porque el problema es la productividad. Además, el PIB no se traduce igual en retornos: importa cuánto llega a empresas listadas y la protección al inversionista. Solow da la pregunta correcta, no toda la respuesta.',
    },
    {
      topic: 'S1', type: 'caso', prompt: 'Warnock y Walsh: un inversionista debe distinguir entre economías que crecen por acumulación de factores y economías con momentum de productividad. Explica la diferencia con Solow y su implicación para la decisión.',
      tools: ['Contabilidad del crecimiento', 'PTF', 'Rendimientos decrecientes', 'Corto vs. largo plazo'],
      outline: ['Tesis: el mismo crecimiento no vale lo mismo', 'Por qué la acumulación tiene techo', 'Cómo medir con contabilidad del crecimiento', 'Aplicación: Vietnam, Rusia, México', 'Límites del residuo y del modelo'],
      model: 'Dos países pueden reportar el mismo 6 % y valer cosas muy distintas para un inversionista. La razón está en el modelo de Solow: importa de dónde viene ese crecimiento.\nLa acumulación es el crecimiento que proviene de sumar capital y trabajo. Tiene techo por rendimientos decrecientes: cada máquina aporta menos, mientras la reposición crece con el capital. Cuando la inversión apenas alcanza para reponer, el país llega a su estado estacionario. Subir la tasa de ahorro mueve ese techo, y da crecimiento adicional un tiempo, pero sólo cambia el nivel de ingreso, no la tasa de largo plazo. El profesor lo planteó con los centros de datos: ayudan, pero llega el punto en que te estancas. La productividad, en cambio, mueve la curva completa: como dice Solow, es la única fuente de crecimiento sostenido por persona.\nPara distinguirlas uso la contabilidad del crecimiento: g_Y = g_A + α·g_K + (1−α)·g_L. Mido producto, capital y trabajo, y lo que queda es la PTF. Las láminas muestran el contraste: en 1999–2005, China combinó capital fuerte con una PTF mayor, mientras en Latinoamérica casi todo fue factores y la PTF prácticamente no aparece.\nAplicado a la decisión: Vietnam combina distancia al estado estacionario, inversión y ahorro altos, y producto por trabajador creciendo con fuerza. Es el perfil más atractivo, aunque habría que confirmar cuánto es PTF. Rusia es el caso contrario: mucho ahorro y mucho capital ya acumulado, con razón capital-producto por encima de la de estado estacionario según nuestro análisis; más inversión rinde poco. México muestra otra cosa: tiene cierto margen, pero el producto por trabajador cae. Su problema no es falta de capital sino de productividad, y por eso concentración, energía e instituciones importan más que otra ronda de inversión.\nComo inversionista, pagaría más por productividad y trataría la acumulación como una historia con fecha de vencimiento: sirve para un horizonte de pocos años, sobre todo si hay mucha distancia, pero debo preguntar qué queda cuando se agote.\nEl matiz es de medición: la PTF es un residuo e incluye eficiencia, instituciones y error. Además, Solow la toma como dada; las señales de Sharma ayudan a juzgar si ese momentum es creíble.',
    },
    {
      topic: 'S1', type: 'caso', prompt: 'Rodriguez, A Note on Long-Run Models of Economic Growth: ¿qué predice Solow sobre el flujo de capital y la convergencia entre países ricos y pobres, y por qué la realidad no siempre coincide?',
      tools: ['Solow', 'Convergencia absoluta y condicional', 'Rendimientos decrecientes', 'Tecnología exógena'],
      outline: ['Supuestos del modelo', 'Las dos predicciones: flujo de capital y convergencia', 'Qué no encaja con los datos', 'Tres razones: A, capital humano, instituciones', 'Qué se conserva del modelo'],
      model: 'La nota de Rodriguez construye el modelo de Solow para responder la pregunta de Robert Lucas: por qué algunos países crecen durante décadas y otros no. Sus supuestos son fuertes: economía cerrada, rendimientos constantes a escala, decrecientes en capital y tecnología exógena, igual para todos.\nDe ahí salen dos predicciones poderosas. Primera: como el capital tiene rendimientos decrecientes, su retorno debe ser mayor donde es escaso, de modo que los inversionistas deberían mandarlo de países ricos a pobres. Segunda: entre más abajo esté un país de su estado estacionario, más rápido crece; si todos tienen la misma tecnología y parámetros, todos deberían llegar al mismo nivel e igualar sus ingresos. Es convergencia absoluta.\nLa propia nota pregunta si esto coincide con los datos, y la respuesta es que sólo en parte. El capital fluye mucho menos de lo que predice hacia los países pobres, y, como vimos en el curso, los emergentes han llegado a financiar a Estados Unidos. Tampoco hay convergencia general: algunos países, como China o India, se acercaron, mientras otros, como Bolivia, Camerún o Haití, quedaron estancados o peor durante una generación.\nEl problema está en los supuestos, no en la lógica. Primero, la tecnología no es igual en todos lados: si A es menor en un país pobre, el retorno real de su capital no es tan alto como sugiere su escasez, y su estado estacionario es más bajo. Segundo, los trabajadores no tienen las mismas capacidades: el capital humano multiplica lo que rinde una máquina. Tercero, las instituciones: los Nobel de 2024 explican que las instituciones extractivas desalientan la inversión y que el riesgo político reduce el retorno esperado.\nEso nos lleva a la convergencia condicional, la versión que sí se sostiene: cada país converge a su propio estado estacionario, según su ahorro, población, depreciación y productividad. Un país pobre con ahorro bajo o A baja puede estar ya cerca de su techo.\nNo descartaría el modelo. Su conclusión central sigue viva: el ahorro no tiene efecto permanente sobre la tasa de crecimiento y sólo el progreso tecnológico sostiene el nivel de vida. Lo que Solow no dice es de dónde viene ese progreso. Por eso, para un país como México, la pregunta útil no es cuánto invertir, sino qué frena su productividad.',
    },
    {
      topic: 'S1', type: 'caso', prompt: 'Cuenta la narrativa del crecimiento global desde la posguerra hasta hoy. ¿Cuáles fueron las principales razones de la aceleración y del posterior estancamiento?',
      tools: ['Solow', 'PTF', 'Rendimientos decrecientes', 'Adam Smith: tamaño del mercado'],
      outline: ['Posguerra: reconstrucción y comercio', '70s: choque petrolero', 'Globalización y China: mercado + convergencia', 'Descontento y choques', 'IA: acumulación o PTF'],
      model: 'La historia del crecimiento desde 1945 se entiende con dos ideas del curso: el modelo de Solow, donde acumular tiene techo y sólo la productividad lo mueve, y la idea de Adam Smith de que un mercado más grande permite más especialización.\nLa posguerra fue una aceleración por tres razones que se refuerzan. Europa y Japón habían perdido capital por la guerra, sin perder conocimientos ni instituciones: en Solow, estaban muy abajo de su estado estacionario, y por eso crecieron muy rápido. Además, inició una segunda globalización bajo dominio de Estados Unidos, y los contenedores redujeron drásticamente el costo de transporte. Más mercado, más incentivos, más especialización.\nEl primer freno llegó en los setenta. El embargo petrolero disparó el precio del crudo; subió la inflación, luego las tasas de interés, y Estados Unidos se estancó. Era la primera señal seria de que el motor de posguerra se agotaba: la convergencia de la reconstrucción tenía que terminar, como predice Solow.\nLa economía se recuperó, y entre los noventa y 2008 vino la hiperglobalización. La Unión Soviética cayó porque no pudo competir en productividad y China se integró hasta entrar a la OMC. China combinó enorme distancia a su estado estacionario, ahorro altísimo y productividad creciente; con la convergencia, sus salarios subieron y dejó de ser tan barata.\nDespués vino el desgaste. La crisis financiera de 2008 y el COVID fueron dos choques globales de los que la economía no se termina de recuperar. La productividad de la OCDE ya venía cayendo desde mediados de los 2000, de alrededor de 2 % a 1 %. Y como las ganancias de la globalización se repartieron mal, con productos baratos pero salarios estancados en países ricos, surgieron Brexit, Trump y el proteccionismo. Encima, las poblaciones envejecen: menos n resta tendencia al PIB total.\nHoy, la gran pregunta es la inteligencia artificial. Si es sobre todo inversión en centros de datos, es acumulación y tiene techo; el FMI y la OCDE la ven sostener el crecimiento actual, pero eso es demanda de corto plazo. Sólo será respuesta real si sube la PTF. En síntesis: aceleramos por reconstrucción, comercio y convergencia, y nos estancamos porque esas fuentes se agotaron y la productividad no las reemplazó. Mi matiz: la evidencia sobre IA aún no permite afirmarlo en ningún sentido.',
    },
    {
      topic: 'S1', type: 'noticia', prompt: 'El FMI (octubre 2026) proyecta crecimiento global de 3.1 % en 2026 y 3.4 % en 2027, y atribuye buena parte de la resistencia a la inversión en IA. Interpreta con las herramientas del curso.',
      tools: ['Solow', 'Acumulación vs. PTF', 'Contabilidad del crecimiento', 'Convergencia condicional'],
      outline: ['El hecho', 'IA hoy es K: demanda y acumulación', 'Cuándo sería A', 'Concentración y convergencia condicional', 'México; matiz: corrección de valuaciones'],
      model: 'El FMI proyectó en octubre que el mundo crecerá 3.1 % en 2026 y 3.4 % en 2027, y Georgieva señaló la inversión en infraestructura de IA como factor clave para que el crecimiento se mantenga cerca de 3 %, a pesar del choque de energía de Medio Oriente. Parece una buena noticia para el largo plazo, pero con el modelo de Solow hay que separar dos cosas.\nPrimero, lo que está ocurriendo hoy es sobre todo acumulación. Construir centros de datos sube la inversión y el capital, y eso aumenta el PIB por dos vías: como demanda ahora y como mayor capital después. Pero el capital tiene rendimientos decrecientes. Como dijo el profesor, por más centros de datos que construyas, llega un punto en que la obsolescencia alcanza a la inversión y te estancas. Si la IA fuera sólo esto, sería un empujón temporal, no un cambio de tendencia.\nSegundo, la pregunta importante es si la IA sube A. Con la contabilidad del crecimiento, g_Y = g_A + α·g_K + (1−α)·g_L, el aporte de la IA sólo será duradero si aparece en el residuo: hacer más con el mismo capital y trabajo. El FMI aún no puede decirlo: su pronóstico a dos años es esencialmente ciclo.\nEl otro dato relevante es la concentración. Según lo reportado, sólo 32 países explican 95 % del crecimiento global, frente a 54 en abril, y los ganadores son quienes construyen plataformas de IA o proveen hardware. Eso es convergencia condicional, no automática: los emergentes crecen más en promedio, 3.7 % frente a 2.1 % de los avanzados en 2026, pero cada país se acerca a su propio techo, y si no accede a la tecnología su techo no se mueve.\nPara México, aparecer como proveedor de hardware es positivo: más inversión y exportaciones. Pero la lección México-China del curso es clara: exportar no basta si la productividad sigue estancada.\nEl matiz es el riesgo: una corrección en las valuaciones de IA restaría crecimiento según el propio FMI. Mi lectura es que el dato confirma resiliencia de corto plazo, no que el estancamiento de la productividad haya terminado.',
    },
    {
      topic: 'S1', type: 'noticia', prompt: 'China creció 4.5 % en el tercer trimestre de 2026, mientras la inversión fija cayó 7.2 % en el acumulado del año y la inmobiliaria 20.6 %. ¿Cómo lo interpretas con las herramientas del curso?',
      tools: ['Solow', 'Rendimientos decrecientes', 'Contabilidad del crecimiento', 'S − I = CA'],
      outline: ['El hecho', 'Rendimientos decrecientes y techo', 'Qué falta: L y PTF', 'Conexión externa S − I', 'Implicación y matiz'],
      model: 'China reportó un crecimiento de 4.5 % en el tercer trimestre de 2026, y 4.6 % en los primeros tres trimestres, por debajo del 5 % del primero. Lo llamativo no es la cifra, sino su composición: la inversión en activos fijos cayó 7.2 % en el acumulado, y la inmobiliaria 20.6 %, mientras que las exportaciones crecieron con fuerza. Lo interpreto como un país que se acerca a los límites de su modelo de acumulación.\nCon Solow, China es el ejemplo clásico del ahorro. Con una tasa de inversión de alrededor de 40 % del PIB, según el Exhibit 3 del caso de Warnock y Walsh, acumuló capital a una velocidad sin precedentes, y estuvo durante décadas muy abajo de su estado estacionario. Pero el profesor lo dejó claro: China creció muy rápido, y el modelo dice que en algún punto esa velocidad se tiene que apagar. Los rendimientos decrecientes aplican a todos: el exceso de vivienda es rendimiento decreciente visible, porque construir un edificio más ya no aporta.\nCon la contabilidad del crecimiento, g_Y = g_A + α·g_K + (1−α)·g_L, el problema es evidente. Si K aporta menos y la población laboral deja de crecer, el crecimiento queda en manos del residuo, la PTF. China ha mostrado capacidad ahí: Kehoe y Xu documentan que subió en la cadena de valor, a diferencia de México, y la inversión en sectores de frontera está creciendo. Esa es la apuesta: compensar con productividad lo que ya no da la acumulación.\nEl dato de exportaciones conecta con el tema de desequilibrios. Si la inversión cae y el consumo sigue débil, el ahorro excedente debe ir a alguna parte. Por la identidad S − I = CA, sale como exportaciones netas, lo que alimenta las tensiones comerciales con Estados Unidos y Europa.\nPara México, un cliente débil y una China que exporta más significan mayor competencia, aunque el salario chino ya convergió y eso protege algo de su competitividad.\nEl matiz: un dato trimestral es ciclo, y Solow habla de tendencia. Lo que necesitaría ver es PTF, no otro trimestre de exportaciones.',
    },
    {
      topic: 'S1', type: 'noticia', prompt: 'La productividad laboral de EUA subió 1.4 % en el 2T-2026 con horas casi planas, lo que reabrió el debate sobre la IA. ¿Qué concluyes con la contabilidad del crecimiento y Solow?',
      tools: ['Contabilidad del crecimiento', 'PTF', 'Solow', 'Productividad laboral vs. PTF'],
      outline: ['El hecho', 'g_y = g_A + α·g_k', 'Qué tendría que pasar para que sea PTF', 'Por qué importa: pendiente', 'Matiz: un trimestre, medición'],
      model: 'El Bureau of Labor Statistics estimó, de forma preliminar, que la productividad laboral del sector no agrícola de EUA subió 1.4 % en el segundo trimestre de 2026, con producto de 1.7 % y horas de sólo 0.3 %. Indeed Hiring Lab nota que esa brecha lleva unos dos años y podría ser un cambio estructural, quizá con efectos iniciales de la IA. Con las herramientas del curso, no es tan rápido.\nLa clave es que productividad laboral no es lo mismo que productividad total de los factores. En tasas, g_y = g_A + α·g_k. El producto por hora puede subir por dos motivos muy distintos: porque cada trabajador tiene más capital, o porque todo el sistema es más eficiente. Y justamente vivimos un auge de inversión en centros de datos. Sin restar la contribución del capital, no se puede atribuir ese dato a la tecnología.\nLa diferencia tiene consecuencias. Si es capital, en Solow es acumulación: tiene rendimientos decrecientes y un techo, y en este caso una depreciación alta porque el equipo se vuelve obsoleto rápido. Da un periodo de buen crecimiento y luego se apaga. Si es PTF, se mueve el techo y cambia la pendiente de largo plazo, lo que el profesor llama el holy grail: la tecnología es lo único que nos saca del estancamiento. Y por el poder del interés compuesto, la lámina del curso muestra que pasar de 1 % a 2 % anual en cincuenta años hace la diferencia entre 49 mil y 81 mil dólares de ingreso per cápita, partiendo de 30 mil.\nEl contexto también importa: la productividad de la OCDE había caído de alrededor de 2 % a 1 % desde mediados de los 2000, y el curso identifica ese estancamiento como el problema central.\nPara empresas y países, la implicación es esperar a la adopción, no a la inversión.\nEl matiz: es un trimestre y una cifra preliminar, sujeta a revisión, y los mismos economistas encuestados por Indeed esperan en su mayoría un efecto de modesto a moderado. Mi conclusión: dato alentador, pero todavía no es evidencia de un cambio en el estado estacionario.',
    },
    {
      topic: 'S1', type: 'noticia', prompt: 'Un estudio del NBER (Acemoglu, Autor, Beirne y Scott, 2026) encuentra que menor natalidad se asocia con mayor PIB por trabajador, sin efecto significativo en el PIB agregado. ¿Contradice o confirma lo que aprendiste? ¿Qué implica para el envejecimiento?',
      tools: ['Solow: efecto de n', 'PTF', 'Crecimiento por trabajador vs. total', 'Dependencia'],
      outline: ['El hecho', 'Solow básico: menos n, más k por trabajador', 'Lo que añade: A reacciona', 'Ambigüedad en el caso', 'México y emergentes; matiz'],
      model: 'El NBER publicó en 2026 un estudio de Acemoglu, Autor, Beirne y Scott: los países con menor natalidad tienen mayor PIB por trabajador décadas después, sin relación significativa con el PIB agregado. Además, esa menor natalidad se vincula con más patentes en automatización y más productividad total de los factores. Choca con el titular habitual de que envejecer frena el crecimiento, así que conviene leerlo con Solow.\nEn parte lo confirma. En Solow, menor crecimiento de la población aplana la recta de reposición, (δ+n+g)k: hay menos trabajadores nuevos a quienes equipar, así que sube el capital por trabajador y sube y*. Al mismo tiempo, el PIB total crece a n + g, por lo que un n menor resta tendencia. Eso es lo que el profesor planteó con Japón: menos gente, menos economía total. Ambos efectos están presentes en el resultado, aunque el estudio señala que la ganancia por trabajador alcanzó para compensar la caída de población.\nEn parte va más allá. En Solow básico, g es exógena y no responde a la demografía. Aquí la escasez de trabajadores parece empujar la innovación que ahorra trabajo: las empresas automatizan cuando la mano de obra escasea. Si es causal, la PTF reacciona y se mueve el techo. Esto encaja con Warnock y Walsh, que llaman ambiguo al efecto de la población: mecánicamente reduce el ingreso por persona, pero puede estimular la productividad.\nHay que tener cuidado con dos cosas. El indicador es por trabajador, no por persona. Si hay más jubilados por trabajador, el ingreso por habitante y las finanzas públicas sufren: pensiones y salud, el tema S3. La lámina de The Economist del curso advierte exactamente esa cuenta fiscal. Y una correlación entre países, con décadas de distancia, no garantiza que se repita.\nPara México la lectura es incómoda. Latinoamérica ha crecido sobre todo sumando trabajadores, con PTF estancada. Conforme se agote ese bono demográfico, el crecimiento dependerá de la PTF, y ahí no hay evidencia a favor.\nMi conclusión: no es que envejecer sea bueno, sino que su efecto depende de si la economía reacciona con productividad. La demografía no es destino, pero sí acaba con la excusa de crecer por acumular gente.',
    },
  );
})();
