// Sección 50 — S5 Regímenes de tipo de cambio: trilema, fijo vs flexible, ataques especulativos, carry trade.
// Casos: Mexico: The Tequila Crisis 1994–95 (Pill); Sachs, Tornell y Velasco (1996). Clases 26-oct, 28-oct y 21-oct.
(function () {
  const F = E.fmt;

  // ---------------------------------------------------------------- datos de 1994 (lámina IV.9: FMI IFS vía FRED; STV 1996)
  const MES_R = ['Dic 93', 'Ene 94', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene 95'];
  const RES_R = [null, 26.6, 29.3, 25.9, 17.7, 17.4, 16.5, 16.7, 17.1, 16.4, 17.7, 12.9, 6.3, 4.4];
  const TES_R = [1.2, null, null, null, null, null, null, null, 13.5, null, null, 15.5, 17.8, null];

  // ---------------------------------------------------------------- laboratorio 1: trilema
  const COR = { F: 'Tipo de cambio fijo', K: 'Capital libre', A: 'Política monetaria propia' };
  const LADOS = {
    FK: { reg: 'Fijo duro: caja de conversión o unión monetaria', pierdes: 'A', por: 'Con capital libre y paridad creíble, la paridad descubierta obliga a i = i*. Tu tasa la pone Alemania o Estados Unidos.', ej: 'Patrón oro, euro, Hong Kong, Argentina 1991–2001' },
    FA: { reg: 'Fijo con controles de capital', pierdes: 'K', por: 'Puedes fijar la paridad y tu tasa porque cierras la puerta: el arbitraje no puede mover dinero para igualar las tasas.', ej: 'Bretton Woods, China' },
    KA: { reg: 'Flotación', pierdes: 'F', por: 'Pones la tasa donde quieras y dejas abierta la cuenta de capital. El precio que se ajusta es el tipo de cambio, no las reservas.', ej: 'Estados Unidos, México desde 1995' },
  };
  const CASOS = [
    ['Bretton Woods', 'FA', '1944–71: paridades ajustables contra el dólar y dólar a US$35 la onza, con controles de capital. Cae cuando EUA imprime para pagar Vietnam, la inflación sube y Nixon cierra la ventana del oro en agosto de 1971.'],
    ['Hong Kong', 'FK', 'Caja de conversión a ≈7.8 por dólar. En junio de 2025 la autoridad monetaria compró HK$9.4 mil millones a 7.85, el límite débil de su banda, y el HIBOR subió: la tasa la decide la paridad, no Hong Kong (FT, en la lámina III.2).'],
    ['México hoy', 'KA', 'En sep-2026 la Fed subió 25 pb, Banxico se quedó en 6.50% y el peso absorbió ≈8% de depreciación. Las reservas siguieron en ≈US$258 mil millones: no hay paridad que defender.'],
    ['México 1994', 'FKA', 'Banda cambiaria, capital libre y además una tasa que Banxico no quería subir. La esterilización fue el intento de tener las tres esquinas; se pagó con reservas hasta que se acabaron.'],
    ['China', 'FA', 'Tipo de cambio administrado y tasas propias, posibles gracias a controles de capital. Matiz: no es un fijo puro, pero la lógica del trilema es la misma.'],
    ['Euro', 'FK', 'La paridad más fija que existe: moneda única. España o Italia no tienen tasa propia. Sus tasas convergieron a la alemana antes de 1999, y se separaron en 2012 cuando se dudó del euro: Grecia 29%, Alemania 1.2%.'],
    ['Argentina', 'FK', '1991–2001: convertibilidad con caja de conversión. Bajó la inflación, pero la salida en 2001–02 fue brutal. Desde abril de 2025 usa bandas, un régimen intermedio y aún con reservas limitadas.'],
    ['Patrón oro', 'FK', '1870s–1914: paridades fijas y capital móvil. El dinero dependía del oro disponible, sin margen para responder a una recesión. Por eso fue tan rígido.'],
  ];

  function triSvg(sel) {
    const on = (a, b) => sel.includes(a) && sel.includes(b);
    const tres = sel.length === 3;
    const side = (x1, y1, x2, y2, a, b, tx, ty, label, anchor) => {
      const act = on(a, b) && !tres;
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${tres ? 'sbad dash' : act ? 's1' : 'lnm'}" stroke-width="${act || tres ? 6 : 2}" fill="none"/><text x="${tx}" y="${ty}" text-anchor="${anchor}" font-size="13" font-weight="${act ? 700 : 400}" class="${act ? '' : 't2'}">${label}</text>`;
    };
    const cor = (k, x, y, ly) => {
      const s = sel.includes(k);
      return `<g data-c="${k}" tabindex="0" role="button" aria-pressed="${s}" aria-label="${COR[k]}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="27" class="${tres ? 'fbad' : s ? 'f1' : 'bd'}"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="19" font-weight="700" class="${s || tres ? 'tw' : ''}">${k === 'F' ? '€$' : k === 'K' ? '✈' : '%'}</text><text x="${x}" y="${ly}" text-anchor="middle" font-size="14" font-weight="700">${COR[k]}</text></g>`;
    };
    return `<svg class="ill" viewBox="-25 0 610 390" role="img" aria-label="Triángulo del trilema: solo puedes elegir dos de tres">
      ${side(280, 58, 76, 318, 'F', 'K', 150, 178, 'Caja / unión', 'end')}
      ${side(280, 58, 484, 318, 'F', 'A', 410, 178, 'Controles de capital', 'start')}
      ${side(76, 318, 484, 318, 'K', 'A', 280, 310, 'Flotación', 'middle')}
      ${tres ? '<text x="280" y="215" text-anchor="middle" font-size="26" font-weight="700" class="fbad">¡No se puede!</text><text x="280" y="240" text-anchor="middle" font-size="13" class="t2">se paga con reservas</text>' : ''}
      ${cor('F', 280, 58, 18)}${cor('K', 76, 318, 368)}${cor('A', 484, 318, 368)}
    </svg>`;
  }

  function labTrilema(root) {
    const box = root.querySelector('#lab-tri');
    box.innerHTML = `
      <div class="cols"><div id="tri-svg"></div><div>
        <p class="small muted" style="margin-top:0">Toca dos esquinas o elige un caso histórico.</p>
        <div class="btnrow" id="tri-c">${Object.keys(COR).map((k) => `<button class="btn sm" type="button" data-c="${k}">${COR[k]}</button>`).join('')}<button class="btn sm" type="button" id="tri-3">Quiero las tres</button></div>
        <div class="btnrow" id="tri-h">${CASOS.map((c, i) => `<button class="btn sm" type="button" data-i="${i}">${c[0]}</button>`).join('')}</div>
        <div class="interp" id="tri-read"></div>
      </div></div>`;
    let sel = ['K', 'A'], nota = null;
    const draw = () => {
      box.querySelector('#tri-svg').innerHTML = E.fig(triSvg(sel), 'Cada lado combina las dos esquinas que toca. La esquina opuesta es a lo que renuncias.');
      box.querySelectorAll('#tri-c button[data-c]').forEach((b) => b.classList.toggle('pri', sel.includes(b.dataset.c)));
      const r = box.querySelector('#tri-read');
      const pre = nota ? `<p style="margin:0 0 8px"><b>${nota[0]}.</b> ${nota[2]}</p>` : '';
      if (sel.length === 3) {
        r.innerHTML = `${pre}<b>Las tres esquinas no caben.</b> Con paridad fija y capital libre, una tasa distinta de i* mueve dinero hasta agotar las reservas o inundarte. Puedes esterilizar un rato (ΔMB ≈ 0, así que ΔR = −ΔNDA), pero cada dólar perdido se reemplaza con crédito interno. <b>México 1994</b> compró tiempo así: reservas de 29 a 6 mil millones de dólares.`;
      } else if (sel.length === 2) {
        const key = ['FK', 'FA', 'KA'].find((k) => sel.includes(k[0]) && sel.includes(k[1]));
        const L = LADOS[key];
        r.innerHTML = `${pre}<b>${COR[sel[0]]} + ${COR[sel[1]]}</b> → ${L.reg}.<br><b>Renuncias a: ${COR[L.pierdes]}.</b> ${L.por}<br><span class="small muted">Ejemplos: ${L.ej}.</span>`;
      } else {
        r.innerHTML = `${pre}Elige ${2 - sel.length} esquina${sel.length === 1 ? '' : 's'} más.`;
      }
    };
    const toggle = (k) => {
      nota = null;
      if (sel.includes(k)) sel = sel.filter((x) => x !== k);
      else sel = sel.length >= 2 ? [sel[sel.length - 1], k] : [...sel, k];
      draw();
    };
    box.addEventListener('click', (ev) => {
      const g = ev.target.closest('[data-c]');
      if (g) { toggle(g.dataset.c); return; }
      if (ev.target.closest('#tri-3')) { sel = ['F', 'K', 'A']; nota = null; draw(); return; }
      const h = ev.target.closest('#tri-h button');
      if (h) { const c = CASOS[+h.dataset.i]; sel = c[1].split(''); nota = c; draw(); }
    });
    box.addEventListener('keydown', (ev) => {
      const g = ev.target.closest('g[data-c]');
      if (g && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); toggle(g.dataset.c); }
    });
    draw();
  }

  // ---------------------------------------------------------------- laboratorio 2: ataque especulativo (dos mundos)
  const MES = ['Ene 94', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene 95', 'Feb 95', 'Mar 95'];
  const REAL = [26.6, 29.3, 25.9, 17.7, 17.4, 16.5, 16.7, 17.1, 16.4, 17.7, 12.9, 6.3, 4.4, null, null];
  const PISO = 5, IED = 11, TAU0 = 1.2, BETA = 0.25, EPEG = 3.45, EPOST = 7.6, PI = 7;
  // Identidad: ΔR = CA + FA. FA = IED + flujo por diferencial de tasas − salida de capitales + tesobonos nuevos.
  function sim(p) {
    const base = (IED - p.cad) / 12 - p.sal + BETA * (p.i - p.ist - p.prima);
    const run = (panico) => {
      let R = p.R0, T = TAU0, dead = null, amort = 0; const rs = [], ts = [];
      for (let t = 0; t < MES.length; t++) {
        if (dead !== null) { rs.push(null); ts.push(null); continue; }
        if (panico && t === p.m) amort = T / p.plazo;
        if (panico && t >= p.m) { const a = Math.min(T, amort); R += base - a; T -= a; }
        else { R += base + p.em; T += p.em; }
        rs.push(Math.max(R, 0)); ts.push(T);
        if (R < PISO) dead = t;
      }
      return { rs, ts, dead };
    };
    const w1 = run(false), w2 = run(true);
    const zona = w1.dead !== null ? 'inevitable' : w2.dead !== null ? 'multi' : 'seguro';
    let ix = Math.max(p.m - 1, 0);
    while (ix > 0 && w1.rs[ix] === null) ix--;
    const Rm = w1.rs[ix] !== null ? w1.rs[ix] : 0, Tm = w1.ts[ix] !== null ? w1.ts[ix] : 0;
    const net = base + p.em;
    return { base, net, w1, w2, zona, Rm, Tm, ratio: Rm > 0 ? Tm / Rm : Infinity, vida: net < 0 ? Math.max(Rm - PISO, 0) / -net : Infinity };
  }
  // Se expone para poder verificar la matemática desde la consola.
  E._simCambio = sim;

  const DEF_ATQ = { R0: 29, em: 1.4, plazo: 3, cad: 29, sal: 1.4, i: 14.8, ist: 5.8, prima: 9, m: 11 };
  const PRE_ATQ = [
    ['México 1994', DEF_ATQ],
    ['Sin tesobonos', { ...DEF_ATQ, em: 0 }],
    ['Fed más agresiva', { ...DEF_ATQ, ist: 8 }],
    ['Subir la tasa a 25%', { ...DEF_ATQ, i: 25 }],
    ['Deuda a 2 años', { ...DEF_ATQ, plazo: 24 }],
    ['Ajuste temprano', { ...DEF_ATQ, em: 0, cad: 12, sal: 0.5 }],
    ['México hoy (ilustrativo)', { R0: 258, em: 0, plazo: 24, cad: 9, sal: 0, i: 6.5, ist: 3.9, prima: 2.7, m: 11 }],
  ];

  function labAtaque(root) {
    const box = root.querySelector('#lab-atq');
    box.innerHTML = `
      <div class="btnrow" id="atq-pre">${PRE_ATQ.map((x, i) => `<button class="btn sm" type="button" data-i="${i}">${x[0]}</button>`).join('')}</div>
      <div class="cols"><div id="atq-k"></div><div>
        <div class="chart h360" id="atq-c1"></div><p class="small muted" style="margin:2px 0 8px">Montos en miles de millones de dólares (mm). La línea punteada gris son las reservas reales de 1994.</p>
        <div class="chart h220" id="atq-c2"></div>
      </div></div>
      <div id="atq-t" style="margin-top:12px"></div>
      <div class="interp" id="atq-read"></div>`;
    let st = { ...DEF_ATQ };
    const c1 = E.chart(box.querySelector('#atq-c1'), (T) => {
      const s = sim(st);
      return { ...E.baseOpt(T), grid: { left: 8, right: 16, top: box.clientWidth < 560 ? 100 : 68, bottom: 8, containLabel: true }, tooltip: { ...E.baseOpt(T).tooltip, valueFormatter: (v) => (v === null || v === undefined ? '—' : F.n(v, 1) + ' mm') },
        xAxis: E.axisCat(MES, T, { axisLabel: { color: T.ink2, fontSize: 11, interval: 1 } }), yAxis: E.axisVal(T, (v) => v),
        series: [
          { name: 'Reservas: todos renuevan', type: 'line', data: s.w1.rs, lineStyle: { color: T.c1, width: 3 }, itemStyle: { color: T.c1 }, symbolSize: 5, markLine: { silent: true, symbol: 'none', lineStyle: { color: T.bad, type: 'dashed' }, label: { color: T.bad, formatter: 'piso operativo', position: 'insideEndTop', fontSize: 11 }, data: [{ yAxis: PISO }] } },
          { name: 'Reservas: nadie renueva', type: 'line', data: s.w2.rs, lineStyle: { color: T.c2, width: 3 }, itemStyle: { color: T.c2 }, symbolSize: 5 },
          { name: 'Tesobonos', type: 'line', data: s.w1.ts, lineStyle: { color: T.c3, width: 2, type: 'dashed' }, itemStyle: { color: T.c3 }, symbolSize: 3 },
          { name: 'Reservas reales 1994', type: 'line', data: REAL, lineStyle: { color: T.muted, width: 1.5, type: 'dotted' }, itemStyle: { color: T.muted }, symbolSize: 3 },
        ] };
    });
    const c2 = E.chart(box.querySelector('#atq-c2'), (T) => {
      const s = sim(st);
      const ra = s.w1.rs.map((r, i) => (r === null ? null : r > 0 ? Math.min(s.w1.ts[i] / r, 8) : 8));
      return { ...E.baseOpt(T), legend: { show: false }, grid: { left: 8, right: 16, top: 30, bottom: 8, containLabel: true }, tooltip: { ...E.baseOpt(T).tooltip, valueFormatter: (v) => (v === null || v === undefined ? '—' : F.x(v, 2)) },
        title: { text: 'Vulnerabilidad: tesobonos ÷ reservas', left: 0, top: 0, textStyle: { color: T.ink, fontSize: 13, fontWeight: 600 } },
        xAxis: E.axisCat(MES, T, { axisLabel: { color: T.ink2, fontSize: 11, interval: 1 } }), yAxis: E.axisVal(T, (v) => v + 'x'),
        series: [{ name: 'Tesobonos ÷ reservas', type: 'bar', data: ra, itemStyle: { color: T.c4 }, barMaxWidth: 22, markLine: { silent: true, symbol: 'none', lineStyle: { color: T.bad, type: 'dashed' }, label: { color: T.bad, formatter: '1x', fontSize: 11 }, data: [{ yAxis: 1 }] } }] };
    });
    const paint = () => {
      c1.refresh(); c2.refresh();
      const s = sim(st), impl = (1 + st.i / 100) / (1 + st.ist / 100) - 1, real = st.i - PI;
      const cae = (w) => (w.dead === null ? 'no cae' : MES[w.dead]);
      E.tiles(box.querySelector('#atq-t'), [
        { label: 'Tipo de cambio fijo', v: EPEG, fmt: 'n', dec: 2, note: s.zona === 'seguro' ? 'la paridad aguanta en ambos mundos' : s.w1.dead === null ? `aguanta si renuevan; se rompe en ${cae(s.w2)} si no` : `se rompe en ${cae(s.w1)} aunque renueven` },
        { label: 'Tesobonos ÷ reservas', v: s.ratio, fmt: 'x', dec: 2, hl: true, note: `antes del pánico: US$${F.n(s.Tm, 1)} vs US$${F.n(s.Rm, 1)} mm` },
        { label: 'Meses de vida si renuevan', v: isFinite(s.vida) ? s.vida : null, fmt: 'n', dec: 1, note: isFinite(s.vida) ? 'reservas sobre el piso ÷ pérdida mensual' : 'no se pierden reservas' },
        { label: 'Depreciación implícita (UIP)', v: impl, fmt: 'pct', dec: 1, note: impl > 0.046 ? 'mayor que el deslizamiento máximo de 4.6%' : 'dentro del deslizamiento máximo de 4.6%' },
        { label: 'Tasa real (Fisher)', v: real / 100, fmt: 'pct', dec: 1, note: real > 9 ? 'altísima: la cartera vencida se dispara' : real >= 5 ? 'ya alta para bancos frágiles' : 'margen para los bancos' },
        { label: 'Tesobonos en pesos si E = 7.60', v: EPOST / EPEG, fmt: 'x', dec: 2, note: 'mismos dólares, más pesos: ê·b<sub>F</sub>' },
      ]);
      const zona = {
        multi: `<b>Dos equilibrios: aquí vive el pánico autocumplido.</b> Si todos renuevan, las reservas aguantan hasta marzo de 1995 o más. Si nadie renueva desde ${MES[st.m]}, vencen ≈US$${F.n(s.Tm / st.plazo, 1)} mil millones al mes y el piso se rompe en ${cae(s.w2)}. Ambos resultados son racionales: nada en los fundamentos elige entre ellos, solo lo que cada inversionista cree que harán los demás.`,
        inevitable: `<b>Un solo equilibrio, y es malo.</b> Aun con todos renovando, las reservas rompen el piso en ${cae(s.w1)}: la pérdida mensual es de US$${F.n(-s.net, 1)} mil millones. Esto ya no es pánico sino la lógica de primera generación: el flujo no cierra y la paridad tiene fecha de caducidad.`,
        seguro: `<b>Un solo equilibrio, y es bueno.</b> Aunque nadie renueve desde ${MES[st.m]}, las reservas siguen sobre el piso, así que no tiene sentido correr primero. Por eso una reserva amplia o poca deuda de corto plazo en dólares quitan el incentivo al ataque.`,
      }[s.zona];
      const banco = real > 9 ? ` <b>Ojo:</b> con tasa real de ${F.n(real, 1)}% salvas reservas a costa de los bancos. Es el dilema de 1994: un instrumento, dos objetivos.` : '';
      const teso = st.em === 0 && s.w1.dead !== null ? ' Sin tesobonos, las reservas caen antes: esa fue justamente su ventaja, compraron tiempo.' : '';
      box.querySelector('#atq-read').innerHTML = zona + banco + teso;
    };
    const defs = [
      { k: 'R0', label: 'Reservas iniciales (US$ mm)', min: 5, max: 260, step: 1, v: st.R0, fmt: 'n', dec: 0, hint: 'Colchón para defender la paridad' },
      { k: 'em', label: 'Tesobonos nuevos por mes (US$ mm)', min: 0, max: 4, step: 0.1, v: st.em, fmt: 'n', dec: 1, hint: 'Traen dólares hoy y crean deuda en dólares' },
      { k: 'plazo', label: 'Plazo de la deuda (meses)', min: 1, max: 24, step: 1, v: st.plazo, fmt: 'n', dec: 0, hint: 'Tesobonos reales: 3 meses' },
      { k: 'cad', label: 'Déficit de cuenta corriente (US$ mm al año)', min: 0, max: 45, step: 1, v: st.cad, fmt: 'n', dec: 0 },
      { k: 'sal', label: 'Salida de capitales (US$ mm al mes)', min: 0, max: 5, step: 0.1, v: st.sal, fmt: 'n', dec: 1, hint: 'Colosio, Ruiz Massieu, Fed' },
      { k: 'i', label: 'Tasa Cetes, i (%)', min: 5, max: 40, step: 0.1, v: st.i, fmt: 'n', dec: 1 },
      { k: 'ist', label: 'Tasa de EUA, i* (%)', min: 0, max: 12, step: 0.1, v: st.ist, fmt: 'n', dec: 1 },
      { k: 'prima', label: 'Prima exigida, δ + ρ (pp)', min: 0, max: 30, step: 0.1, v: st.prima, fmt: 'n', dec: 1, hint: 'Sube cuando se pierde credibilidad' },
      { k: 'm', label: 'Mes del pánico (índice: 0 = ene-94, 11 = dic-94)', min: 0, max: 14, step: 1, v: st.m, fmt: 'n', dec: 0 },
    ];
    const kn = E.knobs(box.querySelector('#atq-k'), defs, (v) => { st = v; paint(); }, { title: '🎛️ Palancas del ataque' });
    box.querySelector('#atq-pre').addEventListener('click', (ev) => { const b = ev.target.closest('button'); if (b) kn.set(PRE_ATQ[+b.dataset.i][1]); });
  }

  // ---------------------------------------------------------------- laboratorio 3: tipo de cambio real
  const PILL_RER = [100, 93.0, 82.2, 74.6, 69.8]; // Exh. 9, base CPI vs EUA, reescalado 1989 = 100 (107.5, 100, 88.4, 80.2, 75.0)
  const DEF_RER = { pm: 0.169, pu: 0.038, d: 0.042, n: 4 };
  const PRE_RER = [
    ['México 1989–93', DEF_RER],
    ['Ejemplo de clase: 10% vs 5%, fijo', { pm: 0.1, pu: 0.05, d: 0, n: 4 }],
    ['Fijo con inflación alta', { pm: 0.2, pu: 0.05, d: 0, n: 6 }],
    ['Flotación que compensa', { pm: 0.1, pu: 0.05, d: 0.048, n: 4 }],
    ['México 2026 (≈)', { pm: 0.036, pu: 0.034, d: 0, n: 4 }],
  ];
  function labRer(root) {
    const box = root.querySelector('#lab-rer');
    box.innerHTML = `<div class="btnrow" id="rer-pre">${PRE_RER.map((x, i) => `<button class="btn sm" type="button" data-i="${i}">${x[0]}</button>`).join('')}</div>
      <div class="cols"><div id="rer-k"></div><div class="chart h360" id="rer-c"></div></div>
      <div id="rer-t" style="margin-top:12px"></div><div class="interp" id="rer-read"></div>`;
    let st = { ...DEF_RER };
    const series = () => { const g = ((1 + st.d) * (1 + st.pu)) / (1 + st.pm); return Array.from({ length: st.n + 1 }, (_, t) => 100 * Math.pow(g, t)); };
    const chart = E.chart(box.querySelector('#rer-c'), (T) => {
      const e = series(), lab = e.map((_, i) => 'Año ' + i);
      return { ...E.baseOpt(T), grid: { left: 8, right: 16, top: box.clientWidth < 560 ? 120 : 84, bottom: 8, containLabel: true }, tooltip: { ...E.baseOpt(T).tooltip, valueFormatter: (v) => (v === null || v === undefined ? '—' : F.n(v, 1)) },
        xAxis: E.axisCat(lab, T), yAxis: E.axisVal(T, (v) => v, { min: (v) => Math.floor(Math.min(v.min, 60) / 10) * 10 }),
        series: [
          { name: 'Tipo de cambio real (caída = apreciación)', type: 'line', data: e, lineStyle: { color: T.c1, width: 3 }, itemStyle: { color: T.c1 }, markLine: { silent: true, symbol: 'none', lineStyle: { color: T.axis, type: 'dashed' }, label: { show: false }, data: [{ yAxis: 100 }] } },
          { name: 'Precio relativo del coche mexicano, en dólares', type: 'line', data: e.map((v) => 10000 / v), lineStyle: { color: T.c2, width: 2 }, itemStyle: { color: T.c2 } },
          { name: 'México real, CPI vs EUA (Pill, Exh. 9; 1989 = 100)', type: 'line', data: lab.map((_, i) => (i < PILL_RER.length ? PILL_RER[i] : null)), lineStyle: { color: T.muted, width: 1.5, type: 'dotted' }, itemStyle: { color: T.muted }, symbolSize: 4 },
        ] };
    });
    const paint = () => {
      chart.refresh();
      const e = series(), fin = e[e.length - 1], apr = 1 - fin / 100, sobre = 100 / fin - 1, nec = (1 + st.pm) / (1 + st.pu) - 1, brecha = st.d - nec;
      E.tiles(box.querySelector('#rer-t'), [
        { label: 'Apreciación real acumulada', v: apr, fmt: 'pct', dec: 1, hl: true, note: apr > 0 ? 'el peso se encarece' : 'el peso se abarata' },
        { label: 'Sobreprecio del producto mexicano', v: sobre, fmt: 'pct', dec: 1, note: `coche de US$100 → US$${F.n(100 + sobre * 100, 0)}` },
        { label: 'Depreciación anual que mantiene ε', v: nec, fmt: 'pct', dec: 1, note: '(1 + π) ÷ (1 + π*) − 1' },
        { label: 'Corrección de una sola vez', v: sobre, fmt: 'pct', dec: 1, note: 'subida de E que regresa ε a 100, sin contar traspaso a precios' },
      ]);
      let t;
      if (Math.abs(brecha) < 0.003) t = `El tipo de cambio nominal compensa la diferencia de inflaciones: ε casi no se mueve. Esta es la ventaja de la flotación: <b>la competitividad se corrige sola</b>, con el costo de la volatilidad y del traspaso a precios.`;
      else if (brecha < 0) t = `Con inflación de ${F.pct(st.pm, 1)} en México y ${F.pct(st.pu, 1)} en EUA, haría falta depreciar ${F.pct(nec, 1)} al año, y el tipo solo se mueve ${F.pct(st.d, 1)}. En ${st.n} años, <b>el peso se aprecia ${F.pct(apr, 1)} en términos reales</b>: las exportaciones se encarecen, las importaciones se abaratan y (X − M) empeora. ${apr >= 0.2 ? 'Es del tamaño de lo que Dornbusch y Werner llamaban sobrevaluación (≈20%).' : 'Todavía es menor que el ≈20% de sobrevaluación que señalaban Dornbusch y Werner en 1994.'}`;
      else t = `El tipo se deprecia más rápido (${F.pct(st.d, 1)}) que la diferencia de inflaciones (${F.pct(nec, 1)}): <b>el peso se abarata en términos reales</b>. Ganas competitividad, pero presionas la inflación por el traspaso. Fue el dilema de 1982 en adelante: tipo de cambio → precios → salarios → otra devaluación.`;
      box.querySelector('#rer-read').innerHTML = t;
    };
    const kn = E.knobs(box.querySelector('#rer-k'), [
      { k: 'pm', label: 'Inflación en México, π', min: 0, max: 0.4, step: 0.001, v: st.pm, fmt: 'pct', dec: 1 },
      { k: 'pu', label: 'Inflación en EUA, π*', min: 0, max: 0.15, step: 0.001, v: st.pu, fmt: 'pct', dec: 1 },
      { k: 'd', label: 'Deslizamiento nominal del peso, por año', min: 0, max: 0.3, step: 0.001, v: st.d, fmt: 'pct', dec: 1, hint: '0% = fijo. Banda de 1991–94: techo ≈2.3% a 4.6%' },
      { k: 'n', label: 'Años', min: 1, max: 10, step: 1, v: st.n, fmt: 'n', dec: 0 },
    ], (v) => { st = v; paint(); }, { title: '🎛️ Inflaciones y tipo de cambio' });
    box.querySelector('#rer-pre').addEventListener('click', (ev) => { const b = ev.target.closest('button'); if (b) kn.set(PRE_RER[+b.dataset.i][1]); });
  }

  // ---------------------------------------------------------------- ilustraciones
  const svgUip = `<svg class="ill" viewBox="0 0 600 220" role="img" aria-label="Con paridad creíble el dinero fluye a la tasa alta hasta igualar tasas">
    <rect x="20" y="40" width="170" height="130" rx="12" class="w2"/><text x="105" y="72" text-anchor="middle" font-size="15" font-weight="700">México</text><text x="105" y="112" text-anchor="middle" font-size="30" font-weight="700">7%</text><text x="105" y="146" text-anchor="middle" font-size="12" class="t2">baja al entrar dinero</text>
    <rect x="410" y="40" width="170" height="130" rx="12" class="w1"/><text x="495" y="72" text-anchor="middle" font-size="15" font-weight="700">Estados Unidos</text><text x="495" y="112" text-anchor="middle" font-size="30" font-weight="700">4%</text><text x="495" y="146" text-anchor="middle" font-size="12" class="t2">i* la pone la Fed</text>
    <path d="M405 85 H200" class="ln anim-flow"/><path d="M212 77 L198 85 L212 93" class="ln"/><text x="300" y="72" text-anchor="middle" font-size="13" font-weight="700">capital busca el 7%</text>
    <text x="300" y="112" text-anchor="middle" font-size="13">paridad fija y creíble:</text><text x="300" y="132" text-anchor="middle" font-size="13">sin riesgo cambiario</text>
    <text x="300" y="204" text-anchor="middle" font-size="15" font-weight="700">El arbitraje termina solo cuando i = i* (4%)</text></svg>`;
  const svgSpec = `<svg class="ill" viewBox="0 0 640 170" role="img" aria-label="Espectro de regímenes, de flotación libre a unión monetaria">
    ${['Flotación libre', 'Flotación sucia', 'Banda', 'Tablita', 'Fijo', 'Caja', 'Dólar', 'Unión'].map((t, i) => `<rect x="${10 + i * 78}" y="54" width="74" height="44" rx="6" class="f${(i % 8) + 1}"/><text x="${47 + i * 78}" y="${t.length > 8 ? 74 : 81}" text-anchor="middle" font-size="12" font-weight="700" class="tw">${t.split(' ')[0]}</text>${t.length > 8 ? `<text x="${47 + i * 78}" y="90" text-anchor="middle" font-size="12" font-weight="700" class="tw">${t.split(' ')[1]}</text>` : ''}`).join('')}
    <text x="10" y="36" font-size="13" font-weight="700">← más autonomía; ajusta el tipo de cambio</text><text x="630" y="36" text-anchor="end" font-size="13" font-weight="700">más compromiso; ajustan reservas, precios y PIB →</text>
    <text x="47" y="122" text-anchor="middle" font-size="11" class="t2">EUA, Japón</text><text x="125" y="122" text-anchor="middle" font-size="11" class="t2">emergentes</text><text x="203" y="122" text-anchor="middle" font-size="11" class="t2">Méx 91–94</text><text x="281" y="122" text-anchor="middle" font-size="11" class="t2">Méx 89–91</text><text x="359" y="122" text-anchor="middle" font-size="11" class="t2">Arabia Saudita</text><text x="437" y="122" text-anchor="middle" font-size="11" class="t2">Hong Kong</text><text x="515" y="122" text-anchor="middle" font-size="11" class="t2">Ecuador</text><text x="593" y="122" text-anchor="middle" font-size="11" class="t2">Eurozona</text>
    <text x="320" y="156" text-anchor="middle" font-size="13" class="t2">FMI, abril 2025: 49% anclas blandas · 31% flotación · 14% anclas duras</text></svg>`;
  const svgTanque = `<svg class="ill" viewBox="0 0 620 270" role="img" aria-label="Los tesobonos que vencen superan a las reservas: si no renuevan, el tanque se vacía">
    <text x="120" y="24" text-anchor="middle" font-size="14" font-weight="700">Reservas, dic-94</text>
    <rect x="60" y="36" width="120" height="190" rx="10" class="bd"/><rect x="66" y="172" width="108" height="48" rx="6" class="f1"/><text x="120" y="202" text-anchor="middle" font-size="16" font-weight="700" class="tw">≈ 6</text>
    <text x="120" y="252" text-anchor="middle" font-size="12" class="t2">cayeron desde 29 (feb)</text>
    <text x="500" y="24" text-anchor="middle" font-size="14" font-weight="700">Tesobonos que vencen</text>
    <rect x="440" y="36" width="120" height="190" rx="10" class="bd"/><rect x="446" y="60" width="108" height="160" rx="6" class="f2"/><text x="500" y="146" text-anchor="middle" font-size="18" font-weight="700" class="tw">17.8</text>
    <text x="500" y="252" text-anchor="middle" font-size="12" class="t2">vencen cada ≈3 meses</text>
    <path d="M185 196 H435" class="ln anim-flow"/><path d="M423 188 L437 196 L423 204" class="ln"/>
    <text x="310" y="104" text-anchor="middle" font-size="15" font-weight="700">¿Me renuevas?</text>
    <text x="310" y="132" text-anchor="middle" font-size="13">Sí: no pasa nada.</text><text x="310" y="154" text-anchor="middle" font-size="13">No: faltan US$12 mil millones</text>
    <text x="310" y="222" text-anchor="middle" font-size="12" class="t2">dólares que no hay</text></svg>`;
  const svgCarry = `<svg class="ill" viewBox="0 0 640 190" role="img" aria-label="Carry trade: pides prestado barato, compras la moneda con tasa alta y regresas">
    <rect x="10" y="50" width="150" height="74" rx="10" class="w1"/><text x="85" y="80" text-anchor="middle" font-size="14" font-weight="700">1. Pides en yenes</text><text x="85" y="104" text-anchor="middle" font-size="13">costo ≈ tasa baja</text>
    <rect x="245" y="50" width="150" height="74" rx="10" class="w2"/><text x="320" y="80" text-anchor="middle" font-size="14" font-weight="700">2. Compras pesos</text><text x="320" y="104" text-anchor="middle" font-size="13">ganas tasa alta</text>
    <rect x="480" y="50" width="150" height="74" rx="10" class="w4"/><text x="555" y="80" text-anchor="middle" font-size="14" font-weight="700">3. Regresas</text><text x="555" y="104" text-anchor="middle" font-size="13">¿cómo quedó el TC?</text>
    <path d="M165 87 H238" class="ln anim-flow"/><path d="M228 79 L240 87 L228 95" class="ln"/><path d="M400 87 H473" class="ln anim-flow"/><path d="M463 79 L475 87 L463 95" class="ln"/>
    <text x="320" y="166" text-anchor="middle" font-size="14" font-weight="700">Ganancia = tasa local ± movimiento del tipo de cambio − costo de fondeo</text></svg>`;
  const svgDos = `<svg class="ill" viewBox="0 0 640 230" role="img" aria-label="Dos mundos: con los mismos fundamentos, todos renuevan o todos salen">
    <rect x="240" y="84" width="160" height="62" rx="10" class="bd"/><text x="320" y="110" text-anchor="middle" font-size="13" font-weight="700">Mismos fundamentos</text><text x="320" y="130" text-anchor="middle" font-size="12" class="t2">deuda 34% del PIB, sin déficit</text>
    <path d="M400 104 L456 58" class="ln"/><path d="M400 128 L456 174" class="ln"/><path d="M240 115 H180" class="ln"/><text x="210" y="105" text-anchor="middle" font-size="11" class="t2">creer</text>
    <rect x="460" y="18" width="170" height="80" rx="10" class="w5"/><text x="545" y="44" text-anchor="middle" font-size="14" font-weight="700">Mundo 1</text><text x="545" y="64" text-anchor="middle" font-size="12">creo que renuevan → renuevo</text><text x="545" y="84" text-anchor="middle" font-size="12">la deuda se paga</text>
    <rect x="460" y="132" width="170" height="80" rx="10" class="w2"/><text x="545" y="158" text-anchor="middle" font-size="14" font-weight="700">Mundo 2</text><text x="545" y="178" text-anchor="middle" font-size="12">creo que salen → salgo</text><text x="545" y="198" text-anchor="middle" font-size="12">no hay dólares: colapso</text>
    <rect x="10" y="84" width="170" height="62" rx="10" class="w4"/><text x="95" y="110" text-anchor="middle" font-size="13" font-weight="700">¿Qué harán los demás?</text><text x="95" y="130" text-anchor="middle" font-size="12" class="t2">eso decide, no el balance</text></svg>`;
  const svgCoche = `<svg class="ill" viewBox="0 0 600 180" role="img" aria-label="Con tipo de cambio fijo y más inflación en México, el coche mexicano se encarece en dólares">
    <text x="20" y="28" font-size="14" font-weight="700">Hoy, E fijo</text><rect x="20" y="42" width="240" height="30" rx="5" class="f2"/><text x="30" y="62" font-size="13" font-weight="700" class="tw">Coche mexicano: US$100</text><rect x="20" y="82" width="240" height="30" rx="5" class="f1"/><text x="30" y="102" font-size="13" font-weight="700" class="tw">Coche de EUA: US$100</text>
    <text x="330" y="28" font-size="14" font-weight="700">En un año: π 10%, π* 5%</text><rect x="330" y="42" width="255" height="30" rx="5" class="f2"/><text x="340" y="62" font-size="13" font-weight="700" class="tw">Coche mexicano: US$110</text><rect x="330" y="82" width="243" height="30" rx="5" class="f1"/><text x="340" y="102" font-size="13" font-weight="700" class="tw">Coche de EUA: US$105</text>
    <text x="300" y="150" text-anchor="middle" font-size="14" font-weight="700">ε = E · P* / P cae: apreciación real sin que E se mueva</text>
    <text x="300" y="172" text-anchor="middle" font-size="12" class="t2">para compensar, E tendría que subir ≈5% al año</text></svg>`;

  // ---------------------------------------------------------------- sección
  E.section({
    id: 'cambio', n: 50, group: 'temas', icon: '💱', short: 'S5 · Tipo de cambio', exam: 'star',
    kicker: 'S5 · Regímenes de tipo de cambio',
    title: 'Tipo de cambio: el trilema y la crisis del Tequila',
    lead: 'El profe llamó al trilema el concepto más importante del tema, y el caso de México reúne todas las herramientas del curso. Si dominas esta sección, tienes un ensayo de caso muy probable y varias preguntas de opción múltiple.',
    render(root) {
      root.innerHTML = `
      <style>.sx-cam .interp{font-size:15px;line-height:1.5;margin-top:10px;padding:12px 14px;border-radius:10px;background:var(--surface);border:1px solid var(--line)}.sx-cam .ill{color:var(--accent)}.sx-cam .ill .fbad{fill:var(--bad)}.sx-cam #tri-c .btn.pri{outline:none}.sx-cam h2{margin-top:30px}.sx-cam .cols{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:22px;align-items:start}@media(max-width:900px){.sx-cam .cols,.sx-cam .concept .cols{grid-template-columns:minmax(0,1fr)}}.sx-cam g[data-c]:focus-visible{outline:2px solid var(--accent)}</style>
      <div class="sx-cam">
      <h2>1. La historia que tienes que saber contar</h2>
      <p class="prose">El profe califica la narrativa causal. Cada régimen resolvió un problema y creó el siguiente:</p>
      ${E.tip('Lo contó desde su propia historia: cuando empezó en economía, en México había devaluaciones cada seis años e inflación de ≈80%, y jamás pensó ver una inflación de ≈4%. Su punto: la estabilidad se logró, pero no bastó para crecer. Ese es el reto que le deja a tu generación.', 'Clase 1')}
      ${E.timeline([
        { y: '1870s', t: 'Patrón oro: paridades fijas y capital libre', d: 'El dinero dependía del oro, y los déficits se pagaban enviándolo. Muy rígido → por eso se derrumba con las guerras.' },
        { y: '1944', t: 'Bretton Woods: fijo, pero con controles de capital', d: 'El temor era la guerra de devaluaciones del periodo de entreguerras. Monedas contra el dólar y dólar contra oro a US$35. México fija 12.50 en 1954.' },
        { y: '1971–73', t: 'Nixon cierra la ventana del oro → flotación', d: 'Nadie limitaba cuántos dólares emitía EUA. Vietnam y el gasto social → inflación → el mundo duda del oro (dilema de Triffin). Sin ancla, las grandes monedas flotan.' },
        { y: '1976–82', t: 'México: gasto público contra una paridad', d: 'Déficit fiscal → crédito interno → pérdida de reservas → devaluación, justo antes de cada cambio de gobierno. En 1982, además, el petróleo y Volcker: deuda impagable, banca nacionalizada y espiral tipo de cambio–inflación.' },
        { y: '1987–93', t: 'El Pacto: ancla cambiaria y liberalización de capital', d: 'Fijar el tipo de cambio frena la inflación, y el Pacto coordina salarios y precios. Se abre la cuenta de capital → entra dinero → ahora sí aplica el trilema completo. Inflación de 159% a 8%, pero el peso se aprecia ≈30% en términos reales.' },
        { y: '1994', t: 'México intenta las tres esquinas y colapsa', d: 'Sube la Fed, matan a Colosio, sale capital. No sube tasas porque quebraría a los bancos y no devalúa por credibilidad. Esteriliza y emite tesobonos → iliquidez → corrida en diciembre.' },
        { y: '1995→', t: 'Lección: flotación, metas de inflación y reservas', d: 'Nunca más un tipo fijo. Banxico autónomo (1994), metas de inflación (2001), reservas de ≈US$257 mil millones y deuda larga en pesos.' },
        { y: 'Hoy', t: 'La volatilidad se mudó al peso y al carry trade', d: 'Un choque ya no quema reservas: mueve el tipo de cambio (≈22 pesos con Trump en 2016–17; ≈−6% tras la Fed de sep-2026). La prueba de credibilidad pasó de la banda a la inflación y la deuda.' },
      ])}
      ${E.note('La línea del tiempo de 1976 sigue las láminas (déficit fiscal y agotamiento de reservas). En el audio del 26-oct el profe menciona también el alza de tasas de EUA, que en las láminas corresponde sobre todo a 1982.', 'Cuidado con el audio')}

      <h2>2. Las herramientas</h2>
      ${E.concept({ id: 'trilema', title: 'Trilema: fijo, capital libre, autonomía. Elige dos', badge: 'star', html: `
        <div class="cols"><div>
          <p>Un país <b>no puede</b> tener a la vez tipo de cambio fijo, capital libre y política monetaria propia. Cada régimen es la decisión de a qué renunciar.</p>
          ${E.table([
            ['Fijo + capital libre', 'Política monetaria', 'Patrón oro, euro, Hong Kong'],
            ['Fijo + autonomía', 'Capital libre', 'Bretton Woods, China'],
            ['Capital libre + autonomía', 'Tipo de cambio fijo', 'EUA, México desde 1995'],
          ], { head: ['Eliges', 'Renuncias a', 'Ejemplos'] })}
          ${E.kid('Es como querer la casa siempre a 22 grados, las ventanas abiertas y no gastar en el clima. Con dos de tres se puede. Con las tres, el clima trabaja de más hasta que se funde.')}
        </div><div>
          ${E.tip('Lo presentó como el concepto más importante de todo el tema. Y aplicado a un país con tipo fijo: <q>si Estados Unidos sube la tasa, tú la tienes que subir</q>.', 'Clase 26-oct')}
          ${E.warn('Decir que México 1994 "tenía tipo fijo" y ya. Era una <b>banda</b> con capital libre, y el error fue querer además elegir la tasa. La esterilización fue ese intento de tener las tres.')}
          ${E.note('Rey (2013): aun flotando, el ciclo financiero global limita tu autonomía, de modo que sería "dilema, no trilema". Calvo y Reinhart (2002): muchos que dicen flotar intervienen por <b>miedo a flotar</b>, sobre todo si tienen deuda en dólares.', 'Matiz para subir de nivel')}
        </div></div>` })}

      ${E.concept({ id: 'uip-peg', title: 'Paridad descubierta: por qué una paridad creíble te obliga a i = i*', badge: 'in', html: `
        <div class="cols"><div>
          ${E.formula('Paridad descubierta', 'i', 'i* + (E<sup>e</sup> − E)/E + ρ', 'δ = probabilidad de devaluación × tamaño; ρ = prima de riesgo')}
          <p>Con paridad creíble, E<sup>e</sup> = E y ρ ≈ 0, así que <b>i = i*</b>. Si pagas más, entra capital, el banco central compra dólares, la base sube y la tasa baja. Si pagas menos, ocurre lo contrario. La tasa se importa.</p>
          ${E.fig(svgUip, 'El ejemplo de clase: México 7%, EUA 4%, sin riesgo cambiario.')}
        </div><div>
          ${E.kid('Dos bancos te garantizan el mismo dólar y uno paga más. Todos corren a ese banco, hasta que ya no necesita pagar más.')}
          ${E.tip('Usó la eurozona como prueba clínica: al anunciarse el euro desaparece el riesgo cambiario y las tasas convergen a la alemana. Cuando en la crisis griega se dudó del euro, se separan; con el rescate y la confianza, vuelven a converger.', 'Clase 26-oct')}
          ${E.key('Diciembre de 1994: Cetes 14.76% vs T-bills 5.79%. 1.1476 ÷ 1.0579 − 1 = <b>8.5% al año</b>, contra un deslizamiento máximo de 4.6%. El mercado ya descontaba una depreciación mayor que la que permitía la banda.', 'Termómetro de credibilidad')}
          ${E.warn('Leer el diferencial como pura "tasa atractiva". Es el premio por el riesgo de devaluación y de impago: el profe insiste en que lo pienses como inversionista.')}
        </div></div>` })}

      ${E.concept({ id: 'fijo-flex', title: 'Fijo vs flexible: credibilidad o flexibilidad', badge: 'star', html: `
        ${E.fig(svgSpec, 'No es blanco o negro: México ha pasado por casi todas las casillas desde 1954.', true)}
        <div class="cols"><div>
          ${E.table([
            ['Lo que ganas', 'Ancla nominal; baja la inflación y baja la tasa si eres creíble', 'Amortigua choques reales; tasa propia; sin ataques a una paridad'],
            ['Lo que pagas', 'Sin política monetaria; ataques especulativos; ajuste por PIB', 'Volatilidad y traspaso a precios; requiere instituciones'],
            ['Sirve si tu problema es', 'Falta de credibilidad; choques nominales', 'Choques reales; sector financiero con coberturas'],
          ], { head: ['', 'Tipo fijo', 'Flotación'] })}
          ${E.kid('El fijo es un cinturón muy apretado: te da disciplina, pero si comes de más revienta. La flotación es un resorte: se mueve mucho, pero rara vez se rompe.')}
        </div><div>
          ${E.tip('A la pregunta de cuál es mejor: <q>la respuesta es: depende</q>. Depende de qué le falta al país, credibilidad o flexibilidad, y de la madurez de su sistema financiero: con derivados y coberturas se absorben mejor los choques. Su ejemplo de flotación: con Trump el dólar subió mucho (en clase se oyó 24; el máximo de 2017 rondó 22) y luego bajó; con paridad fija, la gente habría ido por las reservas.', 'Clase 26-oct')}
          ${E.warn('Creer que fijar siempre es "más estable". Fijar compra estabilidad nominal al inicio, pero, como dice la lámina, cada ancla mexicana terminó en crisis porque la salida llegó tarde.')}
          ${E.note('España: deuda/PIB de ≈30% al 8% antes del euro contra una deuda mayor al ≈2% hoy. Más deuda y menos intereses gracias a la credibilidad importada (anécdota del profe, cifras ≈).', 'La ventaja del fijo')}
        </div></div>` })}

      ${E.concept({ id: 'ataques', title: 'Ataques especulativos: de la balanza de pagos a las reservas', badge: 'star', html: `
        <div class="cols"><div>
          ${E.formula('Balanza de pagos', 'CA + FA', 'ΔR', 'si el capital privado no cubre el déficit, caen reservas')}
          ${E.formula('Banco central', 'ΔMB', 'ΔNDA + ΔR', 'esterilizar: ΔMB ≈ 0, entonces ΔR = −ΔNDA')}
          ${E.table([
            ['1ª generación', 'Déficit fiscal drena reservas; el ataque es cuestión de tiempo', 'México 1976 y 1982'],
            ['2ª generación', 'Defender cuesta demasiado; ataque autocumplido', 'SME 1992'],
            ['3ª generación', 'Balances y liquidez: deuda corta y en dólares', 'México 1994, Asia 1997'],
          ], { head: ['Modelo', 'Mecanismo', 'Caso'] })}
          ${E.fig(svgTanque, 'Solvente pero ilíquido: la deuda es pequeña frente al PIB, enorme frente a las reservas.')}
        </div><div>
          ${E.kid('Una empresa sana con un pagaré que vence mañana y poco efectivo. Si el banco lo renueva, no pasa nada. Si duda, quiebra, y cada banco tiene motivos para ser el primero en cobrar.')}
          ${E.tip('Su descripción de los dos mundos: <q>Oye, pero si todos le renovamos no pasa nada. Sí, pero no sé si todos le van a renovar</q>. Y sobre diciembre: si el mercado te cree y te renueva, no pasa nada; si no, no tienes reservas para defenderte.', 'Clases 26-oct y 28-oct')}
          ${E.fig(svgDos, 'Equilibrios múltiples: el pánico se justifica a sí mismo.')}
          ${E.warn('Decir que los tesobonos causaron la caída de reservas "porque se pagaban al devaluarse". Las reservas cayeron <b>antes</b>, por la salida de capital y la esterilización. Los tesobonos se pagaron en 1995, con el paquete internacional.')}
        </div></div>` })}

      ${E.concept({ id: 'carry', title: 'Carry trade: la nueva fuente de volatilidad', badge: 'in', html: `
        <div class="cols"><div>
          ${E.fig(svgCarry, 'La posición que hoy expone al peso a cambios bruscos de ánimo.')}
          ${E.formula('Rendimiento del carry', 'R', 'i<sub>local</sub> ± ΔTC − i<sub>fondeo</sub>')}
          ${E.table([
            ['Colombia', '≈15', '+22.5', '≈37', '≈32 (en USD) / ≈41 (en yenes)'],
            ['Argentina', '≈33', '≈−3', '≈30', 'tasa alta por inflación'],
            ['Turquía', '≈44', '≈−15', '≈29', 'la tasa más alta no ganó'],
          ], { head: ['Moneda', 'Tasa, %', 'TC, %', 'Total, %', 'Después de fondeo'] })}
          <p class="small muted">Cifras de la lámina comentada el 21-oct, tomadas del audio (≈). Te sirve la lógica, no el dato.</p>
        </div><div>
          ${E.tip('Con Colombia enseñó que no gana quien tiene la tasa más alta: gana quien suma tasa y tipo de cambio, ya descontado el costo de pedir prestado. Por eso importa el yen barato: es la pieza que une este tema con el caso de Japón.', 'Clase 21-oct')}
          ${E.kid('Pides prestado en la tienda más barata y prestas en la más cara. Ganas mientras el precio de la moneda no se mueva contra ti, y cuando se mueve, todos quieren salir por la misma puerta.')}
          ${E.warn('Confundirlo con paridad descubierta. La UIP dice que el diferencial debería compensarse con depreciación; el carry apuesta a que <b>no</b> se compense.')}
          ${E.key('Cuando la Fed sube y Banxico no, el diferencial se estrecha, el carry se vuelve menos atractivo y el peso se debilita. Ese es el canal de septiembre de 2026.', 'Conexión con hoy')}
        </div></div>` })}

      ${E.concept({ id: 'rer', title: 'Tipo de cambio real: la competitividad que no se ve en la pantalla', badge: 'in', html: `
        <div class="cols"><div>
          ${E.formula('Tipo de cambio real', 'ε', 'E · P* / P', 'si ε cae, el peso se aprecia en términos reales')}
          ${E.fig(svgCoche, 'El ejemplo de los coches del profe.')}
        </div><div>
          ${E.tip('Con inflación de 10% en México, 5% en EUA y tipo de cambio quieto, los coches mexicanos se encarecen ≈5% cada año: en cuatro años, ≈20%. Luego pregunta quién los va a comprar.', 'Clase 26-oct')}
          ${E.kid('Tu sueldo en pesos sube, el dólar sigue igual y de pronto tu viaje a España sale barato. Bien para ti, malo para quien intenta vender coches mexicanos.')}
          ${E.warn('Decir que una apreciación real siempre es un error. Banxico defendía que era de equilibrio, por productividad. Lo sospechoso es el tamaño: Fischer bromeaba que un país está sobrevaluado cuando su ministro encuentra un índice que dice que no.')}
        </div></div>` })}

      <h2>3. Laboratorios</h2>
      <h3>Lab 1. El trilema: elige dos</h3>
      <div id="lab-tri"></div>
      <h3 style="margin-top:28px">Lab 2. Simulador de ataque especulativo: dos mundos</h3>
      <p class="prose">Corre en paralelo el mismo país en dos mundos: en uno todos renuevan los tesobonos, en el otro nadie renueva desde el mes que elijas. Empieza con <b>México 1994</b> y luego prueba <b>Sin tesobonos</b>, <b>Subir la tasa a 25%</b> y <b>Ajuste temprano</b>.</p>
      <div id="lab-atq"></div>
      ${E.reveal('Cómo funciona el modelo y qué supuestos usa', `<p class="small">ΔR mensual = (IED − déficit)/12 − salida + 0.25 × (i − i* − prima) + tesobonos nuevos. Si hay pánico, se dejan de emitir tesobonos y el saldo vence en partes iguales durante el plazo. El colapso ocurre si <abbr class="gl" data-k="R" data-n="Reservas" data-d="Dólares que le quedan al banco central.">R</abbr> cae bajo US$${PISO} mil millones.</p>
        <p class="small"><b>Datos del caso:</b> reservas de 29; tesobonos de 1.2 a ≈18; déficit ≈29; Cetes y T-bills de diciembre; inflación de 7%. <b>Supuestos míos, solo para ilustrar:</b> IED fija de US$11 mil millones (dato de 1994), sensibilidad de 0.25 al diferencial, piso de US$5 mil millones y salida de 1.4 al mes, calibrada para acercarse a la trayectoria real.</p>
        <p class="small"><b>Verificación a mano con México 1994:</b> base = (11 − 29)/12 − 1.4 = −2.9; con tesobonos, −1.5 al mes. A noviembre: 29 − 11 × 1.5 = 12.5 (el dato real al 1 de diciembre es 12.5). Tesobonos: 1.2 + 11 × 1.4 = 16.6. En diciembre, sin renovar: 12.5 − 2.9 − 16.6/3 = 4.1, bajo el piso. El modelo reproduce el orden de magnitud, no el mes a mes: las reservas reales cayeron en escalones.</p>`)}
      <h3 style="margin-top:28px">Lab 3. Tipo de cambio real: la apreciación que se acumula</h3>
      <div id="lab-rer"></div>

      <h2>4. 1994 mes a mes y el rescate</h2>
      <div class="chart h360" id="cam-res"></div>
      <p class="small muted">Reservas al cierre de mes (FMI IFS, lámina IV.9). Tesobonos: 1.2 a dic-93 y 17.8 a dic-94 (láminas); ≈13.5 en agosto y ≈15.5 en noviembre (Sachs et al., nota 11). Entre puntos, la línea solo une los datos disponibles.</p>
      ${E.key('Los tesobonos superan a las reservas alrededor de noviembre. Antes de eso, un pánico no tenía cómo vaciar el tanque; después, sí.', 'Lee la gráfica')}
      ${E.timeline([
        { y: 'Ene', t: 'TLCAN entra en vigor y se levanta Chiapas', d: 'El mismo día. Recordatorio para los inversionistas de que México no era tan moderno como parecía.' },
        { y: 'Feb', t: 'La Fed empieza a subir (3% → 5.5% en noviembre)', d: 'México pierde atractivo. Las reservas tocan su máximo: US$29.3 mil millones.' },
        { y: 'Mar', t: 'Colosio, 23 de marzo', d: 'El peso va al límite débil de la banda (≈−10%) y las tasas suben ≈7 pp. Pero el capital sigue saliendo.' },
        { y: 'Abr', t: 'Se decide: ni más tasa ni devaluación', d: 'Reservas de 25.9 a 17.7. Banxico esteriliza: ≈US$8 mil millones de crédito interno en marzo–abril mantienen la base.' },
        { y: 'May–Jul', t: 'Tesobonización', d: 'Cetes que vencen se cambian por tesobonos. Las reservas se estabilizan en ≈17: parece que funcionó. Baja la prima de riesgo soberano (4% en abril).' },
        { y: 'Ago', t: 'Zedillo gana el 21 de agosto', d: 'Elección limpia, pero el capital regresa a cuentagotas. Tesobonos ≈US$13.5 mil millones.' },
        { y: 'Sep', t: 'Ruiz Massieu, 28 de septiembre', d: 'Otro asesinato político, esta vez del secretario general del PRI.' },
        { y: 'Oct–Nov', t: 'Se rompe la calma', d: 'La Fed sube 75 pb el 15 de noviembre y renuncia el subprocurador acusando encubrimiento. Reservas de 16.3 a 12.5 entre inicio de noviembre y el 1 de diciembre. Tesobonos ≈15.5: ya superan a las reservas.' },
        { y: '1–19 Dic', t: 'Zedillo llega; reservas estables hasta el 15', d: 'Su programa no resuelve ni la cuenta corriente ni los bancos. Del 15 al 19, rumores y violencia en Chiapas: −US$1.7 mil millones.' },
        { y: '20–22 Dic', t: 'El "error de diciembre"', d: 'El 20 se amplía la banda 15%, sin programa que lo respalde. Los fondos se sienten traicionados. El 22, −US$4.5 mil millones en un día (Sachs et al.) y el peso flota.' },
        { y: '27 Dic', t: 'Falla la subasta de tesobonos', d: 'Ofertas de US$28 millones por US$600 millones. Este es el arranque del pánico de deuda, según Sachs et al.' },
        { y: 'Ene–Feb 95', t: 'Rescate: ≈US$50 mil millones', d: 'EUA 20, FMI ≈18, BIS 10, más otros. El FMI: el mayor programa de su historia. Los tesobonos se pagan: préstamo de última instancia a un soberano solvente pero ilíquido.' },
        { y: 'Mar 95', t: 'El fondo', d: 'Tipo de cambio de 3.47 a 7.60 (9 de marzo) y Cetes a ≈82.7%. Intervienen Banpaís y se anuncia un plan nuevo. 1995: PIB −6.9% e inflación de 52%.' },
        { y: '1995→', t: 'Bancos, Fobaproa y extranjerización', d: 'A esas tasas nadie paga: cartera vencida de 8.3% a 18.9%. Fobaproa compra cartera a cambio de pagarés con garantía del gobierno (costo ≈19% del PIB; IPAB aún debe ≈MXN 1.17 billones). Los dueños pierden y compran BBVA, Santander, Citi, HSBC. La salida fue por exportaciones: +30.6% en 1995.' },
      ])}
      ${E.note('El monto del rescate varía según la fuente: Pill suma US$50 mil millones (20 + 18 + 10 + 3 de bancos privados), la lámina da EUA 20, FMI 17.8, BIS 10 y Canadá 1, y Sachs et al. hablan de US$52 mil millones. Para el examen: "≈50 mil millones", de los que se usaron ≈27 en 1995. Tampoco te preocupes por el "cincuenta millones" que se oye en el audio: son miles de millones.', 'Datos que no coinciden')}

      <h2>5. Casos</h2>
      ${E.concept({ id: 'pill', title: 'Mexico: The Tequila Crisis 1994–95 (Huw Pill, HBS)', badge: 'star', html: `
        ${E.table([
          ['De qué trata', 'El mejor alumno del Consenso de Washington colapsa en diciembre de 1994. ¿Cómo terminan en caos unas reformas bien hechas?'],
          ['Personajes', 'Salinas y su equipo; Banxico; Zedillo y su secretario de Hacienda; Dornbusch (sobrevaluación); fondos de Nueva York; banqueros recién privatizados'],
          ['Decisión', 'Ante la salida de capital: ¿subir tasas, devaluar, poner controles o financiar? Eligen financiar con reservas y tesobonos'],
          ['Qué pasó', 'Banda +15% el 20-dic, flotación el 22-dic, 7.60 por dólar, PIB −6.9%, bancos quebrados y rescate'],
          ['Por qué', 'Déficit privado + apreciación real + bancos frágiles + choques → un instrumento para dos objetivos → deuda corta en dólares → corrida'],
          ['Lección', 'Solvencia no es liquidez; las anclas requieren salida temprana; la calidad del financiamiento importa'],
        ])}
        ${E.tip('Su balance: el caso es valioso porque reúne todas las herramientas. Los tesobonos fueron <q>una idea maravillosa que salió mal</q>: baratos, sin subir tasas locales y atraen dólares. Atribuye a Salinas haber emitido demasiados, y aclara que la crisis no tenía que pasar a fuerza: si hubieran renovado, como con el pagaré de una empresa, se habría librado.', 'Clase 26-oct')}
        <h4>Las preguntas del caso, respondidas</h4>
        ${E.reveal('1. ¿Qué transformación hubo entre 1987 y 1993?', `<p>De economía cerrada, estatal y con inflación de tres dígitos a economía abierta, privatizada y con un dígito. Reformas: Pacto y ancla, consolidación fiscal, ≈1,000 privatizaciones (US$25 mil millones), 18 bancos vendidos, GATT y TLCAN, liberalización financiera, Brady.</p><p><b>Logró:</b> inflación de 8%, superávit, deuda de 74.7% a 33.7% del PIB. <b>No logró:</b> crecimiento (1.2% en 1993). Dornbusch y Werner: "estabilización, reforma y nada de crecimiento". Además, parte de los logros era aparente: gasto en la banca de desarrollo y precios administrados.</p>`)}
        ${E.reveal('2. ¿Qué pasó con la balanza comercial y la cuenta corriente?', `<p>Comercial de +2.6 a −18.5 mil millones de dólares; cuenta corriente de −1.4% a −7.9% del PIB (1988–94).</p>${E.table([['(S − I) público', '−3.6', '1.8', '2.9', '2.1', '0.5'], ['(S − I) privado', '2.2', '−4.5', '−9.6', '−8.9', '−8.4'], ['Cuenta corriente', '−1.4', '−2.7', '−6.7', '−6.8', '−7.9']], { head: ['% del PIB', '1988', '1990', '1992', '1993', '1994'] })}<p><b>El déficit era privado.</b> Ahorro de 17.6% a 8.9% del PIB (1988–93); inversión de 15.4% a 19.1% (a 1994). Por eso nadie esperaba una crisis: el gobierno no estaba gastando de más. Lo financió capital de cartera: US$28.9 mil millones en 1993 contra 4.4 de IED.</p>`)}
        ${E.reveal('3. ¿Qué pasó con el tipo de cambio real?', `<p>Apreciación de ≈30% (índice CPI contra EUA: 107.5 en 1989 a 75.0 en 1993). Con E casi fijo y P subiendo más que P*, ε cae. La relación va en dos direcciones: la apreciación empeora la cuenta corriente, y las entradas de capital aprecian el peso.</p><p><b>Debate:</b> Banxico decía equilibrio (productividad, bienes de capital, costos laborales). Dornbusch y Werner decían ≈20% de sobrevaluación.</p>`)}
        ${E.reveal('4. ¿Cómo reducir el déficit con política fiscal o monetaria?', `<p><b>Fiscal:</b> reduce (G − T) casi uno a uno, pero requería un superávit de ≈6–7% del PIB partiendo de equilibrio, en año electoral y con 1.2% de crecimiento. El profe: ya no hay espacio. <b>Monetaria:</b> frena crédito y consumo, pero atrae capital, aprecia el peso y sube la cartera vencida.</p><p><b>Clave:</b> ambas <b>reducen gasto sin cambiar precios relativos</b>. El tercer instrumento es devaluar: encarece importaciones, pero regresa la inflación que tanto costó bajar.</p>`)}
        ${E.reveal('5. Fisher, UIP y la Fed', `<p><b>Fisher:</b> con π<sup>e</sup> anclada en ≈7–8%, subir i sube r casi uno a uno, y r ya estaba en ≈7–9%. El profe: lo normal es 1–3%. <b>UIP:</b> una tasa mayor atrae capital y fortalece el peso dentro de la banda. <b>Fed:</b> i* de 3% a 5.5%, y con Chiapas y Colosio también sube ρ, así que i tendría que subir más que i*. A 3 meses el punto de indiferencia era ≈2.2%; anualizado, 8.5%.</p>`)}
        ${E.reveal('6. ¿Qué dilema planteaba subir tasas? Compáralo con el Banco de Japón', `<p><b>Un instrumento, dos objetivos.</b> Subir defiende la banda, pero quiebra a bancos con cartera vencida de 2.0% a 7.1% (1989–93). No subir protege a los bancos y el crecimiento en año electoral, pero drena reservas.</p><p><b>Japón:</b> igual, la tasa está limitada por balances fuera del banco central (deuda pública y sus tenedores). <b>Diferencia:</b> Japón se endeuda en yenes, es acreedor neto y flota, así que la presión sale en el yen y no en una crisis de reservas.</p>`)}
        ${E.reveal('7. ¿Cómo ayudan los tesobonos? ¿Quién carga el riesgo?', `<p>Quitan E(Δe) de la tasa exigida: Cetes pagan i* + E(Δe) + ρ, tesobonos i* + ρ. Retienen inversionistas sin subir tasas locales y sin mostrar pérdida de reservas. De 1.2 a 17.8 mil millones de dólares; Cetes de 26.1 a 7.5.</p><p><b>El riesgo no desaparece: se transfiere</b> del inversionista al gobierno y, al final, a los contribuyentes. Un seguro gratis contra devaluación.</p>`)}
        ${E.reveal('8. ¿Era sostenible? Usa la dinámica de la deuda', `<p><b>Solvencia:</b> Δb = d + (r − g)b, con superávit primario y b = 33.7%: bien. <b>Moneda:</b> se agrega ê·b<sub>F</sub>; la deuda bruta pasa de 33.7% a 50.7% del PIB, sobre todo por valuación. <b>Liquidez:</b> US$17.8 mil millones contra ≈6 de reservas, renovando cada tres meses; M2/reservas de 4.9 a 13.9.</p><p><b>Conclusión:</b> compatible con solvencia, insostenible como estrategia de liquidez. La ecuación de deuda no ve el plazo.</p>`)}
      ` })}

      ${E.concept({ id: 'stv', title: 'Sachs, Tornell y Velasco (1996): The Collapse of the Mexican Peso', badge: 'star', html: `
        ${E.note('Resumen propio del artículo publicado en <i>Economic Policy</i> 11(22), 13–63 (versión previa: NBER WP 5142, 1995), leído de la copia en el sitio de Jeffrey Sachs.', 'Fuente pública')}
        <div class="cols"><div>
          <p><b>Tesis:</b> los fundamentos no alcanzan a explicar la magnitud de la crisis. No fue irresponsabilidad fiscal. Fue la suma de choques inesperados, mala respuesta, mayor vulnerabilidad y, al final, pánico.</p>
          ${E.table([
            ['Devaluar', 'Ajuste con devaluación', 'Inflación alta'],
            ['No devaluar', 'Ajuste con contracción', '<b>Lo que hizo México:</b> se agotan reservas'],
          ], { head: ['', 'Crédito restrictivo', 'Crédito laxo'] })}
          <p><b>Su recomendación:</b> ampliar el crédito moderadamente <i>y</i> dejar depreciar, temprano. El ajuste era necesario, y en marzo-abril habría sido mucho menos costoso porque había reservas y casi no había deuda corta en dólares.</p>
          <p><b>Los tres argumentos en contra de devaluar:</b> credibilidad, inefectividad (solo subiría precios) y política de EUA (recién firmado el TLCAN). El más fuerte es el primero, y lo rechazan: la credibilidad depende del <b>deseo</b> y también de la <b>capacidad</b> de no devaluar.</p>
        </div><div>
          <p><b>Dos explicaciones de diciembre:</b> (1) ataque clásico, donde devaluación y pánico son un solo evento; (2) dos eventos separados: la devaluación provoca el pánico de deuda. Apoyan la segunda con cuatro evidencias:</p>
          <ul>
            <li><b>Reservas:</b> sin pérdida entre agosto y mediados de noviembre, y estables del 1 al 15 de diciembre.</li>
            <li><b>Diferencial Cetes-tesobonos:</b> baja en agosto y queda casi constante hasta diciembre. Un ataque previsto lo habría hecho subir antes.</li>
            <li><b>Tesobonos vs T-bills</b> (riesgo de impago): de 4% en abril a 1.4% en noviembre; tras devaluar, 5%, 7% y 19% en febrero.</li>
            <li><b>Prensa:</b> un solo artículo sobre tesobonos antes de diciembre; 46 en enero.</li>
          </ul>
          <p><b>Otras ideas:</b> sin un prestamista enorme, ningún acreedor puede cubrir solo los ≈US$28 mil millones de pasivos cortos. El riesgo soberano se contagia a bancos y empresas. El rescate se justifica como prestamista de última instancia. Y su frase para citar: la dureza poco realista en el tipo de cambio no aumenta la credibilidad.</p>
          ${E.warn('Citarlos como si dijeran que no había problemas. Reconocen que el déficit y la apreciación exigían ajuste, solo que el <b>momento y la magnitud</b> del ataque no estaban determinados.')}
        </div></div>
        ${E.table([
          ['Dornbusch y Werner (abr-1994)', 'Sobrevaluación ≈20% frena el crecimiento y suele acabar en sitio especulativo', 'Fundamentos'],
          ['Sachs, Tornell y Velasco (1996)', 'Ni la apreciación ni el déficit eran tan extremos; ilíquido, no insolvente', 'Pánico'],
          ['Síntesis de la lámina', 'Los fundamentos crean la vulnerabilidad; la estructura de la deuda la vuelve corrida', '<b>Tu respuesta</b>'],
        ], { head: ['Quién', 'Qué dice', 'Lectura'] })}
      ` })}

      ${E.concept({ id: 'equipo', title: 'Errores frecuentes al responder el caso', html: `
        <p>Contrastados con el caso, las láminas y la clase. <b>Lo que conviene incluir:</b> la tabla de la identidad (cuadra cada año), la conclusión de déficit privado, la definición de ε, el cálculo de indiferencia a 3 meses (2.2%) y la definición de tesobono como deuda indexada al dólar y pagada en pesos.</p>
        ${E.table([
          ['"Las reservas se gastaron para pagar los tesobonos" tras subir 43% el tipo', 'Causalidad al revés. Casi toda la caída ocurrió <b>antes</b> de la devaluación, por salida de capital y esterilización. Devaluar sube el costo en pesos, no en dólares'],
          ['Tesobonos "de 7 mil a 210 mil millones de pesos en 5 años"', 'El Exh. 16 abarca ene-94 a mar-95: son meses, no años. Y medir en pesos infla el dato por la devaluación. Usa dólares: 1.2 → 17.8'],
          ['Reservas "en enero de 1994 de 29.7 a 6.2"', 'Máximo de 29.3 en febrero y 6.3 a diciembre. Ojo con la fecha'],
          ['Tasa real de 1994 ≈9.3% usando 16.9%', 'La aritmética está bien, pero 16.9% ya trae el salto de diciembre. Antes de la crisis: 14.76% y 7% → ≈7%, que es lo que hizo el profe'],
          ['Pregunta 4 y parte de la 5 sin terminar; identidad con balanza comercial en dólares', 'Falta la idea central: fiscal y monetaria reducen gasto, pero no cambian precios relativos. La medida correcta es la cuenta corriente'],
          ['"Se recurrió a políticas monetarias, donde se reestructuró la deuda"', 'Brady no es política monetaria. Lo que rompió la inercia fue el Pacto con el ancla cambiaria'],
          ['Diferencia con Japón: "evitar crecer a menor ritmo"', 'La diferencia clave: Japón se endeuda en su moneda, es acreedor neto y flota. Es Yield Curve Control'],
          ['Fobaproa: el daño vino de autopréstamos y bancos imprudentes', 'El profe lo llama marginal: lo que quebró a los deudores fue pagar 80%. Es buen matiz, no la causa principal'],
          ['"Más de 70% de los activos bancarios son extranjeros" (Haber, 2005)', 'Dato viejo. Hoy: ≈58% del crédito y ≈60% de los depósitos (clase 28-oct); ≈2/3 de los activos (lámina)'],
          ['Cierre sobre narcotráfico, Morena e IA', 'Interesante, pero es opinión. En el examen quita palabras a las herramientas. El profe descartó el narco como causa principal del bajo crecimiento'],
        ], { head: ['Respuesta común', 'Ajuste'] })}
      ` })}

      <h2>6. La lección para hoy: México 2026</h2>
      <div class="cols"><div>
        ${E.table([
          ['Régimen', 'Banda deslizante', 'Flotación + metas de inflación'],
          ['Quién gasta de más', 'Privados: −8.4% del PIB', 'Gobierno: −4.3% del PIB'],
          ['Cuenta corriente', '−7.9% del PIB', '−0.6% del PIB (2025)'],
          ['Financiamiento', 'Cartera y tesobonos', 'Inversión directa'],
          ['Reservas', '≈US$6 mil millones', '≈US$257 mil millones'],
          ['Ante la Fed', 'Esterilizar y defender', 'Sostener tasa, ajusta el peso'],
          ['Riesgo principal', 'Liquidez: dólares a corto plazo', 'Solvencia lenta: r mayor que g'],
        ], { head: ['', '1994', '2025–26'] })}
      </div><div>
        ${E.tip('Su diagnóstico: no hay crisis, y México está mejor que varios vecinos, pero la luz amarilla es el déficit público. Intereses, pensiones, salud y Pemex no dejan margen; los bancos ya son sólidos pero prestan poco; el crédito tardó décadas en recuperarse. La lección del tipo de cambio la resumió así: tipo de cambio fijo, <q>never more</q>.', 'Clase 26-oct')}
        ${E.key('En el 2T-2026: bienes no petroleros +19.6, petroleros −8.8, servicios −4.5, ingreso primario −13.3 y <b>secundario, sobre todo remesas, +15.8</b> (US$ mil millones). Resultado: +8.9, en parte estacional. Las remesas equivalen a ≈80% del saldo de bienes no petroleros: por eso apuntalan al peso.', 'Las remesas')}
        ${E.warn('Decir que hoy "no hay riesgo" porque hay reservas. Las reservas protegen de una corrida cambiaria, no de r mayor que g. Se necesita un superávit primario de ≈1–1.3% del PIB para estabilizar la deuda.')}
      </div></div>
      ${E.reveal('Para discutir: ¿una caja de conversión o dolarizar haría a México más estable?', `<p><b>A favor:</b> dólar dominante, T-MEC, ≈83% de las exportaciones a EUA. <b>En contra:</b> pierdes prestamista de última instancia, sufres choques asimétricos (el peso ya no amortigua), la salida es brutal (Argentina) y, sin disciplina fiscal, no se sostiene. Con banco central creíble y deuda en pesos, la flotación gana hoy. El problema actual de México es fiscal y de productividad, y un ancla no los resuelve.</p>`)}

      <h2>7. Quiz rápido</h2>
      <div id="cam-quiz"></div>

      <h2>8. Noticias de hoy</h2>
      <div class="g2" id="cam-news"></div>
      <p class="small muted">Más ensayos y otros temas en ${E.link('noticias', 'Noticias de hoy')}. La siguiente decisión de Banxico está programada para el 5 de noviembre, un día después del examen.</p>
      </div>`;

      labTrilema(root);
      labAtaque(root);
      labRer(root);

      E.chart(root.querySelector('#cam-res'), (T) => ({
        ...E.baseOpt(T), grid: { left: 8, right: 16, top: 34, bottom: 8, containLabel: true },
        tooltip: { ...E.baseOpt(T).tooltip, valueFormatter: (v) => (v === null || v === undefined ? '—' : F.n(v, 1)) },
        xAxis: E.axisCat(MES_R, T, { axisLabel: { color: T.ink2, fontSize: 11, interval: 0, hideOverlap: true } }),
        yAxis: E.axisVal(T, (v) => v),
        series: [
          { name: 'Reservas (US$ miles de millones)', type: 'bar', data: RES_R, itemStyle: { color: T.c1, borderRadius: [3, 3, 0, 0] }, barMaxWidth: 30, label: { show: true, position: 'top', color: T.ink2, fontSize: 11, formatter: (p) => F.n(p.value, 1) } },
          { name: 'Tesobonos (US$ miles de millones)', type: 'line', data: TES_R, connectNulls: true, lineStyle: { color: T.c2, width: 3 }, itemStyle: { color: T.c2 }, symbolSize: 8 },
        ],
      }));

      E.quiz(root.querySelector('#cam-quiz'), [
        { q: 'Un país con paridad creíble y capital libre quiere bajar su tasa por debajo de la de EUA. ¿Qué pasa?', o: ['Baja sin problema si tiene reservas altas', 'Sale capital, caen reservas y base, y la tasa regresa a i*', 'Entra capital y la tasa baja todavía más', 'El tipo de cambio se aprecia y la tasa se queda abajo'], a: 1, w: 'Con paridad creíble, i = i*. Vender dólares para defender la paridad contrae la base hasta devolver la tasa a i*.' },
        { q: '¿Quién generó el déficit de cuenta corriente de México en 1994?', o: ['El gobierno, con un déficit como en 1982', 'Pemex y sus importaciones de gasolina', 'Los bancos extranjeros', 'El sector privado: menos ahorro y más inversión'], a: 3, w: 'S − I privado de −8.4% del PIB con un sector público casi en equilibrio. Esa fue la gran diferencia con 1976 y 1982.' },
        { q: '¿Qué transfieren los tesobonos?', o: ['El riesgo cambiario, del inversionista al gobierno', 'El riesgo de crédito, del gobierno a los bancos', 'El riesgo de tasa, del gobierno a los hogares', 'Ninguno: eliminan el riesgo cambiario'], a: 0, w: 'Al estar indexados al dólar, si el peso cae el gobierno paga más pesos. El riesgo no desaparece: cambia de manos.' },
        { q: 'México tenía deuda de ≈34% del PIB y superávit primario, y aun así colapsó. ¿Por qué?', o: ['La deuda sí era insolvente', 'Por el costo de las pensiones', 'Era solvente pero ilíquido: deuda corta en dólares mayor que las reservas', 'Por la inflación de tres dígitos'], a: 2, w: 'Δb no ve plazos ni moneda. US$17.8 mil millones de tesobonos contra ≈6 de reservas.' },
        { q: 'Con inflación de 10% en México, 5% en EUA y tipo de cambio fijo:', o: ['El peso se deprecia en términos reales', 'El tipo de cambio real no cambia', 'El peso se aprecia ≈5% real al año', 'Las exportaciones se abaratan'], a: 2, w: 'ε = E·P*/P cae ≈4.5% exacto (≈5% en la cuenta del profe): 1.05/1.10 = 0.955.' },
      ]);

      root.querySelector('#cam-news').innerHTML = NEWS.map((n) => `<article class="card2"><div class="small muted">${n.date} · ${E.esc(n.source)}</div><h4 style="margin:4px 0 6px"><a href="${E.esc(n.url)}" target="_blank" rel="noopener noreferrer">${n.title}</a></h4><p class="small"><b>Herramienta:</b> ${n.tool}</p><p class="small">${n.read}</p></article>`).join('');
    },
  });

  // ---------------------------------------------------------------- noticias (verificadas el 2-nov-2026)
  const NEWS = [
    { topic: 'S5', date: '2026-10-28', title: 'La Fed mantiene 3.75–4.00% con votación 10-2; el mercado descuenta un alza en diciembre', source: 'Admiral Markets', url: 'https://admiralmarkets.com/analytics/traders-blog/fomc-october-2026-fed-holds-rates', tool: 'Paridad descubierta, Fisher y trilema', read: 'Dos votos pedían subir y los futuros implicaban ≈85% de probabilidad de un alza el 9 de diciembre. Con Banxico en 6.50%, otra alza estrecharía el diferencial: por UIP, la presión saldría en el peso y no en reservas. Es el trilema resuelto por flotación.' },
    { topic: 'S5', date: '2026-10-27', title: 'Reservas internacionales de Banxico: US$257,016 millones al 23 de octubre', source: 'Banco de México', url: 'https://www.banxico.org.mx/publicaciones-y-prensa/estado-de-cuenta-semanal/%7B3E9FEF72-6DDE-B62D-1B6E-5A880B86F6DE%7D.pdf', tool: 'Balanza de pagos y balance del banco central (ΔR)', read: 'Tras un episodio de depreciación, las reservas apenas cambiaron (−US$61 millones en la semana). Bajo flotación, ΔR ≈ 0 y ajusta el precio. Contrasta con 1994, cuando el ajuste caía sobre las reservas, de 29 a 6 mil millones.' },
    { topic: 'S5', date: '2026-10-07', title: 'Analistas elevan su pronóstico para el dólar a 18 pesos y ven a Banxico sin cambios', source: 'Bloomberg Línea', url: 'https://www.bloomberglinea.com/latinoamerica/mexico/analistas-ajustan-al-alza-pronostico-para-el-dolar-en-mexico-y-ven-sin-cambios-tasa-de-interes/', tool: 'Carry trade y fijo vs flexible', read: 'El peso perdió casi 6% al pasar de ≈17 a 18.07, por expectativas de alzas de la Fed y el desacoplamiento de Banxico, que debilitan el carry. La encuesta Citi pasó de 17.50 a 18 para cierre de 2026. Volatilidad a cambio de autonomía: es el costo visible de flotar.' },
    { topic: 'S5', date: '2026-10-05', title: 'El peso argentino se mantiene 21% por debajo del techo de su banda', source: 'The Rio Times', url: 'https://www.riotimesonline.com/argentina-reserves-peso-band-imf-2026/', tool: 'Trilema, bandas y credibilidad', read: 'Banda de ≈722 a ≈1,925 pesos, con límites ajustados por inflación, y reservas brutas de ≈US$48.7 mil millones, parte no disponibles. Como México 1991–94, es un régimen intermedio: la credibilidad depende de la capacidad de defender el techo, y por eso importan las reservas netas que vigila el FMI.' },
    { topic: 'S5', date: '2026-09-25', title: 'Banxico señala explícitamente margen para separarse de la Fed', source: 'BBVA Research', url: 'https://www.bbvaresearch.com/en/publicaciones/mexico-banxico-explicitly-signals-room-to-diverge-from-the-fed/', tool: 'Trilema y paridad descubierta', read: 'Banxico mantuvo 6.50% y dijo que no tendría que reaccionar mecánicamente a la Fed. Esa frase solo es posible con flotación. BBVA advierte el costo: si la Fed sigue subiendo, el diferencial se estrecha y es probable alguna depreciación.' },
  ];
  E.news.push(...NEWS);

  // ---------------------------------------------------------------- banco de opción múltiple
  E.bank.push(
    { topic: 'S5', q: `Según el trilema, ¿qué renuncia Hong Kong con su caja de conversión y capital libre?`, o: [`A la libre movilidad de capital`, `A su política monetaria propia`, `A la estabilidad del tipo de cambio`, `A tener un banco central con reservas`], a: 1, w: `Fijo + capital libre implica i = i*. El HIBOR se mueve para defender la paridad, no para atender la economía local.` },
    { topic: 'S5', q: `¿Cómo se describe mejor lo que intentó México entre 1991 y 1994 desde el trilema?`, o: [`Renunció al capital libre para defender la banda`, `Flotó libremente y mantuvo autonomía`, `Renunció a la autonomía, como la eurozona`, `Trató de conservar las tres esquinas mediante la esterilización`], a: 3, w: `Mantuvo banda y capital libre, y evitó que la pérdida de reservas subiera las tasas. Eso solo dura mientras haya reservas.` },
    { topic: 'S5', q: `¿Por qué convergieron las tasas de los países del euro antes de 1999?`, o: [`Porque desapareció el riesgo cambiario esperado entre ellos`, `Porque Alemania subsidió las tasas de los demás`, `Porque todos tenían la misma deuda/PIB`, `Porque el BCE compró toda la deuda periférica`], a: 0, w: `Con E<sup>e</sup> = E, la UIP implica i = i*. Cuando en 2012 se dudó del euro, δ regresó como riesgo de redenominación.` },
    { topic: 'S5', q: `En diciembre de 1994, Cetes 14.76% y T-bills 5.79% implicaban ≈8.5% anual. ¿Qué mostraba compararlo con el deslizamiento máximo de 4.6%?`, o: [`Que la banda era plenamente creíble`, `Que México tenía una tasa real negativa`, `Que el mercado esperaba más depreciación que la permitida por la banda`, `Que había arbitraje libre de riesgo en Cetes`], a: 2, w: `El diferencial mide depreciación esperada más prima de riesgo. Si excede lo permitido por la banda, la banda no era del todo creíble.` },
    { topic: 'S5', q: `¿Qué distinguía a la crisis de 1994 de las de 1976 y 1982 en la identidad (S − I) = (G − T) + (X − M)?`, o: [`Que el déficit externo era mucho menor`, `Que la brecha venía del sector privado y no del gobierno`, `Que había superávit de cuenta corriente`, `Que la deuda externa era bancaria a tasa flotante`], a: 1, w: `1976 y 1982 fueron crisis fiscales con paridad. En 1994, S − I privado fue −8.4% del PIB con sector público casi equilibrado.` },
    { topic: 'S5', q: `Con el tipo de cambio como ancla del Pacto e inflación mexicana superior a la de EUA, el resultado fue:`, o: [`Depreciación real que impulsó exportaciones`, `Tipo de cambio real sin cambios`, `Un superávit comercial creciente`, `Apreciación real que encareció lo mexicano`], a: 3, w: `ε = E·P*/P cae si P sube más que E·P*. El índice CPI contra EUA bajó de 107.5 a 75.0 entre 1989 y 1993.` },
    { topic: 'S5', q: `¿Por qué Banxico evitó subir tasas con fuerza después de Colosio?`, o: [`Porque la cartera vencida hacía que tasas más altas pudieran quebrar a los bancos`, `Porque la inflación ya era negativa`, `Porque el FMI se lo prohibió`, `Porque las tasas reales eran negativas`], a: 0, w: `Con tasas reales de ≈7–9% y cartera vencida creciente, subir podía ser la gota final. Es un instrumento para dos objetivos.` },
    { topic: 'S5', q: `Esterilizar una salida de capitales bajo tipo de cambio fijo significa:`, o: [`Vender reservas y dejar que caiga la base monetaria`, `Imponer controles de capital`, `Reemplazar con crédito interno lo perdido en reservas para mantener la base`, `Devaluar para mantener las reservas intactas`], a: 2, w: `ΔMB = ΔNDA + ΔR. Si ΔMB ≈ 0, ΔR = −ΔNDA. Sostiene las tasas, pero bloquea el ajuste automático y consume reservas.` },
    { topic: 'S5', q: `¿Cuál fue la ventaja inmediata de cambiar Cetes por tesobonos?`, o: [`Eliminó el riesgo cambiario para el gobierno`, `Quitó la prima por devaluación de la tasa, sin subir las tasas locales`, `Alargó el plazo promedio de la deuda`, `Aumentó el superávit primario`], a: 1, w: `Al estar indexados al dólar, el inversionista ya no pide compensación por devaluación. El gobierno asume ese riesgo.` },
    { topic: 'S5', q: `¿Por qué la ecuación Δb = d + (r − g)b no alertaba sobre el riesgo de diciembre de 1994?`, o: [`Porque d era muy negativo y debía ser positivo`, `Porque el PIB no se mide en dólares`, `Porque r era cero`, `Porque mide solvencia y no captura plazo ni liquidez`], a: 3, w: `El gobierno era solvente. El problema era liquidez: mucho vencimiento de corto plazo contra pocas reservas.` },
    { topic: 'S5', q: `¿Qué hace que un ataque como el de diciembre de 1994 se considere autocumplido?`, o: [`Que cada inversionista sale porque cree que otros saldrán, y eso vuelve imposible pagar`, `Que el gobierno decide no pagar desde el principio`, `Que los fundamentos eran de insolvencia absoluta`, `Que el FMI anunció de antemano la devaluación`], a: 0, w: `Hay dos equilibrios: si todos renuevan, se paga; si nadie renueva, no alcanza. Salir primero es racional una vez que dudas de los demás.` },
    { topic: 'S5', q: `¿Qué evidencia usan Sachs, Tornell y Velasco para sostener que el pánico no estaba anticipado?`, o: [`Las reservas subieron a máximos en diciembre`, `El diferencial Cetes-tesobonos se mantuvo casi constante hasta diciembre`, `Los bancos internacionales cerraron sus líneas en marzo`, `La inflación de noviembre fue de dos dígitos`], a: 1, w: `Un ataque previsto habría elevado el diferencial antes. Además, casi no había prensa sobre tesobonos antes de diciembre.` },
    { topic: 'S5', q: `De acuerdo con Sachs, Tornell y Velasco, la credibilidad de una paridad depende:`, o: [`Solo de cuánto tiempo lleve vigente`, `Solo de los anuncios del ministro de Hacienda`, `De las tasas de la Fed exclusivamente`, `Del deseo y también de la capacidad de no devaluar`], a: 3, w: `Dejar caer las reservas pudo convencer del deseo, pero hizo evidente la falta de capacidad. La dureza poco realista no da credibilidad.` },
    { topic: 'S5', q: `¿Cuál es la clasificación correcta de las crisis?`, o: [`México 1982: tercera generación; SME 1992: primera`, `México 1994: primera generación; Asia 1997: segunda`, `México 1976: primera generación; SME 1992: segunda; México 1994: tercera`, `México 1976: segunda generación; Argentina 2001: primera`], a: 2, w: `Primera: déficit fiscal drena reservas. Segunda: defensa muy costosa y autocumplida. Tercera: balances y liquidez.` },
    { topic: 'S5', q: `¿Cuál fue el talón de Aquiles de Bretton Woods?`, o: [`El mundo necesitaba dólares, pero su exceso minaba la convertibilidad en oro`, `La falta de oro en Europa impedía comerciar`, `El capital libre destruyó los controles desde 1945`, `Las monedas flotaban demasiado`], a: 0, w: `Dilema de Triffin. Con Vietnam y más gasto subió la inflación, Francia presionó y Nixon cerró la ventana del oro en 1971.` },
    { topic: 'S5', q: `Con la elección de Trump en 2016 el dólar llegó a ≈22 pesos y luego bajó. ¿Qué ilustra?`, o: [`El fracaso de la flotación para dar estabilidad`, `Una flotación que absorbe el choque por precio, sin gastar reservas`, `Una devaluación decidida por Banxico`, `Un ataque que agotó las reservas`], a: 1, w: `Es el ejemplo favorito del profe: subió, bajó y se normalizó. Con tipo fijo, la gente habría ido a las reservas.` },
    { topic: 'S5', q: `Un inversionista se fondea en yenes, compra pesos y el peso se deprecia más de lo que paga el diferencial. ¿Qué ocurre?`, o: [`Gana, pues la tasa del peso siempre compensa`, `Gana, porque el yen se aprecia a su favor`, `No hay efecto: el tipo de cambio no afecta el carry`, `Pierde: el movimiento del tipo de cambio supera la ganancia por tasas`], a: 3, w: `Rendimiento = tasa local ± ΔTC − fondeo. Por eso una reversión puede detonar salidas rápidas y volatilidad.` },
    { topic: 'S5', q: `En sep-2026 la Fed subió y Banxico se mantuvo en 6.50%; el peso cedió y las reservas casi no se movieron. ¿Qué lectura es correcta?`, o: [`La flotación permitió autonomía monetaria, con el tipo de cambio como válvula`, `Banxico violó el trilema al tener las tres esquinas`, `México volvió a un régimen de banda`, `Las reservas están financiando el déficit fiscal`], a: 0, w: `Capital libre + autonomía = flotación. El costo de no seguir a la Fed se paga en tipo de cambio, no con reservas.` },
    { topic: 'S5', q: `¿Por qué la salida de la crisis de 1995 vino de las exportaciones y no del crédito?`, o: [`Porque el gobierno prohibió el crédito bancario`, `Porque el rescate se usó para exportar`, `Porque el peso depreciado y el TLCAN impulsaron ventas, mientras los bancos quedaron quebrados`, `Porque los salarios reales subieron con fuerza`], a: 2, w: `Exportaciones +30.6% en 1995. El crédito bancario cayó de ≈33% a ≈8% del PIB: décadas para recuperarse.` },
    { topic: 'S5', q: `¿Por qué la deuda en dólares hace más difícil dejar flotar a un emergente?`, o: [`Porque el banco central no puede fijar tasas si hay deuda`, `Porque una depreciación infla el valor de la deuda en moneda local (miedo a flotar)`, `Porque impide exportar en dólares`, `Porque obliga a tener una caja de conversión`], a: 1, w: `Es el canal de balances: Δb incluye ê·b<sub>F</sub>. La deuda bruta mexicana saltó de 33.7% a 50.7% del PIB por valuación.` },
  );

  // ---------------------------------------------------------------- ensayos
  E.essays.push(
    { topic: 'S5', type: 'caso', prompt: `¿Cuáles fueron las principales razones de la crisis del Tequila? ¿Fue un problema de fundamentos o un pánico autocumplido?`,
      tools: ['Identidad S − I', 'Tipo de cambio real', 'Paridad descubierta', 'Trilema', 'Dinámica de la deuda', 'Equilibrios múltiples'],
      outline: ['Tesis: los fundamentos crean la vulnerabilidad; la estructura de deuda la vuelve corrida', 'Déficit privado y apreciación real, no fiscal', 'Choques de 1994 y dilema: esterilizar y emitir tesobonos', 'Solvente pero ilíquido: dos equilibrios y evidencia de Sachs et al.', 'Conclusión: el ajuste era necesario; su violencia no era inevitable'],
      model: `La crisis del Tequila no se explica con un solo factor: los fundamentos crearon la vulnerabilidad y la estructura de la deuda la convirtió en corrida. A diferencia de 1976 y 1982, no fue una crisis fiscal. La identidad (S − I) = (G − T) + (X − M) lo muestra: en 1994 la cuenta corriente era −7.9% del PIB, el sector público estaba casi en equilibrio y el sector privado tenía una brecha de −8.4%. La gente gastaba después de una década de austeridad, con bancos recién privatizados que prestaban sin buró de crédito, y el ancla cambiaria del Pacto había apreciado el peso cerca de 30% en términos reales.

En 1994 llegaron los choques: la Fed subió su tasa de 3% a 5.5%, y Chiapas, Colosio y Ruiz Massieu elevaron la prima de riesgo. La paridad descubierta exigía una tasa mayor, pero con tasas reales de 7–9% y cartera vencida creciente, subirla podía quebrar a los bancos. Devaluar parecía destruir la credibilidad del ancla. El gobierno eligió una tercera vía: esterilizar la pérdida de reservas con crédito interno y cambiar Cetes por tesobonos indexados al dólar. Fue querer las tres esquinas del trilema. Los tesobonos pasaron de 1.2 a 17.8 mil millones de dólares mientras las reservas bajaban de 29 a 6.

Ahí entra el pánico. Con la ecuación de deuda, México era solvente: balance primario positivo y deuda de 34% del PIB. Pero era ilíquido. Si todos renovaban, no pasaba nada; si nadie renovaba, no había dólares para pagar, así que lo racional era salir antes que los demás. Sachs, Tornell y Velasco aportan evidencia: el diferencial entre Cetes y tesobonos se mantuvo casi constante hasta diciembre y casi nadie en la prensa hablaba de tesobonos. La ampliación de la banda del 20 de diciembre fue el detonador; el 27, la subasta de tesobonos recibió 28 millones de los 600 ofrecidos.

Dornbusch tenía razón en que el peso necesitaba ajustarse, pero un ajuste temprano, con reservas altas y poca deuda en dólares, no tenía por qué terminar en colapso. Mi conclusión es que el déficit y la apreciación hacían inevitable un ajuste, mientras que la iliquidez determinó su violencia. La solvencia no basta: importan el plazo y la moneda de la deuda.` },
    { topic: 'S5', type: 'caso', prompt: `¿Qué dilema enfrentó el gobierno mexicano en 1994 y por qué los tesobonos parecieron la solución? ¿Eran sostenibles?`,
      tools: ['Fisher', 'Paridad descubierta', 'ΔMB = ΔNDA + ΔR', 'Dinámica de la deuda', 'Trilema'],
      outline: ['Un instrumento, dos objetivos', 'Fisher: tasa real ya alta; UIP: i debía subir más que i*', 'Por qué no devaluar: tres argumentos', 'Tesobonos: quitan E(Δe), transfieren el riesgo', 'Sostenibles en solvencia, no en liquidez'],
      model: `El dilema de 1994 fue tener un solo instrumento para dos objetivos. La tasa de interés debía defender la banda cambiaria y, al mismo tiempo, no destruir a un sistema bancario frágil. Por la paridad descubierta, i = i* + E(Δe) + ρ. La Fed subió i* de 3% a 5.5% y los choques políticos elevaron la depreciación esperada y la prima de riesgo, así que retener capital exigía subir la tasa más que la Fed. Pero Fisher muestra el costo: con inflación anclada en 7–8%, cada punto nominal era casi un punto real, y la tasa real ya estaba en 7–9%, cuando lo normal es 1–3%. Con cartera vencida de 7.1% en 1993, subir más podía ser la gota final para bancos recién privatizados.

Devaluar tampoco parecía opción. Se temía destruir la credibilidad del ancla que bajó la inflación de 159% a 8%, se dudaba de su efecto real y, recién firmado el TLCAN, habría parecido una traición a Estados Unidos. Quedó entonces financiar: esterilizar, de modo que ΔMB ≈ 0 y ΔR = −ΔNDA, con crédito interno reemplazando reservas.

Los tesobonos eran, como dijo el profesor, una idea maravillosa que salió mal. Al estar indexados al dólar eliminaban E(Δe) de la tasa exigida, costaban cerca de la tasa estadounidense más ρ, atraían dólares y no subían las tasas locales. Pero el riesgo no desapareció: pasó del inversionista al gobierno y, al final, a los contribuyentes. Era un seguro gratis contra la devaluación.

¿Eran sostenibles? Depende de qué se mida. En solvencia, sí: Δb = d + (r − g)b daba una deuda baja y estable, con superávit primario. Sin embargo, al agregar moneda, ê·b<sub>F</sub> hizo saltar la deuda bruta de 33.7% a 50.7% del PIB. Y en liquidez, no: 17.8 mil millones de dólares a tres meses contra cerca de 6 de reservas. Mientras el mercado renovara, no había problema; si dejaba de hacerlo, no había cómo pagar. Como puente temporal hacia un gobierno nuevo era razonable; como estrategia, convertía a México en rehén de la confianza. El error fue usarlos en exceso en vez de ajustar temprano, cuando aún había reservas y poca deuda de corto plazo.` },
    { topic: 'S5', type: 'caso', prompt: `Describe la transformación de México entre 1987 y 1993. ¿Por qué el éxito de la estabilización sembró los problemas de 1994?`,
      tools: ['Tipo de cambio real', 'Identidad S − I', 'Balanza de pagos', 'Trilema'],
      outline: ['De crisis a alumno modelo: Pacto, reformas, Brady', 'Resultados y lo que no llegó: crecimiento', 'Ancla → apreciación real', 'Liberalización → crédito y caída del ahorro', 'Entradas de cartera → financiamiento volátil'],
      model: `Entre 1987 y 1993 México pasó de una economía cerrada, estatista y con inflación de 159% a una abierta, privatizada y con inflación de 8%. El punto de partida fue el Pacto: gobierno, empresas, sindicatos y agricultores coordinaron precios y salarios para romper la inercia, con el tipo de cambio como ancla nominal. Después vinieron la consolidación fiscal, cerca de mil privatizaciones, la venta de 18 bancos, la apertura con GATT y TLCAN, la liberalización financiera y el Plan Brady. Para 1993 la deuda pública había bajado de 74.7% a 33.7% del PIB y había superávit. Faltaba algo: el crecimiento fue de apenas 1.2% en 1993.

Lo importante es que cada éxito creó una vulnerabilidad. Primero, el ancla. Como la inflación bajó, pero seguía sobre la de Estados Unidos, y el tipo de cambio apenas se movía, ε = E·P*/P cayó: el peso se apreció alrededor de 30% en términos reales. Banxico lo atribuía a productividad; Dornbusch y Werner veían una sobrevaluación de 20%.

Segundo, la liberalización financiera. Los bancos recién privatizados, con dueños poco expertos, sin buró de crédito y con un seguro de depósitos sin límite ni prima por riesgo, expandieron el crédito 45–54% al año. Las familias, tras la década perdida, gastaron. El ahorro privado cayó de 17.6% a 8.9% del PIB y la inversión subió. Por la identidad (S − I) = (G − T) + (X − M), con un gobierno en superávit, esa brecha privada apareció completa en la cuenta corriente: −6.8% del PIB en 1993 y −7.9% en 1994.

Tercero, la apertura de capital. Con tasas bajas en Estados Unidos, los fondos de mercados emergentes llegaron en masa: 28.9 mil millones de dólares de cartera en 1993, contra 4.4 de inversión directa. Eso financió el déficit y elevó las reservas, por lo que parecía un círculo virtuoso. Pero también activó el trilema: con capital libre y una banda, México ya no podía elegir su tasa con libertad.

Así, la crisis de 1994 no nació del despilfarro fiscal, como en 1976 y 1982, sino del éxito mal rematado. La confianza financiaba un déficit privado, sobre un peso caro y unos bancos frágiles.` },
    { topic: 'S5', type: 'caso', prompt: `Usando el trilema, explica por qué México abandonó el tipo de cambio predeterminado y qué lecciones dejó la crisis para el diseño institucional.`,
      tools: ['Trilema', 'Fijo vs flexible', 'Credibilidad', 'Prestamista de última instancia'],
      outline: ['Historia de anclas que terminan mal', 'Trilema: 1991–94 quiso tres', 'Rescate y costos', 'Flotación, metas de inflación, deuda larga', 'Lo no resuelto: crédito y productividad'],
      model: `México ha ocupado casi todas las casillas de los regímenes cambiarios desde 1954: tipo fijo de 12.50, flotaciones tras las crisis, fijo con el Pacto, tablita, banda y, desde diciembre de 1994, flotación. El trilema explica el patrón. Con tipo fijo y capital libre, un país no controla su tasa. Mientras el capital estuvo controlado o la política era conservadora, el ancla funcionó. Cuando se abrió la cuenta de capital, a principios de los noventa, cualquier diferencia de tasas se convirtió en flujos enormes.

En 1994 México quiso las tres esquinas. Mantuvo la banda para no perder la credibilidad antiinflacionaria, mantuvo el capital libre porque los controles habrían señalado el fin de la reforma, y quiso tasas bajas para proteger a los bancos. Ese último objetivo se logró esterilizando: ΔMB ≈ 0 implica ΔR = −ΔNDA. Cada dólar que salía se reemplazaba con crédito interno, hasta que las reservas cayeron de 29 a 6 mil millones de dólares. El 22 de diciembre, el trilema cobró: sin reservas no hay paridad, y el peso pasó de 3.47 a 7.60 en menos de tres meses.

El costo fue enorme: PIB de −6.9%, inflación de 52%, tasas sobre 80% y un sistema bancario quebrado. El rescate de cerca de 50 mil millones de dólares funcionó como prestamista de última instancia para un soberano solvente pero ilíquido, y la recuperación llegó por exportaciones, gracias a la depreciación y al TLCAN.

Las lecciones cambiaron las instituciones. Primero, flotación: un choque se absorbe en el precio y no en las reservas; por eso con Trump el dólar subió a cerca de 22 y luego bajó, sin crisis. Segundo, la credibilidad se mudó de la paridad a las instituciones: Banxico, autónomo desde 1994, con metas de inflación desde 2001, para que el gobierno no pueda monetizar déficits. Tercero, una deuda más larga y en pesos, con afores como compradores, y reservas abundantes.

Sin embargo, no todo quedó resuelto. El crédito bancario sigue cerca de 21% del PIB, frente a 33% en 1994, y la productividad no ha crecido. La conclusión es que no hay un régimen perfecto; hay un régimen coherente con tus instituciones, y el de México hoy lo es mucho más que el de 1994.` },
    { topic: 'S5', type: 'noticia', prompt: `La Fed mantuvo su tasa en 3.75–4.00% el 28 de octubre de 2026, con dos votos a favor de subirla y un mercado que descuenta un alza en diciembre. ¿Qué implica para el peso y para Banxico?`,
      tools: ['Paridad descubierta', 'Fisher', 'Trilema', 'Carry trade'],
      outline: ['El hecho: pausa dura de la Fed', 'UIP: el diferencial importa por la expectativa', 'Fisher: márgenes reales de ambos países', 'Trilema: Banxico puede elegir, pero paga en peso', 'Matiz: inflación, finanzas públicas y T-MEC'],
      model: `El 28 de octubre la Fed mantuvo su tasa en 3.75–4.00%, pero la decisión no fue tranquila: dos miembros votaron por subir y los futuros descontaban cerca de 85% de probabilidad de un alza el 9 de diciembre. La lectura correcta es que el mercado vio una pausa, no un cambio de rumbo, y eso importa para el peso a través de tres herramientas.

La primera es la paridad descubierta: i = i* + E(Δe) + ρ. Con Banxico en 6.50%, el diferencial de política es de unos 2.5 puntos, cuando en 2023 era de 5.75. Si la tasa estadounidense sube y Banxico se queda quieto, el diferencial se estrecha. Para mantener la igualdad, algo debe ajustarse: el peso se deprecia hoy, para que la depreciación esperada sea menor. Esto se vio en septiembre, cuando la primera alza de la Fed coincidió con una caída cercana a 6% del peso. El carry trade amplifica el movimiento, pues con menos diferencial la posición larga en pesos paga menos por el riesgo y puede deshacerse rápido.

La segunda es Fisher. La tasa real de México es de cerca de 2.9%, con inflación de 3.6%, contra unos 0.2% en Estados Unidos con inflación general de 3.7%. Hay un colchón, pero Banxico no puede bajar más sin presionar el tipo de cambio, y su convergencia a 3% se pospuso a finales de 2027.

La tercera es el trilema. México tiene capital libre y flotación, y por eso Banxico puede decir, como dijo en septiembre, que no tiene que reaccionar mecánicamente a la Fed. En 1994, con banda, esa frase era imposible: el ajuste caía sobre las reservas, que bajaron de 29 a 6 mil millones de dólares. Hoy el costo de la autonomía es visible en la pantalla del tipo de cambio, mientras las reservas siguen cerca de 257 mil millones.

Mi implicación: yo esperaría a un Banxico en pausa y un peso sensible a cada dato de Estados Unidos, más que una crisis. El matiz es que la autonomía no es gratuita ni ilimitada. Si la Fed sube más de lo previsto, si se deteriora la percepción fiscal o si la revisión del T-MEC sale mal, aumentaría ρ, y entonces Banxico podría verse obligado a subir aunque la economía crezca poco.` },
    { topic: 'S5', type: 'noticia', prompt: `Las reservas de Banxico sumaban US$257,016 millones al 23 de octubre de 2026, tras una depreciación del peso. ¿Podría repetirse una crisis como la de 1994?`,
      tools: ['ΔR = CA + FA', 'ΔMB = ΔNDA + ΔR', 'Trilema', 'Identidad S − I', 'Dinámica de la deuda'],
      outline: ['El hecho: reservas casi sin cambio', 'Por qué: flotación, ΔR ≈ 0', 'Comparar 1994 y 2026 en cuatro dimensiones', 'Riesgo actual: solvencia, no liquidez', 'Conclusión y costo de las reservas'],
      model: `Según Banxico, la reserva internacional cerró el 23 de octubre en 257,016 millones de dólares, con una baja semanal de apenas 61 millones, a pesar de que el peso venía de depreciarse con fuerza desde septiembre. Ese dato es la mejor respuesta a si puede repetirse 1994: una crisis igual es muy poco probable, porque el mecanismo que la produjo ya no existe, aunque han surgido otros riesgos.

Bajo la banda de 1994, una salida de capital obligaba a vender dólares. La balanza de pagos, CA + FA = ΔR, trasladaba el choque a las reservas, y Banxico lo esterilizaba: ΔMB ≈ 0, ΔR = −ΔNDA. Hoy, con flotación, ΔR es cercano a cero y el precio despeja el mercado. Por eso una depreciación de casi 6% tras el alza de la Fed casi no tocó las reservas.

Las diferencias van más allá del régimen. Primero, liquidez: en 1994 había 17.8 mil millones de dólares en tesobonos a tres meses contra 6 de reservas. Hoy la deuda interna es mayoritariamente en pesos, a un plazo promedio de casi ocho años y con afores como compradores. Segundo, cuenta corriente: −7.9% del PIB contra −0.6% en 2025. Tercero, financiamiento: entonces cartera, hoy inversión directa y remesas, que en el segundo trimestre aportaron 15.8 mil millones de dólares en ingreso secundario. Cuarto, bancos: entonces frágiles, hoy con capital alto.

Pero sería un error concluir que no hay riesgo. La identidad muestra que el sector deficitario cambió: en 1994 era el privado, y hoy es el gobierno, con déficit cercano a 4% del PIB. La dinámica de la deuda, Δb = d + (r − g)b, indica que, con r de 3–4% y g de 1.5–2%, (r − g)b equivale a entre 0.5 y 1.4 puntos del PIB al año, así que un superávit primario pequeño puede no bastar para estabilizar la deuda. Las reservas protegen de una corrida cambiaria, no de una aritmética de solvencia.

Concluyo que México cambió una vulnerabilidad de liquidez, rápida y violenta, por una de solvencia, lenta y gradual. El riesgo ya no es despertar con el peso en el doble; es una pérdida paulatina de calificación, una prima más alta y, en el peor caso, presión sobre la independencia de Banxico.` },
    { topic: 'S5', type: 'noticia', prompt: `Argentina mantiene una banda cambiaria con techo ajustado por inflación; a inicios de octubre el peso estaba 21% por debajo del techo y las reservas brutas rondaban US$48.7 mil millones. ¿Qué dice la experiencia mexicana?`,
      tools: ['Trilema', 'Tipo de cambio real', 'Credibilidad', 'Fijo vs flexible'],
      outline: ['El hecho: banda y reservas', 'Por qué se usa un ancla', 'Semejanzas con México 1989–94', 'Diferencias: margen, ajuste con inflación, FMI', 'Implicación: salida temprana y reservas netas'],
      model: `A inicios de octubre el tipo de referencia argentino estaba en 1,519 pesos por dólar, cerca de 21% debajo del techo de una banda de 722 a 1,925, con reservas brutas de unos 48.7 mil millones de dólares que incluyen fondos no disponibles. Desde enero los límites se ajustan con la inflación. Es un régimen intermedio, y México ya recorrió una versión de ese camino.

El uso de un ancla tiene lógica. Cuando la inflación es muy alta, como explicó el profesor, frenarla solo con tasas requeriría una recesión brutal, mientras que estabilizar el tipo de cambio rompe rápido la espiral. Eso hizo México con el Pacto en 1987. Pero el ancla solo compra tiempo: si el gobierno sigue gastando, tiene que monetizar y la inflación regresa.

El riesgo es el tipo de cambio real. Con ε = E·P*/P, si la inflación local supera al movimiento del tipo de cambio más la inflación externa, el peso se aprecia. México acumuló cerca de 30% entre 1989 y 1993. El diseño argentino mitiga esto, pues al ajustar la banda por inflación, el techo acompaña los precios y evita parte de la apreciación que tuvo la banda mexicana, que se movía a un ritmo predeterminado y bajo.

Lo que sigue preocupando es la credibilidad, que depende del deseo y también de la capacidad de defender el régimen, como señalan Sachs, Tornell y Velasco. Si el dólar toca el techo, el banco central debe vender divisas, y por el trilema, con capital relativamente libre, tendría que elegir entre defensa y tasas. Por eso el FMI vigila las reservas netas, más estrictas que las brutas: el indicador relevante es cuántos dólares realmente puedes usar frente a tus pasivos de corto plazo. México aprendió esto con 17.8 mil millones de tesobonos contra 6 de reservas.

Mi conclusión es que Argentina debería tratar la banda como un puente y no como un destino. La lección mexicana es salir temprano, con reservas y sin deuda corta en dólares, y construir la credibilidad en instituciones. El matiz es que Argentina parte de una historia de impagos, por lo que su prima de riesgo y su margen de error son menos favorables que los de México en los noventa.` },
    { topic: 'S5', type: 'noticia', prompt: `El peso perdió casi 6% al pasar de ≈17 a 18.07 por dólar y los analistas subieron su pronóstico de cierre a 18 pesos. ¿Es una señal de crisis o del régimen funcionando?`,
      tools: ['Fijo vs flexible', 'Carry trade', 'Paridad descubierta', 'Tipo de cambio real'],
      outline: ['El hecho y sus causas reportadas', 'UIP y carry como canal', 'Flotación como amortiguador', 'Costos: traspaso, cobertura, balances', 'Qué vigilar'],
      model: `Bloomberg Línea reportó que el peso cayó casi 6%, de cerca de 17 a 18.07 por dólar, y que la encuesta Citi subió su pronóstico de cierre de 2026 de 17.50 a 18. Los analistas lo atribuyen a mayores expectativas de alzas de la Fed y al desacoplamiento explícito de Banxico, que se mantuvo en 6.50%. Mi lectura es que esto se parece más al régimen funcionando que a una crisis, aunque tiene costos reales y conviene vigilar señales.

La paridad descubierta explica el movimiento. Si i* sube y se espera que suba más, con i constante, el diferencial se estrecha. Según i = i* + E(Δe) + ρ, un diferencial menor es compatible con menos depreciación esperada, y esto se logra si el peso se deprecia ahora. El carry trade lo intensifica: el peso venía apreciándose gracias a posiciones largas de inversionistas que ganaban la tasa y el tipo de cambio. Cuando se reduce el premio, varios salen al mismo tiempo.

La flotación es precisamente para esto. Como dijo el profesor sobre el episodio de Trump, el dólar subió a cerca de 22 y luego bajó, sin ataque especulativo, porque el precio se ajustó en vez de las reservas. Hoy se observa lo mismo: reservas estables de alrededor de 257 mil millones de dólares, y un banco central que no quema dólares ni sube tasas por obligación. En 1994, con la banda, una presión similar produjo pérdida de reservas, tesobonos y, al final, una devaluación desordenada de más de 100%.

Aun así, la volatilidad cuesta. Encarece importaciones y puede traspasarse a la inflación, que aún no converge a 3%. Afecta márgenes de empresas sin cobertura. Con inflaciones similares de 3.6% y 3.7%, el movimiento real es casi igual al nominal.

Mi conclusión es que no es una señal de crisis: hay flotación, poca deuda corta en dólares y cuenta corriente casi equilibrada. Sí sería preocupante si la depreciación viniera de un aumento de ρ, por dudas fiscales o sobre la independencia de Banxico, más que del diferencial. Por eso vigilaría el spread soberano, la curva larga y el traspaso a precios, más que el nivel de 18 pesos en sí.` },
  );

  // ---------------------------------------------------------------- repaso
  E.repaso.push({ topic: 'S5', icon: '💱', title: 'Regímenes de tipo de cambio', items: [
    ['Trilema', 'Fijo, capital libre, autonomía: solo dos. Fijo + capital = caja o unión; fijo + autonomía = controles; capital + autonomía = flotación.'],
    ['UIP', 'i = i* + (Eᵉ − E)/E + ρ. Paridad creíble: i = i*. El diferencial mide depreciación esperada más prima.'],
    ['Fijo vs flexible', 'Fijo da credibilidad y ancla nominal; flotación da flexibilidad y amortigua choques reales. Depende de qué le falta al país.'],
    ['Balanza y banco central', 'CA + FA = ΔR; ΔMB = ΔNDA + ΔR. Esterilizar: ΔMB ≈ 0, ΔR = −ΔNDA.'],
    ['Generaciones de crisis', '1ª fiscal (1976, 1982); 2ª autocumplida (SME 1992); 3ª balances y liquidez (1994, Asia 1997).'],
    ['Tipo de cambio real', 'ε = E·P*/P. E fijo y π mayor que π*: apreciación real. México ≈30% en 1989–93.'],
    ['Origen del déficit de 1994', 'Privado: S − I = −8.4% del PIB. Sector público casi en equilibrio. Cuenta corriente −7.9%.'],
    ['Dilema de 1994', 'Un instrumento, dos objetivos: subir tasas defiende la banda y quiebra bancos; no subir drena reservas.'],
    ['Tesobonos', 'Deuda corta indexada al dólar, 1.2 → 17.8. Quita E(Δe) de la tasa y traslada el riesgo cambiario al gobierno.'],
    ['Solvente pero ilíquido', 'Δb bien, pero 17.8 de tesobonos contra ≈6 de reservas. Dos equilibrios: renovar o correr.'],
    ['Sachs, Tornell y Velasco', 'Pánico autocumplido; credibilidad = deseo y capacidad; debió ampliar crédito moderadamente y depreciar temprano.'],
    ['Diciembre de 1994', '20: banda +15%. 22: flotación. 27: falla la subasta de tesobonos. Rescate de ≈US$50 mil millones en enero.'],
    ['Secuelas', '7.60 por dólar; Cetes ≈82.7%; PIB −6.9%; Fobaproa ≈19% del PIB; banca extranjera; crédito de 33% a 8% del PIB.'],
    ['Carry trade', 'R = tasa local ± ΔTC − fondeo. Gana el rendimiento total, no la tasa más alta; reversión = volatilidad.'],
  ] });
})();
