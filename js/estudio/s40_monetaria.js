// S4 — Política monetaria: inflación, Fisher, Taylor, paridades, carry trade, control de la curva (caso BoJ) y bancos.
(function () {
  const F = E.fmt;
  const pc = (v, d = 2) => F.pct(v, d);
  const sg = (v, d = 2) => (v > 0 ? '+' : v < 0 ? '−' : '') + F.pct(Math.abs(v), d);

  // ---------------------------------------------------------------- funciones del laboratorio (verificadas a mano)
  const fisherExact = (i, p) => (1 + i) / (1 + p) - 1;
  const taylor = (a) => a.rn + a.pi + 0.5 * (a.pi - a.tg) + 0.5 * a.gap;
  const forward = (S, i, ie) => S * (1 + i) / (1 + ie);
  const carryR = (iM, iJ, a) => (1 + iM) / (1 + a) / (1 + iJ) - 1; // a = S1/S0 − 1 (apreciación del yen)
  const bondP = (c, y, n = 10) => { let p = 0; for (let t = 1; t <= n; t++) p += (100 * c) / Math.pow(1 + y, t); return p + 100 / Math.pow(1 + y, n); };

  // ---------------------------------------------------------------- ilustraciones
  const figSD = `<svg class="ill" viewBox="0 0 760 270" role="img" aria-label="Dos diagramas de oferta y demanda: un choque de oferta y uno de demanda suben el precio, pero la cantidad se mueve en sentido contrario">
    <g><text x="170" y="22" text-anchor="middle" font-size="15" font-weight="700">Choque de oferta</text>
      <line x1="50" y1="240" x2="310" y2="240" class="ln"/><line x1="50" y1="240" x2="50" y2="40" class="ln"/>
      <line x1="70" y1="70" x2="290" y2="220" class="ln s2"/><line x1="70" y1="220" x2="290" y2="70" class="ln s1"/><line x1="40" y1="190" x2="240" y2="55" class="ln s1 dash"/>
      <text x="294" y="226" font-size="13" class="t2">D</text><text x="294" y="74" font-size="13" class="t2">S₀</text><text x="212" y="52" font-size="13" class="t2">S₁</text>
      <circle cx="180" cy="145" r="5" class="f1"/><circle cx="137" cy="116" r="6" class="fbad"/>
      <text x="60" y="262" font-size="12" class="tm">Ormuz, sequía, cadenas rotas: P↑ y Q↓</text></g>
    <g transform="translate(400,0)"><text x="170" y="22" text-anchor="middle" font-size="15" font-weight="700">Choque de demanda</text>
      <line x1="50" y1="240" x2="310" y2="240" class="ln"/><line x1="50" y1="240" x2="50" y2="40" class="ln"/>
      <line x1="70" y1="220" x2="290" y2="70" class="ln s1"/><line x1="70" y1="70" x2="290" y2="220" class="ln s2"/><line x1="110" y1="50" x2="330" y2="200" class="ln s2 dash"/>
      <text x="294" y="74" font-size="13" class="t2">S</text><text x="294" y="226" font-size="13" class="t2">D₀</text><text x="318" y="186" font-size="13" class="t2">D₁</text>
      <circle cx="180" cy="145" r="5" class="f1"/><circle cx="214" cy="122" r="6" class="fbad"/>
      <text x="60" y="262" font-size="12" class="tm">Cheques COVID, más dinero: P↑ y Q↑</text></g>
  </svg>`;

  const figQ = `<svg class="ill" viewBox="0 0 640 170" role="img" aria-label="Teoría cuantitativa: M por V igual a P por Q; si V y Q están fijos, más M se va a P">
    <rect x="30" y="50" width="100" height="70" rx="10" class="fbad"/><text x="80" y="92" text-anchor="middle" font-size="26" class="tw" font-weight="800">M ↑</text>
    <text x="150" y="94" text-anchor="middle" font-size="22">×</text>
    <rect x="170" y="50" width="100" height="70" rx="10" class="w3"/><text x="220" y="92" text-anchor="middle" font-size="26" font-weight="800">V</text>
    <text x="320" y="94" text-anchor="middle" font-size="26" font-weight="800">=</text>
    <rect x="370" y="50" width="100" height="70" rx="10" class="fbad"/><text x="420" y="92" text-anchor="middle" font-size="26" class="tw" font-weight="800">P ↑</text>
    <text x="490" y="94" text-anchor="middle" font-size="22">×</text>
    <rect x="510" y="50" width="100" height="70" rx="10" class="w3"/><text x="560" y="92" text-anchor="middle" font-size="26" font-weight="800">Q</text>
    <text x="80" y="38" text-anchor="middle" font-size="12" class="t2">dinero</text><text x="220" y="38" text-anchor="middle" font-size="12" class="t2">velocidad</text><text x="420" y="38" text-anchor="middle" font-size="12" class="t2">precios</text><text x="560" y="38" text-anchor="middle" font-size="12" class="t2">producto</text>
    <text x="220" y="142" text-anchor="middle" font-size="12" class="tm">fija: tecnología de pagos</text><text x="560" y="142" text-anchor="middle" font-size="12" class="tm">fijo en el corto plazo</text>
  </svg>`;

  const figFisher = `<svg class="ill" viewBox="0 0 760 320" role="img" aria-label="Tres columnas: con tasa nominal fija, si baja la inflación crece la tasa real; en Japón la tasa nominal es cero con inflación negativa, así que la real es positiva">
    <line x1="30" y1="220" x2="740" y2="220" class="ln"/>
    <text x="150" y="22" text-anchor="middle" font-size="14" font-weight="700">Fed: i ≈ 3.9%, π 3.7%</text>
    <rect x="90" y="109" width="120" height="111" class="f5"/><text x="150" y="170" text-anchor="middle" font-size="14" class="tw" font-weight="700">π = 3.7</text>
    <rect x="90" y="103" width="120" height="5" class="f1"/><text x="150" y="95" text-anchor="middle" font-size="13" font-weight="700">r ≈ 0.2</text>
    <text x="380" y="22" text-anchor="middle" font-size="14" font-weight="700">Fed igual, baja π a 2.5%</text>
    <rect x="320" y="145" width="120" height="75" class="f5"/><text x="380" y="188" text-anchor="middle" font-size="14" class="tw" font-weight="700">π = 2.5</text>
    <rect x="320" y="103" width="120" height="40" class="f1"/><text x="380" y="128" text-anchor="middle" font-size="14" class="tw" font-weight="700">r ≈ 1.4</text>
    <text x="620" y="22" text-anchor="middle" font-size="14" font-weight="700">Japón: i = 0, π = −2%</text>
    <rect x="560" y="160" width="120" height="58" class="f1"/><text x="620" y="194" text-anchor="middle" font-size="14" class="tw" font-weight="700">r ≈ +2</text>
    <rect x="560" y="222" width="120" height="58" class="f5"/><text x="620" y="256" text-anchor="middle" font-size="14" class="tw" font-weight="700">π = −2</text>
    <path d="M216 120 L312 120" class="ln anim-flow"/><text x="264" y="110" text-anchor="middle" font-size="12" class="t2">sin mover i</text>
    <text x="150" y="245" text-anchor="middle" font-size="12" class="tm">casi neutra o laxa</text><text x="380" y="245" text-anchor="middle" font-size="12" class="tm">se aprieta sola</text>
    <text x="620" y="305" text-anchor="middle" font-size="12" class="tm">parece laxa, es restrictiva</text>
  </svg>`;

  const figKite = `<svg class="ill" viewBox="0 0 700 220" role="img" aria-label="El banco central sujeta el extremo corto de la curva; la tasa larga vuela como papalote guiada por expectativas">
    <line x1="40" y1="190" x2="670" y2="190" class="ln"/><text x="40" y="210" font-size="12" class="tm">Corto plazo (1 a 28 días)</text><text x="670" y="210" text-anchor="end" font-size="12" class="tm">Largo plazo (10 a 30 años)</text>
    <circle cx="90" cy="150" r="26" class="f1"/><text x="90" y="155" text-anchor="middle" font-size="13" class="tw" font-weight="700">Banco</text>
    <path d="M112 138 C 260 180, 400 60, 545 72" class="ln s1"/>
    <path d="M545 72 L600 30 L640 90 L580 112 Z" class="f4"/><text x="592" y="78" text-anchor="middle" font-size="13" class="tw" font-weight="700">10 años</text>
    <path d="M280 40 L470 40" class="ln anim-flow"/><text x="372" y="28" text-anchor="middle" font-size="13" class="t2">el viento: expectativas, inflación, déficit</text>
  </svg>`;

  const figUIP = `<svg class="ill" viewBox="0 0 680 210" role="img" aria-label="La paridad descubierta: 6 por ciento en México menos 2 por ciento de depreciación iguala 4 por ciento en Estados Unidos">
    <text x="170" y="22" text-anchor="middle" font-size="14" font-weight="700">Invierto en México</text>
    <text x="510" y="22" text-anchor="middle" font-size="14" font-weight="700">Invierto en EUA</text>
    <line x1="20" y1="180" x2="660" y2="180" class="ln"/>
    <rect x="110" y="60" width="120" height="120" class="f2"/><rect x="110" y="60" width="120" height="40" class="fbad"/>
    <text x="170" y="86" text-anchor="middle" font-size="13" class="tw" font-weight="700">−2% peso</text><text x="170" y="145" text-anchor="middle" font-size="14" class="tw" font-weight="700">i = 6%</text>
    <rect x="450" y="100" width="120" height="80" class="f4"/><text x="510" y="145" text-anchor="middle" font-size="14" class="tw" font-weight="700">i* = 4%</text>
    <line x1="230" y1="100" x2="450" y2="100" class="ln dash"/><text x="340" y="92" text-anchor="middle" font-size="13" font-weight="700">indiferente en 4%</text>
    <text x="340" y="202" text-anchor="middle" font-size="12" class="tm">Más de 2% esperado: me voy a EUA. Menos de 2%: me vengo a México.</text>
  </svg>`;

  const figCarry = `<svg class="ill" viewBox="0 0 860 240" role="img" aria-label="Carry trade: pides yenes baratos, los cambias por pesos, inviertes a tasa alta, recompras yenes y pagas. Si el yen se aprecia, tienes que recomprarlo más caro">
    <rect x="20" y="60" width="170" height="80" rx="10" class="f4"/><text x="105" y="93" text-anchor="middle" font-size="14" class="tw" font-weight="700">1. Pides yenes</text><text x="105" y="115" text-anchor="middle" font-size="13" class="tw">pagas i¥ bajita</text>
    <rect x="240" y="60" width="170" height="80" rx="10" class="f2"/><text x="325" y="93" text-anchor="middle" font-size="14" class="tw" font-weight="700">2. Compras pesos</text><text x="325" y="115" text-anchor="middle" font-size="13" class="tw">al tipo S₀</text>
    <rect x="460" y="60" width="170" height="80" rx="10" class="f1"/><text x="545" y="93" text-anchor="middle" font-size="14" class="tw" font-weight="700">3. Cetes / bonos</text><text x="545" y="115" text-anchor="middle" font-size="13" class="tw">cobras i$ alta</text>
    <rect x="680" y="60" width="170" height="80" rx="10" class="f5"/><text x="765" y="93" text-anchor="middle" font-size="14" class="tw" font-weight="700">4. Recompras yenes</text><text x="765" y="115" text-anchor="middle" font-size="13" class="tw">al tipo S₁ y pagas</text>
    <path d="M190 100 L240 100" class="ln anim-flow"/><path d="M410 100 L460 100" class="ln anim-flow"/><path d="M630 100 L680 100" class="ln anim-flow"/>
    <path d="M765 150 L765 190 L420 190" class="ln sbad"/><text x="410" y="185" text-anchor="end" font-size="13" font-weight="700">Si el yen sube, S₁ &gt; S₀:</text><text x="410" y="205" text-anchor="end" font-size="13" class="t2">todos corren a recomprar yenes y eso lo sube más.</text>
    <text x="430" y="36" text-anchor="middle" font-size="14" font-weight="700">Ganancia = diferencial de tasas ± movimiento del tipo de cambio</text>
  </svg>`;

  const figYCC = `<svg class="ill" viewBox="0 0 720 300" role="img" aria-label="Curva de rendimientos de Japón con una abolladura en 10 años: rendimiento teórico 0.9 por ciento, observado 0.511 por ciento el 31 de enero de 2023">
    <line x1="60" y1="260" x2="690" y2="260" class="ln"/><line x1="60" y1="260" x2="60" y2="30" class="ln"/>
    <text x="375" y="290" text-anchor="middle" font-size="12" class="tm">Plazo (años)</text><text x="24" y="150" text-anchor="middle" font-size="12" class="tm" transform="rotate(-90 24 150)">Rendimiento (%)</text>
    <text x="50" y="264" text-anchor="end" font-size="11" class="tm">0</text><text x="50" y="164" text-anchor="end" font-size="11" class="tm">1</text><text x="50" y="64" text-anchor="end" font-size="11" class="tm">2</text>
    <line x1="60" y1="209" x2="690" y2="209" class="lnm dash"/><text x="686" y="202" text-anchor="end" font-size="12" class="t2">techo 0.5% (ene-2023)</text>
    <path d="M70 262 C 140 245, 210 205, 270 170 C 340 130, 450 110, 660 70" class="ln dash"/>
    <path d="M70 262 C 140 245, 200 225, 240 212 C 262 206, 268 208, 275 208 C 290 200, 300 160, 340 140 C 430 112, 540 92, 660 70" class="ln s1"/>
    <circle cx="270" cy="170" r="6" class="fbad"/><circle cx="270" cy="209" r="6" class="f1"/>
    <path d="M270 178 L270 200" class="ln sbad"/>
    <text x="284" y="168" font-size="13" font-weight="700">0.9% lo que quería el mercado</text><text x="284" y="232" font-size="13" font-weight="700">0.511% lo observado</text>
    <text x="284" y="250" font-size="12" class="t2">la diferencia la paga el BoJ comprando bonos</text>
  </svg>`;

  // ---------------------------------------------------------------- bancos
  E.bank.push(
    { topic: 'S4', q: 'La Fed mantiene su tasa sin cambio y los datos muestran que la inflación sigue bajando. Según Fisher, ¿qué pasa con la postura monetaria?', o: ['Se vuelve más laxa, porque la tasa no subió', 'No cambia, porque la tasa nominal es la misma', 'Se vuelve más restrictiva, porque la tasa real sube', 'Se vuelve más laxa, porque baja la inflación esperada'], a: 2, w: 'r = i − π. Con i fija y π a la baja, r sube sin que la Fed mueva un dedo. Es el ejemplo del profe para las noticias.' },
    { topic: 'S4', q: 'Japón tuvo tasa nominal cercana a cero con inflación de −2%. ¿Cómo se clasifica esa política?', o: ['Restrictiva: la tasa real es cercana a +2%', 'Muy expansiva: la tasa nominal es cero', 'Neutral: una tasa cero nunca aprieta', 'Imposible de clasificar sin el tipo de cambio'], a: 0, w: 'Fisher: r ≈ 0 − (−2) = +2%. Por eso el profe insiste en que la tasa sola no dice si la política es expansiva.' },
    { topic: 'S4', q: '¿Por qué los bancos centrales dejaron de guiarse por la cantidad de dinero y pasaron a guiarse por la tasa de interés?', o: ['Porque la teoría cuantitativa quedó demostrada como falsa', 'Porque la innovación financiera volvió inestable la relación entre agregados monetarios y gasto', 'Porque la ley les prohibió medir M1 y M2', 'Porque la tasa de interés es directamente la inflación'], a: 1, w: 'El profe no dice que la teoría sea falsa: a largo plazo la inflación sigue dependiendo del dinero. El problema es saber en qué M fijarse (M1 a M4) cuando cambian los medios de pago.' },
    { topic: 'S4', q: 'Una lectura de inflación alta viene de un cierre del estrecho de Ormuz. ¿Cuál es la lectura más alineada con el curso?', o: ['Es demanda: conviene bajar tasas', 'No afecta los precios relativos', 'Es monetaria: se resuelve reduciendo M1', 'Es un choque de oferta: en principio transitorio, salvo que contamine expectativas y se generalice'], a: 3, w: 'Un choque de oferta manda una señal de escasez y el mercado se ajusta. Se vuelve problema de banco central si el alza se generaliza y se sostiene, y eso depende de expectativas.' },
    { topic: 'S4', q: '¿Qué dos condiciones necesitan cumplirse para hablar de inflación?', o: ['Alza generalizada y sostenida de los precios', 'Alza del dólar y baja de salarios', 'Déficit fiscal y déficit externo', 'Alza de la gasolina y de los alimentos'], a: 0, w: 'Si sólo sube un precio, o sube una vez, es un cambio de precio relativo. El mercado sí entiende esa señal; con inflación, la señal se pierde.' },
    { topic: 'S4', q: 'En la regla de Taylor, si la inflación está arriba de la meta y el producto está debajo del potencial:', o: ['Las dos brechas piden subir la tasa', 'Las dos brechas piden bajar la tasa', 'Las brechas jalan en sentidos opuestos: es un dilema', 'La regla deja de aplicar'], a: 2, w: 'La brecha de inflación empuja hacia arriba y la de producto hacia abajo. Es exactamente el escenario de estanflación por choque de oferta.' },
    { topic: 'S4', q: '¿Qué variable de la regla de Taylor es la más difícil de medir, según el profe?', o: ['La inflación observada', 'La tasa neutral r*', 'La meta de inflación', 'La tasa de política actual'], a: 1, w: 'r* no se observa, sólo se estima (Banxico publica un intervalo). Ahí, dijo el profe, entra más el arte que la ciencia.' },
    { topic: 'S4', q: 'El banco central controla la tasa a 1 día, y las empresas deciden inversión con la de 10 años. ¿Qué conecta ambas?', o: ['Una ley que fija el diferencial', 'Nada: son independientes', 'Las reservas internacionales', 'Las expectativas y la credibilidad: la tasa de política funciona como centro de gravedad'], a: 3, w: 'No es perfecto pero funciona: el mercado anticipa la tasa futura. Por eso la credibilidad importa tanto y por eso Japón prefirió ir directo a la tasa larga.' },
    { topic: 'S4', q: 'Tasa en México 6%, en EUA 4%. Según la paridad descubierta, ¿qué espera el mercado?', o: ['Que el peso se aprecie ≈2%', 'Que el peso se deprecie ≈2%', 'Que el tipo de cambio no se mueva', 'Que la tasa mexicana suba a 8%'], a: 1, w: 'i − i* ≈ E(ΔS)/S. Esa depreciación iguala el rendimiento en dólares: 6% − 2% ≈ 4%.' },
    { topic: 'S4', q: '¿Cuál es la diferencia clave entre paridad cubierta (CIP) y descubierta (UIP)?', o: ['La CIP usa inflación y la UIP tasas', 'La CIP aplica a bonos y la UIP sólo a acciones', 'La CIP amarra el forward por arbitraje; la UIP habla de la expectativa y deja el riesgo cambiario abierto', 'No hay diferencia práctica'], a: 2, w: 'CIP: F = S(1+i)/(1+i*), riesgo cubierto. UIP: reemplaza F por E(S₁), y sólo se cumple si el forward es el pronóstico del mercado.' },
    { topic: 'S4', q: 'Un carry trade fondeado en yenes e invertido en pesos pierde dinero cuando:', o: ['La apreciación del yen frente al peso supera el diferencial de tasas', 'El peso se aprecia frente al yen', 'Banxico mantiene su tasa', 'El BoJ mantiene su tasa baja'], a: 0, w: 'El carry gana el diferencial, pero al final hay que recomprar yenes. Si el yen sube más que el diferencial, el retorno es negativo.' },
    { topic: 'S4', q: 'Según el profe, ¿por qué el alza de tasas del BoJ le importa a México?', o: ['Porque Japón es el principal socio comercial de México', 'Porque encarece el fondeo del carry: se reduce la entrada a emergentes y sus monedas se deprecian', 'Porque el BoJ fija la tasa de Banxico', 'Porque baja el precio del petróleo'], a: 1, w: 'Sube i¥ → el carry es menos atractivo → salen capitales de emergentes → depreciación de sus monedas.' },
    { topic: 'S4', q: '¿Cómo mantiene el BoJ el rendimiento a 10 años por debajo de lo que quiere el mercado bajo YCC?', o: ['Con un decreto que prohíbe operar arriba del techo', 'Con impuestos a los bonos', 'Vendiendo bonos a 10 años', 'Comprando los bonos que hagan falta al precio correspondiente al techo'], a: 3, w: 'No es decreto: comprar sube el precio y baja el rendimiento. Si el mercado quiere vender más, el BoJ debe comprar más.' },
    { topic: 'S4', q: '¿Por qué tardó el BoJ en subir tasas cuando la Fed y el BCE ya las subían?', o: ['Porque tenía inflación de dos dígitos', 'Porque su ley le prohibía subirlas', 'Porque venía de décadas de estancamiento y deflación, y dudaba que la inflación fuera sostenida y acompañada de salarios', 'Porque el yen se estaba apreciando demasiado'], a: 2, w: 'El dilema: subir protege al yen pero frena el crecimiento. El BoJ veía inflación importada, no un 2% estable con alzas salariales.' },
    { topic: 'S4', q: '¿Cuál es el costo principal de mantener tasas bajas cuando el resto del mundo sube?', o: ['Se aprecia demasiado la moneda', 'Salen capitales, se deprecia la moneda y se encarecen las importaciones, lo que alimenta inflación', 'Baja la deuda pública', 'Aumenta la inversión extranjera en bonos locales'], a: 1, w: 'Es la otra cara del dilema de Japón: proteger el crecimiento a costa del tipo de cambio.' },
    { topic: 'S4', q: '¿Por qué la deflación puede frenar el consumo aunque abarate las cosas?', o: ['Porque la gente pospone compras y sube el peso real de las deudas', 'Porque los salarios reales siempre bajan', 'Porque aumenta la velocidad del dinero', 'Porque los bancos centrales no pueden imprimir'], a: 0, w: 'Si mañana será más barato, ahorro hoy. Además la deuda fija pesa más contra el valor de la casa y contra ingresos que no suben.' },
    { topic: 'S4', q: 'En la hiperinflación alemana de 1923 y en Argentina, ¿cuál es la raíz común?', o: ['Un choque de oferta petrolero', 'Exceso de ahorro privado', 'La independencia del banco central', 'Déficits que no se pueden financiar con deuda ni impuestos y se monetizan'], a: 3, w: 'Teoría cuantitativa + política: si el déficit no se corrige, el banco central acaba financiándolo. En Δb = d + (i − π − g)b − m, la emisión m es la válvula.' },
    { topic: 'S4', q: 'Durante COVID la Fed compró deuda pública a gran escala. ¿Cuál fue la lógica?', o: ['Evitar que un mayor déficit subiera las tasas de mercado y ahogara el estímulo; el riesgo era inflación después', 'Reducir el déficit fiscal directamente', 'Apreciar el dólar para abaratar importaciones', 'Elevar la tasa neutral'], a: 0, w: 'Fiscal y monetaria coordinadas: gasto financiado con bonos que compra el banco central. Más dinero en la economía y, según críticos, la inflación de 2021–22.' },
    { topic: 'S4', q: '¿Por qué EUA se preocupa poco por el tipo de cambio al subir o bajar tasas, y México o Japón sí?', o: ['Porque el dólar es la moneda dominante; en otros países el tipo de cambio pasa a precios y a flujos', 'Porque EUA no importa', 'Porque México y Japón tienen tipo de cambio fijo', 'Porque la Fed tiene prohibido hablar del dólar'], a: 0, w: 'El profe lo planteó así en clase del 21-oct: al emisor de la moneda dominante no le pesa igual; a los demás la moneda les pega en inflación y flujos.' }
  );

  E.essays.push(
    { topic: 'S4', type: 'caso', prompt: 'Caso Misawa: ¿por qué tardó tanto el Banco de Japón en subir sus tasas cuando el resto del mundo ya las estaba subiendo?',
      tools: ['Ecuación de Fisher', 'Solow', 'Dinámica de deuda', 'Paridad de tasas', 'Expectativas'],
      outline: ['Herencia: estancamiento y deflación desde los 90', 'Solow: población cae, PTF plana, rendimientos decrecientes', 'El 2% era importado, no sostenido: faltaban salarios', 'Costo de subir: crecimiento, deuda y pérdidas del BoJ', 'Costo de no subir: yen débil e inflación importada'],
      model: `El Banco de Japón tardó porque su problema durante treinta años fue el opuesto al del resto del mundo: no le sobraba inflación, le faltaba. Desde el estallido de la burbuja a inicios de los noventa, Japón combinó bajo crecimiento y deflación. Con Solow se ve la raíz real: la población se encoge, la productividad dejó de dar saltos y el capital ya tiene rendimientos decrecientes. Por eso los estímulos monetarios podían sostener la demanda, pero no cambiar la tendencia.

La deflación además hacía que la política fuera menos laxa de lo que parecía. Por la ecuación de Fisher, una tasa nominal de cero con inflación de −2% implica una tasa real de +2%: restrictiva. De ahí la escalada: QQE en 2013, tasa negativa en enero de 2016 y control de la curva en septiembre de 2016, siempre buscando anclar las expectativas en 2%.

Cuando en 2022 llegó la inflación, el BoJ no le creyó. El alza venía de energía, alimentos y un yen débil; es decir, de un choque de oferta importado. Ueda sostenía que el 2% sólo sería sostenible con aumentos salariales, y temía normalizar demasiado pronto y regresar a la deflación. Subir tenía además un costo fiscal enorme: la deuda japonesa es la mayor entre los países ricos, así que cada punto encarece el servicio, y el propio BoJ registraría pérdidas sobre su cartera de bonos.

El problema es que no subir también costaba. Con la Fed y el BCE apretando, el diferencial de tasas sacaba capital y debilitaba al yen, tal como predice la paridad de tasas; un yen débil encarece las importaciones y alimenta la inflación que se intentaba descartar. Ese es el dilema de política: subo la tasa y golpeo el crecimiento, pero protejo la moneda; la dejo baja y protejo el crecimiento, pero castigo el tipo de cambio y los precios.

Mi conclusión es que la tardanza fue una decisión razonable dada su historia, no descuido. Sin embargo, tenía fecha de caducidad: el mercado comenzó a apostar contra el techo, y por eso el BoJ flexibilizó el control paso a paso, hasta llegar a un 1% de referencia en julio de 2023.` },
    { topic: 'S4', type: 'caso', prompt: 'Explica qué es el control de la curva de rendimientos (YCC), por qué lo adoptó el BoJ, cómo se implementa y cuáles son sus costos.',
      tools: ['Curva de rendimientos', 'Relación precio-rendimiento', 'Transmisión monetaria', 'Paridad de tasas'],
      outline: ['Banco central normal: sólo la tasa corta', 'Por qué ir a 10 años: es la que usan las empresas', 'Cómo: compra lo necesario, no decreta', 'Costos: curva distorsionada, cartera, yen', 'Salida gradual: 0.25, 0.5, 1%'],
      model: `Un banco central ortodoxo controla sólo la tasa de muy corto plazo y confía en que, por expectativas, ésta arrastre a las tasas largas. Pero las empresas deciden sus inversiones viendo plazos largos, típicamente el bono a 10 años. Esta desconexión funciona razonablemente en condiciones normales. El BoJ, sin embargo, ya tenía la tasa corta en −0.1% y había agotado el margen en el límite inferior; además reconocía que la tasa larga también depende de factores como la política fiscal, las condiciones externas y las expectativas de inflación. Por eso decidió en septiembre de 2016 no dejar ese resultado al azar y controlar directamente el rendimiento a 10 años alrededor de 0%.

La implementación es de mercado, no por decreto. Precio y rendimiento se mueven al revés, por lo que para evitar que el rendimiento supere el techo el BoJ compra todos los bonos que sean necesarios al precio equivalente a ese techo. Si el mercado quiere 0.9% y el techo está en 0.5%, el banco compra hasta que el rendimiento baja. Eso muestra el caso para el 31 de enero de 2023: 0.9% teórico frente a 0.511% observado, una abolladura visible en la curva.

Los costos crecen con la presión. Primero, el mercado deja de funcionar: el BoJ acumula una parte enorme de la deuda, se pierde información en los precios y la curva queda distorsionada. Segundo, cuanto más compra, mayor es su pérdida potencial si los rendimientos suben; The Economist estimaba cerca de ¥7.5 billones por cada 0.25 puntos. Tercero, una tasa artificialmente baja amplía el diferencial con el exterior y, por la paridad de tasas, sale capital y se deprecia el yen, lo que encarece importaciones y genera inflación. Cuarto, invita a especuladores a apostar contra el techo, como ocurrió con Australia cuando abandonó su propio control en 2021.

Por todo eso, el BoJ fue ampliando la banda: ±0.25%, ±0.5% en diciembre de 2022 y 1% de referencia en julio de 2023. La lección es que un banco central puede fijar un precio en un mercado, pero sólo mientras esté dispuesto a pagar el costo de sostenerlo. Si la inflación sube, ese costo crece y la credibilidad se vuelve el activo en juego.` },
    { topic: 'S4', type: 'caso', prompt: '¿Cómo puede afectar la normalización monetaria de Japón a la economía global y a México? Explica el mecanismo.',
      tools: ['Carry trade', 'Paridad descubierta', 'Identidad S − I = CA', 'Flujos de capital'],
      outline: ['Japón exporta ahorro: S > I, superávit de cuenta corriente', 'Yen, moneda de fondeo: carry trade', 'Sube i¥ → diferencial cae → desarme', 'Yen se aprecia → cierres en cadena', 'Emergentes: depreciación y menor margen de Banxico'],
      model: `Japón importa al mundo más de lo que su tamaño sugiere porque es una fuente de ahorro y de fondeo. Por la identidad S − I = CA, un país que ahorra más de lo que invierte tiene superávit externo y coloca esos recursos afuera. Una década de tasas ultrabajas reforzó esto: las inversiones japonesas en valores extranjeros crecieron casi 70% en diez años y alcanzaron unos ¥531 billones. Además, tasas cercanas a cero convirtieron al yen en la moneda favorita para fondear operaciones de carry trade.

El mecanismo funciona así. Un inversionista pide prestado en yenes, compra pesos mexicanos o reales brasileños, cobra la tasa alta y al final recompra yenes. Su ganancia es el diferencial de tasas más o menos el movimiento cambiario. Como vimos en clase, un mismo bono colombiano rendía bastante más fondeado en yenes que fondeado en dólares. Por la paridad descubierta, el diferencial debería compensarse con una depreciación de la moneda de alto rendimiento; el carry apuesta precisamente a que eso no ocurra.

Cuando el BoJ normaliza, se rompe esa apuesta por dos vías. Primero, sube el costo de fondeo y baja el diferencial. Segundo, los inversionistas japoneses encuentran rendimiento en casa y repatrian capital. Al cerrar posiciones, todos compran yenes a la vez, el yen se aprecia, y las pérdidas fuerzan nuevos cierres. Por eso una alza pequeña puede tener un efecto grande: las posiciones están apalancadas, y unas semanas de apreciación pueden borrar más de un año de carry.

Para México el canal es directo. El peso es de las monedas más operadas por carry, de modo que un desarme significa salida de capitales y depreciación. Esa depreciación tiende a pasar a precios, y entonces Banxico tiene menos margen para bajar su tasa, justo cuando la economía necesita estímulo. El efecto se suma al de la Fed, ya que un diferencial más estrecho hace al peso más vulnerable. También se contagia a tasas globales: el caso reporta alzas en rendimientos de Australia y Filipinas tras el ajuste de julio de 2023.

El reto de Ueda, entonces, es de ritmo y comunicación. Normalizar sin sorpresas permite a los inversionistas salir ordenadamente; una sorpresa provoca el desorden que el FMI y el BCE ya habían advertido.` },
    { topic: 'S4', type: 'caso', prompt: 'Con base en «What Causes Inflation?» (HBR) y la clase, explica la inflación de 2021–2023. ¿Fue oferta o demanda, y por qué se equivocó la Fed con «transitoria»?',
      tools: ['Oferta y demanda agregada', 'Teoría cuantitativa', 'Expectativas', 'Fisher', 'Regla de Taylor'],
      outline: ['Definición: generalizada y sostenida', 'Oferta: cadenas, energía y alimentos', 'Demanda: cheques y Fed comprando deuda', 'Expectativas: el tercer pilar', 'Corrección: tasas reales positivas'],
      model: `La inflación es un alza generalizada y sostenida de precios, no el encarecimiento de un bien. Esa distinción explica el error de 2021. Un choque de oferta encarece bienes concretos y el mercado se ajusta; por eso la primera lectura de la Fed fue que el aumento era transitorio. Había evidencia a favor: barcos que no llegaban, escasez de trabajadores y, ya en 2022, energía y alimentos disparados por la invasión de Ucrania.

Pero también había un choque de demanda muy grande. El gobierno de EUA mandó cheques a hogares y rescató empresas, financiando el déficit con bonos que compró en buena medida la Fed. Su tenencia pasó de menos de 10% a más de 20% de la deuda. La teoría cuantitativa, MV = PQ, advertía el riesgo: si Q está limitada y entra más dinero, los precios terminan absorbiendo el ajuste. El artículo de Frick reporta una estimación de la Fed de Nueva York de 40% oferta y 60% demanda para 2021. La respuesta correcta entonces es «ambas», con un peso importante de la demanda, que sí responde a la política monetaria.

El tercer elemento es lo que hace peligrosa la espera: las expectativas. Si los trabajadores anticipan inflación, piden más salario; si las empresas lo anticipan, suben precios. La oferta transitoria puede volverse inflación persistente. Por eso los bancos centrales cuidan tanto la credibilidad, y por eso aquella decisión de esperar salió cara: en 2021 la tasa real era fuertemente negativa según Fisher, y la política era muy laxa mientras la inflación rebasaba 8%. Una regla de Taylor habría pedido subir mucho antes.

La corrección fue agresiva. La Fed pasó de casi cero a más de 5%, con lo que la tasa real se volvió positiva, y la inflación cedió. Banxico actuó antes pero también llegó muy alto, con una tasa real cercana a 6%, porque su credibilidad es menor y necesita mandar una señal más fuerte. Hubo costos: la crisis de Silicon Valley Bank surgió de esa misma alza.

La lección de gestión del artículo es prepararse tanto para la enfermedad como para la cura: la inflación encarece insumos y salarios, pero las tasas altas encarecen el financiamiento y castigan proyectos largos. Identificar el origen del choque es el primer paso para anticipar la reacción del banco central.` },
    { topic: 'S4', type: 'noticia', prompt: 'Noticia: el 28 de octubre de 2026 la Fed mantuvo su tasa en 3.75%–4.00% con dos votos a favor de subirla; la inflación general de septiembre fue de 3.7%. ¿Qué implica para la economía global y para emergentes como México?',
      tools: ['Ecuación de Fisher', 'Regla de Taylor', 'Paridad descubierta', 'Choque de oferta', 'Carry trade'],
      outline: ['El hecho y la lectura nominal engañosa', 'Fisher: r ≈ 0.2% con general, ≈0.9% con subyacente PCE', 'Oferta vs demanda: energía', 'Taylor y mercado apuntan a diciembre', 'UIP: Banxico y el peso con menos margen'],
      model: `La noticia parece decir «no pasó nada», pero con las herramientas del curso dice bastante. La Fed dejó su tasa en 3.75%–4.00%, tras subirla en septiembre por primera vez desde 2023, y dos miembros votaron por subir de nuevo. El mercado ya descontaba con probabilidad superior a 80% un alza en diciembre.

Lo primero es aplicar Fisher, porque la tasa sola no indica la postura. Con una tasa cercana a 3.9% e inflación general de 3.7%, la tasa real apenas ronda 0.2%. Medida con la subyacente PCE, cerca de 3%, ronda 0.9%. El ejemplo clásico es una Fed que mantiene su tasa mientras la inflación baja, y entonces la tasa real sube y la política se aprieta sola. Hoy pasa lo contrario: la inflación subió, de modo que mantener la tasa equivale a relajar en términos reales. Eso explica la disidencia.

Lo segundo es el origen. La energía subió cerca de 20% anual por la guerra y el precio del petróleo, y eso es un choque de oferta. En principio, un banco central puede «ver a través» de él, ya que subir tasas no produce más petróleo y sí frena el empleo. El riesgo es que se generalice y contamine expectativas. Con una regla de Taylor simple y una tasa neutral de 1%, la inflación de 3% pediría alrededor de 4.5%: la Fed parece estar debajo de la regla, razón por la cual el mercado anticipa otra alza.

Para los emergentes, el canal es la paridad descubierta: i − i* es la depreciación esperada. El diferencial entre Banxico, en 6.5%, y el techo de la Fed ya está en 2.5 puntos, muy estrecho históricamente, y el peso sufrió salidas de carry trade en septiembre. Si la Fed sube, el diferencial se comprime más. Banxico queda entonces atado: bajar su tasa, con la economía débil, podría depreciar el peso y pasar a precios. Otros emergentes enfrentan lo mismo, y además tasas de EUA más altas encarecen su deuda en dólares y empeoran su dinámica (r − g).

En resumen, una Fed «quieta» aún puede restringir al mundo: mantiene alto el costo global del dinero y reduce el margen de los demás. Lo que falta por observar son los datos de inflación y empleo de noviembre, antes de la reunión del 9 de diciembre.` },
    { topic: 'S4', type: 'noticia', prompt: 'Noticia: el 30 de octubre de 2026 el Banco de Japón mantuvo su tasa en 1.25% (voto 8–1), pero dijo que la inflación subyacente alcanzó su meta y abrió la puerta a más alzas. Interpreta la noticia.',
      tools: ['Ecuación de Fisher', 'Carry trade', 'Paridad de tasas', 'Dilema BoJ'],
      outline: ['Del caso a hoy: de YCC a tasas positivas', 'Fisher: tasa real probablemente negativa aún', 'Dilema: yen en ≈157 contra crecimiento', 'Carry: diferencial yen–peso, más estrecho', 'Riesgo para México'],
      model: `La noticia es la continuación directa del caso Misawa. Japón salió de décadas de tasa cero, dejó atrás la tasa negativa y el control de la curva, y hoy tiene su tasa en 1.25%. Aun con la pausa de octubre, el mensaje fue restrictivo: un miembro votó por subir a 1.50%, el BoJ elevó sus proyecciones de inflación, y Ueda dijo que la inflación subyacente ya alcanzó el 2% y que la fase de política está cambiando. Analistas leen en ello una señal hacia diciembre.

Con Fisher se aprecia por qué esto no es todavía una política apretada. Si la inflación subyacente está alrededor de 2%, una tasa de 1.25% implica una tasa real cercana a −0.7%: sigue siendo laxa. Por eso se habla de normalización y no de restricción. La diferencia con el caso es importante: en 2023 el BoJ decía que el 2% aún no era sostenible; ahora reconoce que lo alcanzó, lo que debilita el argumento para permanecer abajo.

El dilema sigue siendo el mismo. El yen se mantiene débil, cerca de 157 por dólar, a pesar de las alzas, porque el diferencial con la Fed sigue siendo amplio, como predice la paridad de tasas. Un yen débil encarece energía y alimentos importados, y Japón es muy sensible al petróleo. Subir defiende la moneda, pero golpea a una economía de bajo crecimiento potencial y a un gobierno muy endeudado, cuyo servicio de la deuda subiría. Por eso avanza despacio y comunicando cada paso.

La parte global es el carry trade. Cada alza del BoJ encarece el fondeo en yenes y, si el mercado se sorprende, puede forzar un desarme que aprecie al yen y golpee a monedas de alto rendimiento. Para México esto se junta con otra presión: Banxico está en 6.5%, la Fed quizá subirá, y el peso ya vio salidas de carry en septiembre. Si el BoJ sube en diciembre mientras la Fed también aprieta, el fondeo en dólares y yenes se encarece a la vez, y el diferencial que sostuvo al llamado superpeso se reduce desde dos frentes.

Mi lectura: la pausa es táctica, no un cambio de rumbo. Lo relevante será si el BoJ prepara bien al mercado, porque el mayor riesgo global es la sorpresa, no el nivel de la tasa.` },
    { topic: 'S4', type: 'noticia', prompt: 'Noticia: en septiembre de 2026 el peso cayó casi 6%, la peor caída entre las monedas que sigue Bloomberg, ante una «huida del carry trade». Explica qué pasó y qué significa para Banxico.',
      tools: ['Paridad descubierta', 'Carry trade', 'Ecuación de Fisher', 'Trilema (flujo de capital)'],
      outline: ['Hecho: el diferencial se estrechó a ≈2.5 puntos', 'Mecánica del carry y quiebre', 'Por qué cae rápido: posiciones concentradas', 'Dilema Banxico: Fisher real ≈2.9% y economía débil', 'Conclusión: margen limitado'],
      model: `Lo ocurrido en septiembre es un ejemplo de manual de por qué el carry trade sube por la escalera y baja por el elevador. A inicios de mes el peso estaba en su máximo de dos años, cerca de 17 por dólar. Tres semanas después ya pasaba de 18, tras caer casi 6%, la peor caída entre las monedas que sigue Bloomberg.

La causa principal es el estrechamiento del diferencial de tasas. Banxico dejó de recortar en 6.5% y señaló que no seguirá mecánicamente a la Fed; al mismo tiempo, la Fed subió a 3.75%–4.00%. El diferencial con el techo de la Fed se redujo a unos 2.5 puntos, de los más bajos en muchos años. La paridad descubierta dice que i − i* es la depreciación esperada que iguala los rendimientos. Con un colchón tan pequeño, una depreciación de sólo 2.5% en un año borra toda la ganancia. Y una caída de 6% en un mes equivale a más de dos años de ese diferencial.

La velocidad se explica por la mecánica. El carry es un trade en el que todos piden prestado en dólares o yenes y compran pesos. Si se reduce el margen y además suben los rendimientos de EUA, todos quieren salir al mismo tiempo, y salir implica vender pesos. Esa venta deprecia al peso, lo cual genera más pérdidas y más salidas. HSBC señala que la gran mayoría de la operación del peso ocurre fuera de México, lo que refuerza esa sensibilidad. También pesaron el aumento global de la aversión al riesgo y una moneda que los analistas ya consideraban cara.

Para Banxico el mensaje es incómodo. Con tasa de 6.5% e inflación de 3.62% en la primera quincena de octubre, Fisher da una tasa real cercana a 2.9%, dentro del rango neutral estimado por Banxico, con una economía débil. Esto justificaría estímulo. Sin embargo, bajar tasas reduce aún más el diferencial, deprecia al peso y puede pasar a precios, y 25 de los 37 analistas de la encuesta Citi lo ven quieto hasta 2027, aunque una minoría aún apuesta por un recorte.

Por eso, la autonomía de Banxico es relativa en la práctica: la decisión está condicionada por la Fed y los flujos de capital. Mantener la tasa me parece lo prudente; el costo es un crecimiento bajo un tiempo más.` },
    { topic: 'S4', type: 'noticia', prompt: 'Noticia: tras la decisión del 28 de octubre, Warsh afirmó que la política «no jugó ningún papel»; mientras tanto, la Casa Blanca sigue intentando remover a la gobernadora Lisa Cook. ¿Por qué importa la independencia de un banco central?',
      tools: ['Teoría cuantitativa', 'Dinámica de deuda con emisión', 'Expectativas', 'Fisher', 'Paridades'],
      outline: ['Por qué existe la independencia: el incentivo a monetizar', 'Alemania, Argentina, México: la evidencia', 'Credibilidad = expectativas', 'Prueba actual: Fed sube pese a presión', 'Canal global: prima de riesgo, tasa larga y dólar'],
      model: `La independencia de un banco central no es un formalismo legal; es la forma de resolver un problema económico concreto. Los gobiernos enfrentan déficits difíciles de corregir políticamente, y siempre tienen la tentación de que el banco central los financie. La dinámica de deuda lo deja claro: Δb = d + (r − g)b − m. Cuando el déficit es grande y nadie quiere pagar el ajuste, la emisión m es la válvula de escape. Ese es el camino de Alemania en 1923, de México en los setenta y ochenta, y de Argentina más recientemente. La teoría cuantitativa dice cómo termina: más dinero sin más producto significa más precios.

La autonomía de Banxico se creó justo para mandar la señal de que no financiaría al gobierno. Como dijo el profesor, sin embargo, es un asunto político: la ley se puede cambiar y los nombramientos pueden capturar a la institución. Lo que la protege es la credibilidad, que opera por expectativas. Si los mercados creen en el banco central, una señal basta para mover tasas largas; si no, hay que subir mucho más, como le pasó a Banxico, que llegó a tasas reales cercanas a 6%.

Lo que hace interesante el momento actual es que los hechos no coinciden con la narrativa sencilla de captura. Trump presionó a Powell para bajar tasas y luego nombró a Warsh. Sin embargo, bajo Warsh la Fed subió en septiembre y mantuvo en octubre, con dos votos a favor de subir más, en una fase de energía cara. Warsh dijo que la política no influyó en la decisión. Por otra parte, la Corte Suprema dejó a Cook en su cargo por ahora, pero sin resolver si puede ser removida, y la Casa Blanca sigue considerando su salida.

¿Qué está en juego? Si el mercado sospechara que la Fed se somete, las expectativas de inflación subirían, y por Fisher también la tasa nominal larga que exigen los inversionistas. El resultado sería perverso: las tasas de corto plazo bajan por presión política, pero la de 10 años sube y encarece la deuda pública e hipotecas. Además, al ser el dólar la moneda dominante, el contagio sería global: movería la prima de riesgo, el tipo de cambio y el margen de los bancos centrales emergentes.

Concluyo que la independencia se mide en los hechos: por ahora la Fed la está defendiendo, aunque sigue bajo prueba.` }
  );

  E.news.push(
    { topic: 'S4', date: '2026-10-28', title: 'La Fed mantiene su tasa en 3.75%–4.00%; voto 10–2, con Cook y Hammack a favor de subir', source: 'investingLive (comunicado del FOMC)', url: 'https://investinglive.com/central-banks/the-full-statement-from-the-october-2026-fomc-rate-decision/', tool: 'Ecuación de Fisher · regla de Taylor', read: 'Con tasa ≈3.9% e inflación general de 3.7% (septiembre), la tasa real ronda sólo 0.2%: al revés del ejemplo del profe, aquí la inflación subió y la tasa real se comprimió. Por eso hubo disidentes y el mercado pagaba cerca de 85% de probabilidad de alza en diciembre, lo que quita margen a emergentes.' },
    { topic: 'S4', date: '2026-10-30', title: 'El Banco de Japón mantiene su tasa en 1.25% con voto 8–1, eleva su inflación esperada y deja abierto un alza', source: 'Yahoo Finance', url: 'https://finance.yahoo.com/economy/policy/articles/instant-view-analysts-react-boj-032614967.html', tool: 'Fisher · carry trade · dilema BoJ', read: 'Con inflación subyacente cerca de 2%, una tasa de 1.25% da una tasa real negativa (≈−0.7%): Japón aún normaliza, no aprieta. El dilema del caso sigue vivo: el yen está débil, cerca de 157 por dólar, y cada señal de alza amenaza con encarecer el fondeo del carry.' },
    { topic: 'S4', date: '2026-09-30', title: 'El peso mexicano, la moneda más débil entre sus pares ante la huida del carry trade', source: 'Bloomberg Línea', url: 'https://www.bloomberglinea.com/latinoamerica/mexico/peso-mexicano-se-convierte-en-la-moneda-mas-debil-entre-sus-pares-ante-huida-del-carry-trade/', tool: 'Paridad descubierta · carry trade', read: 'El peso cayó casi 6% en septiembre mientras el diferencial EUA–México se estrechaba a ≈2.5 puntos. Por UIP, un colchón de 2.5 puntos se borra con una depreciación de 2.5%; por eso, en cuanto se estrecha, los inversionistas salen todos a la vez y la venta de pesos se retroalimenta.' },
    { topic: 'S4', date: '2026-10-22', title: 'La inflación en México sube a 3.62% en la primera quincena de octubre; la subyacente está en 3.78%', source: 'Excélsior (dato INEGI)', url: 'https://www.excelsior.com.mx/finanzas/inflacion-mexico-sube-primera-quincena-octubre-2026', tool: 'Ecuación de Fisher · regla de Taylor', read: 'Con Banxico en 6.50% desde mayo, Fisher da una tasa real de ≈2.9%, dentro del intervalo neutral que estima Banxico. La inflación por arriba de la meta de 3% y el diferencial estrecho con la Fed explican por qué la mayoría de los analistas lo ve quieto, a pesar de una economía débil.' },
    { topic: 'S4', date: '2026-10-28', title: 'Warsh: la política «no jugó ningún papel» en la decisión, en plena presión de la Casa Blanca sobre la Fed', source: 'American Banker', url: 'https://www.americanbanker.com/live-blog/federal-open-market-committee-press-conference-october-2026-live-coverage', tool: 'Independencia · expectativas · teoría cuantitativa', read: 'La independencia protege las expectativas: si el mercado creyera que la Fed obedece al gobierno, subiría la inflación esperada y, por Fisher, la tasa larga. Que la Fed haya subido en septiembre y discutido subir más le da credibilidad, pero la disputa por Lisa Cook mantiene abierta la prueba.' }
  );

  E.repaso.push({
    topic: 'S4', icon: '🏦', title: 'S4 · Política monetaria',
    items: [
      ['Inflación', 'Alza generalizada y sostenida de precios. Un solo precio o una sola vez no lo es.'],
      ['Oferta vs demanda', 'Ambos suben P. Oferta: Q baja, se ve como transitorio. Demanda: Q sube, responde a tasas.'],
      ['Teoría cuantitativa', 'MV = PQ. Con V y Q fijas, más M significa más P.'],
      ['Monetización', 'Δb = d + (i − π − g)b − m. Si el déficit no se puede financiar, se emite: raíz de Weimar y Argentina.'],
      ['Fisher', '(1+i) = (1+r)(1+π); r ≈ i − π. Real positiva: restrictiva; negativa: seguro expansiva.'],
      ['Ejemplo del examen', 'Fed mantiene + π baja → r sube → se aprieta → emergentes con menos margen para bajar.'],
      ['Regla de Taylor', 'i = r* + π + ½(π − π*) + ½(brecha). r* no se observa: es arte.'],
      ['Corta vs larga', 'Banco central controla 1–28 días; las empresas usan 10 años. Puente: expectativas y credibilidad.'],
      ['CIP', 'F = S(1+i)/(1+i*). Forward lo fija el diferencial, por arbitraje con riesgo cubierto.'],
      ['UIP', 'E(S₁) = S(1+i)/(1+i*). i − i* ≈ depreciación esperada. Riesgo descubierto.'],
      ['Carry trade', 'Fondeo en moneda barata, inversión en cara: R = (1+i$)(S₀/S₁)/(1+i¥) − 1. Se pierde si el yen sube más que el diferencial.'],
      ['YCC', 'El banco fija la tasa a 10 años comprando bonos, no por decreto. Costo: cartera, curva distorsionada, moneda.'],
      ['Dilema BoJ', 'Subir: protege yen, frena crecimiento. No subir: protege crecimiento, debilita yen y sube inflación importada.'],
      ['Deflación', 'Pospone el consumo, sube la deuda real y golpea a deudores. También es mala.'],
    ],
  });

  // ---------------------------------------------------------------- sección
  E.section({
    id: 'monetaria', n: 40, group: 'temas', icon: '🏦', short: 'S4 · Política monetaria', exam: 'star',
    kicker: 'S4 · Fisher, paridades, carry trade y control de la curva',
    title: 'Política monetaria: la tasa no dice nada sin la inflación y el tipo de cambio',
    lead: 'El ejemplo de noticia que puso el profe sale de aquí: la Fed mantiene tasas, baja la inflación, Fisher dice que sube la tasa real y los emergentes quedan con menos margen. Aprende a contar esa cadena y lo demás cae solo.',
    render(root) {
      root.innerHTML = `
      <style>
        .sx-m40-news{display:grid;gap:12px}
        .sx-m40-news article{border:1px solid var(--line);border-radius:12px;padding:14px;background:var(--card)}
        .sx-m40-news h4{margin:4px 0 6px}
        .sx-m40-chain{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:12px 0}
        .sx-m40-chain span{padding:8px 12px;border-radius:999px;border:1px solid var(--line);background:var(--card);font-weight:600;font-size:14px}
        .sx-m40-chain i{font-style:normal;color:var(--muted)}
        .sx-m40-pre{margin:8px 0 12px}
        .sx-m40-read{padding:12px 14px;border-left:3px solid var(--accent);background:var(--accent-wash);border-radius:8px;margin:12px 0}
      </style>
      <div class="prose"><p>Tres preguntas ordenan todo el tema: <b>¿de dónde viene la inflación?</b>, <b>¿cómo la frena el banco central?</b> y <b>¿qué le hace eso a la moneda?</b> Japón aparece porque junta las tres.</p></div>
      ${E.key(`<div class="sx-m40-chain"><span>Fed mantiene i</span><i>+</i><span>π baja</span><i>→</i><span>Fisher: r sube</span><i>→</i><span>Política más apretada</span><i>→</i><span>Paridad: i − i* más exigente</span><i>→</i><span>Emergentes no pueden bajar</span></div>Esta es la plantilla del ensayo de noticia: <b>hecho → herramienta → mecanismo → implicación</b>. Antes de usarla, revisa la dirección de π. Hoy la inflación de EUA subió (3.7% en septiembre), así que la tasa real se comprimió y el argumento cambia: ver ${E.link('monetaria/mon-noticias', 'noticias')}.`, 'La cadena que debes dominar')}
      ${E.tip('<q>Si nada más te fijas en la tasa de interés solita, no puedes saber si es expansionista o no.</q> Y en el examen no quiere opinión: pide interpretar la noticia con los temas del curso.', 'Clases 21-oct y 28-oct')}

      <h2>1. La narrativa</h2>
      ${E.timeline([
        { y: '1500–1700', t: 'La plata de América y la Revolución de los Precios', d: 'Zacatecas, Taxco y Potosí mandan plata a Europa y suben los precios. Hume lo sistematiza: más dinero, más precios. Nace la teoría cuantitativa.' },
        { y: '1921–23', t: 'Weimar: el déficit se imprime', d: 'Alemania pierde la guerra, debe reparaciones y pierde territorios ricos en carbón. No hay ingresos pero sí gastos políticos, así que el banco central emite. Por eso llega la hiperinflación, con precios que cambian en horas.' },
        { y: '1970s', t: 'La Gran Inflación', d: 'Embargo petrolero y revolución iraní se suman a política laxa. La inflación de EUA supera 13% en 1979–80. En México el déficit se financia con emisión y devaluaciones; por eso la inflación llega a ≈160% en los 80.' },
        { y: '1979–82', t: 'Volcker rompe las expectativas', d: 'La Fed lleva su tasa a niveles de ≈16%, con recesión incluida. Por eso la gente deja de creer que la inflación seguirá subiendo: la credibilidad se vuelve el activo central.' },
        { y: '80s–2007', t: 'Metas de inflación y Gran Moderación', d: 'La innovación financiera hace inestable la relación con M. Por eso los bancos pasan a guiar la tasa (regla de Taylor) y ganan autonomía, como Banxico en los 90 para dejar de financiar al gobierno. Inflación baja y estable.' },
        { y: '1990–2012', t: 'Japón: burbuja, deflación, tasa cero', d: 'Tras la burbuja llega el estancamiento: menos población, PTF plana. La tasa llega a cero, pero con deflación la tasa real sigue positiva. Por eso Japón inventa herramientas: QE desde 2001.' },
        { y: '2008–19', t: 'Tasas cero y QE', d: 'La crisis lleva las tasas al piso. Como ya no se pueden bajar más, los bancos centrales compran bonos y sus balances se multiplican. Japón agrega QQE (2013), tasa negativa y YCC (2016). Con todo, no hay inflación.' },
        { y: '2020–21', t: 'COVID y el «es transitorio»', d: 'Al principio la inflación baja por falta de demanda. Se gasta mucho y la Fed compra la deuda para que el déficit no suba las tasas. Luego los precios explotan por cadenas y demanda, y la Fed dice «es transitorio» mientras la tasa real es muy negativa.' },
        { y: '2022–24', t: 'Alza agresiva', d: 'La inflación pasa de 8% en EUA. La Fed sube con fuerza, Banxico llega a ≈11% (real ≈6%). La inflación cede, pero el mismo golpe de tasas provoca el colapso de SVB en 2023.' },
        { y: '2024–26', t: 'Recortes, luego freno', d: 'Empiezan los recortes. Luego la guerra y el petróleo suben la inflación de nuevo. Banxico se detiene en 6.50% (mayo de 2026), y la Fed sube en septiembre de 2026 a 3.75%–4.00% y mantiene en octubre, ya con Warsh.' },
        { y: '2023–26', t: 'Japón sale de décadas de tasa cero', d: 'Ueda flexibiliza el control de la curva; en marzo de 2024 (dato público, posterior al caso) termina la tasa negativa y el YCC. En septiembre de 2026 la tasa llega a 1.25%. Cada alza amenaza el carry trade, y por eso lo que pasa en Tokio pega en México.' },
      ])}

      <h2>2. Las herramientas</h2>
      ${E.concept({ id: 'mon-raices', title: 'Raíces de la inflación: oferta, demanda y dinero', badge: 'in', html: `
        <p>Inflación es un alza <b>generalizada y sostenida</b>. La primera pregunta ante un alza de precios es de dónde viene. El HBR agrega un tercer pilar: las <b>expectativas</b>.</p>
          ${E.table([
            ['Oferta', 'Petróleo, sequía, cadenas', 'Precios arriba, producción abajo', 'Se ve como señal y transitorio'],
            ['Demanda', 'G, M, cheques, moda', 'Precios y producción arriba', 'Responde a tasas'],
            ['Expectativas', 'Salarios y precios se persiguen', 'Espiral', 'Se ataca con credibilidad'],
          ], { head: ['Origen', 'Ejemplo', 'Efecto', 'Respuesta'] })}
        ${E.fig(figSD, 'En ambos casos sube P, por lo que mirar sólo el precio no distingue el origen. El punto rojo es el nuevo equilibrio.', true)}
        ${E.formula('Teoría cuantitativa', 'M · V', 'P · Q', 'Hume: en el corto plazo V y Q no cambian, así que más M se va a P.')}
        ${E.fig(figQ, 'La lámina también la escribe como M<sup>d</sup> = PY/V = kPY.')}
        ${E.formula('Deuda con emisión', 'Δb', 'd + (i − π − g)·b − m', 'd déficit primario; m emisión del banco central. Inflación y emisión bajan la razón deuda/PIB.')}
        ${E.table([
          ['Revolución de los Precios', 'Plata de México y Perú', 'Alza sostenida en Europa'],
          ['Alemania 1923', 'Reparaciones + déficit impreso', 'Miles por ciento, billetes de 100 billones'],
          ['México 70–80', 'Déficit + devaluaciones que se retroalimentan', '≈160% en su pico'],
          ['Argentina', 'Déficit financiado por el BCRA', 'La salida de Milei: gastar menos, y es política'],
        ], { head: ['Episodio', 'Fuente del dinero', 'Resultado'] })}
        ${E.kid('Si en el pueblo hay un termo y un billete, el termo cuesta un billete. Si alguien imprime dos billetes más y sigue habiendo un termo, el termo cuesta tres. El termo no cambió: el billete vale menos.')}
        ${E.tip('El déficit, insistió, es un problema político: quién paga los impuestos y a quién se le da el gasto. Si no hay consenso para reducirlo, no queda más remedio que emitir.', 'Clase 21-oct')}
        ${E.warn('La lámina dice que con b = 100%, i = 5%, g = 2%, π = 2% y déficit de 4%, el dinero debe crecer 3% para estabilizar la deuda. Con la fórmula da 4% + 1% = <b>5% del PIB</b> de emisión; no confundas ese 5% (flujo sobre PIB) con una tasa de crecimiento de M. Lo que importa es el mecanismo, no la cifra.')}
      ` })}

      ${E.concept({ id: 'mon-tasa', title: 'De M a la tasa: transmisión, tasa corta y regla de Taylor', badge: 'in', html: `
        <p>Hasta los 70 se vigilaba la cantidad de dinero. Con cheques, tarjetas, fondos líquidos y pagos digitales ya no se sabe qué M mirar (Banxico tiene M1 a M4). Por eso los bancos centrales pasan a la <b>tasa de interés</b>:</p>
        <p><b>Sube la tasa</b> → cae inversión y consumo → cae la demanda agregada → baja la presión de precios. En el modelo de la clase: <span class="gl-no">Y = C₀ + bY + G + I₀ − b<sub>r</sub>r</span>, donde Y es el producto, C₀ el consumo autónomo, b la propensión marginal a consumir, G el gasto de gobierno, I₀ la inversión autónoma y b<sub>r</sub> cuánto cae la inversión cuando sube la tasa real (r).</p>
        ${E.fig(figKite, 'El profe usa el video de un papalote: el banco sostiene el hilo corto y la tasa larga vuela con el viento. Funciona, pero no es perfecto.', true)}
        ${E.formula('Regla de Taylor', 'i', 'r* + π + ½(π − π*) + ½·brecha', 'Coeficientes ½ clásicos de Taylor (1993). Brecha: producto contra su nivel de pleno empleo.')}
        <div class="cols"><div>${E.table([
          ['r*', 'Tasa neutral: ni estimula ni frena', 'No se observa'],
          ['π − π*', 'Distancia a la meta', 'Positiva: subir'],
          ['Brecha', 'Distancia al pleno empleo', 'Negativa: bajar'],
        ], { head: ['Término', 'Qué es', 'Efecto'] })}</div><div>
          ${E.kid('El banco central maneja como un conductor: mira qué tan rápido vas respecto al límite (inflación) y qué tan cerca está tu destino (empleo). La velocidad neutral nadie la sabe exacta.')}
        </div></div>
        ${E.tip('La tasa neutral no es observable: <q>es ahí donde entra más el arte que la ciencia.</q> Banxico publica un intervalo y, en general, procura mantener la tasa real positiva. La inteligencia artificial, dijo, podría elevar la neutral.', 'Clase 21-oct')}
        ${E.warn('Es <b>John</b> Taylor; en la transcripción sale otro nombre. Y la regla es una guía, no una obligación: ante choques de oferta, un banco suele esperar antes de reaccionar. Eso mismo fue lo que le salió mal a la Fed en 2021.')}
      ` })}

      ${E.concept({ id: 'mon-fisher', title: 'Ecuación de Fisher', badge: 'star', html: `
        ${E.formula('Fisher', '(1 + i)', '(1 + r)(1 + π<sup>e</sup>)', 'Aproximación que usa el profe: r ≈ i − π. También sirve con inflación esperada.')}
        ${E.fig(figFisher, 'Mismo mecanismo, tres lecturas. La columna central es el ejemplo del examen.', true)}
        ${E.table([
          ['EUA 2024', '≈6%', '≈3%', '≈+3%', 'Restrictiva'],
          ['México junio 2024', '≈11%', '≈5%', '≈+6%', 'Restrictivísima'],
          ['México (lectura de clase)', '≈6%', '≈3.8%', '≈+2.2%', 'Aún restrictiva'],
          ['Japón con deflación', '0%', '−2%', '+2%', 'Restrictiva disfrazada'],
          ['EUA 2021', '≈0%', 'Alta', 'Negativa', 'Expansiva'],
        ], { head: ['Caso (clase)', 'i', 'π', 'r', 'Postura'] })}
        ${E.kid('Te pagan 6% en el banco, pero todo sube 4%. Con tu dinero puedes comprar sólo 2% más cosas que antes. Ese 2% es la tasa real.')}
        ${E.tip('¿Cuándo es expansiva? Es relativo a la neutral, pero si la real es negativa, seguro lo es. Con Argentina y Turquía usa Fisher para explicar tasas de 33% y 44%: la nominal alta refleja inflación esperada.', 'Clase 21-oct')}
        ${E.warn('«Bajó la tasa» no significa «política expansiva». Y «la Fed no se movió» no significa «no cambió nada». Primero calcula la real.')}
      ` })}

      ${E.concept({ id: 'mon-paridades', title: 'Paridad cubierta y descubierta', badge: 'star', html: `
        ${E.formula('Cubierta (CIP)', 'F', 'S · (1 + i) / (1 + i*)', 'S y F en moneda local por extranjera. El forward lo fija el diferencial; es arbitraje, no opinión.')}
        ${E.formula('Descubierta (UIP)', 'E(S₁)', 'S · (1 + i) / (1 + i*)', 'Supone E(S₁) = F. Aproximación: i − i* ≈ depreciación esperada.')}
        ${E.fig(figUIP, 'El ejercicio de clase: si nada se mueve, todos irían a México. Por eso, para que nadie se mueva, el mercado debe esperar 2% de depreciación.', true)}
        ${E.table([
          ['Fisher', 'r = r*', 'i − i* = πᵉ − π*ᵉ', 'Diferencial de tasas = diferencial de inflación esperada'],
          ['CIP', 'Arbitraje', 'i − i* = (F − S)/S', 'El forward lo fija el diferencial'],
          ['UIP', 'E(S₁) = F', 'i − i* = (E(S₁) − S)/S', 'Diferencial = depreciación esperada'],
          ['PPP', 'Tipo real constante', 'π − π* = (E(S₁) − S)/S', 'La inflación relativa determina la depreciación'],
        ], { head: ['Relación', 'Supuesto', 'Implicación', 'En palabras'] })}
        ${E.kid('Si un banco ofrece mucho más que otro por lo mismo, algo te está cobrando por otro lado. Aquí, lo que te cobra es que su moneda probablemente valdrá menos.')}
        ${E.tip('A la Fed casi no le preocupa el tipo de cambio porque el dólar es la moneda dominante; a Japón y a México sí. Y la lectura es desde el inversionista extranjero: son quienes mueven el dinero.', 'Clase 21-oct')}
        ${E.warn('La tasa alta no significa solamente «espera depreciación». Hoy también atrae capital, lo que puede <b>apreciar</b> la moneda de inmediato. Y en la práctica la UIP suele no cumplirse en plazos cortos: justo de esa falla vive el carry trade.')}
      ` })}

      ${E.concept({ id: 'mon-carry', title: 'Carry trade', badge: 'star', html: `
        ${E.fig(figCarry, 'Dos rendimientos y un costo: tasa local, tipo de cambio y costo de fondeo.', true)}
        ${E.formula('Retorno en moneda de fondeo', 'R', '(1 + i$) · (S₀ / S₁) / (1 + i¥) − 1', 'S en pesos por yen. Quiebre: S₁/S₀ = (1 + i$)/(1 + i¥).')}
        ${E.table([
          ['Colombia', '≈+22.5%', '≈37.5%', '≈32%', '≈41%'],
          ['México', 'Ligera depreciación', 'Cerca de la tasa, ≈7%', '—', '—'],
          ['Argentina', '≈−3%', 'Tasa ≈33%: buen trade', '—', '—'],
          ['Turquía', '≈−15%', 'Tasa ≈44%: la lira se come parte', '—', '—'],
        ], { head: ['12 meses (pantalla en clase, ≈)', 'Movimiento FX', 'Retorno total', 'Fondeo USD', 'Fondeo JPY'] })}
        <p class="small muted">Cifras dictadas en clase desde una pantalla que no viene en las láminas: tómalas como ≈. Lo que importa: Colombia no tenía la tasa más alta, pero ganó porque su moneda se apreció. Y el fondeo en yenes rindió más que en dólares por dos razones: fondeo barato y yen débil.</p>
        ${E.kid('Pides prestado a tu tío que cobra casi nada y metes el dinero a una alcancía que paga mucho, pero en otra moneda. Si esa moneda se cae frente a la de tu tío al momento de pagarle, te quedas sin ganancia y a deber.')}
        ${E.tip('Sube la tasa en Japón, el carry se hace menos atractivo, los inversionistas dejan de entrar a emergentes y sus monedas se deprecian. Por eso lo que pasa en Japón nos afecta.', 'Clase 21-oct')}
        ${E.warn('No lo confundas con inversión japonesa: es sobre todo el inversionista especulativo que va a Japón a pedir prestado. Aparte hay inversionistas japoneses («Mrs. Watanabe») que también repatrian. Son dos canales.')}
      ` })}

      ${E.concept({ id: 'mon-ycc', title: 'Control de la curva (YCC)', badge: 'star', html: `
        <p><b>Yield</b> es rendimiento y <b>curve</b>, toda la curva. Además de la tasa corta, el BoJ fija la de 10 años. ¿Por qué? Porque de la corta a la larga «pueden pasar muchas cosas»: mejor pegarle directo a la tasa que usan las empresas.</p>
        ${E.fig(figYCC, 'Caso, Exhibit 1. Lámina: 31-ene-2023, teórico 0.9% contra 0.511% observado.', true)}
        ${E.table([
          ['QE (2001, 2010)', 'Cantidad', 'Crece la base monetaria'],
          ['QQE (2013)', 'Cantidad y composición', '¥80 billones al año en bonos'],
          ['NIRP (2016)', 'Tasa corta', '−0.1%: límite inferior'],
          ['YCC (2016)', 'Tasa a 10 años', '≈0%; el techo sube hasta 1%'],
        ], { head: ['Herramienta', 'Qué controla', 'Detalle'] })}
        ${E.kid('Imagina que dices «nadie va a vender este bono por debajo de $100». No lo decretas: te paras en el mercado y compras todo lo que te ofrezcan a $100. Sale caro cuando todos quieren vender.')}
        ${E.tip('<q>No es un decreto.</q> ¿Cómo la controla? Comprando. El mercado quiere 0.9, el banco compra para que quede en 0.5.', 'Clase 21-oct')}
        ${E.warn('YCC no es igual a QE. En QE anuncias una cantidad y el precio queda libre; en YCC anuncias el precio y la cantidad queda libre, que es justamente el riesgo cuando el mercado presiona.')}
      ` })}

      <h2>3. Laboratorios</h2>

      <section class="concept" id="lab-fisher"><header><h3>Lab 1. Fisher + regla de Taylor</h3></header>
        <div class="btnrow sx-m40-pre" id="preF"></div><div id="knF"></div><div id="tiF"></div>
        <div class="g2"><div class="card2"><b>Fisher: la tasa real según la inflación (i fija)</b><div class="chart" id="chF1"></div></div><div class="card2"><b>Taylor contra tasa actual</b><div class="chart" id="chF2"></div></div></div>
        <div class="sx-m40-read" id="rdF"></div>
        <p class="small muted">Valores de r* y brecha en los botones: ilustrativos. El intervalo de Banxico es de la lámina (≈1.8–3.6% real, leído de la gráfica).</p>
      </section>

      <section class="concept" id="lab-par"><header><h3>Lab 2. Paridades: forward y depreciación esperada</h3></header>
        <div id="knP"></div><div id="tiP"></div><div class="card2"><b>¿Dónde conviene invertir? Rendimiento en dólares según la depreciación del peso</b><div class="chart" id="chP"></div></div>
        <div class="sx-m40-read" id="rdP"></div>
        <p class="small muted">Valores iniciales: Banxico 6.50%, techo de la Fed 4.00%, tipo de cambio ≈18.20 (inicios de octubre de 2026).</p>
      </section>

      <section class="concept" id="lab-carry"><header><h3>Lab 3. Calculadora de carry trade yen → peso</h3></header>
        <div class="btnrow sx-m40-pre" id="preC"></div><div id="knC"></div><div id="tiC"></div>
        <div class="card2"><b>Retorno a 12 meses según se mueva el yen</b><div class="chart" id="chC"></div></div>
        <div class="sx-m40-read" id="rdC"></div>
        ${E.note('Ni las láminas ni la clase mencionan agosto de 2024; lo agrego porque es el ejemplo real más citado. El BoJ subió a 0.25% el 31 de julio de 2024 y en pocos días el yen se apreció ≈20% contra el peso (de ≈0.11 a ≈0.135 pesos por yen, cifras aproximadas de mercado). Ojo: la calculadora suma 12 meses de carry; en la realidad el golpe llegó en semanas, sin haber cobrado ese carry, así que quien entró cerca del pico salió peor.', 'Sobre el botón de agosto 2024')}
      </section>

      <section class="concept" id="lab-ycc"><header><h3>Lab 4. YCC: precio del bono y compra para defender el techo</h3></header>
        <div class="btnrow sx-m40-pre" id="preY"></div><div id="knY"></div><div id="tiY"></div>
        <div class="card2"><b>Precio de un bono a 10 años con cupón igual al techo</b><div class="chart" id="chY"></div></div>
        <div class="sx-m40-read" id="rdY"></div>
        <p class="small muted">Ilustrativo: la compra se calcula con una sensibilidad que tú eliges. La pérdida usa el cálculo de The Economist en la lámina (¥7.5 billones por cada 0.25 puntos, con tenencias de enero de 2023).</p>
      </section>

      <h2>4. Casos</h2>
      ${E.concept({ id: 'mon-misawa', title: 'Can the Bank of Japan Continue to Maintain YCC with Rising Inflation? (Misawa)', badge: 'star', html: `
        <p><b>De qué trata:</b> abril de 2023. Kazuo Ueda, académico formado en MIT, recibe el BoJ de Kuroda con una década de política ultralaxa encima. La inflación ya está arriba de 2% pero él no cree que sea sostenible. <b>Decisión:</b> cómo y cuándo salir de NIRP, YCC y las compras masivas sin dañar a Japón ni a los mercados del mundo.</p>
        ${E.table([
          ['Abe / Kuroda', 'Abenomics y QQE: objetivo 2%, compras masivas, pero expectativas no reaccionan'],
          ['Ueda', 'Mantener la laxitud hasta ver 2% estable con alza salarial'],
          ['Gobierno Kishida', 'Quiere crecimiento; le incomoda tanto tasas altas como inflación; cae su popularidad'],
          ['Mercado / especuladores', 'Apuestan contra el techo: el 10 años perfora 0.5% en julio de 2023'],
          ['FMI y BCE', 'Advierten el riesgo de repatriación y de desarme del carry'],
        ], { head: ['Personaje', 'Postura'] })}
        ${E.timeline([
          { y: '2013', t: 'QQE', d: 'Doblar la base monetaria. Las expectativas siguen abajo de 1%.' },
          { y: '2016', t: 'Tasa negativa, luego YCC', d: 'Enero: −0.1%. Septiembre: 10 años ≈0%. El BoJ ya no puede bajar más la tasa corta.' },
          { y: '2022', t: 'Yen en mínimo de 32 años', d: '≈151 por dólar en octubre; inflación subyacente 4% en diciembre. El BoJ abre el techo a 0.5%.' },
          { y: '2023', t: 'YCC flexible', d: 'Julio: 0.5% es referencia y el límite real es 1%. Ueda insiste en que no es normalizar.' },
        ])}
        <h4>Las cuatro preguntas que dio el profe</h4>
        ${E.reveal('1. ¿Por qué tardó tanto en subir las tasas?', `<p>Porque el crecimiento estaba estancado desde los 90 (Solow: población a la baja, PTF plana, rendimientos decrecientes) y porque traía deflación. La inflación de 2022 venía de energía y un yen débil, sin salarios detrás, así que no parecía sostenible. Subir frenaba el crecimiento, encarecía una deuda altísima y generaba pérdidas al propio BoJ.</p>`, true)}
        ${E.reveal('2. ¿Qué es el YCC y por qué compró bonos a 10 años?', `<p>Es controlar también la tasa larga, porque es la que usan las empresas y de la corta a la larga pueden pasar muchas cosas. No es decreto: compra lo necesario. Costos: curva distorsionada (0.9% contra 0.511%), pérdidas potenciales y presión sobre el yen.</p>`)}
        ${E.reveal('3. ¿Qué pasa con el tipo de cambio? (costo del carry)', `<p>Diferencial amplio con la Fed → sale capital → yen débil, como dice la paridad. Además el yen barato se vuelve moneda de fondeo y el carry sale más barato. Un yen débil encarece petróleo y arroz importados y genera inflación. Ese es el dilema.</p>`)}
        ${E.reveal('4. ¿Cómo afecta a la economía global?', `<p>Si el BoJ sube, el carry deja de ser competitivo, los inversionistas se salen de emergentes y sus monedas se deprecian. Además los japoneses repatrian: ¥531 billones invertidos afuera a finales de 2022. Tras el ajuste de julio de 2023 subieron rendimientos en Australia y Filipinas.</p>`)}
        ${E.key('Subo la tasa: pego al crecimiento y protejo la moneda. Dejo la tasa baja: protejo el crecimiento, pego al tipo de cambio y eventualmente a la inflación. <b>El caso existe para que identifiques ese dilema.</b> Y luego la pregunta global: el mercado no le cree al BoJ que aguantará para siempre.', 'Lección')}
        ${E.tip('<q>Ese es el dilema de política.</q> Y no pide cifras: quiere que sepas contar qué pasó y por qué.', 'Clases 21-oct y 28-oct')}
        ${E.note('El caso termina a principios de 2024. Después (dato público) el BoJ termina la tasa negativa y el YCC en marzo de 2024, y la tasa llega a 1.25% en septiembre de 2026.', 'Qué pasó después')}
      ` })}
      ${E.concept({ id: 'mon-hbr', title: 'What Causes Inflation? (Frick, HBR, 2022)', badge: 'in', html: `
        <p><b>De qué trata:</b> un manual para directivos. La raíz es que la demanda supera a la oferta, por tres vías: <b>choques de oferta</b> (cost-push), <b>dinero</b> (demand-pull) y <b>expectativas</b> (espirales). Con poca holgura en la economía, la inflación aparece más fácil.</p>
        ${E.table([
          ['Oferta', 'COVID: barcos y trabajadores. Ucrania: energía y alimentos'],
          ['Demanda', 'Transferencias a hogares y empresas; consumo de bienes'],
          ['Estimación', 'Fed de Nueva York: ≈40% oferta y ≈60% demanda (2021)'],
          ['Medición', 'CPI; subyacente sin alimentos ni energía; PPI; PCE'],
          ['Gestión', 'Costos de menú, retención de talento y prepararse también para la cura: tasas altas'],
        ], { head: ['Tema', 'Qué dice'] })}
        ${E.warn('Friedman decía que la inflación es siempre un fenómeno monetario. El artículo matiza: es demasiado fuerte y, si hubiera que reducirla a algo, serían las expectativas. Tu profe parte de la teoría cuantitativa, pero también insiste en las expectativas: úsalas juntas.')}
      ` })}

      <h2>5. Quiz rápido</h2>
      <div id="qzM"></div>

      <h2 id="mon-noticias">6. Noticias de hoy</h2>
      ${E.warn('Ojo con copiar el ejemplo del profe tal cual. Lo planteó con inflación a la baja, y el dato más reciente de EUA es al alza (3.7% en septiembre, por energía). Si la pregunta te da inflación a la baja, usa su cadena. Si te da inflación al alza, di que la tasa real <b>se comprime</b> y por eso se habla de otra alza. La conclusión para emergentes es la misma: menos margen.')}
      <div class="sx-m40-news" id="nwM"></div>
      <p class="small muted">Próximos datos: Banxico, según una fuente que no pude confirmar en el calendario oficial, el 5-nov, después de tu examen; CPI de EUA 10-nov; Fed 9-dic.</p>
      `;

      // ---------------------------------------------------------------- Lab 1
      const preF = {
        'Examen: π baja': { i: 0.03875, pi: 0.025, tg: 0.02, gap: 0, rn: 0.01, t: 'Ejemplo del profe aplicado al nivel actual: la Fed no se mueve y la inflación baja a 2.5%.' },
        'Fed hoy (π general)': { i: 0.03875, pi: 0.037, tg: 0.02, gap: 0, rn: 0.01, t: 'Punto medio de 3.75–4.00 con CPI de septiembre 2026.' },
        'Fed hoy (subyacente PCE)': { i: 0.03875, pi: 0.03, tg: 0.02, gap: 0, rn: 0.01, t: 'Misma tasa con PCE subyacente de agosto ≈3%.' },
        'Banxico hoy': { i: 0.065, pi: 0.0362, tg: 0.03, gap: -0.01, rn: 0.027, t: 'r* en el centro del intervalo de la lámina; brecha ilustrativa.' },
        'Japón deflación': { i: 0, pi: -0.02, tg: 0.02, gap: -0.01, rn: 0.005, t: 'El ejemplo de clase: tasa cero con precios a la baja.' },
        'México jun-2024': { i: 0.11, pi: 0.05, tg: 0.03, gap: 0, rn: 0.027, t: 'Lectura de la gráfica en clase.' },
      };
      let aF = {}; let c1, c2;
      const drawF = () => {
        const r = fisherExact(aF.i, aF.pi), ra = aF.i - aF.pi, t = taylor(aF), d = aF.i - t, gapR = r - aF.rn;
        E.tiles(root.querySelector('#tiF'), [
          { label: 'Tasa real (exacta)', v: r, fmt: 'pct', dec: 2, hl: true, note: '(1+i)/(1+π) − 1' },
          { label: 'Tasa real (r ≈ i − π)', v: ra, fmt: 'pct', dec: 2, note: 'la del profe' },
          { label: 'Real contra neutral', v: gapR, fmt: 'pct', dec: 2, note: gapR > 0.0025 ? 'restrictiva' : gapR < -0.0025 ? 'expansiva' : 'neutral' },
          { label: 'Tasa sugerida por Taylor', v: t, fmt: 'pct', dec: 2, note: `actual ${pc(aF.i)}` },
        ]);
        const est = gapR > 0.0025 ? 'restrictiva' : gapR < -0.0025 ? 'expansiva' : 'cercana a neutral';
        const rec = t < 0 ? `La regla pide una tasa de ${pc(t)}: <b>imposible con la tasa en el piso</b>. Por eso Japón inventó QE, tasa negativa y YCC.` : d < -0.0025 ? `La regla pide <b>subir ${pc(-d)}</b>: el banco va detrás de la curva.` : d > 0.0025 ? `La regla da espacio para <b>bajar ${pc(d)}</b>.` : 'La regla dice que estás <b>en el nivel adecuado</b>.';
        const sign = r < 0 ? 'La tasa real es <b>negativa</b>: seguro expansiva, sin importar la nominal.' : aF.i <= 0.0005 ? 'Tasa nominal cero, pero <b>real positiva</b>: parece laxa y es restrictiva. Es Japón.' : '';
        const dil = aF.pi > aF.tg && aF.gap < 0 ? ' Las brechas van en sentido contrario (inflación alta y economía débil): es un <b>dilema</b>.' : '';
        root.querySelector('#rdF').innerHTML = `Con i = ${pc(aF.i)} y π = ${pc(aF.pi)}, la tasa real es ${pc(r)}. Contra una neutral de ${pc(aF.rn)}, la postura es <b>${est}</b>. ${sign} ${rec}${dil}`;
        if (c1) { c1.refresh(); c2.refresh(); }
      };
      const kF = E.knobs(root.querySelector('#knF'), [
        { k: 'i', label: 'Tasa nominal i', min: 0, max: 0.15, step: 0.00125, v: 0.03875, fmt: 'pct', dec: 2 },
        { k: 'pi', label: 'Inflación π', min: -0.03, max: 0.12, step: 0.0001, v: 0.037, fmt: 'pct', dec: 2 },
        { k: 'tg', label: 'Meta de inflación π*', min: 0, max: 0.05, step: 0.0025, v: 0.02, fmt: 'pct', dec: 2 },
        { k: 'gap', label: 'Brecha de producto', min: -0.05, max: 0.05, step: 0.0025, v: 0, fmt: 'pct', dec: 2, hint: 'Negativa: economía debajo del potencial' },
        { k: 'rn', label: 'Tasa neutral r*', min: 0, max: 0.04, step: 0.001, v: 0.01, fmt: 'pct', dec: 2, hint: 'No se observa; es un supuesto' },
      ], (s) => { aF = s; drawF(); }, { title: '🎛️ Mueve la inflación sin tocar la tasa' });
      c1 = E.chart(root.querySelector('#chF1'), (T) => {
        const xs = []; for (let p = -3; p <= 12.001; p += 0.5) xs.push([+p.toFixed(1), +(fisherExact(aF.i, p / 100) * 100).toFixed(3)]);
        return { ...E.baseOpt(T), grid: { left: 8, right: 16, top: 30, bottom: 34, containLabel: true }, legend: { show: false },
          tooltip: { ...E.baseOpt(T).tooltip, axisPointer: { type: 'line' }, valueFormatter: (v) => F.n(v, 2) + '%' },
          xAxis: { type: 'value', min: -3, max: 12, name: 'Inflación π (%)', nameLocation: 'middle', nameGap: 24, nameTextStyle: { color: T.muted }, axisLine: { lineStyle: { color: T.axis } }, splitLine: { show: false }, axisLabel: { color: T.muted } },
          yAxis: E.axisVal(T, (v) => v + '%'),
          series: [{ type: 'line', name: 'Tasa real', data: xs, showSymbol: false, lineStyle: { width: 2, color: T.c1 }, itemStyle: { color: T.c1 },
            markLine: { silent: true, symbol: 'none', lineStyle: { color: T.axis, type: 'dashed' }, label: { color: T.muted, formatter: 'r*' }, data: [{ yAxis: aF.rn * 100 }] },
            markPoint: { symbolSize: 12, symbol: 'circle', itemStyle: { color: T.c5, borderColor: T.card, borderWidth: 2 }, label: { show: true, position: 'top', color: T.ink, formatter: () => F.n(fisherExact(aF.i, aF.pi) * 100, 2) + '%' }, data: [{ coord: [aF.pi * 100, fisherExact(aF.i, aF.pi) * 100] }] } }] };
      });
      c2 = E.chart(root.querySelector('#chF2'), (T) => {
        const comp = [['r*', aF.rn, T.c1], ['π', aF.pi, T.c2], ['½(π − π*)', 0.5 * (aF.pi - aF.tg), T.c3], ['½·brecha', 0.5 * aF.gap, T.c4]];
        return { ...E.baseOpt(T), grid: { left: 8, right: 16, top: 62, bottom: 8, containLabel: true }, tooltip: { ...E.baseOpt(T).tooltip, valueFormatter: (v) => (v == null ? '—' : F.n(v, 2) + '%') },
          xAxis: E.axisCat(['Regla de Taylor', 'Tasa actual'], T), yAxis: E.axisVal(T, (v) => v + '%'),
          series: [...comp.map(([n, v, col]) => ({ type: 'bar', stack: 'a', name: n, barWidth: 56, itemStyle: { color: col, borderColor: T.card, borderWidth: 1 }, data: [+(v * 100).toFixed(3), null] })),
            { type: 'bar', stack: 'a', name: 'i actual', barWidth: 56, itemStyle: { color: T.c5, borderRadius: [4, 4, 0, 0] }, data: [null, +(aF.i * 100).toFixed(3)] }] };
      });
      const preHost = (host, map, set) => {
        host.innerHTML = Object.keys(map).map((k) => `<button class="btn sm" type="button" data-p="${k}">${k}</button>`).join('') + '<span class="small muted" data-t style="margin-left:8px"></span>';
        host.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
          host.querySelectorAll('button').forEach((x) => x.classList.toggle('pri', x === b));
          host.querySelector('[data-t]').textContent = map[b.dataset.p].t || '';
          set(map[b.dataset.p]);
        }));
      };
      preHost(root.querySelector('#preF'), preF, (p) => { const { t, ...v } = p; kF.set(v); });

      // ---------------------------------------------------------------- Lab 2
      let aP = {}; let cP;
      const drawP = () => {
        const f = forward(aP.S, aP.i, aP.ie), dep = f / aP.S - 1, ret = (1 + aP.i) / (1 + aP.my) - 1;
        E.tiles(root.querySelector('#tiP'), [
          { label: 'Forward implícito (CIP)', v: f, fmt: 'n', dec: 3, hl: true, note: 'F = S(1+i)/(1+i*)' },
          { label: 'E(S₁) según UIP', v: f, fmt: 'n', dec: 3, note: 'igual a F si E(S₁) = F' },
          { label: 'Depreciación esperada', v: dep, fmt: 'pct', dec: 2, note: `exacta; i − i* = ${pc(aP.i - aP.ie)}` },
          { label: 'Tu rendimiento en dólares', v: ret, fmt: 'pct', dec: 2, note: `vs ${pc(aP.ie)} en EUA` },
        ]);
        const gap = ret - aP.ie, lado = Math.abs(gap) < 0.0005 ? 'indiferente' : gap > 0 ? 'México' : 'EUA';
        root.querySelector('#rdP').innerHTML = dep > 0
          ? `El peso paga ${pc(aP.i - aP.ie)} más, así que el mercado debe esperar que se deprecie ${pc(dep)} y llegue a ${F.n(f, 3)}. Tú esperas ${pc(aP.my)}: ${lado === 'indiferente' ? 'eres <b>indiferente</b>.' : `conviene <b>${lado}</b> por ${pc(Math.abs(gap))}.`} ${aP.i - aP.ie < 0.025 ? 'Con un diferencial tan chico, el colchón del carry es muy pequeño.' : ''}`
          : `La tasa local es menor o igual a la externa, así que el forward predice <b>apreciación</b> de ${pc(-dep)}. Es el caso del yen: por eso se usa como moneda de fondeo.`;
        if (cP) cP.refresh();
      };
      E.knobs(root.querySelector('#knP'), [
        { k: 'i', label: 'Tasa local i (México)', min: 0, max: 0.2, step: 0.0025, v: 0.065, fmt: 'pct', dec: 2 },
        { k: 'ie', label: 'Tasa extranjera i* (EUA)', min: 0, max: 0.1, step: 0.0025, v: 0.04, fmt: 'pct', dec: 2 },
        { k: 'S', label: 'Spot S (pesos por dólar)', min: 10, max: 30, step: 0.05, v: 18.2, fmt: 'n', dec: 2 },
        { k: 'my', label: 'Tu depreciación esperada', min: -0.1, max: 0.2, step: 0.0025, v: 0.01, fmt: 'pct', dec: 2 },
      ], (s) => { aP = s; drawP(); }, { title: '🎛️ Mueve las tasas y tu expectativa' });
      cP = E.chart(root.querySelector('#chP'), (T) => {
        const xs = []; for (let d = -10; d <= 20.001; d += 1) xs.push([d, +(((1 + aP.i) / (1 + d / 100) - 1) * 100).toFixed(3)]);
        const be = (forward(aP.S, aP.i, aP.ie) / aP.S - 1) * 100;
        return { ...E.baseOpt(T), grid: { left: 8, right: 16, top: 30, bottom: 34, containLabel: true }, tooltip: { ...E.baseOpt(T).tooltip, axisPointer: { type: 'line' }, valueFormatter: (v) => F.n(v, 2) + '%' },
          xAxis: { type: 'value', min: -10, max: 20, name: 'Depreciación del peso (%)', nameLocation: 'middle', nameGap: 24, nameTextStyle: { color: T.muted }, axisLine: { lineStyle: { color: T.axis } }, splitLine: { show: false }, axisLabel: { color: T.muted } },
          yAxis: E.axisVal(T, (v) => v + '%'),
          series: [
            { type: 'line', name: 'Invertir en México', data: xs, showSymbol: false, lineStyle: { width: 2, color: T.c2 }, itemStyle: { color: T.c2 },
              markPoint: { symbol: 'circle', symbolSize: 12, itemStyle: { color: T.c5, borderColor: T.card, borderWidth: 2 }, label: { show: true, position: 'top', color: T.ink, formatter: 'quiebre ' + F.n(be, 2) + '%' }, data: [{ coord: [be, aP.ie * 100] }] } },
            { type: 'line', name: 'Invertir en EUA', data: [[-10, aP.ie * 100], [20, aP.ie * 100]], showSymbol: false, lineStyle: { width: 2, color: T.c4 }, itemStyle: { color: T.c4 } },
          ] };
      });

      // ---------------------------------------------------------------- Lab 3
      const preC = {
        'Hoy (≈)': { iM: 0.065, iJ: 0.0125, a: 0, L: 1, t: 'Banxico 6.50%, BoJ 1.25%; 18.20 pesos/dólar y 157 yenes/dólar dan ≈11.6 pesos por 100 yenes.' },
        'Sube el BoJ a 2.25%': { iM: 0.065, iJ: 0.0225, a: 0.03, L: 3, t: 'Escenario ilustrativo: 100 pb más de fondeo y un yen 3% más fuerte.' },
        'Agosto 2024 (≈)': { iM: 0.11, iJ: 0.0025, a: 0.2, L: 5, t: 'Ilustrativo con cifras aproximadas: lee la nota de abajo.' },
      };
      let aC = {}; let cC;
      const drawC = () => {
        const R = carryR(aC.iM, aC.iJ, aC.a), be = (1 + aC.iM) / (1 + aC.iJ) - 1, S1 = aC.S0 * (1 + aC.a), Sbe = aC.S0 * (1 + be);
        const pr = (1 + aC.iM) / (1 + aC.a) - (1 + aC.iJ), lev = aC.L * pr, yrs = aC.a > 0 && be > 0 ? Math.log(1 + aC.a) / Math.log(1 + be) : 0;
        E.tiles(root.querySelector('#tiC'), [
          { label: 'Retorno R en yenes', v: R, fmt: 'pct', dec: 2, hl: true, note: '(1+i$)(S₀/S₁)/(1+i¥) − 1' },
          { label: 'Colchón: yen de quiebre', v: be, fmt: 'pct', dec: 2, note: `S₁ de quiebre = ${F.n(Sbe, 2)}` },
          { label: 'S₁ (pesos por 100 yenes)', v: S1, fmt: 'n', dec: 2, note: `S₀ = ${F.n(aC.S0, 2)}` },
          { label: `Sobre capital (×${F.n(aC.L, 0)})`, v: lev, fmt: 'pct', dec: 1, note: 'apalancamiento × ganancia' },
          { label: 'Años de carry que borra', v: yrs, fmt: 'n', dec: 1, note: 'ln(1+a)/ln(1+colchón)' },
        ]);
        root.querySelector('#rdC').innerHTML = R >= 0
          ? `${aC.a === 0 ? 'Si el yen no se mueve, te quedas con' : `Un yen ${aC.a > 0 ? 'que sube' : 'que baja'} ${pc(Math.abs(aC.a), 1)} te deja`} <b>${sg(R)}</b>. Te queda un colchón de ${pc(be - aC.a, 1)} antes de empezar a perder. ${be < 0.04 ? 'Ese colchón es muy pequeño: basta un mal mes.' : 'Pero el colchón se mide en un año y el yen puede moverlo en semanas.'}`
          : `<b>El carry se destruye:</b> el yen subió ${pc(aC.a, 1)} y tu colchón era de ${pc(be, 1)}; pierdes ${pc(-R)} y con apalancamiento ×${F.n(aC.L, 0)} son ${pc(-lev, 1)} de tu capital. Equivale a borrar ≈${F.n(yrs, 1)} años de carry. Además, para cerrar debes comprar yenes, y si todos lo hacen el yen sube más: el desarme se alimenta solo.`;
        if (cC) cC.refresh();
      };
      const kC = E.knobs(root.querySelector('#knC'), [
        { k: 'iM', label: 'Tasa en pesos i$', min: 0, max: 0.15, step: 0.0025, v: 0.065, fmt: 'pct', dec: 2 },
        { k: 'iJ', label: 'Tasa en yenes i¥', min: 0, max: 0.05, step: 0.0025, v: 0.0125, fmt: 'pct', dec: 2 },
        { k: 'a', label: 'Apreciación del yen contra el peso', min: -0.1, max: 0.3, step: 0.005, v: 0, fmt: 'pct', dec: 1, hint: 'S₁ = S₀(1 + a). Positiva: yen más caro' },
        { k: 'L', label: 'Apalancamiento', min: 1, max: 10, step: 1, v: 1, fmt: 'x', dec: 0 },
        { k: 'S0', label: 'S₀ (pesos por 100 yenes)', min: 5, max: 25, step: 0.1, v: 11.6, fmt: 'n', dec: 1, hint: 'No cambia el %: sólo el nivel de quiebre' },
      ], (s) => { aC = s; drawC(); }, { title: '🎛️ Mueve el yen y mira qué le pasa al carry' });
      cC = E.chart(root.querySelector('#chC'), (T) => {
        const xs = []; for (let a = -10; a <= 30.001; a += 1) xs.push([a, +(carryR(aC.iM, aC.iJ, a / 100) * 100).toFixed(3)]);
        const be = ((1 + aC.iM) / (1 + aC.iJ) - 1) * 100;
        return { ...E.baseOpt(T), grid: { left: 8, right: 16, top: 30, bottom: 34, containLabel: true }, legend: { show: false }, tooltip: { ...E.baseOpt(T).tooltip, axisPointer: { type: 'line' }, valueFormatter: (v) => F.n(v, 2) + '%' },
          xAxis: { type: 'value', min: -10, max: 30, name: 'Apreciación del yen (%)', nameLocation: 'middle', nameGap: 24, nameTextStyle: { color: T.muted }, axisLine: { lineStyle: { color: T.axis } }, splitLine: { show: false }, axisLabel: { color: T.muted } },
          yAxis: E.axisVal(T, (v) => v + '%'),
          series: [{ type: 'line', name: 'Retorno R', data: xs, showSymbol: false, lineStyle: { width: 2, color: T.c1 }, itemStyle: { color: T.c1 },
            markArea: { silent: true, itemStyle: { color: T.bad, opacity: 0.1 }, data: [[{ xAxis: be }, { xAxis: 30 }]] },
            markLine: { silent: true, symbol: 'none', lineStyle: { color: T.axis, type: 'dashed' }, label: { color: T.muted, formatter: 'quiebre ' + F.n(be, 1) + '%' }, data: [{ xAxis: be }] },
            markPoint: { symbol: 'circle', symbolSize: 12, itemStyle: { color: T.c5, borderColor: T.card, borderWidth: 2 }, label: { show: true, position: 'top', color: T.ink, formatter: () => F.n(carryR(aC.iM, aC.iJ, aC.a) * 100, 1) + '%' }, data: [{ coord: [aC.a * 100, carryR(aC.iM, aC.iJ, aC.a) * 100] }] } }] };
      });
      preHost(root.querySelector('#preC'), preC, (p) => { const { t, ...v } = p; kC.set(v); });

      // ---------------------------------------------------------------- Lab 4
      const preY = {
        '31-ene-2023 (caso)': { cap: 0.005, ym: 0.009, k: 2, t: 'Techo 0.5%, teórico 0.9%. Sensibilidad ilustrativa.' },
        'Sin presión': { cap: 0.005, ym: 0.004, k: 2, t: 'El mercado está conforme: no hay nada que defender.' },
        'Inflación aprieta': { cap: 0.005, ym: 0.016, k: 3, t: 'Ilustrativo: el mercado apuesta contra el techo.' },
      };
      let aY = {}; let cY;
      const drawY = () => {
        const gap = Math.max(0, aY.ym - aY.cap), pC = bondP(aY.cap, aY.cap), pM = bondP(aY.cap, aY.ym), buy = (gap / 0.001) * aY.k, loss = 7.5 * (gap / 0.0025);
        E.tiles(root.querySelector('#tiY'), [
          { label: 'Precio al techo', v: pC, fmt: 'n', dec: 2, note: 'cupón = techo, vale 100' },
          { label: 'Precio que quiere el mercado', v: pM, fmt: 'n', dec: 2, hl: true, note: `a ${pc(aY.ym)}` },
          { label: 'Sobreprecio que paga el BoJ', v: gap > 0 ? pC - pM : 0, fmt: 'n', dec: 2, note: 'por cada 100 de valor' },
          { label: 'Compra necesaria (ilustrativa)', v: buy, fmt: 'n', dec: 1, note: 'billones de yenes' },
          { label: 'Pérdida latente si cede', v: loss, fmt: 'n', dec: 1, note: 'billones de yenes, ≈' },
        ]);
        root.querySelector('#rdY').innerHTML = gap <= 0
          ? `El mercado acepta ${pc(aY.ym)}, debajo del techo de ${pc(aY.cap)}. El BoJ <b>no tiene que comprar nada</b>. El techo sólo cuesta cuando se vuelve incómodo.`
          : `El mercado sólo paga ${F.n(pM, 2)} por un bono que el BoJ defiende en ${F.n(pC, 2)}. Para que no suba de ${pc(aY.cap)}, debe comprar a ese precio: unos ¥${F.n(buy, 1)} billones con tu sensibilidad. Cada compra aumenta su pérdida si cede: ≈¥${F.n(loss, 1)} billones por ${F.n(gap * 10000, 0)} pb. ${gap > 0.005 ? 'A este nivel el mercado <b>huele que el techo no aguantará</b>, y vender se vuelve aún más atractivo.' : 'Es manejable, pero la apuesta contra el techo ya existe.'}`;
        if (cY) cY.refresh();
      };
      const kY = E.knobs(root.querySelector('#knY'), [
        { k: 'cap', label: 'Techo del BoJ', min: 0, max: 0.015, step: 0.0005, v: 0.005, fmt: 'pct', dec: 2 },
        { k: 'ym', label: 'Rendimiento que quiere el mercado', min: 0, max: 0.03, step: 0.0005, v: 0.009, fmt: 'pct', dec: 2 },
        { k: 'k', label: 'Compra por cada 10 pb de presión (¥ billones)', min: 0.5, max: 5, step: 0.5, v: 2, fmt: 'n', dec: 1, hint: 'Supuesto ilustrativo, no es dato del caso' },
      ], (s) => { aY = s; drawY(); }, { title: '🎛️ Mueve la presión del mercado contra el techo' });
      cY = E.chart(root.querySelector('#chY'), (T) => {
        const xs = []; for (let y = 0; y <= 3.001; y += 0.1) xs.push([+y.toFixed(1), +bondP(aY.cap, y / 100).toFixed(3)]);
        const pts = [{ coord: [aY.cap * 100, bondP(aY.cap, aY.cap)], itemStyle: { color: T.c1, borderColor: T.card, borderWidth: 2 }, value: 'techo' }, { coord: [aY.ym * 100, bondP(aY.cap, aY.ym)], itemStyle: { color: T.bad, borderColor: T.card, borderWidth: 2 }, value: 'mercado' }];
        return { ...E.baseOpt(T), grid: { left: 8, right: 16, top: 30, bottom: 34, containLabel: true }, legend: { show: false }, tooltip: { ...E.baseOpt(T).tooltip, axisPointer: { type: 'line' }, valueFormatter: (v) => F.n(v, 2) },
          xAxis: { type: 'value', min: 0, max: 3, name: 'Rendimiento (%)', nameLocation: 'middle', nameGap: 24, nameTextStyle: { color: T.muted }, axisLine: { lineStyle: { color: T.axis } }, splitLine: { show: false }, axisLabel: { color: T.muted } },
          yAxis: E.axisVal(T, (v) => v, { scale: true }),
          series: [{ type: 'line', name: 'Precio del bono', data: xs, showSymbol: false, lineStyle: { width: 2, color: T.c2 }, itemStyle: { color: T.c2 },
            markPoint: { symbol: 'circle', symbolSize: 12, label: { show: true, position: 'top', color: T.ink, fontSize: 12, formatter: (p) => p.value }, data: pts } }] };
      });
      preHost(root.querySelector('#preY'), preY, (p) => { const { t, ...v } = p; kY.set(v); });

      // ---------------------------------------------------------------- quiz
      E.quiz(root.querySelector('#qzM'), [
        { q: 'Banxico 6.50%, inflación 3.62%. ¿Tasa real aproximada?', o: ['10.1%', '≈2.9%', '−2.9%', '6.5%'], a: 1, w: 'r ≈ 6.50 − 3.62 = 2.88% (exacta ≈2.78%). Dentro del intervalo neutral que estima Banxico.' },
        { q: 'México 6.5%, EUA 4%, spot 18.20. ¿Forward a un año?', o: ['17.77', '18.20', '≈18.64', '19.02'], a: 2, w: '18.20 × 1.065 / 1.04 = 18.6375. La moneda de tasa más alta cotiza con descuento a futuro.' },
        { q: 'Carry yen → peso con i$ = 6.5% e i¥ = 1.25%. ¿Con qué apreciación del yen quedas en cero?', o: ['≈5.2%', '≈7.8%', '1.25%', '6.5%'], a: 0, w: '1.065 / 1.0125 − 1 = 5.19%. A partir de ahí pierdes.' },
        { q: 'Bono con cupón de 0.5%. Si su rendimiento sube de 0.5% a 0.9%, ¿qué le pasa al precio?', o: ['Sube ≈3.8%', 'No cambia', 'Baja a la mitad', 'Baja ≈3.8%'], a: 3, w: 'Precio y rendimiento se mueven al revés: de 100 a ≈96.2. Por eso defender el techo implica comprar a precio mayor que el del mercado.' },
        { q: '¿Qué frase es correcta sobre YCC?', o: ['Es un decreto de tasa máxima', 'Fija el precio y deja libre la cantidad que hay que comprar', 'Fija la cantidad y deja libre el precio', 'Sólo controla la tasa a un día'], a: 1, w: 'El banco anuncia el rendimiento objetivo y compra lo necesario. Eso es lo que se vuelve caro bajo presión.' },
      ]);

      // ---------------------------------------------------------------- noticias
      root.querySelector('#nwM').innerHTML = E.news.filter((n) => n.topic === 'S4').map((n) => `<article><div class="small muted">${n.date} · ${E.esc(n.source)} · ${E.esc(n.tool)}</div><h4><a href="${n.url}" target="_blank" rel="noopener">${E.esc(n.title)}</a></h4><p>${E.esc(n.read)}</p></article>`).join('');
    },
  });
})();
