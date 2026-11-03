// Sección 20 — S2. Flujos internacionales y desequilibrios: identidad S − I = CA, equilibrio interno/externo, aranceles (crítica de Bernanke) y el comparativo China vs México.
(function () {
  const F = E.fmt;
  const TOPIC = 'S2';

  // ---------------------------------------------------------------- helpers de ilustración
  const box = (x, y, w, h, cls, lines, opt = {}) => {
    const fs = opt.fs || 12, lh = fs + 3, tc = opt.tc === undefined ? 'tw' : opt.tc;
    const y0 = y + h / 2 - ((lines.length - 1) * lh) / 2 + fs * 0.35;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" class="${cls}"/>` +
      lines.map((l, i) => `<text x="${x + w / 2}" y="${y0 + i * lh}" text-anchor="middle" font-size="${fs}" ${tc ? `class="${tc}"` : ''} ${i === 0 && opt.bold !== false ? 'font-weight="700"' : ''}>${l}</text>`).join('');
  };
  const arrowDefs = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="f8"/></marker></defs>`;
  const arrow = (x1, y1, x2, y2, id, cls = 'ln') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" marker-end="url(#${id})"/>`;

  // ---------------------------------------------------------------- ilustraciones
  const figIdent = `<svg class="ill" viewBox="0 0 640 310" role="img" aria-label="El saldo privado más el saldo público da el saldo externo; el resto del mundo financia la diferencia en sentido contrario">
    ${arrowDefs('s2a1')}
    ${box(16, 30, 180, 82, 'f1', ['Sector privado', 'S − I', 'hogares y empresas'])}
    <text x="214" y="78" font-size="26" font-weight="800" text-anchor="middle">+</text>
    ${box(232, 30, 170, 82, 'f2', ['Gobierno', 'T − G', 'ingresos − gastos'])}
    <text x="420" y="78" font-size="26" font-weight="800" text-anchor="middle">=</text>
    ${box(438, 30, 186, 82, 'f3', ['Sector externo', 'CA = X − M', 'saldo con el mundo'])}
    ${arrow(531, 118, 531, 182, 's2a1')}
    <text x="522" y="155" font-size="12" text-anchor="end" class="t2">si CA &lt; 0, alguien</text>
    <text x="522" y="170" font-size="12" text-anchor="end" class="t2">tiene que prestarte</text>
    ${box(370, 186, 254, 72, 'f5', ['Financiamiento del resto del mundo', 'IED + portafolio + uso de reservas', '= − CA'], { fs: 12 })}
    <rect x="16" y="150" width="330" height="108" rx="10" class="w4"/>
    <text x="30" y="174" font-size="13" font-weight="700">Los coches del profe</text>
    <text x="30" y="195" font-size="12.5" class="t2">Compramos 1,000 y produjimos 900:</text>
    <text x="30" y="212" font-size="12.5" class="t2">los 100 que faltan vienen de fuera (déficit).</text>
    <text x="30" y="235" font-size="12.5" class="t2">Produjimos 1,000 y compramos 900:</text>
    <text x="30" y="252" font-size="12.5" class="t2">los 100 que sobran se exportan (superávit).</text>
    <text x="320" y="293" text-anchor="middle" font-size="13" class="tm">No es teoría: es una identidad, como Activo = Pasivo + Capital.</text>
  </svg>`;

  const figBern = `<svg class="ill" viewBox="0 0 860 330" role="img" aria-label="El exceso de ahorro de países que envejecen, de emergentes y de petroleros fluye a Estados Unidos, baja las tasas, infla activos, reduce el ahorro y genera el déficit">
    ${arrowDefs('s2a2')}
    <text x="115" y="22" text-anchor="middle" font-size="14" font-weight="700">¿De dónde sale el ahorro?</text>
    ${box(12, 34, 206, 76, 'f2', ['Países ricos que envejecen', 'Japón, Alemania: ahorran para', 'el retiro, invierten poco'], { fs: 12 })}
    ${box(12, 120, 206, 76, 'f5', ['Emergentes tras sus crisis', 'México 94, Asia 97, Rusia 98…', 'de deudores a acreedores'], { fs: 12 })}
    ${box(12, 206, 206, 76, 'f3', ['Exportadores de petróleo', 'el superávit por precios altos', 'se recicla hacia fuera'], { fs: 12 })}
    ${arrow(222, 72, 318, 145, 's2a2')}${arrow(222, 158, 318, 158, 's2a2')}${arrow(222, 244, 318, 172, 's2a2')}
    ${box(322, 104, 150, 108, 'f1', ['Dólar y EUA', 'moneda de reserva,', 'mercados profundos,', 'productividad alta'], { fs: 12 })}
    ${arrow(476, 158, 530, 158, 's2a2')}
    <text x="690" y="22" text-anchor="middle" font-size="14" font-weight="700">¿Qué le hace a EUA?</text>
    ${box(534, 34, 314, 58, 'f6', ['1996–2000: acciones y dólar suben', 'efecto riqueza: el ahorro baja, importar es barato'], { fs: 12 })}
    ${box(534, 104, 314, 58, 'f7', ['Desde 2000: tasas reales bajas', 'hipotecas baratas, casas caras, se saca capital de ellas'], { fs: 12 })}
    ${box(534, 174, 314, 58, 'f4', ['S cae e I no: S − I &lt; 0', 'el déficit no nació en la aduana'], { fs: 12 })}
    ${arrow(691, 92, 691, 104, 's2a2')}${arrow(691, 162, 691, 174, 's2a2')}
    ${box(534, 244, 314, 46, 'f8', ['CA de −$120 mil mill. (1996) a −$635 mil mill. (2004)'], { fs: 12 })}
    ${arrow(691, 232, 691, 244, 's2a2')}
    <text x="430" y="318" text-anchor="middle" font-size="13" class="tm">El dinero cuesta arriba: de países pobres a un país rico, justo lo contrario de lo que predice la teoría.</text>
  </svg>`;

  const figTar = `<svg class="ill" viewBox="0 0 860 250" role="img" aria-label="Cadena del arancel: suben precios de importación, bajan importaciones, se aprecia el dólar, bajan exportaciones, y el saldo no cambia si S menos I no cambia">
    ${arrowDefs('s2a3')}
    ${box(10, 30, 150, 90, 'f4', ['Arancel ↑', 'es un impuesto', 'a lo importado'], { fs: 12.5 })}
    ${arrow(162, 75, 186, 75, 's2a3')}
    ${box(188, 30, 150, 90, 'f2', ['M ↓', 'precios internos ↑', 'menos volumen'], { fs: 12.5 })}
    ${arrow(340, 75, 364, 75, 's2a3')}
    ${box(366, 30, 150, 90, 'f5', ['Dólar ↑', 'se piden menos', 'divisas para importar'], { fs: 12.5 })}
    ${arrow(518, 75, 542, 75, 's2a3')}
    ${box(544, 30, 150, 90, 'f6', ['X ↓', 'tus exportaciones', 'se encarecen'], { fs: 12.5 })}
    ${arrow(696, 75, 720, 75, 's2a3')}
    ${box(722, 30, 128, 90, 'f8', ['X − M', 'igual', 'menos comercio'], { fs: 12.5 })}
    <rect x="10" y="146" width="840" height="86" rx="10" class="w3"/>
    <text x="28" y="172" font-size="14" font-weight="700">La ancla: S − I + (T − G) no se movió, así que X − M tampoco puede moverse.</text>
    <text x="28" y="194" font-size="13" class="t2">El arancel sólo cierra el déficit si cambia el gasto del país: que se ahorre más, se invierta menos (recesión incluida)</text>
    <text x="28" y="214" font-size="13" class="t2">o que el gobierno use la recaudación para bajar su déficit. Eso ya no es política comercial: es política fiscal.</text>
  </svg>`;

  const figSwan = `<svg class="ill" viewBox="0 0 520 340" role="img" aria-label="Cuatro cuadrantes según la brecha del producto y la cuenta corriente, con la política que corresponde a cada uno">
    <rect x="30" y="20" width="230" height="145" class="w5"/><rect x="260" y="20" width="230" height="145" class="w4"/>
    <rect x="30" y="165" width="230" height="145" class="w2"/><rect x="260" y="165" width="230" height="145" class="w1"/>
    <line x1="30" y1="165" x2="490" y2="165" class="ln"/><line x1="260" y1="20" x2="260" y2="310" class="ln"/>
    <text x="145" y="60" text-anchor="middle" font-size="16" font-weight="700">Recesión + superávit</text>
    <text x="145" y="82" text-anchor="middle" font-size="15" class="t2">Expande demanda interna</text><text x="145" y="100" text-anchor="middle" font-size="15" class="t2">China y Japón débiles</text>
    <text x="375" y="60" text-anchor="middle" font-size="16" font-weight="700">Sobrecalentada + superávit</text>
    <text x="375" y="82" text-anchor="middle" font-size="15" class="t2">Aprecia la moneda</text><text x="375" y="100" text-anchor="middle" font-size="15" class="t2">China 2007–08</text>
    <text x="145" y="205" text-anchor="middle" font-size="16" font-weight="700">Recesión + déficit</text>
    <text x="145" y="227" text-anchor="middle" font-size="15" class="t2">Dilema: deprecia y cambia</text><text x="145" y="245" text-anchor="middle" font-size="15" class="t2">el gasto hacia lo local</text>
    <text x="375" y="205" text-anchor="middle" font-size="16" font-weight="700">Sobrecalentada + déficit</text>
    <text x="375" y="227" text-anchor="middle" font-size="15" class="t2">Recorta el gasto: fiscal o tasa</text><text x="375" y="245" text-anchor="middle" font-size="15" class="t2">México 1994, EUA hoy</text>
    <text x="260" y="330" text-anchor="middle" font-size="13.5" class="tm">Brecha del producto (− recesión · + sobrecalentamiento) →</text>
    <text x="14" y="165" text-anchor="middle" font-size="13.5" class="tm" transform="rotate(-90 14 165)">CA (− déficit · + superávit) →</text>
  </svg>`;

  const figCMP = `<svg class="ill" viewBox="0 0 900 380" role="img" aria-label="Dos cadenas causales paralelas: China abrió durante su industrialización y subió por la cadena de valor; México abrió después, tras gastar su impulso, y se quedó ensamblando">
    ${arrowDefs('s2a4')}
    <text x="10" y="22" font-size="15" font-weight="800">China: abre a media carrera y sigue subiendo</text>
    ${box(10, 34, 136, 92, 'f1', ['1978', 'Reformas con', '60%+ en el campo*'], { fs: 12 })}
    ${arrow(148, 80, 160, 80, 's2a4')}
    ${box(162, 34, 136, 92, 'f1', ['Incentivos', 'campo, TVE,', 'precios duales'], { fs: 12 })}
    ${arrow(300, 80, 312, 80, 's2a4')}
    ${box(314, 34, 136, 92, 'f1', ['ZEE + IED', 'con obligación', 'de exportar'], { fs: 12 })}
    ${arrow(452, 80, 464, 80, 's2a4')}
    ${box(466, 34, 136, 92, 'f1', ['OMC 2001', 'el mercado se', 'expande'], { fs: 12 })}
    ${arrow(604, 80, 616, 80, 's2a4')}
    ${box(618, 34, 136, 92, 'f1', ['Sube la escalera', 'tenis → chips e IA', 'I+D, infraestructura'], { fs: 12 })}
    ${arrow(756, 80, 768, 80, 's2a4')}
    ${box(770, 34, 120, 92, 'fgood', ['PTF ↑', 'salarios ↑'], { fs: 14 })}
    <text x="10" y="166" font-size="15" font-weight="800">México: el mismo guion, 30 años antes y sin el siguiente paso</text>
    ${box(10, 178, 136, 92, 'f5', ['1950–70', 'Sustitución de', 'importaciones: crece'], { fs: 12 })}
    ${arrow(148, 224, 160, 224, 's2a4')}
    ${box(162, 178, 136, 92, 'f5', ['Sobreprotección', 'sin competir fuera:', 'ineficiencia'], { fs: 12 })}
    ${arrow(300, 224, 312, 224, 's2a4')}
    ${box(314, 178, 136, 92, 'f5', ['Baja productividad', 'insatisfacción', '(1968, 1971)'], { fs: 12 })}
    ${arrow(452, 224, 464, 224, 's2a4')}
    ${box(466, 178, 136, 92, 'f5', ['Gasto y deuda', 'crisis 1976, 1982', 'y 1994–95'], { fs: 12 })}
    ${arrow(604, 224, 616, 224, 's2a4')}
    ${box(618, 178, 136, 92, 'f5', ['Apertura tardía', 'GATT 86, TLCAN 94', 'maquila: ensamble'], { fs: 12 })}
    ${arrow(756, 224, 768, 224, 's2a4')}
    ${box(770, 178, 120, 92, 'fbad', ['PTF plana', 'salarios planos'], { fs: 14 })}
    <rect x="10" y="288" width="880" height="72" rx="10" class="w3"/>
    <text x="24" y="312" font-size="13.5" font-weight="700">Lo que NO explica la diferencia: la apertura. Las dos son abiertas; México exporta más que China como % del PIB.</text>
    <text x="24" y="334" font-size="13" class="t2">Lo que sí: el momento de abrir (transformación estructural) y qué hiciste con la apertura (PTF, cadena de valor).</text>
    <text x="24" y="352" font-size="11.5" class="tm">* Kehoe y Xu dan ≈60% del empleo en agricultura para 1992; en 1978 era aún mayor. Fuente: Kehoe y Xu (2025), clase 14-oct, Yang et al., Tabellini.</text>
  </svg>`;

  // ---------------------------------------------------------------- laboratorio 2: modelo de arancel con S − I como ancla
  const X0 = 13, M0 = 16, NX0 = X0 - M0, BASEVOL = X0 + M0;
  // A = 1 + apreciación real. M = M0·A/(1+τ), X = X0/A (elasticidades 1, a precios mundiales constantes).
  const tariffModel = (tau, phi, cut, dI) => {
    const Mof = (A) => (M0 * A) / (1 + tau), Xof = (A) => X0 / A;
    const gap = (A) => { const m = Mof(A); return Xof(A) - m - (NX0 + phi * tau * m - cut + dI); };
    let lo = 0.4, hi = 3;
    for (let i = 0; i < 70; i++) { const mid = (lo + hi) / 2; if (gap(mid) > 0) lo = mid; else hi = mid; }
    const A = (lo + hi) / 2, M = Mof(A), X = Xof(A), pm = (1 + tau) / A - 1;
    return { A, M, X, nx: X - M, naive: X0 - M0 / (1 + tau), rev: tau * M, pm, cpi: (M0 / 100) * pm * 100, vol: X + M };
  };

  // ---------------------------------------------------------------- render
  E.section({
    id: 'flujos', n: 20, group: 'temas', icon: '🌐', short: 'S2 · Flujos y aranceles', exam: 'in', kicker: 'Tema S2',
    title: 'Flujos internacionales y desequilibrios',
    lead: 'Por qué un déficit comercial se explica con ahorro e inversión y no en la aduana, por qué un arancel no lo arregla y por qué China despegó y México no, siendo los dos economías abiertas.',
    render(root) {
      root.classList.add('sx-fl');
      root.innerHTML = `
      <style>.sx-fl .tbl td,.sx-fl .tbl th{text-align:left!important;white-space:normal!important;vertical-align:top}</style>
      ${E.key('<b>Si hay déficit externo, alguien en el país gasta más de lo que produce.</b> Sólo hay dos sospechosos: el sector privado (S − I) o el gobierno (T − G). El arancel no toca a ninguno de los dos, así que no corrige el déficit. Y abrirte no basta para crecer: China y México se abrieron, pero sólo a China le subió la productividad.', 'Todo el tema en tres frases')}
      <div class="btnrow">
        <a class="btn sm" href="#/flujos/nar">📖 Narrativa</a><a class="btn sm" href="#/flujos/her">🧰 Herramientas</a><a class="btn sm" href="#/flujos/labs">🎛️ Laboratorios</a><a class="btn sm pri" href="#/flujos/cmp">⚔️ China vs México</a><a class="btn sm" href="#/flujos/casos">📚 Casos</a><a class="btn sm" href="#/flujos/qz">✅ Quiz</a><a class="btn sm" href="#/flujos/news">📰 Noticias</a>
      </div>

      <h2 id="nar">📖 La narrativa que califica el profe</h2>
      ${E.tip('Desde la primera clase planteó la hipótesis que este tema pone a prueba: mercados más grandes permiten especializarse y crecer, como decía Adam Smith. Y resumió el giro: tras la globalización con China llegaron 2008 y el COVID, ≈12 años de economía apagada, y por eso mucha gente concluyó que la globalización no era la respuesta.', 'Clase 1')}
      <p class="prose">Léela como cadena: cada etapa causa la siguiente. Las fechas te ubican; lo que se evalúa es el <b>por qué</b>.</p>
      ${E.timeline([
        { y: '1947–89', t: 'Expansión bajo el GATT', d: 'Tras la guerra se bajan aranceles ronda tras ronda y el comercio crece más que el PIB. Por eso los países ven en exportar una vía para crecer: el mercado más grande de Adam Smith.' },
        { y: '1990–2008', t: 'Hiperglobalización', d: 'Contenedores e internet abaratan mover bienes e información; caen barreras, se integran mercados financieros y las multinacionales arman cadenas globales. México entra al TLCAN (1994) y China a la OMC (2001): a los dos se les expande el mercado.' },
        { y: '2000–07', t: 'Desequilibrios: el ahorro asiático financia a EUA', d: 'Asia y los petroleros ahorran más de lo que invierten; EUA gasta más de lo que produce. Por eso el superávit de unos es el déficit del otro. Bernanke (2005) lo bautiza <i>saving glut</i>. El ahorro barato baja tasas, infla la vivienda y deja listo el terreno para la crisis subprime.' },
        { y: '2008–17', t: 'El comercio se estanca (<i>slowbalization</i>)', d: 'La crisis frena la economía global y el comercio deja de ganarle al PIB. Crece el descontento: los productos son más baratos, pero los salarios no crecen como las ganancias corporativas. Por eso llegan Brexit y Trump.' },
        { y: '2018–19', t: 'Guerra comercial EUA–China', d: 'Trump ataca el déficit con China (récord de $419 mil millones en 2018) con aranceles sobre $250 mil millones; China responde sobre $60 mil millones. Pronto el pleito es por tecnología: Huawei y <i>Made in China 2025</i>.' },
        { y: '2020–24', t: 'COVID y relocalización', d: 'La pandemia exhibe lo frágil de las cadenas largas; las empresas buscan acercarse (<i>nearshoring</i>) y regionalizar. Parte del comercio se desvía a Vietnam, India y México, que se vuelve el principal socio de EUA.' },
        { y: '2025–26', t: 'Aranceles como política permanente', d: 'La Suprema Corte de EUA tumba en febrero de 2026 los aranceles basados en la ley IEEPA; el gobierno los sustituye con otras leyes (secciones 122 y 301, 232 para acero y autos). El 1 de julio de 2026 EUA no prorroga el T-MEC y se activan revisiones anuales. El déficit externo sigue ahí, como predice la identidad.' },
      ])}
      ${E.tip('Lo que une la historia es la pregunta de por qué la gente se enoja con la globalización: los bienes son más baratos, pero eso no se ve tan directo; lo que sí se ve es que el salario no creció tanto, mientras empresas como Apple se volvieron las más valiosas del mundo. La respuesta de los gobiernos fue proteger. Y ojo con esto: <q>una cosa es la tarifa que anuncian y otra es la tarifa efectiva</q>.', 'Clase 14-oct')}

      <h2 id="her">🧰 Las herramientas</h2>

      ${E.concept({ id: 'h-ident', title: '1 · La identidad: S − I = CA', badge: 'star', html: `
          <p class="prose">Parte de que todo lo que se produce alguien lo compra: <b>Y = C + I + G + (X − M)</b>. Resta impuestos, pasa el consumo al otro lado y queda el ahorro privado <b>S = Y − T − C</b>. Reacomoda y sale el corazón del tema:</p>
          ${E.formula('Como en la lámina', '(S − I)', '(G − T) + (X − M)', 'privado = fiscal + externo')}
          ${E.formula('Como la pide la guía', 'CA = X − M', '(S − I) + (T − G)', 'con S nacional = S + (T − G): CA = S<sub>nac</sub> − I')}
          <p class="prose">Son la misma ecuación. La lees en tres pasos: ¿hay déficit? → ¿de quién es el exceso de gasto? → ¿por qué gasta de más?</p>
          ${E.kid('Una familia: si alguien gasta de más, otro tiene que ahorrar por él. Si todos gastan de más, usan la tarjeta. El país es igual: el privado, el gobierno y, si no alcanza, la tarjeta del resto del mundo.')}
        ${E.fig(figIdent, 'La identidad reparte el exceso de gasto entre tres jugadores y muestra quién lo financia.', true)}
        ${E.tip('<q>Si hay un déficit es porque hay un exceso de gasto.</q> Y lo compara con que Activo = Pasivo + Capital: no es una opinión, se cumple siempre. Por eso propone cambiar el análisis: <q>Cambiamos las variables en las que nos vamos a fijar.</q> Ya no hace falta ser experto en comercio exterior: basta ver ahorro, inversión y déficit público. La única pregunta: <q>¿Quién es el gastador de la familia?</q>', 'Clases 14-oct y 19-oct')}
        <div class="g2">
          ${E.tip('Solow te dice cuánto produces; no te dice <b>quién lo compra</b>. Esta identidad sí. Por el lado de la oferta, China exporta por su productividad; por el lado de la demanda, porque ahorra mucho: <q>los países que exportan son gente que está ahorrando.</q> Y ahorra porque su red de salud y seguridad social es débil y tiene que guardar por si acaso.', 'Clase 19-oct')}
          ${E.warn('<b>La identidad no dice qué causa qué.</b> Que T − G aparezca en la ecuación no significa que bajar el déficit fiscal 1 peso baje el externo 1 peso: el privado reacciona. Bernanke cita un modelo donde $1 menos de déficit fiscal baja el externo menos de 20 centavos. Y ojo con el signo: las láminas ponen (G − T) del lado derecho, la guía usa (T − G) sumando a (S − I). Son lo mismo si despejas bien.')}
        </div>` })}

      ${E.concept({ id: 'h-bop', title: '2 · ¿Quién te presta? La balanza de pagos', badge: 'in', html: `
        ${E.formula('Clase 26-oct', 'CA', '− (flujos de capital) − (uso de reservas)', 'portafolio + inversión directa + cambio en reservas')}
        ${E.formula('Lámina 40', 'BCA + BKA', '0', 'BKA = entrada neta de capital; (X − M) + BKA = 0')}
        <div class="g2"><div>
          ${E.table([
            ['IED', 'Fábricas, compra de bancos. Lenta para salir.', 'La fuente más estable'],
            ['Portafolio', 'Cetes, Tesobonos, acciones. Se va en un clic.', 'La que truena en 1994'],
            ['Reservas', 'El banco central vende dólares.', 'Se acaban: compras tiempo'],
          ], { head: ['Fuente', 'Qué es', 'Riesgo'] })}
        </div><div>
          ${E.kid('Déficit externo = saldo de tu tarjeta. Cada año pides más y debes más al resto del mundo. Por eso importa quién te presta y si puede irse mañana.')}
          ${E.tip('<q>No te hagas más bolas, es lo mismo que tu tarjeta de crédito.</q> Te prestan, pero cada vez debes más, y eso es lo que se pregunta si es sostenible.', 'Clase 26-oct')}
        </div></div>
        ${E.warn('<b>Convención de signos:</b> en la lámina 33 la cuenta financiera positiva es <b>préstamo neto</b> al mundo (CA + KA = FA), mientras en la lámina 40 BKA positivo es <b>entrada</b> de capital (BCA + BKA = 0). No se contradicen: una mide lo que prestas, la otra lo que recibes. Di siempre cuál usas.')}` })}

      ${E.concept({ id: 'h-swan', title: '3 · Equilibrio interno y externo', badge: 'in', html: `
        <div class="cols"><div>
          <p class="prose"><b>Equilibrio interno:</b> producir en tu potencial, sin desempleo ni inflación. <b>Equilibrio externo:</b> una cuenta corriente que puedas financiar. Cada país cae en uno de cuatro cuadrantes, y el cuadrante dice qué política le toca.</p>
          ${E.table([
            ['<b>Política fiscal</b>', 'Sube T − G, baja gasto', 'Costo social, y a veces ya no hay espacio'],
            ['<b>Tasa de interés</b>', 'Baja I, sube S', 'Frena crecimiento; cartera vencida y bancos'],
            ['<b>Devaluación</b>', 'Encarece M, abarata X', 'Sube inflación; pega a deuda en dólares'],
          ], { head: ['Instrumento', 'Cómo mueve el saldo', 'Contra'] })}
          ${E.note('El profe usa también otro sentido en la lámina 33: llama <b>equilibrio doméstico</b> (“internal equilibrium”) a S − I. Si te preguntan por la identidad, es ése; si te preguntan qué política le toca a un país, usa el cuadrante.', 'Dos usos de “interno”')}
        </div><div>
          ${E.fig(figSwan, 'Marco tipo Swan. Los casos son ubicaciones aproximadas para razonar.')}
        </div></div>
        ${E.tip('Reducir el déficit duele: para bajarlo, el gasto tiene que caer, por tipo de cambio o por tasa. Un alumno objetó que frenar la inversión desacelera la economía; respondió que sí, y que justamente ése es el dilema del caso. Fue además tajante: la Fed no decide mirando la balanza comercial; sus objetivos son inflación y crecimiento.', 'Clase 26-oct')}
        ${E.warn('La frase “déficit es igual a falta de productividad” es falsa: EUA tiene déficit y mucha productividad. El déficit es de gasto, no de eficiencia. Se lo corrigió a un alumno en clase el 26-oct.')}` })}

      ${E.concept({ id: 'h-aran', title: '4 · Efectos de los aranceles', badge: 'star', html: `
        ${E.fig(figTar, 'Cadena que explica por qué un arancel mueve precios y volumen, pero no el saldo.', true)}
        <div class="g2"><div>
          ${E.table([
            ['Precios', '↑ Sube lo importado (una vez)', 'Es un impuesto: lo paga sobre todo el comprador local'],
            ['Tipo de cambio', '↑ Tu moneda se aprecia', 'Le quita al exportador lo que le dio al protegido'],
            ['Volumen', '↓ Baja X y baja M', 'Menos comercio: menos ganancias de especialización'],
            ['Saldo bilateral', 'Puede bajar', 'Pero se desvía a otro país (Vietnam, México)'],
            ['Saldo total', 'Igual', 'Salvo que cambien S, I o T − G'],
          ], { head: ['Variable', 'Efecto', 'Por qué'] })}
        </div><div>
          ${E.tip('<q>Trump, perdóname, pero si pones las tarifas no vas a hacer nada.</q> Lo que necesitas es que la gente ahorre más, se invierta menos y el gobierno gaste menos. Y la pregunta de examen perfecta: ¿se puede bajar impuestos y a la vez reducir el déficit comercial? No: el recorte sube el gasto, y ese gasto se va a importaciones, salvo que la gente lo ahorre.', 'Clases 14-oct y 26-oct')}
          ${E.warn('<b>El tipo de cambio es el mecanismo de libro, no una ley.</b> En 2025 el dólar más bien se debilitó pese a los aranceles, porque también lo mueven tasas y flujos de capital (dato general, no de clase). El resultado que no falla es contable: el saldo sólo cambia si cambia S − I + (T − G).')}
        </div></div>
        ${E.kid('Aprietas el globo de un lado (importaciones) y se abulta del otro (exportaciones): el aire adentro, que es lo que el país gasta de más, sigue siendo el mismo.')}` })}

      <h2 id="labs">🎛️ Laboratorios</h2>

      <section class="concept" id="lab1">
        <header><h3>Lab 1 · La radiografía de un país: S − I = CA</h3></header>
        <p class="prose">Mueve ahorro, déficit e inversión. Lo que le falte al país lo pone el resto del mundo. Los países de los botones son <b>aproximaciones ilustrativas</b> armadas con cifras de los casos, no datos oficiales.</p>
        <div class="btnrow" id="l1p"></div>
        <div class="cols"><div id="l1k"></div><div>
          <div id="l1t"></div>
          <div class="chart" id="l1c"></div>
        </div></div>
        <div id="l1r"></div>
      </section>

      <section class="concept" id="lab2">
        <header><h3>Lab 2 · El arancel de Trump vs. la identidad de Bernanke</h3></header>
        <p class="prose">País con exportaciones de 13 e importaciones de 16 (% del PIB; proporciones de la clase del 14-oct para EUA). El modelo es deliberadamente simple: tipo de cambio flexible, elasticidades de 1 y S − I fijo salvo que tú lo muevas. Sube el arancel y mira qué línea se queda quieta.</p>
        <div class="cols"><div id="l2k"></div><div><div id="l2t"></div></div></div>
        <div class="g2" style="margin-top:14px">
          <div><h4 style="margin:0 0 4px">Antes y después (% del PIB)</h4><div class="chart" id="l2c"></div></div>
          <div><h4 style="margin:0 0 4px">¿Qué pasa conforme subes el arancel?</h4><div class="chart" id="l2d"></div></div>
        </div>
        <div id="l2r"></div>
        ${E.reveal('Cómo se calcula (por si quieres revisar la matemática)', `<p class="prose gl-no">A = 1 + apreciación real. M = 16·A/(1+τ), X = 13/A, a precios mundiales constantes. El saldo debe cumplir X − M = −3 + φ·τ·M − recorte + caída de I. Se resuelve para A. Ejemplo a mano con τ = 20%, sin otras perillas: 13/A − 13.33·A = −3, de donde A = 1.106 (dólar +10.6%), M = 14.75, X = 11.75, saldo = −3, y lo importado sube 1.20/1.106 − 1 = 8.5%. La línea “ingenua” deja A = 1: 13 − 16/1.2 = −0.33. Esa diferencia es el error de razonar sólo con la aduana.</p>`)}
      </section>

      <section class="concept" id="lab3">
        <header><h3>Lab 3 · ¿En qué cuadrante estás y qué política te toca?</h3></header>
        <p class="prose">Elige un país de partida y aplica política. El círculo vacío es donde empiezas y el lleno, a dónde llegas. Ubicaciones y coeficientes son <b>ilustrativos</b> (sólo la CA de EUA, 3% del PIB, y la de México 1994, ≈8%, vienen de fuentes): sirven para razonar el signo, no para pronosticar.</p>
        <div class="btnrow" id="l3p"></div>
        <div class="cols"><div id="l3k"></div><div>
          <div id="l3t"></div>
          <div class="chart h360" id="l3c"></div>
        </div></div>
        <div id="l3r"></div>
      </section>

      <h2 id="cmp">⚔️ La pieza central: China vs México</h2>
      ${E.tip('Fue lo que pidió en clase: <q>México no creció la productividad, en China sí creció la productividad.</q> Las dos economías son abiertas, las dos despegaron con exportaciones cuando se les expandió el mercado (TLCAN y OMC). Entonces, ¿por qué en China subieron los salarios y en México no? Dijo además que el artículo importante es el de Kehoe y Xu, pero que sólo cuenta lo último: la sustitución de importaciones y lo que hizo China están en Tabellini y en Yang.', 'Clases 14-oct y 28-oct')}
      ${E.fig(figCMP, 'La respuesta en dos carriles. Memoriza esta cadena: es tu ensayo.', true)}
      <div class="g2">
        ${E.key('<b>1. Momento.</b> China se abrió 14 años después de iniciar su industrialización, con la gente aún saliendo del campo; ese traslado da productividad casi gratis. México se abrió unos 40 años después: ya había hecho esa transformación y no tenía el viento a favor.<br><b>2. Qué hiciste con la apertura.</b> China subió de tenis a chips, con I+D, infraestructura y política industrial; México siguió exportando lo mismo a Norteamérica.<br><b>3. Barreras a la riqueza.</b> En México: sistema financiero pobre, falta de Estado de derecho y mercado laboral rígido e informal.', 'La respuesta de Kehoe y Xu')}
        ${E.key('México <b>sí hizo</b> política industrial, pero antes: la sustitución de importaciones de los 50–60. Funcionó (el “milagro mexicano”) hasta que no se dio el siguiente paso: la protección volvió ineficientes a las empresas, cayó la productividad, vino el malestar social (1968) y el gobierno lo calmó con gasto. Déficit, devaluación de 1976, deuda y default de 1982. Cuando llegó la revolución tecnológica, <q>nosotros ya habíamos quemado nuestras balas</q>.', 'Lo que agrega el profe')}
      </div>
      ${E.table([
        ['<b>Cuándo se abre</b>', 'Reforma 1978; aceleración 1992; OMC 2001', 'ISI 1950–81; GATT 1986; Brady 1990; TLCAN 1994', 'Transformación estructural: el traslado del campo a la fábrica es crecimiento fácil'],
        ['<b>Empleo agrícola al abrir</b>', '≈60% en 1992; ≈20% en 2023', 'Mucho menor; ya era urbano', 'Queda mucho o poco por capturar'],
        ['<b>Cómo se protegió</b>', 'Protege, pero <b>exige exportar</b>: IED sólo si exporta más de 50% (guía 1990)', 'Protege el mercado interno sin competir fuera; tope de 49% a IED en 1973', 'La competencia externa disciplina: <q>proteges tanto que lo vuelves ineficiente</q>'],
        ['<b>Qué dejó la IED</b>', 'Aprendizaje y empresas propias (Xiaomi, Huawei)', 'Maquila: 3% de insumos locales (2004); ensamble', 'Derramas tecnológicas → A en Solow'],
        ['<b>Canasta exportadora</b>', 'Maletas, ropa y juguetes → electrónica y maquinaria', 'Autos y petróleo, casi igual en 30 años', 'Cadena de valor: subir la escalera sube la PTF'],
        ['<b>Destino</b>', '≈20% a EUA (2017)', '≈70% a EUA (2017)', 'Concentración y menos relaciones nuevas'],
        ['<b>I+D (% PIB)</b>', '≈0.5 (1996) → más de 2.5 (2021)', 'Siempre por debajo de 0.5', 'Capacidad propia de innovar'],
        ['<b>Infraestructura (% PIB, 2021)</b>', '6.1', '1.5', 'Baja el costo de todo; también sube K'],
        ['<b>Exportaciones / PIB</b>', 'Bajan desde 2006', 'Suben: más de 40% en 2024', '<b>El acertijo:</b> más apertura, menos crecimiento'],
        ['<b>Macro (identidad)</b>', 'Ahorro altísimo (53% en 2008), superávit', 'Ahorro bajo (12% privado en 1994), déficit', 'Ahorro → inversión → K; explica el signo de CA'],
      ], { head: ['Dimensión', 'China', 'México', 'Herramienta / por qué importa'] })}
      <div class="g2">
        ${E.warn('<b>No digas que el TLCAN fue el error.</b> El profe lo dijo: firmar con EUA no fue la mala idea, la mala idea fue no atender la productividad. Y Tabellini: la recesión de 1995 fue por la crisis del Tequila, no por el TLCAN. Kehoe y Xu sí conjeturan que depender de EUA limita a México; preséntalo como hipótesis. Tampoco fue “México tonto”: hizo lo mismo, antes.')}
        ${E.warn('<b>Matices que suman puntos.</b> Kehoe y Xu dicen expresamente que su segundo acertijo no está resuelto: la cadena de valor es <b>conjetura</b>. Las cifras de PIB de China varían: en 2019 China es 53% de México con Penn World Table y 82% con el Banco Mundial. China tiene sus propios problemas: subsidios, mala asignación, envejecimiento. El profe llama “malabarismo” a su sistema.')}
      </div>
      ${E.reveal('📝 Cuéntalo en 60 segundos (para abrir el ensayo)', `<p class="prose">Las dos economías se abrieron y sus exportaciones despegaron, porque se les expandió el mercado: TLCAN para México, OMC para China. En Solow, la diferencia está en la A: en México la productividad se estancó y en China creció, y por eso sólo allá subieron los salarios. México ya había hecho su industrialización con sustitución de importaciones; protegió tanto que volvió ineficientes a sus empresas, la baja productividad generó malestar social, el gobierno lo compensó con gasto y vinieron las crisis de 1976 y 1982. Cuando abrió, ya no tenía el impulso de sacar gente del campo y atrajo sobre todo ensamble. China abrió a media industrialización, exigió exportar a la IED y usó esa entrada para subir por la cadena de valor con I+D e infraestructura. La lección: abrirse es necesario, pero no suficiente.</p>`, true)}

      <h2 id="casos">📚 Los casos</h2>

      ${E.concept({ id: 'c-kehoe', title: 'Kehoe y Xu (2025): Openness and Growth, NBER WP 34181', badge: 'star', html: `
        <p class="prose"><b>De qué trata:</b> si dos países se abren igual, ¿por qué crecen distinto? Plantea dos acertijos y usa contabilidad del crecimiento (α = 0.35) con el marco de “barreras a la riqueza” de Parente y Prescott.</p>
        ${E.table([
          ['Acertijo 1: ¿por qué la apertura coincidió con crecimiento en China y no en México?', '<b>Resuelto:</b> el momento. China abrió durante su transformación estructural; México, después.'],
          ['Acertijo 2: ¿cómo siguió creciendo China mientras dependía menos de la apertura?', '<b>Conjetura:</b> sube la cadena de valor, invierte en infraestructura e I+D. México, exportando lo mismo a Norteamérica.'],
          ['¿Qué frena a México?', 'Tres barreras de Kehoe y Ruhl (2010): finanzas ineficientes, falta de Estado de derecho y rigidez laboral.'],
          ['¿Y las barreras en China?', 'Las mismas pueden alcanzarla: crédito dominado por bancos estatales, Evergrande, hukou, envejecimiento.'],
        ], { head: ['Pregunta', 'Respuesta'] })}
        <p class="prose"><b>Evidencia clave:</b> en México entran y salen pocas relaciones de exportación; en China hay mucha rotación, señal de que sigue subiendo. La mayor apertura mexicana viene de vender <b>más de lo mismo</b> (margen intensivo), no de productos nuevos (margen extensivo). <b>Lección:</b> la apertura no es ni necesaria ni suficiente en cada momento del desarrollo; importa el contexto.</p>` })}

      ${E.concept({ id: 'c-bern', title: 'Bernanke (2005): The Global Saving Glut and the U.S. Current Account Deficit', badge: 'star', html: `
        ${E.note('Resumen del discurso que enlaza Canvas, el <a href="https://www.federalreserve.gov/boarddocs/speeches/2005/200503102/" target="_blank" rel="noopener">texto en la Fed</a> (10 de marzo de 2005, Virginia Association of Economists), y de las láminas 41–56 y lo dicho en clase.', 'Fuente')}
        ${E.fig(figBern, 'El argumento en una imagen. La tesis: buena parte del déficit se origina fuera de EUA.', true)}
        <p class="prose"><b>Personaje y decisión:</b> Bernanke, entonces gobernador de la Fed, se pregunta por qué EUA, el país más rico, recibe prestado medio mundo. Rechaza la explicación comercial: la balanza es, en su imagen, <q>the tail of the dog</q> (la cola del perro), resultado pasivo de ingresos, precios de activos, tasas y tipo de cambio.</p>
        <h4>Las preguntas de la lámina 40, respondidas</h4>
        ${E.reveal('¿Por qué dice que hay dos formas de analizar la cuenta corriente?', '<p class="prose">Porque CA es a la vez X − M (visión comercial: qué y cuánto se vende) y S − I (visión financiera: quién financia a quién). Son contablemente iguales. La comercial no explica ni la magnitud ni el aumento del déficit, así que él usa la financiera.</p>')}
        ${E.reveal('¿Puede la política comercial, los aranceles, corregir el déficit?', '<p class="prose">No por sí sola. Si S − I + (T − G) no cambia, X − M tampoco. El arancel mueve precios, tipo de cambio y volumen. Bernanke no habla de Trump en 2005; el profe aplica el argumento hoy.</p>')}
        ${E.reveal('¿Por qué hay déficit en el sector privado de EUA (S mucho menor que I)?', '<p class="prose">Doble golpe. Primero, 1996–2000: boom bursátil y tecnológico, entra capital, sube el dólar, el efecto riqueza baja el ahorro (ahorro nacional de 18% del PIB en 1985 a menos de 14% en 2004). Después de 2000: tasas bajas, hipotecas baratas, vivienda cara y retiro de capital de las casas. Del lado de I, EUA era el destino más atractivo. El gobierno no es el culpable: el déficit creció ≈$300 mil millones entre 1996 y 2000 con superávit fiscal, y Alemania y Japón tienen déficit fiscal con superávit externo.</p>')}
        ${E.reveal('¿Por qué los emergentes invierten en EUA y no al revés, si allá el rendimiento es mayor?', '<p class="prose">Por sus crisis de los 90 (México 94, Asia 97–98, Rusia 98, Brasil 99, Argentina 2002): dejaron de pedir prestado, acumularon reservas como seguro, sostuvieron monedas competitivas para exportar y recompraron deuda. Súmale petroleros y que el dólar es la moneda de reserva. Los emergentes pasaron de −$88 mil millones a +$205 mil millones (1996–2003), un giro de ≈$293 mil millones.</p>')}
        ${E.reveal('¿Qué recomienda?', '<p class="prose">Reducir el déficit fiscal ayuda, pero poco (menos de 1 punto del PIB incluso con presupuesto balanceado). Lo más directo: ayudar a que los emergentes vuelvan a ser receptores de capital, con mejores instituciones, derechos de propiedad y regulación financiera. Es “invertir la dirección” de los flujos, y le pide paciencia a todos.</p>')}
        ${E.tip('A él este artículo le cambió la manera de ver el mundo: en lugar de fijarse en la política comercial, se fija en el déficit del gobierno y en el sector privado. Y lo actualiza: hoy es lo mismo con la IA. Si tus acciones de Nvidia valen mucho, ahorras menos, y todos quieren invertir en EUA. La diferencia es que hoy, además, también gasta el gobierno.', 'Clases 19-oct y 26-oct')}
        ${E.warn('No confundas: <b>culpar al privado</b> es la lectura de la identidad; <b>el saving glut</b> es la causa de fondo que propone Bernanke, que viene de fuera. Lo completo es: el ahorro externo baja tasas e infla activos en EUA, y por eso su sector privado ahorra poco. Y Bernanke no dice que el déficit fiscal no importe: en 2004 restaba más de $400 mil millones al ahorro. Dice que no explica el aumento.')}` })}

      ${E.concept({ id: 'c-tab', title: 'Tabellini: Mexico, Trade, and Development (HBS)', badge: 'in', html: `
        <p class="prose"><b>La decisión:</b> en 2019–20 México ratifica el T-MEC con grandes esperanzas. ¿Cumplirá lo que el TLCAN prometió hace 25 años?</p>
        ${E.timeline([
          { y: '1940–70s', t: 'Sustitución de importaciones', d: 'Aranceles, control del tipo de cambio y barreras a la IED crean un sector industrial fuerte. “Milagro mexicano”: 3.1% anual per cápita. Pero muy desigual. Pemex como “vaca lechera”.' },
          { y: '1970–82', t: 'Gasto y petróleo', d: 'Echeverría sube el gasto para combatir desigualdad y pobreza, con deuda y rentas petroleras. Cae el petróleo en 1981, suben las tasas de EUA: crisis gemela y moratoria de 1982.' },
          { y: '1982–93', t: 'Apertura con el FMI', d: 'Ajuste fiscal, privatización, GATT 1986; la inflación cae. Pero exportar no da las ganancias esperadas como en Corea; “década perdida”.' },
          { y: '1994–2000', t: 'TLCAN y Tequila', d: 'Comercio e IED se disparan, la maquila crece. La crisis de 1995 no fue por el TLCAN; de hecho sin él habría sido peor (Fed de Dallas).' },
          { y: '2000–20', t: 'Más comercio, poco crecimiento', d: '1.2% per cápita (1994–2016), lugar 15 de 20 en la región. Maquila con 3% de insumos locales. Pequeños productores de maíz desplazados; migración a EUA. T-MEC: 75% regional en autos y salario mínimo de $16 por hora.' },
        ])}
        <div class="g2"><div>
          ${E.reveal('¿Fue el libre comercio la estrategia correcta para sacar de la pobreza?', '<p class="prose">Necesaria, no suficiente. Dio exportaciones, IED y empleos, pero sin reformas internas (crédito, Estado de derecho, educación) no se tradujo en PTF. Sin él, probablemente habría sido peor.</p>')}
          ${E.reveal('¿Son Canadá y EUA los socios adecuados?', '<p class="prose">Son complementarios y cercanos, pero concentran el riesgo (≈70–80% de las exportaciones). El profe matiza: América Latina es más sustituto que complemento de México, y lo que faltó fue hacer más con China y subir la productividad, no romper con EUA.</p>')}
          ${E.reveal('¿Cumplirá el T-MEC lo que no cumplió el TLCAN?', '<p class="prose">Sólo si cambia lo de adentro. Las reglas de origen pueden traer más contenido regional, pero un tratado no crea I+D ni Estado de derecho. Y el arreglo es hoy menos seguro: revisiones anuales y aranceles sectoriales.</p>')}
        </div><div>
          ${E.tip('Su cadena de memoria: <q>baja productividad, insatisfacción social, gasto público.</q> Y advierte que es un patrón: lo ve en Francia y en China. El caso clásico: <q>Proteges el sector y lo proteges tanto que lo vuelves ineficiente.</q> Y recuerda que detrás hay intereses concentrados que evitan que se abra la economía.', 'Clase 14-oct')}
          ${E.kid('Sobreproteger a una empresa es como no dejar jugar a un niño contra nadie: nunca pierde, nunca mejora. Las televisiones mexicanas de los 60–70 eran malas; por eso la gente iba a comprar fayuca.')}
        </div></div>` })}

      ${E.concept({ id: 'c-yang', title: 'Yang et al.: China’s 40 Years of Economic Reforms and Growth (Darden)', badge: 'in', html: `
        <p class="prose"><b>La pregunta:</b> ¿cómo pasó China de 1/68 del ingreso per cápita de EUA en 1978 a 1/6 en 2018, con 9.27% de crecimiento anual? ¿Fueron los mercados, la apertura, Deng, el ahorro, la educación?</p>
        ${E.table([
          ['<b>Mao (1949–76)</b>', 'Plan central, Gran Salto, Revolución Cultural', 'Sin incentivos ni tecnología, y hambruna: la A se hunde'],
          ['<b>Fase 1 (1978–92)</b>', 'Responsabilidad de hogares en el campo, TVE, precios duales, ZEE', 'Incentivos: sube A y libera mano de obra hacia la industria'],
          ['<b>Fase 2 (1993–2008)</b>', 'Reforma de estatales (“retener las grandes, soltar las chicas”), OMC 2001, descentralización', 'Reasignación y mercado mundial; K y A suben'],
          ['<b>Fase 3 (2009–18)</b>', 'Estímulo de 4 billones de RMB, “nueva normalidad”, rebalanceo al consumo', 'Menor crecimiento, deuda y sobrecapacidad; rendimientos decrecientes'],
          ['<b>Hoy</b>', 'Guerra comercial, población que cae, trampa de ingreso medio', 'Solow: convergencia más lenta'],
        ], { head: ['Etapa', 'Qué hizo', 'Con herramientas'] })}
        <div class="g2"><div>
          ${E.reveal('¿Gradualismo o <i>big bang</i>?', '<p class="prose">China experimentó por partes (“cruzar el río tentando las piedras”), a diferencia de Rusia o Polonia. Reduce choques y crea apoyo político, a costa de dejar incompletas reformas y de corrupción con los precios duales. El caso no afirma que Rusia habría ganado con gradualismo.</p>')}
          ${E.reveal('¿De dónde vino el crecimiento?', '<p class="prose">De los tres factores: L (300 millones migran a las ciudades, educación), K (ahorro altísimo e IED) y A (incentivos, reasignación, tecnología). Las reformas actúan por canales que se refuerzan, y el caso reconoce que es difícil asignar a cada uno su parte exacta.</p>')}
        </div><div>
          ${E.key('En la identidad: ahorro de 53% del PIB y superávit de más de 9% en 2008, más IED por más de 4% del PIB. <b>Los superávits gemelos terminan en reservas</b> ($3 billones en 2011). El yuan se apreció ≈30% y no bastó: confirma que el superávit no es sólo tipo de cambio, sino ahorro.', 'El puente con Bernanke')}
        </div></div>
        ${E.warn('“China creció sólo por mano de obra barata” es incompleto. Empezó ahí, pero Kehoe y Xu muestran que el producto lo explica sobre todo la productividad. Tampoco la leas como “éxito sin costos”: desigualdad, contaminación, corrupción y riesgos de deuda están en el caso.')}` })}

      <h2 id="qz">✅ Quiz rápido</h2>
      <div id="qq"></div>

      <h2 id="news">📰 Noticias recientes, para contexto</h2>
      <p class="prose">Verificadas al 2 de noviembre de 2026. <b>Ojo con el calendario:</b> las elecciones de EUA son el 3 de noviembre, y el 4 de noviembre, día de tu examen, sale el dato de comercio de septiembre de EUA. Si sale antes de tu examen, léelo con la misma plantilla.</p>
      <div id="nn" class="g2"></div>
      `;

      // ---------------------------------------------------------------- Lab 1
      const L1 = { sp: 17.5, def: 3.5, inv: 19.5, fdi: 0, res: 0 };
      const presets1 = [
        ['EUA 2000 ≈', { sp: 14.8, def: -2, inv: 21, fdi: 1.5, res: 0 }, 'Superávit fiscal y aun así déficit externo: el culpable es privado. Justo el argumento de Bernanke.'],
        ['EUA 2004 ≈', { sp: 17.5, def: 3.5, inv: 19.5, fdi: 0, res: 0 }, 'Ahorro nacional de 14% y CA de −5.5% (cifras de Bernanke); ahora también gasta el gobierno.'],
        ['China 2008 ≈', { sp: 53, def: 0, inv: 44, fdi: 4, res: -13 }, 'Ahorro de 53%, CA de +9% e IED de más de 4% (Yang et al.): los superávits gemelos terminan en reservas.'],
        ['México 1994 ≈', { sp: 12, def: -0.5, inv: 20.4, fdi: 2.5, res: 4 }, 'Ahorro privado de 12% (Pill), superávit fiscal, déficit de casi 8% (clase 26-oct): el gastador es el privado, y lo financia dinero que puede irse.'],
        ['Japón estilizado', { sp: 30, def: 6, inv: 21, fdi: -1, res: 0 }, 'Déficit fiscal con superávit externo: el privado ahorra tanto que le sobra para prestarle al gobierno y al mundo.'],
      ];
      let note1 = presets1[1][2];
      const l1c = E.chart(root.querySelector('#l1c'), (T) => {
        const a = L1, pr = a.sp - a.inv, pu = -a.def, ca = pr + pu, port = -ca - a.fdi - a.res;
        const vals = [
          { value: +pr.toFixed(1), itemStyle: { color: T.c1 } }, { value: +pu.toFixed(1), itemStyle: { color: T.c2 } }, { value: +ca.toFixed(1), itemStyle: { color: T.c3 } },
          { value: +a.fdi.toFixed(1), itemStyle: { color: T.c5 } }, { value: +port.toFixed(1), itemStyle: { color: T.c6 } }, { value: +a.res.toFixed(1), itemStyle: { color: T.c7 } },
        ];
        return { ...E.baseOpt(T), legend: { show: false },
          grid: { left: 8, right: 12, top: 18, bottom: 8, containLabel: true },
          xAxis: E.axisCat(['S − I', 'T − G', '= CA', 'IED', 'Portafolio', 'Reservas'], T),
          yAxis: E.axisVal(T, (v) => v + '%'),
          series: [{ type: 'bar', data: vals, barMaxWidth: 44, label: { show: true, color: T.ink, fontSize: 12, formatter: (p) => F.sgn(p.value, 1), position: 'top' },
            markLine: { silent: true, symbol: 'none', data: [{ yAxis: 0 }], lineStyle: { color: T.axis }, label: { show: false } } }] };
      });
      const draw1 = () => {
        const a = L1, pr = a.sp - a.inv, pu = -a.def, ca = pr + pu, nat = a.sp - a.def, port = -ca - a.fdi - a.res;
        E.tiles(root.querySelector('#l1t'), [
          { label: 'Saldo externo, CA', v: ca, fmt: 'sgn', dec: 1, note: '% PIB = X − M', hl: true },
          { label: 'Ahorro nacional', v: nat, fmt: 'n', dec: 1, note: 'S + (T − G), % PIB' },
          { label: ca < 0 ? 'Te presta el mundo' : 'Le prestas al mundo', v: Math.abs(ca), fmt: 'n', dec: 1, note: '% PIB al año' },
          { label: 'Portafolio y otros', v: port, fmt: 'sgn', dec: 1, note: port > 0 ? 'Dinero que se va en un clic' : 'Sale capital o nada' },
          { label: 'Deuda en 10 años', v: Math.max(0, -ca * 10), fmt: 'n', dec: 0, note: 'Pasivo externo neto añadido, % PIB de hoy (simple)' },
        ]);
        let t;
        const big = Math.abs(ca) < 0.05;
        if (big) t = '<b>Cuenta corriente en cero:</b> lo que se gasta es lo que se produce. Fíjate que no requiere que S = I: un gastador puede estar compensado por otro.';
        else if (ca < 0) {
          const privBad = pr < 0, pubBad = pu < 0;
          const who = privBad && pubBad ? `<b>Déficit gemelo:</b> gastan de más tanto el privado (${F.sgn(pr, 1)}) como el gobierno (${F.sgn(pu, 1)}). Un arancel no toca a ninguno de los dos.`
            : privBad ? `<b>El gastador es el privado</b> (${F.sgn(pr, 1)}); el gobierno ${pu >= 0.05 ? `incluso ahorra (${F.sgn(pu, 1)})` : 'no es el problema'}. Es la misma lógica con la que Bernanke “absuelve” al gobierno de EUA en 1996–2000.`
              : `<b>El gastador es el gobierno</b> (${F.sgn(pu, 1)}): el privado ahorra de sobra (${F.sgn(pr, 1)}), pero no alcanza.`;
          const frag = port > Math.max(0.5, Math.abs(ca) * 0.5) ? ` Lo financias sobre todo con <b>portafolio</b> (${F.n(port, 1)} de ${F.n(-ca, 1)}): la versión frágil de la tarjeta, como México en 1994.` : a.res > 0.5 ? ` Estás quemando reservas (${F.n(a.res, 1)}): compras tiempo, no solución.` : ' Financiamiento relativamente estable, pero cada año debes más.';
          t = `${who}${frag} Para corregirlo tiene que subir S, bajar I o bajar G − T.`;
        } else {
          t = `<b>Superávit de ${F.n(ca, 1)}% del PIB:</b> produces más de lo que gastas y le prestas la diferencia al mundo.${pu < -0.05 ? ` Incluso con déficit público de ${F.n(-pu, 1)}%, porque el privado ahorra ${F.n(pr, 1)} puntos más de lo que invierte. Es el caso China/Japón del profe.` : ''}${a.res < -0.5 ? ` Las reservas crecen ${F.n(-a.res, 1)}: ese dinero termina en bonos de EUA y es el <i>saving glut</i>.` : ''}`;
        }
        root.querySelector('#l1r').innerHTML = E.key(`${t}${note1 ? `<br><span class="small muted">${note1}</span>` : ''}`, '📖 Cómo se lee');
        l1c.refresh();
      };
      const k1 = E.knobs(root.querySelector('#l1k'), [
        { k: 'sp', label: '🏠 Ahorro privado, S (% PIB)', min: 0, max: 60, step: 0.1, v: L1.sp, fmt: 'n', dec: 1, hint: 'Hogares y empresas. Baja con el efecto riqueza; sube sin red social.' },
        { k: 'def', label: '🏛️ Déficit público, G − T (% PIB)', min: -6, max: 12, step: 0.1, v: L1.def, fmt: 'n', dec: 1, hint: 'Negativo = superávit fiscal.' },
        { k: 'inv', label: '🏗️ Inversión, I (% PIB)', min: 0, max: 50, step: 0.1, v: L1.inv, fmt: 'n', dec: 1, hint: 'El componente más volátil del PIB.' },
        { k: 'fdi', label: '🏭 IED neta que entra (% PIB)', min: -5, max: 6, step: 0.1, v: L1.fdi, fmt: 'n', dec: 1, hint: 'Financiamiento estable.' },
        { k: 'res', label: '💵 Reservas que usas (% PIB)', min: -15, max: 8, step: 0.1, v: L1.res, fmt: 'n', dec: 1, hint: '+ = vendes reservas; − = acumulas. Portafolio es el residuo.' },
      ], (st) => { Object.assign(L1, st); draw1(); }, { title: '🎛️ Radiografía' });
      const pbox = root.querySelector('#l1p');
      presets1.forEach(([n, v, d]) => { const b = E.el(`<button type="button" class="btn sm">${n}</button>`); b.addEventListener('click', () => { note1 = d; k1.set(v); }); pbox.appendChild(b); });

      // ---------------------------------------------------------------- Lab 2
      const L2 = { tau: 0.15, phi: 0, cut: 0, dI: 0 };
      const l2c = E.chart(root.querySelector('#l2c'), (T) => {
        const r = tariffModel(L2.tau, L2.phi, L2.cut, L2.dI);
        return { ...E.baseOpt(T), grid: { left: 8, right: 12, top: 30, bottom: 8, containLabel: true },
          xAxis: E.axisCat(['Exportaciones', 'Importaciones', 'Saldo X − M'], T), yAxis: E.axisVal(T),
          series: [
            { name: 'Sin arancel', type: 'bar', barMaxWidth: 34, itemStyle: { color: T.c8 }, data: [X0, M0, NX0], label: { show: true, position: 'top', fontSize: 11, color: T.ink2, formatter: (p) => F.n(p.value, 1) } },
            { name: 'Con arancel', type: 'bar', barMaxWidth: 34, itemStyle: { color: T.c1 }, data: [+r.X.toFixed(2), +r.M.toFixed(2), +r.nx.toFixed(2)], label: { show: true, position: 'top', fontSize: 11, color: T.ink, formatter: (p) => F.n(p.value, 1) } },
          ] };
      });
      const l2d = E.chart(root.querySelector('#l2d'), (T) => {
        const taus = []; for (let i = 0; i <= 50; i += 5) taus.push(i);
        const rs = taus.map((t) => tariffModel(t / 100, L2.phi, L2.cut, L2.dI));
        return { ...E.baseOpt(T), grid: { left: 8, right: 8, top: 52, bottom: 22, containLabel: true },
          xAxis: { ...E.axisCat(taus.map((t) => t + '%'), T), name: 'arancel', nameLocation: 'middle', nameGap: 24, nameTextStyle: { color: T.muted } },
          yAxis: [E.axisVal(T, (v) => F.n(v, 0), { name: 'saldo', nameTextStyle: { color: T.muted } }), E.axisVal(T, (v) => F.n(v, 0), { name: 'X + M', min: 15, max: 30, splitLine: { show: false }, nameTextStyle: { color: T.muted } })],
          tooltip: { trigger: 'axis', backgroundColor: T.card, borderColor: T.line, textStyle: { color: T.ink, fontSize: 13 }, valueFormatter: (v) => F.n(v, 2) },
          series: [
            { name: 'Saldo real', type: 'line', symbolSize: 5, lineStyle: { width: 3, color: T.c1 }, itemStyle: { color: T.c1 }, data: rs.map((r) => +r.nx.toFixed(2)) },
            { name: 'Saldo “ingenuo” (dólar fijo)', type: 'line', symbolSize: 4, lineStyle: { type: 'dashed', color: T.c4 }, itemStyle: { color: T.c4 }, data: rs.map((r) => +r.naive.toFixed(2)) },
            { name: 'Volumen de comercio', type: 'line', yAxisIndex: 1, symbolSize: 4, lineStyle: { color: T.c3 }, itemStyle: { color: T.c3 }, data: rs.map((r) => +r.vol.toFixed(2)) },
          ] };
      });
      const draw2 = () => {
        const r = tariffModel(L2.tau, L2.phi, L2.cut, L2.dI), base = tariffModel(0, 0, 0, 0);
        E.tiles(root.querySelector('#l2t'), [
          { label: 'Saldo X − M', v: r.nx, fmt: 'sgn', dec: 2, note: '% PIB. Base: −3', hl: true },
          { label: 'Cálculo ingenuo', v: r.naive, fmt: 'sgn', dec: 2, note: 'Saldo con dólar fijo' },
          { label: 'Dólar', v: r.A - 1, fmt: 'pct', dec: 1, note: 'Apreciación real (+)' },
          { label: 'Precio de lo importado', v: r.pm, fmt: 'pct', dec: 1, note: 'Ya con la apreciación' },
          { label: 'Nivel de precios', v: r.cpi, fmt: 'n', dec: 2, note: 'Puntos, una sola vez (16% × precio)' },
          { label: 'Volumen X + M', v: r.vol, fmt: 'n', dec: 1, base: base.vol, better: 'up', note: '% PIB' },
          { label: 'Recaudación', v: r.rev, fmt: 'n', dec: 2, note: '% PIB' },
        ]);
        const d = r.nx - NX0; let t;
        if (L2.tau === 0 && Math.abs(d) < 0.005) t = '<b>Sin arancel y sin cambios en S − I:</b> estás en el punto de partida. Sube el arancel.';
        else if (Math.abs(d) < 0.02) t = `<b>Arancel de ${F.pct(L2.tau, 0)} y el saldo sigue en ${F.sgn(r.nx, 2)}.</b> Importas ${F.n(M0 - r.M, 1)} puntos menos, pero exportas ${F.n(X0 - r.X, 1)} menos: el dólar se aprecia ${F.pct(r.A - 1, 1)} y compensa. Lo único que queda: precios ${F.n(r.cpi, 2)} puntos más altos y ${F.n(BASEVOL - r.vol, 1)} puntos menos de comercio. El razonamiento ingenuo esperaría ${F.sgn(r.naive, 2)}: esa diferencia es lo que Bernanke te permite ver.`;
        else {
          const src = [];
          if (L2.phi > 0 && L2.tau > 0) src.push(`la recaudación que se vuelve ahorro aporta ${F.sgn(L2.phi * r.rev, 2)}`);
          if (L2.cut > 0) src.push(`el recorte de impuestos resta ${F.n(L2.cut, 1)}`);
          if (L2.dI > 0) src.push(`la caída de inversión aporta ${F.sgn(L2.dI, 1)}`);
          t = `<b>El saldo pasa de −3 a ${F.sgn(r.nx, 2)} porque cambió S − I + (T − G), no por la aduana:</b> ${src.join('; ')}.`;
          if (L2.cut > 0 && L2.tau > 0 && d < 0) t += ' Es la contradicción de la clase del 14-oct: aranceles para cerrar el déficit y recorte de impuestos que lo abre. Gana el recorte.';
          if (L2.dI > 0) t += ' Ojo: bajar el déficit por recesión también “funciona”, pero con costo: la economía se desacelera. Eso dijo el profe el 26-oct.';
          if (L2.phi > 0 && d > 0) t += ' Un arancel puede bajar el déficit, pero como <b>impuesto</b> que aumenta el ahorro público. Sería política fiscal.';
          if (L2.cut > 0 && L2.tau === 0) t += ' Es el traspaso máximo (1 a 1); Bernanke cita modelos donde es mucho menor.';
        }
        root.querySelector('#l2r').innerHTML = E.key(t, '📖 Cómo se lee');
        l2c.refresh(); l2d.refresh();
      };
      E.knobs(root.querySelector('#l2k'), [
        { k: 'tau', label: '🚧 Arancel efectivo', min: 0, max: 0.5, step: 0.01, v: L2.tau, fmt: 'pct', dec: 0, hint: 'El profe: la tasa efectiva es mucho menor que la anunciada.' },
        { k: 'phi', label: '💰 Recaudación que se vuelve ahorro', min: 0, max: 1, step: 0.05, v: L2.phi, fmt: 'pct', dec: 0, hint: '0% = se gasta o se devuelve. 100% = baja el déficit público.' },
        { k: 'cut', label: '✂️ Recorte de impuestos (% PIB)', min: 0, max: 4, step: 0.1, v: L2.cut, fmt: 'n', dec: 1, hint: 'Lo que hizo Trump a la vez. Traspaso 1 a 1 (techo).' },
        { k: 'dI', label: '📉 Caída de inversión (% PIB)', min: 0, max: 4, step: 0.1, v: L2.dI, fmt: 'n', dec: 1, hint: 'Por incertidumbre o recesión.' },
      ], (st) => { Object.assign(L2, st); draw2(); }, { title: '🎛️ Política' });

      // ---------------------------------------------------------------- Lab 3
      const presets3 = [
        { n: 'EUA hoy ≈', g: 0.5, c: -3, d: 'CA de −3% del PIB (BEA, 2T-2026). Gastan gobierno y privado.' },
        { n: 'México 1994', g: 1.5, c: -7.9, d: 'El dilema del caso (clase 26-oct): fiscal sin espacio porque ya hay superávit; devaluar sube la inflación que tanto costó bajar; subir la tasa frena el crecimiento y aumenta la cartera vencida, y los bancos truenan.' },
        { n: 'China hoy ≈', g: -1, c: 4, d: 'Demanda interna floja y superávit enorme. Lo de fondo: bajar el ahorro precautorio con mejor salud y seguridad social.' },
        { n: 'China 2008', g: 2, c: 9, d: 'Superávit de más de 9% (Yang et al.) con economía caliente. El yuan se apreció ≈30%, y aun así no bastó.' },
        { n: 'Japón estilizado', g: -0.5, c: 3, d: 'Ahorro alto, inversión floja; ahorra para el retiro.' },
      ];
      let start = presets3[0];
      const L3 = { f: 0, r: 0, d: 0, t: 0 };
      const pos3 = () => ({ x: start.g + 0.8 * L3.f - 0.5 * L3.r + 0.06 * L3.d - 0.02 * L3.t, y: start.c - 0.4 * L3.f + 0.3 * L3.r + 0.12 * L3.d });
      const zone = (x, y) => {
        if (Math.abs(x) < 0.5 && Math.abs(y) < 1) return { k: 'E', n: 'En equilibrio', p: 'No necesitas mover nada de fondo.' };
        if (x >= 0 && y < 0) return { k: 'A', n: 'Sobrecalentada con déficit', p: 'Recorta el gasto: más T − G o sube la tasa. Una sola política resuelve las dos cosas.' };
        if (x < 0 && y < 0) return { k: 'B', n: 'Recesión con déficit', p: 'Dilema: recortar gasto ayuda afuera y hunde adentro. Combina depreciación (cambia el gasto hacia lo local) con algo de ajuste.' };
        if (x < 0 && y >= 0) return { k: 'C', n: 'Recesión con superávit', p: 'Expande demanda interna: fiscal, consumo y red social. Sube producción y baja superávit a la vez.' };
        return { k: 'D', n: 'Sobrecalentada con superávit', p: 'Aprecia la moneda: enfría y reduce el superávit a la vez.' };
      };
      const l3c = E.chart(root.querySelector('#l3c'), (T) => {
        const p = pos3(), area = (x1, y1, x2, y2, c, name) => [{ xAxis: x1, yAxis: y1, itemStyle: { color: c, opacity: 0.1 }, name, label: { color: T.ink2, fontSize: 12, position: 'inside' } }, { xAxis: x2, yAxis: y2 }];
        return { ...E.baseOpt(T), legend: { show: false }, tooltip: { show: false },
          grid: { left: 8, right: 16, top: 12, bottom: 30, containLabel: true },
          xAxis: { type: 'value', min: -6, max: 6, name: 'Brecha del producto (% potencial)', nameLocation: 'middle', nameGap: 26, nameTextStyle: { color: T.muted }, axisLine: { lineStyle: { color: T.axis } }, axisLabel: { color: T.muted }, splitLine: { lineStyle: { color: T.grid } } },
          yAxis: { type: 'value', min: -12, max: 12, name: 'CA (% PIB)', nameTextStyle: { color: T.muted }, axisLine: { lineStyle: { color: T.axis } }, axisLabel: { color: T.muted }, splitLine: { lineStyle: { color: T.grid } } },
          series: [{
            type: 'line', data: [{ value: [start.g, start.c], symbol: 'emptyCircle' }, { value: [+p.x.toFixed(2), +p.y.toFixed(2)], symbol: 'circle' }], symbolSize: 14, lineStyle: { width: 2, color: T.ink }, itemStyle: { color: T.ink }, z: 5,
            markArea: { silent: true, data: [
              area(-6, 0, 0, 12, T.c5, 'Recesión + superávit'), area(0, 0, 6, 12, T.c4, 'Caliente + superávit'),
              area(-6, -12, 0, 0, T.c2, 'Recesión + déficit'), area(0, -12, 6, 0, T.c1, 'Caliente + déficit'),
            ] },
          }] };
      });
      const draw3 = () => {
        const p = pos3(), z = zone(p.x, p.y), z0 = zone(start.g, start.c);
        const infl = 0.4 * (p.x - start.g) + 0.1 * L3.d + 0.06 * L3.t;
        E.tiles(root.querySelector('#l3t'), [
          { label: 'Cuadrante', v: 0, fmt: 'n', dec: 0, note: '' },
          { label: 'Brecha del producto', v: p.x, fmt: 'sgn', dec: 1, base: start.g, note: '% del potencial', hl: true },
          { label: 'CA', v: p.y, fmt: 'sgn', dec: 1, base: start.c, note: '% PIB', hl: true },
          { label: 'Presión inflacionaria', v: infl, fmt: 'sgn', dec: 1, note: 'Puntos añadidos' },
        ]);
        const first = root.querySelector('#l3t .tile');
        if (first) first.innerHTML = `<div class="tl">Cuadrante</div><div class="tv" style="font-size:17px;line-height:1.25">${z.n}</div>`;
        const moved = [];
        if (L3.t > 0) moved.push(`el arancel de ${F.n(L3.t, 0)}% <b>no mueve la CA</b> (por el Lab 2): sólo sube precios y resta un poco de actividad`);
        if (L3.f !== 0) moved.push(L3.f > 0 ? 'la expansión fiscal calienta y empeora la CA' : 'el ajuste fiscal enfría y mejora la CA');
        if (L3.r !== 0) moved.push(L3.r > 0 ? 'subir la tasa baja inversión: enfría y mejora la CA' : 'bajar la tasa estimula inversión: calienta y empeora la CA');
        if (L3.d !== 0) moved.push(L3.d > 0 ? 'depreciar mejora la CA y también activa la economía, con inflación' : 'apreciar enfría y reduce el superávit');
        const toRight = z0.k !== z.k ? `Pasaste de <b>${z0.n}</b> a <b>${z.n}</b>. ` : '';
        root.querySelector('#l3r').innerHTML = E.key(`${toRight}<b>Qué te toca:</b> ${z.p}${moved.length ? `<br><b>Lo que hiciste:</b> ${moved.join('; ')}.` : ''}<br><span class="small muted">${start.d}</span>`, `📖 ${start.n}`);
        l3c.refresh();
      };
      const k3 = E.knobs(root.querySelector('#l3k'), [
        { k: 'f', label: '🏛️ Impulso fiscal (% PIB)', min: -6, max: 6, step: 0.5, v: 0, fmt: 'sgn', dec: 1, hint: '+ gasta más; − ajusta. Efecto: brecha +0.8, CA −0.4 por punto.' },
        { k: 'r', label: '🏦 Cambio en tasa real (pp)', min: -3, max: 8, step: 0.5, v: 0, fmt: 'sgn', dec: 1, hint: 'Efecto: brecha −0.5, CA +0.3 por punto.' },
        { k: 'd', label: '💱 Depreciación real (%)', min: -30, max: 40, step: 1, v: 0, fmt: 'sgn', dec: 0, hint: '+ depreciación. Efecto por 10%: brecha +0.6, CA +1.2.' },
        { k: 't', label: '🚧 Arancel (%)', min: 0, max: 40, step: 1, v: 0, fmt: 'n', dec: 0, hint: 'Efecto en CA: cero. Brecha −0.2 por 10%.' },
      ], (st) => { Object.assign(L3, st); draw3(); }, { title: '🎛️ Instrumentos' });
      const pb3 = root.querySelector('#l3p');
      presets3.forEach((p) => { const b = E.el(`<button type="button" class="btn sm">${p.n}</button>`); b.addEventListener('click', () => { start = p; k3.set({ f: 0, r: 0, d: 0, t: 0 }); }); pb3.appendChild(b); });

      // ---------------------------------------------------------------- Quiz
      E.quiz(root.querySelector('#qq'), [
        { q: 'Un país tiene S = 20, I = 25 y T − G = −3 (% PIB). ¿Cuánto vale su CA?', o: ['+2', '−2', '−8', '+8'], a: 2, w: 'CA = (S − I) + (T − G) = −5 − 3 = −8. Tanto privado como gobierno gastan de más: déficit gemelo.' },
        { q: 'Trump sube aranceles y baja impuestos a la vez. Según la identidad, ¿qué se espera del déficit comercial?', o: ['Baja, porque se importa menos', 'Tiende a subir, porque cae el ahorro nacional', 'No cambia, porque se compensan', 'Baja si el dólar se aprecia'], a: 1, w: 'El recorte reduce T − G y aumenta el gasto; el arancel no toca S − I. Es la contradicción de la clase del 14-oct.' },
        { q: '¿Qué distingue la historia de México de la de China según el profe?', o: ['México nunca intentó política industrial', 'México no firmó tratados y China sí', 'México estuvo más cerrado', 'México hizo política industrial antes y no dio el siguiente paso'], a: 3, w: 'La sustitución de importaciones fue la versión temprana; la sobreprotección la volvió ineficiente.' },
        { q: 'México 1994: déficit externo de casi 8% con superávit fiscal. ¿Quién es el gastador?', o: ['El sector privado', 'El gobierno', 'El Banco de México', 'Nadie: es por el tipo de cambio'], a: 0, w: 'Si T − G > 0 y CA < 0, entonces S − I tiene que ser muy negativo. Igual que EUA en 1996–2000.' },
        { q: 'Un país está en recesión y con déficit externo. ¿Por qué es el cuadrante difícil?', o: ['Porque no tiene instrumentos', 'Porque un arancel lo empeora todo', 'Porque recortar gasto ayuda afuera pero hunde más adentro', 'Porque debe apreciar su moneda'], a: 2, w: 'Por eso necesita cambiar la composición del gasto (depreciar) además de su nivel.' },
      ]);

      // ---------------------------------------------------------------- Noticias
      const nn = root.querySelector('#nn');
      nn.innerHTML = E.news.filter((n) => n.topic === TOPIC).map((n) => `<article class="card2"><div class="small muted">${n.date} · ${E.esc(n.source)}</div><h4 style="margin:4px 0 6px"><a href="${E.esc(n.url)}" target="_blank" rel="noopener noreferrer">${E.esc(n.title)}</a></h4><p class="small"><b>${E.esc(n.tool)}:</b> ${E.esc(n.read)}</p></article>`).join('');
    },
  });

  // ---------------------------------------------------------------- Banco de opción múltiple
  E.bank.push(
    { topic: TOPIC, q: 'En la identidad (S − I) = (G − T) + (X − M), ¿qué significa que X − M sea negativo?', o: ['Que el gobierno tiene necesariamente un déficit fiscal que financiar con deuda', 'Que el país gasta más de lo que produce y alguien adentro es el gastador', 'Que el país tiene baja productividad', 'Que sus socios comerciales aplican prácticas desleales contra sus exportadores'], a: 1, w: 'Déficit externo es exceso de gasto. Puede ser del privado, del gobierno o de ambos; no implica baja productividad (EUA) ni déficit fiscal (EUA 1996–2000).' },
    { topic: TOPIC, q: '¿Por qué Bernanke descarta el déficit fiscal como explicación principal del aumento del déficit externo de EUA a fines de los 90?', o: ['Porque el déficit fiscal era pequeño si se compara con el tamaño de la deuda pública', 'Porque la Fed financiaba al gobierno', 'Porque la identidad macroeconómica no incluye al gobierno como un sector separado', 'Porque el déficit externo creció mientras el gobierno tenía superávit fiscal'], a: 3, w: 'Entre 1996 y 2000 el déficit externo creció ≈$300 mil millones con superávit fiscal. Además, Alemania y Japón tienen déficit fiscal y superávit externo.' },
    { topic: TOPIC, q: '¿Cuál es la tesis central del “saving glut”?', o: ['Un exceso de ahorro en el mundo, en especial en emergentes, financia a EUA', 'Los hogares de EUA ahorran demasiado y con eso frenan la demanda de todo el mundo', 'Los bancos centrales emiten demasiado dinero y eso provoca inflación en los activos', 'China manipula su moneda y eso basta para explicarlo'], a: 0, w: 'El exceso de ahorro fluye a EUA, baja tasas, infla activos y reduce el ahorro doméstico. La causa de fondo está en buena medida fuera de EUA.' },
    { topic: TOPIC, q: 'Un gobierno impone un arancel de 20% sin cambiar ahorro, inversión ni balance fiscal. ¿Qué es lo más probable en un régimen flexible?', o: ['El déficit comercial baja casi en la misma proporción que el arancel impuesto', 'El déficit sube de manera permanente porque los importadores adelantan sus compras', 'Precios más altos, moneda más fuerte, menos comercio y un déficit parecido', 'La inflación baja porque se compra menos'], a: 2, w: 'Es el resultado del Lab 2. El ajuste cae en exportaciones vía tipo de cambio: se reduce el volumen, no el saldo.' },
    { topic: TOPIC, q: 'EUA pone aranceles a China y su déficit bilateral con China baja, pero el total no. ¿Qué lo explica mejor?', o: ['Un error de medición en las aduanas', 'El comercio se desvía a terceros países y S − I no cambió', 'China aumentó sus compras de bienes de EUA para compensar el efecto del arancel', 'Los consumidores dejaron de importar y lo sustituyeron por producción nacional'], a: 1, w: 'El saldo bilateral no es el relevante. Las láminas mencionan el traslado a Vietnam e India: cambia de dónde importas, no cuánto gastas de más.' },
    { topic: TOPIC, q: '¿Qué interpretación da el profe de por qué China mantiene superávit aun con déficit público?', o: ['Porque el gobierno presta directamente a sus exportadores a tasas subsidiadas', 'Porque sus importaciones están prohibidas', 'Porque el yuan fijo por sí solo garantiza cualquier nivel de superávit comercial', 'Porque el ahorro privado es enorme, en parte por una red social débil'], a: 3, w: 'Salud y seguridad social insuficientes llevan a ahorrar por precaución. Si S − I es muy positivo, alcanza para financiar al gobierno y aún exportar.' },
    { topic: TOPIC, q: 'Según Kehoe y Xu, ¿cuál es la clave de que la apertura coincidiera con crecimiento en China y no en México?', o: ['China abrió durante su industrialización y México, cuando ya la había hecho', 'China se abrió mucho más que México en comercio e inversión extranjera directa', 'México recibió menos IED que China como % del PIB durante todo el periodo', 'México nunca se industrializó antes del TLCAN'], a: 0, w: 'Es el acertijo 1. Abrir a media transformación estructural te da el viento de pasar gente del campo a la fábrica. México llevaba ≈40 años.' },
    { topic: TOPIC, q: 'China exporta hoy menos como % del PIB que en 2006, y México más. ¿Qué concluyes de esto?', o: ['Que México es ya más productivo que China en casi todos los sectores comparables', 'Que la razón de exportaciones a PIB no basta para explicar el crecimiento', 'Que China se está cerrando y va a colapsar', 'Que el TLCAN fue un fracaso y México debió buscar otros socios comerciales'], a: 1, w: 'Es el acertijo 2. Apertura y crecimiento no van uno a uno; además, la razón puede bajar porque crecen otros componentes del PIB, como señaló un alumno y aceptó el profe.' },
    { topic: TOPIC, q: '¿Por qué la sustitución de importaciones terminó frenando a México, según el profe?', o: ['Porque no generó crecimiento en ningún momento desde su inicio en los años cuarenta', 'Porque prohibía exportar petróleo y dejó al gobierno sin divisas ni ingresos fiscales', 'Porque protegió tanto, sin competencia externa, que volvió ineficientes a las empresas', 'Porque el TLCAN la canceló antes de tiempo'], a: 2, w: 'Funcionó un tiempo (“milagro mexicano”), pero no se dio el siguiente paso. Luego: baja productividad → malestar → gasto público → crisis.' },
    { topic: TOPIC, q: 'Maquiladoras con ≈3% de insumos locales: ¿qué problema refleja con las herramientas del curso?', o: ['Un exceso de ahorro nacional que no encuentra proyectos de inversión en el país', 'Un tipo de cambio apreciado que encarece la mano de obra frente a la de Asia', 'Una falta de inversión extranjera', 'La IED da empleo, pero con pocas derramas: casi no mueve la PTF'], a: 3, w: 'Ensamble con insumos importados: entra K y empleo, pero poca transferencia. Por eso la A de Solow no sube y no se sube en la cadena de valor.' },
    { topic: TOPIC, q: '¿Qué aporta la identidad S − I = CA que no aporta Solow?', o: ['Quién compra la producción, quién gasta de más y quién lo financia', 'Cuánto crecerá el país en el largo plazo una vez alcanzado su estado estacionario', 'El valor exacto de la productividad total de los factores de cada economía', 'La tasa de depreciación del capital'], a: 0, w: 'Solow dice cuánto produces; la identidad radiografía la composición. El profe los pide juntos para analizar un país.' },
    { topic: TOPIC, q: 'Un país tiene déficit externo financiado casi todo con inversión de cartera. ¿Por qué preocupa más que si fuera IED?', o: ['Porque la cartera no se registra en la balanza de pagos', 'Porque puede salir de golpe y forzar a usar reservas o a devaluar', 'Porque la IED aumenta el déficit de manera automática y la cartera lo reduce', 'Porque la inversión de cartera obliga a elevar los aranceles a las importaciones'], a: 1, w: 'Es la tarjeta frágil de México 1994: Cetes y Tesobonos salen rápido; las fábricas, no. Eso fuerza a usar reservas o a devaluar.' },
    { topic: TOPIC, q: 'Una economía sobrecalentada con gran déficit externo debe, según el cuadrante:', o: ['Bajar tasas y devaluar para que el sector exportador tome el relevo del crecimiento', 'Imponer aranceles generales a las importaciones', 'Aumentar el gasto público para que las empresas puedan exportar mucho más', 'Reducir el gasto con ajuste fiscal o con tasas de interés más altas'], a: 3, w: 'Aquí una sola política arregla los dos problemas: baja gasto, enfría y mejora el saldo. El arancel no toca el exceso de gasto.' },
    { topic: TOPIC, q: '¿Qué política de apertura distinguió a China de la sustitución de importaciones mexicana?', o: ['Prohibió toda inversión extranjera hasta su entrada a la OMC en el año 2001', 'Eliminó todos sus aranceles desde 1978 para exponer de golpe a sus empresas', 'Atrajo IED a zonas especiales, pero exigiéndole orientarse a exportar', 'Fijó los salarios por ley en niveles bajos'], a: 2, w: 'Las ZEE y la guía de 1990 (exportar más de 50%) sometían a las empresas a la competencia externa, mientras limitaba importaciones hasta la OMC.' },
    { topic: TOPIC, q: '¿Cuál de estas afirmaciones sobre la Fed y el déficit comercial es correcta según la clase?', o: ['La Fed no fija su tasa para corregir la balanza; atiende inflación y crecimiento', 'La Fed tiene el mandato legal de mantener la balanza comercial cerca de cero', 'La Fed sube su tasa de referencia cada vez que aumenta el déficit comercial', 'La Fed fija aranceles junto con el Tesoro'], a: 0, w: 'Lo dijo el 26-oct: sus objetivos son inflación y crecimiento, aunque la tasa sí afecte a S − I. Hay conflicto entre objetivos y nadie dijo que fuera fácil.' },
    { topic: TOPIC, q: '¿Por qué bajó el ahorro de EUA después de 2000, según Bernanke?', o: ['Por un aumento de los impuestos a las plusvalías que desalentó el ahorro de los hogares', 'Porque las tasas bajas inflaron la vivienda y los hogares gastaron contra ella', 'Por un aumento sostenido de los salarios reales que disparó el consumo de los hogares', 'Porque los hogares desconfiaron de los bancos'], a: 1, w: 'Del efecto riqueza bursátil (1996–2000) se pasó al inmobiliario, vía hipotecas baratas y líneas sobre el valor de la casa. Antesala de la crisis subprime.' },
    { topic: TOPIC, q: 'Un alumno dice: “el TLCAN causó la crisis de 1995”. ¿Cuál es la mejor respuesta según el caso de Tabellini?', o: ['Es correcto: la apertura comercial hizo que el peso cayera en diciembre de 1994', 'Es correcto: las maquiladoras sacaron divisas del país y agotaron las reservas', 'Es incorrecto: fue la crisis del Tequila, y el TLCAN incluso amortiguó la salida', 'Es incorrecto: en 1995 México no tuvo recesión'], a: 2, w: 'La mayoría de economistas lo atribuye al colapso del peso y la salida de capitales; el TLCAN incluso amortiguó la salida (Fed de Dallas).' },
    { topic: TOPIC, q: 'Según Bernanke, ¿cuál sería la solución más directa al desequilibrio global?', o: ['Que EUA imponga aranceles a las exportaciones de Asia hasta equilibrar el comercio', 'Que EUA reduzca su crecimiento potencial', 'Que el dólar deje de ser la moneda de reserva en un plazo corto y coordinado', 'Que los emergentes vuelvan a recibir capital, con mejores instituciones'], a: 3, w: 'Invertir la dirección: lo natural es que el capital vaya a donde rinde más. Requiere derechos de propiedad, regulación financiera y paciencia.' },
  );

  // ---------------------------------------------------------------- Ensayos
  E.essays.push(
    {
      topic: TOPIC, type: 'caso',
      prompt: 'México y China abrieron su economía y sus exportaciones crecieron. ¿Por qué China despegó y México no? Responde usando Solow y los casos.',
      tools: ['Solow y contabilidad del crecimiento (PTF)', 'Transformación estructural', 'Cadena de valor', 'Kehoe y Xu', 'Sustitución de importaciones (Tabellini)', 'Yang et al.'],
      outline: ['Hecho: ambas abiertas, ambas exportan; difiere la productividad (A en Solow)', 'México: ISI temprana → sobreprotección → baja productividad → gasto → crisis; abre tarde', 'China: abre a media industrialización; IED con exigencia de exportar; sube la escalera', 'Barreras: finanzas, Estado de derecho, rigidez laboral', 'Lección: la apertura es necesaria pero no suficiente; matices'],
      model: 'La apertura no explica la diferencia: las dos economías se abrieron, sus exportaciones despegaron cuando se les expandió el mercado (TLCAN en 1994, OMC en 2001), y México incluso exporta más que China como porcentaje del PIB. Lo que cambia está en la A del modelo de Solow. La contabilidad del crecimiento de Kehoe y Xu muestra que, una vez descontados capital y trabajo, la productividad de México se estanca desde la crisis de 2008, mientras la de China sigue subiendo. Por eso en China aumentaron los salarios y en México no.\n\nEl primer motivo es el momento. México hizo su industrialización antes, con la sustitución de importaciones de los años cincuenta y sesenta. Funcionó, fue el milagro mexicano, pero no se dio el siguiente paso: al proteger tanto a las empresas sin exponerlas a la competencia externa, se volvieron ineficientes. La baja productividad alimentó el malestar social de 1968, el gobierno respondió con gasto y deuda, y llegaron las crisis de 1976 y 1982. Cuando México se abrió, unos cuarenta años después de empezar a industrializarse, ya no tenía el viento a favor de pasar trabajadores del campo a la fábrica. China, en cambio, se abrió a sólo catorce años de sus reformas, con cerca de 60% del empleo aún en la agricultura en 1992.\n\nEl segundo motivo es lo que cada uno hizo con la apertura. China exigió a la IED exportar, y usó zonas especiales, I+D e infraestructura para subir de textiles y juguetes a electrónica. México atrajo ensamble: las maquiladoras usaban 3% de insumos locales, así que hubo empleo con pocas derramas, y exporta casi lo mismo desde hace treinta años, sobre todo a Estados Unidos. A esto se suman tres barreras a la riqueza: sistema financiero ineficiente, falta de Estado de derecho y mercado laboral rígido.\n\nDos matices. Kehoe y Xu reconocen que la cadena de valor es una conjetura, y sus cifras de China dependen de la fuente. Además, el TLCAN no fue el error: el problema fue no acompañarlo con productividad. La lección es que abrirse es necesario, pero no suficiente; importan el momento y las instituciones. China también puede toparse con estas barreras, ahora que envejece y crece menos.',
    },
    {
      topic: TOPIC, type: 'caso',
      prompt: '¿Qué explica el déficit de cuenta corriente de Estados Unidos según Bernanke (2005)? ¿Puede un arancel corregirlo?',
      tools: ['Identidad S − I = CA', 'Visión comercial vs financiera', 'Saving glut', 'Efecto riqueza', 'Efectos de aranceles'],
      outline: ['Dos visiones de un mismo número: X − M y S − I', 'Absuelve al gobierno: superávit en 1996–2000', 'El privado: efecto riqueza (acciones, vivienda), inversión atractiva', 'Causa de fondo: exceso de ahorro mundial (envejecimiento, crisis de los 90, petróleo)', 'Arancel: mueve precios, moneda y volumen, no el saldo'],
      model: 'Bernanke parte de que la cuenta corriente puede verse de dos maneras equivalentes: como exportaciones menos importaciones o como ahorro menos inversión. Elige la segunda porque la visión comercial no explica ni el tamaño ni el aumento del déficit, que pasó de 120 mil millones de dólares en 1996 a unos 635 mil millones anualizados en 2004. La balanza comercial, dice, es la cola del perro.\n\nCon la identidad (S − I) = (G − T) + (X − M), si hay déficit es porque alguien gasta de más, y sólo hay dos sospechosos. El gobierno queda absuelto como explicación del aumento: entre 1996 y 2000 el déficit externo creció unos 300 mil millones con superávit fiscal, y Alemania y Japón tienen déficit fiscal con superávit externo. Queda el sector privado. Su ahorro cayó: entre 1996 y 2000, la bolsa subió con la revolución tecnológica y, sintiéndose más ricos, los hogares ahorraron menos; después de 2000, las tasas bajas encarecieron la vivienda y la gente gastó contra el valor de su casa. Mientras tanto, por su productividad, EUA era el mejor lugar para invertir.\n\nLo original es de dónde viene todo esto. Bernanke sostiene que hay un exceso global de ahorro: países ricos que envejecen y ahorran para el retiro; emergentes que, tras sus crisis de los noventa, dejaron de endeudarse y acumularon reservas como seguro; y exportadores de petróleo. Ese ahorro busca dólares, la moneda de reserva, baja las tasas e infla los activos en EUA. Por eso, paradójicamente, el capital fluye de países pobres a uno rico.\n\n¿Puede un arancel corregirlo? No, por sí solo. Un arancel encarece las importaciones y reduce su volumen, pero si ahorro, inversión y balance fiscal no cambian, la identidad obliga a que X − M tampoco cambie: la moneda se aprecia, las exportaciones caen y queda menos comercio con precios más altos. Por eso el profesor señala la contradicción de subir aranceles y bajar impuestos: el recorte aumenta el gasto, y ese gasto se va a importaciones. Corregir el déficit exige más ahorro, menos inversión o menos déficit público, lo cual tiene un costo en crecimiento. Bernanke propone, más bien, que los emergentes vuelvan a recibir capital, fortaleciendo sus instituciones.',
    },
    {
      topic: TOPIC, type: 'caso',
      prompt: 'Según “Mexico, Trade, and Development”, ¿por qué el TLCAN no cumplió lo prometido? ¿Qué le recomendarías a México en el T-MEC?',
      tools: ['Sustitución de importaciones', 'Solow/PTF', 'IED y derramas', 'Identidad S − I', 'Barreras a la riqueza'],
      outline: ['Antecedente: ISI, milagro, gasto y petróleo, crisis de 1982', 'Logros del TLCAN: comercio, IED, autos', 'Límites: ensamble, 3% local, crecimiento de 1.2% per cápita, campo y migración', 'Tequila no fue culpa del TLCAN', 'Recomendaciones: productividad, instituciones'],
      model: 'México llegó al TLCAN tras dos modelos agotados. De los años cuarenta a los setenta aplicó la sustitución de importaciones: aranceles y barreras a la inversión extranjera crearon una industria interna y un crecimiento de 3.1% per cápita, el milagro mexicano. Pero el crecimiento fue desigual, y las empresas protegidas se volvieron ineficientes. El gobierno respondió a las presiones sociales con gasto, financiado con deuda y petróleo. Con la caída del crudo y el alza de tasas en EUA vino la moratoria de 1982 y, con el FMI, un ajuste fiscal y una apertura que culminó con el GATT en 1986.\n\nEl TLCAN cumplió en lo comercial. El comercio se multiplicó, la IED de EUA pasó de 15 mil a más de 100 mil millones de dólares y el empleo automotriz se multiplicó. La crisis de 1995 tampoco se le puede atribuir: nació en el peso y en la salida de capitales, y las exportaciones ayudaron a salir de ella.\n\nFalló en lo que más importaba: el desarrollo. Entre 1994 y 2016 México creció 1.2% per cápita, en el lugar 15 de 20 países de la región. La razón está en la productividad. Las multinacionales llegaron por mano de obra barata y trajeron sólo ensamble: las maquiladoras usaban 3% de insumos locales, de modo que las derramas fueron mínimas y hasta desplazaron proveedores nacionales. En Solow, entró capital, pero la A no se movió. Además, el maíz subsidiado de EUA desplazó a millones de campesinos, que pasaron a la informalidad o migraron. Y sin crédito suficiente para el sector no exportador, los beneficios se quedaron en una parte de la economía. Es decir, hubo dos Méxicos.\n\nPara el T-MEC, no recomendaría abandonar el libre comercio: el problema no fue el tratado, sino lo que no lo acompañó. Recomendaría subir el contenido nacional, no con protección como en los sesenta, sino con proveedores locales que compitan; invertir en infraestructura, educación e I+D, donde México gasta menos de 0.5% del PIB; dar crédito a las pymes y fortalecer el Estado de derecho. También diversificar, pues cerca de 70% de las exportaciones van a un solo país. Un tratado abre el mercado, pero la productividad se construye en casa.',
    },
    {
      topic: TOPIC, type: 'caso',
      prompt: '¿Qué explica el crecimiento de China en 40 años de reformas y cómo se conecta con su enorme superávit externo?',
      tools: ['Solow (K, L, A)', 'Gradualismo vs big bang', 'Identidad S − I = CA', 'Ahorro precautorio', 'Rendimientos decrecientes'],
      outline: ['De plan central a incentivos', 'Fases: 1978–92, 1993–2008, 2009–18', 'K, L y A', 'Por qué el superávit: ahorro, no sólo moneda', 'Desafíos: menos convergencia, rebalanceo'],
      model: 'China creció 9.27% anual durante cuarenta años porque pasó de un sistema sin incentivos a uno que los creó gradualmente, sector por sector. Bajo Mao, el plan central, el Gran Salto y la Revolución Cultural destruyeron incentivos y capital humano, de modo que la productividad era muy baja y había mucho margen de mejora.\n\nLa primera fase, de 1978 a 1992, empezó en el campo: con la responsabilidad de los hogares, los campesinos conservaban lo que producían por encima de la cuota, y el producto saltó. Eso liberó mano de obra hacia empresas rurales y luego hacia la industria, y generó ahorro. Se sumaron los precios duales y las zonas económicas especiales, donde la IED debía orientarse a exportar. La segunda fase, de 1993 a 2008, reformó las estatales, dejando quebrar a las chicas y consolidando las grandes, y culminó con la OMC en 2001, que abrió el mercado mundial. La tercera, tras el estímulo de 2008, es la nueva normalidad: menor crecimiento, deuda y sobrecapacidad.\n\nCon Solow, los tres factores crecieron. L, porque unos 300 millones migraron a las ciudades y mejoró la educación. K, por un ahorro extraordinario y la IED. Y A, por incentivos, reasignación y tecnología aprendida. El proceso fue gradual: se experimentó antes de generalizar, a diferencia de la terapia de choque de Rusia, aunque con costos como corrupción y reformas incompletas.\n\nEl superávit es la otra cara de esto. La identidad dice que CA = (S − I) + (T − G). En 2008, China ahorró 53% del PIB y su superávit superó 9%. Por el lado de la oferta exporta porque es productiva; por el lado de la demanda, porque consume poco. Como explicó el profesor, los hogares ahorran por precaución, ya que su red de salud y seguridad social es débil. Por eso el superávit persiste incluso con déficit público, y aunque el yuan se apreció cerca de 30% no desapareció: no es sólo tipo de cambio. Ese excedente, convertido en reservas, es parte del exceso de ahorro de Bernanke.\n\nEl desafío es que, según Solow, la convergencia se frena con más capital, una población que envejece y la fricción comercial. Rebalancear hacia el consumo requiere fortalecer la red social, y no sólo pedirle a la gente que gaste.',
    },
    {
      topic: TOPIC, type: 'noticia',
      prompt: 'El déficit comercial de EUA subió a $105.6 mil millones en agosto de 2026, el mayor desde principios de 2025, y la cuenta corriente llegó a 3% del PIB en el segundo trimestre, pese a los aranceles. Interpreta con las herramientas del curso.',
      tools: ['Identidad S − I = CA', 'Bernanke', 'Efectos de aranceles', 'Balanza de pagos', 'Efecto riqueza / boom de IA'],
      outline: ['Hecho y aparente paradoja', 'Identidad: el saldo no se decide en la aduana', 'Quién gasta: gobierno y boom de inversión/riqueza por IA', 'Quién financia: −$369.7 mil millones en la cuenta financiera; PII de −$22.42 billones', 'Implicación: dólar, tasas, México'],
      model: 'El dato parece una paradoja: Estados Unidos lleva más de un año con aranceles para cerrar su déficit y, aun así, en agosto de 2026 el déficit comercial saltó a 105.6 mil millones de dólares, con importaciones de 420.8 mil millones. En el segundo trimestre, además, el déficit de cuenta corriente fue de 246 mil millones, 3% del PIB. Con la identidad del curso no hay paradoja, sino lo que se esperaba.\n\nLa identidad dice que X − M = (S − I) + (T − G). Un arancel no aparece en esa ecuación: sólo puede cerrar el déficit si cambia el ahorro, la inversión o el balance fiscal. Ésa es la crítica que el profesor deriva de Bernanke. Por eso, en lugar de preguntar qué producto se encareció, hay que preguntar quién es el gastador.\n\nSon dos. El gobierno, porque mantiene un déficit fiscal alto y redujo impuestos, lo que resta ahorro nacional. Y el sector privado: según las crónicas del dato, parte del salto proviene de importaciones ligadas a la construcción de infraestructura de inteligencia artificial, es decir, de inversión. Es la misma dinámica que describió Bernanke para los noventa: un boom tecnológico atrae inversión y capital, y las acciones al alza crean un efecto riqueza que reduce el ahorro. Con I alto y S bajo, S − I se vuelve más negativo, y la diferencia se compra afuera.\n\nConviene ser cuidadoso. En lo que va del año el déficit acumulado cae 19.9% contra 2025, pero un año puede estar distorsionado por importaciones adelantadas y otros factores, y un mes no prueba nada. Tampoco se sabe cuál sería el déficit sin aranceles. Lo que sí muestra es que no eliminaron el déficit.\n\nLa balanza de pagos dice quién paga la cuenta: la cuenta financiera registró −369.7 mil millones en el trimestre, es decir, endeudamiento neto con el exterior, y la posición de inversión internacional es de −22.42 billones. Mientras el dólar sea moneda de reserva y la IA atraiga capital, esa tarjeta se puede seguir usando, aunque el riesgo es un ajuste brusco si el apetito cambia.\n\nPara México, la implicación es que los aranceles difícilmente desaparecerán por haber “funcionado” o no: el déficit persistirá y seguirá dando argumentos políticos en la revisión del T-MEC. Cerrarlo de verdad requeriría más ahorro o menos gasto, y eso frenaría la demanda que compra exportaciones mexicanas.',
    },
    {
      topic: TOPIC, type: 'noticia',
      prompt: 'Las exportaciones de China crecieron 36.3% anual en septiembre de 2026 y su superávit acumulado llegó a $938 mil millones en nueve meses, mientras sus socios la presionan para rebalancear. ¿Cómo lo interpretas?',
      tools: ['Identidad S − I = CA', 'Ahorro precautorio', 'Equilibrio interno y externo', 'Bernanke', 'Cadena de valor'],
      outline: ['Hecho', 'Oferta (escalera: chips, tecnología verde) vs demanda (ahorro, consumo débil)', 'Cuadrante: demanda interna débil + superávit', 'Por qué aranceles no resuelven: desvío', 'Implicaciones para México y emergentes'],
      model: 'En septiembre de 2026, las exportaciones chinas crecieron 36.3% anual, el superávit mensual fue de 133.5 mil millones de dólares y el acumulado de nueve meses alcanzó 938 mil millones, cerca del récord de 2025, de casi 1.2 billones. La Unión Europea y Estados Unidos presionan a Beijing para que rebalancee. La lectura del curso es que esto no se resuelve sólo con diplomacia comercial, porque el superávit es, ante todo, un fenómeno de ahorro.\n\nComo señaló el profesor, la economía tiene dos lados. Por la oferta, China exporta porque ha subido por la cadena de valor: semiconductores y equipo de procesamiento de datos representaron cerca de 18% de sus exportaciones. Es la historia de Kehoe y Xu: de textiles y juguetes a tecnología. Por la demanda, la identidad CA = (S − I) + (T − G) dice que un superávit de este tamaño exige que el país gaste bastante menos de lo que produce. Reuters describe la demanda interna y la inversión como débiles. Los hogares ahorran por precaución, por una red de salud y seguridad social insuficiente. Lo que no se consume dentro se vende fuera.\n\nEn el cuadrante de equilibrio interno y externo, China combina debilidad interna con superávit externo. Ahí la política que corresponde no es exportar más, sino expandir la demanda interna: más gasto social, que reduce el ahorro precautorio, y mayor consumo. Eso mejoraría los dos equilibrios a la vez. Lo difícil es que no se logra de un día para otro, y el auge exportador reduce la urgencia de hacerlo.\n\nLos aranceles de los socios ayudan poco al desequilibrio global. Si sólo se cierra un mercado, el exceso de producción se desvía a otros, lo que explica la preocupación de Europa. Mientras el ahorro chino siga alto, el superávit encontrará salida. Es, de nuevo, el exceso de ahorro de Bernanke.\n\nPara México, hay dos efectos. Enfrenta más competencia de bienes chinos, en casa y en EUA, lo que refuerza la presión sobre las reglas de origen en el T-MEC. Pero el nearshoring gana sentido si EUA quiere reducir su dependencia de China. El riesgo es que México se quede en ensamble: sin productividad, la oportunidad se convierte en más de lo mismo. Conviene vigilar si China anuncia estímulos al consumo; sería la señal de un verdadero rebalanceo.',
    },
    {
      topic: TOPIC, type: 'noticia',
      prompt: 'EUA no aceptó prorrogar el T-MEC en la revisión del 1 de julio de 2026, y a fines de octubre México aún no cierra un acuerdo para reducir los aranceles al acero, aluminio y autos. Analiza qué significa para México.',
      tools: ['Identidad S − I = CA', 'Efectos de aranceles', 'Arancel anunciado vs efectivo', 'Inversión (I) e incertidumbre', 'Kehoe y Xu'],
      outline: ['Hechos: revisiones anuales; 50% acero/aluminio, 25% autos', 'Por qué la lógica de déficit no se resuelve con aranceles', 'Efecto micro: precios, cadenas integradas', 'Efecto macro: incertidumbre reduce I, y frena crecimiento', 'Qué debería hacer México'],
      model: 'El 1 de julio de 2026, Estados Unidos no aceptó prorrogar el T-MEC por otros dieciséis años, lo que activó revisiones anuales; el tratado sigue vigente, pero con un horizonte incierto. A la vez, siguen los aranceles sectoriales de 50% al acero y aluminio y de 25% a ciertos autos. El 26 de octubre, Sheinbaum admitió que están cerca pero que aún no hay acuerdo; Ebrard advirtió que es probable que las definiciones lleguen tras las elecciones del 3 de noviembre y que no espera un cambio drástico, pues los aranceles generan ingresos.\n\nCon la identidad del curso se entiende por qué estos aranceles no van a resolver lo que dicen resolver. El déficit de EUA es X − M = (S − I) + (T − G). Mientras su gobierno mantenga el déficit y su sector privado invierta y consuma más de lo que ahorra, el déficit total seguirá; un arancel a México o a China puede bajar el déficit bilateral, pero desvía el comercio a otro país. Es la crítica derivada de Bernanke. Lo que sí hacen los aranceles es encarecer los bienes para el comprador y reducir el volumen de comercio, y en cadenas tan integradas como la automotriz el costo se paga varias veces, pues las piezas cruzan la frontera en ambos sentidos. Además, hay que distinguir la tasa anunciada de la efectiva, ya que muchos bienes que cumplen reglas de origen han estado exentos.\n\nPara México, el efecto macro principal puede ser la incertidumbre. Una fábrica es una decisión a veinte años, y revisar el tratado cada año eleva el riesgo y puede retrasar la inversión, que es el componente más volátil del PIB. Si I cae, se reduce el capital y el crecimiento potencial, lo que perjudica justo a quien necesita crecer. El dato de IED del primer semestre, dominado por reinversión de utilidades, es consistente con esa cautela, aunque no la prueba.\n\nLa respuesta de México no debería ser sólo negociar el arancel. Como concluyen Kehoe y Xu, el país quedó atrapado exportando lo mismo a un solo cliente. Conviene aprovechar la negociación de reglas de origen para desarrollar proveedores locales, invertir en infraestructura e I+D y dar certeza jurídica. El tratado es necesario, y romperlo no ayudaría, pero no sustituye la productividad.',
    },
    {
      topic: TOPIC, type: 'noticia',
      prompt: 'México captó un récord de IED en el primer semestre de 2026 ($34,968 millones), pero casi 90% fue reinversión de utilidades y sólo 7.8% nuevas inversiones. ¿Es éste el nearshoring prometido?',
      tools: ['Balanza de pagos (IED)', 'Solow/PTF', 'Kehoe y Xu', 'Identidad S − I', 'Incertidumbre del T-MEC'],
      outline: ['Hecho: récord y composición', 'Qué dice la IED en la balanza de pagos', 'Reinversión vs nuevas: qué significa', 'Solow: K sí, ¿y A?', 'Implicación: qué vigilar'],
      model: 'La Secretaría de Economía reportó una IED de 34,968 millones de dólares en el primer semestre de 2026, 2.1% más que un año antes. El titular es bueno, pero su composición matiza la historia: 88.5% fue reinversión de utilidades, 7.8% nuevas inversiones, y 3.7% cuentas entre compañías. El segundo trimestre, además, cayó 3.5% anual. Es, entonces, una señal de empresas que ya están aquí y se quedan, más que de una ola de fábricas nuevas. El nearshoring existe, pero este dato no prueba que esté llegando con fuerza.\n\nEn la balanza de pagos, la IED importa porque financia el déficit de cuenta corriente con el flujo más estable. Recordando la identidad, CA = (S − I) + (T − G): si México invierte más de lo que ahorra, alguien debe prestarle la diferencia. Es mucho mejor que sea con fábricas que con cartera, como enseñó 1994, cuando esta última salió de golpe. En este sentido, una IED estable es una buena noticia. Y la reinversión no es poca cosa: las utilidades pudieron irse y se quedaron, lo que indica cierta confianza.\n\nPero la pregunta de fondo es sobre crecimiento. En Solow, la IED suma capital, y K sólo da impulso transitorio por rendimientos decrecientes. Lo que sostiene el crecimiento es la A. Ahí está la lección de Kehoe y Xu y de Tabellini: México ya recibió mucha IED tras el TLCAN y no subió la productividad, porque era sobre todo ensamble, con apenas 3% de insumos locales en maquiladoras. Que 13,482 millones hayan ido a manufactura es positivo, aunque buena parte sigue ligada a autos y autopartes, la concentración de siempre. La duda es si dejará derramas o más de lo mismo.\n\nEl contexto explica la cautela. Con revisiones anuales del T-MEC y aranceles a autos y acero sin resolver, una empresa prefiere reinvertir en lo que ya tiene antes que abrir una planta nueva; esto es una interpretación razonable, no un hecho comprobado. Por eso, la cifra que vigilaría es la de nuevas inversiones, junto con el contenido nacional. Para que el nearshoring sea distinto del TLCAN, México necesita certeza jurídica, energía, infraestructura y proveedores locales. De lo contrario, será otro récord sin productividad.',
    },
  );

  // ---------------------------------------------------------------- Noticias (verificadas el 2-nov-2026)
  E.news.push(
    { topic: TOPIC, date: '2026-10-06', title: 'Déficit comercial de EUA sube a $105.6 mil millones en agosto; importaciones de $420.8 mil millones', source: 'Census/BEA vía AJOT', url: 'https://www.ajot.com/news/u.s-international-trade-in-goods-and-services-august-2026', tool: 'Identidad S − I = CA y crítica a aranceles', read: 'Pese a los aranceles, el déficit mensual volvió a superar los $100 mil millones (acumulado del año: −19.9% contra 2025). La identidad dice que el saldo responde a S − I + (T − G), no a la aduana; la inversión ligada a IA y el déficit público empujan en contra. Un mes no prueba nada, pero el déficit sigue ahí.' },
    { topic: TOPIC, date: '2026-09-24', title: 'Déficit de cuenta corriente de EUA: $246 mil millones, 3.0% del PIB en el 2T-2026', source: 'BEA', url: 'https://bea.gov/news/2026/us-international-transactions-and-investment-position-2nd-quarter-2026', tool: 'Balanza de pagos', read: 'La otra cara del déficit está en la misma nota: cuenta financiera de −$369.7 mil millones (endeudamiento neto con el exterior) y posición de inversión de −$22.42 billones. Es la tarjeta de crédito del profe: el dólar como reserva permite usarla, pero el saldo crece.' },
    { topic: TOPIC, date: '2026-10-14', title: 'El superávit de China se acerca al récord: exportaciones +36.3% en septiembre, $938 mil millones en nueve meses', source: 'AP vía AJC', url: 'https://www.ajc.com/news/2026/10/chinas-exports-surge-363-in-september-as-pressure-ramps-up-to-rebalance-trade/', tool: 'Ahorro, identidad y cuadrante', read: 'Oferta: sube la cadena de valor. Demanda: ahorra mucho y consume poco; Reuters también describe demanda interna floja. En el cuadrante, debilidad interna con superávit: le toca expandir consumo y red social. Sin eso, los aranceles de sus socios sólo desvían el excedente.' },
    { topic: TOPIC, date: '2026-10-26', title: 'Sheinbaum reconoce que México y EUA aún no cierran acuerdo arancelario (acero y aluminio 50%; autos 25%)', source: 'Zeta Tijuana', url: 'https://zetatijuana.com/2026/10/csp-reconoce-que-mexico-y-eu-no-cierran-acuerdo-arancelario/', tool: 'Efectos de aranceles e inversión', read: 'Se suma a que EUA no prorrogó el T-MEC el 1 de julio (revisiones anuales, según IISD) y a que Ebrard ve definiciones después del 3 de noviembre. El arancel no cierra el déficit de EUA, pero sí encarece cadenas integradas, y la incertidumbre pesa sobre la inversión, el componente más volátil.' },
    { topic: TOPIC, date: '2026-08-24', title: 'IED en México: récord semestral de $34,968 millones, con casi 90% de reinversión y 7.8% de nuevas inversiones', source: 'UnoTV, con datos de la Secretaría de Economía', url: 'https://www.unotv.com/negocios/ied-mexico-record-primer-semestre-2026-caida-segundo-trimestre/', tool: 'Balanza de pagos y Solow/PTF', read: 'IED es el financiamiento más estable de la cuenta corriente, y es buena noticia. Pero con 7.8% de nuevas inversiones, no prueba una ola de nearshoring. Y K sin derramas no mueve la A: es la lección del TLCAN y de Kehoe y Xu.' },
  );

  // ---------------------------------------------------------------- Repaso
  E.repaso.push({
    topic: TOPIC, icon: '🌐', title: 'S2 · Flujos internacionales y desequilibrios',
    items: [
      ['Identidad', 'Y = C + I + G + X − M ⇒ (S − I) = (G − T) + (X − M) ⇔ CA = (S − I) + (T − G).'],
      ['Lectura', 'Déficit externo = exceso de gasto. Dos sospechosos: privado (S − I) o gobierno (T − G).'],
      ['Financiamiento', 'CA se financia con IED, portafolio y reservas: BCA + BKA = 0. Es una tarjeta: cada año debes más.'],
      ['Déficit gemelo', 'Déficit fiscal y externo juntos; no siempre van juntos (EUA 1996–2000, Japón, Alemania).'],
      ['Bernanke 2005', 'Exceso global de ahorro: envejecimiento, reservas post-crisis, petróleo. La balanza es “la cola del perro”.'],
      ['Por qué cae S en EUA', 'Efecto riqueza: acciones (1996–2000) y vivienda con tasas bajas (después de 2000). Antesala de subprime.'],
      ['Arancel', 'Sube precios, aprecia la moneda, reduce X y M; no cambia el saldo si no cambia S − I + (T − G).'],
      ['Bilateral vs total', 'El arancel a un país desvía comercio; baja el bilateral, no el total.'],
      ['Contradicción Trump', 'Bajar impuestos sube el gasto y el déficit; el arancel no lo compensa.'],
      ['Cuadrante', 'Caliente + déficit: recorta. Recesión + déficit: deprecia. Recesión + superávit: expande. Caliente + superávit: aprecia.'],
      ['Kehoe y Xu', 'Apertura no basta: México abrió tras industrializarse; China, durante. China sube la cadena de valor (conjetura).'],
      ['Barreras a la riqueza', 'Finanzas ineficientes, falta de Estado de derecho, rigidez laboral.'],
      ['México (cadena)', 'ISI → sobreprotección → baja productividad → malestar → gasto → crisis 1976, 1982.'],
      ['China (cadena)', 'Incentivos → ZEE con exportación → OMC → I+D e infraestructura → PTF ↑. Superávit por ahorro precautorio.'],
    ],
  });
})();
