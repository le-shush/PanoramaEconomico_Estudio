// Sección 1 — Lo que dijo el profe: formato, estrategia de tiempo, qué entra y cómo califica los ensayos.
(function () {
  const KEY = 'pei-checklist';
  const CHECK = [
    ['lockdown', 'Probar LockDown Browser y Canvas en mi computadora personal (la del trabajo puede bloquear Canvas).'],
    ['cases', 'Leer los casos de Canvas; el profe los repasó uno por uno y dijo que todos se vieron.'],
    ['preguntas', 'Repasar las preguntas de los casos: son la guía para responder.'],
    ['narrativas', 'Contar en voz alta las 7 narrativas como historias causales.'],
    ['noticias', 'Leer noticias de los 7 temas: aranceles, T-MEC, Fed, Banxico, peso, Argentina, bancos, clima.'],
    ['invitada', 'Agregar mis apuntes de la clase de riesgo climático (lunes 2-nov) a mi repaso.'],
    ['esg', 'Preguntarle al profe cuál es la lectura Who Killed ESG.'],
    ['required', 'Revisar en Canvas qué lecturas dicen required y darles prioridad.'],
    ['simulacro', 'Hacer un simulacro completo con cronómetro.'],
  ];
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } };
  const save = (o) => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} };

  E.section({
    id: 'examen', n: 1, group: 'inicio', icon: '🎓', short: 'Lo que dijo el profe', exam: 'in',
    title: 'Lo que dijo el profe sobre el examen',
    lead: 'Formato oficial del deck de indicaciones y lo que explicó en la clase del 28 de octubre.',
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

      <h2>Cómo piensa el profe</h2>
      <div class="g2">
        ${E.tip('No te va a preguntar <i>repórtame el déficit fiscal de China en tal año</i>. Sí te puede preguntar <i>cuáles fueron las principales razones de lo que hizo China</i>. Para él, los casos son la narrativa de lo que pasó en la economía internacional.', 'Clase 28-oct')}
        ${E.tip('En las noticias no quiere que le cuentes lo que te dijo tu compadre. Quiere ver que interpretas conforme a los temas del curso, porque en esta materia es muy fácil que cada quien opine.', 'Clase 28-oct')}
        ${E.tip('Las preguntas de los casos son una guía para responder, también las de los que no tuviste que entregar, como Silicon Valley Bank.', 'Clase 28-oct')}
        ${E.tip('Te da el tipo de noticias de cada tema, pero no te dice cuál leer: quiere ver si ya estás al día con lo que se mueve ese día.', 'Clase 28-oct')}
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
      ${E.key('Copia esta estructura en cada ensayo de noticias: <b>herramienta → mecanismo → implicación</b>. Ve a ' + E.link('noticias', 'Noticias de hoy') + ' para practicarla.', 'Tu plantilla')}

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
        ['S2', E.link('flujos', 'Flujos'), 'Bernanke, Global Saving Glut', '🌐 resumida de su fuente pública'],
        ['S3', E.link('fiscal', 'Fiscal'), 'Murphy; Roscini y Schlefer', '✅ resumida con el texto de la lectura'],
        ['S4', E.link('monetaria', 'Monetaria'), 'Misawa (BoJ)', '✅ resumida con el texto de la lectura'],
        ['S5', E.link('cambio', 'Cambio'), 'Pill (Tequila)', '✅ resumida con el texto de la lectura'],
        ['S5', E.link('cambio', 'Cambio'), 'Sachs, Tornell y Velasco', '🌐 resumida de su fuente pública'],
        ['S6', E.link('bancos', 'Bancos'), 'Kang et al. (SVB)', '✅ resumida con el texto de la lectura'],
        ['S7', E.link('clima', 'Clima'), 'Estimating Climate Cost', '✅ resumida con el texto de la lectura'],
        ['S7', E.link('clima', 'Clima'), 'Who Killed ESG', '⚠️ sin identificar: confírmala con el profe'],
      ], { head: ['Tema', 'Sección', 'Caso / lectura', 'Estado'] })}
      ${E.warn('Who Killed ESG va sólo como concepto, porque no se confirmó cuál es la lectura. Bernanke y Sachs et al. van resumidas de su fuente pública. Revisa en Canvas si cuáles dicen <i>required</i>. La clase de riesgo climático con la invitada (2-nov) tampoco está grabada aquí.')}

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
