// Sección 86 — Puntos clave: qué retener de cada documento y cómo usarlo en el examen.
// No repite los resúmenes de s10–s70. Cada cifra sale del documento citado, con su año. Lo de "hoy" sale de E.news (verificado al 2-nov-2026).
(function () {
  const TOPICS = [['S1', '📈 Crecimiento'], ['S2', '🌐 Flujos'], ['S3', '🏛️ Fiscal'], ['S4', '🏦 Monetaria'], ['S5', '💱 Cambio'], ['S6', '🏧 Bancos'], ['S7', '🌡️ Clima']];
  const READ = {
    ok: 'Leído del documento',
    canvas: 'Leído del PDF de Canvas',
    web: 'Discurso que enlaza Canvas',
    opt: 'Video opcional, sin resumen',
  };
  const STATE = {
    sigue: 'Sigue vigente',
    cambio: 'Cambió de forma',
    vieja: 'La foto ya es vieja',
  };

  // ------------------------------------------------------------------ Panorama
  const IDEAS = [
    {
      t: 'Los desequilibrios son ahorro menos inversión, no aduana', sec: 'S2', st: 'cambio',
      doc: 'Bernanke (2005) acepta que el poco ahorro de EUA es la causa inmediata de su déficit externo (≈5.5% del PIB en 2004), pero busca la causa de fondo afuera: un exceso de ahorro mundial que bajó las tasas e infló activos. Yang et al. (2025) muestran el otro lado: China ahorró 53% del PIB y tuvo un superávit externo mayor a 9% en 2008.',
      hoy: 'La identidad sigue valiendo, pero los números no son los de 2004: en el 2T-2026 el déficit de EUA fue 3.0% del PIB (BEA). Además, el déficit comercial de agosto volvió a superar los $100 mil millones pese a los aranceles. El empuje ya no es la vivienda de entonces, sino la inversión ligada a IA y el déficit público.',
      src: 'Bernanke; Yang et al.', tool: 'S − I = CA',
    },
    {
      t: 'El capital no siempre va de ricos a pobres', sec: 'S2', st: 'sigue',
      doc: 'Solow predice que el capital debería ir hacia donde escasea, y Rodriguez (2011) deja la pregunta abierta. Bernanke da el dato incómodo: los emergentes pasaron de un déficit de $87.5 mil millones a un superávit de $205 mil millones entre 1996 y 2003, tras sus crisis.',
      hoy: 'EUA sigue recibiendo: su posición de inversión internacional es de −$22.42 billones (BEA, 2T-2026). El dólar como reserva permite sostenerlo, aunque el saldo crece.',
      src: 'Rodriguez; Bernanke', tool: 'Solow; cuenta financiera',
    },
    {
      t: 'Un déficit externo no es malo en sí: importa quién lo financia', sec: 'S5', st: 'sigue',
      doc: 'La nota de balanza de pagos (2026) muestra a México en 2024 con déficit corriente de $6.0 mil millones (−0.4% del PIB): pierde 3.7% del PIB en ingreso primario, sobre todo utilidades de empresas extranjeras, y recupera 4.5% con remesas; la IED neta es 2.3%. En abril de 2026 las reservas de $257.1 mil millones cubrían ≈4.7 meses de importaciones, contra menos de dos semanas en diciembre de 1994.',
      hoy: 'Las reservas siguen en ≈$257 mil millones (Banxico, oct-2026). La IED marcó récord semestral, pero casi 90% fue reinversión (Secretaría de Economía, 2026). La reinversión sí cuenta como IED según la nota, así que esa cifra financia la balanza sin probar que lleguen fábricas nuevas. Esta última parte es una lectura con la herramienta, no un hecho reportado.',
      src: 'Nota de balanza de pagos; Sachs et al.', tool: 'Balanza de pagos; calidad del financiamiento',
    },
    {
      t: 'Ensamblar mucho no es lo mismo que capturar valor', sec: 'S2', st: 'cambio',
      doc: 'La nota de Apple (2026, con datos a 2025) lo muestra con la curva de la sonrisa: el valor está en diseño y servicios, no en armar. China subió de ensamblador a proveedor con política industrial; la nota dice que México no tiene un mecanismo parecido para ligar el ensamble con proveedores locales. Tabellini ya lo medía: contenido nacional de 6.8% en electrónicos en 2006.',
      hoy: 'La nota llega a diciembre de 2025 y aquí no hay un dato verificado más reciente sobre la cadena de Apple. Lo que sigue vivo es el marco: aranceles de EUA vigentes y T-MEC sin prórroga (2026). Que la nota llame a México principal beneficiario del nearshoring no cuadra del todo con una IED con sólo 7.8% de nuevas inversiones en 2026.',
      src: 'Nota de Apple; Tabellini; Kehoe y Xu', tool: 'Efectos de aranceles; derramas; PTF',
    },
    {
      t: 'China creció con incentivos, ahorro e inversión', sec: 'S1', st: 'cambio',
      doc: 'Yang et al. atribuyen el 9.27% anual de 1978–2018 a reformas graduales: incentivos, precios, apertura, migración y reasignación desde las empresas estatales. Warnock y Walsh (2024) muestran que en 2000 China ya se veía bajo su estado estacionario.',
      hoy: 'El motor de inversión se está apagando: en 2026 la inversión fija acumulada cae 7.2% y la inmobiliaria 20.6%, con el PIB del 3T en 4.5% (Oficina Nacional de Estadística). Es la predicción de los rendimientos decrecientes, no un accidente.',
      src: 'Yang et al.; Warnock y Walsh; Kehoe y Xu', tool: 'Solow; contabilidad del crecimiento',
    },
    {
      t: 'Si China no consume lo que produce, el excedente sale al mundo', sec: 'S2', st: 'sigue',
      doc: 'Yang et al. señalan que el plan 2016–20 ya bajaba la meta de crecimiento por demanda débil, deuda y sobrecapacidad, y que el estímulo de 2009 (≈14% del PIB de 2008) dejó problemas de deuda local. Kehoe y Xu (2025) añaden que China subió por la cadena de valor y ahora compite en electrónicos, autos y paneles solares.',
      hoy: 'El superávit de China se acerca a su récord, con exportaciones +36.3% en septiembre de 2026 (AP). La conexión con la sobrecapacidad es una interpretación con la identidad: demanda interna floja y excedente externo. Los aranceles de un socio desvían ese excedente, no lo eliminan.',
      src: 'Yang et al.; Kehoe y Xu; Bernanke', tool: 'S − I = CA; efectos de aranceles',
    },
    {
      t: 'La desaceleración de China también es demográfica', sec: 'S1', st: 'sigue',
      doc: 'Kehoe y Xu proyectan menor crecimiento al acercarse a la frontera y con fertilidad de 1.0 hijos por mujer (2023). Yang et al. miden el fin del bono: la razón de dependencia bajó de 68% (1980) a 37% (2010) y se proyecta en 63% para 2050.',
      hoy: 'Sigue siendo el marco, con un matiz: un estudio del NBER de 2026 asocia la baja natalidad con más PIB por trabajador vía automatización. Envejecer no significa automáticamente crecer menos; el efecto de la población es ambiguo, como ya advertían Warnock y Walsh.',
      src: 'Kehoe y Xu; Yang et al.; Warnock y Walsh', tool: 'Solow; PTF; bono demográfico',
    },
    {
      t: 'EUA: déficit de tamaño de crisis, ahora con tasas que sí cuestan', sec: 'S3', st: 'cambio',
      doc: 'Murphy (2022) cuenta dos rescates masivos, en 2008 y 2020, con tasas muy bajas: la Fed pasó de $895 mil millones en activos (2008) a más de $6.1 billones (2020). Roscini y Schlefer (2013) dan la aritmética: deuda, balance primario, tasa, crecimiento, inflación y depreciación. Bloomberg Economics (abril de 2024) le pone números: la oficina de presupuesto veía la deuda de 97% del PIB (2023) a 116% (2034), 123% con las tasas de mercado, y 88% de un millón de simulaciones daba una razón creciente.',
      hoy: 'Murphy termina en 2020 y ese mundo de tasas bajas ya no existe. El año fiscal 2026 cerró con déficit de ≈$2 billones (6.2% del PIB) sin recesión e intereses 11% más altos, y la Fed está en 3.75–4.00% con dos votos a favor de subir (oct-2026). Por eso r − g pesa más que en los casos. Las proyecciones de Bloomberg son de 2024: úsalas para el método, no como pronóstico vigente.',
      src: 'Murphy; Roscini y Schlefer; Bernanke; Bloomberg', tool: 'Dinámica de la deuda; Fisher',
    },
    {
      t: 'México se abrió mucho y creció poco: el cuello es la productividad', sec: 'S2', st: 'sigue',
      doc: 'Kehoe y Xu explican el contraste con China por el momento de la apertura, la falta de PTF y barreras como el Estado de derecho y el sistema financiero. Tabellini (2024) añade por qué la inversión no derramó: en 2006 el contenido nacional era de 6.8% en electrónicos y 14.2% en equipo de transporte.',
      hoy: 'La IED marcó récord semestral en 2026 ($34,968 millones), pero casi 90% fue reinversión y sólo 7.8% nuevas inversiones (Secretaría de Economía). Eso no prueba una ola de nearshoring, y capital sin derramas no mueve la PTF.',
      src: 'Kehoe y Xu; Tabellini', tool: 'Contabilidad del crecimiento; IED',
    },
    {
      t: 'México depende de EUA, y eso ya es tema de negociación', sec: 'S2', st: 'cambio',
      doc: 'Tabellini documenta que 77.85% de las exportaciones de México iba a EUA en 2018 y que la recesión de EUA se transmitió por las fábricas de exportación: −6.6% del PIB en 2009. El caso se queda en la promesa del T-MEC.',
      hoy: 'La promesa hoy está en duda: EUA no prorrogó el T-MEC el 1 de julio de 2026 y sigue sin cerrarse el acuerdo arancelario (acero y aluminio 50%, autos 25%). Se esperan definiciones después del 3 de noviembre: revisa qué salió antes del examen.',
      src: 'Tabellini; Kehoe y Xu', tool: 'Efectos de aranceles; S − I = CA',
    },
    {
      t: 'México ya cayó dos veces con tipo de cambio fijo, por razones distintas', sec: 'S3', st: 'cambio',
      doc: 'En 1976 el problema fue público: tras la crisis de legitimidad de 1968, el déficit del sector público subió de ≈2% a más de 8% del PIB y la deuda externa pasó de ≈$7,000 a ≈$20,000 millones (1970–76), hasta romper la paridad de 12.50 que venía de 1954. En 1994 fue privado: el saldo ahorro menos inversión privado llegó a −8.4% del PIB con el público en +0.5% (Sachs et al.).',
      hoy: 'El régimen ya no es fijo, así que la presión aparece en el peso y no en una paridad. La pregunta fiscal sigue abierta: en el Paquete 2027 r > g con los supuestos oficiales (cálculo de esta guía) y el apoyo a Pemex funciona como pasivo contingente.',
      src: 'Nota México 1960–1976; Sachs et al.; Pill', tool: 'S − I = (G − T) + (X − M); dinámica de la deuda',
    },
    {
      t: 'Los emergentes caen por liquidez antes que por solvencia', sec: 'S5', st: 'cambio',
      doc: 'Pill (2002) y Sachs, Tornell y Velasco (1996) cuentan México 1994: sin crisis fiscal clásica, pero con deuda corta en dólares mayor que las reservas. Sachs et al. añaden que las reservas ($29 mil millones en febrero, ≈$6 en diciembre de 1994) cayeron por la expansión del crédito con que se frenó el alza de tasas, no sólo por la pérdida de confianza. Roscini y Schlefer muestran que por la depreciación la deuda pública saltó de 30% a 47% del PIB entre 1993 y 1995.',
      hoy: 'México cambió de régimen, así que el choque ya pega en el precio y no en las reservas: el peso perdió casi 6% en septiembre de 2026 mientras las reservas siguen en ≈$257 mil millones (Banxico, oct-2026). El régimen de banda de Argentina es el recordatorio de que la pregunta sigue viva.',
      src: 'Pill; Sachs et al.; Roscini y Schlefer; Bernanke', tool: 'Trilema; ataques especulativos',
    },
    {
      t: 'Japón es un riesgo global porque su dinero barato está afuera', sec: 'S4', st: 'vieja',
      doc: 'Misawa (2024) deja al BoJ con un control de la curva cada vez más flexible (referencia de 1% en julio de 2023) y con ¥531 billones invertidos en valores extranjeros a fines de 2022. Su pregunta: cómo salir sin sacudir al mundo. El Financial Times (dic-2025) muestra el canal ya en acción: con la tasa en 0.5%, una señal de alza llevó el bono a 10 años a 1.94%, movió a los bonos de EUA y Alemania, y recuerda el desplome de 12% en Japón tras el alza de julio de 2024.',
      hoy: 'No presentes el caso como presente. El YCC y la tasa negativa terminaron en marzo de 2024 (dato público, posterior al caso), y hoy la tasa es 1.25% con el yen cerca de 157 (oct-2026). Sigue viva la lógica del carry: en septiembre el peso fue la moneda más débil entre sus pares ante la huida de esas posiciones.',
      src: 'Misawa; Financial Times', tool: 'Fisher; UIP; carry trade',
    },
    {
      t: 'Los bancos siguen siendo frágiles por construcción', sec: 'S6', st: 'sigue',
      doc: 'Kang et al. (2025) muestran que SVB cayó sin mala cartera: bonos largos, depósitos no asegurados y una corrida digital. Pill muestra la versión mexicana: banca recién privatizada, crédito rápido y poca supervisión.',
      hoy: 'Tres años después, la banca de EUA gana bien, pero aún carga $326.7 mil millones en pérdidas no realizadas (FDIC, 2T-2026). Parte del riesgo migró: el crédito privado ya supera $2.6 billones (Fed, oct-2026), fuera de la regulación bancaria, aunque no sin lazos con los bancos.',
      src: 'Kang et al.; Pill; Murphy', tool: 'Transformación de plazos; corridas; prestamista de última instancia',
    },
    {
      t: 'El costo del clima es incierto, pero incierto no significa pequeño', sec: 'S7', st: 'cambio',
      doc: '"Estimating Climate Cost" compara métodos cuyo costo social del carbono va de $51 a $1,056 por tonelada. BloombergNEF (2023) presenta a ISSB como lenguaje común, aunque sin poder para obligar a nadie. "Who Killed ESG" es un video opcional y aquí no se usa como fuente.',
      hoy: 'La regulación se fragmenta: la SEC propone derogar su regla climática (2026), California exige reportes desde el 10 de noviembre y México arranca su primer ciclo bajo NIIF S1 y S2. Las pérdidas aseguradas de 2026 son las más bajas desde 2019 a nueve meses, pero un año no hace tendencia.',
      src: 'Estimating Climate Cost; BloombergNEF; noticias', tool: 'Riesgo físico vs transición; SCC; NIIF S1/S2',
    },
  ];

  // ------------------------------------------------------------------ Fichas
  const DOCS = [
    {
      id: 'bop', t: 'S5', req: true, name: 'La Balanza de Pagos: estructura, interpretación y el caso México', by: 'Nota académica del curso · FZ4027, 2026; datos a abril de 2026', read: 'canvas', link: 'flujos/h-bop', linkLabel: 'herramienta en S2',
      note: 'Lectura <b>requerida</b> en Canvas y prioritaria para S5. Las gráficas son imágenes: aquí se usa lo que trae el texto y la tabla de % del PIB.',
      thesis: 'La balanza de pagos siempre cuadra, así que un déficit corriente no es un problema en sí: lo que importa es qué lo financia y qué tan rápido puede irse ese financiamiento.',
      pts: [
        'Se divide en cuenta corriente (bienes, servicios, ingreso primario y secundario), cuenta financiera (IED, portafolio y otra inversión) y reservas; como es partida doble, el total da cero.',
        'Un déficit corriente sólo se financia con entrada neta de capital o bajando reservas. No hay tercer camino.',
        'El régimen decide quién ajusta: con tipo fijo ajustan las reservas; con flotación pura, el tipo de cambio. La nota describe a México como flotación con intervención discrecional.',
        'Las remesas van en ingreso secundario porque son transferencias sin obligación de repago: mejoran la cuenta corriente sin crear deuda.',
        'El ingreso primario negativo es el costo de décadas de IED: utilidades repatriadas e intereses, de −2% a −4% del PIB al año.',
        'Como el portafolio puede salir en días y la IED implica compromiso de largo plazo, el mismo déficit no da la misma vulnerabilidad.',
        'La paridad descubierta (la nota la llama PTID; es la UIP) explica el carry: entra capital si el diferencial supera la depreciación esperada, y si esa expectativa cambia, la salida puede autocumplirse.',
        'Las reservas se miden en meses de importaciones, y la nota usa 3 meses como umbral mínimo del FMI; es una vara, no la única.',
      ],
      data: [
        '2024: cuenta corriente de −$6.0 mil millones (−0.4% del PIB); remesas de $64.7 mil millones (4.5%); ingreso primario de −3.7%; IED neta de 2.3% (≈$33 mil millones).',
        '2020: superávit corriente de +$29.8 mil millones (2.8% del PIB), con cuenta financiera en −1.6%.',
        'Remesas en 2025: −5.5% en los primeros nueve meses frente a 2024.',
        'Reservas: $174.8 mil millones (fin de 2018) a $257.1 (abril de 2026), ≈4.7 meses; en diciembre de 1994, menos de dos semanas.',
        'Tasa de Banxico: de 4.0% a 11.25% entre 2021 y 2023.',
      ],
      today: 'Reservas de ≈$257 mil millones (Banxico, oct-2026), por qué una IED récord con casi 90% de reinversión no prueba fábricas nuevas, por qué un choque cambiario hoy pega en el peso y no en las reservas, y el déficit de 3.0% del PIB de EUA (2T-2026) financiado por el mundo.',
      ens: [
        ['México tiene déficit corriente y récord de IED. ¿Debe preocuparte?', 'Identidad de balanza de pagos; calidad del financiamiento; ingreso primario.'],
        ['¿Por qué un déficit de 3% del PIB puede ser inocuo en un país y detonar crisis en otro?', 'IED vs portafolio corto en moneda extranjera; reservas; trilema.'],
      ],
      trap: 'Dos. El signo: en CC + CF + ΔReservas = 0 (cuenta corriente, cuenta financiera y reservas), ΔReservas funciona como renglón contable y es negativo cuando Banxico acumula, como en la tabla de la nota. Si hablas del saldo, un déficit sin capital hace que las reservas bajen; la nota mezcla ambos usos y en S5 usamos CA + FA = ΔR. Y el tiempo: la nota dice que la reversión agotó las reservas en semanas, mientras Sachs et al. documentan caídas por escalones durante todo 1994.',
      qsTitle: 'Preguntas de reflexión de la nota',
      qsSrc: 'Son las cinco preguntas con que cierra la nota, no un examen. Te sirven como ensayo corto.',
      qs: [
        ['¿Por qué las remesas van en ingreso secundario y no en la cuenta financiera? ¿Qué implica?', ['Son transferencia unilateral: no hay repago ni activo a cambio, a diferencia de la IED, que después paga utilidades.', 'Sostienen la cuenta corriente sin crear pasivos, pero dependen del empleo y la política migratoria en EUA (−5.5% en 2025, primeros nueve meses).']],
        ['México tuvo superávit corriente de casi $30 mil millones en 2020. ¿Qué pasó con la cuenta financiera y las reservas? ¿Fue fortaleza?', ['Identidad: salida neta de capital (−1.6% del PIB) y acumulación de reservas (renglón de −1.2%).', 'La nota atribuye el superávit comercial a que la pandemia colapsó las importaciones: leerlo como fortaleza sería un error. Es más bien señal de gasto deprimido.']],
        ['Dos países con déficit de 3% del PIB: uno financiado con IED y otro con bonos cortos en moneda extranjera. ¿Cuál es más vulnerable?', ['El segundo: riesgo de renovación y de moneda a la vez.', 'México 1994: tesobonos de $1.2 a $17.8 mil millones contra reservas de ≈$6 mil millones (Sachs et al.).']],
        ['¿Bastan $257 mil millones y 4.7 meses de cobertura? ¿Qué más mirarías?', ['Supera el umbral de 3 meses, pero esa vara sólo mira importaciones.', 'Agrega pasivos cortos en moneda extranjera y dinero líquido convertible (M2 contra reservas, como en Sachs et al.).', 'Con flotación se necesitan menos reservas, porque el precio absorbe parte del choque.']],
        ['El gobierno recorta el déficit. Con ahorro e inversión privados fijos, ¿qué pasa con la cuenta corriente y el tipo de cambio?', ['S − I = (G − T) + (X − M): si baja G − T con S − I fijo, sube X − M y el déficit externo se reduce.', 'Menos gasto interno requiere mover producción hacia exportables: lo esperable es una depreciación real. Es una inferencia; la nota sólo plantea la pregunta.']],
      ],
    },
    {
      id: 'ww', t: 'S1', name: 'Predicting the Next High-Growth Economies', by: 'Warnock y Walsh · Darden, 2024; la escena es de inicios de 2023', read: 'ok', link: 'crecimiento/ww',
      thesis: 'El crecimiento alto se puede anticipar: lo tienen los países por debajo de su estado estacionario o con productividad que sube rápido, y por eso Solow sigue sirviendo para buscar a los próximos BRIC.',
      pts: [
        'Como el capital tiene rendimientos decrecientes, un país con poco capital gana más con cada máquina extra y por eso puede crecer rápido.',
        'Como acumular capital tiene un límite, el crecimiento per cápita sostenido sólo puede venir de la tecnología.',
        'Un país queda bajo su estado estacionario si perdió capital por una guerra, si recibió un choque positivo de ahorro o tecnología, o si le llegó IED o bajó el servicio de su deuda.',
        'Más población baja mecánicamente el ingreso por persona, pero puede subir la productividad por las aglomeraciones; por eso su efecto es ambiguo.',
        'Capital humano, gobierno, instituciones y apertura importan porque cambian el ahorro o la productividad.',
        'El mismo crecimiento no vale igual para todos: la IED vertical busca costos para exportar, mientras la horizontal y el exportador sí buscan mercado en crecimiento.',
        'Los indicadores de Sharma (precios, tipo de billonarios, segundas ciudades, recursos naturales) sirven porque anticipan competitividad y captura de rentas.',
      ],
      data: [
        'Crecimiento anual 2001–14: Brasil 5%, Rusia 6%, India 8.7%, China 8.9%; EUA, Reino Unido y Alemania ≈2%.',
        'China en 2000: inversión de 26% del PIB e ingreso per cápita de ≈$4,118 (dólares de 2011, Exhibit 1).',
        'Pronóstico del FMI para 2027 (hecho en 2022): India 6.2%, Vietnam 6.8%, México 2.1%. Es de 2022: no lo cites como pronóstico actual.',
      ],
      today: 'Las perspectivas del FMI de octubre de 2026 (mundo 3.1%, con la inversión en IA compensando el choque de energía) y la pregunta de si esa inversión sube la productividad o sólo el capital. También la baja natalidad.',
      ens: [
        ['¿Qué país emergente elegirías hoy como próximo BRIC y qué evidencia te haría cambiar de opinión?', 'Solow: distancia al estado estacionario, ahorro, capital humano, instituciones.'],
        ['¿Por qué a un inversionista de portafolio y a una planta de exportación no les importa igual el crecimiento de un país?', 'Traspaso del PIB a utilidades; IED vertical vs horizontal.'],
      ],
      trap: 'Creer que crecer mucho garantiza buen rendimiento bursátil. El caso muestra una relación positiva, pero no perfecta: depende de cuánto del crecimiento pasa por empresas listadas y de la protección al inversionista.',
      tip: ['Solow es el modelo clave de todo lo que se hable de crecimiento: la meta del ejercicio era que pudieras entender una noticia con él.', 'Clase 1'],
      qsSrc: 'De la guía de la Actividad 1. Coinciden con las que ya están respondidas en la ficha larga; aquí va el esqueleto.',
      qs: [
        ['¿Qué variables impulsan el crecimiento, cuánto aporta acumular frente a productividad y por qué usar Cobb-Douglas?', ['Y = K^α (AL)^(1−α): capital, trabajo y productividad; α marca qué tan rápido pegan los rendimientos decrecientes.', 'Acumular explica la transición y el nivel; sólo la productividad sostiene el crecimiento por persona.', 'Cobb-Douglas da rendimientos constantes a escala, decrecientes por factor, y permite separar las fuentes del crecimiento.']],
        ['¿Cómo aparecen los rendimientos decrecientes? Arma el diagrama de Solow y explica estado estacionario y convergencia.', ['ΔK = sY − δK: la inversión es una curva cóncava y la reposición, una recta; se cruzan en el estado estacionario.', 'Abajo de ese punto el capital sube y arriba baja, así que es estable.', 'Cada país converge al suyo: la convergencia es condicional.']],
        ['¿Qué pesa en el corto plazo y qué define el potencial de largo plazo? Haz una sensibilidad en Excel.', ['Corto y mediano plazo: distancia al estado estacionario, ahorro e IED.', 'Largo plazo: sólo la tecnología cambia la tasa; ahorro, población y depreciación mueven el nivel.', 'Sensibilidad de ejemplo con α = 1/3: +10% en ahorro da ≈+5% en el ingreso de largo plazo; es el mecanismo, no un dato del caso.']],
        ['¿Dónde se queda corto Solow y qué se ha propuesto para cubrirlo?', ['No explica A y deja fuera capital humano, apertura, instituciones y gobierno, que el caso discute.', 'Sharma aporta señales cualitativas: tipo de riqueza, segunda ciudad y dependencia de recursos.', 'Respuestas de la literatura: sumar capital humano y modelos de crecimiento endógeno (complemento tuyo, no del caso).']],
        ['¿En qué países invertirías, sólo por potencial de largo plazo?', ['La recomendación debe salir del modelo, no de una impresión.', 'Separa crecimiento por acumulación, que tiene techo, de impulso real de productividad.', 'Di quién está lejos de su estado estacionario y con qué evidencia cambiarías de opinión. La ficha larga trae un ejemplo con datos; el caso no da respuesta.']],
      ],
    },
    {
      id: 'rod', t: 'S1', name: 'A Note on Long-Run Models of Economic Growth', by: 'Rodriguez · Darden, rev. 2011', read: 'ok', link: 'crecimiento/rod',
      thesis: 'Sin progreso tecnológico el ingreso por persona deja de crecer al llegar al estado estacionario; la tecnología es la única fuente duradera de mejora, y el modelo no la explica.',
      pts: [
        'Como cada unidad de capital rinde menos que la anterior, el crecimiento se frena conforme un país se acerca a su estado estacionario.',
        'Más ahorro sube el nivel de ingreso de largo plazo, pero acelera el crecimiento sólo durante la transición.',
        'Más población o depreciación baja el capital de estado estacionario porque hay más que reponer con la misma inversión.',
        'Con tecnología que aumenta el trabajo, el producto por trabajador crece a la tasa g de forma permanente.',
        'Si el rendimiento del capital fuera mayor en países pobres, el capital debería ir hacia allá; la nota te pide contrastarlo con los datos.',
        'Como supone tecnología y capacidades iguales, el modelo predice convergencia que no siempre se observa; de ahí que deba ser condicional.',
      ],
      data: [
        'Participación del capital: ≈30% en EUA, y se suele calibrar entre 0.30 y 0.40 (nota de 2010–11).',
        'Referencia al escribir la nota: China crecía cerca de 10% al año. Hoy no: 4.5% en el 3T-2026.',
      ],
      today: 'Por qué China se desacelera, por qué invertir en IA no basta si no sube la PTF, y por qué el capital mundial sigue yendo hacia EUA.',
      ens: [
        ['China invirtió más de 40% de su PIB durante años. ¿Por qué eso no garantiza que siga creciendo igual?', 'Rendimientos decrecientes; efecto nivel vs efecto tasa; PTF.'],
        ['¿La IA cambia la conclusión de Solow o la confirma?', 'Distinguir aumento de capital por trabajador de aumento de A.'],
      ],
      trap: 'Decir que más ahorro aumenta el crecimiento para siempre. En Solow, el efecto sobre la tasa es temporal; lo permanente es el nivel.',
      tip: ['Insistió en que la palabra productividad viene de este modelo, y puso a China de ejemplo: creció muy rápido, pero en algún punto ese crecimiento tiene que dejar de aumentar.', 'Clase 14-oct'],
    },
    {
      id: 'kx', t: 'S2', name: 'Openness and Growth: China y México', by: 'Kehoe y Xu · NBER WP 34181, agosto de 2025', read: 'ok', link: 'flujos/c-kehoe',
      thesis: 'Abrirse no basta ni es condición suficiente en todo momento: importa cuándo lo haces respecto a tu transformación estructural y si quitas las barreras que frenan la productividad.',
      pts: [
        'China se abrió mientras movía gente del campo a la industria, y por eso la apertura coincidió con un impulso enorme de crecimiento.',
        'México se abrió décadas después de industrializarse, así que ya no tenía ese viento a favor.',
        'La diferencia decisiva es la productividad: México casi no la aumentó, y por eso exportar más no se tradujo en más ingreso.',
        'México aumentó exportaciones vendiendo más de lo mismo a los mismos clientes, mientras China creó y abandonó relaciones comerciales conforme subía de calidad.',
        'Infraestructura e investigación altas ayudan a explicar el ascenso de China, pero los autores lo presentan como conjetura y advierten que pudo haber sobreinversión.',
        'Sistema financiero ineficiente, poco Estado de derecho y rigideces laborales siguen limitando a México, y también podrían frenar a China.',
        'China seguirá creciendo, pero más lento, porque se acerca a la frontera y se acaba el bono demográfico.',
      ],
      data: [
        'Agricultura en el empleo de China: ≈60% (1992) a ≈20% (2023).',
        'Exportaciones a EUA en 2017: ≈70% de las de México, ≈20% de las de China.',
        'Investigación y desarrollo: China más de 2.5% del PIB (2021); México debajo de 0.5%.',
        'Ojo: China rebasa a México en PIB por persona en edad de trabajar en 2024 con datos del Banco Mundial; otra fuente sugiere que aún no. El orden importa más que la fecha.',
      ],
      today: 'Revisión del T-MEC, aranceles de EUA, IED en México con poca inversión nueva y el superávit de China en bienes cada vez más sofisticados.',
      ens: [
        ['México está más abierto que China. ¿Por qué su ingreso creció menos?', 'Contabilidad del crecimiento; transformación estructural; barreras.'],
        ['¿El nearshoring basta para que México suba en productividad?', 'Margen intensivo vs extensivo; derramas; instituciones.'],
      ],
      trap: 'Concluir que abrirse no sirve. Los autores defienden la apertura como parte del paquete; dicen que no es necesaria ni suficiente en cada punto del desarrollo. Además, reconocen que su segundo enigma queda sin solución definitiva.',
      tip: ['Hizo notar que México es mucho más abierto que China, y de ahí sale la pregunta: por qué en China sí crecieron los salarios y aquí no. Primero mira la inversión y luego el producto por trabajador.', 'Clase 14-oct'],
      qsSrc: 'De la Actividad 2, que junta este artículo con los casos de China y México, y también aplica a las fichas de Tabellini y Yang et al. La tarea nombra un caso de China de HBS (2019) y una edición de 2021 del de México; en la carpeta de lecturas están Yang et al. y Tabellini (rev. 2024).',
      qs: [
        ['Plantea la comparación: ¿por qué China y México son una pareja tan instructiva?', ['Se abren a tiempos parecidos y ambos se vuelven grandes exportadores de manufactura; los resultados divergen.', 'Cierra con la pregunta que vas a responder: por qué la misma apertura dio resultados distintos.']],
        ['Marco teórico: ¿cómo se complementan Solow, la identidad y las instituciones?', ['Solow: de dónde sale el crecimiento.', 'S − I = (G − T) + (X − M): qué posición externa genera cada modelo.', 'Instituciones: qué tan bien se convierte el capital en productividad. Lo que importa es cómo se conectan, no definirlas por separado.']],
        ['Política económica: ¿cómo llegó cada país a donde está?', ['China: gradual, dirigida por el Estado y selectiva en su apertura.', 'México: liberalización más rápida, integración a Norteamérica y sin política industrial paralela.', 'Enfócate en decisiones concretas y condiciones institucionales.']],
        ['Desempeño: ¿qué impulsó el crecimiento, capital, trabajo o PTF?', ['Contabilidad del crecimiento, como Kehoe y Xu.', 'China abrió con agricultura en ≈60% del empleo (1992): la reasignación impulsó la productividad medida.', 'México abrió ya industrializado y casi no aumentó su productividad; las tres barreras explican por qué.']],
        ['Comercio: ¿qué posición externa genera cada modelo y qué papel juega la composición exportadora?', ['China: ahorro mayor que inversión, superávit (53% del PIB de ahorro y más de 9% de superávit en 2008, Yang et al.).', 'México: la tarea pide leerlo con su déficit fiscal y bajo ahorro.', 'China sube por la cadena; México concentra ensamble (contenido nacional de 6.8% en electrónicos en 2006, Tabellini).']],
        ['Conclusiones: ¿cuándo produce crecimiento la globalización? ¿Invertirías hoy en China o en México?', ['Depende del momento de la apertura, de las barreras y de si se sube en productividad.', 'Di qué fue estructura común y qué fue decisión estratégica.', 'No hay respuesta única: la elección debe seguir del análisis. Para actualizar datos usa noticias recientes, porque los casos ya no son actuales.']],
      ],
    },
    {
      id: 'bern', t: 'S2', name: 'The Global Saving Glut and the U.S. Current Account Deficit', by: 'Bernanke · discurso, 10 de marzo de 2005', read: 'web', link: 'flujos/c-bern',
      note: 'Es el discurso que enlaza Canvas, publicado en el sitio de la Reserva Federal; no es un PDF.',
      thesis: 'Buena parte del déficit externo de EUA se originó fuera de EUA: un exceso de ahorro mundial bajó las tasas e infló activos, y por eso los estadounidenses ahorraron menos. El poco ahorro de EUA es la causa inmediata, no la de fondo.',
      pts: [
        'Una fuente del exceso de ahorro son los países ricos que envejecen, como Japón y Alemania: ahorran para la jubilación y tienen pocas oportunidades de invertir en casa.',
        'La otra son los emergentes: tras sus crisis dejaron de pedir prestado, acumularon reservas como seguro e intervinieron para sostener monedas competitivas; así pasaron de deudores a acreedores. Los petroleros suman.',
        'Esa oferta de ahorro buscó activos en dólares, en parte porque EUA atraía capital y varios emergentes usan el dólar como referencia, y eso ayudó a bajar las tasas reales de largo plazo.',
        'De 1996 a 2000 subieron bolsa y dólar; el efecto riqueza impulsó consumo e importaciones.',
        'Después de 2000, las tasas bajas encarecieron la vivienda, y las casas sustituyeron a las acciones como fuente de riqueza y gasto.',
        'El déficit fiscal importa, pero no explica el aumento: el déficit externo creció ≈$300 mil millones en 1996–2000 con superávit fiscal.',
        'Corregir el presupuesto ayudaría poco: un estudio que cita estima que cada dólar reduciría el déficit externo menos de 20 centavos.',
        'No lo presenta como cómodo: si el capital acaba en vivienda y consumo, queda más deuda por pagar y un sector exportador más chico. Aun así, no anuncia una crisis y ve posible un ajuste ordenado, aunque admite el riesgo.',
        'Lo más directo sería que los emergentes volvieran a recibir capital, con mejor clima de inversión e instituciones financieras; pide paciencia porque será gradual.',
      ],
      data: [
        'Déficit de EUA: 1.5% del PIB (1996), 4.2% (2000), ≈5.5% (2004). Hoy 3.0% (2T-2026): no uses el 5.5% como cifra actual.',
        'Ahorro nacional de EUA: 18% del PIB (1985) a menos de 14% (2004).',
        'Emergentes: de −$87.5 mil millones (1996) a +$205 mil millones (2003). Asia: −$40.8 a +$148.3 mil millones; China: +$7.2 a +$45.9.',
        'Japón: +$65.4 a +$138.2 mil millones; Alemania: −$13.4 a +$55.1 (1996 a 2003).',
      ],
      today: 'Por qué los aranceles no cierran el déficit de EUA, por qué el superávit de China es la otra cara, y por qué hoy el boom de IA cumple un papel parecido al que tuvo la bolsa en los 90.',
      ens: [
        ['EUA sube aranceles y su déficit sigue. ¿Cómo lo explica Bernanke?', 'S − I = CA; visión financiera vs comercial; efecto riqueza.'],
        ['¿Qué cambia entre el déficit externo de 2004 y el actual?', 'Sector privado vs gobierno; ahora el déficit fiscal sí pesa.'],
      ],
      trap: 'Decir que Bernanke culpa sólo a Asia o que habla de Trump. En 2005 también señala a los países ricos que envejecen y a los petroleros, recomienda bajar el déficit fiscal aunque le atribuye poco efecto, y aclara que no juzga la conducta de nadie; la aplicación a los aranceles actuales es del profe.',
      tip: ['Dijo que el artículo <q>cambió mi manera de ver el mundo</q>: en vez de mirar la política comercial, se fija en el gobierno y el sector privado. Su mensaje: con tarifas no haces nada si no cambian ahorro e inversión.', 'Clase 26-oct'],
    },
    {
      id: 'tab', t: 'S2', name: 'Mexico, Trade, and Development', by: 'Tabellini · HBS, 2022, rev. 2024', read: 'ok', link: 'flujos/c-tab',
      thesis: 'El TLCAN transformó el comercio de México, pero no le dio crecimiento sostenido ni convergencia, porque los beneficios se quedaron en un sector exportador con pocos lazos con el resto del país.',
      pts: [
        'Como las multinacionales importaban sus insumos, la IED derramó poco sobre las empresas locales.',
        'México compitió por costo laboral y trasladó sobre todo ensamble, por eso no subió por la cadena de valor.',
        'El campo perdió frente al maíz subsidiado de EUA; muchos migraron, justo lo contrario de lo que se prometió.',
        'La recesión de 1995 vino de la crisis del Tequila, no del tratado, y por eso no sirve como prueba en su contra.',
        'La integración hace que cuando EUA cae, México cae, porque las fábricas de exportación transmiten el golpe.',
        'Como México se especializó en lo mismo que China, la entrada de China a la OMC le quitó mercado.',
        'La desigualdad regional subió entre norte y sur, aunque la nacional bajó en la primera década.',
      ],
      data: [
        'Comercio/PIB: ≈22% (1993) a más de 45% (1996).',
        'Contenido nacional en 2006: 6.8% en electrónicos, 14.2% en equipo de transporte.',
        'PIB: −6.6% (2009) y −8.3% (2020).',
        'T-MEC: 75% de contenido regional en autos y salario mínimo de $16 por hora en esa industria.',
      ],
      today: 'La revisión del T-MEC, los aranceles a autos y acero, la IED con casi 90% de reinversión, y si el nearshoring repetirá el patrón del ensamble.',
      ens: [
        ['¿Fue un éxito o un fracaso el TLCAN para México? Toma postura.', 'Comercio vs PTF; ganadores y perdedores; contrafactual.'],
        ['¿Qué tendría que pasar para que la relocalización no repita lo que ocurrió con el TLCAN?', 'Derramas, instituciones, cadena de valor, inversión nueva.'],
      ],
      trap: 'Afirmar que el TLCAN causó la pobreza. El caso reporta que subió el número de personas pobres entre 1994 y 2014, pero también la crisis, la población y el contrafactual; comparar antes y después no prueba causa.',
    },
    {
      id: 'yang', t: 'S2', name: "China's 40 Years of Economic Reforms and Growth", by: 'Yang et al. · Darden, 2024, rev. 2025', read: 'ok', link: 'flujos/c-yang',
      thesis: 'China creció por reformas graduales que introdujeron incentivos, precios, apertura y reasignación sobre una base de ahorro enorme; las mismas palancas que le funcionaron dejan hoy deuda, sobrecapacidad y envejecimiento.',
      pts: [
        'Al ligar el ingreso con el esfuerzo en el campo, la responsabilidad familiar disparó la producción y liberó mano de obra para la industria.',
        'El sistema dual de precios y las zonas especiales abrieron el mercado sin choque, a costa de corrupción y desigualdad.',
        'Dejar quebrar o privatizar empresas estatales pequeñas movió capital y trabajo a empresas privadas más productivas.',
        'La OMC amplió mercados; junto con el ahorro alto produjo superávits y reservas enormes.',
        'Promover funcionarios por el PIB aceleró el crecimiento, pero también la contaminación y el proteccionismo local.',
        'El reparto fiscal de 1994 empujó a los gobiernos locales a financiarse con suelo, y eso alimentó el auge inmobiliario.',
        'El estímulo de 2009 evitó la recesión, pero sembró los problemas de deuda local.',
        'Como la población en edad de trabajar empezará a caer, el bono demográfico se volverá carga.',
      ],
      data: [
        'Crecimiento real de 9.27% anual (1978–2018).',
        'Ahorro de 53% del PIB y superávit externo mayor a 9% (2008).',
        'Estímulo de 2009: RMB 4 billones, ≈14% del PIB de 2008.',
        'IED en mínimo de 30 años a inicios de 2024; ese es el último corte del caso.',
      ],
      today: 'Inversión fija e inmobiliaria en caída, superávit cerca de su récord, guerra comercial y tecnológica, y relocalización hacia Vietnam, Tailandia o México.',
      ens: [
        ['¿Por qué China tiene superávit y demanda interna débil al mismo tiempo? ¿Qué debería hacer?', 'S − I = CA; equilibrio interno y externo.'],
        ['¿Qué explica más el milagro chino: mercado, Estado o ahorro?', 'Contabilidad del crecimiento; reasignación de factores.'],
      ],
      trap: 'Usarlo como prueba definitiva de que el gradualismo le gana a la terapia de choque. El caso favorece la experiencia china, pero aclara que no se puede afirmar qué habría pasado en Rusia con otra ruta.',
      tip: ['Conectó oferta y demanda con una frase: <q>los países que exportan son gente que está ahorrando</q>. En China se ahorra en parte porque la red de salud y seguridad social es débil.', 'Clase 19-oct'],
    },
    {
      id: 'apple', t: 'S2', name: 'Apple and Globalization: Value Chain, Tariffs, and Strategic Reconfiguration', by: 'Nota académica del curso · FZ4027, 2026; datos a diciembre de 2025', read: 'canvas', link: 'flujos', linkLabel: 'tema S2',
      thesis: 'La globalización le dio a Apple escala y márgenes enormes y repartió beneficios de forma desigual: gana quien sube de ensamble a diseño y servicios. Los aranceles no revierten el modelo; lo encarecen.',
      pts: [
        'Curva de la sonrisa: el valor está en los extremos, diseño y servicios, y no en armar. Fabricar mucho no significa capturar mucho.',
        'El modelo sin fábricas propias funciona por capacidades especializadas, escala global para pagar costos fijos enormes y poder de negociación sobre proveedores.',
        'Tiene dos debilidades: ensamble muy concentrado en China y líneas de producción hechas sólo para Apple, difíciles de mudar.',
        'China subió de ensamble a subensambles con política industrial además de apertura: entrar a la cadena es el inicio, no el destino.',
        'México, en cambio, no liga el ensamble extranjero con proveedores locales ni con educación técnica; sin eso, el ensamble se queda en ensamble.',
        'Apple respondió a los aranceles de 2025 con India, inversión en EUA y medidas de corto plazo, absorbiendo el costo en vez de subir precios.',
        'India no elimina la dependencia: su ensamble aún necesita subcomponentes chinos.',
        'Los aranceles pueden costar innovación: fragmentar mercados reduce la escala que paga la investigación. Es el argumento de la nota, apoyado en Krugman y Romer.',
      ],
      data: [
        'iPhone: Apple retenía más de 58% del precio como utilidad y China menos de 2% (Kraemer et al., 2011).',
        'Costo de producción captado por China: 1.8% (2007) a 25.4% en el iPhone X (Xing y Huang, 2021).',
        'iPhone 16: contenido chino de $38.89 de $564 de costo de fábrica (Contractor, 2025).',
        'Arancel máximo (abril de 2025): China 145%, Vietnam 46%, Taiwán 32%, India 26%, Corea 25%; sujeto a pausas y exenciones.',
        'Costo de aranceles: ≈$3.3 mil millones en el año fiscal 2025 (≈0.8% de ingresos). India: de menos de 5% de iPhones (2022) a 25% (fin de 2025).',
      ],
      today: 'Por qué los aranceles no borran una cadena de décadas, por qué el nearshoring puede repetir el patrón del ensamble que Tabellini describe, y por qué el superávit de China es también competencia para productores de otros países.',
      ens: [
        ['Si México ensambla más electrónicos por el nearshoring, ¿le basta para subir su productividad?', 'Curva de la sonrisa; derramas; PTF; barreras de Kehoe y Xu.'],
        ['¿Quién paga un arancel a un iPhone y qué cambia en el déficit de EUA?', 'Efectos de aranceles; S − I = CA; márgenes vs precios.'],
      ],
      trap: 'Comparar sus porcentajes como serie. Mezclan precio al público y costo de producción, y distintos modelos: 25.4% (iPhone X) y ≈7% (iPhone 16) no prueban que China haya perdido terreno, y la Tabla 1 suma más de 100%. Usa la historia, no la resta. Además, llamar a México principal beneficiario del nearshoring es afirmación de la nota: contrástala con la composición de la IED.',
    },
    {
      id: 'mur', t: 'S3', name: 'Policy Responses to Modern Economic Crises', by: 'Murphy · Darden, 2020, rev. 2022; el relato termina en 2020', read: 'ok', link: 'fiscal/fx-murphy',
      thesis: 'Una crisis de demanda (2008) y una médica con choque de oferta y demanda (2020) exigen respuestas distintas, y la política monetaria pierde fuerza si nadie quiere gastar o prestar.',
      pts: [
        'Rescatar a quien tomó riesgos crea riesgo moral, pero no hacerlo castiga a quien no los tomó; por eso el rescate de 2008 fue tan disputado.',
        'Como los bancos acumularon reservas y el multiplicador no subió, el QE aumentó la base mucho más que el dinero en circulación.',
        'El miedo a la deuda limitó el estímulo fiscal, y los recortes de 2013 restaron crecimiento justo en una recuperación débil.',
        'En 2020, las restricciones impedían gastar en servicios, así que la caída no venía de falta de ganas.',
        'Como el ingreso perdido no se arregla con crédito, la transferencia directa cumplía un papel que la Fed no podía.',
        'Como 2020 combinó oferta y demanda, la inflación posterior dependería de cuál choque dominara.',
      ],
      data: [
        'Activos de la Fed: $895 mil millones (ago-2008), ≈$4.5 billones (2015), más de $6.1 billones (jun-2020).',
        'ARRA: ≈$800 mil millones (2009), contra una brecha de producto citada de $2.9 billones.',
        'CARES: más de $2 billones (2020), la mayor transferencia en la historia de EUA hasta entonces.',
      ],
      today: 'Déficits altos sin recesión, poco espacio fiscal para el próximo choque según el FMI, y el debate sobre independencia de la Fed. El caso no llega a la inflación de 2021–22: esa parte la pones tú con Fisher.',
      ens: [
        ['¿Por qué la respuesta de 2020 fue distinta de la de 2008 y por qué trajo otro resultado en inflación?', 'Tipo de choque; multiplicador; QE; advierte que el caso termina en 2020.'],
        ['Si llegara otra recesión mañana, ¿cuánto margen fiscal y monetario tendría EUA?', 'Dinámica de la deuda; Fisher.'],
      ],
      trap: 'Decir que imprimir dinero causa inflación en automático. Tras 2008 la base explotó y la inflación se mantuvo baja por el multiplicador; el caso reporta esa preocupación, y no demuestra que se cumpliera.',
      tip: ['Sobre México: en esas crisis prácticamente no se gastó. Y como los bancos locales habían desaparecido tras el Tequila y operaban bancos globales, el gobierno no enfrentó presión por rescatarlos.', 'Clase 19-oct'],
    },
    {
      id: 'ros', t: 'S3', name: 'How Government Debt Accumulates', by: 'Roscini y Schlefer · HBS, 2011, rev. 2013; escena de 2010', read: 'ok', link: 'fiscal/fx-roscini',
      thesis: 'La trayectoria de la deuda no se discute: es contabilidad de balance primario, tasa, crecimiento, inflación y depreciación; lo incierto son los supuestos y la confianza.',
      pts: [
        'Como la deuda se mide contra el PIB nominal, crecimiento e inflación la reducen de la misma manera.',
        'La inflación es más fácil de generar que el crecimiento, y por eso ha sido una salida histórica para bajar la razón sin pagar.',
        'Estar en el euro le quitó a Grecia inflar y depreciar, así que el ajuste tenía que venir por precios a la baja.',
        'Pero salir del euro habría disparado la deuda, porque seguiría denominada en euros.',
        'Si parte de la deuda está en moneda extranjera, una depreciación la sube de inmediato en proporción al PIB.',
        'El mismo nivel de deuda no da el mismo riesgo: lo decide la dinámica esperada y la confianza del mercado.',
      ],
      data: [
        'En 2009–10: Grecia 127% del PIB y bono a 2 años cerca de 19%; Japón 193% y menos de 0.25%.',
        'EUA: 109% del PIB (1946) a 26% (1980), sin pagar la deuda.',
        'México: de 30% (1993) a 47% (1995), con la deuda en dólares de 18% a 38%.',
      ],
      today: 'El déficit de EUA, Francia y su perspectiva negativa, el Paquete 2027 de México, donde r > g con los supuestos oficiales (cálculo de esta guía), y el apoyo a Pemex como pasivo contingente. Grecia es de 2010: úsala como ejemplo, no como su situación actual.',
      ens: [
        ['¿Por qué Japón paga tan poco con más deuda que Francia o que la Grecia de 2010?', 'r − g; balance primario; moneda de la deuda; confianza.'],
        ['¿La deuda de México es sostenible? ¿Qué número mirarías primero?', 'Dinámica de la deuda; pasivos contingentes.'],
      ],
      trap: 'Decir que hay un nivel de deuda que por sí solo provoca crisis, o que la fórmula predice el futuro. Los autores dicen que la relación es contable y que la incertidumbre está en los supuestos. Además, su fórmula es una aproximación útil para pocos años.',
    },
    {
      id: 'blo', t: 'S3', name: 'A Million Simulations, One Verdict for US Economy: Debt Danger Ahead', by: 'Sakthivel, Cousin y Wilcox · Bloomberg Economics, 1 de abril de 2024', read: 'canvas', link: 'fiscal', linkLabel: 'tema S3',
      note: 'Texto legible; las gráficas no salieron bien en la extracción, así que no se usan sus curvas.',
      thesis: 'Aun con supuestos optimistas, la proyección oficial ya tiene la deuda de EUA subiendo; al simular un millón de escenarios, casi todos apuntan a una trayectoria insostenible, y arreglarla exige acuerdos de un Congreso que el artículo describe como muy dividido.',
      pts: [
        'La oficina de presupuesto debe proyectar con la ley vigente: supone que los recortes de impuestos de 2017 expiran en 2025 y que el gasto discrecional sólo sigue la inflación. Por eso su cifra es optimista.',
        'Con las tasas que descuenta el mercado, y no las de la proyección oficial, la razón sube más: es r − g en acción.',
        'Se simulan crecimiento, inflación, déficit y tasas según el patrón de 1990–2023: un análisis estocástico de sostenibilidad.',
        'Insostenible significa aquí que la razón sube en la siguiente década. No significa impago.',
        'Con otra vara, el interés real menor a 2% del PIB que prefiere Yellen, el resultado es menos grave.',
        'El dólar como activo seguro baja el riesgo de una crisis como la de Reino Unido en 2022, pero perder esa confianza sería un punto de quiebre.',
        'Fitch y la mayor emisión de deuda en agosto de 2023 dieron un anticipo: el bono a 10 años subió un punto y tocó 5% en octubre.',
      ],
      data: [
        'Deuda/PIB: 97% (2023) a 116% (2034) según la proyección oficial; 123% con tasas de mercado al 25-mar-2024.',
        '88% de un millón de simulaciones: razón creciente en 10 años. El peor 5%: arriba de 139% en 2034.',
        'Servicio de la deuda de ≈5.4% del PIB en 2034, más de 1.5 veces el gasto en defensa de 2023.',
        'Interés real arriba de 2% del PIB en 30% de las simulaciones.',
      ],
      today: 'Un déficit de ≈$2 billones (6.2% del PIB) en el año fiscal 2026 sin recesión e intereses 11% más altos. Todo el artículo es anterior: te da el método, no la cifra vigente.',
      ens: [
        ['¿Qué tan probable es una crisis de deuda en EUA?', 'r − g y balance primario; moneda de reserva; distinguir sostenibilidad de impago.'],
        ['¿Por qué la misma deuda asusta distinto según el supuesto de tasas?', 'Dinámica de la deuda; Fisher; plazos de la deuda.'],
      ],
      trap: 'Leer el 88% como probabilidad de crisis o de impago. Es la proporción de escenarios donde la razón sube, y el propio artículo dice que el dólar baja la probabilidad de un colapso. También evita citar sus proyecciones como actuales: los supuestos de impuestos y tasas son de abril de 2024.',
    },
    {
      id: 'nmx', t: 'S3', ts: ['S3', 'S5'], name: 'México 1960–1976: del Desarrollo Estabilizador a la crisis del peso', by: 'Hernández · nota académica del curso, abril de 2026', read: 'canvas', link: 'fiscal', linkLabel: 'tema S3',
      thesis: 'La devaluación de 1976 no fue un accidente: dos déficits, fiscal y externo, crecieron bajo un tipo de cambio fijo desde 1954, y la deuda externa los tapó hasta que dejó de alcanzar.',
      pts: [
        'La sustitución de importaciones combinó protección, crédito dirigido y una paridad de 12.50: dio crecimiento alto, pero sembró los desequilibrios.',
        'Como la protección y el peso sobrevaluado castigaban exportar, las exportaciones crecieron menos que las importaciones y el déficit corriente se volvió crónico.',
        'Con una base tributaria muy débil y sin reforma fiscal, cualquier expansión tenía que financiarse con deuda.',
        'Tras 1968, Echeverría respondió a una crisis de legitimidad con gasto: Bazdresch y Levy lo leen como último recurso, más que como simple irresponsabilidad.',
        'Definen populismo económico como políticas que ignoran restricciones de recursos, señales de precios y reacción a incentivos; no es sólo gastar.',
        'El financiamiento era circular: el gasto generó inflación, la inflación erosionó el ahorro interno y eso forzó más deuda externa, en un mundo con petrodólares abundantes.',
        'Inflación mayor a la de EUA con tipo fijo significa apreciación real, y por eso se ensanchó el déficit hasta que cayeron las reservas.',
        'A largo plazo, México agotó el salto fácil de la transformación estructural antes de abrirse y no construyó las instituciones que sostienen la PTF.',
      ],
      data: [
        'Déficit corriente: $946 millones (1970) a $3,693 millones (1975).',
        'Déficit del sector público: ≈1.5–2.5% del PIB (1965–70), ≈5.1% (1970–74) y ≈8.1% (1975–79).',
        'Deuda pública externa: ≈$7,000 millones (1970) a ≈$20,000 millones (1976).',
        'Inflación: 5.2% (1970), 23.7% (1974), 15.7% (1976). Tipo de cambio: 12.50 a 19.95 por dólar el 31-ago-1976.',
        '1954–70 contra 1971–88 (Bazdresch y Levy): PIB 6.8% y 4.1%; inflación 3.5% y 43%.',
      ],
      today: 'El debate sobre Pemex y la consolidación fiscal, por qué sigue pendiente la reforma tributaria, y por qué con flotación la presión sale en el peso y no en la ruptura de una paridad.',
      ens: [
        ['¿En qué se parecen y en qué difieren 1976 y 1994?', 'S − I = (G − T) + (X − M): 1976 es déficit público; 1994, privado. En ambos, tipo fijo y apreciación real.'],
        ['¿Por qué un gobierno elige una política que sabe insostenible?', 'Populismo económico; último recurso; dinámica de la deuda.'],
      ],
      trap: 'Tres. Mezclar 1976 con 1994: uno fue fiscal y el otro privado. Decir que los déficits superan la identidad: siempre se cumple, y lo que cambia es quién presta. Y citar la frase de la nota de que abrirse es necesario pero no suficiente: Kehoe y Xu, su fuente, escriben que no es ni necesario ni suficiente en cada punto del desarrollo. La nota también afirma que China ya rebasó a México en 2024; Kehoe y Xu lo matizan según la fuente.',
    },
    {
      id: 'mis', t: 'S4', name: 'Can the BoJ Continue to Maintain YCC with Rising Inflation?', by: 'Misawa · Universidad de Hong Kong, 2024; el relato llega a 2023', read: 'ok', link: 'monetaria/mon-misawa',
      thesis: 'Una década de dinero ultrabarato no logró anclar las expectativas de 2% en Japón, pero sí mandó ahorro japonés al mundo; por eso salir se volvió un problema global.',
      pts: [
        'Cada herramienta llegó porque la anterior no subió las expectativas: QE, QQE, tasa negativa y, al final, YCC.',
        'Comprar bonos a diez años permite fijar una tasa que normalmente el mercado decide, y por eso distorsiona los precios.',
        'Como EUA y Europa subieron tasas y Japón no, el diferencial debilitó al yen y encareció las importaciones.',
        'Si los salarios no suben, Ueda no considera sostenible la inflación; por eso la decisión dependía de ellos y no sólo de los precios.',
        'Cuando sube el rendimiento en Japón, los activos del exterior atraen menos, y al regresar ese capital suben las tasas de otros países.',
        'El mandato es interno, pero el efecto es global; ahí está el dilema del caso.',
      ],
      data: [
        'Tope del bono a 10 años: 0.25% a 0.5% (dic-2022) y 1% como referencia (jul-2023).',
        'Yen en 151 por dólar, mínimo de 32 años (oct-2022).',
        'Inflación subyacente de 4% (dic-2022), máximo de 41 años.',
        'Valores extranjeros de inversionistas japoneses: ¥531 billones (fin de 2022).',
      ],
      today: 'El BoJ en 1.25% (oct-2026), el yen débil cerca de 157, y la presión sobre el peso cuando se estrecha el colchón del carry. El caso se queda antes del fin del YCC, que llegó en marzo de 2024 (dato público).',
      ens: [
        ['Si el BoJ sube su tasa, ¿qué le pasa al peso mexicano?', 'UIP; carry trade; flotación.'],
        ['¿Una tasa de 1.25% significa que Japón ya aprieta?', 'Fisher: tasa real, no nominal.'],
      ],
      trap: 'Hablar del YCC como si siguiera vigente, o leer una tasa más alta como política restrictiva sin restar la inflación. En el caso, además, Ueda niega que la flexibilización sea normalización: no se lo atribuyas como salida anunciada.',
      tip: ['A la Fed no le preocupó el tipo de cambio, pero a Japón sí le tiene que preocupar, y a México también. Esa es la pregunta que conecta este caso con la economía global.', 'Clase 21-oct'],
      qsSrc: 'Las seis preguntas de estudio de Canvas. La ficha larga responde las cuatro que dio el profe en clase, y estas las amplían.',
      qs: [
        ['¿Cómo evolucionó el YCC y qué retos enfrenta con inflación alta?', ['Cada herramienta llegó porque la anterior no subió las expectativas: QQE (2013), tasa negativa y YCC (2016).', 'El techo se fue abriendo: de 0.25% a 0.5% (dic-2022) y 1% de referencia (jul-2023).', 'Fisher: con tasa nominal topada y más inflación, la tasa real baja, así que la política se afloja sin decidirlo. Defender el techo exige comprar bonos y daña el funcionamiento del mercado.']],
        ['¿Qué implica para las finanzas globales que Japón siga con política ultralaxa?', ['El dinero barato sale: ¥531 billones en valores extranjeros (fin de 2022).', 'UIP y carry: si cambia el diferencial, los japoneses repatrían y suben tasas en otros países; lo advirtieron el FMI y el BCE (2023).', 'El mandato es interno, pero el efecto es global.']],
        ['¿Por qué duda el BoJ en subir tasas si la inflación supera 2%?', ['Ueda no ve sostenible esa inflación: venía de costos e importaciones. Quería 2% acompañado de salarios creciendo arriba de 2%.', 'Las expectativas no se habían anclado en 2%.', 'Ueda sostenía que subir apenas se pasara de 2% dañaría la economía. El costo para la deuda pública se desarrolla en la ficha larga.']],
        ['¿Cómo afecta la demografía a la política del BoJ y al YCC?', ['Ojo: el caso casi no lo trata. Sólo reporta que Ueda esperaba que la población decreciente mantuviera apretado el mercado laboral, y pedía a las empresas subir salarios.', 'Con Solow (interpretación tuya): menos población y PTF plana bajan el crecimiento potencial, y así el dinero barato rinde poco.', 'Conecta con Fisher: si el mercado laboral apretado no sube salarios, las expectativas no llegan a 2%.']],
        ['¿Qué riesgos y beneficios tiene modificar o abandonar el YCC?', ['Beneficios: devuelve el precio al mercado, reduce la distorsión de la curva y quita presión al yen y a la inflación importada.', 'Riesgos: frena una economía débil, encarece la deuda y provoca repatriación global.', 'El caso lo deja abierto: Ueda niega que la flexibilización sea normalizar, y la pregunta final es cómo salir sin dañar a los mercados.']],
        ['¿Cómo influyó la política ultralaxa en el tipo de cambio del yen?', ['UIP: con la Fed y el BCE subiendo y Japón no, el yen pierde atractivo.', 'Yen de ≈151 por dólar (oct-2022, mínimo de 32 años) y 145 en junio de 2023, el más débil de ese año a esa fecha.', 'El yen débil encarece materias primas importadas: ahí está el dilema entre proteger crecimiento o moneda.']],
      ],
    },
    {
      id: 'ft', t: 'S4', name: 'How will a rise in Japanese interest rates affect global markets?', by: 'Leo Lewis · Financial Times, 3 de diciembre de 2025', read: 'canvas', link: 'monetaria', linkLabel: 'tema S4',
      thesis: 'Japón ya no es un asunto local: si suben sus tasas, el ahorro japonés y el carry pueden regresar a casa y mover bonos y bolsas del mundo, aunque no todos creen en una salida masiva.',
      pts: [
        'Una señal de Ueda bastó para mover los mercados: los analistas la leyeron como preparación de un alza en diciembre de 2025.',
        'Primer canal: a mayor rendimiento en Japón, más incentivo para vender afuera y volver, y eso sube tasas en otros países.',
        'Segundo canal: el carry en yenes, muy sensible a la volatilidad y a cambios en expectativas de tasas.',
        'Llega en mal momento: emisión récord de países ricos, y los bancos centrales ya compran mucho menos.',
        'Del bono a la bolsa: Société Générale estima que un punto más en el bono a 10 años de EUA restaría 10–12% al S&P 500, aunque no es su escenario base.',
        'Hay contrapeso: el mayor fondo de pensiones de Japón tiene una asignación fija en bonos extranjeros, el yen se debilitó en meses recientes y, según HSBC, los especuladores ya estaban largos en yen.',
        'Nadie sabe cuánto mide el carry: las estimaciones van de cientos de miles de millones a billones de dólares.',
      ],
      data: [
        'Tasa del BoJ de 0.5% (gráfica, dic-2025); los swaps daban dos tercios de probabilidad de alza en ese mes.',
        'Bono japonés a 10 años: 1.94%, más de 0.8 puntos arriba en 2025; el de 2 años, máximo de 17 años.',
        'Ese día: bono alemán +0.06 puntos, bono de EUA +0.08.',
        'Julio de 2024: tras el alza del BoJ, bolsa japonesa −12% en un día, que operadores ligaron al carry.',
      ],
      today: 'El BoJ ya está en 1.25% con el yen cerca de 157 (oct-2026), y en septiembre el peso fue la moneda más débil entre sus pares. El artículo te da el mecanismo con el que leer esas noticias.',
      ens: [
        ['El BoJ sube y el peso cae. Explica la conexión.', 'UIP; carry trade; repatriación.'],
        ['¿Por qué un alza de Japón puede pegarle más a Wall Street que la propia Fed?', 'Tasas de largo plazo de EUA; demanda de bonos; valuación.'],
      ],
      trap: 'Presentarlo como predicción de un desplome. El artículo da argumentos en ambos sentidos, y el vínculo de 2024 con el carry es lo que dijeron los operadores, no algo demostrado. Tampoco uses el 0.5% como tasa actual.',
    },
    {
      id: 'pill', t: 'S5', name: 'Mexico: The Tequila Crisis 1994–95', by: 'Pill · HBS, 2002', read: 'ok', link: 'cambio/pill',
      thesis: 'Las reformas eran reales, pero el auge de crédito y capital de cartera dejó a México vulnerable; cuando subió la tasa de la Fed y llegaron los choques políticos, la defensa del tipo de cambio terminó en crisis de liquidez.',
      pts: [
        'Liberalizar crédito e importaciones hizo caer el ahorro privado, y el déficit externo se volvió dependencia del capital extranjero.',
        'El capital de cartera podía salir rápido, a diferencia de un préstamo bancario o una fábrica.',
        'Con inflación mayor a la de EUA y tipo de cambio casi quieto, el peso se apreció en términos reales.',
        'Los bancos recién privatizados prestaron sin saber medir el riesgo, y el seguro de depósitos sin costo por riesgo premiaba arriesgar.',
        'Subir tasas podía tumbar a los bancos y poner controles dañaba la confianza; por eso se defendió con reservas y tesobonos.',
        'Los tesobonos pasaron el riesgo cambiario al gobierno, y al ser de corto plazo crearon un riesgo de renovación.',
        'Devaluar sin plan creíble rompió la confianza y convirtió el círculo virtuoso en uno vicioso.',
      ],
      data: [
        'Cuenta corriente de 1994: −$29.4 mil millones.',
        'Ahorro interno privado: 21.8% del PIB (1983) a 12.1% (1994).',
        'En 1995: PIB cayó 6.9% (guía de discusión de Canvas) e inflación hasta 52%.',
        'De las láminas de clase: reservas de ≈$29 mil millones a ≈$6 mil millones y tesobonos de $1.2 a $17.8 mil millones (1994).',
      ],
      today: 'Volatilidad del peso, reservas de ≈$257 mil millones bajo flotación, la banda cambiaria de Argentina, y la lección que explica el régimen actual de México.',
      ens: [
        ['¿Por qué un país con finanzas públicas sanas sufrió una crisis tan fuerte?', 'S − I = CA privado; trilema; tesobonos; liquidez.'],
        ['¿Podría repetirse hoy en México? ¿Qué cambió y qué no?', 'Flotación, reservas, deuda en moneda local; riesgo del carry.'],
      ],
      trap: 'Llamarla crisis fiscal o culpar sólo a la devaluación de diciembre. El déficit público no era el problema, y la vulnerabilidad venía de años: crédito, ahorro privado, bancos débiles y deuda corta en dólares.',
      tip: ['Tardamos casi treinta años en volver a prestar lo mismo, y lo que evitó algo peor fue que la economía ya estaba abierta. De ahí su conclusión sobre el tipo de cambio fijo: <q>never more</q>.', 'Clase 26-oct'],
      qsSrc: 'Las ocho preguntas de la guía de discusión de Canvas, ya respondidas con detalle en la ficha larga. La guía pide escribir cada ecuación con sus valores: no basta la narrativa.',
      qs: [
        ['¿Qué transformación estructural hubo entre 1987 y 1993? ¿Qué reformas fueron centrales y qué lograron?', ['Pacto y ancla cambiaria, consolidación fiscal, privatizaciones, apertura (GATT, TLCAN), liberalización financiera y reestructura de deuda.', 'Logros a 1993: inflación de un dígito, operación fiscal en superávit, deuda de 74.7% a 33.7% del PIB (1988–93).', 'Lo que no llegó: crecimiento.']],
        ['¿Cómo evolucionaron balanza comercial y cuenta corriente entre 1988 y 1994? Explícalo con la identidad.', ['Cuenta corriente de −1.4% a −7.9% del PIB.', '(S − I) = (G − T) + (X − M), reescrita por sectores: el saldo privado cayó de +2.2% a −8.4% y el público subió de −3.6% a +0.5%.', 'Conclusión: el déficit fue privado y lo financió capital de cartera.']],
        ['¿Qué pasó con el tipo de cambio real y cómo se relaciona con el saldo externo?', ['Apreciación real: con E casi fijo, la inflación de México superó a la de EUA. Pill y Sachs et al. dan magnitudes distintas según el índice (≈20–30%).', 'La causalidad va en dos sentidos: la apreciación empeora la cuenta corriente y las entradas de capital aprecian el peso.']],
        ['¿Cómo reducir el déficit con política (i) fiscal y (ii) monetaria? ¿Qué le pasaría al crecimiento y al empleo?', ['Fiscal: baja G − T, pero el problema era privado, así que requeriría un superávit muy grande y frenaría la economía.', 'Monetaria: frena crédito y consumo, pero atrae capital, aprecia el peso y debilita a los bancos.', 'Ambas reducen gasto sin cambiar precios relativos; por eso Sachs et al. insisten en la depreciación real.']],
        ['Si Banxico sube su tasa, ¿qué dicen Fisher y la UIP? ¿Qué cambió con el alza de la Fed de febrero de 1994?', ['Fisher, i = r + πᵉ: con expectativas ancladas, r sube casi uno a uno.', 'UIP, i = i* + E(Δe): atrae capital y sostiene el peso.', 'La Fed sube i*: Banxico debe subir más sólo para quedar igual, justo cuando la prima de riesgo crece por los choques políticos.']],
        ['¿Qué dilema planteaba subir tasas en 1994? Compáralo con el del BoJ.', ['Un instrumento, dos objetivos: defender la banda o proteger a bancos frágiles y al crecimiento en año electoral.', 'BoJ: también limitado por balances, porque subir daña crecimiento y deuda.', 'Diferencia: Japón se endeuda en yenes y flota, y la presión sale en el yen, no en una crisis de reservas.']],
        ['¿Cómo aliviaban los tesobonos ese conflicto? ¿Quién carga el riesgo cambiario?', ['Quitan E(Δe) de lo que exige el inversionista: retienen capital sin subir tasas.', 'El riesgo pasa al gobierno y, al final, a los contribuyentes.', 'De $1.2 a $17.8 mil millones durante 1994.']],
        ['¿Era sostenible emitir tesobonos? Usa Δb = d + (r − g)b.', ['b es deuda/PIB, d déficit primario, r tasa real y g crecimiento. Con superávit primario y b de 33.7%, la solvencia se veía bien.', 'Pero la depreciación revalúa la parte en dólares: 50.7% del PIB en 1994.', 'La ecuación no ve el plazo: $17.8 mil millones cortos contra ≈$6 de reservas. Solvente, pero ilíquido.']],
      ],
    },
    {
      id: 'stv', t: 'S5', name: 'The Collapse of the Mexican Peso: What Have We Learned?', by: 'Sachs, Tornell y Velasco · Economic Policy, abril de 1996', read: 'canvas', link: 'cambio/stv',
      note: 'Viene de Canvas: el artículo completo, con los comentarios de Giavazzi y Székely y la discusión. Las fichas no toman esa discusión como opinión de los autores.',
      thesis: 'Los fundamentos por sí solos no explican la crisis: fue un pánico autocumplido, posible porque los pasivos cortos del gobierno superaron sus activos líquidos.',
      pts: [
        'Sí hacía falta ajustar, pero temprano habría costado poco, porque había reservas y casi no había deuda corta en dólares.',
        'El déficit externo fue privado: reflejó menos ahorro y más inversión, y los autores niegan que viniera de irresponsabilidad fiscal.',
        'Las reservas no cayeron sólo por la pérdida de confianza: cayeron porque el banco central expandió crédito para frenar el alza de tasas. Sin eso, se habría reducido el déficit en vez de las reservas.',
        'Para no subir tasas, además, se cambiaron Cetes por tesobonos; así creció la deuda corta en dólares justo cuando bajaban las reservas.',
        'Diciembre son dos eventos: primero la devaluación y luego el pánico de deuda, que ella ayudó a provocar. Por eso no lo leen como un ataque especulativo clásico.',
        'Como ningún acreedor podía cubrir todo, a cada uno le convenía salir antes que los demás, y el miedo se cumplió solo.',
        'Solvencia no es liquidez: una razón de deuda baja no protege si las reservas no cubren lo que vence.',
        'Los depósitos bancarios también cuentan, porque el mercado sabe que el gobierno terminará rescatando.',
        'Aferrarse a la paridad no da credibilidad, pues esta depende también de la capacidad de defenderla.',
        'Un tipo de cambio fijo ayuda a terminar con una inflación muy alta, pero se vuelve peligroso si se mantiene de más; proponen pasar a una banda deslizante y rechazan una caja de conversión para México.',
        'Defienden el rescate con la lógica del prestamista de última instancia, y piden un mecanismo internacional estable.',
        'En la discusión hay desacuerdo: Giavazzi duda que subir tasas hubiera bastado y Székely cree que subestiman la especulación y a los actores mexicanos.',
      ],
      data: [
        'Déficit externo: 6.8% del PIB (1993) y 7.9% (1994).',
        'Saldo ahorro menos inversión (1988 a 1994): privado de +2.2% a −8.4% del PIB; público de −3.6% a +0.5%.',
        'Deuda pública bruta: 66.6% del PIB (1989), 33.7% (1993) y 50.7% (1994). El texto también da 67% a 30% (1989–93) y 78.4% a 34.7% (1986–93): di que el orden de magnitud es lo que importa.',
        'Reservas: $29 mil millones (feb-1994), ≈$16 (agosto) y ≈$6 (diciembre). Tesobonos: de $1.2 a $17.8 mil millones.',
        'Subasta de tesobonos del 27-dic-1994: ofertas por $28 millones de $600 millones.',
        'Rescate de 1995: $52 mil millones, con $17 del FMI y $20 de EUA.',
      ],
      today: 'Vigilar reservas netas frente a pasivos de corto plazo en emergentes como Argentina, y entender por qué las garantías a Pemex o a los bancos cuentan aunque no estén en la deuda federal.',
      ens: [
        ['¿México 1994 fue insolvencia o iliquidez? Argumenta con evidencia.', 'Dinámica de la deuda; equilibrios múltiples; prestamista de última instancia.'],
        ['Contrasta a Pill con Sachs et al.: ¿fundamentos o pánico?', 'Vulnerabilidad de años más detonante de corto plazo.'],
      ],
      trap: 'Citarlos como si dijeran que México estaba bien. Reconocen apreciación real y demasiado endeudamiento externo; lo que niegan es que eso determinara por sí solo el tamaño del colapso.',
      tip: ['Puede haber un mundo donde no pasa nada malo y otro donde alguien se pregunta qué pasa si no renuevan los tesobonos: se deben diecisiete y sólo hay seis.', 'Clase 26-oct'],
    },
    {
      id: 'svb', t: 'S6', name: 'Silicon Valley Bank: Gone in 36 Hours', by: 'Kang, Palepu, Wang y Lane · HBS, 2025; hechos de 2023', read: 'ok', link: 'bancos/svb',
      thesis: 'SVB no cayó por créditos malos: financió bonos largos con depósitos concentrados y sin seguro, y cuando las tasas subieron, la pérdida de confianza vació al banco en horas.',
      pts: [
        'Como llegaron depósitos sin demanda equivalente de crédito, SVB compró bonos largos para ganar algo más que en bonos cortos.',
        'Un bono del gobierno casi no tiene riesgo de impago, pero sí de tasa: cuando la tasa subió, su valor cayó.',
        'Clasificarlos como mantenidos a vencimiento evitó reconocer la pérdida en capital, pero no la borró.',
        'Quitar coberturas dejó al banco expuesto justo cuando subían las tasas.',
        'Como casi todos los depósitos no tenían seguro, cualquier duda hacía racional sacar el dinero.',
        'Los clientes estaban muy conectados y las apps permitían mover todo en minutos, por eso la corrida fue tan rápida.',
        'Anunciar pérdidas y la necesidad de capital antes de tenerlo aseguró la señal de alarma.',
        'Supervisores, auditor y calificadora también recibieron críticas, así que el caso no reparte la culpa sólo a la dirección.',
      ],
      data: [
        'Depósitos no asegurados: ≈94% (2022).',
        'Pérdidas no realizadas en bonos a vencimiento: ≈$15 mil millones, casi igual a su capital de $16 mil millones (2022).',
        'Tasa de la Fed: de 0.25% a 4.50% en 2022.',
        'Corrida: $42 mil millones en un día (9-mar-2023), y se esperaban ≈$100 mil millones al siguiente.',
      ],
      today: 'Pérdidas no realizadas que siguen en la banca de EUA, debate de capital, crédito privado, y stablecoins que compiten por depósitos.',
      ens: [
        ['¿Por qué comprar bonos del gobierno puede quebrar a un banco?', 'Transformación de plazos; valor presente; Diamond-Dybvig.'],
        ['¿Se justificó garantizar todos los depósitos de SVB? ¿Qué costo deja?', 'Prestamista de última instancia; riesgo moral.'],
      ],
      trap: 'Culpar a créditos a startups. Su cartera vencida era de 0.19% (2022). También evita exagerar lo único: un estudio citado en el caso encuentra ≈500 bancos con más riesgo de tasa al contar los préstamos; SVB se distinguió por su fondeo.',
      tip: ['Con tasas en cero, ganar 2% era mejor que nada, y por eso el banco alargó plazos. Luego las tasas subieron a 5% por la inflación; lo comparó con el subprime y pidió poner atención a las reglas contables.', 'Clase 28-oct'],
      qsSrc: 'Las nueve preguntas de Canvas. La ficha larga trae el detalle con preguntas guía de clase; estas son las oficiales.',
      qs: [
        ['¿Qué factores llevaron al colapso de SVB en marzo de 2023?', ['Transformación de plazos con bonos largos y sin cobertura.', 'Alza de tasas de 0.25% a 4.50% en 2022: pérdida no realizada de ≈$15 mil millones contra capital de $16 mil millones.', 'Fondeo sin seguro (≈94%), clientes conectados y un anuncio de capital mal ejecutado.']],
        ['¿Cómo contribuyó su modelo de negocio con startups y capital de riesgo?', ['Depósitos concentrados en un solo sector, sin seguro y que las empresas iban gastando.', 'Los depósitos crecieron más rápido que el crédito, y por eso terminó comprando bonos.', 'Cuando los fondos de capital de riesgo dicen salir, todos salen al mismo tiempo.']],
        ['¿Qué papel jugó invertir en valores largos respaldados por el gobierno?', ['Sin riesgo de impago, pero con riesgo de tasa: valor presente.', 'Cambió riesgo de crédito por riesgo de duración: su cartera vencida era de sólo 0.19% (2022).', 'Forzado a vender, la pérdida se volvió real.']],
        ['¿Qué efecto tuvieron las tasas al alza y cómo respondió la dirección?', ['Bajaron el valor de los bonos. Al mismo tiempo, los depósitos cayeron de $189.2 a $173.1 mil millones en 2022, porque las startups gastaban más rápido.','A mediados de 2022 la dirección esperaba tasas a la baja y redujo coberturas: de $15.3 mil millones (2021) a $563 millones (2022) en bonos disponibles para la venta.', 'Reaccionó tarde: la venta de bonos y el plan de capital de marzo de 2023 detonaron la alarma.']],
        ['¿Cómo afectó el tratamiento contable HTM a sus estados financieros y qué papel jugó el valor de mercado?', ['HTM va a costo: la pérdida queda en una nota, sin tocar el capital reportado.', 'HTM pasó de $14 a $91 mil millones (2019–22). La norma impide cubrirlo, así que elegirlo fue decidir no cubrir.', 'Sólo funciona si no necesitas vender. Con la salida de depósitos, el mercado miró el valor real: capital casi nulo.']],
        ['¿Cómo aceleraron la tecnología y las redes sociales la corrida?', ['Banca móvil: mover dinero sin ir a una sucursal, y en grandes montos.', 'Twitter y una comunidad muy conectada difundieron hechos, rumores y miedo.', 'Resultado: $42 mil millones en un día (9-mar-2023) y ≈$100 mil millones esperados al siguiente.']],
        ['¿Cómo lo expuso la transformación de plazos a una corrida tipo Diamond-Dybvig?', ['Pasivos a la vista y activos largos: el banco no puede pagarles a todos a la vez sin vender con pérdida.', 'Hay dos equilibrios: si crees que otros se quedan, te quedas; si crees que salen, lo racional es salir primero.', 'El seguro rompe ese juego, pero casi nadie lo tenía. La pregunta remite a una lectura del Comité Nobel en Canvas que no se pudo consultar aquí: revísala.']],
        ['¿Qué papel tuvieron la supervisión y la Fed?', ['Política: la Fed subió muy rápido, aunque eso es contexto, no excusa.', 'Supervisión: calificación CAMELS de 2 en agosto de 2022; SVB era el mayor banco que supervisaba la Fed de San Francisco y su director estaba en el consejo de ese banco.', 'Algunos culpan a la desregulación de 2018. El caso reporta las críticas sin repartir culpas definitivas.']],
        ['En retrospectiva, ¿qué pudo hacer distinto la dirección?', ['Comprar menos plazo o mantener coberturas.', 'Diversificar fondeo y tener un plan para salidas de depósitos.', 'Reunir el capital antes de anunciarlo. Esta respuesta es tu juicio: justifícala con el riesgo de tasa y la corrida.']],
      ],
    },
    {
      id: 'ecc', t: 'S7', name: 'Estimating Climate Cost', by: 'Título real: "Why any estimate of the cost of climate change will be flawed". El texto no trae autor, medio ni fecha; es posterior a 2022', read: 'ok', link: 'clima/ecc',
      thesis: 'Como no hay un segundo planeta para comparar, todo método para estimar el daño climático falla en algo; aun así, todos apuntan a un costo mucho mayor del que se creía.',
      pts: [
        'Comparar países calientes y fríos falla porque difieren en muchas otras cosas además del clima.',
        'Temperatura y crecimiento tienen tendencia, de modo que seguir regiones en el tiempo puede dar relaciones espurias.',
        'Usar choques de temperatura corrige eso, pero un choque corto no capta cómo se adapta la gente a largo plazo.',
        'Un área chica puede comprar fuera lo que le falta y el mundo no, por eso el dato local no se traslada al global.',
        'Usar el mundo como panel capta lo global, pero con pocos datos y choques chicos, por lo que puede sobrestimar.',
        'Sumar daños de abajo hacia arriba muestra de dónde viene cada dólar, pero la lista nunca está completa.',
      ],
      data: [
        'Nordhaus (1991): 1–2% del PIB mundial con +3 °C, una corazonada informada.',
        'Bilal y Känzig: −12% del PIB por +1 °C.',
        'Costo social del carbono: $51 y $190 de la EPA (propuesta de 2022), y $1,056 por tonelada de Bilal y Känzig.',
      ],
      today: 'El retroceso de la regla climática de la SEC, y pérdidas aseguradas bajas en 2026 que no prueban menos riesgo.',
      ens: [
        ['¿Por qué las estimaciones del costo del carbono difieren tanto? ¿Qué debe hacer una empresa con esa incertidumbre?', 'SCC; función de daños; riesgo físico vs transición.'],
        ['Si el costo es tan incierto, ¿conviene esperar para actuar?', 'Colas de riesgo; adaptación; puntos de inflexión.'],
      ],
      trap: 'Citar $1,056 o −12% como consenso. La lectura presenta ese número como resultado de un artículo reciente y explica por qué podría estar sobrestimado.',
    },
    {
      id: 'bnef', t: 'S7', name: 'Mother of All Sustainability Reporting Standards Unveiled', by: 'Dewhurst · BloombergNEF, 10 de julio de 2023', read: 'ok', link: 'clima/bnef',
      note: 'No aparece en la tabla de la guía del profe, pero está entre las lecturas del curso. Es una nota breve y de 2023.',
      thesis: 'NIIF S1 y S2 buscan reemplazar la sopa de letras de marcos voluntarios por un lenguaje común, tratando la sostenibilidad como un riesgo financiero y no sólo como un asunto moral.',
      pts: [
        'Los marcos fragmentados obligan a reportar doble y dificultan comparar, y eso sube costos para empresas e inversionistas.',
        'S1 pide revelar riesgos y oportunidades de sostenibilidad que afecten financieramente; S2 lo aplica al clima, con análisis de escenarios.',
        'Como ISSB parte de TCFD, SASB y CDSB, esos marcos pierden utilidad por el traslape, aunque sirven de referencia.',
        'GRI, CDP, GHG Protocol y los Principios de Inversión Responsable sobreviven porque cumplen otras funciones.',
        'ISSB no puede obligar; el efecto real depende de que cada jurisdicción lo adopte.',
        'Medir bien es el primer paso para fijar metas, por eso importa aunque no reduzca emisiones por sí mismo.',
      ],
      data: [
        'Vigencia: periodos anuales desde el 1-ene-2024, con información visible desde 2025.',
        'ISSB se creó en noviembre de 2021 (COP26) y tiene 14 miembros.',
        'Consulta: más de 1,400 comentarios y 400 eventos.',
      ],
      today: 'El primer ciclo de informes en México bajo NIIF S1 y S2 (CNBV), la regla de California, y la propuesta de la SEC para derogar la suya.',
      ens: [
        ['EUA retrocede y México adopta NIIF S1/S2. ¿Qué implica para una empresa mexicana que exporta?', 'Riesgo de transición; comparabilidad; costo de capital.'],
      ],
      trap: 'Dos: decir que ISSB es obligatorio y confundir materialidad. La nota habla de doble materialidad en un sentido poco común; lo que describe en S1 es materialidad financiera, que es como conviene explicarla.',
    },
    {
      id: 'esg', t: 'S7', name: 'Who Killed ESG', by: 'Video opcional · no hay resumen en esta guía', read: 'opt', link: 'clima/wke', linkLabel: 'sección en S7',
      note: 'El profe aclaró que este video es opcional y que no viene necesariamente; es más importante otro video, el de las presentaciones, que cada alumno ve por su cuenta. Aquí no se le atribuye ninguna tesis, dato ni argumento. Lo de abajo sale de otros documentos y noticias.',
      ptsLabel: 'Si cae el tema, esto se sostiene con otras fuentes',
      pts: [
        'Si la regulación federal retrocede en EUA pero exigen reportes en California y México, el reporte se fragmenta en vez de desaparecer.',
        'Como el capital sigue tesis de negocio, puede volver a un ETF de red eléctrica sin que regrese el ESG en general.',
        'Como ISSB trata la sostenibilidad como riesgo financiero, su lógica no depende de la etiqueta (BloombergNEF, 2023).',
        'Como el costo climático es incierto pero alto, abandonar la medición no elimina la exposición (Estimating Climate Cost).',
      ],
      dataLabel: 'Datos ancla de noticias, no del video',
      data: [
        'Morningstar: primera entrada neta a fondos sustentables de EUA desde 2022, de ≈$3 mil millones (2T-2026), con un solo ETF captando $3.1 mil millones.',
        'SEC: propuesta de derogar su regla climática, con comentarios hasta el 3-ago-2026.',
      ],
      today: 'Retroceso político en EUA, adopción en México y dinero que se mueve hacia infraestructura eléctrica. Son los temas de noticias que marca la guía del profe.',
      ens: [
        ['¿Murió el ESG o sólo la etiqueta?', 'Riesgo físico vs transición; NIIF S1/S2. Apóyate en las lecturas y noticias, no en el video.'],
      ],
      trap: 'Atribuirle al video una tesis sin haberlo visto, o concluir que si ESG perdió apoyo político, el riesgo climático dejó de ser material.',
    },
  ];

  // ------------------------------------------------------------------ Fotos en el tiempo
  const FOTOS = [
    ['Nota México 1960–1976', '2026, sobre 1960–76', 'Es historia: el régimen ya no es fijo, pero sigue el debate fiscal'],
    ['Sachs et al.', '1996', 'México pasó de banda a flotación; ellos proponían una banda deslizante'],
    ['Pill', '2002', 'Igual: hoy el choque pega en el peso'],
    ['Bernanke', '2005', 'Déficit de EUA de ≈5.5% a 3.0% del PIB, y hoy pesa más el gobierno'],
    ['Rodriguez', '2011', 'El modelo sigue; China ya no crece cerca de 10%'],
    ['Roscini y Schlefer', '2013', 'La fórmula sigue; Grecia es un ejemplo de 2010'],
    ['Murphy', '2022', 'Termina en 2020, antes del alza de inflación y tasas'],
    ['BloombergNEF', '2023', 'De lanzamiento a adopción desigual'],
    ['Misawa; Warnock y Walsh', '2024', 'YCC terminó en 2024; el pronóstico del FMI es de 2022'],
    ['Bloomberg Economics', 'abril de 2024', 'Proyecciones anteriores al déficit del año fiscal 2026'],
    ['Tabellini', '2024', 'El T-MEC pasó de promesa a revisión'],
    ['Kehoe y Xu; Yang et al.', '2025', 'Los más recientes, sin los aranceles y datos de 2026'],
    ['Kang et al.', '2025', 'Hechos de 2023; el riesgo migra a crédito privado'],
    ['Financial Times', 'diciembre de 2025', 'El BoJ pasó de 0.5% a 1.25% (oct-2026)'],
    ['Nota de Apple', '2026, datos a dic-2025', 'Sin dato verificado más reciente sobre la cadena'],
    ['Nota de balanza de pagos', '2026, datos a abril', 'Reservas ≈$257 mil millones, casi iguales en oct-2026'],
  ];

  const list = (a) => `<ul class="sx-ctx-ul">${a.map((x) => `<li>${x}</li>`).join('')}</ul>`;

  const ideaHtml = (d, i) => `<article class="card2 sx-ctx-idea" data-sec="${E.TOPIC_SEC[d.sec]}">
    <div class="sx-ctx-top"><span class="sx-ctx-n">${i + 1}</span><h3>${d.t}</h3></div>
    <div class="sx-ctx-two">
      <div><div class="sx-ctx-lbl">Lo que dicen los documentos</div><p class="small">${d.doc}</p></div>
      <div><div class="sx-ctx-lbl">Hoy · <span class="sx-ctx-st ${d.st}">${STATE[d.st]}</span></div><p class="small">${d.hoy}</p></div>
    </div>
    <p class="small muted sx-ctx-src"><b>Sale de:</b> ${d.src} · <b>Herramienta:</b> ${d.tool}</p>
  </article>`;

  const qsHtml = (d) => E.reveal(`${d.qsTitle || 'Preguntas oficiales del caso'} (${d.qs.length})`, `<p class="small muted">${d.qsSrc}</p>${d.qs.map(([q, a], i) => `<div class="sx-ctx-q"><p class="small"><b>${i + 1}. ${q}</b></p>${list(a)}</div>`).join('')}`);

  const docHtml = (d) => `<article class="card2 sx-ctx-doc" data-t="${(d.ts || [d.t]).join(' ')}" data-sec="${E.TOPIC_SEC[d.t]}">
    <div class="sx-ctx-meta">${(d.ts || [d.t]).map((x) => `<span class="sx-ctx-pill">${x}</span>`).join('')}${d.req ? '<span class="sx-ctx-pill sx-ctx-req">Requerida · prioridad alta</span>' : ''}<span class="sx-ctx-read ${d.read}">${READ[d.read]}</span></div>
    <h3>${d.name}</h3>
    <p class="small muted sx-ctx-by">${d.by} · ${E.link(d.link, d.linkLabel || 'ficha larga')}</p>
    ${d.note ? E.note(d.note, d.read === 'opt' ? 'Aviso' : 'Fuente') : ''}
    ${d.thesis ? `<div class="sx-ctx-lbl">${d.thesisLabel || 'La tesis en una frase'}</div><p class="sx-ctx-thesis">${d.thesis}</p>` : ''}
    <div class="sx-ctx-lbl">${d.ptsLabel || 'Puntos clave a recordar'}</div>
    ${list(d.pts)}
    ${d.qs ? qsHtml(d) : ''}
    ${E.reveal(d.dataLabel || 'Datos ancla, sólo para orientarte', list(d.data))}
    ${E.reveal('Qué te deja entender de hoy', `<p class="small">${d.today}</p>`)}
    ${E.reveal('Cómo podría caer en un ensayo', d.ens.map(([q, h]) => `<p class="small"><b>${q}</b><br>Herramienta: ${h}</p>`).join(''))}
    <div class="co warn sx-ctx-trap"><b>Trampa frecuente</b>${d.trap}</div>
    ${d.tip ? E.tip(d.tip[0], d.tip[1]) : ''}
  </article>`;

  E.section({
    id: 'contexto', n: 86, group: 'examen', icon: '🗺️', short: 'Puntos clave', exam: 'star',
    title: 'Puntos clave: el mundo que cuentan los documentos',
    lead: 'Qué retener de cada lectura y cómo usarla para interpretar lo que pasa hoy. Los resúmenes completos están en cada tema; aquí está lo que conviene llevar en la cabeza.',
    render(root) {
      root.innerHTML = `
      <style>
        .sx-ctx [hidden]{display:none!important}
        .sx-ctx-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:14px;margin-top:14px}
        .sx-ctx-two{display:grid;grid-template-columns:minmax(0,1fr);gap:4px 20px}
        @media(min-width:760px){.sx-ctx-two{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(min-width:1280px){.sx-ctx-docs{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}}
        .sx-ctx .card2 h3{margin:0;font-size:16.5px;line-height:1.3}
        .sx-ctx-top{display:flex;gap:10px;align-items:flex-start;margin-bottom:8px}
        .sx-ctx-n{flex:none;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;background:var(--accent-wash);color:var(--accent-ink)}
        .sx-ctx-lbl{font-size:12px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:var(--muted);margin:10px 0 3px}
        .sx-ctx-st{text-transform:none;letter-spacing:0}
        .sx-ctx-st.sigue{color:var(--good)}
        .sx-ctx-st.cambio{color:var(--accent-ink)}
        .sx-ctx-st.vieja{color:var(--bad)}
        .sx-ctx-idea p{margin:0}
        .sx-ctx-src{margin-top:10px!important;padding-top:8px;border-top:1px solid var(--line)}
        .sx-ctx-meta{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:6px}
        .sx-ctx-pill,.sx-ctx-read{font-size:11.5px;font-weight:700;border-radius:5px;padding:2px 7px;background:var(--accent-wash);color:var(--accent-ink)}
        .sx-ctx-read{background:transparent;border:1px solid var(--line);color:var(--ink2);font-weight:600}
        .sx-ctx-read.opt{border-style:dashed;color:var(--muted)}
        .sx-ctx-req{background:var(--btn-on);color:var(--btn-on-ink)}
        .sx-ctx-q{margin-top:10px}
        .sx-ctx-q p{margin:0 0 2px}
        .sx-ctx-q .sx-ctx-ul{font-size:13.5px}
        .sx-ctx-by{margin:3px 0 6px}
        .sx-ctx-thesis{margin:0;font-weight:600;line-height:1.45}
        .sx-ctx-ul{margin:2px 0 8px;font-size:14.5px}
        .sx-ctx-doc .co{max-width:none;overflow-wrap:anywhere}
        .sx-ctx-doc .tblwrap{max-width:100%}
      </style>
      <div class="sx-ctx">
        ${E.key('<b>Primero la idea, luego la herramienta y al final la noticia.</b> El profe pregunta por la narrativa, no por cifras. Las cifras de esta página sirven para dimensionar: no las memorices, y si dudas de una, escribe el orden de magnitud y el mecanismo.', 'Cómo usar esta página')}
        ${E.warn('Varios documentos son de hace años. Si citas un dato, di de cuándo es: "en 2004, según Bernanke" suma puntos, y presentarlo como dato actual los resta. Lo marcado como <b>Hoy</b> viene de las noticias verificadas al 2 de noviembre de 2026; revisa lo que salga antes del examen.')}

        <h2>El mundo hoy en 15 ideas</h2>
        <p class="prose small">Cada idea separa lo que dice el documento, con su año, de lo que sigue vigente. Las fuentes de <b>Hoy</b> están en ${E.link('noticias', 'Noticias')}; las interpretaciones son lecturas con las herramientas del curso, no hechos reportados.</p>
        <div class="sx-ctx-grid">${IDEAS.map(ideaHtml).join('')}</div>

        ${E.reveal('Cuándo se tomó cada foto y qué cambió desde entonces', E.table(FOTOS, { head: ['Documento', 'Año del documento', 'Qué tener presente hoy'] }))}

        <h2>Ficha por documento</h2>
        <p class="prose small">Empieza por la nota de balanza de pagos, que es requerida. El plegable <b>Preguntas oficiales del caso</b> sale de Canvas: el profe dijo que son la guía para responder los ensayos, así que léelo primero en cada caso. Las de "Cómo podría caer en un ensayo" son de práctica y no son las del examen. Los datos ancla van plegados para que primero repases el argumento.</p>
        <div class="btnrow" id="ctx-flt" style="margin:12px 0 4px"><button class="btn sm on" type="button" data-t="">Todas</button>${TOPICS.map(([k, l]) => `<button class="btn sm" type="button" data-t="${k}">${k} ${l}</button>`).join('')}</div>
        <p class="small muted" id="ctx-count" aria-live="polite"></p>
        <div class="sx-ctx-grid sx-ctx-docs" id="ctx-docs">${DOCS.map(docHtml).join('')}</div>
      </div>`;

      const docs = Array.from(root.querySelectorAll('#ctx-docs > article'));
      const count = root.querySelector('#ctx-count');
      const flt = root.querySelector('#ctx-flt');
      const apply = (t) => {
        let n = 0;
        docs.forEach((a) => { const show = !t || a.dataset.t.split(' ').includes(t); a.hidden = !show; if (show) n += 1; });
        count.textContent = `${n} ${n === 1 ? 'documento' : 'documentos'}`;
      };
      flt.addEventListener('click', (ev) => {
        const b = ev.target.closest('button'); if (!b) return;
        flt.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
        apply(b.dataset.t);
      });
      apply('');
    },
  });
})();
