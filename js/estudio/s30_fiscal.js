// S3 — Política fiscal: multiplicador keynesiano, dinámica de la deuda (r − g, balance primario), sostenibilidad.
// Fuentes: clase 19-oct-2026, clase 21-oct-2026 (monetización), Lecture 3, Murphy (UVA) y Roscini & Schlefer (HBS).
(function () {
  const F = E.fmt;
  const pp = (v, d = 1) => F.n(v * 100, d) + '%';        // 0.055 -> 5.5%
  const pts = (v, d = 1) => F.sgn(v * 100, d) + ' pts';  // 0.012 -> +1.2 pts

  // ---------------------------------------------------------------- noticias (verificadas el 2-nov-2026)
  const NEWS = [
    { topic: 'S3', date: '2026-10-23', title: 'Moody\'s deja a Francia en Aa3 con perspectiva negativa; el mercado esperaba un recorte', source: 'Il Sole 24 Ore', url: 'https://en.ilsole24ore.com/art/moody-s-mantiene-rating-sovrano-francia-ad-aa3-prospettiva-negativa-AJkbvEtB', tool: 'Sostenibilidad: balance primario estabilizador y economía política del ajuste', read: 'La calificación descansa en un supuesto: que pase un presupuesto 2027 que reduzca el déficit. Con r − g apretándose, Francia necesita mejorar su balance primario, pero ese ajuste es justo lo que sacó gente a la calle: es el dilema de bonos contra barricadas de la lecture. El riesgo no es la aritmética, sino si la política deja ejecutarla.' },
    { topic: 'S3', date: '2026-10-13', title: 'FMI (WEO de octubre): la política fiscal debe ser restrictiva y reconstruir márgenes', source: 'Devdiscourse / ANI', url: 'https://www.devdiscourse.com/article/business/3991261-imf-sounds-alarm-on-mounting-fiscal-strains-as-major-economies-grapple-with-high-debt', tool: 'Dinámica de la deuda; espacio fiscal', read: 'El FMI advierte que deuda alta y costos de financiamiento más altos limitan la respuesta al próximo choque. En la fórmula: r sube, g no acompaña y crece el balance primario que hace falta. Sin espacio fiscal, el multiplicador deja de ser útil porque ya no puedes usarlo cuando llega la recesión.' },
    { topic: 'S3', date: '2026-10-08', title: 'EUA cierra el año fiscal 2026 con déficit de ≈$2 billones (6.2% del PIB) e intereses 11% más altos', source: 'American Action Forum (con datos de CBO)', url: 'https://www.americanactionforum.org/insight/cbo-fy-2026-budget-deficit-totaled-2-trillion/', tool: 'Déficit primario vs intereses; identidad S − I = (G − T) + (X − M)', read: 'Sin recesión, EUA corre un déficit de tamaño de crisis: es estructural, no contracíclico. Los intereses suben porque hay más deuda y tasas largas más altas, o sea que la bola de nieve ya pesa. Además, los aranceles recaudaron menos por las devoluciones ordenadas tras el fallo de la Suprema Corte; ni antes ni ahora arreglaban el déficit gemelo.' },
    { topic: 'S3', date: '2026-09-09', title: 'Paquete 2027: RFSP de 4.1% a 3.9% del PIB, menos ambicioso que el 3.5% de abril; deuda en 55% del PIB', source: 'IMCO', url: 'https://imco.org.mx/wp-content/uploads/2026/09/IMCO_Paquete-economico-2027.pdf', tool: 'Sostenibilidad: r > g, balance primario, rigideces', read: 'Con la tasa supuesta en el Paquete, cercana a 6%, inflación de 3% y crecimiento cercano a 2%, México tiene r ≈ 3% contra g ≈ 2%: r > g, así que necesita un superávit primario de alrededor de 0.5% del PIB sólo para no subir su deuda de 55%. Casi la mitad del gasto ya está comprometida en pensiones, costo financiero y participaciones, por eso la consolidación se pospone.' },
    { topic: 'S3', date: '2026-09-09', title: 'Hacienda baja el apoyo a Pemex a 81.1 mil mdp en 2027 y lo condiciona a mejorar su balance', source: 'N+', url: 'https://www.nmas.com.mx/economia/hacienda-superavit-de-95-mil-millones-de-pesos-en-pemex-2027-reducir-deuda/', tool: 'Pasivos contingentes de empresas públicas; perímetro de la deuda', read: 'El superávit proyectado de Pemex (95.1 mil mdp) depende de esa transferencia: sin ella serían 14 mil mdp. Es el pasivo contingente de una empresa estatal que el FMI y el profe señalan: aunque la deuda no esté en la cuenta federal, las calificadoras la miran porque al final la respalda el soberano.' },
  ];
  E.news.push(...NEWS);

  // ---------------------------------------------------------------- ilustraciones
  const svgCruz = `<svg class="ill" viewBox="0 0 440 340" role="img" aria-label="Cruz keynesiana: al subir el gasto, la demanda agregada sube y el equilibrio se mueve más que el aumento del gasto">
    <line x1="50" y1="300" x2="50" y2="14" class="ln"/><line x1="50" y1="300" x2="400" y2="300" class="ln"/>
    <text x="16" y="24" font-size="13" class="t2">DA</text><text x="384" y="324" font-size="13" class="t2">Y</text>
    <line x1="50" y1="300" x2="340" y2="10" class="lnm dash"/><text x="300" y="26" font-size="12" class="tm" text-anchor="end">45°: oferta = demanda</text>
    <line x1="50" y1="230" x2="350" y2="50" class="ln s1" stroke-width="3"/><text x="356" y="56" font-size="13" font-weight="700">DA₀</text>
    <line x1="50" y1="210" x2="350" y2="30" class="ln s2" stroke-width="3"/><text x="356" y="36" font-size="13" font-weight="700">DA₁</text>
    <line x1="225" y1="125" x2="225" y2="300" class="lnm dash"/><line x1="275" y1="75" x2="275" y2="300" class="lnm dash"/>
    <circle cx="225" cy="125" r="6" class="f1"/><circle cx="275" cy="75" r="6" class="f2"/>
    <text x="225" y="318" font-size="13" text-anchor="middle">Y₀</text><text x="275" y="318" font-size="13" text-anchor="middle">Y₁</text>
    <line x1="225" y1="334" x2="275" y2="334" class="ln s2"/><text x="284" y="338" font-size="12" font-weight="700">ΔY grande</text>
    <line x1="50" y1="230" x2="50" y2="210" class="ln s2" stroke-width="5"/><text x="58" y="206" font-size="12" font-weight="700">ΔG chico</text>
    <text x="58" y="246" font-size="12" class="t2">C₀ + I₀ + G₀</text>
  </svg>`;

  const pasos = [['Gobierno', 'contrata obra', 1], ['Obreros', 'compran coche', 0.8], ['Vendedor', 'va a los tacos', 0.64], ['Taquero', 'gasta el 80%', 0.512]];
  const svgRondas = `<svg class="ill" viewBox="0 0 560 250" role="img" aria-label="Rondas del multiplicador: 1, 0.80, 0.64, 0.51 y así hasta sumar 5">
    ${pasos.map((p, i) => { const x = 16 + i * 104, h = 130 * p[2]; return `<rect x="${x}" y="${170 - h}" width="76" height="${h}" rx="6" class="f${i + 1}"/><text x="${x + 38}" y="${160}" text-anchor="middle" class="tw" font-size="16" font-weight="700">${p[2] === 0.512 ? '0.51' : p[2] === 1 ? '1.00' : F.n(p[2], 2)}</text><text x="${x + 38}" y="192" text-anchor="middle" font-size="13" font-weight="700">${p[0]}</text><text x="${x + 38}" y="208" text-anchor="middle" font-size="11" class="tm">${p[1]}</text>${i < 3 ? `<path d="M${x + 80} 150 h18" class="ln anim-flow"/>` : ''}`; }).join('')}
    <text x="440" y="96" font-size="24" font-weight="700">… = 5.00</text>
    <text x="440" y="118" font-size="12" class="t2">1 + 0.8 + 0.8² + …</text><text x="440" y="136" font-size="12" class="t2">= 1 ÷ (1 − 0.8)</text>
    <text x="16" y="236" font-size="12" class="tm">Cada ronda es 80% de la anterior; lo que se ahorra (20%) es la fuga que hace que la suma converja.</text>
  </svg>`;

  const svgTina = `<svg class="ill" viewBox="0 0 600 300" role="img" aria-label="La deuda como bola de nieve: entran intereses y déficit primario; el crecimiento agranda la economía y baja la razón">
    <rect x="200" y="96" width="200" height="150" rx="10" class="bd"/>
    <rect x="206" y="150" width="188" height="90" rx="6" class="w1"/>
    <text x="300" y="192" text-anchor="middle" font-size="16" font-weight="700">Deuda / PIB</text><text x="300" y="212" text-anchor="middle" font-size="13" class="t2">d</text>
    <rect x="10" y="20" width="170" height="58" rx="8" class="f3"/><text x="95" y="44" text-anchor="middle" class="tw" font-size="14" font-weight="700">Intereses: r · d</text><text x="95" y="63" text-anchor="middle" class="tw" font-size="12">lo que ya debes te cobra</text>
    <rect x="420" y="20" width="170" height="58" rx="8" class="f4"/><text x="505" y="44" text-anchor="middle" class="tw" font-size="14" font-weight="700">Déficit primario</text><text x="505" y="63" text-anchor="middle" class="tw" font-size="12">lo que sigues gastando de más</text>
    <path d="M95 78 V110 H250 V146" class="ln anim-flow"/><path d="M505 78 V110 H350 V146" class="ln anim-flow"/>
    <path d="M196 262 H404" class="ln sgood" stroke-width="3"/><path d="M196 262 l10 -6 M196 262 l10 6 M404 262 l-10 -6 M404 262 l-10 6" class="ln sgood" stroke-width="3"/>
    <text x="300" y="284" text-anchor="middle" font-size="14" font-weight="700">Crecimiento g: agranda la economía y diluye d</text>
    <text x="30" y="150" font-size="13" font-weight="700">Superávit primario</text><text x="30" y="168" font-size="12" class="t2">es lo único que saca</text><text x="30" y="184" font-size="12" class="t2">agua directamente</text>
    <path d="M150 176 H196" class="ln sgood" stroke-width="2"/>
  </svg>`;

  const box = (x, y, w, h, cls, t1, t2) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="${cls}"/><text x="${x + w / 2}" y="${y + (t2 ? h / 2 - 3 : h / 2 + 5)}" text-anchor="middle" class="tw" font-size="13" font-weight="700">${t1}</text>${t2 ? `<text x="${x + w / 2}" y="${y + h / 2 + 15}" text-anchor="middle" class="tw" font-size="11">${t2}</text>` : ''}`;
  const svgRuta = `<svg class="ill" viewBox="0 0 620 230" role="img" aria-label="Quién financia el déficit: bonos con el mercado o impresión del banco central, cada ruta con su costo">
    ${box(10, 90, 130, 56, 'f1', 'Déficit', '¿quién lo paga?')}
    ${box(200, 22, 170, 56, 'f2', 'Bonos al mercado', 'deuda sube')}
    ${box(200, 158, 170, 56, 'f3', 'Banco central', 'imprime / monetiza')}
    ${box(430, 22, 180, 56, 'f4', 'Vigilantes de bonos', 'piden más r: bola de nieve')}
    ${box(430, 158, 180, 56, 'f5', 'Inflación', 'Argentina; México en los 80')}
    <path d="M140 110 L200 56" class="ln"/><path d="M140 126 L200 182" class="ln"/><path d="M370 50 H430" class="ln anim-flow"/><path d="M370 186 H430" class="ln anim-flow"/>
    <path d="M285 78 V158" class="ln dash"/><text x="296" y="114" font-size="12" font-weight="700">si nadie compra</text><text x="296" y="130" font-size="12" class="t2">se salta a imprimir</text>
  </svg>`;

  // ---------------------------------------------------------------- laboratorio 1: cruz keynesiana
  function labCruz(root) {
    const base = { C0: 50, c: 0.8, I: 60, G: 70, T: 0, m: 0 };
    const eq = (s) => (s.C0 - s.c * s.T + s.I + s.G) / (1 - s.c + s.m);
    const da = (s, Y) => s.C0 + s.c * (Y - s.T) + s.I + s.G - s.m * Y;
    let st = { ...base };
    const elK = root.querySelector('#fxK'), elT = root.querySelector('#fxT'), elR = root.querySelector('#fxR');
    const chart = E.chart(root.querySelector('#fxC1'), (T) => {
      const Ys = eq(st), Y0 = eq(base), top = Math.max(1200, Ys * 1.25), f = (s) => [[0, da(s, 0)], [top, da(s, top)]];
      return { ...E.baseOpt(T), tooltip: { trigger: 'item', backgroundColor: T.card, borderColor: T.line, textStyle: { color: T.ink, fontSize: 13 }, formatter: (p) => Array.isArray(p.value) ? `${p.seriesName}<br>Y = ${F.n(p.value[0], 0)} · DA = ${F.n(p.value[1], 0)}` : p.seriesName },
        grid: { left: 8, right: 22, top: 62, bottom: 26, containLabel: true },
        xAxis: E.axisVal(T, (v) => F.n(v), { min: 0, max: Math.round(top), name: 'Y (producción)', nameLocation: 'middle', nameGap: 24, nameTextStyle: { color: T.muted } }),
        yAxis: E.axisVal(T, (v) => F.n(v), { min: 0, max: Math.round(top) }),
        series: [
          { name: '45° (Y = DA)', type: 'line', symbol: 'none', data: [[0, 0], [top, top]], lineStyle: { color: T.muted, type: 'dashed', width: 1.5 }, itemStyle: { color: T.muted } },
          { name: 'DA del ejemplo del profe', type: 'line', symbol: 'none', data: f(base), lineStyle: { color: T.c3, type: 'dotted', width: 2 }, itemStyle: { color: T.c3 } },
          { name: 'DA actual', type: 'line', symbol: 'none', data: f(st), lineStyle: { color: T.c1, width: 3 }, itemStyle: { color: T.c1 } },
          { name: 'Equilibrio', type: 'scatter', symbolSize: 13, data: [[Ys, Ys]], itemStyle: { color: T.c2 }, label: { show: true, position: 'left', color: T.ink, fontWeight: 700, formatter: () => 'Y* = ' + F.n(Ys, 0) }, markLine: { silent: true, symbol: 'none', label: { show: false }, lineStyle: { color: T.c2, type: 'dashed' }, data: [[{ coord: [Ys, 0] }, { coord: [Ys, Ys] }]] } },
          { name: 'Equilibrio base', type: 'scatter', symbolSize: 8, data: Math.abs(Ys - Y0) > 0.5 ? [[Y0, Y0]] : [], itemStyle: { color: T.c3 } },
        ] };
    });
    const rondas = E.chart(root.querySelector('#fxC2'), (T) => {
      const a = st.c - st.m, n = 14, ronda = [], acum = []; let s = 0;
      for (let i = 0; i < n; i++) { const v = Math.pow(a, i); s += v; ronda.push(+v.toFixed(3)); acum.push(+s.toFixed(3)); }
      return { ...E.baseOpt(T), xAxis: E.axisCat(ronda.map((_, i) => String(i + 1)), T, { name: 'ronda', nameLocation: 'middle', nameGap: 22, nameTextStyle: { color: T.muted } }), grid: { left: 8, right: 16, top: 34, bottom: 26, containLabel: true }, yAxis: E.axisVal(T, (v) => F.n(v, 1)),
        series: [{ name: 'Gasto de esa ronda', type: 'bar', data: ronda, itemStyle: { color: T.c1, borderRadius: [4, 4, 0, 0] } }, { name: 'Acumulado por cada $1', type: 'line', data: acum, smooth: true, symbolSize: 5, lineStyle: { color: T.c2, width: 3 }, itemStyle: { color: T.c2 } }] };
    });
    const draw = () => {
      const Y = eq(st), Y0 = eq(base), kS = 1 / (1 - st.c), k = 1 / (1 - st.c + st.m), kT = -st.c * k;
      E.tiles(elT, [
        { label: 'Y de equilibrio', v: Y, fmt: 'n', dec: 0, base: Y0, better: 'up', hl: true },
        { label: 'Multiplicador simple 1/(1−c)', v: kS, fmt: 'n', dec: 2, note: 'el de la lámina' },
        { label: 'Multiplicador con importaciones', v: k, fmt: 'n', dec: 2, note: '1/(1−c+m)' },
        { label: 'Multiplicador de impuestos', v: kT, fmt: 'n', dec: 2, note: '−c/(1−c+m)' },
        { label: 'Consumo en equilibrio', v: st.C0 + st.c * (Y - st.T), fmt: 'n', dec: 0 },
      ]);
      const dG = st.G - base.G, dI = st.I - base.I, dY = Y - Y0, msgs = [];
      msgs.push(`Con <b>c = ${F.n(st.c, 2)}</b>, de cada peso adicional se gastan ${F.n(st.c * 100, 0)} centavos${st.m > 0 ? `, pero ${F.n(st.m * 100, 0)} se van a bienes importados` : ''}. Cada $1 de gasto autónomo termina en <b>$${F.n(k, 2)}</b> de producción, y la economía se asienta en <b>Y = ${F.n(Y, 0)}</b>.`);
      if (Math.abs(dY) > 0.5) msgs.push(`Frente al ejemplo del profe (Y = ${F.n(Y0, 0)}), la producción ${dY > 0 ? 'sube' : 'baja'} <b>${F.n(Math.abs(dY), 0)}</b>.`);
      if (dG !== 0 && dI === 0 && st.C0 === base.C0 && st.T === base.T && st.c === base.c && st.m === base.m) msgs.push(`Moviste G en ${F.sgn(dG)}: el efecto total es ${F.n(k, 1)} veces más grande porque el ingreso de uno es el gasto del otro.`);
      if (st.c <= 0.4) msgs.push('Es el problema de los cheques del COVID: si la gente ahorra el dinero, la propensión a consumir cae y la cadena se apaga en pocas rondas.');
      if (st.m >= 0.15) msgs.push('Economía abierta: parte del estímulo se fuga al exterior y genera empleo en otro país; por eso el multiplicador de un país muy abierto es menor.');
      if (st.T > 0) msgs.push(`Los impuestos pegan <b>menos</b> que el gasto: bajan el ingreso disponible y la gente absorbe parte recortando ahorro. Por eso el multiplicador de impuestos (${F.n(kT, 2)}) es menor en valor absoluto.`);
      if (dI < 0) msgs.push('Baja la inversión: como dice Keynes, la caída también se multiplica. De ahí que una recesión se autoalimente si nadie compensa con gasto.');
      if (k >= 4) msgs.push('<span class="small muted">Ojo: es la teoría mecánica. Los estudios empíricos de la lámina dan de 0.6 a 1.2 en tiempos normales y de 1.5 a 2.5 en recesión.</span>');
      elR.innerHTML = msgs.join(' ');
      chart.refresh(); rondas.refresh();
    };
    const api = E.knobs(elK, [
      { k: 'C0', label: 'Consumo autónomo C₀', min: 0, max: 150, step: 5, v: base.C0, fmt: 'n' },
      { k: 'c', label: 'Propensión marginal a consumir c', min: 0.1, max: 0.95, step: 0.01, v: base.c, fmt: 'n', dec: 2, hint: 'debe ser menor que 1 para que haya cruce' },
      { k: 'I', label: 'Inversión I₀', min: 0, max: 150, step: 5, v: base.I, fmt: 'n' },
      { k: 'G', label: 'Gasto de gobierno G₀', min: 0, max: 200, step: 5, v: base.G, fmt: 'n' },
      { k: 'T', label: 'Impuestos T', min: 0, max: 150, step: 5, v: base.T, fmt: 'n', hint: 'de suma fija: el consumo depende de Y − T' },
      { k: 'm', label: 'Propensión a importar m', min: 0, max: 0.3, step: 0.01, v: base.m, fmt: 'n', dec: 2, hint: 'fuga: gasto que no es demanda local' },
    ], (s) => { st = s; draw(); }, { title: '🎛️ Economía keynesiana' });
    root.querySelector('#fxBtn1').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      api.set({ ...base, ...JSON.parse(b.dataset.p) });
    });
  }

  // ---------------------------------------------------------------- laboratorio 2: dinámica de la deuda
  const PRE = [
    { n: 'México · Excel del profe', p: { d: 0.55, r: 0.03, g: 0.02, pb: -0.04 }, t: 'Deuda 55%, tasa 8% − inflación 5% = r de 3%, g de 2% y 4% de déficit. Es el ejemplo de clase, que trata todo el déficit como primario.' },
    { n: 'México · primario ligeramente positivo', p: { d: 0.55, r: 0.03, g: 0.02, pb: 0.005 }, t: 'Mismos r y g, con el balance primario positivo que plantean los Criterios 2027 (la magnitud de 0.5% es ilustrativa).' },
    { n: 'EUA', p: { d: 1.2, r: 0.025, g: 0.02, pb: -0.03 }, t: 'Deuda ≈120% (clase). r, g y primario son órdenes de magnitud ilustrativos.' },
    { n: 'Japón', p: { d: 2.5, r: 0.005, g: 0.007, pb: -0.02 }, t: 'Deuda ≈250% (clase). Tasa real muy baja: la deuda aguanta porque r ≈ g. Valores ilustrativos.' },
    { n: 'Italia', p: { d: 1.35, r: 0.02, g: 0.007, pb: 0.01 }, t: 'Deuda alta, poco crecimiento y superávit primario. Valores ilustrativos.' },
    { n: 'Alemania · ejemplo del profe', p: { d: 0.7, r: 0.01, g: 0.013, pb: 0.005 }, t: 'Deuda 70%, tasa 2.3% − inflación 1.3% = r de 1%, g de 1.3% y un pequeño superávit (la magnitud del superávit es ilustrativa).' },
  ];
  function labDeuda(root) {
    const base = PRE[0].p;
    let st = { ...base }, nota = PRE[0].t;
    const H = 30;
    const path = (s, pb = s.pb) => { const a = [s.d]; for (let t = 0; t < H; t++) { const x = a[t]; a.push(x + ((s.r - s.g) * x) / (1 + s.g) - pb); } return a; };
    const pbStar = (s) => ((s.r - s.g) * s.d) / (1 + s.g);
    const elK = root.querySelector('#fxK2'), elT = root.querySelector('#fxT2'), elR = root.querySelector('#fxR2'), elN = root.querySelector('#fxN2');
    const cap = 6; // 600% del PIB: por arriba ya no se dibuja
    const clip = (a) => a.map((v) => (v > cap ? null : v < 0 ? 0 : +(v * 100).toFixed(2)));
    const chart = E.chart(root.querySelector('#fxC3'), (T) => {
      const yrs = Array.from({ length: H + 1 }, (_, i) => String(i));
      return { ...E.baseOpt(T), grid: { left: 8, right: 18, top: 62, bottom: 28, containLabel: true },
        tooltip: { trigger: 'axis', backgroundColor: T.card, borderColor: T.line, textStyle: { color: T.ink, fontSize: 13 }, valueFormatter: (v) => (v == null ? '—' : F.n(v, 1) + '%') },
        xAxis: E.axisCat(yrs, T, { name: 'años', nameLocation: 'middle', nameGap: 24, nameTextStyle: { color: T.muted }, axisLabel: { color: T.ink2, fontSize: 12, interval: 4 }, boundaryGap: false }),
        yAxis: E.axisVal(T, (v) => F.n(v) + '%', { min: 0, scale: false }),
        series: [
          { name: 'Deuda / PIB', type: 'line', showSymbol: false, data: clip(path(st)), lineStyle: { color: T.c1, width: 3.5 }, itemStyle: { color: T.c1 }, areaStyle: { color: T.c1, opacity: 0.08 } },
          { name: 'Con pb = 0 (sólo r − g)', type: 'line', showSymbol: false, data: clip(path(st, 0)), lineStyle: { color: T.c3, width: 2, type: 'dashed' }, itemStyle: { color: T.c3 } },
          { name: 'Con pb* (se queda igual)', type: 'line', showSymbol: false, data: clip(path(st, pbStar(st))), lineStyle: { color: T.c2, width: 2, type: 'dotted' }, itemStyle: { color: T.c2 } },
        ] };
    });
    const draw = () => {
      const a = path(st), ps = pbStar(st), gap = st.pb - ps, spread = st.r - st.g, d1 = a[1] - a[0], d30 = a[H];
      const cruce = a.findIndex((v) => v >= 1), yr100 = st.d < 1 && cruce > 0 ? cruce : null, fin = d30 > cap ? 'más de 600%' : d30 < 0 ? '0% (saldada)' : pp(d30, 0);
      const zero = a.findIndex((v) => v <= 0);
      // valores que estabilizan d con todo lo demás constante
      const gNec = (st.r * st.d - st.pb) / (st.d + st.pb), rNec = st.g + (st.pb * (1 + st.g)) / st.d;
      E.tiles(elT, [
        { label: 'r − g', v: spread * 100, fmt: 'sgn', dec: 1, note: spread > 0 ? 'puntos: la bola de nieve crece' : spread < 0 ? 'puntos: el crecimiento diluye' : 'puntos: neutro' },
        { label: 'Balance primario estabilizador pb*', v: ps * 100, fmt: 'sgn', dec: 2, note: '% del PIB · (r−g)·d/(1+g)', hl: true },
        { label: 'pb − pb*', v: gap * 100, fmt: 'sgn', dec: 2, note: gap >= -1e-9 ? 'puntos: te sobra' : 'puntos: te falta' },
        { label: 'Δd el primer año', v: d1 * 100, fmt: 'sgn', dec: 2, note: 'puntos del PIB' },
      ]);
      elT.insertAdjacentHTML('beforeend', `<div class="tile"><div class="tl">Deuda en 30 años</div><div class="tv">${fin}</div>${yr100 ? `<div class="tn">llega a 100% en el año ${yr100}</div>` : ''}</div>`);
      const dInf = Math.abs(spread) > 1e-9 ? (st.pb * (1 + st.g)) / spread : null;
      const iguales = Math.abs(gap) < 0.0005;
      let v, x;
      if (iguales) { v = '🟡 En el filo'; x = `El balance primario iguala a pb*: la deuda se queda en ${pp(st.d, 0)}. Cualquier choque a r o a g la saca de ahí.`; }
      else if (spread > 0 && gap < 0) { v = '🔴 No sostenible'; x = `Con r > g y un primario de ${pts(st.pb)} (hacían falta ${pts(ps)}), la deuda sube cada año y <b>se acelera</b>: los intereses se cobran sobre una base que crece. No hay punto de llegada.`; }
      else if (spread > 0) { v = '🟢 Sostenible mientras dure el ajuste'; x = `r > g juega en contra, pero el superávit de ${pts(st.pb)} supera lo que se necesita (${pts(ps)}). La deuda baja${zero > 0 ? ` y se saldaría hacia el año ${zero}` : ''}. Hay que sostenerlo por décadas, y ese es el reto político.`; }
      else if (spread < 0 && gap < 0) { v = '🟠 Sube, pero con techo'; x = `Con r < g hay viento a favor: el déficit es lo que empuja, no los intereses. La deuda converge hacia <b>${dInf !== null ? pp(dInf, 0) : '—'}</b> del PIB en lugar de explotar. ${dInf !== null && dInf > 3 ? 'Es un techo tan alto que en la práctica no protege: un alza de r lo borra.' : 'Es estable sólo si los mercados aceptan llegar ahí y r sigue debajo de g.'}`; }
      else if (spread < 0) { v = '🟢 Sostenible'; x = `Con r < g el crecimiento diluye la deuda y el primario alcanza: puedes correr hasta ${pts(ps)} y aun así no subiría. ${st.pb < 0 && dInf !== null ? `La razón baja hacia ${pp(dInf, 0)}.` : 'La razón baja con el tiempo.'}`; }
      else { v = st.pb < 0 ? '🔴 Sube en línea recta' : '🟢 Baja en línea recta'; x = 'Con r = g, la bola de nieve se apaga y sólo importa el balance primario, que suma o resta punto por punto.'; }
      const pal = [];
      if (gap < -0.0005) { pal.push(`recortar <b>${F.n(-gap * 100, 1)} puntos</b> de primario`); if (st.d + st.pb > 0 && gNec < 0.12) pal.push(`que g suba a <b>${pp(gNec)}</b>`); if (rNec > -0.05) pal.push(`que r baje a <b>${pp(rNec)}</b>`); }
      let extra = '';
      if (pal.length) extra = ` Para estabilizarla con lo demás constante necesitarías una de estas: ${pal.join(', ')}.`;
      if (d30 > 2.5 && gap < 0 && spread > 0) extra += ' Antes de llegar a esos niveles, los compradores de bonos exigen más tasa, y según el profe el gobierno termina imprimiendo. La gráfica no incluye esa prima de riesgo, así que el camino real sería peor.';
      elR.innerHTML = `<b>${v}.</b> ${x}${extra}`;
      elN.innerHTML = nota;
      chart.refresh();
    };
    const api = E.knobs(elK, [
      { k: 'd', label: 'Deuda inicial d₀ (% del PIB)', min: 0.1, max: 3, step: 0.01, v: base.d, fmt: 'pct', dec: 0 },
      { k: 'r', label: 'Tasa de interés real r', min: -0.02, max: 0.1, step: 0.001, v: base.r, fmt: 'pct', hint: 'nominal menos inflación' },
      { k: 'g', label: 'Crecimiento real g', min: -0.02, max: 0.08, step: 0.001, v: base.g, fmt: 'pct' },
      { k: 'pb', label: 'Balance primario pb (% del PIB)', min: -0.08, max: 0.08, step: 0.001, v: base.pb, fmt: 'pct', hint: 'positivo = superávit · negativo = déficit, sin contar intereses' },
    ], (s, k) => { st = s; if (k) nota = 'Valores tuyos.'; draw(); }, { title: '🎛️ Deuda a 30 años' });
    const bx = root.querySelector('#fxBtn2');
    bx.innerHTML = PRE.map((p, i) => `<button class="btn sm" type="button" data-i="${i}">${p.n}</button>`).join('');
    bx.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; const p = PRE[+b.dataset.i]; nota = p.t; api.set(p.p); });
  }

  // ---------------------------------------------------------------- calculadora Roscini-Schlefer
  function labRoscini(root) {
    const base = { b: 0.6, x: 0.03, i: 0.05, pi: 0, g: 0, a: 0, e: 0 };
    let st = { ...base };
    const terms = (s) => [['Déficit primario x', s.x], ['Intereses b·i', s.b * s.i], ['Inflación −b·π', -s.b * s.pi], ['Crecimiento −b·g', -s.b * s.g], ['Depreciación b·α·ε', s.b * s.a * s.e]];
    const el = root.querySelector('#fxT3');
    const chart = E.chart(root.querySelector('#fxC4'), (T) => {
      const t = terms(st);
      return { ...E.baseOpt(T), legend: { show: false }, grid: { left: 8, right: 54, top: 12, bottom: 8, containLabel: true }, tooltip: { show: false },
        xAxis: { type: 'value', splitLine: { lineStyle: { color: T.grid } }, axisLabel: { color: T.muted, fontSize: 11, formatter: (v) => F.n(v, 1) } }, yAxis: { type: 'category', inverse: true, data: t.map((r) => r[0]), axisLabel: { color: T.ink2, fontSize: 12 }, axisLine: { lineStyle: { color: T.axis } }, axisTick: { show: false } },
        series: [{ type: 'bar', data: t.map((r) => ({ value: +(r[1] * 100).toFixed(2), itemStyle: { color: r[1] >= 0 ? T.bad : T.good, borderRadius: 4 } })), label: { show: true, position: 'right', color: T.ink, formatter: (p) => F.sgn(p.value, 1) } }] };
    });
    const draw = () => {
      const tot = terms(st).reduce((s, r) => s + r[1], 0);
      E.tiles(el, [{ label: 'Δb en el año', v: tot * 100, fmt: 'sgn', dec: 1, note: 'puntos del PIB (aproximación del caso)', hl: true }, { label: 'b al cierre', v: (st.b + tot) * 100, fmt: 'n', dec: 1, note: '% del PIB' }]);
      chart.refresh();
    };
    const api = E.knobs(root.querySelector('#fxK3'), [
      { k: 'b', label: 'Deuda b (% del PIB)', min: 0, max: 2, step: 0.01, v: base.b, fmt: 'pct', dec: 0 },
      { k: 'x', label: 'Déficit primario x', min: -0.06, max: 0.12, step: 0.005, v: base.x, fmt: 'pct' },
      { k: 'i', label: 'Tasa nominal i', min: 0, max: 0.2, step: 0.005, v: base.i, fmt: 'pct' },
      { k: 'pi', label: 'Inflación π', min: -0.02, max: 0.2, step: 0.005, v: base.pi, fmt: 'pct' },
      { k: 'g', label: 'Crecimiento real g', min: -0.1, max: 0.1, step: 0.005, v: base.g, fmt: 'pct' },
      { k: 'a', label: 'Parte en moneda extranjera α', min: 0, max: 1, step: 0.05, v: base.a, fmt: 'pct', dec: 0 },
      { k: 'e', label: 'Depreciación ε', min: 0, max: 1.5, step: 0.02, v: base.e, fmt: 'pct', dec: 0 },
    ], (s) => { st = s; draw(); }, { title: '🎛️ Los cinco términos' });
    root.querySelector('#fxBtn3').addEventListener('click', (ev) => { const b = ev.target.closest('button'); if (!b) return; api.set({ ...base, ...JSON.parse(b.dataset.p) }); });
  }

  // ---------------------------------------------------------------- sección
  E.section({
    id: 'fiscal', n: 30, group: 'temas', icon: '🏛️', short: 'S3 · Política fiscal', exam: 'in',
    kicker: 'S3 · Los 7 temas',
    title: 'Política fiscal: el gasto que rescata y la deuda que se queda',
    lead: 'Keynes explica por qué gastar saca a una economía de la crisis. La aritmética de la deuda explica la factura. Tu trabajo en el examen es contar las dos historias juntas.',
    render(root) {
      root.innerHTML = `
      <style>
        .sx-fis .interp{font-size:15px;line-height:1.55;margin-top:12px;padding:12px 14px;border-radius:10px;background:var(--surface);border:1px solid var(--line)}
        .sx-fis .news-card h4{margin:0 0 4px;font-size:15px;line-height:1.35}
        .sx-fis .news-card .meta{font-size:12px;color:var(--muted);margin-bottom:6px}
        .sx-fis .chart.fxh{height:380px}
        .sx-fis .tbl td,.sx-fis .tbl th{text-align:left;white-space:normal;vertical-align:top}
        .sx-fis .tline em{font-style:normal;font-weight:700;color:var(--ink)}
      </style>
      <div class="sx-fis">
      <p class="prose">Este tema tiene una tensión central: <b>el gasto público es una herramienta muy poderosa y también muy politizada</b>. Todos quieren que suba el gasto y nadie que suban los impuestos. Por eso cada crisis deja deuda, y esa deuda ya no baja sola.</p>
      ${E.table([
        ['Multiplicador', '1 / (1 − c)', '¿Cuánto produce cada peso de gasto?'],
        ['Dinámica de la deuda', 'Δd = (r − g)·d/(1 + g) − pb', '¿La deuda como % del PIB sube o baja?'],
        ['Sostenibilidad', 'pb* = (r − g)·d/(1 + g)', '¿Qué balance primario la mantiene igual, y es políticamente posible?'],
      ], { head: ['Herramienta', 'Fórmula', 'Pregunta que contesta'] })}

      <h2>1. La narrativa</h2>
      <p class="prose">Es la historia que califica el profe. Fíjate en los <em>por eso</em>: cada etapa causa la siguiente.</p>
      ${E.timeline([
        { y: '1929–33', t: 'La Gran Depresión y Keynes', d: 'El desempleo llega a ≈25% y la actividad cae casi 40%. En un clima de tensión social, con la Revolución rusa de 1917 como alternativa, esperar a que se cure sola deja de ser opción. <em>Por eso</em> Keynes da el marco teórico y Roosevelt gasta con el New Deal.' },
        { y: '1945–70', t: 'Posguerra: fiscal como estabilizador', d: 'El Plan Marshall financia la reconstrucción de Europa y Japón recupera su capital. Los gobiernos usan el gasto para suavizar el ciclo alrededor de la tendencia de Solow. La deuda de guerra no se paga: <em>la diluyen</em> crecimiento e inflación (EUA pasa de 109% del PIB en 1946 a 26% en 1980).' },
        { y: '1970–82', t: 'Populismo fiscal en Latinoamérica', d: 'En México, tras el 68, Echeverría expande el gasto sin reforma tributaria. El déficit pasa de ≈2% a ≈10% del PIB y se cubre con deuda externa y monetización. <em>Por eso</em> llegan la devaluación de 1976, y luego la crisis de deuda de 1982.' },
        { y: '1982–2007', t: 'Disciplina y reglas', d: 'Tras las crisis, el ajuste: en México el sector público se achica después de 1982, y Europa fija el límite de 60% de deuda. Antes de 2008 la deuda de los países ricos era manejable. Argentina muestra la otra cara: no logra el ajuste y sigue imprimiendo.' },
        { y: '2008–09', t: 'Crisis financiera: primer empujón', d: 'Colapsa la vivienda y caen los bancos. Con la Depresión en la memoria, los gobiernos actúan fuerte: rescates (TARP) y estímulo (ARRA). La caída es mucho menor que en 1929, pero <em>por eso</em> sube la deuda.' },
        { y: '2010–13', t: 'Vuelta a la austeridad', d: 'Con recuperación débil y miedo a la deuda (Grecia, Osborne, Feldstein), EUA aprueba la ley de control presupuestal de 2011. Los recortes de 2013 restan ≈1.5 puntos al crecimiento: el multiplicador también funciona hacia abajo.' },
        { y: '2020–21', t: 'COVID: segundo empujón', d: 'Crisis médica, con choque de oferta y de demanda, y tasas ya en cero. La única bala es fiscal. EUA manda cheques a las personas, Europa subsidia a las empresas para que no despidan, y México casi no gasta. <em>Por eso</em> la deuda rica da otro salto y la de México no.' },
        { y: '2022–hoy', t: 'Tasas altas: r − g se voltea', d: 'La inflación pospandemia sube las tasas y el crecimiento no acompaña. Aparecen los vigilantes de bonos y la deuda ya no baja. Llega el cálculo de Bloomberg: 88% de un millón de simulaciones dan un camino insostenible para EUA.' },
        { y: 'Lo que viene', t: 'Rigideces', d: 'Pensiones, salud, defensa, transición energética y servicio de la deuda no dan margen. Recortar saca a la gente a la calle (Francia), y gastar enoja a los mercados. En el fondo, dice el profe, <em>es un problema de crecimiento</em>.' },
      ])}
      ${E.key('Keynes justifica gastar en la crisis → cada crisis (2008, COVID) lo aplica y sube la deuda → tasas altas con poco crecimiento hacen r > g → la deuda ya no se diluye → hay que ajustar → pero el gasto es rígido y el ajuste es impopular → si los mercados dejan de financiar, queda imprimir.', 'Cuéntala en 20 segundos')}
      ${E.table([
        ['Gran Depresión', '≈25%', '≈ −40%', '≈3% del PIB', 'Tarde y poco'],
        ['2008', '≈10%', '≈ −15%', '≈8% del PIB', 'Rápido y fuerte'],
        ['COVID', '≈15%', 'Colapso breve', 'Masivo: >$2 billones sólo en CARES', 'Inmediato'],
      ], { head: ['Crisis (EUA)', 'Desempleo máximo', 'Producción industrial', 'Impulso fiscal', 'Respuesta'] })}
      <p class="small muted">Órdenes de magnitud de la gráfica comentada en clase (19-oct), no cifras para memorizar. Al profe le importa la conclusión: gastar evitó otra Depresión.</p>

      <h2>2. Las herramientas</h2>
      ${E.concept({ id: 'fx-multi', title: 'Multiplicador del gasto', badge: 'in', html: `
        <div class="cols"><div>
          <p class="prose">Es cuánto sube el ingreso por cada peso adicional de gasto autónomo. Parte de dos ecuaciones que dependen una de la otra:</p>
          ${E.formula('Equilibrio', 'Y', 'C + I₀ + G₀')}
          ${E.formula('Conducta', 'C', 'C₀ + c·Y', 'c = propensión marginal a consumir, 0 &lt; c &lt; 1')}
          ${E.formula('Solución', 'Y*', E.frac('C₀ + I₀ + G₀', '1 − c'))}
          ${E.formula('Multiplicador', 'ΔY', E.frac('1', '1 − c') + ' · ΔG')}
          <p class="prose"><b>Ejemplo del profe:</b> C = 50 + 0.8Y, I = 60, G = 70 → Y* = 180 ÷ 0.2 = <b>900</b>, multiplicador <b>5</b>. Con c = 0.7 (lámina), 1 ÷ 0.3 = <b>3.33</b>.</p>
        </div><div>${E.fig(svgCruz, 'Sube G, sube el intercepto de la demanda; el equilibrio se mueve más que ΔG.')}</div></div>
        ${E.fig(svgRondas, 'El mecanismo en ronda: el ingreso de uno es el gasto del otro.', true)}
        ${E.kid('El gobierno le paga $1 a un albañil. Él gasta 80 centavos en un coche. El vendedor gasta 64 centavos en tacos. El taquero gasta 51… Un solo peso se fue pasando de mano en mano y generó casi 5 pesos de ingresos.')}
        <div class="g2">
        ${E.tip('En desempleo, la gente no consume porque no tiene dinero, las empresas no invierten porque nadie les compra y el resto del mundo está igual. Por eso, dice Keynes, sólo queda el gobierno. La prueba moderna: en COVID la tasa bajó y las empresas pidieron prestado, pero recompraron acciones en vez de invertir.', 'Clase 19-oct')}
        ${E.tip('Los estudios empíricos corrigen a Keynes: en tiempos normales el multiplicador puede estar debajo de 1, porque el gasto le quita recursos al sector privado. En recesión puede llegar a 2.5, no a 5. Y si la gente ahorra el cheque, como en COVID, la propensión a consumir se acerca a cero.', 'Clase 19-oct')}
        </div>
        ${E.table([
          ['Tiempos normales', '0.6 – 1.2', 'Hay desplazamiento (crowding out): el gasto sube tasas y compite con la inversión privada'],
          ['Recesión, tasas en cero', '1.5 – 2.5', 'Hay capacidad ociosa y la política monetaria no contrarresta; no hay desplazamiento'],
        ], { head: ['Contexto', 'Multiplicador estimado', 'Por qué'] })}
        <p class="small muted">Lámina 30: Blanchard y Perotti (2002), Christiano, Eichenbaum y Rebelo (2011), Romer y Bernstein (2009), Woodford (2011). Puedes invertirlo: un multiplicador de 2.5 implica c = 0.6.</p>
        ${E.warn('Decir que el multiplicador es <b>siempre</b> 1/(1−c). Es el caso de libro de texto: economía cerrada y sin desplazamiento. También falla decir que sólo G multiplica: C₀ e I₀ multiplican igual. La pregunta de Keynes no es si multiplican, sino <b>quién está dispuesto a gastar en una crisis</b>.')}
      ` })}

      ${E.concept({ id: 'fx-id', title: 'Dónde cae el déficit en la identidad', badge: 'in', html: `
        ${E.formula('Identidad', 'S − I', '(G − T) + (X − M)', 'Lámina 23. Sale de Y = C + I + G + X − M, restando T en ambos lados')}
        <p class="prose">Sirve para responder la pregunta del profe: <q>¿Quién es el gastador de la familia?</q> Un déficit externo lo causa el gobierno o el sector privado. Por eso los aranceles no arreglan un déficit comercial si nadie ahorra.</p>
        ${E.reveal('Ejemplo: China', '<p class="prose">China tiene superávit externo pese a su déficit fiscal alto (≈7% según clase). La identidad obliga: el ahorro privado debe ser muy alto. ¿Por qué ahorran? Según el Fiscal Monitor que cita el profe, gastan poco en salud y seguridad social, así que las familias ahorran por precaución. Más detalle en el tema S2.</p>')}
      ` })}

      ${E.concept({ id: 'fx-deuda', title: 'Dinámica de la deuda', badge: 'in', html: `
        <div>
          ${E.formula('Exacta', 'Δd', E.frac('(r − g)', '1 + g') + ' · d − pb', 'd = deuda/PIB · pb = balance primario (superávit +)')}
          ${E.table([
            ['Lo que debes', 'd', 'b'],
            ['Balance primario', 'pb (superávit +)', 'd = déficit, x = déficit primario (signo contrario)'],
            ['Tasa', 'r real', 'r real en lámina; el caso usa i nominal y resta π'],
          ], { head: ['Concepto', 'Esta guía', 'Lámina 40 y caso HBS'] })}
          <p class="prose">Tres palancas bajan la razón: <b>menos déficit, menos tasa, más crecimiento</b>. Una cuarta, con costo: que el banco central financie (S4).</p>
          ${E.reveal('Derivación, paso a paso (lámina 40)', `<p class="prose small">B<sub>t</sub> = (1 + r)B<sub>t−1</sub> + (G − T). Divide entre Y<sub>t</sub> = (1 + g)Y<sub>t−1</sub> y resta b<sub>t−1</sub>:</p><p class="prose small">Δb = [(1 + r)B<sub>t−1</sub> + (G − T) − (1 + g)B<sub>t−1</sub>] ÷ [Y<sub>t−1</sub>(1 + g)] = (G − T)/Y<sub>t</sub> + (r − g)/(1 + g) · b<sub>t−1</sub>.</p><p class="prose small">La lámina lo resume como Δb = d + (r − g)b<sub>t−1</sub>, porque 1 + g ≈ 1. Si llamas pb = −d, llegas a la fórmula de arriba.</p>`)}
        </div>${E.fig(svgTina, 'Dos llaves llenan, el crecimiento agranda la tina.', true)}
        ${E.kid('Es tu tarjeta de crédito. Cada mes gastas de más (déficit) y te cobran intereses sobre el saldo (r). Lo que salva es que te suban el sueldo (g), porque deber $100 mil no pesa igual ganando $20 mil que $200 mil. Si tu deuda cobra más de lo que crece tu sueldo, tiene que sobrarte dinero cada mes para no hundirte.')}
        <div class="g2">
        ${E.tip('<q>El déficit es cuánto te faltó cada año.</q> La deuda es cómo se van acumulando esos faltantes: como el saldo de la tarjeta de crédito.', 'Clase 19-oct')}
        ${E.tip('Ejemplo del profe para México: deuda 55%, tasa 8%, inflación 5% (r = 3%), g = 2%, déficit de 4%. La deuda no para de subir y de 50% llega a casi 100% en unos diez años. En Alemania: r = 1%, g = 1.3%, sin déficit, la deuda baja.', 'Clase 19-oct')}
        </div>
        ${E.note('En ese Excel el 4% es el déficit completo. En rigor, en la fórmula va el déficit <b>primario</b>, porque los intereses ya están en r·d; usar el total los cuenta dos veces. La lámina 51 dice que el déficit de México lo empujan los intereses (≈5.2% del PIB con base en RFSP), y los Criterios 2027 prevén primario positivo. La lógica del ejercicio es válida; si citas números, distingue primario de total. Por eso el laboratorio trae dos presets de México.', 'Ojo con un matiz')}
        ${E.warn('La lámina resume <b>r > g ⇒ Δb > 0</b>, pero eso sólo es cierto con primario en cero. Con r > g puedes bajar la deuda si tienes superávit suficiente; con r < g puede subir si el déficit es grande. Lo correcto: compara pb con pb*. Y no mezcles: si r es real, g es real; si usas i nominal, compárala con crecimiento nominal.')}
      ` })}

      ${E.concept({ id: 'fx-sost', title: 'Sostenibilidad fiscal', badge: 'in', html: `
        ${E.formula('Balance primario estabilizador', 'pb*', E.frac('(r − g)', '1 + g') + ' · d', 'Si pb ≥ pb*, la razón deuda/PIB no sube')}
        ${E.table([
          ['r > g', 'Hace falta <b>superávit</b> primario, mayor entre más deuda tengas', 'México, Italia; EUA acercándose (r ≈ g a inicios de los 2030 según lámina 51)'],
          ['r < g', 'Se puede correr <b>déficit</b> primario sin que la razón suba', 'Posguerra; Alemania en el ejemplo de clase'],
        ], { head: ['Condición', 'Implicación', 'Ejemplos'] })}
        <div>
          <p class="prose"><b>¿Cuándo es mucha deuda?</b> No hay un número mágico. Japón ronda 250%, EUA 120%, la zona euro 88% y México 55%. Según el profe depende de cuánto crece tu ingreso, cuánto pagas de interés y si te siguen prestando.</p>
          <p class="prose"><b>Si nadie compra:</b> antes de llegar a 200% o 500%, el gobierno imprime. Quien financia el déficit es entonces el banco central, y viene la inflación. Argentina es el ejemplo. Por eso Milei quiere prohibir por ley esa impresión.</p>
        </div>${E.fig(svgRuta, 'Las dos formas de financiar el déficit y su costo.', true)}
        ${E.tip('Antes de un nivel de deuda insostenible, el gobierno empieza a imprimir. La salida es gastar menos, como en México después de 1982, pero es un problema político: México pudo porque el gobierno estaba más centralizado; en Argentina y Francia la gente protesta porque no le alcanza.', 'Clase 21-oct')}
        ${E.tip('Política fiscal: superpoderosa pero muy politizada. Necesitas al Congreso para usarla, y por eso muchos prefieren la política monetaria, para la que basta el banco central.', 'Clase 19-oct')}
        <h4>Por qué el gasto no va a bajar</h4>
        ${E.table([
          ['Envejecimiento', 'Pensiones y salud. Es el riesgo más citado por el FMI en economías avanzadas (63% de los países)'],
          ['Defensa', 'EUA ya no quiere cargar con la defensa de Europa, y los países de la OTAN se comprometieron a gastar más'],
          ['Energía y clima', 'Más electricidad, transición, desastres'],
          ['Empresas públicas', 'Pasivos contingentes; en México, Pemex'],
          ['Rescates y estabilidad financiera', 'Pasivos contingentes de los bancos'],
        ], { head: ['Presión', 'Por qué'] })}
        <h4>Cuatro países, cuatro motores del déficit (láminas 50–51)</h4>
        ${E.table([
          ['EUA', 'Salud, Social Security e intereses; es el único donde también cayó el ingreso (recortes de impuestos)', 'Prima por plazo al alza'],
          ['Francia', 'Pensiones', 'Tasas al alza; reforma de pensiones suspendida'],
          ['México', 'Protección social y costo financiero', 'Intereses; Pemex'],
          ['China', 'Finanzas locales fuera de presupuesto', 'Cae la venta de terrenos; deuda de vehículos locales'],
        ], { head: ['País', 'Motor', 'Riesgo'] })}
        ${E.warn('Dos tropiezos. Uno: <b>consolidación fiscal</b> en noticias significa reducir el déficit; en clase, el profe también explicó la acepción contable, sumar federación, estados y empresas públicas para ver el perímetro completo. Revisa cuál usa la nota. Dos: decir que México está bien porque su deuda es baja. Una deuda de 55% con r > g y poco crecimiento también preocupa, y por eso lo castigan las calificadoras.')}
      ` })}

      <h2>3. Laboratorios</h2>
      <h3>Laboratorio 1. Cruz keynesiana y multiplicador</h3>
      <p class="prose">Arranca en el ejemplo del profe. Sube G de 70 a 80 y verás que Y sube de 900 a 950.</p>
      <div class="btnrow" id="fxBtn1">
        <button class="btn sm" type="button" data-p='{"G":80}'>Estímulo: G +10</button>
        <button class="btn sm" type="button" data-p='{"c":0.7}'>Lámina: c = 0.7</button>
        <button class="btn sm" type="button" data-p='{"I":30}'>Recesión: cae I a 30</button>
        <button class="btn sm" type="button" data-p='{"I":30,"G":100}'>Recesión y G compensa</button>
        <button class="btn sm" type="button" data-p='{"c":0.3}'>Cheques ahorrados: c = 0.3</button>
        <button class="btn sm" type="button" data-p='{"m":0.2}'>Economía abierta: m = 0.2</button>
        <button class="btn sm" type="button" data-p='{"G":80,"T":10}'>Presupuesto balanceado</button>
      </div>
      <div class="g2"><div id="fxK"></div><div class="chart fxh" id="fxC1"></div></div>
      <div id="fxT"></div>
      <div class="interp" id="fxR"></div>
      <h4 style="margin-top:18px">La cadena por cada $1 de gasto</h4>
      <div class="chart h220" id="fxC2"></div>
      ${E.reveal('Comprobación a mano', `<p class="prose small">C₀ = 50, c = 0.8, I = 60, G = 70: Y = 180 ÷ 0.2 = 900. Con G = 80: 190 ÷ 0.2 = 950, ΔY = 50 = 5 × 10. Con c = 0.7: 180 ÷ 0.3 = 600. Con T = 50: (180 − 40) ÷ 0.2 = 700. Presupuesto balanceado (G y T suben 10): ΔY = 10, multiplicador 1. La suma de 26 rondas con c = 0.8 da 4.98; es la cifra que muestra el profe en clase, muy cerca de 5.</p>`)}

      <h3>Laboratorio 2. Dinámica de la deuda a 30 años</h3>
      <p class="prose">Prueba los presets. Son <b>ilustrativos</b>: órdenes de magnitud para ver la mecánica, no pronósticos ni datos oficiales. La línea punteada muestra dónde se quedaría la deuda con pb*.</p>
      <div class="btnrow" id="fxBtn2"></div>
      <p class="small muted" id="fxN2"></p>
      <div class="g2"><div id="fxK2"></div><div class="chart fxh" id="fxC3"></div></div>
      <div id="fxT2"></div>
      <div class="interp" id="fxR2"></div>
      ${E.reveal('Comprobación a mano', `<p class="prose small"><b>Caso 1.</b> d = 100%, r = 5%, g = 2%, pb = 0: Δd = 0.03 × 100 ÷ 1.02 = +2.94. Directo: la deuda pasa a 105, el PIB a 102 y 105 ÷ 102 = 102.94% ✓.</p><p class="prose small"><b>Caso 2.</b> Preset del profe: d = 55%, r = 3%, g = 2%, pb = −4: Δd = 0.01 × 55 ÷ 1.02 + 4 = +4.54 y pb* = +0.54. Si partes de 50%, tras 10 años da 96.9%, el "casi 100 en diez años" que dijo en clase ✓.</p><p class="prose small"><b>Caso 3.</b> r = 1%, g = 3%, pb = −1, d = 60%: Δd = −1.17 + 1 = −0.17. Converge a d = 1 × 1.03 ÷ 0.02 = 51.5%.</p>`)}

      <h2>4. Los casos</h2>
      ${E.concept({ id: 'fx-murphy', title: 'Policy Responses to Modern Economic Crises (Murphy, Darden)', badge: 'in', html: `
        <p class="prose"><b>De qué trata:</b> marzo de 2020. Powell y los responsables fiscales enfrentan la pandemia y se preguntan cuánto sirve lo que se ensayó en 2008. El caso cuenta ambas crisis y las respuestas monetaria y fiscal.</p>
        ${E.table([
          ['Origen', 'Vivienda y bancos: choque de <b>demanda</b>', 'Médico: las restricciones impiden gastar; choque de <b>oferta y demanda</b>'],
          ['Quién decide', 'Bernanke (Fed), Tesoro, Obama, Congreso', 'Powell (Fed), Trump, Congreso'],
          ['Monetaria', 'Tasas a cero, QE1-2-3; rescate de Bear Stearns, Lehman cae', 'Sección 13(3): crédito directo a empresas, estados y municipios; balance de más de $6 billones'],
          ['Fiscal', 'TARP ($700 mil mdd) estabiliza, no compra bienes; ARRA (≈$800 mil mdd)', 'CARES (>$2 billones): cheques, nómina de pymes, desempleo, estados'],
          ['Debate', '¿Rescatar a quien causó la crisis? ¿Inflación por QE? ¿Era poco (Krugman) o sobraba (200 economistas)?', '¿Crédito o ingreso directo? ¿A quién favorece la Fed? ¿Inflación por oferta?'],
          ['Resultado', 'Recuperación tibia; austeridad en 2011–13 frena', 'Empleo rebota; segunda ola y Congreso trabado'],
        ], { head: ['', 'Crisis de 2008', 'Pandemia 2020'] })}
        ${E.reveal('Pregunta del caso: ¿rescatar o no a los culpables?', '<p class="prose">Es el dilema moral central. Dejarlos caer disciplina a futuro, pero lo pagan quienes no tomaron riesgos. Bernanke, estudioso de la Depresión, eligió intervenir. Lehman mostró el costo de no hacerlo. El profe lo resume: el primer empujón a la deuda fue rescatar bancos.</p>')}
        ${E.reveal('Pregunta del caso: ¿cuánto de 2008 sirve para 2020?', '<p class="prose">Sirve el manual: actuar rápido y en grande, monetaria y fiscal juntas. No sirve el diagnóstico. En 2008 faltaban crédito y demanda. En 2020 faltaba ingreso porque la actividad estaba prohibida. Por eso el dinero directo a hogares vale más que el crédito barato, y Powell mismo pide más estímulo fiscal. Y como hay choque de oferta, el riesgo de inflación es mayor.</p>')}
        ${E.reveal('¿Por qué la política monetaria no bastó?', '<p class="prose">Bernanke amplió la base monetaria, pero los bancos guardaron reservas y el multiplicador monetario no subió: si hogares y empresas no quieren gastar, más dinero no se mueve. Es la intuición de Keynes. Una encuesta de directores financieros decía que bajar tasas no iba a activar la inversión.</p>')}
        ${E.reveal('Distribución: ¿a quién le tocó?', '<p class="prose">El golpe cayó en trabajadores de bajos ingresos de servicios, sobre todo minorías, que además se contagiaban más. Reich y Whitehouse acusan que el apoyo favoreció a las grandes empresas. Powell responde que el colapso financiero dañaría más a los pobres. Según la lámina del FT, de $2.3 billones de CARES, ≈$610 mil mdd fueron a hogares, y una parte grande fueron préstamos a empresas. El profe lo conecta con un problema cada vez más claro de distribución de la riqueza, visible en protestas como las de Francia.</p>')}
        ${E.tip('EUA manda el cheque a la persona y deja que el mercado se ajuste: el desempleo sube muy rápido. Alemania y Francia subsidian a la empresa para que no despida. México casi no hace nada: sólo una ventana para no pagar intereses por tres meses. Por eso su déficit casi no sube.', 'Clase 19-oct')}
        ${E.key('Monetaria y fiscal se necesitan. La Fed estabiliza, pero sólo el gasto pone ingreso en el bolsillo. El costo: dos saltos de deuda en doce años.', 'Lección')}
      ` })}

      ${E.concept({ id: 'fx-roscini', title: 'How Government Debt Accumulates (Roscini y Schlefer, HBS)', badge: 'in', html: `
        <p class="prose"><b>De qué trata:</b> abril de 2010. Grecia, con deuda de 127% del PIB, paga casi 19% en bonos a dos años pese a recortar el déficit. Japón, con 193%, paga menos de 0.25%. ¿Por qué? Confianza contra miedo, pero el miedo se calcula: es una nota de <b>aritmética</b>, sin personajes en decisión.</p>
        ${E.formula('Fórmula del caso', 'Δb', 'x + b·i − b·π − b·g + b·α·ε', 'x primario · i nominal · π inflación · g real · α parte en moneda extranjera · ε depreciación')}
        <div class="btnrow" id="fxBtn3">
          <button class="btn sm" type="button" data-p='{}'>Ejemplo del caso: b = 60%</button>
          <button class="btn sm" type="button" data-p='{"g":0.05}'>+ crecer 5%</button>
          <button class="btn sm" type="button" data-p='{"pi":0.05}'>+ inflación 5%</button>
          <button class="btn sm" type="button" data-p='{"b":0.3,"x":0,"i":0,"a":0.6,"e":1.24}'>México 1994–95: sólo depreciación</button>
        </div>
        <div class="g2"><div id="fxK3"></div><div><div class="chart h220" id="fxC4"></div><div id="fxT3"></div></div></div>
        ${E.table([
          ['Déficit primario', 'Grecia: 1 punto más de déficit, deuda 2020 de 120% a 132%', 'Lo que acumulas'],
          ['Tasa', 'Grecia: 2 puntos más, de 120% a 157%', 'El efecto más fuerte de los dos: es la espiral'],
          ['Crecimiento', 'Grecia: ±1 punto, entre 104% y 137%', 'Pequeñas diferencias pesan mucho al acumularse'],
          ['Inflación', 'EUA: 109% (1946) → 26% (1980) sin pagar, sólo refinanciando', 'Infla el PIB nominal, no la deuda'],
          ['Depreciación', 'México 1995: primarios en superávit y aun así de 30% a 47%', 'La deuda en dólares se dispara: de 18% a 38%'],
        ], { head: ['Factor', 'Evidencia del caso', 'Idea'] })}
        ${E.reveal('Pregunta clave: ¿por qué Japón sí y Grecia no?', '<p class="prose">Grecia tenía r alta, poco crecimiento, y baja inflación forzada porque tenía que recuperar competitividad dentro del euro. Y no podía devaluar ni generar inflación propia, sus dos salidas clásicas. Si regresaba al dracma, la deuda en euros subía con la depreciación. Así la fórmula daba una deuda creciente, los mercados pedían más tasa y eso empeoraba la cuenta: la "espiral de la muerte". Japón tiene tasas casi en cero, por lo que su bola de nieve casi no existe.</p>')}
        ${E.reveal('¿La deuda se paga alguna vez?', '<p class="prose">No hace falta. EUA casi nunca redujo su deuda en dólares tras 1946: la refinanció, y crecimiento e inflación la diluyeron. Lo que importa es la razón contra el PIB, no el saldo.</p>')}
        ${E.tip('Este ejercicio sencillo es lo que todos hacen: tomas la deuda, ves la trayectoria de tasa y de PIB, y ves dónde acaba. Es lo mismo que hizo Bloomberg con su millón de simulaciones para EUA.', 'Clase 19-oct')}
        ${E.key('La fórmula es contabilidad, no teoría; lo incierto son los supuestos. Con ella explicas el miedo de los mercados: no ven la deuda de hoy, sino su camino.', 'Lección')}
      ` })}

      <h2>5. Quiz rápido</h2>
      <div id="fxQ"></div>

      <h2>6. Noticias recientes, para contexto</h2>
      <p class="prose">Verificadas al 2 de noviembre de 2026. Léelas con la herramienta, no con opinión. Las verás de nuevo en ${E.link('noticias', 'Noticias')}.</p>
      <div class="g2">${NEWS.map((n) => `<div class="card2 news-card"><h4>${n.title}</h4><div class="meta">${n.date} · ${n.source} · <a href="${n.url}" target="_blank" rel="noopener">fuente</a></div><p class="small"><b>Herramienta:</b> ${n.tool}</p><p class="small">${n.read}</p></div>`).join('')}</div>
      </div>`;

      labCruz(root);
      labDeuda(root);
      labRoscini(root);
      E.quiz(root.querySelector('#fxQ'), [
        { q: 'El gobierno sube el gasto 10 con c = 0.75 en una economía cerrada. ¿Cuánto sube Y según el modelo simple?', o: ['7.5', '10', '40', '75'], a: 2, w: 'Multiplicador = 1 ÷ (1 − 0.75) = 4, así que ΔY = 40.' },
        { q: 'Un país tiene deuda de 80% del PIB, r = 4%, g = 2%. ¿Qué balance primario aproximado estabiliza su deuda?', o: ['Déficit de 1.6%', 'Superávit de 1.6%', 'Superávit de 4%', 'Balance cero'], a: 1, w: 'pb* = 0.02 × 80 ÷ 1.02 ≈ 1.57% del PIB. Con r > g necesitas superávit.' },
        { q: 'En la pandemia, los bancos centrales bajaron tasas y aun así las empresas invirtieron poco. ¿Qué concepto del curso explica mejor esto?', o: ['Convergencia condicional', 'Paridad descubierta', 'La intuición de Keynes: sin demanda, el sector privado no gasta', 'Equivalencia de deuda e impuestos'], a: 2, w: 'En clase: las empresas pidieron prestado y recompraron acciones. Por eso Keynes pide que gaste el gobierno.' },
        { q: 'México casi no aumentó su deuda en 2008 ni en COVID. ¿Por qué?', o: ['Sus ingresos petroleros se dispararon', 'No tuvo que rescatar bancos locales y casi no gastó en COVID', 'Tuvo r mucho menor que g', 'El FMI asumió el costo'], a: 1, w: 'Los bancos eran globales tras la crisis del Tequila y el gobierno no dio subsidios. Su presión vino después: programas sociales, Pemex e intereses.' },
        { q: 'Una moneda fuerte se aprecia 50% contra la local en un país con 40% de su deuda en dólares y deuda total de 50% del PIB. ¿Qué pasa con la razón, por este efecto?', o: ['Sube ≈10 puntos', 'Baja ≈10 puntos', 'No cambia: es un efecto contable', 'Sube ≈50 puntos'], a: 0, w: 'b·α·ε = 0.5 × 0.4 × 0.5 = 0.10. La misma mecánica que en México 1994–95.' },
      ]);
    },
  });

  // ---------------------------------------------------------------- banco de opción múltiple
  E.bank.push(
    { topic: 'S3', q: 'Según Keynes, ¿por qué debe gastar el gobierno en una recesión profunda?', o: ['Porque el gasto público siempre es más productivo que el privado', 'Porque consumidores, empresas y resto del mundo no tienen incentivo para gastar, y sólo el gobierno puede', 'Porque así baja la inflación', 'Porque reduce la deuda en el largo plazo'], a: 1, w: 'Con desempleo la gente no consume, las empresas no invierten porque nadie les compra y el exterior está igual. Queda el gobierno.' },
    { topic: 'S3', q: 'Si la propensión marginal a consumir sube de 0.7 a 0.8, el multiplicador simple:', o: ['Baja de 5 a 3.33', 'Se queda igual', 'Sube de 3.33 a 5', 'Sube de 1.3 a 1.8'], a: 2, w: '1/(1−0.7) = 3.33 y 1/(1−0.8) = 5. A mayor gasto por ronda, cadena más larga.' },
    { topic: 'S3', q: '¿Por qué el modelo exige que la propensión marginal a consumir sea menor que 1?', o: ['Porque si no, la demanda agregada no cruza la línea de 45° y no hay equilibrio', 'Porque los impuestos siempre son positivos', 'Porque el ahorro privado no puede ser cero', 'Porque si no, la inversión sería negativa'], a: 0, w: 'Con c ≥ 1 las líneas son paralelas o divergen. La fuga del ahorro hace que las rondas converjan.' },
    { topic: 'S3', q: '¿Cuál razón NO explica por qué el multiplicador real es menor que el del modelo simple?', o: ['Parte del gasto se va en importaciones', 'En tiempos normales el gasto desplaza inversión privada', 'Los hogares pueden ahorrar las transferencias', 'El consumo autónomo no depende del ingreso'], a: 3, w: 'Que exista consumo autónomo es parte del modelo y no reduce el multiplicador. Las otras tres son fugas o desplazamiento.' },
    { topic: 'S3', q: 'Los estudios empíricos encuentran multiplicadores más altos:', o: ['En auges con baja tasa de desempleo', 'En recesión y con tasas cerca de cero, porque hay menos desplazamiento', 'Cuando el banco central sube tasas a la vez', 'En economías muy abiertas'], a: 1, w: 'Láminas: 0.6–1.2 en tiempos normales; 1.5–2.5 en recesión con tasas en cero.' },
    { topic: 'S3', q: 'El profe compara la Gran Depresión con 2008. Hubo crisis bancaria en ambas, pero la producción cayó mucho menos en 2008. ¿Cuál es su conclusión?', o: ['Los bancos de 2008 eran más grandes', 'La globalización amortiguó el golpe', 'El estímulo fiscal fuerte y oportuno evitó una recesión mucho peor', 'La crisis de 2008 era sólo de oferta'], a: 2, w: 'Con una respuesta fiscal más de dos veces mayor, la caída fue de menos de la mitad.' },
    { topic: 'S3', q: 'En el caso de Murphy, ¿qué distingue a TARP de ARRA?', o: ['TARP compraba activos para estabilizar y no aumentaba el PIB directamente; ARRA era gasto y recortes de impuestos', 'TARP era política monetaria de la Fed', 'ARRA rescataba bancos y TARP daba cheques', 'Ambos eran gasto directo en bienes'], a: 0, w: 'TARP buscaba estabilizar mercados y crédito; ARRA actuaba directo sobre la demanda.' },
    { topic: 'S3', q: 'Según el caso, ¿por qué la crisis del COVID fue distinta a la de 2008?', o: ['Se originó en los bancos europeos', 'Fue causada por la falta de ahorro', 'Tuvo un origen médico: las restricciones limitaron el gasto y hubo choque de oferta además de demanda', 'No hubo pérdida de empleo'], a: 2, w: 'Los hogares habrían gastado de no ser por las restricciones. Un choque de oferta añade riesgo de inflación.' },
    { topic: 'S3', q: '¿Qué diferencia clave señala el profe entre las respuestas de EUA y Europa al COVID?', o: ['EUA subsidió empresas y Europa personas', 'EUA dio cheques a las personas y el desempleo subió rápido; Europa subsidió a empresas para que no despidieran', 'Europa no gastó', 'Ambos usaron exactamente el mismo esquema'], a: 1, w: 'Dos filosofías: dejar que el mercado se ajuste y proteger a la persona, o preservar la empresa y el empleo.' },
    { topic: 'S3', q: '¿Cuál es la diferencia entre déficit y deuda?', o: ['El déficit es un flujo anual y la deuda el saldo acumulado', 'El déficit es externo y la deuda interna', 'La deuda se mide en pesos y el déficit en dólares', 'Son sinónimos en términos de PIB'], a: 0, w: 'Como la tarjeta: el faltante del mes es el déficit y el saldo es la deuda.' },
    { topic: 'S3', q: 'Con d = 100%, r = 4%, g = 2% y superávit primario de 1% del PIB, la deuda el próximo año:', o: ['Baja ≈1 punto', 'Sube ≈3 puntos', 'Se queda igual', 'Sube ≈1 punto'], a: 3, w: '0.02 × 100 ÷ 1.02 ≈ 1.96, menos 1 de superávit: +0.96. El superávit no alcanza: pb* es 1.96.' },
    { topic: 'S3', q: 'Un país con r < g corre un déficit primario constante. Con el tiempo, su deuda/PIB:', o: ['Explota necesariamente', 'Tiende a un nivel estable', 'Llega a cero', 'No se puede determinar con la fórmula'], a: 1, w: 'd* = −pb(1+g)/(g−r) en valor positivo: el crecimiento diluye más entre más alta es la deuda.' },
    { topic: 'S3', q: 'En Roscini y Schlefer, ¿por qué Grecia pagaba mucho más que Japón pese a tener menos deuda?', o: ['Por un déficit primario idéntico a cero', 'Porque Japón es más grande', 'Por la aritmética temida: poco crecimiento, sin inflación ni moneda propia, con tasas al alza; confianza contra miedo', 'Porque Grecia tenía toda su deuda en yenes'], a: 2, w: 'La tasa alta empeora la cuenta y se retroalimenta. Dentro del euro, Grecia no podía inflar ni devaluar.' },
    { topic: 'S3', q: '¿Por qué la inflación reduce la razón deuda/PIB?', o: ['Porque aumenta la recaudación del impuesto sobre la renta únicamente', 'Porque la deuda está en términos nominales y la inflación aumenta el PIB nominal', 'Porque baja las tasas de interés siempre', 'Porque elimina el déficit primario'], a: 1, w: 'Así bajó la deuda de EUA de 109% a 26% del PIB entre 1946 y 1980, sin pagarla. Tiene el mismo efecto que crecer.' },
    { topic: 'S3', q: 'México 1994–95 corría superávit primario y aun así su deuda subió de 30% a 47% del PIB (cifras de Roscini y Schlefer; el caso Tequila da 33.7% a 50.7% en deuda bruta). La causa principal fue:', o: ['La depreciación del peso sobre la deuda en dólares', 'Un gran déficit primario oculto', 'El alza de la inflación', 'Las pensiones'], a: 0, w: 'Término b·α·ε. La deuda en dólares pasó de 18% a 38% del PIB; la de pesos bajó.' },
    { topic: 'S3', q: 'Según el profe, si una deuda se vuelve insostenible y no hay ajuste, ¿qué pasa antes de llegar a niveles extremos?', o: ['El país la paga con reservas', 'El gobierno empieza a imprimir: el banco central financia el déficit y hay inflación', 'Los acreedores la perdonan automáticamente', 'Sube el crecimiento'], a: 1, w: 'Clase 21-oct: Argentina. La salida es reducir gasto, pero es políticamente costosa.' },
    { topic: 'S3', q: 'Una explicación de por qué muchos prefieren usar la política monetaria a la fiscal es que:', o: ['La fiscal no tiene efecto sobre el PIB', 'La monetaria tiene un multiplicador mayor en toda circunstancia', 'La fiscal necesita aprobación del Congreso y es muy politizada', 'La monetaria no tiene ningún costo'], a: 2, w: 'Basta el banco central para mover la monetaria. La fiscal depende de acuerdos: subir gasto gusta, subir impuestos no.' },
    { topic: 'S3', q: 'El déficit de México, según las láminas, se distingue del de EUA o China porque:', o: ['En el aumento del déficit, los intereses aportan casi tanto como el gasto primario, y depende de tasas y prima de riesgo', 'Se explica sólo por caída de ingresos', 'Se origina en gobiernos locales fuera de presupuesto', 'Viene de gasto militar'], a: 0, w: 'Lámina 50: interés +3.6 puntos y gasto primario +3.7. El ingreso en realidad subió.' },
    { topic: 'S3', q: 'En la crisis mexicana de los 70, la identidad S − I = (G − T) + (X − M) ayuda a ver que:', o: ['El déficit fiscal y el comercial se acumularon y sólo podían cubrirse con deuda externa hasta que los mercados cortaron', 'El ahorro privado financió todo el déficit', 'El déficit comercial no guardaba relación con el fiscal', 'La devaluación fue un accidente monetario aislado'], a: 0, w: 'Lámina 59: brecha doble. Cuando se perdió la confianza vino la devaluación de 1976.' },
    { topic: 'S3', q: 'Un gobierno envejecido con r > g anuncia que reducirá su deuda sólo creciendo. ¿Qué es más razonable decir?', o: ['Funciona siempre, porque el crecimiento no tiene límite', 'Es improbable: el envejecimiento presiona el gasto y frena g; hará falta superávit primario', 'La deuda no se ve afectada por la demografía', 'Sólo la inflación importa'], a: 1, w: 'Doble golpe: menos trabajadores (Solow) y más pensiones y salud. Por eso el profe lo llama un problema de crecimiento.' },
  );

  // ---------------------------------------------------------------- ensayos
  E.essays.push(
    {
      topic: 'S3', type: 'caso',
      prompt: 'Con base en el caso Policy Responses to Modern Economic Crises, compara la respuesta de política a la crisis de 2008 y a la pandemia. ¿Qué se aprendió de 2008 y por qué no bastaba repetirlo?',
      tools: ['Multiplicador del gasto', 'Choque de demanda vs oferta', 'Política monetaria vs fiscal', 'Dinámica de la deuda'],
      outline: ['2008: crisis de demanda y bancaria; dilema de rescate; TARP, ARRA y QE', 'Límite monetario: bancos guardan reservas; Keynes tenía razón', 'Austeridad 2011–13 y costo', '2020: choque médico, oferta y demanda; ingreso directo', 'Lección y costo: dos saltos de deuda'],
      model: `La crisis de 2008 y la pandemia son los dos grandes empujones a la deuda moderna, pero tuvieron diagnósticos distintos. Por eso la lección de 2008 sirvió como manual, no como receta.

En 2008, el colapso de la vivienda destruyó bancos y crédito, un choque de demanda. Con la memoria de la Gran Depresión, Bernanke decidió actuar, a pesar del dilema moral de ayudar a quienes tomaron los riesgos. Lehman mostró el costo de no rescatar. La Fed bajó tasas a cero e inició QE; el Tesoro usó TARP para estabilizar activos, sin aumentar directamente el PIB, y el Congreso aprobó ARRA, de unos 800 mil millones de dólares. Aquí entra el multiplicador: en recesión y con tasas en cero, cada dólar de gasto no desplaza inversión y puede rendir 1.5 o más. La política monetaria topó con su límite: los bancos guardaron reservas porque nadie quería gastar, justo como anticipaba Keynes. El estímulo pareció insuficiente frente a la brecha de producto, y la austeridad de 2011 a 2013 restó crecimiento.

La pandemia fue distinta. Su origen fue médico: la gente quería gastar, pero las restricciones lo impedían, y muchos no podían trabajar. Era un choque de oferta y demanda, que perjudicó más a los trabajadores de bajos ingresos. Lo aprendido fue actuar rápido y a gran escala: la Fed usó la sección 13(3) para prestar directamente, y CARES inyectó más de dos billones. Pero repetir 2008 no bastaba, porque el problema no era la falta de crédito sino de ingreso. Las empresas tomaron crédito barato y, como dijo el profe, recompraron acciones. Por eso importan las transferencias a los hogares, y Powell mismo pidió más apoyo fiscal. Incluso eso tuvo límites: parte de los cheques se ahorró, lo que reduce la propensión a consumir y el multiplicador.

El costo aparece en la fórmula de la deuda: Δd = (r − g)d/(1 + g) − pb. Los rescates y el gasto subieron d en dos saltos, y cuando las tasas subieron tras la pandemia, la bola de nieve se volvió más pesada. Mi conclusión: ambas respuestas fueron correctas, porque el costo de no actuar habría sido otra Depresión, pero agotaron el espacio fiscal para la siguiente crisis.`,
    },
    {
      topic: 'S3', type: 'caso',
      prompt: 'Con How Government Debt Accumulates, explica por qué en 2010 los mercados castigaron a Grecia pero no a Japón, aunque Japón debía más. ¿Qué factores determinan la trayectoria de la deuda?',
      tools: ['Dinámica de la deuda', 'Déficit primario', 'r − g', 'Inflación y depreciación (α·ε)'],
      outline: ['El acertijo: 127% y 19% contra 193% y menos de 0.25%', 'Fórmula y cinco factores', 'Grecia: sin inflación ni devaluación, y la tasa se retroalimenta', 'Evidencia: EUA 1946–80 y México 1995', 'Lección: importa el camino, no el nivel'],
      model: `En 2010 Grecia debía 127% de su PIB y pagaba casi 19% en bonos a dos años, aunque estaba recortando su déficit. Japón debía 193% y pagaba menos de 0.25%. El caso de Roscini y Schlefer resuelve el acertijo: confianza y miedo se apoyan en una aritmética. Los mercados no miran el nivel de deuda, sino su trayectoria.

La fórmula es Δb = x + b·i − b·π − b·g + b·α·ε. La deuda como porcentaje del PIB sube con el déficit primario y los intereses, baja con inflación y crecimiento, y sube con la depreciación si hay deuda en moneda extranjera. No es teoría: es contabilidad. Lo incierto son los supuestos.

Con esa lente, Grecia estaba atrapada. Recortar el déficit primario ayudaba, pero sus intereses se aplicaban sobre una base enorme. Además, necesitaba bajar precios frente a la zona euro para recuperar competitividad, es decir, inflación mínima, justo cuando esta le habría ayudado a diluir la deuda. No podía devaluar ni imprimir, porque no tenía moneda propia. Y si volvía al dracma, la deuda en euros subiría con la depreciación. Peor aún, el crecimiento era débil. Las proyecciones del FMI lo muestran: dos puntos más de tasa llevaban la deuda de 2020 de 120% a 157%. Esa es la espiral: el miedo sube la tasa, la tasa empeora la cuenta y la cuenta justifica el miedo. Japón, en cambio, con tasas casi en cero, tenía una bola de nieve mínima, por lo que r − g no lo empujaba de la misma forma.

Dos ejemplos del caso refuerzan la idea. EUA pasó de deber 109% del PIB en 1946 a 26% en 1980 sin pagar: refinanció y dejó que crecimiento e inflación diluyeran la deuda. México en 1994–95 tenía superávit primario, y aun así su deuda subió de 30% a 47% del PIB porque buena parte estaba en dólares y el peso se desplomó.

La lección para un gerente o un ministro es que no existe un número mágico de deuda. Para saber si es sostenible hay que comparar el balance primario con el que estabiliza la deuda, pb* = (r − g)d/(1 + g), y preguntarse si el país puede sostenerlo políticamente. Si no, los mercados lo adelantan, y lo hacen de golpe.`,
    },
    {
      topic: 'S3', type: 'caso',
      prompt: 'El multiplicador keynesiano justifica el gasto en una crisis, pero la deuda sube y no baja. Con los casos del tema, explica por qué los países ricos llegan hoy a niveles de deuda de guerra sin una guerra y qué opciones tienen.',
      tools: ['Multiplicador', 'r − g', 'Balance primario estabilizador', 'Rigideces', 'Monetización'],
      outline: ['Keynes y la asimetría: se gasta en la crisis y no se ahorra al salir', 'Dos saltos: rescates y COVID', 'Por qué no baja como en la posguerra: r > g, poco crecimiento', 'Rigideces y economía política', 'Cuatro palancas'],
      model: `Tras la Segunda Guerra Mundial, la deuda de los países ricos subió y luego bajó porque la economía creció con fuerza. Hoy se acerca a esos niveles sin guerra y no se ve cómo baje. Para explicarlo uso dos herramientas: el multiplicador y la dinámica de la deuda.

Keynes dio la justificación para gastar: en una crisis, consumidores y empresas no gastan, y cada peso público se multiplica por 1/(1 − c). La evidencia lo respalda: en recesión, los multiplicadores llegan a 1.5 o 2.5, y el fuerte estímulo de 2008 evitó una caída como la de la Gran Depresión. El problema es la asimetría. Como explica el profe, el gasto es muy politizado: subirlo gusta a todos y subir impuestos a nadie. Por eso cada crisis deja un escalón.

Hubo dos escalones. El primero fue 2008: rescates bancarios y estímulos como ARRA. El segundo fue el COVID, con más de dos billones de dólares solo en CARES. Pero un salto no explica que la deuda siga alta. La fórmula Δd = (r − g)d/(1 + g) − pb lo aclara. En la posguerra, g superaba a r y la deuda se diluía; EUA bajó de 109% a 26% del PIB sin pagarla, según Roscini y Schlefer. Hoy las tasas subieron con la inflación pospandemia y el crecimiento es débil, de modo que r se acerca a g o la supera. Con deudas de más de 100% del PIB, cada punto de diferencia exige más de un punto de superávit primario.

Ahí entran las rigideces. El envejecimiento encarece pensiones y salud y frena el crecimiento. Se suman defensa, transición energética y pasivos contingentes. El gasto no va a bajar por sí solo.

Quedan cuatro palancas, todas costosas. Primera, ajustar el balance primario, pero Francia muestra que eso saca a la gente a la calle. Segunda, crecer más, la salida ideal; depende de si la IA eleva la productividad, algo aún incierto. Tercera, bajar r, que no controla el gobierno y que los vigilantes de bonos pueden subir. Cuarta, inflar o monetizar, que reduce la razón a costa de credibilidad; Argentina enseña a dónde lleva eso. Mi lectura coincide con la del profe: en el fondo es un problema de crecimiento que se manifiesta en lo fiscal.`,
    },
    {
      topic: 'S3', type: 'noticia',
      prompt: 'Noticia: EUA cerró el año fiscal 2026 con un déficit de cerca de 2 billones de dólares, 6.2% del PIB; los intereses subieron 11% y las aduanas recaudaron menos por devoluciones de aranceles (American Action Forum con datos de CBO, 8-oct-2026). Interpreta con las herramientas del curso.',
      tools: ['Dinámica de la deuda', 'Déficit primario vs intereses', 'S − I = (G − T) + (X − M)', 'Multiplicador'],
      outline: ['Hecho: déficit de crisis sin crisis', 'Keynes: no es contracíclico y el multiplicador rinde poco', 'Deuda: r vs g y los intereses', 'Identidad: los aranceles no son la solución', 'Implicación para emergentes y qué vigilar'],
      model: `Según datos de CBO citados por American Action Forum, Estados Unidos cerró el año fiscal 2026 con un déficit cercano a 2 billones de dólares, 6.2% del PIB, 218 mil millones más que el año anterior. Los intereses subieron 115 mil millones, 11%, por mayor deuda y tasas largas más altas. Las aduanas recaudaron menos, en parte por devoluciones de aranceles tras un fallo de la Suprema Corte. Interpreto esta noticia con tres herramientas.

Primero, el multiplicador. Keynes justifica un déficit grande cuando la economía se cae, y con capacidad ociosa los multiplicadores pueden llegar a 2.5. Pero EUA no está en recesión. En tiempos normales el multiplicador ronda 0.6 a 1.2, porque el gasto compite con la inversión privada. Es decir, este déficit no es un estímulo contracíclico sino estructural: gasta como en crisis, sin los beneficios de una crisis, y además reduce el espacio para la siguiente.

Segundo, la dinámica de la deuda: Δd = (r − g)d/(1 + g) − pb. Con deuda cercana a 120% del PIB, cada punto de r pesa más de un punto del PIB. Las láminas señalan que los intereses netos ya superan al gasto en defensa y que r se acercaría a g a inicios de la década de 2030. Si r supera a g, EUA necesitaría superávit primario para estabilizar, y hoy corre lo contrario. Así, no es sorpresa que Bloomberg encontrara que 88% de un millón de simulaciones lleva a un camino insostenible.

Tercero, la identidad S − I = (G − T) + (X − M). Si el gobierno ahorra menos y el sector privado invierte con fuerza por el auge de la IA, el déficit externo no se cierra. Los aranceles no arreglan esto, y esta noticia añade que ni siquiera ofrecen una recaudación segura.

Para México y otros emergentes, la implicación es concreta. Más oferta de bonos estadounidenses presiona las tasas globales, lo que eleva r también aquí, y México ya tiene r > g. Vigilaría la prima por plazo del Tesoro, las señales de los vigilantes de bonos y si el Congreso se atreve a tocar impuestos o gasto. Mientras el dólar siga siendo activo de reserva, EUA tiene más margen que nadie, pero ese margen depende de la confianza, como enseña el caso griego.`,
    },
    {
      topic: 'S3', type: 'noticia',
      prompt: 'Noticia: el Paquete Económico 2027 de México prevé RFSP de 3.9% del PIB (4.1% en 2026), por encima del 3.5% de los Pre-Criterios, deuda de 55% del PIB y menos apoyo a Pemex (IMCO, 9-sep-2026; N+, 9-sep-2026). Moody\'s ya bajó a México a Baa3 en mayo. ¿Es sostenible la deuda mexicana?',
      tools: ['Sostenibilidad: pb*', 'r − g', 'Rigideces', 'Pasivos contingentes (Pemex)'],
      outline: ['Hecho y contexto de calificación', 'Cálculo: r ≈ 3, g ≈ 2, pb* ≈ 0.5', 'Por qué México llega aquí: no fue COVID ni bancos', 'Rigideces y Pemex', 'Veredicto y qué vigilar'],
      model: `El Paquete Económico 2027 prevé que los RFSP, la medida amplia del déficit, bajen de 4.1% a 3.9% del PIB, menos que el 3.5% planteado en abril, según IMCO. La deuda llegaría a 55% del PIB, y Pemex recibiría 81.1 mil millones de pesos, 69% menos. Todo esto ocurre con México muy cerca del grado especulativo: Moody's lo bajó a Baa3 en mayo y S&P tiene perspectiva negativa. ¿Es sostenible? Uso la dinámica de la deuda.

Con los supuestos oficiales, una tasa cercana a 6% e inflación de 3% implican r ≈ 3%. Con crecimiento alrededor de 2%, r − g ≈ 1 punto. Entonces, pb* = (r − g)d/(1 + g) ≈ 0.01 × 55 ÷ 1.02 ≈ 0.5% del PIB. Es decir, México necesita un superávit primario de más o menos medio punto para no aumentar su deuda. Los Criterios plantean regresar a números positivos, así que la cuenta es factible. No es una situación de explosión como la griega. El riesgo es que el margen es delgado: si el crecimiento decepciona, como advierte Fitch, o si sube la prima de riesgo, pb* aumenta y la deuda sube.

Lo interesante es el origen. El profe subraya que México no gastó en COVID ni rescató bancos en 2008, porque sus bancos son globales. Su déficit se debe a programas sociales, ciclos electorales, grandes obras e intereses. Según la lecture, los intereses explican casi tanto del aumento del déficit como el gasto primario. Por eso es un déficit sensible a tasas y a riesgo soberano, y una baja de calificación puede convertirse en profecía autocumplida.

Dos rigideces limitan el ajuste. Una: casi la mitad del gasto ya está comprometida en pensiones, costo financiero y participaciones, y subir impuestos tiene un costo político. Dos: Pemex. Aunque su apoyo baja, su superávit proyectado de 95 mil millones depende de esa transferencia. Es un pasivo contingente: las calificadoras saben que al final lo respalda el soberano, y por eso miran el perímetro completo.

Mi veredicto: es sostenible en la aritmética, pero frágil. Sin crecimiento, México se queda sin colchón frente al siguiente choque, y perder el grado de inversión forzaría ventas de bonos que subirían r. Vigilaría el crecimiento, el balance primario efectivo y las transferencias reales a Pemex, no sólo la meta anunciada.`,
    },
    {
      topic: 'S3', type: 'noticia',
      prompt: 'Noticia: el 23-oct-2026 Moody\'s mantuvo a Francia en Aa3 con perspectiva negativa, contra lo que esperaba el mercado, suponiendo que se aprobará un presupuesto 2027 que reduzca el déficit (Il Sole 24 Ore). Interpreta.',
      tools: ['Balance primario estabilizador', 'r − g', 'Vigilantes de bonos', 'Economía política del ajuste'],
      outline: ['Hecho y por qué es un voto condicionado', 'Aritmética de deuda en Francia', 'Bonos y barricadas', 'Multiplicador: el ajuste frena', 'Salidas y lección para México'],
      model: `El 23 de octubre, Moody's mantuvo a Francia en Aa3 con perspectiva negativa. El mercado esperaba un recorte que la igualara con Fitch y S&P. No es un voto de confianza, sino una apuesta condicionada: la agencia asume que se aprobará un presupuesto 2027 que reduzca el déficit y que bajará la tensión social. Es decir, el riesgo de Francia es menos financiero que político.

La aritmética explica la presión. Se reporta un déficit de alrededor de 5.4% del PIB y una deuda cercana a 119%. Según Δd = (r − g)d/(1 + g) − pb, con deuda tan alta cualquier aumento de r se amplifica: cada punto de r − g exige más de un punto de balance primario. La lecture muestra que las tasas francesas se acercaron a 5%, y que la prima sobre Alemania alcanzó máximos de años. Con crecimiento débil, Francia tiene r − g desfavorable y un déficit primario, las dos llaves abiertas. Además, tiene muchos vencimientos por refinanciar, de modo que las tasas altas se trasladan gradualmente a su factura.

Aquí entra el dilema que el profe llamó "bonos y barricadas". Lo sensato financieramente es reducir el gasto. Pero, como preguntó en clase: ¿quieres menos gasto en escuelas, una pensión más tardía, menos subsidio a la energía? La gente responde en la calle, como ocurrió en octubre. Y los vigilantes de bonos responden en el mercado si no se ajusta. El gobierno está entre ambos, sin mayoría, y la política fiscal depende del Congreso.

El multiplicador añade una trampa. Un ajuste abrupto reduce la demanda: si el multiplicador es cercano a 1 o mayor con una economía débil, recortar baja g, lo que empeora la razón. Fue la experiencia de la austeridad en EUA de 2013, que restó cerca de 1.5 puntos al crecimiento. Por eso importa la gradualidad y la composición: conviene un plan creíble de mediano plazo más que recortes rápidos.

Francia, además, no puede devaluar ni imprimir por su cuenta dentro del euro, igual que Grecia en el caso de Roscini y Schlefer, aunque su economía sea mucho mayor. La lección para México es directa: lo que define la sostenibilidad no es sólo la deuda, sino la capacidad política de sostener el balance primario. Vigilaría la aprobación del presupuesto y el diferencial frente a Alemania.`,
    },
  );

  // ---------------------------------------------------------------- repaso
  E.repaso.push({
    topic: 'S3', icon: '🏛️', title: 'S3 · Política fiscal',
    items: [
      ['Idea central', 'Fiscal y monetaria suavizan los ciclos alrededor de la tendencia de Solow; fiscal es poderosa y politizada.'],
      ['Keynes', 'En crisis, C, I y X no reaccionan; sólo queda G. Da el marco teórico al New Deal.'],
      ['Multiplicador', 'ΔY = ΔG / (1 − c). Con c = 0.8 es 5; con c = 0.7 es 3.33.'],
      ['Mecanismo', 'El ingreso de uno es el gasto del otro; rondas 1, 0.8, 0.64…'],
      ['Evidencia', '0.6–1.2 en tiempos normales (hay crowding out); 1.5–2.5 en recesión con tasas en cero.'],
      ['Fugas', 'Ahorro, importaciones e impuestos reducen el multiplicador. Cheques ahorrados en COVID: c baja.'],
      ['Identidad', 'S − I = (G − T) + (X − M): ¿quién es el gastador de la familia?'],
      ['Déficit vs deuda', 'Flujo anual vs saldo acumulado: como el mes y el saldo de tu tarjeta.'],
      ['Dinámica', 'Δd = (r − g)·d/(1 + g) − pb. Sube con r y déficit; baja con g y superávit.'],
      ['Estabilizador', 'pb* = (r − g)·d/(1 + g). Si r > g, hace falta superávit; si r < g, se tolera déficit.'],
      ['Fórmula del caso', 'Δb = x + b·i − b·π − b·g + b·α·ε; depreciación pesa con deuda en moneda extranjera.'],
      ['Grecia vs Japón', 'Importa la trayectoria y la confianza, no el nivel. Grecia sin inflación ni moneda propia.'],
      ['Monetización', 'Si nadie financia, el banco central imprime y viene inflación (Argentina, clase 21-oct).'],
      ['Rigideces', 'Pensiones, salud, defensa, energía, intereses y empresas públicas (Pemex): el gasto no baja solo.'],
    ],
  });
})();
