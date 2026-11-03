// S6 — Intermediación bancaria y corridas: transformación de plazos, Diamond-Dybvig, riesgo de tasa, prestamista de última instancia, Basilea y el caso SVB.
(function () {
  const F = E.fmt;
  const mm = (v, d = 1) => (v < 0 ? '−' : '') + 'US$' + F.n(Math.abs(v), d) + ' mil M';

  // ---------------------------------------------------------------- ilustraciones
  const figPlazos = `<svg class="ill" viewBox="0 0 860 300" role="img" aria-label="El banco toma depósitos que se retiran hoy a valor nominal y los presta a años; un fondo de inversión sólo devuelve el valor de mercado">
    <text x="130" y="26" text-anchor="middle" font-size="15" font-weight="700">Depósitos (pasivo)</text>
    <rect x="30" y="40" width="200" height="110" rx="10" class="f5"/>
    <text x="130" y="82" text-anchor="middle" font-size="15" class="tw" font-weight="700">Retiro HOY</text>
    <text x="130" y="106" text-anchor="middle" font-size="14" class="tw">a valor nominal: 100 es 100</text>
    <text x="130" y="128" text-anchor="middle" font-size="12" class="tw">pase lo que pase</text>
    <path d="M235 95 L335 95" class="ln s5 anim-flow"/>
    <rect x="340" y="40" width="180" height="110" rx="55" class="f1"/>
    <text x="430" y="90" text-anchor="middle" font-size="18" class="tw" font-weight="800">BANCO</text>
    <text x="430" y="112" text-anchor="middle" font-size="12" class="tw">transforma plazos</text>
    <path d="M525 95 L625 95" class="ln s3 anim-flow"/>
    <text x="730" y="26" text-anchor="middle" font-size="15" font-weight="700">Préstamos y bonos (activo)</text>
    <rect x="630" y="40" width="200" height="110" rx="10" class="f3"/>
    <text x="730" y="82" text-anchor="middle" font-size="15" class="tw" font-weight="700">Pagan en AÑOS</text>
    <text x="730" y="106" text-anchor="middle" font-size="14" class="tw">y si los vendes hoy,</text>
    <text x="730" y="128" text-anchor="middle" font-size="14" class="tw">valen lo que diga el mercado</text>
    <rect x="30" y="184" width="800" height="48" rx="10" class="w8"/>
    <text x="430" y="214" text-anchor="middle" font-size="15" font-weight="700">El descalce: pasivo seguro e inmediato contra activo lento y de valor incierto</text>
    <rect x="30" y="244" width="800" height="46" rx="10" class="w2"/>
    <text x="430" y="272" text-anchor="middle" font-size="14">Fondo o casa de bolsa: te devuelve el valor de mercado, no 100. Por eso no tiene el problema de corrida.</text>
  </svg>`;

  const figDD = `<svg class="ill" viewBox="0 0 860 310" role="img" aria-label="Dos equilibrios de Diamond y Dybvig: si creo que los demás esperan, espero y el banco cumple; si creo que retiran, retiro y el banco quiebra">
    <rect x="300" y="118" width="260" height="66" rx="12" class="f7"/>
    <text x="430" y="146" text-anchor="middle" font-size="15" class="tw" font-weight="700">Mismo banco, mismos activos.</text>
    <text x="430" y="168" text-anchor="middle" font-size="14" class="tw">¿Qué creo que harán los demás?</text>
    <path d="M430 116 L430 66" class="ln sgood"/><path d="M430 186 L430 236" class="ln sbad"/>
    <rect x="30" y="20" width="800" height="46" rx="10" class="w2"/>
    <text x="430" y="40" text-anchor="middle" font-size="15" font-weight="700">Equilibrio BUENO</text>
    <text x="430" y="59" text-anchor="middle" font-size="13">Creo que esperan → yo espero → el banco no vende nada → los préstamos maduran → todos cobran más de 100</text>
    <rect x="30" y="238" width="800" height="62" rx="10" class="w5"/>
    <text x="430" y="260" text-anchor="middle" font-size="15" font-weight="700">Equilibrio MALO (autocumplido)</text>
    <text x="430" y="280" text-anchor="middle" font-size="13">Creo que retiran → yo retiro → el banco malbarata activos → quiebra: mi temor era cierto porque todos lo teníamos</text>
    <text x="100" y="152" text-anchor="middle" font-size="13" class="t2">Nadie es irracional:</text>
    <text x="100" y="172" text-anchor="middle" font-size="13" class="t2">formarse primero es lógico</text>
    <text x="700" y="152" text-anchor="middle" font-size="13" class="t2">Seguro y prestamista</text>
    <text x="700" y="172" text-anchor="middle" font-size="13" class="t2">borran la rama de abajo</text>
  </svg>`;

  const figTasa = `<svg class="ill" viewBox="0 0 640 300" role="img" aria-label="Cuando la tasa sube de 5 a 6 por ciento el bono a un año pierde 0.94 por ciento y el de diez años 9.04 por ciento">
    <text x="320" y="24" text-anchor="middle" font-size="15" font-weight="700">La tasa sube de 5% a 6%: ¿cuánto vale hoy un pago de 100?</text>
    <rect x="110" y="60" width="120" height="186" class="w2"/><rect x="110" y="62" width="120" height="184" class="f2"/>
    <text x="170" y="52" text-anchor="middle" font-size="13" font-weight="700">95.24 → 94.34</text>
    <text x="170" y="150" text-anchor="middle" font-size="22" class="tw" font-weight="800">−0.94%</text>
    <text x="170" y="270" text-anchor="middle" font-size="14">Bono a 1 año</text>
    <rect x="400" y="127" width="120" height="119" class="w5"/><rect x="400" y="138" width="120" height="108" class="f5"/>
    <text x="460" y="118" text-anchor="middle" font-size="13" font-weight="700">61.39 → 55.84</text>
    <text x="460" y="198" text-anchor="middle" font-size="22" class="tw" font-weight="800">−9.04%</text>
    <text x="460" y="270" text-anchor="middle" font-size="14">Bono a 10 años</text>
    <line x1="80" y1="246" x2="560" y2="246" class="lnm"/>
    <text x="320" y="294" text-anchor="middle" font-size="13" class="t2">Mismo emisor, cero riesgo de crédito: el plazo multiplica la pérdida 9.6 veces</text>
  </svg>`;

  const figCapas = `<svg class="ill" viewBox="0 0 860 280" role="img" aria-label="Las cuatro capas de regulación sobre el balance de un banco: activos, capital, depósitos y prestamista de última instancia">
    <rect x="20" y="40" width="195" height="170" rx="10" class="f3"/>
    <text x="117" y="66" text-anchor="middle" font-size="14" class="tw" font-weight="700">1 · Activos</text>
    <text x="117" y="100" text-anchor="middle" font-size="13" class="tw">Glass-Steagall</text>
    <text x="117" y="122" text-anchor="middle" font-size="13" class="tw">Regla Volcker</text>
    <text x="117" y="144" text-anchor="middle" font-size="13" class="tw">Límites a lo que</text>
    <text x="117" y="164" text-anchor="middle" font-size="13" class="tw">puede hacer un banco</text>
    <rect x="233" y="40" width="195" height="170" rx="10" class="f1"/>
    <text x="330" y="66" text-anchor="middle" font-size="14" class="tw" font-weight="700">2 · Capital</text>
    <text x="330" y="100" text-anchor="middle" font-size="13" class="tw">Basilea: colchón para</text>
    <text x="330" y="122" text-anchor="middle" font-size="13" class="tw">pérdidas inesperadas</text>
    <text x="330" y="150" text-anchor="middle" font-size="13" class="tw">Es la que más le pesa</text>
    <text x="330" y="170" text-anchor="middle" font-size="13" class="tw">a los bancos</text>
    <rect x="446" y="40" width="195" height="170" rx="10" class="f5"/>
    <text x="543" y="66" text-anchor="middle" font-size="14" class="tw" font-weight="700">3 · Depósitos</text>
    <text x="543" y="100" text-anchor="middle" font-size="13" class="tw">Seguro: FDIC / IPAB</text>
    <text x="543" y="122" text-anchor="middle" font-size="13" class="tw">"No tienes prisa,</text>
    <text x="543" y="144" text-anchor="middle" font-size="13" class="tw">tu dinero está cubierto"</text>
    <rect x="659" y="40" width="181" height="170" rx="10" class="f6"/>
    <text x="749" y="66" text-anchor="middle" font-size="14" class="tw" font-weight="700">4 · Liquidez</text>
    <text x="749" y="100" text-anchor="middle" font-size="13" class="tw">Prestamista de</text>
    <text x="749" y="122" text-anchor="middle" font-size="13" class="tw">última instancia</text>
    <text x="749" y="144" text-anchor="middle" font-size="13" class="tw">Fed / Banxico</text>
    <text x="430" y="26" text-anchor="middle" font-size="15" font-weight="700">Cuatro capas de defensa sobre el balance del banco</text>
    <rect x="20" y="224" width="820" height="44" rx="10" class="w8"/>
    <text x="430" y="251" text-anchor="middle" font-size="14">Costo: si el banco deja de ser rentable, el crédito se va a quienes no tienen estas capas (no bancos)</text>
  </svg>`;

  const figPerdidas = `<svg class="ill" viewBox="0 0 640 260" role="img" aria-label="Las pérdidas frecuentes y pequeñas son esperadas y las cubren las reservas; las grandes e infrecuentes son inesperadas y las absorbe el capital">
    <line x1="40" y1="220" x2="610" y2="220" class="lnm"/>
    <line x1="40" y1="170" x2="610" y2="170" class="ln dash s2"/>
    <text x="608" y="162" text-anchor="end" font-size="13" font-weight="700">Pérdida esperada → reservas</text>
    <g class="f2"><rect x="60" y="190" width="26" height="30"/><rect x="100" y="182" width="26" height="38"/><rect x="140" y="196" width="26" height="24"/><rect x="180" y="186" width="26" height="34"/><rect x="340" y="192" width="26" height="28"/><rect x="380" y="180" width="26" height="40"/><rect x="420" y="194" width="26" height="26"/><rect x="540" y="188" width="26" height="32"/></g>
    <g class="f5"><rect x="240" y="50" width="26" height="170"/><rect x="480" y="90" width="26" height="130"/></g>
    <text x="253" y="40" text-anchor="middle" font-size="13" font-weight="700">COVID</text>
    <text x="493" y="80" text-anchor="middle" font-size="13" font-weight="700">Otis</text>
    <text x="40" y="66" font-size="13" font-weight="700">Pérdida inesperada</text>
    <text x="40" y="86" font-size="13">→ la absorbe el capital</text>
    <text x="325" y="246" text-anchor="middle" font-size="13" class="t2">tiempo</text>
  </svg>`;

  // ---------------------------------------------------------------- lab 1: balance tipo SVB
  const A = 212, DEP = 173; // balance de SVB a dic-2022, redondeado (Exhibit 3 / 11)
  function svb(s) {
    const C = s.cash * A, V = s.bonos * A, E0 = s.cap * A, U = s.unins * DEP, W = s.run * U;
    const L = Math.min(s.dur * s.dy, 0.95);
    const afs = V * (1 - s.htm), htm = V * s.htm;
    const lossA = afs * L, lossH = htm * L;
    const reported = E0 - lossA, mtm = E0 - lossA - lossH;
    const need = Math.max(0, W - C), lolr = s.lolr >= 0.5;
    let sellA = 0, sellH = 0, loan = 0, short = 0;
    if (lolr) { loan = Math.min(need, V + 0.5 * (A - C - V)); short = need - loan; }
    else {
      sellA = Math.min(need, afs * (1 - L));
      sellH = Math.min(need - sellA, htm * (1 - L));
      short = need - sellA - sellH;
    }
    const sold = sellA + sellH, realized = (1 - L) > 0 ? (sold / (1 - L)) * L : 0, tainted = sellH > 1e-9;
    return { C, V, E0, U, W, L, afs, htm, lossA, lossH, loss: lossA + lossH, reported, mtm, need, sellA, sellH, sold, loan, short, realized, tainted, after: tainted ? mtm : reported, loans: A - C - V, lolr, payCash: Math.min(W, C) };
  }
  const SVB0 = { dy: 0.029, dur: 5.6, bonos: 0.553, htm: 0.78, cash: 0.065, cap: 0.09, unins: 0.94, run: 0.26, lolr: 0 };

  function labSVB(box) {
    box.innerHTML = `<div class="btnrow" data-p></div><div data-k></div><div data-t style="margin:12px 0"></div>
      <div class="g2"><div class="card2"><h4>¿Cuánto capital queda de verdad? (miles de millones de US$)</h4><div class="chart" data-c1></div></div>
      <div class="card2"><h4>¿De dónde sale el pago según el % que corre?</h4><div class="chart" data-c2></div></div></div>
      <div class="co key" data-r></div>`;
    let st = { ...SVB0 }, c1, c2;
    const base = svb(SVB0);
    const draw = () => {
      const r = svb(st);
      E.tiles(box.querySelector('[data-t]'), [
        { label: 'Caída de precio ≈ duración × Δy', v: r.L, fmt: 'pct', dec: 1 },
        { label: 'Pérdida no realizada total', v: -r.loss, fmt: '$', dec: 1, base: -base.loss, better: 'up', note: `HTM ${F.$(-r.lossH, 1)} · AFS ${F.$(-r.lossA, 1)}` },
        { label: 'Capital reportado (sólo AFS va a capital)', v: r.reported, fmt: '$', dec: 1, base: base.reported, better: 'up' },
        { label: 'Capital ajustado a mercado', v: r.mtm, fmt: '$', dec: 1, base: base.mtm, better: 'up', hl: true, note: `${F.pct(r.mtm / A, 1)} de los activos` },
        { label: 'Retiro: % que corre × no asegurados', v: r.W, fmt: '$', dec: 1, base: base.W, better: 'down', note: `Caja disponible: ${F.$(r.C, 1)}` },
        { label: r.lolr ? 'Prestado por el banco central' : 'Tiene que vender (a mercado)', v: r.lolr ? r.loan : r.sold, fmt: '$', dec: 1, note: r.lolr ? 'contra bonos a par y préstamos con descuento' : `AFS ${F.$(r.sellA, 1)} · HTM ${F.$(r.sellH, 1)}` },
        { label: 'Pérdida que se materializa', v: -r.realized, fmt: '$', dec: 1, base: -base.realized, better: 'up', hl: true },
        { label: 'Capital contable tras la corrida', v: r.after, fmt: '$', dec: 1, base: base.after, better: 'up', note: r.tainted ? 'Vendió HTM: se contamina todo el portafolio' : 'HTM sigue a costo amortizado' },
        { label: 'Retiro sin cubrir', v: r.short, fmt: '$', dec: 1, note: 'Los préstamos no se venden en un día' },
      ]);
      const p = [];
      p.push(r.L === 0
        ? '<b>Sin alza de tasas no hay pérdida</b>: el mismo balance se ve sano y la corrida no destruye capital. El riesgo de tasa estaba ahí, pero dormido.'
        : `Un alza de ${F.n(st.dy * 100, 1)} puntos con duración de ${F.n(st.dur, 1)} años le quita ≈${F.pct(r.L, 1)} al portafolio de ${F.$(r.V, 0)} mil M: <b>${F.$(r.loss, 1)} mil M de pérdida no realizada</b>, sin que nadie deje de pagar un solo bono.`);
      if (r.L > 0) p.push(r.mtm <= 0.5
        ? ` Contra un capital de ${F.$(r.E0, 1)} mil M, <b>el capital a mercado ya es ≈${F.$(r.mtm, 1)} mil M: se comió el colchón</b>. El banco sólo se ve solvente si nadie lo obliga a vender.`
        : ` El capital a mercado queda en ${F.$(r.mtm, 1)} mil M (${F.pct(r.mtm / r.E0, 0)} del inicial): duele, pero el colchón aguanta.`);
      if (r.W <= r.C) p.push(` El retiro de ${F.$(r.W, 1)} mil M cabe en la caja: <b>no vende nada, la pérdida sigue en papel</b>. Por eso la contabilidad HTM parece inocua… mientras los depósitos se queden.`);
      else if (r.L === 0 && r.short <= 0.05 && !r.lolr) p.push(` El retiro rebasa la caja, pero puede vender ${F.$(r.sold, 1)} mil M de bonos sin pérdida: <b>es un problema de liquidez, no de solvencia</b>. Por eso el alza de tasas es la pieza que convierte un susto en quiebra.`);
      else if (r.lolr) p.push(r.short > 0.05 ? ` Con el prestamista de última instancia evita malbaratar, pero aun con todas sus garantías le faltan ${F.$(r.short, 1)} mil M.` : ` El retiro rebasa la caja, pero <b>el banco central presta ${F.$(r.loan, 1)} mil M contra sus activos: no vende, no materializa y la corrida pierde sentido</b>. Es la lógica del programa a valor par que la Fed anunció el 12 de marzo de 2023.`);
      else if (!r.tainted) p.push(` El retiro rebasa la caja: vende ${F.$(r.sold, 1)} mil M de AFS y <b>materializa ${F.$(r.realized, 1)} mil M</b>. El capital contable no cae más porque el AFS ya iba a valor razonable, pero la pérdida llega a resultados y el mercado se entera. Fue la jugada del 8 de marzo.`);
      else if (r.short <= 0.05) p.push(` La caja y el AFS no alcanzan: <b>tiene que vender HTM</b>. Eso rompe la promesa de mantener a vencimiento: todo el HTM pasa a valor razonable y aparece la pérdida escondida; el capital contable cae a ${F.$(r.after, 1)} mil M. Lo que era papel se vuelve real.`);
      else p.push(` <b>Aunque venda todos los bonos faltan ${F.$(r.short, 1)} mil M</b>; los préstamos no se liquidan en un día. Es el viernes 10 de marzo: el regulador cierra el banco.`);
      if (st.unins >= 0.7) p.push(` Con ${F.pct(st.unins, 0)} de depósitos no asegurados casi nadie tiene motivo para quedarse: la pérdida contable se vuelve corrida.`);
      else if (st.unins <= 0.5) p.push(` Con sólo ${F.pct(st.unins, 0)} no asegurado, el seguro desactiva buena parte del pánico: el mismo % de corrida pega mucho menos.`);
      box.querySelector('[data-r]').innerHTML = '<b>Lectura</b>' + p.join('');
      if (c1) c1.refresh(); if (c2) c2.refresh();
    };
    const knobs = E.knobs(box.querySelector('[data-k]'), [
      { k: 'dy', label: 'Alza de tasas Δy', min: 0, max: 0.05, step: 0.001, v: SVB0.dy, fmt: 'pct', dec: 1, hint: 'Lámina del profe: de 1.79% a 4.70% = 2.91 puntos' },
      { k: 'dur', label: 'Duración de los bonos (años)', min: 0.5, max: 10, step: 0.1, v: SVB0.dur, fmt: 'n', dec: 1, hint: 'SVB: HTM 6.2, AFS 3.6; ponderada ≈5.6' },
      { k: 'bonos', label: 'Bonos como % de activos', min: 0.05, max: 0.7, step: 0.005, v: SVB0.bonos, fmt: 'pct', dec: 1, hint: 'SVB 56%, Citizens 15%, PNC 25%' },
      { k: 'htm', label: '% de los bonos en HTM (resto AFS)', min: 0, max: 1, step: 0.01, v: SVB0.htm, fmt: 'pct', dec: 0, hint: 'SVB: 91 de 117 ≈ 78%' },
      { k: 'cash', label: 'Caja como % de activos', min: 0, max: 0.2, step: 0.005, v: SVB0.cash, fmt: 'pct', dec: 1 },
      { k: 'cap', label: 'Capital inicial / activos (antes del alza)', min: 0.03, max: 0.2, step: 0.001, v: SVB0.cap, fmt: 'pct', dec: 1, hint: '≈US$19 mil M: los 16.3 reportados más lo ya perdido en AFS' },
      { k: 'unins', label: 'Depósitos no asegurados', min: 0, max: 1, step: 0.01, v: SVB0.unins, fmt: 'pct', dec: 0, hint: 'SVB 94%; bancos de EUA ≈35%' },
      { k: 'run', label: '% de los no asegurados que corre', min: 0, max: 1, step: 0.01, v: SVB0.run, fmt: 'pct', dec: 0, hint: '26% ≈ los US$42 mil M del jueves 9; 87% ≈ jueves + viernes' },
      { k: 'lolr', label: 'Prestamista de última instancia (0 = no, 1 = sí)', min: 0, max: 1, step: 1, v: 0, fmt: 'n', dec: 0, hint: 'Presta contra bonos a valor par y préstamos al 50% (supuesto ilustrativo): no hay que vender' },
    ], (s) => { st = s; draw(); }, { title: '🎛️ Balance de US$212 mil M, con depósitos de US$173 mil M' });
    const presets = [
      ['SVB, jueves 9', {}], ['SVB, viernes 10', { run: 0.87 }], ['Sin alza de tasas', { dy: 0 }], ['Bonos cortos', { dur: 1 }],
      ['Sólo asegurados', { unins: 0.35 }], ['Tipo Citizens', { bonos: 0.15, unins: 0.475, cap: 0.105 }], ['Con prestamista', { run: 0.87, lolr: 1 }],
    ];
    const row = box.querySelector('[data-p]');
    presets.forEach(([t, o]) => { const b = E.el(`<button class="btn sm" type="button">${t}</button>`); b.addEventListener('click', () => knobs.set({ ...SVB0, ...o })); row.appendChild(b); });
    c1 = E.chart(box.querySelector('[data-c1]'), (T) => {
      const r = svb(st);
      const vals = [['Inicial', r.E0], ['Reportado', r.reported], ['A mercado', r.mtm], ['Tras corrida', r.after]];
      return { ...E.baseOpt(T), legend: { show: false }, xAxis: E.axisCat(vals.map((x) => x[0]), T), yAxis: E.axisVal(T),
        series: [{ type: 'bar', barWidth: '55%', data: vals.map((x, i) => ({ value: +x[1].toFixed(2), itemStyle: { color: x[1] < 0 ? T.bad : i === 0 ? T.c2 : i === 1 ? T.c1 : T.c5, borderRadius: 4 } })), label: { show: true, position: 'top', color: T.ink, formatter: (p) => F.n(p.value, 1) } }] };
    });
    c2 = E.chart(box.querySelector('[data-c2]'), (T) => {
      const xs = []; for (let i = 0; i <= 100; i += 5) xs.push(i);
      const rows = xs.map((p) => svb({ ...st, run: p / 100 }));
      const mk = (name, key, color) => ({ name, type: 'line', stack: 'p', symbol: 'none', lineStyle: { width: 0 }, areaStyle: { color, opacity: 0.85 }, itemStyle: { color }, data: rows.map((r) => +r[key].toFixed(2)) });
      const s = [mk('Caja', 'payCash', T.c2), st.lolr >= 0.5 ? mk('Banco central', 'loan', T.c6) : mk('Vende AFS', 'sellA', T.c1), mk('Vende HTM', 'sellH', T.c5), mk('Sin cubrir', 'short', T.bad)];
      s[0].markLine = { silent: true, symbol: 'none', label: { formatter: 'tu caso', color: T.ink }, lineStyle: { color: T.ink }, data: [{ xAxis: `${Math.round(st.run * 20) * 5}%` }] };
      return { ...E.baseOpt(T), grid: { left: 8, right: 16, top: 36, bottom: 8, containLabel: true }, xAxis: E.axisCat(xs.map((x) => x + '%'), T, { boundaryGap: false, axisLabel: { color: T.ink2, fontSize: 11, interval: 3 } }), yAxis: E.axisVal(T), series: s };
    });
    draw();
  }

  // ---------------------------------------------------------------- lab 2: Diamond-Dybvig
  // Banco con depósitos = 1. Reserva ρ; activo largo (1−ρ) que paga R en T2 o ℓ si se liquida en T1. Se promete 1 en T1.
  function dd(f0, p) {
    const f = Math.min(f0, 0.999), solv = (1 - p.rho) * p.R + p.rho >= 1, lolr = p.lolr >= 0.5 && solv;
    const fmax = lolr ? 1 : p.rho + p.ell * (1 - p.rho);
    const served = f0 <= fmax ? 1 : fmax / f0;
    const withdraw = served + (1 - served) * p.c;
    let wait;
    if (f <= p.rho) wait = ((1 - p.rho) * p.R + p.rho - f) / (1 - f);
    else if (lolr) wait = ((1 - p.rho) * p.R - (f - p.rho)) / (1 - f);
    else if (f <= fmax) wait = (((1 - p.rho) - (f - p.rho) / p.ell) * p.R) / (1 - f);
    else wait = 0;
    wait = Math.min(Math.max(wait, 0), Math.max(p.R, 1));
    return { withdraw, wait: Math.max(wait, p.c), fmax, solv, lolr, served };
  }
  const threshold = (p) => { for (let i = 0; i <= 1000; i++) { const r = dd(i / 1000, p); if (r.withdraw > r.wait + 1e-9) return i / 1000; } return null; };

  function labDD(box) {
    box.innerHTML = `<div class="btnrow" data-p></div><div data-k></div>
      <div class="card2" style="margin-top:12px"><h4>Tu decisión con los demás en este punto</h4>
        <div class="btnrow"><button class="btn pri" type="button" data-a="wait">🧘 Espero</button><button class="btn pri" type="button" data-a="out">🏃 Retiro hoy</button><button class="btn" type="button" data-a="round">▶ Que pase una ronda</button><button class="btn" type="button" data-a="rumor">📣 Rumor: +20 puntos retiran</button></div>
        <div data-o class="small">Elige. Luego usa "Que pase una ronda" para ver a dónde se va todo el mundo si cada quien responde como tú.</div></div>
      <div data-t style="margin:12px 0"></div>
      <div class="card2"><h4>Lo que recibes de tus 100 según cuántos retiren</h4><div class="chart h360" data-c></div></div>
      <div class="co key" data-r></div>`;
    let st = { f: 0.1, t: 0.1, rho: 0.2, ell: 0.6, R: 1.25, c: 0, lolr: 0 }, ch;
    const P = () => ({ rho: st.rho, ell: st.ell, R: st.R, c: st.c, lolr: st.lolr });
    const out = box.querySelector('[data-o]');
    const draw = () => {
      const p = P(), r = dd(st.f, p), th = threshold(p);
      const best = r.withdraw > r.wait + 1e-9 ? 'Retirar' : 'Esperar';
      E.tiles(box.querySelector('[data-t]'), [
        { label: 'Si esperas recibes', v: r.wait * 100, fmt: 'n', dec: 1, hl: best === 'Esperar' },
        { label: st.f > r.fmax ? 'Si retiras (valor esperado: depende de tu lugar en la fila)' : 'Si retiras recibes', v: r.withdraw * 100, fmt: 'n', dec: 1, hl: best === 'Retirar' },
        { label: 'Punto de quiebre de la confianza', v: th === null ? NaN : th * 100, fmt: 'n', dec: 1, note: th === null ? 'No existe: nunca conviene correr' : '% que retira a partir del cual te conviene correr' },
        { label: 'El banco deja de pagar con', v: r.fmax * 100, fmt: 'n', dec: 0, note: '% de retiros que puede cubrir aun liquidando todo' },
      ]);
      const parts = [];
      if (!r.solv && st.c < 1) parts.push(`<b>Aquí el banco es insolvente, no sólo ilíquido</b>: aun sin corrida, los activos valen ${F.n(((1 - st.rho) * st.R + st.rho) * 100, 0)} por cada 100 de depósitos. Es la "cosecha mala" del profe: no hay equilibrio bueno y correr es lo lógico. ${st.lolr >= 0.5 ? 'El prestamista no debe prestarle: su función es dar liquidez a bancos solventes.' : 'El prestamista no lo arregla; sólo un rescate o el seguro cubren el hueco.'}`);
      else if (st.c >= 1) parts.push(`<b>Con seguro total desaparece el equilibrio malo</b>: pase lo que pase recibes al menos 100, así que nadie tiene prisa. Y como nadie corre, el seguro casi nunca se usa. El costo es otro: riesgo moral, porque ya nadie vigila al banco.`);
      else if (r.lolr) parts.push(`<b>El prestamista de última instancia elimina la corrida</b>: el banco ya no tiene que malbaratar, consigue liquidez contra sus activos a valor par y puede pagar a todos. Esperar vuelve a ser lo mejor y, sabiéndolo, nadie forma la fila. Funciona porque el banco es solvente.`);
      else {
        parts.push(st.t >= th
          ? `Con ${F.pct(st.t, 0)} de retiros normales ya se rebasa el punto de quiebre de ${F.pct(th, 1)}: <b>sólo queda el equilibrio malo</b>. Este banco es demasiado frágil para su clientela; necesita más reservas o mejores activos.`
          : `Este mismo banco solvente tiene <b>dos equilibrios</b>. Bueno: sólo retira el ${F.pct(st.t, 0)} que de verdad necesita el dinero y quien espera recibe ${F.n(dd(st.t, p).wait * 100, 0)}. Malo: retiran todos, el banco liquida con pérdida y sólo ${F.pct(r.fmax, 0)} alcanza a cobrar.`);
        parts.push(st.f < th ? ` Hoy retira ${F.pct(st.f, 0)}, debajo del punto de quiebre de ${F.pct(th, 1)}: <b>te conviene esperar</b>.` : ` Hoy retira ${F.pct(st.f, 0)}, arriba del punto de quiebre de ${F.pct(th, 1)}: <b>lo racional es correr, aunque el banco estuviera sano</b>. La creencia crea el hecho.`);
        if (st.c > 0) parts.push(` Con cobertura de ${F.pct(st.c, 0)} el piso sube, pero el equilibrio malo sigue: la parte descubierta todavía corre. Es exactamente SVB, con ≈6% asegurado.`);
      }
      box.querySelector('[data-r]').innerHTML = '<b>Lectura</b>' + parts.join('');
      if (ch) ch.refresh();
    };
    const knobs = E.knobs(box.querySelector('[data-k]'), [
      { k: 'f', label: '% de los demás que retira', min: 0, max: 1, step: 0.01, v: 0.1, fmt: 'pct', dec: 0 },
      { k: 't', label: 'Quienes de verdad necesitan el dinero', min: 0, max: 0.35, step: 0.01, v: 0.1, fmt: 'pct', dec: 0, hint: 'Retiran siempre; son el equilibrio bueno' },
      { k: 'rho', label: 'Reservas / depósitos', min: 0, max: 0.6, step: 0.01, v: 0.2, fmt: 'pct', dec: 0 },
      { k: 'ell', label: 'Lo que recuperas si liquidas hoy (por cada 1)', min: 0.3, max: 0.9, step: 0.01, v: 0.6, fmt: 'n', dec: 2, hint: 'Remate: mientras más bajo, más frágil' },
      { k: 'R', label: 'Lo que paga el préstamo si madura (por cada 1)', min: 0.7, max: 1.5, step: 0.01, v: 1.25, fmt: 'n', dec: 2, hint: 'Debajo de ≈1 el banco ya es insolvente' },
      { k: 'c', label: 'Cobertura del seguro de depósitos', min: 0, max: 1, step: 0.01, v: 0, fmt: 'pct', dec: 0, hint: 'Parte de tu depósito garantizada' },
      { k: 'lolr', label: 'Prestamista de última instancia (0 = no, 1 = sí)', min: 0, max: 1, step: 1, v: 0, fmt: 'n', dec: 0 },
    ], (s, k) => { st = s; if (k !== undefined) out.innerHTML = 'Cambió el escenario. ¿Esperas o retiras?'; draw(); }, { title: '🎛️ Depositaste 100. Se prometió pagar 100 a quien retire hoy' });
    const row = box.querySelector('[data-p]');
    [['Sin red', {}], ['Seguro total', { c: 1 }], ['Seguro parcial (SVB)', { c: 0.06, f: 0.5 }], ['Con prestamista', { lolr: 1, f: 0.6 }], ['Cosecha mala', { R: 0.8 }]].forEach(([t, o]) => {
      const b = E.el(`<button class="btn sm" type="button">${t}</button>`);
      b.addEventListener('click', () => knobs.set({ f: 0.1, t: 0.1, rho: 0.2, ell: 0.6, R: 1.25, c: 0, lolr: 0, ...o }));
      row.appendChild(b);
    });
    box.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', () => {
      const a = b.dataset.a, p = P(), r = dd(st.f, p), th = threshold(p);
      if (a === 'wait' || a === 'out') {
        const mine = a === 'wait' ? r.wait : r.withdraw, other = a === 'wait' ? r.withdraw : r.wait, good = mine >= other - 1e-9;
        const line = st.f > r.fmax && a === 'out' ? ` Cobras completo sólo si llegas entre el primer ${F.pct(r.served, 0)} de la fila; el resto queda con lo que cubra el seguro.` : '';
        out.innerHTML = `Con ${F.pct(st.f, 0)} retirando, ${a === 'wait' ? 'esperar' : 'retirar'} te da <b>${F.n(mine * 100, 1)}</b> contra ${F.n(other * 100, 1)} de la otra opción. <b>${good ? 'Buena decisión: es tu mejor respuesta.' : 'Te equivocaste de respuesta: la otra opción paga más.'}</b>${line}`;
      } else if (a === 'rumor') {
        knobs.set({ f: Math.min(1, +(st.f + 0.2).toFixed(2)) });
        out.innerHTML = 'Corre el rumor en el chat de fundadores. ¿Ya cruzaste el punto de quiebre? Dale a "Que pase una ronda".';
      } else {
        const target = th !== null && st.f >= th ? 1 : st.t;
        let nx = st.f + 0.45 * (target - st.f); if (Math.abs(target - nx) < 0.015) nx = target;
        knobs.set({ f: +nx.toFixed(3) });
        out.innerHTML = target === 1 ? `Todos ven que más retiran y responden igual: <b>sube a ${F.pct(nx, 0)}</b>. La corrida se alimenta sola.` : `Sin motivo para correr, sólo se queda retirando quien lo necesita: <b>baja a ${F.pct(nx, 0)}</b>. La calma también se autocumple.`;
      }
    }));
    ch = E.chart(box.querySelector('[data-c]'), (T) => {
      const p = P(), th = threshold(p), w = [], o = [];
      for (let i = 0; i <= 200; i++) { const x = i / 200, r = dd(x, p); w.push([x * 100, +(r.wait * 100).toFixed(2)]); o.push([x * 100, +(r.withdraw * 100).toFixed(2)]); }
      const ml = [{ xAxis: st.f * 100, label: { formatter: 'hoy', color: T.ink }, lineStyle: { color: T.ink } }];
      if (th !== null) ml.push({ xAxis: th * 100, label: { formatter: 'quiebre', color: T.bad }, lineStyle: { color: T.bad, type: 'dashed' } });
      const eq = [];
      if (dd(st.t, p).wait >= dd(st.t, p).withdraw - 1e-9) eq.push({ value: [st.t * 100, +(dd(st.t, p).wait * 100).toFixed(2)], itemStyle: { color: T.good }, label: { show: true, position: 'top', formatter: 'Equilibrio bueno', color: T.good } });
      if (th !== null) eq.push({ value: [100, +(dd(1, p).withdraw * 100).toFixed(2)], itemStyle: { color: T.bad }, label: { show: true, position: 'left', formatter: 'Equilibrio malo', color: T.bad } });
      return { ...E.baseOpt(T), tooltip: { ...E.baseOpt(T).tooltip, axisPointer: { type: 'line' }, valueFormatter: (v) => F.n(v, 1) },
        grid: { left: 8, right: 22, top: 36, bottom: 24, containLabel: true },
        xAxis: E.axisVal(T, (v) => v + '%', { min: 0, max: 100, name: '% que retira', nameLocation: 'middle', nameGap: 24, nameTextStyle: { color: T.muted } }), yAxis: E.axisVal(T, undefined, { min: 0 }),
        series: [
          { name: 'Si esperas', type: 'line', symbol: 'none', data: w, lineStyle: { color: T.c2, width: 3 }, itemStyle: { color: T.c2 }, markLine: { silent: true, symbol: 'none', data: ml } },
          { name: 'Si retiras', type: 'line', symbol: 'none', data: o, lineStyle: { color: T.c5, width: 3 }, itemStyle: { color: T.c5 } },
          { name: 'Equilibrios', type: 'scatter', symbolSize: 14, data: eq, itemStyle: { color: T.ink }, tooltip: { show: false } },
        ] };
    });
    draw();
  }

  // ---------------------------------------------------------------- lab 3: cronología
  const STEPS = [
    { x: '2020', dep: 102, y: '2020', t: 'Tasas casi en cero: llueve dinero', d: 'El estímulo por COVID manda inversionistas a buscar retorno. El capital de riesgo se dispara y las startups depositan en SVB. Herramienta: tasas bajas → búsqueda de retorno → depósitos volátiles.' },
    { x: '2021', dep: 189, y: '2021', t: 'Depósitos +86% y compra de bonos largos', d: 'No hay demanda de crédito suficiente, así que coloca el excedente en bonos y MBS de agencia a ≈1.5–1.8%, no en T-bills a 0.25%. El HTM pasa de US$17 mil M a US$98 mil M: decisión de no cubrir ese riesgo.' },
    { x: '2022', dep: 173, y: '2022', t: 'La Fed sube de 0.25% a 4.5%', d: 'Inflación de 9.1% en junio. La misma alza seca el capital de riesgo y las startups queman más caja: los depósitos caen de 189 a 173. SVB baja sus coberturas de US$15.3 mil M a US$563 M. En agosto la Fed le da un CAMELS de 2.' },
    { x: '24-28 feb', dep: 173, y: '24–28 feb 2023', t: 'Dictamen limpio y aviso de Moody\'s', d: 'KPMG firma sin salvedades 14 días antes del colapso. El 28, Moody\'s avisa una posible baja de dos escalones. Las pérdidas de US$15 mil M en HTM, casi igual al capital de US$16 mil M, estaban en una nota al pie.' },
    { x: 'Mié 8', dep: 173, y: 'Miércoles 8 de marzo', t: 'Vende el AFS y anuncia que busca capital', d: 'Vende US$21 mil M de AFS, reconoce US$1.8 mil M de pérdida después de impuestos y anuncia una emisión de US$2.25 mil M aún sin colocar. Quería tranquilizar y mandó tres señales de alarma juntas. Por la noche, Moody\'s baja a A3.' },
    { x: 'Jue 9', dep: 131, y: 'Jueves 9 de marzo', t: 'Corrida digital: salen US$42 mil M', d: 'Founders Fund y otros fondos dicen a sus empresas que saquen el dinero. Becker pide calma en una llamada de 10 minutos. La acción cae 60% y otro 20% después del cierre. Goldman no puede colocar las acciones. El día cierra con caja de −US$958 M.' },
    { x: 'Vie 10', dep: 31, y: 'Viernes 10 de marzo', t: 'Piden otros US$100 mil M: cierre', d: 'En la mañana, California cierra el banco y la FDIC queda como síndico. Sumando jueves y viernes, ≈82% de los depósitos pidió salir (el profe dijo ≈85%). Quien tiene más de US$250 mil queda en duda. El barrote muestra lo que habría quedado.' },
    { x: 'Dom 12', dep: null, y: 'Domingo 12 de marzo', t: 'Las autoridades garantizan a todos', d: 'Se cubre a todos los depositantes sin importar el monto, se toma Signature Bank y la Fed abre un programa para prestar contra bonos a valor par. Es un rescate a los depositantes para frenar el contagio; los accionistas sí pierden.' },
    { x: 'Después', dep: null, y: 'Marzo–mayo 2023', t: 'Contagio: Credit Suisse y First Republic', d: 'Credit Suisse, ya débil, sufre retiros a partir del 15 de marzo y el gobierno suizo arregla su venta a UBS. JPMorgan compra First Republic. Hay más casos, pero sin repetir 1933: la medicina funciona, aunque no es perfecta.' },
  ];

  function labTime(box) {
    box.innerHTML = `<div class="btnrow"><button class="btn" type="button" data-b="p">← Antes</button><button class="btn pri" type="button" data-b="n">Después →</button><span class="small muted" data-s style="align-self:center"></span></div>
      <div class="g2"><div class="card2" data-e></div><div class="card2"><h4>Depósitos de SVB (miles de millones de US$)</h4><div class="chart h220" data-c></div></div></div>`;
    let i = 4, ch;
    const draw = () => {
      const s = STEPS[i];
      box.querySelector('[data-e]').innerHTML = `<div class="small muted">${s.y}</div><h4>${s.t}</h4><p class="small">${s.d}</p>`;
      box.querySelector('[data-s]').textContent = `Paso ${i + 1} de ${STEPS.length}`;
      box.querySelector('[data-b="p"]').disabled = i === 0; box.querySelector('[data-b="n"]').disabled = i === STEPS.length - 1;
      if (ch) ch.refresh();
    };
    box.querySelector('[data-b="p"]').addEventListener('click', () => { if (i > 0) { i--; draw(); } });
    box.querySelector('[data-b="n"]').addEventListener('click', () => { if (i < STEPS.length - 1) { i++; draw(); } });
    ch = E.chart(box.querySelector('[data-c]'), (T) => ({ ...E.baseOpt(T), legend: { show: false }, tooltip: { show: false },
      xAxis: E.axisCat(STEPS.map((s) => s.x), T, { axisLabel: { color: T.ink2, fontSize: 10, interval: 0 } }), yAxis: E.axisVal(T),
      series: [{ type: 'bar', barWidth: '60%', data: STEPS.map((s, k) => ({ value: k <= i ? s.dep : null, itemStyle: { color: k === i ? T.c5 : T.c2, borderRadius: 4 } })), label: { show: true, position: 'top', color: T.ink, fontSize: 11 } }] }));
    draw();
  }

  // ---------------------------------------------------------------- sección
  E.section({
    id: 'bancos', n: 60, group: 'temas', icon: '🏧', short: 'S6 · Bancos y corridas', exam: 'in',
    kicker: 'S6 · Intermediación y corridas',
    title: 'Intermediación bancaria y corridas: por qué un banco sano puede quebrar en 36 horas',
    lead: 'Un banco promete devolverte 100 hoy y presta esos 100 a años. Esa promesa es su función social y su fragilidad. De ahí salen el seguro de depósitos, el prestamista de última instancia, Basilea, SVB y el crédito privado.',
    render(root) {
      root.innerHTML = `
      <div class="prose"><p><b>Lo que el profe quiere que puedas contar:</b> (1) una crisis bancaria es muy cara; (2) ocurre porque el banco presta a largo plazo con depósitos que salen cuando quieras; (3) la regulación responde con seguro, prestamista y sobre todo capital; (4) ese capital hace menos rentables a los bancos y el crédito se va a quienes no están regulados. La pregunta de fondo de la clase: <b>¿la regulación funcionó?</b></p></div>
      ${E.tip('Por qué importa una crisis bancaria, dicho desde la primera clase: 2008 fue de bancos y por eso <q>no se arregló fácilmente</q>. Siguieron muchos años de crecimiento lento, y cuando parecía recuperarse llegó el COVID.', 'Clase 1')}
      ${E.tip('Su respuesta al final de la clase: siguen pasando casos, pero sin la gravedad de antes. <q>Parece que la medicina funciona, pero no es perfecta.</q>', 'Clase 28-oct')}

      <h2>1 · Narrativa</h2>
      ${E.timeline([
        { y: '1929–33', t: 'Gran Depresión: quiebras en dominó', d: 'La gente corre a sacar sus ahorros y el contagio llega a ≈4,000 bancos quebrados en el peor momento. El dinero sale del banco al bolsillo, cae la oferta monetaria (MV = PY), hay deflación y el desempleo pasa de 20%. <b>Por eso</b> nace la arquitectura que aún usamos.' },
        { y: '1933–34', t: 'New Deal y arquitectura financiera', d: 'Keynes: si consumo e inversión no suben, le toca al gasto público. Además: <b>FDIC</b> (seguro), <b>Fed fortalecida</b> como prestamista de última instancia, <b>Glass-Steagall</b> (separa banca comercial y de inversión por conflicto de interés) y <b>SEC</b> (información). <b>Resultado:</b> las quiebras casi desaparecen durante la posguerra.' },
        { y: '1970–80s', t: 'Ahorro y préstamo: primer aviso de riesgo de tasa', d: 'La inflación lleva las tasas cerca de 20%. Los bancos con créditos a tasa fija pagan depósitos cada vez más caros y quiebran. La misma película que SVB, 40 años antes.' },
        { y: '1980–2000s', t: 'Desregulación y banca paralela', d: 'Se abre la competencia y se desmonta Glass-Steagall (derogada en 1999). El crédito migra: los bancos pasan de ≈69% del crédito en 1980 a ≈36% en 2008. <b>Por eso</b> en 2008 el riesgo está donde casi no hay supervisión ni información.' },
        { y: '2000–07', t: 'Dinero barato y subprime', d: 'Fed en 1% y ahorro asiático (Bernanke) bajan las hipotecas. Las casas suben ≈85%. Con tasas gancho, entra quien no podía pagar: el banco no apuesta al deudor sino a que la casa suba. Diversifica entre estados, pero no cubre el riesgo común a todos: la tasa.' },
        { y: '2004–08', t: 'Sube la Fed y estalla', d: 'Suben los pagos, se dispara el impago, todos venden casas y el precio cae. Nadie sabe qué banco tiene subprime, así que nadie presta a nadie: pánico. Bolsa −58%, casas −18%, riqueza −14%: en esto, peor que 1929.' },
        { y: '2008–10', t: 'Bernanke no repite 1933', d: 'Su tesis fue la quiebra bancaria de la Depresión: en lugar de dejar caer el dinero, lo expande (QE), y el gobierno compra activos malos. Funciona económicamente y cuesta políticamente ("People over banks"). El PIB no regresa a su tendencia. México: el peso cae ≈1/3, flota, swap de US$30 mil M con la Fed, y sus bancos no quiebran.' },
        { y: '2010–22', t: 'Basilea III: más capital, menos rentabilidad', d: 'Too big to fail: el regulador exige capital por crédito, mercado y riesgo operativo; sube de ≈10% a ≈13–14% (≈20% en México). Más estabilidad, pero ROE bajo y P/B ≈1. <b>Por eso</b> los bancos prefieren comisiones y el crédito se va a BlackRock, KKR y compañía.' },
        { y: '2020–23', t: 'SVB y Credit Suisse: corridas digitales y riesgo de tasa', d: 'Tasas cero → startups con dinero → depósitos no asegurados → bonos largos. La Fed sube a 4.5%: pérdidas que se comen el capital, y 94% de los depósitos sin seguro corre con el celular en un día. Las autoridades cubren a todos para frenar el contagio; Suiza funde Credit Suisse con UBS.' },
        { y: 'Hoy', t: 'Crédito privado y vuelta de tuerca regulatoria', d: 'Los bancos reclaman que están sobrerregulados y la Fed prepara una recalibración de capital a la baja. El crédito privado supera US$2.6 billones en activos, sin depósitos pero con fondeo bancario. Las stablecoins compiten por los depósitos. La pregunta sigue viva.' },
      ])}
      ${E.reveal('México: la crisis de 1995 explica su sistema de hoy', `<ul>
        <li><b>Fobaproa:</b> el gobierno compra la cartera mala emitiendo deuda, que se paga con impuestos. Ahí la deuda privada se vuelve pública. El profe admite que hubo abusos, pero dice que la mayoría de los impagos vino de la crisis, no de la mala fe.</li>
        <li><b>Banca extranjera:</b> ≈58% del crédito y ≈60% de los depósitos (cifras dichas en clase); BBVA con ≈26% de participación.</li>
        <li><b>ICAP ≈20%:</b> por eso México aguantó COVID sin una crisis bancaria. Es la contraparte de lo que pasó en EUA en los treinta.</li>
        <li><b>El lado oscuro:</b> sistema sólido pero concentrado. Banxico quiere bancos fuertes; eso pide utilidades altas y poca competencia. Resultado: baja penetración del crédito e inclusión financiera.</li></ul>`)}
      ${E.tip('Sobre 2008: <q>Si las tasas de interés bajan, el precio de los bienes raíces sube.</q> Y del banquero que presta subprime: <q>El play era que el precio de las casas subiera.</q> No se fija en si el deudor paga, sino en si la casa sigue subiendo. Fraude hubo, dijo, pero no era el motor.', 'Clase 28-oct')}

      <h2>2 · Herramientas</h2>
      ${E.concept({ id: 'plazos', title: '1 · Transformación de plazos y liquidez', badge: 'in', html: `
        <p><b>Qué hace especial a un banco:</b> otros dan crédito (Sofomes, fondos de capital privado) y otros guardan tu dinero (casa de bolsa con Cetes). Sólo el banco <b>recibe depósitos retirables en cualquier momento a valor nominal y los invierte a largo plazo</b>. Las otras funciones: monitorear deudores, juntar y diversificar ahorros, y operar los pagos.</p>
        ${E.fig(figPlazos, 'Si tienes Cetes en una casa de bolsa y suben las tasas, te dan el valor de mercado. El banco te debe 100, pase lo que pase. Esa diferencia es todo el problema.', true)}
        <h4>El ejemplo de los 100 (láminas 40–43)</h4>
        ${E.table([
          ['t0: diez personas depositan 10', '30', '80', '110', '100', '10', 'Equilibrio normal'],
          ['t1: evento inesperado, retiran 20', '10', '80', '90', '80', '10', 'Se paga con reservas, sin problema'],
          ['t2 buena: los préstamos se pagan', '10', '80', '90', '80', '10', 'Todos cobran; el banco cumplió su función'],
          ['t2 mala: sólo regresan 40', '10', '40', '50', '80', '−30', 'Pérdida de 40: capital 10 y depositantes 30', { cls: 'tot' }],
        ], { head: ['Momento', 'Reservas', 'Préstamos', 'Activos', 'Depósitos', 'Capital', 'Lectura'] })}
        <p><b>Lo crucial:</b> en papel todos pierden lo mismo, (50 − 80) ÷ 80 = −37.5%. <b>Pero eso es falso:</b> el banco paga a valor nominal por orden de llegada. Con 50 alcanza para cinco depositantes completos; los otros tres se quedan sin nada. Por eso importa llegar primero.</p>
        ${E.note('La lámina 43 escribe "Final Deposit = 50/8 = 7.25", pero 50 ÷ 8 = <b>6.25</b>. En audio se oye "los primeros ocho cobran y los últimos dos pierden", pero con 50 y depósitos de 10 las cuentas dan cinco y tres. La idea es la misma: el primero cobra 100%.', 'Revisa estas cuentas')}
        ${E.kid('Diez amigos le prestan 10 cada uno a Lupita, que presta casi todo a un campesino hasta la cosecha. Si un día uno pide su dinero, Lupita lo tiene. Si los diez lo piden el mismo día, la cosecha aún no está lista. El dinero no se perdió: está sembrado.')}
        ${E.warn('Decir que "un banco es especial porque da crédito". No: también lo hacen las Sofomes. Lo especial es la <b>promesa de valor nominal a la vista</b> sobre activos largos.')}` })}

      ${E.concept({ id: 'dd', title: '2 · Corridas como equilibrio autocumplido (Diamond-Dybvig)', badge: 'in', html: `
        <div class="cols"><div>
          <p><b>Idea:</b> el contrato de depósito crea dos equilibrios para <b>el mismo banco</b>. En el bueno, cada quien retira sólo cuando lo necesita. En el malo, todos corren porque creen que los demás van a correr, y el banco quiebra <b>porque</b> corrieron.</p>
          <p><b>La parte incómoda:</b> con incertidumbre, sacar el dinero es lo racional para cada uno, aunque sea desastroso para todos. Si el banco estaba sano y lo quebramos, lo ideal habría sido aguantar, pero nadie tiene esa certeza.</p>
          <p><b>Premio Nobel 2022:</b> Bernanke, Diamond y Dybvig. Por eso el profe lo compara con Solow: en un regulador lo citan todo el tiempo.</p>
          ${E.formula('Conviene retirar si', 'Pago si espero (f)', 'menor que pago si retiro (f)', 'f = % de los demás que retira. A partir de cierto f, esperar deja de convenir.')}
          ${E.warn('Creer que toda corrida es irracional, o que siempre es autocumplida. Hay dos tipos: <b>ilíquido pero solvente</b> (el banco sobrevive si nadie corre) e <b>insolvente</b> (los activos ya no alcanzan, y correr es sólo adelantarse).')}
        </div><div>
          ${E.kid('¿Por qué sales corriendo si alguien grita "¡fuego!" en el cine? Quizá no hay fuego, pero si todos corren, la puerta se tapa y estar sentado es lo peor. Nadie tiene que estar loco para que haya estampida.')}
          ${E.tip('Sin certeza, lo que cabe hacer es sacar el dinero: es lógico, aunque genere el pánico. Lo llamó el equilibrio malo.', 'Clase 28-oct')}
        </div></div>
        ${E.fig(figDD, 'Ambos caminos son decisiones racionales. Lo que cambia es la creencia.', true)}
        <p><b>Por qué importa más que otra quiebra (Bernanke, 1983):</b> <q>cuando un banco truena, es diferente que cuando una empresa truena</q>. Con un banco desaparece la <b>información sobre a quién prestarle</b>, sube el costo del crédito para los pequeños, cae la oferta monetaria y la deflación encarece las deudas. Es un choque de oferta a la infraestructura de crédito, que tarda años en rehacerse.</p>` })}

      ${E.concept({ id: 'tasa', title: '3 · Riesgo de tasa en el balance: duración, HTM y AFS', badge: 'in', html: `
        <div class="cols"><div>
          <p><b>Riesgo de crédito</b> es que no te paguen. <b>Riesgo de mercado (tasa)</b> es que te paguen todo, pero el bono valga menos hoy. Un bono del Tesoro casi no tiene el primero y puede tener mucho del segundo.</p>
          ${E.formula('Valor presente', 'VP', E.frac('Flujo', '(1 + r)<sup>t</sup>'), 'Mientras más lejos el flujo, más le pega la tasa')}
          ${E.formula('Cambio de precio', 'ΔP', '−Duración × Δy × P<sub>0</sub>')}
          <p><b>Cuenta de la lámina 75:</b> 21 mil M de bonos, duración 3.6 (modificada 3.57), rendimiento de 1.79% a 4.70%: −3.57 × 2.91% ≈ <b>−10.4%, US$2.18 mil M</b>. El profe lo hace de cabeza: "tres por tres, nueve".</p>
          ${E.warn('Esa cuenta es del AFS, duración 3.6. El HTM tenía duración de <b>6.2</b>, por eso ahí estaba la pérdida grande: US$15 mil M. Y la pérdida se juzga <b>contra el capital</b>, no sola: 10% suena poco hasta que lo divides entre el colchón.')}
        </div><div>${E.kid('Compraste una casa en 100 y hoy se vendería en 80. Si nunca la vendes, parece que no perdiste nada. Pero si mañana necesitas el dinero, sí que perdiste 20. HTM es decir "yo no voy a vender". SVB lo dijo, y el que decidió fue el depositante.')}</div></div>
        ${E.fig(figTasa, 'Láminas 73–74. La razón entre ambas caídas es 9.59 veces.', true)}
        ${E.table([
          ['Intención', 'Mantener hasta el vencimiento', 'Poder vender', 'Vender pronto'],
          ['En el balance', 'Costo amortizado', 'Valor razonable', 'Valor razonable'],
          ['Si baja el precio', 'No se reconoce; sólo nota al pie', 'Va a capital (OCI), no a resultados', 'Va a resultados'],
          ['Al vender', 'Rompe la intención: se puede contaminar todo el portafolio', 'La pérdida llega a resultados', 'Ya estaba en resultados'],
          ['¿Se puede cubrir?', 'No, sin arriesgar la clasificación', 'Sí', 'Sí'],
        ], { head: ['', 'HTM', 'AFS', 'Trading'] })}
        ${E.tip('<q>Yo soy economista, no soy contador, pero lo que he aprendido en mi carrera profesional es que hay que hacer caso al contador.</q> Los bancos convencieron a las autoridades de que no tenía sentido reportar vaivenes de lo que no piensan vender; con el visto bueno del contador, esos instrumentos no pasan por resultados.', 'Clase 28-oct')}
        ${E.note('Los críticos lo llaman "hide \'til maturity". Ojo: los préstamos también pierden valor con las tasas, sólo que ni siquiera aparecen en notas. Con esa cuenta, ≈500 bancos de EUA tenían más riesgo de tasa que SVB. <b>Lo que hizo distinto a SVB fue su fondeo</b>.', 'El matiz que sube la calificación')}` })}

      ${E.concept({ id: 'lolr', title: '4 · Seguro de depósitos y prestamista de última instancia', badge: 'in', html: `
        ${E.fig(figCapas, 'Lámina 46: la regulación ataca cada renglón del balance.', true)}
        <div class="g2"><div class="card2"><h4>Seguro de depósitos (FDIC 1933; IPAB en México)</h4>
          <p class="small"><b>Cómo funciona:</b> todos los bancos pagan una prima a un fondo; si uno quiebra, el fondo paga a los depositantes hasta un límite (US$250 mil en EUA).</p>
          <p class="small"><b>Por qué mata la corrida:</b> si tu dinero está seguro pase lo que pase, ya no tienes prisa. Y si nadie corre, casi no se usa.</p>
          <p class="small"><b>Limitación:</b> sólo protege lo que cubre. SVB: 94% arriba del límite.</p></div>
        <div class="card2"><h4>Prestamista de última instancia (Fed, Banxico)</h4>
          <p class="small"><b>Cómo funciona:</b> si nadie le presta, el banco va al banco central, que le da liquidez contra sus activos.</p>
          <p class="small"><b>Por qué mata la corrida:</b> el banco no tiene que malbaratar, y la pérdida por liquidar es lo que hacía autocumplido el pánico.</p>
          <p class="small"><b>Limitación:</b> resuelve iliquidez, no insolvencia. Por eso hace falta supervisión.</p></div></div>
        ${E.tip('Antes la Fed no se veía como garante de la estabilidad. Tras la Depresión se fortalece ese papel. Y en 2023 la cobertura fue más allá del límite: no importa si tienes 250 mil o 100 millones. <q>Bailout a cambio de evitar el contagio.</q>', 'Clase 28-oct')}
        ${E.kid('El seguro es decirte "aunque se caiga el puente, te pago el viaje". El prestamista es decirle al puente "si se tambalea, yo lo sostengo". Con cualquiera de los dos, ya no empujas para cruzar primero.')}
        ${E.warn('Confundirlos: el <b>seguro protege al depositante</b> (pasivo) y lo paga un fondo de la industria; el <b>prestamista da liquidez al banco</b> (activo) y es un préstamo con garantía. Y el costo de ambos: <b>riesgo moral</b>, porque quien se siente cubierto vigila menos.')}` })}

      ${E.concept({ id: 'capital', title: '5 · Capital y Basilea: el colchón para lo inesperado', badge: 'in', html: `
        <div class="cols"><div>
          ${E.formula('Índice de capitalización (ICAP)', 'ICAP', E.frac('Capital regulatorio', 'Activos ponderados por riesgo'), 'México: mínimo 10.5%, sistema ≈20%')}
          <p><b>Riesgos que piden capital, en orden de llegada:</b> crédito → mercado → operacional → (ahora) climático. Por eso el total sube: de 8% mínimo a más con colchones de conservación, contracíclico y G-SIB.</p>
          ${E.table([
            ['País AAA–AA', '0%', '0%'], ['Banco AAA–AA', '20%', '1.6%'], ['Empresa AAA–AA', '20%', '1.6%'], ['Empresa sin calificar', '100%', '8%'],
          ], { head: ['Basilea II', 'Ponderador', 'Capital por cada 100 (al 8%)'] })}
          ${E.warn('En clase se oye "capital de 20%" para un bono corporativo AAA: en la lámina 49, 20% es el <b>ponderador de riesgo</b>; al 8% mínimo equivale a 1.6% de capital. Y SVB tenía sobre todo <b>MBS de agencia</b>, no sólo Treasuries; su ponderador es bajo, pero no siempre cero.')}
        </div><div>
          ${E.tip('Si por historia sabes que 4% no te paga, eso es esperado y va a reservas. <q>El capital es un buffer para pérdidas inesperadas</q>: COVID, Otis. Y era buen negocio tener Treasuries, porque el riesgo soberano no computa para el requerimiento.', 'Clase 28-oct')}
        </div></div>
        ${E.fig(figPerdidas, 'Lámina 50: reservas para lo esperado, capital para lo inesperado.', true)}
        ${E.key('<b>El agujero que explotó SVB:</b> Basilea midió bien el riesgo de crédito, pero un bono con ponderador cero puede destruir tu capital por tasa. SVB presumía Tier 1 de 15.26%, mayor que Citizens y PNC, y aun así quebró. Su capital ajustado por pérdidas no realizadas era ≈0 (lámina 80).')}` })}

      ${E.concept({ id: 'nobank', title: '6 · El costo de la regulación: bancos menos rentables y crédito privado', badge: 'in', html: `
        ${E.table([
          ['Tecnológicas', '≈33.9', '≈5.5', 'Mercado apuesta por su crecimiento'],
          ['Bancos', '≈8.4', '≈1.0', 'Valen lo que su libro: el capital caro no rinde'],
        ], { head: ['Lámina 56 (McKinsey, 2025)', 'P/E', 'P/B', 'Lectura'] })}
        <div class="g2"><div class="card2"><h4>La respuesta de los bancos</h4><p class="small">Prestar da ROE ≈4% por el capital que exige. Comisiones, banca privada y medios de pago no requieren capital y dan ROE ≈20%. <b>Así que el banco deja de prestar y empieza a distribuir.</b> Los ingresos pasan de "balance" a "originación y distribución".</p></div>
        <div class="card2"><h4>Quién toma el crédito</h4><p class="small">Fondos de capital privado, aseguradoras, Sofomes, family offices. No toman depósitos, así que <b>no hay transformación de liquidez ni corrida clásica</b>: "dame tu dinero y te lo devuelvo cuando venda". Por eso casi no se regulan.</p></div></div>
        ${E.tip('<q>Los bancos ya no son los protagonistas de la historia.</q> De las fintech de pagos dijo que <q>su ganancia es una ganancia de arbitraje regulatorio</q>. Y mencionó que el financiamiento de IA está yendo por este camino, como las hipotecas antes de 2008: los bancos no aguantan esa exposición en su balance.', 'Clase 28-oct')}
        ${E.warn('Decir que "los no bancos no tienen riesgo". No hay corrida de depositantes, pero muchos vehículos se fondean con líneas bancarias: el riesgo puede regresar al banco. Justo en 2008, la opacidad de esas entidades fue parte del pánico.')}` })}

      <h2>3 · Laboratorios</h2>
      ${E.concept({ title: 'Laboratorio 1 · El balance de un banco tipo SVB', html: `
        <p class="small">Empieza con los botones: <b>Jueves → Viernes → Con prestamista</b>. Luego mueve duración y % no asegurado. El modelo usa la aproximación lineal −D × Δy × V; ignora convexidad y pérdidas en préstamos.</p>
        <div id="bk-lab1"></div>
        ${E.note('Dato real a dic-2022: HTM costo 91.3, valor razonable 76.2 (−15.2); AFS 28.6 contra 26.1 (−2.5); total −17.7. El modelo por defecto da ≈−19 porque es lineal y usa una sola duración: mismo orden de magnitud. Capital reportado real: 16.3; menos HTM: ≈1.1.', 'Contrasta con el caso (Exhibits 3 y 9)')}` })}
      ${E.concept({ title: 'Laboratorio 2 · Juego de corridas (Diamond-Dybvig)', html: `
        <p class="small">Decide con el % de los demás. Luego dale al rumor y a las rondas: verás que el sistema se va a uno de dos sitios. Después prueba los botones de seguro y prestamista: una de las líneas cambia y el equilibrio malo se borra.</p>
        <div id="bk-lab2"></div>
        ${E.note('Modelo didáctico en el espíritu de Diamond-Dybvig: reservas ρ, activo largo que paga R o se liquida en ℓ, y pago por orden de llegada. Con los valores iniciales, el punto de quiebre es f* = 38.5% y el banco deja de pagar con 68%; el equilibrio bueno paga ≈122. Los números son ilustrativos, no del caso.', 'Qué simplifica')}` })}
      ${E.concept({ title: 'Laboratorio 3 · Cronología de las 36 horas', html: `<p class="small">Avanza paso a paso. Empezamos en el miércoles 8, pero regresa a 2020: la corrida duró horas, la vulnerabilidad se construyó tres años.</p><div id="bk-lab3"></div>` })}

      <h2>4 · El caso</h2>
      ${E.concept({ id: 'svb', title: 'Silicon Valley Bank: Gone in 36 Hours (Kang, Palepu, Wang y Lane, HBS)', badge: 'in', html: `
        ${E.tip('Lo quiso usar para ver una corrida <q>con microscopio</q>, como una película en tiempo real. Recomendó leer los anexos: ahí está lo bueno.', 'Clase 28-oct')}
        <div class="g2"><div class="card2"><h4>De qué trata</h4><p class="small">El banco número 16 de EUA, de cerca de la mitad de las startups con capital de riesgo, quiebra el 10 de marzo de 2023. Sus créditos estaban bien: cartera vencida de 0.19%. ¿Quién tuvo la culpa, y qué dice de la regulación?</p></div>
        <div class="card2"><h4>Personajes y decisión</h4><p class="small"><b>Greg Becker</b> (CEO; también en el consejo de la Fed de San Francisco), <b>Daniel Beck</b> (CFO), los <b>fondos de capital de riesgo</b> (Founders Fund de Thiel), <b>Moody's</b>, <b>KPMG</b>, la <b>Fed</b>, <b>California y la FDIC</b>. Decisiones clave: alargar plazo, quitar coberturas, vender y anunciar capital sin tenerlo colocado.</p></div></div>
        <h4>Los números que cuentan la historia (Exhibit 8; lámina 70)</h4>
        ${E.table([
          ['Préstamos / depósitos', '41.9%', '85.1%', '72.9%', 'SVB no presta: compra bonos'],
          ['Valores / activos', '56.1%', '15.0%', '25.4%', 'Apuesta a la tasa'],
          ['Margen de interés', '2.26%', '3.33%', '2.65%', 'Bonos rinden menos que crédito'],
          ['Tier 1', '15.26%', '11.19%', '10.16%', 'Se veía más sano'],
          ['Cartera vencida', '0.19%', '0.96%', '0.97%', 'Crédito excelente'],
          ['Depósitos no asegurados', '93.8%', '47.5%', '45.1%', 'Aquí está el problema'],
        ], { head: ['2022', 'SVB', 'Citizens', 'PNC', 'Lectura'] })}
        ${E.key('<b>La frase para el ensayo:</b> SVB cambió riesgo de crédito por riesgo de tasa, y lo financió con los depósitos más nerviosos del país. Ni uno solo de esos elementos lo mata: lo mata la combinación de pérdida ≈ capital + fondeo sin seguro + clientes conectados.')}
        ${E.note('Canvas trae las preguntas oficiales del caso: están con su esquema de respuesta en ' + E.link('contexto', 'Puntos clave') + '. Abajo están las preguntas guía que el profe fue haciendo en clase más el apartado "The Blame Game" del caso. En su ejemplo de examen pidió explicar por qué SVB tenía tantos bonos: quiere que lo convenzas de que leíste este caso.', 'Sobre las preguntas')}
        ${E.reveal('¿Por qué crecieron tanto los depósitos?', '<p>Tasas bajas → todos buscan retorno → capital de riesgo récord (US$345 mil M en 2021) → las startups depositan en SVB, en parte porque era la norma. De US$62 mil M en 2019 a US$189 mil M en 2021. Eran depósitos de paso: la startup los iba a gastar en unos 18 meses.</p>')}
        ${E.reveal('¿Por qué bonos y por qué largos?', '<p>No había crédito suficiente que colocar. <b>Bonos:</b> sin riesgo de crédito, con poco o nulo requerimiento de capital (más ROE) y líquidos para cuando las startups retiraran. <b>Largos:</b> corto plazo pagaba 0.25%; alargar daba ≈1.5–1.8%. Más rendimiento a cambio de duración.</p>')}
        ${E.reveal('¿Qué papel juega HTM contra AFS?', '<p>Pasar a HTM (de 14 a 91 mil M) evitó que la pérdida tocara el capital reportado, dejándola en nota al pie, y al mismo tiempo impidió cubrirla. Mientras no tuviera que vender, no pasaba nada. Las salidas de depósitos invalidaron ese supuesto.</p>')}
        ${E.reveal('¿La pérdida era mucha?', '<p>Sólo se responde contra el capital: US$15 mil M en HTM contra US$16 mil M de capital. JPMorgan perdió mucho en dólares y poco contra su capital. La gráfica de la lámina 80 lo muestra: ajustado por pérdidas no realizadas, SVB queda ≈0.</p>')}
        ${E.reveal('¿Por qué tan rápido y por qué no sirvió el seguro?', '<p>94% sobre US$250 mil: el seguro no daba calma. Un puñado de fondos habla por cientos de empresas, y con Twitter y banca móvil se mueve dinero desde el celular. El profe dice que se perdió ≈85% en casi nada, contra 90 días en un caso anterior. Diamond-Dybvig con esteroides.</p>')}
        ${E.reveal('¿Quién tuvo la culpa? (The Blame Game)', E.table([
          ['Dirección y consejo', 'Modelos malos, quitó coberturas, ignoró observaciones del regulador, anunció antes de asegurar el capital, pagó compensaciones a empleados el día del cierre', 'Principal'],
          ['Fed / reguladores', 'CAMELS de 2 en 2022; alivio regulatorio de 2018; CEO en el consejo de su supervisor', 'Alta'],
          ['Fondos de capital de riesgo', 'Avisaron a sus empresas que salieran. Racional en lo individual, destructivo en lo colectivo', 'Detonante, no causa'],
          ['Moody\'s', 'Su aviso motivó el plan del 8 de marzo, pero el problema ya estaba a la vista desde 2022', 'Baja'],
          ['KPMG / normas', 'Dictamen limpio a 14 días; HTM "hide \'til maturity"', 'Media'],
          ['Fed como autor de la política', 'Becker: dijo "transitorio" y luego subió lo más rápido en 40 años', 'Contexto, no excusa'],
        ], { head: ['Quién', 'Crítica', 'Peso (mi lectura)'] }))}
        ${E.reveal('¿Qué hizo el gobierno y funcionó?', '<p>Cubrió a todos los depositantes, tomó Signature, abrió liquidez contra bonos a valor par. Se limitó el contagio, aunque First Republic y Credit Suisse cayeron. El costo: si un banco de 16º lugar es de facto sistémico, el límite de US$250 mil pierde credibilidad y crece el riesgo moral. El profe dice que la medicina funciona, pero no es perfecta. Trump después frenó nuevos requisitos.</p>')}
        ${E.note('El caso cita US$24 mil M vendidos en su primer párrafo y US$21 mil M en el resto (21 es lo que aparece en la lámina y en el relato del 8 de marzo). Además, en clase se dijo que UBS era el segundo banco suizo: era el primero, Credit Suisse el segundo. En clase también se habló de que ningún banco grande compró SVB: en efecto, el puente de la FDIC se vendió después a First Citizens, un dato de fuente pública, no del caso.', 'Datos para no equivocarte')}` })}

      <h2>5 · Quiz rápido</h2>
      <div id="bk-quiz"></div>

      <h2>6 · Noticias recientes, para contexto</h2>
      <div class="g2" id="bk-news"></div>
      `;

      labSVB(root.querySelector('#bk-lab1'));
      labDD(root.querySelector('#bk-lab2'));
      labTime(root.querySelector('#bk-lab3'));
      E.quiz(root.querySelector('#bk-quiz'), [
        { q: '¿Qué distingue a un banco de una casa de bolsa que te vende Cetes?', o: ['El banco da crédito y la casa de bolsa no puede', 'El banco debe devolverte el valor nominal a la vista aunque sus activos cambien de valor', 'El banco invierte sólo en activos sin riesgo', 'La casa de bolsa no está regulada'], a: 1, w: 'Es la promesa de valor nominal sobre activos largos. La casa de bolsa te da el valor de mercado.' },
        { q: 'En Diamond-Dybvig, el equilibrio malo ocurre porque…', o: ['Los depositantes son irracionales', 'Los créditos eran malos desde el inicio', 'Retirar es racional si crees que los demás retirarán, y al hacerlo todos quiebran al banco', 'El banco central sube tasas'], a: 2, w: 'Autocumplido: la creencia genera el resultado, incluso en un banco solvente.' },
        { q: 'Bono con duración 4; las tasas suben 2 puntos. ¿Pérdida aproximada de precio?', o: ['−2%', '−4%', '−6%', '−8%'], a: 3, w: 'ΔP/P ≈ −4 × 2% = −8%.' },
        { q: 'SVB clasificó casi todos sus bonos nuevos como HTM. La consecuencia es que…', o: ['Las pérdidas por tasas no tocaban su capital reportado, pero tampoco se podían cubrir', 'No podía registrar intereses', 'Sus pérdidas iban directo a resultados', 'Su requerimiento de capital aumentaba'], a: 0, w: 'A costo amortizado, con nota al pie. Y cubrirlos arriesga la clasificación.' },
        { q: '¿Por qué el seguro de US$250 mil no detuvo la corrida de SVB?', o: ['La FDIC no tenía fondos', 'Sólo cubre cuentas de personas', 'El ≈94% de los depósitos rebasaba el límite', 'Los fondos de capital de riesgo no pueden tener seguro'], a: 2, w: 'Un seguro sólo elimina la corrida sobre lo que asegura.' },
        { q: '¿Qué absorbe cada tipo de pérdida?', o: ['Esperada: capital. Inesperada: reservas', 'Esperada: reservas. Inesperada: capital', 'Ambas: reservas', 'Ambas: seguro de depósitos'], a: 1, w: 'Exactamente la confusión que el profe quiso aclarar.' },
      ]);
      root.querySelector('#bk-news').innerHTML = E.news.filter((n) => n.topic === 'S6').map((n) => `<article class="card2"><div class="small muted">${n.date} · ${E.esc(n.source)}</div><h4 style="margin:4px 0 6px"><a href="${n.url}" target="_blank" rel="noopener">${E.esc(n.title)}</a></h4><p class="small"><b>Herramienta:</b> ${n.tool}</p><p class="small">${n.read}</p></article>`).join('');
    },
  });

  // ---------------------------------------------------------------- banco MCQ
  E.bank.push(
    { topic: 'S6', q: '¿Cuál es la función que hace especial a un banco, según el profe y Diamond-Dybvig?', o: ['Dar crédito a empresas', 'Invertir el dinero de sus clientes en el mercado', 'Transformar depósitos retirables a valor nominal en inversiones de largo plazo', 'Cobrar comisiones por medios de pago'], a: 2, w: 'Crédito dan también Sofomes y fondos. Lo único bancario es la transformación de plazos con promesa de valor nominal.' },
    { topic: 'S6', q: 'Tienes $1,000 en Cetes en una casa de bolsa y suben las tasas. ¿Qué pasa si los pides mañana?', o: ['Te devuelven el valor de mercado, que puede ser menor a $1,000', 'Te devuelven $1,000 porque Cetes no tiene riesgo', 'El IPAB completa la diferencia', 'No puedes retirarlos hasta el vencimiento'], a: 0, w: 'Ese es el ejemplo de clase: sin riesgo de crédito hay riesgo de mercado; la casa de bolsa no promete valor nominal.' },
    { topic: 'S6', q: 'Un banco tiene depósitos por 80 y activos por 50 tras una mala cosecha. ¿Por qué no es cierto que cada quien pierda 37.5%?', o: ['Porque el capital absorbe toda la pérdida', 'Porque el gobierno siempre paga', 'Porque el banco central presta', 'Porque se paga por orden de llegada: los primeros cobran completo y los últimos nada'], a: 3, w: 'De ahí el incentivo a llegar primero, que es el corazón de la corrida.' },
    { topic: 'S6', q: 'En el modelo de Diamond-Dybvig, un banco solvente puede quebrar porque…', o: ['Sus créditos pierden valor con el tiempo', 'Si todos esperan que otros retiren, retirar es la mejor respuesta y el banco debe liquidar con pérdida', 'Los depositantes prefieren efectivo por su rendimiento', 'Regulación excesiva limita sus préstamos'], a: 1, w: 'Dos equilibrios para el mismo banco: la creencia decide cuál se realiza.' },
    { topic: 'S6', q: 'Para cada depositante, frente a la incertidumbre sobre un banco, sacar el dinero es:', o: ['Racional individualmente, aunque colectivamente destruya valor', 'Irracional, porque el banco es solvente', 'Ilegal cuando hay un pánico', 'Indiferente, por el seguro total en todos los casos'], a: 0, w: 'Punto del profe: es lógico, y por eso se necesita regulación, no sermones.' },
    { topic: 'S6', q: '¿Por qué se considera que la quiebra de un banco es más dañina que la de una cementera, según Bernanke (1983)?', o: ['Porque los bancos tienen más empleados', 'Porque sólo los bancos pagan impuestos corporativos', 'Porque se destruye información de crédito, sube el costo de intermediación y hay deflación de deuda', 'Porque el gobierno pierde reservas internacionales'], a: 2, w: 'Es un choque de oferta a la infraestructura de crédito, con efectos que tardan años.' },
    { topic: 'S6', q: '¿Qué diferencia principal hubo entre la respuesta de la Fed en 1929–33 y en 2008?', o: ['En 2008 subió tasas para frenar la salida de capitales', 'En 1929–33 expandió el dinero y en 2008 lo contrajo', 'En ninguno de los dos casos actuó', 'En 2008 expandió la oferta de dinero para evitar la contracción que agravó la Depresión'], a: 3, w: 'Bernanke había estudiado esa película y no quiso repetirla.' },
    { topic: 'S6', q: 'En el auge subprime, ¿por qué los banqueros prestaban a quien no podía pagar?', o: ['Por una obligación legal de prestar a todos', 'Porque esperaban que el precio de la casa subiera y cubriera el crédito', 'Porque el gobierno pagaba los impagos', 'Porque las tasas fijas eran altas'], a: 1, w: 'La apuesta real era al precio de la vivienda, no al deudor. Diversificar entre estados no cubría el riesgo macro común.' },
    { topic: 'S6', q: '¿Qué función cumple el capital bancario, a diferencia de las reservas?', o: ['Absorber pérdidas inesperadas; las reservas cubren las esperadas', 'Pagar a los depositantes en días normales', 'Cumplir el encaje en el banco central', 'Absorber sólo pérdidas por tasas'], a: 0, w: 'Por ejemplo, 4% de impago histórico va a reservas; COVID va contra capital.' },
    { topic: 'S6', q: '¿Cuál es el efecto de exigir más capital a los bancos que más preocupa al profe?', o: ['Los bancos quiebran más seguido', 'Los depositantes reciben intereses más altos', 'Baja su rentabilidad y el crédito migra a no bancos menos regulados', 'Sube la inflación'], a: 2, w: 'Es el dilema estabilidad contra rentabilidad; por eso los CEO fueron al Congreso a oponerse.' },
    { topic: 'S6', q: '¿Por qué un fondo de capital privado casi no enfrenta el riesgo clásico de corrida?', o: ['Porque tiene seguro de depósitos propio', 'Porque invierte sólo en bonos del gobierno', 'Porque el banco central lo respalda', 'Porque no capta depósitos a la vista: te devuelve el dinero cuando vende, sin promesa de valor nominal'], a: 3, w: 'Sin transformación de liquidez bancaria no hay corrida clásica. Por eso se regula menos.' },
    { topic: 'S6', q: 'SVB tenía pocos préstamos malos y Tier 1 alto. ¿Qué explica mejor su vulnerabilidad?', o: ['Bonos largos con pérdidas casi iguales a su capital, financiados con depósitos no asegurados y concentrados', 'Exceso de créditos subprime', 'Préstamos en moneda extranjera sin cobertura', 'Fraude contable en su cartera'], a: 0, w: 'Cambió riesgo de crédito por riesgo de tasa, y el fondeo era el más nervioso.' },
    { topic: 'S6', q: '¿Por qué SVB prefería bonos del gobierno y agencias a más préstamos?', o: ['Porque la ley prohibía prestar a startups', 'Porque casi no requieren capital y parecían líquidos y seguros, además de que faltaba demanda de crédito', 'Porque pagaban más que los préstamos', 'Porque se contabilizan a valor razonable y eso sube las utilidades'], a: 1, w: 'Ponderador bajo, liquidez para cuando las startups retiraran y exceso de depósitos.' },
    { topic: 'S6', q: 'Si SVB vendía bonos HTM para pagar retiros, el problema contable era que…', o: ['No podía venderlos legalmente nunca', 'Debía comprarlos de vuelta en un año', 'Rompía la intención de mantener y debía reconocer a mercado la pérdida de todo el portafolio', 'Debía pagar un impuesto extra'], a: 2, w: 'Lo que estaba en nota al pie se vuelve capital perdido: ≈US$15 mil M contra ≈US$16 mil M.' },
    { topic: 'S6', q: 'El anuncio de SVB del 8 de marzo buscaba fortalecer el balance. ¿Por qué tuvo el efecto contrario?', o: ['Porque el mercado no se enteró', 'Porque reveló de golpe pérdida, venta y necesidad de capital aún no asegurado, en una base de depósitos sin seguro', 'Porque subió sus tasas de depósitos', 'Porque Moody\'s retiró todas las calificaciones'], a: 1, w: 'Transparente, pero con mala secuencia. Para un banco, la confianza lo es todo.' },
    { topic: 'S6', q: 'Comparada con corridas anteriores, ¿qué cambió la tecnología en SVB?', o: ['Las pérdidas de los depositantes asegurados', 'La necesidad de capital regulatorio', 'El riesgo de crédito de la cartera', 'La velocidad: banca móvil y redes concentraron en horas lo que antes tomaba semanas'], a: 3, w: 'El mecanismo es el de Diamond-Dybvig; la velocidad es lo nuevo. Regulación y LOLR tienen menos tiempo.' },
    { topic: 'S6', q: 'Las autoridades cubrieron a todos los depositantes de SVB. ¿Cuál es el principal costo de esta decisión?', o: ['Aumenta el riesgo moral: el límite del seguro pierde credibilidad y hay menos disciplina de mercado', 'Elimina para siempre las corridas', 'Hace insolvente a la FDIC de inmediato', 'Obliga a todos los bancos a subir tasas de depósitos'], a: 0, w: 'Evita el contagio a cambio de un precedente: si un banco mediano es sistémico, ¿quién vigila?' },
    { topic: 'S6', q: 'Después de 1933, ¿qué mostró la historia sobre la regulación bancaria?', o: ['Eliminó las crisis bancarias por completo', 'Hizo los bancos más rentables que las tecnológicas', 'Bajaron mucho las quiebras, pero cuando hay crisis los montos son enormes', 'No tuvo ningún efecto sobre las quiebras'], a: 2, w: 'Número de bancos contra dinero: 2008 y 2023 son pocos bancos y montos gigantes.' },
  );

  // ---------------------------------------------------------------- noticias (verificadas el 2-nov-2026)
  E.news.push(
    { topic: 'S6', date: '2026-10-21', title: 'OCC emite regla final del GENIUS Act y revisará caso por caso los premios sobre stablecoins', source: 'CoinDesk', url: 'https://www.coindesk.com/policy/2026/10/21/occ-s-final-rule-to-start-fresh-in-weighing-stablecoin-rewards-against-genius-act-ban', tool: 'Transformación de plazos; fondeo; arbitraje regulatorio', read: 'Si una stablecoin paga premios sin ser depósito, compite por el fondeo barato de los bancos. Menos depósitos estables implica menos transformación de plazos y fondeo más caro y nervioso. El emisor no tiene seguro ni prestamista: si promete valor 1 a 1 a la vista, la lógica de Diamond-Dybvig le aplica. La regla entra en vigor el 18 de enero.' },
    { topic: 'S6', date: '2026-10-16', title: 'La Fed incorpora el crédito privado a sus cuentas financieras: más de US$2.6 billones en activos', source: 'Federal Reserve, FEDS Notes', url: 'https://www.federalreserve.gov/econres/notes/feds-notes/introducing-private-credit-into-the-financial-accounts-of-the-united-states-20261016.html', tool: 'Crédito fuera de la regulación; canal de contagio', read: 'De ≈US$350 mil M en 2012 a más de US$2.6 billones: es la migración que predijo el profe, ahora ya medida. Se financia sobre todo con capital, sin corrida clásica, pero los vehículos de EUA deben US$349 mil M a bancos, y en los BDC los préstamos son cerca de dos tercios de sus pasivos. El riesgo salió del banco, pero no del todo.' },
    { topic: 'S6', date: '2026-08-27', title: 'Bancos de Wall Street chocan por la regla de capital mientras la Fed busca cerrarla antes de fin de año', source: 'Reuters, vía Devdiscourse', url: 'https://www.devdiscourse.com/article/international/3968628-focus-wall-st-banks-turn-on-each-other-as-capital-fight-nears-endgame', tool: 'Basilea III; capital contra rentabilidad; fondeo mayorista', read: 'Tras años de capital al alza, Fed recalibra hacia abajo. La disputa es por cómo cuenta el fondeo mayorista de corto plazo en el recargo G-SIB, justo el renglón más propenso a corridas. Es el dilema de la clase: más capital da estabilidad y baja el ROE, y el regulador decide dónde pararse.' },
    { topic: 'S6', date: '2026-08-25', title: 'FDIC: pérdidas no realizadas de US$326.7 mil M y depósitos no asegurados impulsan el crecimiento', source: 'FDIC, Quarterly Banking Profile 2T-2026', url: 'https://www.fdic.gov/news/speeches/2026/fdic-quarterly-banking-profile-second-quarter-2026', tool: 'Riesgo de tasa; duración; depósitos no asegurados', read: 'Tres años después de SVB, sigue habiendo pérdidas no realizadas por 5.5% del costo amortizado. El sistema gana bien (ROA de 1.37%) y sólo hay 47 bancos problema, pero todo el aumento trimestral de depósitos vino de los no asegurados: justo la combinación de vulnerabilidad que se debe vigilar, banco por banco, contra el capital.' },
  );

  // ---------------------------------------------------------------- ensayos
  E.essays.push(
    { topic: 'S6', type: 'caso', prompt: 'Explica por qué Silicon Valley Bank invirtió tanto en bonos de largo plazo y por qué eso lo volvió vulnerable, aunque casi no tuviera riesgo de crédito.',
      tools: ['Transformación de plazos', 'Riesgo de tasa', 'Duración', 'HTM y AFS', 'Capital'],
      outline: ['Tasas cero → capital de riesgo → depósitos que crecen más que el crédito', 'Por qué bonos: capital, liquidez; por qué largos: rendimiento', 'ΔP ≈ −D × Δy × P: AFS y HTM contra capital', 'Coberturas retiradas y fondeo que se seca', 'Lección: sin riesgo de crédito no significa sin riesgo'],
      model: 'SVB no quebró por malos créditos: su cartera vencida era de 0.19%, contra 0.59% del promedio de bancos. Quebró por cómo se fondeó y dónde colocó el dinero, es decir, por transformación de plazos y riesgo de tasa. La historia empieza con tasas casi en cero tras el COVID. Con tasas bajas, los inversionistas buscan retorno, los fondos de capital de riesgo levantan cantidades récord y las startups depositan ese dinero en SVB: sus depósitos pasaron de 62 mil millones de dólares en 2019 a 189 mil millones en 2021. La demanda de crédito no creció igual; su razón de préstamos a depósitos fue de 42%, contra 85% de Citizens. Había que colocar el excedente. Eligió bonos por dos razones. Primero, los títulos del gobierno y de agencias casi no tienen riesgo de crédito y consumen muy poco capital regulatorio, lo que mejora la rentabilidad. Segundo, son líquidos, algo valioso porque las startups queman efectivo y retiran. Además alargó el plazo porque los bonos cortos pagaban 0.25% y los largos cerca de 1.5 a 1.8%. Esa decisión cambió riesgo de crédito por riesgo de tasa. La duración mide la sensibilidad: el precio cambia aproximadamente menos duración por cambio en la tasa. Cuando la inflación llegó a 9.1%, la Fed subió de 0.25% a 4.5% en 2022. En el portafolio disponible para la venta, con duración 3.6 y un alza cercana a 2.9 puntos, la caída fue de alrededor de 10%. En el conservado a vencimiento, con duración 6.2, la pérdida no realizada fue de 15 mil millones, casi todo su capital de 16 mil millones. Además, SVB redujo sus coberturas de 15.3 mil millones a 563 millones, y el portafolio a vencimiento no se puede cubrir sin arriesgar su clasificación. Las mismas tasas altas secaron el capital de riesgo y las startups empezaron a retirar, de modo que el banco tuvo que vender y convertir una pérdida en papel en una real. La lección es que un activo sin riesgo de crédito no es un activo sin riesgo. Lo que importa es comparar la pérdida contra el capital y contra la estabilidad del fondeo.' },
    { topic: 'S6', type: 'caso', prompt: 'Usa el modelo de Diamond-Dybvig para explicar la corrida de SVB. ¿Por qué fue tan rápida y por qué el seguro de depósitos no la detuvo?',
      tools: ['Diamond-Dybvig', 'Equilibrio autocumplido', 'Seguro de depósitos', 'Prestamista de última instancia'],
      outline: ['Dos equilibrios: el mismo banco', 'Orden de llegada: incentivo a correr', 'Disparador: 8 de marzo', '94% sin seguro; red de fondos; banca móvil', 'Respuesta: cobertura total y liquidez a valor par'],
      model: 'Diamond y Dybvig explican que un banco toma depósitos a la vista y los invierte a largo plazo. Ese contrato crea dos equilibrios. En el bueno, cada quien retira sólo si lo necesita y el banco cumple. En el malo, todos retiran porque creen que los demás lo harán; el banco debe liquidar activos con pérdida y quiebra, confirmando el temor. Como se paga a valor nominal por orden de llegada, quien llega primero cobra completo y el último nada. Por eso, con incertidumbre, correr es racional para cada depositante, aunque sea destructivo para todos. SVB es este modelo con microscopio. El balance ya era frágil: 15 mil millones de dólares de pérdidas no realizadas en bonos conservados a vencimiento, frente a 16 mil millones de capital. Esa pérdida sólo se volvía real si había que vender. El 8 de marzo, para evitar una baja de Moody\'s, el banco vendió 21 mil millones de bonos disponibles para la venta, reconoció una pérdida de 1.8 mil millones y anunció una emisión de 2.25 mil millones sin tenerla colocada. Los depositantes hicieron la pregunta de Diamond-Dybvig: si todos salen, ¿alcanza? El jueves 9 pidieron 42 mil millones y el viernes pendían otros 100 mil millones, más de 80% de los depósitos. El seguro no sirvió porque sólo cubre hasta 250 mil dólares, y cerca de 94% de los depósitos rebasaba ese límite, contra cerca de 35% en el promedio de bancos. Para una startup con millones destinados a nómina, esperar no tenía sentido. La velocidad vino de dos cosas: la concentración, porque unos cuantos fondos, como el de Peter Thiel, hablan por cientos de empresas; y la tecnología, porque se puede transferir desde el teléfono mientras se comenta en redes. Lo que antes tomaba semanas pasó en horas. Las autoridades confirmaron la teoría: el 12 de marzo garantizaron a todos los depositantes y la Fed ofreció liquidez contra bonos a valor par. Con esos dos instrumentos se borra el equilibrio malo, porque ya nadie gana por llegar primero. La lección es que un seguro con poca cobertura no elimina las corridas, y la era digital deja menos tiempo para reaccionar.' },
    { topic: 'S6', type: 'caso', prompt: 'SVB dividía sus bonos en HTM y AFS. Explica la diferencia y discute quién tiene mayor responsabilidad en el colapso: administración, reguladores, auditores, Moody\'s o los fondos.',
      tools: ['HTM y AFS', 'Riesgo de tasa', 'Capital', 'Supervisión', 'Corrida'],
      outline: ['HTM a costo; AFS a valor razonable y OCI', 'Paso de 14 a 91 mil M en HTM; no se cubre', 'Evalúa cada acusado', 'Toma una postura: la dirección es la causa; los demás amplifican', 'Matiz: ≈500 bancos con más riesgo de tasa: el fondeo hace la diferencia'],
      model: 'Bajo la contabilidad estadounidense, un bono conservado a vencimiento (HTM) se registra a costo amortizado: si baja su precio, la pérdida sólo aparece en una nota. Un bono disponible para la venta (AFS) va a valor razonable y la pérdida reduce capital mediante otro resultado integral, aunque no pasa por resultados hasta venderse. La lógica es que, si no vas a vender, los vaivenes no importan. El supuesto clave es que realmente no tendrás que vender. SVB aumentó su HTM de 14 mil a 91 mil millones de dólares entre 2019 y 2022, mientras su AFS sólo pasó de 14 mil a 26 mil millones. Así, el alza de tasas de 2022 generó 15 mil millones en pérdidas, casi igual a su capital de 16 mil millones, sin tocar el capital reportado. Por eso le decían “hide ’til maturity”. Además, esa etiqueta impide cubrir el riesgo: fue una decisión de no cubrirse. Hay muchos culpables, pero sostengo que la responsabilidad principal es de la dirección y del consejo. Alargaron el plazo cuando el fondeo era de startups, redujeron coberturas de 15.3 mil millones a 563 millones, usaron modelos equivocados de tasas e ignoraron observaciones regulatorias. También anunciaron la necesidad de capital antes de asegurarlo. En segundo lugar está la supervisión: la Fed le dio una calificación CAMELS de 2 en agosto de 2022 y la regulación se había relajado en 2018, con el CEO en el consejo de su propio supervisor. KPMG dio una opinión limpia 14 días antes y el marco contable facilitó la opacidad, pero la pérdida estaba revelada para quien quisiera leerla; de hecho, un analista de Morgan Stanley ya recomendaba vender. Moody\'s sólo aceleró lo inevitable. Los fondos de capital de riesgo detonaron la corrida, pero Diamond-Dybvig explica que actuaron racionalmente: culparlos es culpar al equilibrio. Un matiz importa: cerca de 500 bancos tenían más riesgo de tasa si se suman sus préstamos, y no quebraron. La diferencia fue el fondeo, 94% sin seguro y muy concentrado. Por eso la lección no es sólo contable: la pérdida en papel se vuelve real cuando el pasivo no aguanta.' },
    { topic: 'S6', type: 'caso', prompt: '¿La regulación bancaria funcionó en el caso de SVB y Credit Suisse? Argumenta con la evolución desde 1933 y la respuesta de las autoridades en 2023.',
      tools: ['Seguro de depósitos', 'Prestamista de última instancia', 'Basilea III', 'Riesgo moral', 'Crédito privado'],
      outline: ['Arquitectura de 1933: quiebras casi desaparecen', 'Menos quiebras, montos mayores: 2008 y 2023', 'SVB: Tier 1 alto y aun así quiebra; huecos', 'Respuesta 2023: contagio contenido, costo de riesgo moral', 'Postura: medicina que funciona, imperfecta'],
      model: 'Mi respuesta es la del profesor: la medicina funciona, pero no es perfecta. Tras las quiebras en cadena de 1929 a 1933, Estados Unidos creó el seguro de depósitos, reforzó a la Fed como prestamista de última instancia, separó la banca comercial de la de inversión y fortaleció la información con la SEC. Las quiebras casi desaparecieron por décadas. Después de 2008, Basilea III sumó más capital, por riesgos de crédito, mercado y operación. Pero el dato incómodo es que, cuando hay crisis, ahora son pocos bancos con montos gigantes. SVB muestra tres huecos. Primero, el capital medía mal el riesgo: su Tier 1 era de 15.26%, superior al de Citizens y al de PNC, porque los bonos gubernamentales casi no requieren capital; sin embargo, sus pérdidas no realizadas de 15 mil millones de dólares casi igualaban su capital de 16 mil millones. Segundo, el seguro sólo cubría 250 mil dólares y 94% de sus depósitos rebasaba ese límite, así que no desactivó el incentivo de Diamond-Dybvig. Tercero, la supervisión llegó tarde: la Fed le dio una calificación de 2 en 2022, y la regulación para bancos medianos se relajó en 2018. Credit Suisse agrega que ni siquiera un gran banco global con más regulación escapa a una pérdida de confianza. La respuesta de 2023, sin embargo, sí muestra que la arquitectura aprendió. Las autoridades cubrieron a todos los depositantes, dieron liquidez contra bonos a valor par y Suiza arregló la venta a UBS. Hubo contagio, con Signature y First Republic, pero nada parecido a 4,000 bancos quebrados ni a una caída de la oferta monetaria como en la Depresión. El costo fue doble. Hay riesgo moral: si un banco de lugar 16 resulta sistémico, el límite del seguro pierde credibilidad y baja la disciplina de mercado. Y el capital elevado reduce la rentabilidad, por lo que el crédito migra a fondos y otros no bancos menos regulados. Concluyo que la regulación logró reducir la frecuencia y la profundidad de las crisis, pero las mueve de lugar. Su éxito se debe medir por crisis evitadas, no por quiebras cero.' },

    { topic: 'S6', type: 'noticia', prompt: 'Reuters reportó en agosto de 2026 que la Fed busca cerrar antes de fin de año su reforma de capital bancario, con grandes bancos enfrentados por cómo cuenta el fondeo mayorista. Interpreta con las herramientas del curso.',
      tools: ['Basilea III', 'Capital', 'Fondeo de corto plazo', 'Diamond-Dybvig', 'Crédito no bancario'],
      outline: ['El hecho y la dirección de la reforma', 'Por qué existe el capital: pérdidas inesperadas', 'Fondeo mayorista: mismo riesgo de corrida', 'Trade-off rentabilidad–estabilidad y migración a no bancos', 'Qué vigilar'],
      model: 'Reuters reportó el 27 de agosto de 2026 que la Fed está terminando una amplia reforma de las reglas de capital, y que se espera que la vicepresidenta de Supervisión, Michelle Bowman, se mantenga cerca del borrador para concluir antes de fin de año. La disputa entre bancos es por el recargo a bancos sistémicos: la propuesta cambiaría cómo se mide el fondeo mayorista de corto plazo. JPMorgan y Bank of America, más apoyados en depósitos, se oponen; Goldman Sachs y Morgan Stanley, que usan más repos y papel comercial, la apoyan. Esta noticia se interpreta con el dilema central de la intermediación. El capital es un colchón para pérdidas inesperadas; las reservas cubren las esperadas. Tras 2008, los reguladores exigieron más capital y el sistema fue más estable, pero bajó la rentabilidad. Los bancos valen cerca de una vez su valor en libros y prestar da un retorno bajo, así que han pasado a comisiones y medios de pago, y el crédito ha migrado a no bancos. La reforma es un intento de recalibrar ese equilibrio: los bancos dicen que el capital excesivo los saca del negocio, y es razonable. Lo interesante es el tema específico. El fondeo mayorista de corto plazo es, en la lógica de Diamond y Dybvig, el pasivo más propenso a corridas: no tiene seguro, se puede cortar en horas y fue el centro del pánico de 2008. Por eso cómo se mide no es un detalle técnico. Si se suaviza, se reduce un costo justo donde hay más fragilidad; es fácil ver por qué cada banco defiende su modelo de fondeo. La lección de SVB también aplica: su Tier 1 era de 15%, y aun así quebró porque la regla no capturó el riesgo de tasa ni la concentración de depósitos sin seguro. Por eso la pregunta correcta no es sólo cuánto capital, sino qué riesgos mide. Mi lectura es que relajar puede devolver crédito a los bancos, lo cual es positivo frente a un sector no bancario menos supervisado. Pero conviene vigilar que la baja de capital no coincida con mayor dependencia de fondeo de corto plazo. La política fiscal pagaría la cuenta de un error, como en 2008.' },
    { topic: 'S6', type: 'noticia', prompt: 'Una nota de la Fed de octubre de 2026 incorporó el crédito privado a las cuentas financieras de EUA: más de US$2.6 billones en activos. ¿Qué significa para la estabilidad financiera?',
      tools: ['Transformación de liquidez', 'Banca paralela', 'Contagio', 'Regulación de capital', 'Diamond-Dybvig'],
      outline: ['El hecho y las cifras', 'Por qué creció: capital caro en bancos', 'Por qué no hay corrida clásica', 'Dónde sí puede haber contagio: fondeo bancario, BDC', 'Paralelo con 2008; conclusión'],
      model: 'Una nota de la Reserva Federal publicada el 16 de octubre de 2026 incorporó por primera vez el crédito privado a las cuentas financieras de Estados Unidos. Los activos de estos vehículos pasaron de unos 350 mil millones de dólares en 2012 a más de 2.6 billones a finales de 2025, con cerca de 1.5 billones prestados a empresas estadounidenses. El dato confirma lo que vimos en clase: los bancos ya no son los protagonistas. La causa es regulatoria. Tras 2008, Basilea III exigió más capital, y el capital es caro: prestar desde el balance dejó de ser atractivo, con retornos cercanos a 4%, y los bancos se movieron a comisiones. El crédito no desapareció: se fue a quien no tiene ese requisito. ¿Eso es más peligroso? Primero, un argumento a favor. Estos fondos se financian sobre todo con capital y no reciben depósitos, así que no hacen la transformación de liquidez que define a un banco. Sin promesa de valor nominal a la vista, no aplica la corrida de Diamond y Dybvig: el inversionista recibe su dinero cuando el fondo vende. El riesgo lo absorbe quien eligió tomarlo. Segundo, los argumentos en contra. La nota muestra que los vehículos estadounidenses deben 349 mil millones de dólares a bancos, y en las compañías de desarrollo de negocios los préstamos bancarios son cerca de dos tercios de sus pasivos. Así, el riesgo puede volver al banco, que es lo que sucedió en 2008 con las hipotecas en vehículos fuera de balance. Además, la opacidad importa: en 2008 el pánico creció porque nadie sabía quién tenía qué. Por eso medirlo es en sí una buena noticia. También hay un riesgo de liquidez distinto si estos productos se venden a inversionistas minoristas con promesas de retiro periódico: ahí sí aparece un pequeño descalce. Mi conclusión es que hoy el crédito privado es una fuente más estable que un depósito, pero su tamaño ya lo vuelve sistémico por conexión, no por corrida. Representa 6% de la deuda de empresas no financieras, por lo que no es 2008. La regulación debe seguir el riesgo y no sólo la licencia: vigilar el fondeo bancario, el apalancamiento y la información.' },
    { topic: 'S6', type: 'noticia', prompt: 'El reporte del FDIC del 2T-2026 muestra US$326.7 mil M en pérdidas no realizadas y que todo el aumento de depósitos vino de cuentas no aseguradas. ¿Podría repetirse SVB?',
      tools: ['Riesgo de tasa', 'Duración', 'HTM y AFS', 'Depósitos no asegurados', 'Prestamista de última instancia'],
      outline: ['El hecho', 'Por qué sigue la pérdida: duración y tasas', 'Lectura contra capital y utilidades', 'Las dos condiciones de SVB y qué cambió', 'Conclusión condicional'],
      model: 'El reporte trimestral del FDIC, publicado el 25 de agosto de 2026, indica que los bancos estadounidenses tienen pérdidas no realizadas por 326.7 mil millones de dólares en valores, 5.5% de su costo amortizado, aunque por debajo de 6.8% de un año antes. También muestra que los depósitos crecieron 0.8% en el trimestre y que todo el aumento provino de depósitos no asegurados. ¿Podría repetirse SVB? Para responder, recordemos la mecánica. El precio de un bono cambia aproximadamente en menos duración por el cambio en la tasa. Los bonos comprados con tasas bajas en 2020 y 2021 siguen valiendo menos que su costo, y esa pérdida baja conforme se acercan al vencimiento o caen las tasas. Por eso sigue ahí después de tres años: es la huella de la subida más rápida en décadas. Con clasificación a vencimiento, parte de esa pérdida no toca el capital reportado. Pero la pérdida por sí sola no quiebra a un banco. El caso de SVB enseña que hay que dividirla entre el capital y mirar el pasivo. SVB tenía pérdidas casi iguales a su capital y 94% de los depósitos sin seguro, concentrados en una red de empresas conectadas. Por eso el papel se volvió realidad cuando tuvo que vender. Hoy, el sistema en conjunto se ve más sano: el retorno sobre activos es de 1.37%, las utilidades trimestrales de 90.1 mil millones de dólares ayudan a absorber pérdidas, sólo hay 47 bancos problemáticos y el fondo de seguro está en 1.48% de los depósitos asegurados. Además, ya sabemos que las autoridades intervienen: en 2023 cubrieron a todos los depositantes y prestaron contra bonos, lo cual reduce el incentivo a correr. El dato que sí vigilaría es el de los depósitos no asegurados. Si crecen, en la lógica de Diamond y Dybvig crece la parte del pasivo con razones para correr, y la banca digital reduce el tiempo de reacción. También, los promedios ocultan a los bancos pequeños. Concluyo que una crisis sistémica por este canal es poco probable hoy, pero un caso aislado sí es posible en un banco con mucha duración, poco capital y depositantes concentrados. La pregunta se responde banco por banco.' },
    { topic: 'S6', type: 'noticia', prompt: 'El 21 de octubre de 2026 la OCC emitió su regla final del GENIUS Act: prohíbe al emisor pagar rendimiento por sólo tener la stablecoin, pero revisará caso por caso los premios. ¿Por qué les preocupa a los bancos?',
      tools: ['Transformación de plazos', 'Depósitos y fondeo', 'Diamond-Dybvig', 'Arbitraje regulatorio', 'Seguro de depósitos'],
      outline: ['El hecho', 'Por qué el depósito es clave para prestar', 'Stablecoin como depósito sin banco', 'Corrida posible: promesa 1 a 1 sin seguro ni prestamista', 'Balance y postura'],
      model: 'El 21 de octubre de 2026, la Oficina del Contralor de la Moneda de Estados Unidos emitió la primera regla final para aplicar el GENIUS Act, que entra en vigor el 18 de enero. Mantiene la prohibición de que el emisor pague intereses por el solo hecho de tener la stablecoin, pero no define qué premios son válidos: los revisará caso por caso, y las plataformas deberán pedir aprobación. Los bancos lo ven como una amenaza, y el Clarity Act, que podría endurecer los límites, se estancó en el Senado. La herramienta para interpretarlo es la transformación de plazos. Un banco existe porque toma depósitos baratos a la vista y los presta a largo plazo; ese es el fondeo de su crédito. Si los clientes mueven saldos a un instrumento líquido que además da un premio, el banco pierde depósitos baratos. Tendría que pagar más, prestar menos o depender de fondeo mayorista, que es más inestable. En un sector que ya sufre por capital caro, sería otra presión para que el crédito siga migrando fuera de los bancos. También hay arbitraje regulatorio, como dijo el profesor sobre las fintech: se ofrece un servicio parecido a un depósito sin el capital ni la supervisión de un banco. Pero hay un ángulo más interesante: la estabilidad. Una stablecoin promete valer un dólar a la vista, y esa es la misma promesa que define al depósito. Si sus reservas son bonos cortos, el descalce es pequeño, pero no nulo: ante dudas, llegar primero sigue siendo racional. Es Diamond y Dybvig sin seguro de depósitos ni prestamista de última instancia; un retiro masivo podría forzar ventas de bonos. Del otro lado, conviene no exagerar. La nota de CoinDesk indica que los depósitos han seguido creciendo a la par de la adopción, y competir por los depósitos puede beneficiar a los ahorradores, que a menudo reciben poco. Además, los bancos responden con depósitos tokenizados. Mi lectura es que, en el corto plazo, el riesgo es sobre todo de rentabilidad y de costo de fondeo para bancos pequeños, más que sistémico. Lo que hay que vigilar es qué tan grande se vuelve y qué rendimiento se permite.' },
  );

  // ---------------------------------------------------------------- repaso
  E.repaso.push({ topic: 'S6', icon: '🏧', title: 'Intermediación bancaria y corridas', items: [
    ['Transformación de plazos', 'Tomar depósitos a la vista a valor nominal e invertir a largo plazo: es lo que hace especial al banco.'],
    ['Fondo o casa de bolsa', 'Devuelve valor de mercado, no nominal: no hay corrida clásica.'],
    ['Diamond-Dybvig', 'Dos equilibrios para el mismo banco; la corrida es autocumplida y racional para cada quien.'],
    ['Bernanke 1983', 'Quiebra bancaria destruye información de crédito, encarece intermediación y trae deflación de deuda.'],
    ['Seguro de depósitos', 'FDIC 1933, IPAB; quita el motivo para correr, sólo sobre lo cubierto (US$250 mil en EUA).'],
    ['Prestamista de última instancia', 'Liquidez a bancos solventes contra garantía; evita malbaratar. No arregla insolvencia.'],
    ['Reservas contra capital', 'Reservas: pérdida esperada. Capital: pérdida inesperada.'],
    ['ICAP', 'Capital ÷ activos ponderados por riesgo; México ≈20%, mínimo 10.5%; soberano pondera 0%.'],
    ['Duración', 'ΔP ≈ −D × Δy × P. A más plazo, más pérdida: 10 años pierde ≈9.6 veces lo de 1 año.'],
    ['HTM y AFS', 'HTM: costo amortizado, nota al pie, no se cubre. AFS: valor razonable, pérdida en OCI.'],
    ['SVB en una frase', 'Cambió riesgo de crédito por riesgo de tasa, financiado con 94% de depósitos sin seguro.'],
    ['Números de SVB', 'HTM −15 contra capital 16; 42 retirados el jueves y 100 pedidos el viernes (miles de M).'],
    ['Costo de regular', 'Más capital → menos ROE y P/B ≈1 → crédito migra a no bancos.'],
    ['¿Funcionó?', 'Menos quiebras, montos mayores: la medicina funciona, pero no es perfecta.'],
  ] });
})();
