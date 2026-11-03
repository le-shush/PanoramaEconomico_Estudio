// Sección 85 — Reglas de dedo: la idea detrás de cada fórmula (S1–S7), tarjetas "¿Qué pasa si…?" y mapa entre herramientas.
// Cada bloque lleva data-sec para que el glosario use los símbolos del tema (la misma letra cambia de significado entre temas).
(function () {
  const TOPICS = [['S1', '📈 Crecimiento'], ['S2', '🌐 Flujos'], ['S3', '🏛️ Fiscal'], ['S4', '🏦 Monetaria'], ['S5', '💱 Cambio'], ['S6', '🏧 Bancos'], ['S7', '🌡️ Clima']];

  // ------------------------------------------------------------------ lo que dijo el profe, por tema (verificado contra transcripción)
  const TIPS = {
    S1: ['<q>China creció superrápido, pero lo que te dice el modelo de Solow es que en algún punto el crecimiento tiene que dejar de aumentar.</q>', 'Clase 14-oct'],
    S2: ['La única pregunta que quiere responder con la identidad: <q>¿Quién es el gastador de la familia?</q> ¿El gobierno o el sector privado?', 'Clase 19-oct'],
    S3: ['<q>El déficit es cuánto te faltó cada año.</q> La deuda es cómo se van acumulando esos faltantes, como el saldo de la tarjeta de crédito.', 'Clase 19-oct'],
    S4: ['<q>Subo la tasa, le doy en la torre al crecimiento, pero protejo la moneda. Dejo las tasas abajo, protejo el crecimiento, pero le doy en la torre al tipo de cambio.</q>', 'Clase 21-oct'],
    S5: ['Con tipo fijo: <q>si Estados Unidos sube la tasa, tú la tienes que subir</q>.', 'Clase 26-oct'],
    S6: ['En Diamond y Dybvig, con incertidumbre: <q>Lo que tú debes hacer para actuar lógicamente es tener tu dinero en efectivo.</q> Racional para ti, desastroso para todos.', 'Clase 28-oct'],
  };

  // ------------------------------------------------------------------ ideas. mv: [causa, ceteris paribus, efecto, nota]
  const IDEAS = [
    // ---------- S1
    { t: 'S1', name: 'Rendimientos decrecientes', a: 'crecimiento/prod',
      rule: 'Cada máquina nueva rinde menos que la anterior; por eso acumular capital, solo, tiene techo.',
      f: 'Y = A · K<sup>α</sup> · L<sup>1−α</sup> &nbsp;·&nbsp; y = A · k<sup>α</sup>',
      mv: [['k ↑', 'con A fija', 'y ↑', 'pero cada vez menos'], ['A ↑', 'con K y L fijos', 'Y ↑', 'en la misma proporción']],
      brk: 'Hay economías de escala (electricidad), pero el análisis del curso se queda con la regla general.',
      real: 'Cien Oxxos en una calle no ganan dinero (ejemplo de clase).' },
    { t: 'S1', name: 'Acumulación de capital', a: 'crecimiento/prod',
      rule: 'El capital por trabajador sólo crece si lo que inviertes supera lo que se desgasta y lo que necesitan los trabajadores nuevos.',
      f: 'S = I &nbsp;·&nbsp; ΔK = sY − δK &nbsp;·&nbsp; Δk = s·y − (δ + n)·k',
      mv: [['s ↑', 'con δ y n fijas', 'Δk ↑'], ['δ ↑', 'con s y n fijas', 'Δk ↓'], ['n ↑', 'con s y δ fijas', 'Δk ↓', 'hay que repartir el capital entre más']],
      brk: 'S = I sólo vale en economía cerrada. Abierta, puedes invertir con ahorro ajeno (S2).',
      real: 'Pozos de Pemex: la inversión no repone el agotamiento.' },
    { t: 'S1', name: 'Solow: más ahorro sube el nivel', a: 'crecimiento/solow',
      rule: 'Ahorrar más te sube el nivel de vida una vez, no el crecimiento de largo plazo.',
      f: 's·y* = (δ + n + g)·k* &nbsp;·&nbsp; y* = A · (s / (δ + n + g))<sup>α/(1−α)</sup>',
      mv: [['s ↑', 'con A, δ, n y g fijas', 'y* ↑', 'crece más sólo en la transición'], ['δ ↑ o n ↑', 'con s y A fijas', 'y* ↓'], ['k ↓ (guerra)', 'con k* fijo', 'crecimiento ↑', 'por un rato: reconstrucción']],
      brk: 'No dice cuánto dura la transición: pueden ser décadas. Y "en estado estacionario no se crece" es falso: el PIB total crece a n + g.',
      real: 'China y Sureste Asiático: ahorro alto, gran transición. Con α = 1/3, duplicar s sube y* ≈41%, una sola vez.' },
    { t: 'S1', name: 'Sólo la PTF sostiene el crecimiento', a: 'crecimiento/solow',
      rule: 'Sólo la productividad sostiene el crecimiento por persona; todo lo demás se apaga.',
      f: 'En el largo plazo: g<sub>y</sub> = g',
      mv: [['A ↑ una vez', 'con s, δ y n fijas', 'y* ↑', 'salto de nivel'], ['g ↑ permanente', 'con s, δ y n fijas', 'g<sub>y</sub> ↑', 'cambia la pendiente, para siempre']],
      brk: 'Solow no explica de dónde sale A: la toma de fuera. Y la tecnología es el vehículo: sin incentivos no llega.',
      real: 'IA en EUA: más K, pero la productividad aún no se ve (clase).' },
    { t: 'S1', name: 'Convergencia condicional', a: 'crecimiento/conv',
      rule: 'Un pobre crece más rápido que un rico sólo si comparte sus fundamentales; cada país corre hacia su propia meta.',
      f: 'Crecimiento ↑ con la distancia a <b>su propio</b> k*',
      mv: [['k ↓', 'con k* fijo', 'crecimiento ↑', 'más lejos de su meta'], ['k* ↓ (peor s, A o instituciones)', 'con k fijo', 'crecimiento ↓', 'aunque siga siendo pobre']],
      brk: 'La convergencia absoluta exige iguales s, n, δ y A. "Es pobre, entonces crecerá" es el error clásico.',
      real: 'BRICs: China lejos de su k*. Argentina, Brasil y Sudáfrica no alcanzan a EUA.' },
    { t: 'S1', name: 'Contabilidad del crecimiento', a: 'crecimiento/ptf',
      rule: 'Lo que el capital y el trabajo no explican del crecimiento es la productividad: es lo que sobra.',
      f: 'g<sub>Y</sub> = g<sub>A</sub> + α·g<sub>K</sub> + (1−α)·g<sub>L</sub> &nbsp;·&nbsp; g<sub>y</sub> = g<sub>A</sub> + α·g<sub>k</sub>',
      mv: [['g<sub>K</sub> ↑', 'con g<sub>Y</sub> y g<sub>L</sub> fijos', 'g<sub>A</sub> ↓', 'mismo PIB con más capital: menos productividad'], ['g<sub>Y</sub> ↑', 'con g<sub>K</sub> y g<sub>L</sub> fijos', 'g<sub>A</sub> ↑']],
      brk: 'Es un residuo, no una medición directa: arrastra errores de medición y de calidad del capital.',
      real: 'México y China se abrieron (TLCAN, OMC); en México la productividad se estancó.' },

    // ---------- S2
    { t: 'S2', name: 'La identidad del gasto', a: 'flujos/h-ident',
      rule: 'Si un país compra más de lo que produce, alguien está gastando de más: el gobierno o el sector privado.',
      f: '(S − I) = (G − T) + (X − M) &nbsp;·&nbsp; CA = X − M = (S − I) + (T − G)',
      mv: [['S − I ↓ (más gasto privado)', 'con G − T fijo', 'X − M ↓', 'más déficit comercial'], ['I ↑', 'con S y G − T fijos', 'X − M ↓'], ['S ↑', 'con I y G − T fijos', 'X − M ↑']],
      brk: 'Es contabilidad, se cumple siempre, pero no dice qué causa qué: al moverse uno, los otros reaccionan.',
      real: 'México 1994: el déficit externo fue privado, no fiscal.' },
    { t: 'S2', name: 'Déficit gemelos', a: 'fiscal/fx-id',
      rule: 'Si el gobierno gasta de más y el sector privado no compensa, el déficit fiscal se vuelve déficit comercial.',
      f: '(X − M) = (S − I) − (G − T)',
      mv: [['G − T ↑', 'con S − I fijo', 'X − M ↓', 'los dos déficits juntos'], ['T ↓', 'con G y S − I fijos', 'X − M ↓', 'el recorte se va a importaciones'], ['G − T ↑ y S − I ↑ igual', 'el privado compensa', 'X − M sin cambio', 'no hay gemelo']],
      brk: 'El privado reacciona: Bernanke cita un modelo donde $1 menos de déficit fiscal baja el externo menos de 20 centavos.',
      real: 'EUA: recorte de impuestos y déficit externo. China rompe el gemelo: déficit fiscal con superávit externo.' },
    { t: 'S2', name: 'Aranceles', a: 'flujos/h-aran',
      rule: 'Un arancel cambia qué compras y a quién, no cuánto gastas de más; sin cambiar ahorro e inversión, el déficit total sigue igual.',
      f: '(X − M) = (S − I) − (G − T) &nbsp;·&nbsp; τ no aparece',
      mv: [['τ ↑', 'con S, I y G − T fijos', 'M ↓ y X ↓', 'la moneda se aprecia; X − M total igual'], ['τ ↑ a un país', 'con S, I y G − T fijos', 'déficit bilateral ↓ (X − M con ese país ↑)', 'se desvía a otro país'], ['T ↑ (recaudación que sí se ahorra)', 'con G y S − I fijos', 'X − M ↑', 'la única vía: baja G − T']],
      brk: 'La apreciación es mecanismo de libro, no ley: en 2025 el dólar se debilitó. Lo que no falla es la contabilidad.',
      real: 'EUA–China: baja el déficit bilateral y el comercio se va a Vietnam y México.' },
    { t: 'S2', name: 'Quién te financia', a: 'flujos/h-bop',
      rule: 'Un déficit externo es el saldo de una tarjeta: alguien te presta, y la pregunta es quién y si puede irse mañana.',
      f: 'BCA + BKA = 0 &nbsp;·&nbsp; CA = − (flujos de capital) − (uso de reservas)',
      mv: [['BKA ↓ (deja de entrar capital)', 'sin usar reservas', 'BCA ↑', 'el déficit se cierra a la fuerza'], ['CA ↓', 'con flujos de capital fijos', 'uso de reservas ↑', 'se acaban: sólo compras tiempo']],
      brk: 'Ojo con el signo: BKA positivo es entrada; en la lámina 33, FA positivo es préstamo al mundo. Di cuál usas.',
      real: 'La IED tarda en salir; el portafolio se va en un clic: eso tronó en 1994.' },
    { t: 'S2', name: 'Equilibrio interno y externo', a: 'flujos/h-swan',
      rule: 'Cada país tiene dos metas, producir en su potencial y un déficit financiable; el cuadrante donde está dice qué política le toca.',
      f: 'Cuadrantes: brecha del producto × CA',
      mv: [['Tasa ↑', 'con G − T fijo', 'I ↓, S ↑ → X − M ↑', 'pero frena el crecimiento'], ['Depreciación', 'con precios fijos', 'M más cara, X más barata', 'a pleno empleo, mejora X − M sólo si también cae el gasto'], ['T − G ↑', 'con S − I fijo', 'X − M ↑', 'costo social']],
      brk: '"Déficit = baja productividad" es falso: EUA tiene déficit y mucha productividad. El déficit es de gasto.',
      real: 'Sobrecalentada con déficit: México 1994, EUA hoy. Débiles con superávit: China y Japón.' },

    // ---------- S3
    { t: 'S3', name: 'Multiplicador', a: 'fiscal/fx-multi',
      rule: 'El gasto de uno es el ingreso de otro: un peso se pasa de mano en mano y genera más de un peso de ingreso.',
      f: 'Y = C + I₀ + G₀ &nbsp;·&nbsp; C = C₀ + c·Y &nbsp;·&nbsp; Y* = (C₀ + I₀ + G₀)/(1 − c) &nbsp;·&nbsp; ΔY = ΔG/(1 − c)',
      mv: [['c ↑', 'con ΔG fijo', 'multiplicador ↑'], ['G₀ ↑', 'con c, C₀ e I₀ fijos', 'Y* ↑ más que ΔG'], ['I₀ ↓', 'con c, C₀ y G₀ fijos', 'Y* ↓ multiplicado', 'la recesión se autoalimenta']],
      brk: 'Es el caso de libro. Estimado: 0.6–1.2 en tiempos normales (desplaza inversión) y 1.5–2.5 en recesión, no 5.',
      real: 'COVID: la gente ahorró el cheque, c se acercó a cero y la cadena se apagó.' },
    { t: 'S3', name: 'Multiplicador en economía abierta', a: 'fiscal/fx-multi',
      rule: 'En economía abierta parte del gasto se va a importaciones y crea empleo afuera; por eso el multiplicador es menor.',
      f: 'Gasto: 1/(1 − c + m) &nbsp;·&nbsp; Impuestos: −c/(1 − c + m)',
      mv: [['m ↑', 'con c fija', 'multiplicador ↓'], ['G ↑', 'con c y m fijas', 'M ↑ → X − M ↓', 'el estímulo se fuga'], ['T ↓', 'con c y m fijas', 'Y ↑, pero menos que con G', 'parte del recorte se ahorra desde la primera ronda']],
      brk: 'Supone que el mundo no reacciona. Si tus socios también estimulan, te regresa parte como exportaciones.',
      real: 'Con c = 0.8: cerrada da 5; con m = 0.2 baja a 2.5.' },
    { t: 'S3', name: 'r − g: la bola de nieve', a: 'fiscal/fx-deuda',
      rule: 'Si la tasa le gana al crecimiento, la deuda pesa más sola, aunque ya no gastes de más.',
      f: 'Δd = (r − g)/(1 + g) · d − pb',
      mv: [['r ↑', 'con g, d y pb fijos', 'Δd ↑'], ['g ↑', 'con r, d y pb fijos', 'Δd ↓'], ['pb ↑', 'con r, g y d fijos', 'Δd ↓'], ['d ↑, si r &gt; g', 'con r, g y pb fijos', 'Δd ↑', 'se acelera']],
      brk: 'r y g no son independientes: r sube si el mercado duda, y la austeridad baja g por el multiplicador.',
      real: 'México (clase): r = 3%, g = 2%, déficit de 4%: la deuda no para. Alemania: r = 1%, g = 1.3%, sin déficit: baja.' },
    { t: 'S3', name: 'Balance primario estabilizador', a: 'fiscal/fx-sost',
      rule: 'Para que la deuda no crezca frente al PIB, tu superávit antes de intereses debe cubrir la brecha entre tasa y crecimiento sobre lo que debes.',
      f: 'pb* = (r − g)/(1 + g) · d',
      mv: [['r − g ↑', 'con d fija', 'pb* ↑', 'hay que ajustar más'], ['d ↑, si r &gt; g', 'con r y g fijas', 'pb* ↑'], ['r &lt; g', 'con d fija', 'pb* &lt; 0', 'cabe déficit primario sin que suba la razón']],
      brk: 'Es aritmética; lo difícil es político. Si no hay consenso para ajustar, se termina imprimiendo.',
      real: 'Abril 2010: Grecia, 127% de deuda y casi 19% de tasa a dos años. Japón, 193% y menos de 0.25%.' },
    { t: 'S3', name: 'Qué infla y qué licúa la deuda', a: 'fiscal/fx-roscini',
      rule: 'La inflación y el crecimiento licúan la deuda; los intereses y la depreciación la inflan, si debes en dólares.',
      f: 'Δb = x + b·i − b·π − b·g + b·α·ε',
      mv: [['π ↑', 'con x, b, i y g fijos', 'Δb ↓'], ['ε ↑ (depreciación)', 'con α &gt; 0 y lo demás fijo', 'Δb ↑'], ['x ↑ (déficit primario)', 'con lo demás fijo', 'Δb ↑']],
      brk: 'La inflación licúa sólo si sorprende: si i sube con ella (Fisher), no hay licuación. Con α = 0, la depreciación no pega.',
      real: 'México 1994–95: superávit primario y aun así la deuda subió de ≈30% a ≈47% del PIB.' },

    // ---------- S4
    { t: 'S4', name: 'Teoría cuantitativa', a: 'monetaria/mon-raices',
      rule: 'Si hay más dinero persiguiendo los mismos bienes, suben los precios.',
      f: 'M · V = P · Q',
      mv: [['M ↑', 'con V y Q fijos', 'P ↑'], ['M ↑ y V ↓ igual', 'con Q fijo', 'P sin cambio', 'el dinero se queda parado']],
      brk: 'V no es fija: por eso los bancos centrales dejaron de guiarse por los agregados y pasaron a la tasa.',
      real: 'Alemania 1923 y Argentina: déficit financiado imprimiendo.' },
    { t: 'S4', name: 'Deuda con emisión', a: 'monetaria/mon-raices',
      rule: 'Imprimir baja la deuda de hoy, pero la pagas con inflación.',
      f: 'Δb = d + (i − π − g)·b − m',
      mv: [['m ↑', 'con d, i, π, g y b fijos', 'Δb ↓', 'pero m ↑ empuja π ↑ por M · V = P · Q'], ['π ↑', 'con i, g y b fijos', 'Δb ↓']],
      brk: 'Aquí d es déficit, signo contrario a pb de S3. Si todos anticipan la inflación, i sube y se acaba la licuación.',
      real: 'Déficit = problema político: sin consenso, no queda más remedio que emitir (clase).' },
    { t: 'S4', name: 'Regla de Taylor', a: 'monetaria/mon-tasa',
      rule: 'Si la inflación se pasa de la meta, sube la tasa más que la inflación; si la economía se enfría, bájala.',
      f: 'i = r* + π + ½(π − π*) + ½·brecha',
      mv: [['π ↑ 1 pp', 'con r*, π* y brecha fijas', 'i ↑ 1.5 pp', 'sube la tasa real'], ['brecha ↓ 1 pp', 'con r*, π y π* fijas', 'i ↓ 0.5 pp'], ['r* ↑', 'con lo demás fijo', 'i ↑']],
      brk: 'r* no se observa: <q>es ahí donde entra más el arte que la ciencia</q>. Con π ↑ y brecha ↓, los dos términos jalan al revés: dilema.',
      real: 'Banxico publica un intervalo para r*; la IA podría elevarla (clase).' },
    { t: 'S4', name: 'Fisher', a: 'monetaria/mon-fisher',
      rule: 'Lo que de verdad ganas es la tasa menos la inflación; la tasa sola no dice si la política aprieta o suelta.',
      f: '(1 + i) = (1 + r)(1 + πᵉ) &nbsp;·&nbsp; r ≈ i − π',
      mv: [['π ↓', 'con i fija', 'r ↑', 'más restrictiva sin moverse'], ['πᵉ ↑', 'con r fija', 'i ↑'], ['i ↓ 25 pb y π ↓ 50 pb', 'sin nada más', 'r ↑ 25 pb', 'bajó la tasa y aprieta más']],
      brk: 'La resta falla con inflación alta: i = 44% y π = 35% dan 9%; la exacta, ≈6.7%. Además i casi no baja de cero: con deflación, r sube.',
      real: 'Turquía y Argentina: tasas de 44% y 33% por inflación esperada. Japón: 0% con −2% de inflación es +2% real.' },
    { t: 'S4', name: 'Paridad cubierta (CIP)', a: 'monetaria/mon-paridades',
      rule: 'El precio del dólar a futuro ya trae la diferencia de tasas: es arbitraje, no una opinión.',
      f: 'F = S · (1 + i)/(1 + i*)',
      mv: [['i ↑', 'con S e i* fijas', 'F ↑'], ['i* ↑', 'con S e i fijas', 'F ↓']],
      brk: 'Pide capital libre y quién haga el arbitraje; con controles o estrés financiero se puede abrir (dato general).',
      real: 'Si te cubres con forward, el diferencial se esfuma: el carry sólo gana sin cobertura.' },
    { t: 'S4', name: 'Paridad descubierta (UIP) y PPP', a: 'monetaria/mon-paridades',
      rule: 'Si un país paga más, el mercado debe esperar que su moneda pierda valor por esa diferencia; si no, todos irían allá.',
      f: 'E(S₁) = S · (1 + i)/(1 + i*) &nbsp;·&nbsp; i − i* ≈ depreciación esperada &nbsp;·&nbsp; PPP: π − π* ≈ depreciación',
      mv: [['i ↑', 'con i* y S fijas', 'E(S₁) ↑', 'se espera más depreciación'], ['i ↑', 'con i* y E(S₁) fijas', 'S ↓', 'la moneda se aprecia hoy'], ['π ↑', 'con π* fija, tipo real constante', 'la moneda se deprecia']],
      brk: 'Es expectativa, no arbitraje: en plazos cortos suele fallar. De esa falla vive el carry trade.',
      real: 'Diciembre 1994: el diferencial daba ≈8.5% al año, contra un deslizamiento máximo de 4.6%.' },
    { t: 'S4', name: 'Carry trade y su quiebre', a: 'monetaria/mon-carry',
      rule: 'Pides prestado donde es barato, inviertes donde paga más y ganas mientras la moneda no se mueva en tu contra más que la diferencia de tasas.',
      f: 'R = (1 + i$) · (S₀/S₁)/(1 + i¥) − 1 &nbsp;·&nbsp; Quiebre: S₁/S₀ = (1 + i$)/(1 + i¥)',
      mv: [['i¥ ↑', 'con i$ y S₁/S₀ fijos', 'R ↓'], ['S₁ ↑ (peso más débil)', 'con tasas fijas', 'R ↓'], ['S₁/S₀ pasa el quiebre', 'con tasas fijas', 'R &lt; 0', 'todos desarman y el peso cae más']],
      brk: 'Se rompe de golpe: todos salen por la misma puerta, venden peso y compran yen, y la pérdida se alimenta sola.',
      real: 'Agosto 2024 (dato general): el BoJ sube a 0.25% y en días el yen se aprecia ≈20% contra el peso.' },
    { t: 'S4', name: 'Control de la curva (YCC)', a: 'monetaria/mon-ycc',
      rule: 'El banco central fija también la tasa larga comprando bonos: no es un decreto, y el costo se va a la moneda.',
      f: 'Tope a 10 años: si el mercado pide más, el banco compra',
      mv: [['π ↑', 'con i tope fija', 'r ↓', 'la postura se afloja sola'], ['Presión de mercado ↑', 'con i tope fija', 'compras ↑ → M ↑', 'yen ↓'], ['Tope ↑', 'con π fija', 'bonos ↓, yen ↑', 'y el carry se encarece']],
      brk: 'Dura mientras el mercado crea el tope y el banco aguante comprar. Con inflación, cualquier salida duele.',
      real: 'BoJ: el mercado pide 0.9 y el banco compra para que quede en 0.5 (ejemplo de clase).' },

    // ---------- S5
    { t: 'S5', name: 'Trilema', a: 'cambio/trilema',
      rule: 'De tipo de cambio fijo, capital libre y tasa propia, sólo puedes escoger dos.',
      f: 'Fijo + capital libre ⇒ i = i*',
      mv: [['i* ↑', 'con E fijo y capital libre', 'i ↑ obligada'], ['Quieres i propia', 'con capital libre', 'E tiene que flotar'], ['Quieres i propia', 'con E fijo', 'necesitas controles de capital']],
      brk: 'Rey (2013): aun flotando, el ciclo global limita tu tasa. Calvo y Reinhart: muchos que "flotan" intervienen.',
      real: 'Euro y Hong Kong; China y Bretton Woods; EUA y México desde 1995. México 1994 quiso las tres.' },
    { t: 'S5', name: 'Paridad con riesgo', a: 'cambio/uip-peg',
      rule: 'Con una paridad creíble tu tasa la fija otro; si te dudan, pagas un premio.',
      f: 'i = i* + (Eᵉ − E)/E + ρ',
      mv: [['ρ ↑', 'con i, i* y Eᵉ fijas', 'E ↑', 'el peso se deprecia hoy'], ['ρ ↑', 'con E, Eᵉ e i* fijas', 'i ↑', 'lo pagas en tasa'], ['Eᵉ ↑', 'con E, i* y ρ fijas', 'i ↑'], ['i* ↑', 'con i, Eᵉ y ρ fijas', 'E ↑']],
      brk: 'Un diferencial alto no es "tasa atractiva": es el premio por riesgo de devaluación e impago.',
      real: 'Eurozona: las tasas convergen a la alemana, se separan con Grecia y vuelven con el rescate.' },
    { t: 'S5', name: 'Fijo vs flexible', a: 'cambio/fijo-flex',
      rule: 'Fijar compra credibilidad; flotar compra amortiguador. Cuál conviene depende de qué le falta al país.',
      f: 'E fijo: ajustan reservas y producto &nbsp;·&nbsp; E flexible: ajusta E',
      mv: [['Choque externo malo', 'con E fijo', 'reservas ↓, i ↑, producto ↓'], ['Choque externo malo', 'con E flexible', 'E ↑', 'amortigua, con traspaso a precios']],
      brk: 'El fijo revienta si la salida llega tarde. Flotar pide instituciones y coberturas.',
      real: 'Con Trump el dólar subió y bajó en México; con paridad fija, la gente habría ido por las reservas.' },
    { t: 'S5', name: 'Ataque especulativo', a: 'cambio/ataques',
      rule: 'Si el capital no cubre el déficit, las reservas se van; y si defiendes sin dejar subir la tasa, se van más rápido.',
      f: 'CA + FA = ΔR &nbsp;·&nbsp; ΔMB = ΔNDA + ΔR',
      mv: [['FA ↓', 'con CA fijo', 'ΔR &lt; 0'], ['ΔR &lt; 0', 'con ΔMB ≈ 0 (esterilizas)', 'ΔNDA ↑ igual', 'i no sube y la salida sigue']],
      brk: 'Hay tres generaciones: déficit fiscal que drena reservas, defensa demasiado cara, y balances con deuda corta en dólares.',
      real: 'México 1994: las reservas cayeron antes de devaluar, por salida de capital y esterilización.' },
    { t: 'S5', name: 'Solvente pero ilíquido', a: 'cambio/stv',
      rule: 'Un país solvente puede caer si nadie le renueva: la deuda es chica frente al PIB, pero enorme frente a las reservas.',
      f: 'Lo que importa: deuda de corto plazo ÷ reservas',
      mv: [['Deuda corta ↑', 'con reservas fijas', 'fragilidad ↑'], ['Duda de que los demás renueven', 'con fundamentos fijos', 'puede salir el equilibrio malo', 'cada quien quiere cobrar primero']],
      brk: 'No todo es pánico: los fundamentos crean la vulnerabilidad; la estructura de la deuda la vuelve corrida.',
      real: 'Tesobonos 1994: <q>una idea maravillosa que salió mal</q> (clase). Sachs, Tornell y Velasco.' },
    { t: 'S5', name: 'Rendimiento del carry', a: 'cambio/carry',
      rule: 'No gana la tasa más alta: gana la tasa más el movimiento de la moneda, menos lo que cuesta pedir prestado.',
      f: 'R = i<sub>local</sub> ± ΔTC − i<sub>fondeo</sub>',
      mv: [['Moneda local se aprecia', 'con tasas fijas', 'R ↑'], ['i<sub>fondeo</sub> ↑', 'con i<sub>local</sub> y ΔTC fijos', 'R ↓'], ['Fed sube', 'con Banxico fijo', 'diferencial ↓ → carry ↓', 'el peso se debilita']],
      brk: 'No lo confundas con la UIP: la paridad dice que el diferencial se compensa; el carry apuesta a que no.',
      real: 'Colombia ganó con ≈15% de tasa porque su moneda se apreció; Turquía, con ≈44%, no.' },
    { t: 'S5', name: 'Tipo de cambio real', a: 'cambio/rer',
      rule: 'Si tus precios suben más que los de afuera y el tipo de cambio no se mueve, tu moneda se encarece aunque la pantalla no cambie.',
      f: 'ε = E · P*/P &nbsp;·&nbsp; E en pesos por dólar: E ↑ es depreciación',
      mv: [['P ↑', 'con E y P* fijos', 'ε ↓', 'apreciación real: X ↓, M ↑'], ['E ↑', 'con P y P* fijos', 'ε ↑', 'más competitivo'], ['P* ↑', 'con E y P fijos', 'ε ↑']],
      brk: 'Devaluar no compra competitividad si se traslada a precios: P sube y ε regresa.',
      real: 'Coches del profe: inflación 10% vs 5% con E quieto: ≈5% más caros al año, ≈20% en cuatro años.' },

    // ---------- S6
    { t: 'S6', name: 'Transformación de plazos', a: 'bancos/plazos',
      rule: 'Un banco pide prestado a la vista y presta a largo plazo: es su negocio y su punto débil.',
      f: 'Pasivo que se puede ir hoy · activo que vence en años',
      mv: [['Retiros ↑', 'con activos largos fijos', 'caja ↓', 'vende con descuento'], ['Tasas ↑', 'con plazo de activos fijo', 'valor de activos ↓', 'y los depósitos buscan más rendimiento']],
      brk: 'Es riesgo si el fondeo no es estable: ≈500 bancos de EUA tenían más riesgo de tasa que SVB; lo distinto de SVB fue su fondeo.',
      real: 'SVB: depósitos de startups, invertidos en bonos largos.' },
    { t: 'S6', name: 'Corrida como equilibrio autocumplido', a: 'bancos/dd',
      rule: 'Si crees que los demás van a correr, lo racional es correr tú; por eso un banco sano puede quebrar.',
      f: 'Conviene retirar si: pago si espero (f) &lt; pago si retiro (f)',
      mv: [['f ↑', 'con el balance fijo', 'pago si espero ↓'], ['f &gt; f*', 'con el balance fijo', 'todos retiran', 'equilibrio malo'], ['Caja o seguro ↑', 'con activos fijos', 'f* ↑', 'cuesta más que arranque el pánico']],
      brk: 'No toda corrida es autocumplida: si el banco es insolvente, correr es sólo adelantarse.',
      real: 'SVB 2023: 94% de depósitos sobre el límite del seguro y corrida digital en horas.' },
    { t: 'S6', name: 'Valor presente y duración', a: 'bancos/tasa',
      rule: 'Si suben las tasas, los bonos valen menos hoy; mientras más largos, más pierden.',
      f: 'VP = Flujo/(1 + r)<sup>t</sup> &nbsp;·&nbsp; ΔP = −Duración × Δy × P<sub>0</sub>',
      mv: [['Δy ↑', 'con duración y P<sub>0</sub> fijas', 'ΔP ↓'], ['Duración ↑', 'con Δy y P<sub>0</sub> fijos', 'pérdida ↑'], ['r ↑', 'con flujo fijo', 'VP ↓', 'más entre mayor sea t']],
      brk: 'Es lineal: sirve para movimientos moderados (dato general). HTM no muestra la pérdida, pero existe si te obligan a vender. Júzgala contra el capital.',
      real: 'SVB, AFS: −3.57 × 2.91% ≈ −10.4%. El HTM, con duración 6.2, tenía la pérdida grande.' },
    { t: 'S6', name: 'Capital e ICAP', a: 'bancos/capital',
      rule: 'El capital es el colchón contra pérdidas que no esperabas; lo esperado va a reservas.',
      f: 'ICAP = Capital regulatorio / Activos ponderados por riesgo',
      mv: [['Pérdida inesperada', 'con activos ponderados fijos', 'ICAP ↓'], ['Activos ponderados ↑', 'con capital fijo', 'ICAP ↓'], ['Cambias crédito por Treasuries', 'con capital fijo', 'ICAP ↑', 'aunque suba el riesgo de tasa']],
      brk: 'El ponderador mide crédito, no tasa: el soberano no computa, y por eso un ICAP alto no te salva de un SVB.',
      real: 'México: mínimo 10.5%, sistema ≈20%.' },
    { t: 'S6', name: 'Seguro y prestamista de última instancia', a: 'bancos/lolr',
      rule: 'Si te garantizan el dinero ya no tienes por qué correr; el costo es que bancos y clientes se cuidan menos.',
      f: 'Sin fórmula: elimina el equilibrio malo',
      mv: [['Cobertura ↑', 'con el balance fijo', 'incentivo a correr ↓', 'riesgo moral ↑'], ['Liquidez del banco central ↑', 'si el banco es solvente', 'sobrevive sin vender bonos']],
      brk: 'El seguro sólo protege lo cubierto, y prestar no arregla a un insolvente.',
      real: '2023: se cubrió más allá del límite. <q>Bailout a cambio de evitar el contagio.</q>' },

    // ---------- S7
    { t: 'S7', name: 'Riesgo físico vs transición', a: 'clima/fis-trans',
      rule: 'Físico: te pega el clima. Transición: te pega la respuesta al clima. Si el mundo actúa, baja uno y sube el otro.',
      f: 'ΔEBITDA = − Emisiones × Precio CO₂ × (1 − traslado) − Prob × Daño',
      mv: [['Precio CO₂ ↑', 'con emisiones y traslado fijos', 'ΔEBITDA más negativo'], ['Traslado ↑', 'con emisiones y precio fijos', 'ΔEBITDA menos negativo'], ['Prob ↑', 'con daño fijo', 'ΔEBITDA más negativo']],
      brk: 'Es un cálculo simple: si trasladas el costo, vendes menos, y hay activos varados. Lo peor es actuar tarde y de golpe: tienes los dos.',
      real: 'Retroceso ESG en EUA: un huracán no lee las reglas de la SEC.' },
    { t: 'S7', name: 'Costo social del carbono', a: 'clima/scc',
      rule: 'Es el daño, en dinero de hoy, de una tonelada más de carbono; casi todo depende de cuánto mides el daño y de cuánto te importa el futuro.',
      f: 'SCC = Σ<sub>t</sub> Daño<sub>t</sub> por tonelada / (1 + r)<sup>t</sup>',
      mv: [['r ↑', 'con daños fijos', 'SCC ↓'], ['Daño ↑', 'con r fija', 'SCC ↑'], ['Daño más lejano', 'con r fija', 'SCC ↓']],
      brk: 'No es sólo la tasa: la función de daños también abre la brecha. Y el SCC no es el precio de mercado del carbono.',
      real: '$100 de daño en 100 años: valen $24.9 con 1.4% (Stern) y $1.5 con 4.3% (Nordhaus).' },
    { t: 'S7', name: 'Tasa de descuento (Ramsey)', a: 'clima/scc',
      rule: 'Descontamos el futuro por impaciencia y porque creemos que será más rico.',
      f: 'r = ρ + η · g',
      mv: [['ρ ↑', 'con η y g fijas', 'r ↑ → SCC ↓'], ['g ↑', 'con ρ y η fijas', 'r ↑ → SCC ↓', 'si serán más ricos, cuentan menos'], ['η ↑', 'con ρ y g &gt; 0 fijas', 'r ↑ → SCC ↓']],
      brk: 'Si el clima frena el crecimiento, g baja y con ella r. Además, ρ es una decisión ética, no un dato.',
      real: 'Stern (≈1.4%, ética) vs Nordhaus (≈4.3%, mercado).' },
  ];

  // ------------------------------------------------------------------ ¿Qué pasa si…? {t, q, a: respuesta, ch: cadena, tool, link}
  const QS = [
    // S1
    { t: 'S1', q: 'Un país duplica su tasa de ahorro y nada más cambia. ¿Crecerá más para siempre?', a: 'No. Sube el nivel de vida; el crecimiento acelera sólo durante la transición.', ch: ['s ↑', 's·y supera la reposición', 'k ↑ hacia un k* mayor', 'rendimientos decrecientes', 'g<sub>y</sub> vuelve a g'], tool: 'Solow', link: 'crecimiento/solow' },
    { t: 'S1', q: 'Una guerra destruye la mitad del capital, pero tecnología e instituciones quedan intactas.', a: 'Después crece muy rápido por un rato: su meta no cambió.', ch: ['k ↓', 'k* igual', 'más lejos de su meta', 'crecimiento ↑ hasta reconstruir'], tool: 'Solow · Alemania y Francia', link: 'crecimiento/solow' },
    { t: 'S1', q: 'La población empieza a caer, con s, δ y g fijas.', a: 'Más capital por trabajador, pero menos PIB total y menos tendencia.', ch: ['n ↓', 'la recta de reposición se aplana', 'k* ↑ y y* ↑', 'PIB total crece a n + g: menos'], tool: 'Solow · Japón', link: 'crecimiento/solow' },
    { t: 'S1', q: 'Un país pobre, con instituciones débiles y ahorro bajo. ¿Va a alcanzar a los ricos?', a: 'No necesariamente: puede estar ya cerca de su propio techo.', ch: ['fundamentales malos', 'k* bajo', 'distancia corta a su meta', 'crecimiento bajo aunque sea pobre'], tool: 'Convergencia condicional', link: 'crecimiento/conv' },
    { t: 'S1', q: 'Se dispara la inversión en centros de datos y la PTF no cambia.', a: 'Sube el crecimiento por acumulación, y se apaga. Sólo será sostenido si la IA eleva A.', ch: ['g<sub>K</sub> ↑', 'g<sub>Y</sub> ↑ con g<sub>A</sub> igual', 'rendimientos decrecientes', 'el efecto se agota'], tool: 'Contabilidad del crecimiento · IA', link: 'crecimiento/ptf' },
    { t: 'S1', q: 'Un país invierte más cada año, con el mismo crecimiento del PIB y del trabajo.', a: 'Baja el crecimiento de su PTF: la resta le da menos residuo. La PTF sólo cae si g<sub>A</sub> se vuelve negativo.', ch: ['g<sub>K</sub> ↑', 'con g<sub>Y</sub> y g<sub>L</sub> fijos', 'g<sub>A</sub> = g<sub>Y</sub> − α·g<sub>K</sub> − (1−α)·g<sub>L</sub> ↓'], tool: 'PTF como residuo', link: 'crecimiento/ptf' },
    // S2
    { t: 'S2', q: 'Sube la bolsa, los hogares de EUA se sienten ricos y ahorran menos. El gobierno no cambia.', a: 'Sube el déficit comercial, aunque nadie toque la política comercial.', ch: ['S ↓', 'S − I ↓', 'con G − T fijo', 'X − M ↓'], tool: 'Identidad S − I', link: 'flujos/h-ident' },
    { t: 'S2', q: 'Se bajan impuestos sin recortar gasto. ¿Puede bajar a la vez el déficit comercial?', a: 'No, salvo que S − I suba más que el recorte. Si la gente sólo ahorra el recorte completo, X − M queda igual.', ch: ['T ↓', 'G − T ↑', 'con S − I fijo', 'X − M ↓'], tool: 'Déficit gemelos', link: 'flujos/h-aran' },
    { t: 'S2', q: 'EUA pone 25% de arancel a China y nada más cambia.', a: 'Baja el déficit con China, no el total: el comercio se desvía.', ch: ['τ ↑', 'M de China ↓', 'se compra a otro país', 'la moneda se aprecia: X ↓', 'X − M total igual'], tool: 'Aranceles · Bernanke', link: 'flujos/h-aran' },
    { t: 'S2', q: 'China refuerza salud y pensiones con gasto público.', a: 'Baja su superávit externo: los dos términos empujan igual.', ch: ['ahorro precautorio ↓', 'S − I ↓', 'además G − T ↑', 'X − M ↓'], tool: 'Identidad · ahorro precautorio', link: 'flujos/c-yang' },
    { t: 'S2', q: 'El nearshoring dispara la inversión en México, con S y G − T fijos.', a: 'Sube el déficit externo, y no es malo per se: financia capacidad y lo paga IED.', ch: ['I ↑', 'S − I ↓', 'X − M ↓', 'entra IED', 'BKA cubre el BCA'], tool: 'Identidad · balanza de pagos', link: 'flujos/h-bop' },
    { t: 'S2', q: 'Asia ahorra cada vez más y no invierte ese ahorro en casa.', a: 'Ese ahorro financia el gasto de EUA y crece su déficit.', ch: ['S de Asia ↑', 'capital a EUA', 'tasas de EUA ↓, dólar ↑', 'S − I de EUA ↓', 'X − M de EUA ↓'], tool: 'Global saving glut', link: 'flujos/c-bern' },
    // S3
    { t: 'S3', q: 'El gobierno gasta 100 con c = 0.8. ¿Cuánto sube el PIB, cerrada y con m = 0.2?', a: 'Cerrada: 500. Abierta: 250.', ch: ['ΔG = 100', '1/(1 − 0.8) = 5', '1/(1 − 0.8 + 0.2) = 2.5', 'parte se fuga a M'], tool: 'Multiplicador', link: 'fiscal/fx-multi' },
    { t: 'S3', q: 'El gobierno manda cheques y la gente los guarda.', a: 'El multiplicador se desploma: la cadena se apaga en pocas rondas.', ch: ['c ↓', '1/(1 − c) ↓', 'menos gasto en cada ronda', 'ΔY pequeño'], tool: 'Multiplicador · COVID', link: 'fiscal/fx-multi' },
    { t: 'S3', q: 'Con deuda de 60% del PIB, r sube 1 pp; g y pb no cambian.', a: 'La razón sube ≈0.6 pp más cada año.', ch: ['r ↑', 'r − g ↑', '(r − g) · d ↑', 'Δd ↑'], tool: 'r − g', link: 'fiscal/fx-deuda' },
    { t: 'S3', q: 'r = 1%, g = 1.3% y pb = 0. ¿Hay que ajustar?', a: 'No: la deuda baja frente al PIB sin superávit.', ch: ['r &lt; g', '(r − g) · d &lt; 0', 'Δd &lt; 0', 'pb* &lt; 0'], tool: 'r − g · Alemania', link: 'fiscal/fx-sost' },
    { t: 'S3', q: 'El peso se deprecia fuerte y parte de la deuda está en dólares, con x, i, π y g fijos.', a: 'Sube la deuda/PIB, aunque haya disciplina fiscal.', ch: ['ε ↑', 'b·α·ε ↑', 'Δb ↑'], tool: 'Fórmula del caso · México 1994–95', link: 'fiscal/fx-roscini' },
    { t: 'S3', q: 'Un gobierno muy endeudado hace austeridad en plena recesión.', a: 'Ambiguo: pb ayuda directo, pero g cae. La deuda/PIB puede subir al inicio.', ch: ['G ↓', 'pb ↑: Δd ↓', 'multiplicador: Y ↓', 'g ↓: r − g ↑', 'Δd ↑'], tool: 'r − g · multiplicador', link: 'fiscal/fx-deuda' },
    { t: 'S3', q: 'El mercado empieza a dudar de la solvencia de un país, con g y pb fijos.', a: 'Puede autocumplirse: la duda encarece la deuda y eso justifica la duda.', ch: ['prima ↑', 'r ↑', 'pb* ↑', 'ajuste más difícil', 'más duda'], tool: 'pb* · Grecia vs Japón', link: 'fiscal/fx-roscini' },
    // S4
    { t: 'S4', q: 'La Fed deja las tasas iguales y la inflación sigue bajando.', a: 'Sube la tasa real: la política se aprieta sin moverse, y los emergentes tienen menos margen para bajar.', ch: ['π ↓', 'con i fija', 'r ↑', 'menos margen para emergentes'], tool: 'Fisher (ejemplo del profe, clase 28-oct)', link: 'monetaria/mon-fisher' },
    { t: 'S4', q: 'Banxico baja 25 pb y la inflación baja 50 pb.', a: 'La política es más restrictiva, aunque el titular diga "baja la tasa".', ch: ['i ↓ 25', 'π ↓ 50', 'r ↑ 25 pb'], tool: 'Fisher', link: 'monetaria/mon-fisher' },
    { t: 'S4', q: 'Sube la inflación esperada, con la tasa real requerida fija.', a: 'Sube la tasa nominal: una tasa alta no significa política dura.', ch: ['πᵉ ↑', 'con r fija', 'i ↑'], tool: 'Fisher · Argentina y Turquía', link: 'monetaria/mon-fisher' },
    { t: 'S4', q: 'El BoJ sube su tasa y Banxico no se mueve.', a: 'Yen más fuerte y peso más débil.', ch: ['i¥ ↑', 'R ↓', 'desarman el carry', 'venden pesos, compran yenes', 'S ↑ (pesos por yen)'], tool: 'Carry trade', link: 'monetaria/mon-carry' },
    { t: 'S4', q: 'Banxico baja su tasa con i* y E(S₁) fijas.', a: 'El peso se deprecia hoy.', ch: ['i ↓', 'i − i* ↓', 'con E(S₁) fija', 'S ↑'], tool: 'Paridad descubierta', link: 'monetaria/mon-paridades' },
    { t: 'S4', q: 'México sube su tasa, con el spot y la tasa de EUA fijos. ¿Qué pasa con el forward?', a: 'Sube: el dólar a futuro sale más caro en pesos.', ch: ['i ↑', '(1 + i)/(1 + i*) ↑', 'F ↑'], tool: 'Paridad cubierta', link: 'monetaria/mon-paridades' },
    { t: 'S4', q: 'Con el tope de 10 años vigente, la inflación de Japón sube.', a: 'La política se afloja sola y aparece el dilema: tasa o moneda.', ch: ['π ↑', 'con i tope fija', 'r ↓', 'compra más bonos', 'yen ↓', 'importaciones caras: π ↑'], tool: 'YCC · caso BoJ', link: 'monetaria/mon-ycc' },
    { t: 'S4', q: 'Choque petrolero: inflación arriba de la meta y producto debajo del potencial.', a: 'Taylor no da una sola señal: hay dilema.', ch: ['π − π* ↑: pide subir', 'brecha ↓: pide bajar', 'el banco elige qué sacrificar'], tool: 'Regla de Taylor', link: 'monetaria/mon-tasa' },
    { t: 'S4', q: 'Un gobierno sin acceso a deuda financia su déficit imprimiendo.', a: 'Baja la deuda/PIB de corto plazo y sube la inflación.', ch: ['m ↑', 'Δb ↓', 'M ↑', 'con V y Q fijos: P ↑'], tool: 'Teoría cuantitativa · deuda con emisión', link: 'monetaria/mon-raices' },
    // S5
    { t: 'S5', q: 'México tiene paridad fija y capital libre. EUA sube su tasa.', a: 'México debe subir la suya. Si no, sale capital y caen reservas.', ch: ['i* ↑', 'i − i* ↓', 'sale capital', 'ΔR &lt; 0', 'MB ↓ hasta i = i*'], tool: 'Trilema', link: 'cambio/trilema' },
    { t: 'S5', q: 'Inflación de 10% en México y 5% en EUA, con E quieto.', a: 'El peso se aprecia en términos reales: México pierde competitividad.', ch: ['P sube más que P*', 'con E fijo', 'ε ↓', 'X ↓, M ↑', 'X − M ↓'], tool: 'Tipo de cambio real', link: 'cambio/rer' },
    { t: 'S5', q: 'Sale capital y el banco central esteriliza para que no suba la tasa.', a: 'Se acelera la pérdida de reservas: la señal de ajuste está apagada.', ch: ['ΔR &lt; 0', 'ΔNDA ↑ igual', 'ΔMB ≈ 0', 'i no sube', 'la salida sigue'], tool: 'Ataque especulativo · México 1994', link: 'cambio/ataques' },
    { t: 'S5', q: 'La deuda de corto plazo en dólares supera las reservas, con buenos fundamentos.', a: 'Es solvente, pero caben dos equilibrios: renuevan, o corren.', ch: ['deuda corta &gt; reservas', 'si los demás no renuevan, no alcanza', 'conviene ser el primero en cobrar', 'crisis autocumplida'], tool: 'Equilibrios múltiples · Sachs, Tornell y Velasco', link: 'cambio/stv' },
    { t: 'S5', q: 'Cae el precio de lo que exporta un país que flota.', a: 'Se deprecia y amortigua; el costo es inflación por traspaso.', ch: ['X ↓', 'E ↑', 'ε ↑', 'exportar vuelve a convenir', 'P ↑ parcial'], tool: 'Fijo vs flexible', link: 'cambio/fijo-flex' },
    { t: 'S5', q: 'Sube la prima de riesgo de México por incertidumbre, con i, i* y Eᵉ fijas.', a: 'El peso se deprecia hoy. Para evitarlo, Banxico tendría que subir i.', ch: ['ρ ↑', '(Eᵉ − E)/E debe bajar', 'E ↑'], tool: 'Paridad con riesgo', link: 'cambio/uip-peg' },
    { t: 'S5', q: 'De golpe deja de entrar capital a un país con déficit externo y pocas reservas.', a: 'El déficit se cierra a la fuerza: depreciación y recesión.', ch: ['FA ↓', 'ΔR &lt; 0 hasta agotarse', 'E ↑', 'gasto ↓, M ↓', 'CA ↑'], tool: 'Balanza de pagos · 1995', link: 'cambio/pill' },
    { t: 'S5', q: 'La Fed sube y Banxico no se mueve.', a: 'El peso se debilita: el diferencial se estrecha.', ch: ['i* ↑', 'diferencial ↓', 'carry menos atractivo', 'entra menos capital', 'E ↑'], tool: 'Carry trade · paridad', link: 'cambio/carry' },
    // S6
    { t: 'S6', q: 'Las tasas suben 3 pp y el banco tiene bonos con duración 6.', a: 'Pierden ≈18% de valor, aunque paguen todo al vencer.', ch: ['Δy = +3%', '−6 × 3%', 'ΔP ≈ −18%', 'compáralo contra el capital'], tool: 'Duración', link: 'bancos/tasa' },
    { t: 'S6', q: 'Dos bancos con los mismos bonos: uno con depósitos asegurados y otro casi sin seguro.', a: 'Corre el segundo: la misma pérdida, otro fondeo.', ch: ['sin seguro', 'miedo a ser el último', 'f ↑', 'vende bonos', 'la pérdida se realiza'], tool: 'Diamond y Dybvig · SVB', link: 'bancos/svb' },
    { t: 'S6', q: 'Corre un rumor en redes sobre un banco sano.', a: 'Puede quebrar de verdad: la creencia basta.', ch: ['creo que corren', 'f ↑', 'pago si espero ↓', 'f &gt; f*', 'corrida'], tool: 'Corrida autocumplida', link: 'bancos/dd' },
    { t: 'S6', q: 'La autoridad garantiza todos los depósitos, sin límite.', a: 'Se acaba la corrida; sube el riesgo moral.', ch: ['nadie pierde por esperar', 'desaparece el equilibrio malo', 'menos vigilancia al banco', 'riesgo moral ↑'], tool: 'Seguro de depósitos · 2023', link: 'bancos/lolr' },
    { t: 'S6', q: 'Un banco insolvente pide ayuda al prestamista de última instancia.', a: 'La liquidez no lo arregla: sólo aplaza la pérdida.', ch: ['activos &lt; pasivos', 'prestar no crea capital', 'la pérdida sigue'], tool: 'Ilíquido vs insolvente', link: 'bancos/lolr' },
    { t: 'S6', q: 'Un banco cambia crédito por bonos del Tesoro largos, con el mismo capital.', a: 'Sube el ICAP y sube el riesgo de tasa: el indicador no lo ve.', ch: ['activos ponderados ↓', 'ICAP ↑', 'duración ↑', 'más pérdida si Δy ↑'], tool: 'ICAP · duración', link: 'bancos/capital' },
    { t: 'S6', q: 'Crece el crédito privado y le quita negocio a los bancos.', a: 'El riesgo no desaparece: se muda a donde no hay ICAP, seguro ni prestamista.', ch: ['regulación estricta en bancos', 'arbitraje regulatorio', 'crédito fuera del banco', 'menos red de seguridad'], tool: 'Intermediación no bancaria', link: 'bancos/nobank' },
    // S7
    { t: 'S7', q: 'Sube el precio del carbono y la empresa no puede trasladarlo.', a: 'Riesgo de transición: cae el EBITDA en todo el costo.', ch: ['Precio CO₂ ↑', 'traslado = 0', 'ΔEBITDA más negativo'], tool: 'Físico vs transición', link: 'clima/fis-trans' },
    { t: 'S7', q: 'Los huracanes se vuelven más frecuentes, con el mismo daño por evento.', a: 'Riesgo físico: sube el daño esperado y el costo del seguro.', ch: ['Prob ↑', 'Prob × Daño ↑', 'ΔEBITDA más negativo', 'seguros más caros'], tool: 'Físico vs transición', link: 'clima/fis-trans' },
    { t: 'S7', q: 'Un regulador baja la tasa de descuento de 4.3% a 1.4%.', a: 'El SCC sube mucho: el daño de dentro de 100 años vale ≈17 veces más.', ch: ['r ↓', '1/(1 + r)<sup>t</sup> ↑', 'daños lejanos pesan', 'SCC ↑'], tool: 'SCC · Stern vs Nordhaus', link: 'clima/scc' },
    { t: 'S7', q: 'Se espera que las generaciones futuras sean mucho más ricas, con ρ y η fijas.', a: 'Baja el SCC: un peso les vale menos.', ch: ['g ↑', 'r = ρ + η·g ↑', 'SCC ↓'], tool: 'Regla de Ramsey', link: 'clima/scc' },
    { t: 'S7', q: 'Nueva evidencia indica que el daño por grado es mucho mayor, con r fija.', a: 'Sube el SCC, sin tocar la tasa: también se mueve por la función de daños.', ch: ['Daño ↑', 'con r fija', 'SCC ↑'], tool: 'Función de daños', link: 'clima/ecc' },
    { t: 'S7', q: 'El mundo no hace nada por años y luego actúa de golpe.', a: 'El peor escenario: pagas los dos riesgos.', ch: ['sin acción: físico ↑', 'giro tarde: transición ↑', 'activos varados y daños'], tool: 'Físico vs transición', link: 'clima/fis-trans' },
    { t: 'S7', q: 'EUA relaja sus reglas climáticas, y el clima sigue igual.', a: 'Baja el riesgo de transición en EUA, no el físico; el resto del mundo sigue con ISSB.', ch: ['menos regulación', 'transición ↓ en EUA', 'físico igual', 'quien exporta sigue reportando'], tool: 'Físico vs transición · ISSB', link: 'clima/issb' },
  ];

  // ------------------------------------------------------------------ mapa: cada nodo con el tema al que pertenecen sus símbolos
  const MAP = [
    { title: 'Del dinero caliente al régimen', nodes: [['monetaria', 'Fisher: r ≈ i − π'], ['monetaria', 'Paridad: i − i* ≈ depreciación esperada'], ['monetaria', 'Carry: apuesta a que no se cumpla'], ['cambio', 'Volatilidad: E ↑ cuando desarman'], ['cambio', 'Trilema: flotas y la absorbes, o fijas y pierdes tasa']], why: 'La inflación da la tasa real, el diferencial atrae capital y ese capital puede irse de golpe.' },
    { title: 'La deuda y el banco central', two: true, nodes: [['monetaria', 'Tasa de política ↑'], ['fiscal', 'r − g ↑'], ['fiscal', 'pb* ↑'], ['monetaria', 'Sin ajuste: m ↑'], ['monetaria', 'π ↑, luego i ↑']], why: 'El banco central mueve el costo de la deuda, y una deuda sin ajuste presiona de regreso al banco central.' },
    { title: 'El gasto y la competitividad', two: true, nodes: [['flujos', 'S − I ↓: gasto de más'], ['flujos', 'X − M ↓: hay que financiarlo'], ['flujos', 'BKA ↑: entra capital'], ['cambio', 'ε ↓: apreciación real']], why: 'Si el capital se detiene, la cadena corre al revés: E ↑, ε ↑ y X − M ↑. Es México 1994–95.' },
    { title: 'Crecimiento con ahorro ajeno', nodes: [['crecimiento', 'Cerrada: S = I'], ['flujos', 'Abierta: I puede superar S'], ['crecimiento', 'k ↑ más rápido'], ['flujos', 'Pero CA &lt; 0: hay que pagar']], why: 'Solow dice cuánto produces; la identidad, quién lo compra y quién lo financia.' },
    { title: 'De la tasa a la corrida', nodes: [['monetaria', 'Banco central: i ↑'], ['bancos', 'ΔP = −Duración × Δy × P<sub>0</sub>'], ['bancos', 'Capital ↓'], ['bancos', 'f ↑: corrida'], ['bancos', 'Seguro y prestamista']], why: 'La política monetaria puede volverse un problema de estabilidad bancaria: SVB.' },
    { title: 'La misma corrida, en país y en banco', two: true, nodes: [['cambio', 'Deuda corta &gt; reservas'], ['bancos', 'Depósitos a la vista &gt; caja']], why: 'Tesobonos y SVB son el mismo juego: si todos renuevan no pasa nada, y nadie sabe si los demás van a renovar.' },
    { title: 'Todo lo lejano sufre con la tasa', two: true, nodes: [['bancos', 'VP = Flujo/(1 + r)<sup>t</sup>'], ['clima', 'SCC: daños a 100 años'], ['clima', 'r = ρ + η·g']], why: 'Un daño climático lejano es como un bono de duración enorme: un cambio en r mueve mucho su valor.' },
  ];

  // ------------------------------------------------------------------ html
  const SEC = (t) => E.TOPIC_SEC[t];
  const mvHtml = (m) => `<li><b>${m[0]}</b> <span class="sx-int-cp">${m[1]}</span> <span class="sx-int-to">→</span> <b>${m[2]}</b>${m[3] ? ` <span class="sx-int-nt">· ${m[3]}</span>` : ''}</li>`;
  const ideaHtml = (d) => `<article class="sx-int-c">
      <div class="sx-int-k">${E.link(d.a, d.name)}</div>
      <p class="sx-int-r">${d.rule}</p>
      <div class="sx-int-f">${d.f}</div>
      <ul class="sx-int-mv">${d.mv.map(mvHtml).join('')}</ul>
      <p class="sx-int-x"><span class="sx-int-l bad">Se rompe</span> ${d.brk}</p>
      <p class="sx-int-x"><span class="sx-int-l">En la realidad</span> ${d.real}</p>
    </article>`;
  const qHtml = (c) => `<article class="sx-int-c sx-int-q" data-t="${c.t}" data-sec="${SEC(c.t)}">
      <div class="sx-int-k">${c.t} · ¿Qué pasa si…?</div>
      <p class="sx-int-r">${c.q}</p>
      ${E.reveal('Ver respuesta', `<p class="sx-int-a">${c.a}</p><p class="sx-int-ch">${c.ch.map((s) => `<span>${s}</span>`).join(' <span class="sx-int-to">→</span> ')}</p><p class="sx-int-x"><span class="sx-int-l">Herramienta</span> ${E.link(c.link, c.tool)}</p>`)}
    </article>`;
  const filter = (id) => `<div class="btnrow" id="${id}"><button class="btn sm on" type="button" data-t="">Todos</button>${TOPICS.map(([k, l]) => `<button class="btn sm" type="button" data-t="${k}">${l}</button>`).join('')}</div>`;
  const CSS = `<style>
    .sx-int-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;align-items:start;margin:10px 0 18px}
    @media(min-width:1180px){.sx-int-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    .sx-int-c{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px;min-width:0}
    .sx-int-c[hidden],.sx-int-topic[hidden]{display:none}
    .sx-int-k{font-size:12px;font-weight:600;color:var(--muted)}
    .sx-int-r{font-size:15px;font-weight:650;line-height:1.35;margin:3px 0 8px;color:var(--ink)}
    .sx-int-f{background:var(--surface);border:1px solid var(--line2);border-radius:8px;padding:5px 9px;font-size:13px;line-height:1.55;overflow-wrap:anywhere;color:var(--ink2)}
    .sx-int-mv{list-style:none;margin:8px 0;padding:0 0 0 10px;border-left:3px solid var(--accent);font-size:13.5px;line-height:1.4}
    .sx-int-mv li{margin:4px 0}
    .sx-int-cp{color:var(--muted);font-style:italic}
    .sx-int-nt{color:var(--ink2)}
    .sx-int-to{color:var(--accent-ink);font-weight:700}
    .sx-int-x{font-size:13px;line-height:1.4;margin:5px 0 0;color:var(--ink2)}
    .sx-int-l{font-weight:700;color:var(--accent-ink);margin-right:3px}
    .sx-int-l.bad{color:var(--bad)}
    .sx-int-a{font-weight:600;margin:0 0 6px;color:var(--ink);font-size:14px}
    .sx-int-ch{font-size:13.5px;line-height:1.5;margin:0;overflow-wrap:anywhere}
    .sx-int-map{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;margin:10px 0 18px}
    .sx-int-row{display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;margin:6px 0}
    .sx-int-node{display:inline-block;background:var(--accent-wash);border-radius:7px;padding:2px 8px;font-size:13px;line-height:1.4;max-width:100%;overflow-wrap:anywhere}
  </style>`;

  E.section({
    id: 'intuicion', n: 85, group: 'examen', icon: '🧭', short: 'Reglas de dedo', exam: 'star',
    title: 'Reglas de dedo: la idea detrás de cada fórmula',
    lead: 'Libro cerrado: entiende qué se mueve con qué, y la fórmula se reconstruye sola. Una frase para repetir, las flechas con lo que queda fijo, dónde falla y un caso real.',
    render(root) {
      // El glosario toma A, Y y E tras signo o al inicio de texto como palabras; el separador invisible los deja marcar como símbolos.
      const sym = (h) => h.replace(/(^|[\s>])([AYE])(?=\s*(?:↑|↓|fij|flex|tiene))/g, '$1⁠$2');
      root.innerHTML = sym(`${CSS}
      ${E.key(`<b>En cada pregunta:</b> di qué se mueve, qué dejas fijo y hacia dónde va lo demás. Sin el "qué dejas fijo", la flecha no vale.<br><a href="#/intuicion/int-reglas">${IDEAS.length} reglas por tema</a> · <a href="#/intuicion/int-qps">${QS.length} tarjetas ¿Qué pasa si…?</a> · <a href="#/intuicion/int-mapa">Mapa entre herramientas</a>`, 'Cómo usar esta sección')}
      ${E.tip('<q>Ayuda mucho ver los signos porque te hace ser consistente, pero en términos de la intuición, la intuición es muy clara. Si hay un déficit es porque hay un exceso de gasto.</q>', 'Clase 14-oct')}

      <h2 id="int-reglas">Las reglas, tema por tema</h2>
      <p class="small muted">Las flechas son ceteris paribus: cada una vale sólo con lo que dice que queda fijo. Toca un símbolo para ver qué es.</p>
      ${filter('intF1')}
      ${TOPICS.map(([k, l]) => `<section class="sx-int-topic" data-t="${k}" data-sec="${SEC(k)}">
        <h3>${k} · ${l}</h3>
        ${TIPS[k] ? E.tip(TIPS[k][0], TIPS[k][1]) : ''}
        <div class="sx-int-grid">${IDEAS.filter((d) => d.t === k).map(ideaHtml).join('')}</div>
      </section>`).join('')}

      <h2 id="int-qps">¿Qué pasa si…?</h2>
      <p class="prose">Responde en voz alta antes de abrir: dirección, cadena y herramienta. Es justo lo que pide un ensayo de noticia. Salvo que la tarjeta diga otra cosa, lo demás queda fijo.</p>
      ${filter('intF2')}
      <p class="small muted" id="intN"></p>
      <div class="sx-int-grid">${QS.map(qHtml).join('')}</div>

      <h2 id="int-mapa">Mapa: cómo se conectan las herramientas</h2>
      <p class="prose">Un ensayo sube de nivel cuando une dos temas. Estas son las uniones que más rinden; <b>↔</b> indica que el efecto también regresa.</p>
      <div class="sx-int-map">${MAP.map((m) => `<article class="sx-int-c"><div class="sx-int-r">${m.title}</div><div class="sx-int-row">${m.nodes.map(([s, n]) => `<span class="sx-int-node" data-sec="${s}">${n}</span>`).join(`<span class="sx-int-to">${m.two ? '↔' : '→'}</span>`)}</div><p class="sx-int-x">${m.why}</p></article>`).join('')}</div>
      `);

      const wire = (id, sel, after) => {
        const bar = root.querySelector('#' + id), items = root.querySelectorAll(sel);
        const apply = (t) => { items.forEach((x) => { x.hidden = !!t && x.dataset.t !== t; }); if (after) after(t); };
        bar.addEventListener('click', (ev) => {
          const b = ev.target.closest('button'); if (!b) return;
          bar.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
          apply(b.dataset.t);
        });
        apply('');
      };
      wire('intF1', '.sx-int-topic');
      wire('intF2', '.sx-int-q', (t) => {
        const n = t ? QS.filter((c) => c.t === t).length : QS.length;
        root.querySelector('#intN').textContent = `${n} tarjetas${t ? ` de ${t}` : ''}`;
      });
    },
  });
})();
