// Sección 1 — Lo que dijo el profe: formato, estrategia de tiempo, qué entra y cómo califica los ensayos.
(function () {
  const KEY = 'pei-checklist';
  const CHECK = [
    ['lockdown', 'Probar LockDown Browser y Canvas en mi computadora personal (la del trabajo puede bloquear Canvas).'],
    ['cases', 'Leer los casos de Canvas; el profe los repasó uno por uno y dijo que todos se vieron.'],
    ['preguntas', 'Repasar las preguntas de los casos: son la guía para responder.'],
    ['narrativas', 'Contar en voz alta las 7 narrativas como historias causales.'],
    ['noticias', 'Leer las noticias que el profe dejó en Canvas, por tema, y saber con qué herramienta se analiza cada una.'],
    ['video', 'Ver por mi cuenta el video de las presentaciones, que el profe consideró más importante que Who Killed ESG.'],
    ['ecoa', 'Responder la ECOA y subir la evidencia antes del miércoles a las 6 pm: son 3 puntos extra.'],
    ['required', 'Revisar en Canvas qué lecturas dicen required y darles prioridad.'],
    ['simulacro', 'Hacer un simulacro completo con cronómetro.'],
  ];
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } };
  const save = (o) => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} };

  E.section({
    id: 'examen', n: 1, group: 'inicio', icon: '🎓', short: 'Lo que dijo el profe', exam: 'in',
    title: 'Lo que dijo el profe sobre el examen',
    lead: 'Formato oficial del deck de indicaciones y lo que explicó en las clases del 28 de octubre y el 2 de noviembre.',
    render(root) {
      root.innerHTML = `
      <h2>El formato</h2>
      <div class="tblwrap">${E.table([
        ['<b>Opción múltiple</b>', '15', '30 pts', 'Conceptos y herramientas. De un banco de preguntas.', '≈25 min'],
        ['<b>Ensayos sobre casos</b>', '3', '35 pts', 'Qué pasó y por qué. ≈350 palabras cada uno.', '≈50 min'],
        ['<b>Ensayos sobre noticias</b>', '2', '35 pts', 'Interpreta una noticia con las herramientas. ≈350 palabras cada uno.', '≈35 min'],
        ['Total', '20', '100 pts', '≈120 min', '≈110 + 10 de colchón', { cls: 'tot' }],
      ], { head: ['Parte', 'Preguntas', 'Valor', 'Qué es', 'Tiempo sugerido*'] })}</div>
      <p class="small muted">*El tiempo sugerido es una propuesta de esta guía, no del profe. El orden real de las preguntas lo decide Canvas.</p>
      ${E.note('Cada ensayo de noticias vale más que uno de casos: 17.5 vs ≈11.7 pts. Una de opción múltiple vale 2 pts.', 'Haz las cuentas')}

      <h2>Lo nuevo de la clase del 2 de noviembre</h2>
      <div class="g2">
        ${E.tip('Le preguntaron si se puede usar una noticia más reciente y dijo que sí, pero prefiere que sea de las que dejó en Canvas: no quiere que le cuentes choro con una noticia que él no conoce.', 'Clase 2-nov')}
        ${E.tip('No habrá formulario. Basta con saber qué dice cada fórmula en su forma simple, como tasa real = nominal − inflación, y el impacto de cada variable.', 'Clase 2-nov')}
        ${E.tip('En la noticia no busca un resumen. Si sólo repites el artículo, demuestras que lo entendiste, pero lo que califica es el análisis crítico y el uso de las herramientas.', 'Clase 2-nov')}
        ${E.tip('Dejar una respuesta en blanco vale cero, y un par de renglones vale poco. Administra el tiempo para llegar a todos los ensayos.', 'Clase 2-nov')}
      </div>
      ${E.note('Sólo a algunos les tocará una pregunta numérica, porque salen de un banco, y fallarla no es mortal: mencionó que son unos 3 puntos, aunque el deck da 2 por pregunta. En el quiz de prueba, el ensayo de caso valía 10 puntos y el de noticia 15; el deck oficial da 35 pts a cada bloque. Toma como referencia el deck y revisa el valor en pantalla.', 'Puntos y preguntas')}
      ${E.warn('En un ensayo de noticia, el artículo se abre dentro del examen. Para volver a la pregunta usa el botón <b>Close</b>. No salgas del examen.')}

      <h2>Los ejemplos que resolvió en clase</h2>
      ${E.reveal('Opción múltiple: México da incentivos fiscales a plantas de exportación, los compensa con menos gasto y la IED financia más inversión. ¿Qué pasa con la cuenta corriente?', '<p class="small"><b>Herramienta:</b> S − I = (G − T) + (X − M).</p><p class="small">T y G bajan igual, así que G − T no cambia. S no cambia e I sube, entonces S − I se vuelve más negativo. Por lo tanto X − M también: la <b>cuenta corriente se va a déficit</b>, aunque las plantas exporten.</p>')}
      ${E.reveal('Opción múltiple: tasas de 8% en México y 4% en EUA; inflación esperada de ≈4.5% y 2.5%. ¿Qué dicen Fisher y la paridad descubierta?', '<p class="small"><b>Fisher:</b> tasa real ≈ 3.5% en México y 1.5% en EUA.</p><p class="small"><b>Paridad descubierta:</b> se calcula con tasas <i>nominales</i>: 8 − 4 implica una depreciación esperada del peso de ≈4%. Es lo que deja indiferente al inversionista.</p><p class="small"><b>Las trampas que descartó:</b> Fisher no habla de depreciación, y que las tasas reales difieran no significa que haya arbitraje.</p>')}
      ${E.reveal('Ensayo de caso: ¿una empresa mexicana de autopartes debería construir en China para el mercado local o para exportar?', '<p class="small">No es de fórmula. Evalúa que sepas qué pasa en el mundo: en China la gente no gasta y la demanda interna está deprimida, así que invertir para consumo interno es la apuesta débil.</p>')}
      ${E.reveal('Ensayo de noticia: artículo de Daniel Gros (oct-2026) sobre el lugar de Europa frente a EUA y China', '<p class="small">Así lo leyó el profe, con varias herramientas a la vez:</p><ul class="small"><li><b>Globalización:</b> cada bloque se especializa en su ventaja. EUA, en tecnología, IA y energía.</li><li><b>S − I:</b> EUA ahorra poco e invierte mucho, por eso tiene déficit externo <i>aunque</i> ponga aranceles. China es su espejo: ahorro altísimo y gran superávit. Europa tiene poco excedente de ahorro y poco superávit comercial.</li><li><b>Solow:</b> China partió de poco capital y creció rápido; hoy su acervo supera al de EUA, enfrenta rendimientos decrecientes y debe apoyarse en productividad y capital humano.</li><li><b>Tensión mundial:</b> el problema de China es su demanda interna; para bajar su superávit tendría que bajar su ahorro.</li></ul><p class="small"><b>Lección:</b> esta identidad explica el comercio exterior mejor que los aranceles o los subsidios. Nombra el concepto y muestra que lo entiendes, sin alargarte de más.</p>')}

      <h2>Cómo piensa el profe</h2>
      <div class="g2">
        ${E.tip('No te va a preguntar <i>repórtame el déficit fiscal de China en tal año</i>. Sí te puede preguntar <i>cuáles fueron las principales razones de lo que hizo China</i>. Para él, los casos son la narrativa de lo que pasó en la economía internacional.', 'Clase 28-oct')}
        ${E.tip('En las noticias no quiere que le cuentes lo que te dijo tu compadre. Quiere ver que interpretas conforme a los temas del curso, porque en esta materia es muy fácil que cada quien opine.', 'Clase 28-oct')}
        ${E.tip('Las preguntas de los casos son una guía para responder, también las de los que no tuviste que entregar, como Silicon Valley Bank.', 'Clase 28-oct')}
        ${E.tip('El propósito de fondo: que en tus otras clases puedas hablar de China, de Japón o de las tasas sabiendo qué está pasando, con herramientas y sin que sea plática de café.', 'Clase 2-nov')}
        ${E.tip('Si una lectura dice <i>required</i>, es importante: ahí van a estar algunas de las preguntas del examen. Las demás son opcionales.', 'Clase 1')}
        ${E.tip('Encuadró el curso así: hay riesgos macro, como las tasas y el tipo de cambio, que golpean los estados financieros de una empresa. Por eso, cierra tus ensayos con qué le pasa a la empresa o al inversionista.', 'Clase 1')}
      </div>

      <h2>Su ejemplo de pregunta de noticia</h2>
      <p class="prose">Puso este ejemplo: <b>la Fed deja las tasas constantes. ¿Qué implica para la economía global?</b> Y describió la respuesta que espera:</p>
      <div class="g3">
        <div class="card2"><h4>1. Herramienta</h4><p class="small">Ecuación de Fisher: tasa real = tasa nominal − inflación.</p></div>
        <div class="card2"><h4>2. Mecanismo</h4><p class="small">Si la nominal no se mueve y la inflación sigue bajando, la tasa real sube.</p></div>
        <div class="card2"><h4>3. Implicación</h4><p class="small">Los países emergentes tienen menos margen para bajar sus tasas sin perder atractivo (${E.link('monetaria', 'paridad de tasas')}).</p></div>
      </div>
      ${E.key('Copia esta estructura en cada ensayo de noticias: <b>herramienta → mecanismo → implicación</b>. Ve a ' + E.link('noticias', 'Noticias') + ' para practicarla.', 'Tu plantilla')}

      <h2>Estrategia de tiempo</h2>
      <div class="g2">
        <div class="card2"><h4>⏱️ El tiempo es parte de la prueba</h4><p class="small">El profe puso el tiempo justo a propósito para evitar que se copie. Prefirió que la respuesta sea menos pulida. Traduce: escribe lo esencial, no busques la redacción perfecta.</p></div>
        <div class="card2"><h4>🚫 No hay regreso</h4><p class="small">Una vez que contestas, no puedes volver. No marques para después: decide y avanza. Si dudas en una de opción múltiple (2 pts), no le dediques el tiempo de un ensayo (hasta 17.5 pts).</p></div>
        <div class="card2"><h4>✍️ Escribe en forma de esqueleto si vas tarde</h4><p class="small">Una lista de ideas con herramientas y mecanismos vale más que una página en blanco. Lo que no alcanzaste a contestar, dijo, ya no te lo puede calificar.</p></div>
        <div class="card2"><h4>📵 Logística</h4><p class="small">El profe no va a estar: cuidará personal del programa. Los celulares se guardan. Lleva tu computadora personal con LockDown Browser probado.</p></div>
      </div>

      <h2>Qué entra</h2>
      <p class="prose">Notas de clase, casos del Harvard Course Pack, lecturas requeridas en Canvas y noticias. Cuando un alumno preguntó si había que leer los nueve casos de la plataforma, respondió que sí y que todos los temas ya se vieron.</p>
      ${E.table([
        ['S1', E.link('crecimiento', 'Crecimiento'), 'Warnock y Walsh; Rodriguez', '✅ resumida con el texto de la lectura'],
        ['S2', E.link('flujos', 'Flujos'), 'Kehoe y Xu; Tabellini; Yang et al.', '✅ resumida con el texto de la lectura'],
        ['S2', E.link('flujos', 'Flujos'), 'Bernanke, Global Saving Glut', '✅ discurso que enlaza Canvas'],
        ['S3', E.link('fiscal', 'Fiscal'), 'Murphy; Roscini y Schlefer', '✅ resumida con el texto de la lectura'],
        ['S4', E.link('monetaria', 'Monetaria'), 'Misawa (BoJ)', '✅ resumida con el texto de la lectura'],
        ['S5', E.link('cambio', 'Cambio'), 'Pill (Tequila)', '✅ resumida con el texto de la lectura'],
        ['S5', E.link('cambio', 'Cambio'), 'Sachs, Tornell y Velasco', '✅ PDF de Canvas'],
        ['S6', E.link('bancos', 'Bancos'), 'Kang et al. (SVB)', '✅ resumida con el texto de la lectura'],
        ['S7', E.link('clima', 'Clima'), 'Estimating Climate Cost', '✅ resumida con el texto de la lectura'],
        ['S7', E.link('clima', 'Clima'), 'Who Killed ESG', 'Video opcional: el profe dijo que no viene necesariamente'],
      ], { head: ['Tema', 'Sección', 'Caso / lectura', 'Estado'] })}
      ${E.note('Who Killed ESG es un video y va sólo como concepto. El profe dijo que es más importante otro video, el de las presentaciones, que cada quien debe ver por su cuenta. Ve también ' + E.link('contexto', 'Puntos clave') + ' y ' + E.link('intuicion', 'Reglas de dedo') + '.', 'Sobre los materiales')}

      <h2>Tu checklist</h2>
      <div id="chk" class="card2"></div>
      `;
      const box = root.querySelector('#chk');
      const st = load();
      box.innerHTML = CHECK.map(([k, t]) => `<label style="display:flex;gap:10px;align-items:flex-start;padding:6px 0;cursor:pointer"><input type="checkbox" data-k="${k}" ${st[k] ? 'checked' : ''} style="margin-top:4px"><span>${t}</span></label>`).join('');
      box.addEventListener('change', (e) => { if (e.target.dataset.k) { st[e.target.dataset.k] = e.target.checked; save(st); } });
    },
  });
})();
