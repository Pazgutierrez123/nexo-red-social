import { IconUsers, IconCompass, IconShield, IconServer, IconLock, IconGraph } from './Icons'

const PLATAFORMAS = [
  { nombre: 'Instagram', sub: 'Red de seguidores', puntos: ['Contenido visual predominante', 'Seguimiento unidireccional (SIGUE)', 'Recomendación masiva de contenido'], tomado: 'Seguimiento unidireccional e interacciones sobre el contenido (reaccionar, guardar, compartir).', descartado: 'Historias efímeras y métricas públicas de popularidad.' },
  { nombre: 'LinkedIn', sub: 'Red de contactos', puntos: ['Perfil orientado al currículum', 'Conexiones bidireccionales formales', 'Sugerencias de empleo y contactos'], tomado: 'Conexiones bidireccionales (simplificadas en AMIGO_DE) y contexto académico y laboral.', descartado: 'Perfil centrado en el currículum y contadores de contactos.' },
  { nombre: 'Reddit', sub: 'Red de comunidades', puntos: ['Estructura basada en comunidades', 'Interacción mayormente anónima', 'Visibilidad determinada por votos'], tomado: 'Comunidades temáticas con administradores y comentarios jerárquicos.', descartado: 'Anonimato y ranking opaco por votos: Nexo prioriza la explicabilidad.' },
]

const NODOS = [
  ['Usuario', 'Identidad, estado y credenciales. Centro del grafo.'],
  ['Publicacion', 'Unidad principal de contenido creado.'],
  ['Comentario', 'Conversaciones jerárquicas asociadas.'],
  ['Comunidad', 'Espacios temáticos con moderación.'],
  ['Interes', 'Catálogo para afinidad y sugerencias.'],
  ['Hashtag', 'Etiquetado libre de publicaciones.'],
  ['Evento', 'Actividades presenciales o virtuales.'],
  ['Universidad', 'Origen académico formal del usuario.'],
  ['Empresa', 'Contexto profesional y destino de la mentoría.'],
]

const RELACIONES = [
  ['SIGUE', 'Usuario → Usuario', 'Unidireccional', 'Recibe las publicaciones del otro'],
  ['AMIGO_DE', 'Usuario — Usuario', 'Bidireccional', 'Conexión aceptada entre dos usuarios'],
  ['BLOQUEA', 'Usuario → Usuario', 'Unidireccional', 'Restricción total de visibilidad mutua'],
  ['MENTORIZA', 'Usuario → Usuario', 'Unidireccional', 'Vínculo formativo y apoyo profesional'],
  ['PUBLICA / ESCRIBE', 'Usuario → Publicacion / Comentario', 'Unidireccional', 'Autoría del contenido'],
  ['COMENTA_EN / RESPONDE_A', 'Comentario → Publicacion / Comentario', 'Unidireccional', 'Conversación jerárquica'],
  ['REACCIONA / COMPARTE / GUARDA', 'Usuario → Publicacion', 'Unidireccional', 'Interacciones que alimentan la recomendación'],
  ['PERTENECE_A / ADMINISTRA', 'Usuario → Comunidad', 'Unidireccional', 'Membresía y moderación'],
  ['TIENE_INTERES_EN', 'Usuario → Interes', 'Unidireccional', 'Afinidad declarada (alto / medio / bajo)'],
  ['PUBLICA_EN / ETIQUETA', 'Publicacion → Comunidad / Hashtag', 'Unidireccional', 'Destino y etiqueta temática'],
  ['PARTICIPA_EN', 'Usuario → Evento', 'Unidireccional', 'Asistencia o inscripción'],
  ['ESTUDIA_EN / TRABAJA_EN', 'Usuario → Universidad / Empresa', 'Unidireccional', 'Vínculo académico y laboral'],
]

const COMPARA = [
  ['Usuarios', 'Perfil sobrio, sin métricas públicas', 'Perfil visual con métricas', 'Perfil profesional (currículum)', 'Perfil anónimo con karma'],
  ['Conexión', 'AMIGO_DE (bidireccional) y SIGUE', 'SIGUE (unidireccional)', 'CONECTA_CON (bidireccional)', 'Suscripción a comunidades'],
  ['Publicaciones', 'Texto, recursos, preguntas, eventos', 'Fotos, videos, historias', 'Artículos y publicaciones', 'Enlaces, texto, hilos'],
  ['Comentarios', 'Jerárquicos (RESPONDE_A)', 'Planos', 'Planos', 'Jerárquicos y votados'],
  ['Comunidades', 'Círculos curados y limitados', 'No', 'Grupos y empresas', 'Subreddits abiertos'],
  ['Recomendaciones', 'Rutas de mentoría explicables', 'Exploración y reels', 'Empleos y contactos', 'Ranking por votos'],
  ['Diferenciador', 'Mentoría integrada', 'Contenido visual', 'Trayectoria profesional', 'Gobernanza comunitaria'],
]

function Diagrama() {
  const cx = 400, cy = 260
  const nodos = [
    ['Publicacion', 'PUBLICA'], ['Comunidad', 'PERTENECE_A'], ['Interes', 'TIENE_INTERES_EN'], ['Evento', 'PARTICIPA_EN'],
    ['Universidad', 'ESTUDIA_EN'], ['Empresa', 'TRABAJA_EN'], ['Comentario', 'ESCRIBE'], ['Hashtag', null],
  ]
  const n = nodos.length - 1
  const pos = nodos.map((_, i) => {
    if (i === n) return [705, 60]
    const a = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
    return [cx + Math.cos(a) * 300, cy + Math.sin(a) * 195]
  })
  const P = Object.fromEntries(nodos.map(([n], i) => [n, pos[i]]))
  const extra = [['Publicacion', 'Hashtag', 'ETIQUETA'], ['Comentario', 'Publicacion', 'COMENTA_EN'], ['Publicacion', 'Comunidad', 'PUBLICA_EN'], ['Interes', 'Comunidad', 'AGRUPA']]
  const edge = (x1, y1, x2, y2, pad1, pad2) => {
    const d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d
    return [x1 + ux * pad1, y1 + uy * pad1, x2 - ux * pad2, y2 - uy * pad2]
  }
  return (
    <svg viewBox="0 0 800 520" className="diagrama" role="img" aria-label="Diagrama del grafo de Nexo">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#8b8b9a" /></marker>
      </defs>
      {extra.map(([a, b, l]) => {
        const [x1, y1, x2, y2] = edge(...P[a], ...P[b], 50, 58)
        return <g key={l}><line x1={x1} y1={y1} x2={x2} y2={y2} className="edge dashed" markerEnd="url(#arr)" /><text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} className="elabel alt">{l}</text></g>
      })}
      {nodos.map(([n, l], i) => {
        if (!l) return null
        const [x1, y1, x2, y2] = edge(cx, cy, ...pos[i], 62, 58)
        return <g key={n}><line x1={x1} y1={y1} x2={x2} y2={y2} className="edge" markerEnd="url(#arr)" /><text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} className="elabel">{l}</text></g>
      })}
      <path d={`M ${cx - 40} ${cy - 30} C ${cx - 120} ${cy - 120}, ${cx + 120} ${cy - 120}, ${cx + 40} ${cy - 30}`} className="edge self" markerEnd="url(#arr)" />
      <text x={cx} y={cy - 122} className="elabel self-l">SIGUE · AMIGO_DE</text>
      <text x={cx} y={cy - 108} className="elabel self-l">BLOQUEA · MENTORIZA</text>
      {nodos.map(([n], i) => (
        <g key={n}><rect x={pos[i][0] - 56} y={pos[i][1] - 20} width="112" height="40" rx="10" className="gnode" /><text x={pos[i][0]} y={pos[i][1] + 5} className="gtext">{n}</text></g>
      ))}
      <rect x={cx - 64} y={cy - 28} width="128" height="56" rx="14" className="gnode center" />
      <text x={cx} y={cy + 2} className="gtext center">Usuario</text>
      <text x={cx} y={cy + 18} className="gtext sm">centro del grafo</text>
    </svg>
  )
}

function Seccion({ eyebrow, titulo, children, dark }) {
  return (
    <section className={`seccion ${dark ? 'dark' : ''}`}>
      <div className="wrap">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{titulo}</h2>
        {children}
      </div>
    </section>
  )
}

export default function ComoFunciona() {
  return (
    <div>
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">Herramientas de Diseño 2026</span>
          <h1>Plataforma Nexo:<br />Red Social Basada en Grafos</h1>
          <div className="rule" />
          <p>Planificación y diseño de una red para universitarios y profesionales, centrada en el aprendizaje y el crecimiento profesional entre pares.</p>
          <p className="autores">Hypatia García · Milagros Iglesias · Paz Gutierrez · Tobias Franco</p>
        </div>
      </section>

      <Seccion eyebrow="Investigación previa" titulo="Análisis de plataformas actuales">
        <p className="lead">Se estudiaron tres plataformas con modelos contrastados. Todas organizan su información en cuatro bloques: usuarios, relaciones, contenido e interacciones.</p>
        <div className="grid3">
          {PLATAFORMAS.map((p) => (
            <div className="card plat" key={p.nombre}>
              <h3>{p.nombre}</h3><span className="small muted">{p.sub}</span>
              <ul>{p.puntos.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="kv ok"><b>Lo que tomó Nexo</b><p>{p.tomado}</p></div>
              <div className="kv no"><b>Lo que descartó</b><p>{p.descartado}</p></div>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion eyebrow="Decisión tecnológica" titulo="¿Por qué usar bases de datos de grafos?">
        <div className="two">
          <div>
            <p className="lead">Las redes sociales son literalmente grafos de personas y conexiones. El modelo relacional degrada su rendimiento al cruzar múltiples tablas con JOINs.</p>
            <div className="callout"><b>Relaciones de primer orden</b><p>Los enlaces se almacenan físicamente junto a los nodos: recorrer una relación es seguir un puntero, y el costo depende de los nodos visitados, no del tamaño total de la base.</p></div>
            <p className="small muted">Tecnología de referencia: <b>Neo4j</b> con lenguaje <b>Cypher</b> (también se evaluaron Amazon Neptune, ArangoDB, JanusGraph y Memgraph).</p>
          </div>
          <table className="tabla">
            <thead><tr><th>Criterio</th><th>Relacional</th><th>Grafos</th></tr></thead>
            <tbody>
              <tr><td>Unidad básica</td><td>Fila y tabla</td><td><b>Nodo y relación</b></td></tr>
              <tr><td>Consultas multi-salto</td><td>JOINs costosos</td><td><b>Recorridos naturales</b></td></tr>
              <tr><td>Esquema</td><td>Rígido y normalizado</td><td><b>Flexible por etiquetas</b></td></tr>
              <tr><td>Propiedades de la relación</td><td>Tabla intermedia</td><td><b>En la propia relación</b></td></tr>
              <tr><td>Fuerte principal</td><td>Integridad transaccional</td><td><b>Recomendaciones</b></td></tr>
              <tr><td>Lenguaje</td><td>SQL</td><td><b>Cypher, Gremlin, GQL</b></td></tr>
            </tbody>
          </table>
        </div>
      </Seccion>

      <Seccion eyebrow="Nuestra propuesta" titulo="Una red social para el crecimiento académico y profesional">
        <div className="grid3">
          <div className="feature"><IconUsers size={26} /><h3>Público objetivo</h3><p>Estudiantes de 18 a 26 años, egresados jóvenes y profesionales con menos de 10 años de experiencia.</p></div>
          <div className="feature"><IconCompass size={26} /><h3>Diferenciador</h3><p>Mentoría integrada mediante rutas explicables en el grafo, y círculos de interés curados de participación limitada.</p></div>
          <div className="feature"><IconShield size={26} /><h3>Identidad sobria</h3><p>Sin contadores públicos de popularidad, para favorecer la interacción de calidad sobre el volumen.</p></div>
        </div>
      </Seccion>

      <Seccion eyebrow="Diseño conceptual" titulo="Los 9 nodos principales">
        <div className="grid3">
          {NODOS.map(([n, d]) => <div className="card nodo" key={n}><b>:{n}</b><p className="small muted">{d}</p></div>)}
        </div>
      </Seccion>

      <Seccion eyebrow="Diseño conceptual" titulo="Diagrama estructural del grafo">
        <div className="card"><Diagrama /></div>
        <p className="small muted">Las líneas continuas salen del nodo Usuario; las punteadas conectan contenido, comunidades e intereses entre sí. El recorrido usuario → interés → comunidad sustenta las recomendaciones.</p>
      </Seccion>

      <Seccion eyebrow="Diseño conceptual" titulo="Diccionario de relaciones">
        <div className="table-scroll">
          <table className="tabla">
            <thead><tr><th>Relación</th><th>Origen → Destino</th><th>Dirección</th><th>Significado</th></tr></thead>
            <tbody>{RELACIONES.map((r) => <tr key={r[0]}><td><code>{r[0]}</code></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}</tbody>
          </table>
        </div>
      </Seccion>

      <Seccion eyebrow="Consultas y lógica" titulo="Sistema de recomendación">
        <div className="two">
          <ol className="pasos">
            <li><b>Cierre triádico</b><p>Sugerencia de contactos a partir de amigos en común (vecinos de segundo grado).</p></li>
            <li><b>Afinidad temática</b><p>Cruce de usuarios y comunidades vinculados al mismo nodo Interés.</p></li>
            <li><b>Filtrado colaborativo</b><p>Quienes reaccionaron, guardaron o compartieron esto también interactuaron con aquello.</p></li>
            <li><b>Rutas de mentoría</b><p>Explicación del vínculo: «conoce a X, quien conoce a tu mentor ideal».</p></li>
          </ol>
          <div>
            <p className="small muted">C-4 · Sugerencias de conexión (amigos de amigos)</p>
            <pre className="code">{`MATCH (u:Usuario {idUsuario: $id})-[:AMIGO_DE]->(x)-[:AMIGO_DE]->(c:Usuario)
WHERE NOT (u)-[:AMIGO_DE]->(c) AND c <> u
  AND c.estado = 'activo'
RETURN c.username, COUNT(x) AS amigosEnComun
ORDER BY amigosEnComun DESC LIMIT 10`}</pre>
            <p className="small muted">C-2 · Muro de publicaciones (feed)</p>
            <pre className="code">{`MATCH (u:Usuario {idUsuario: $id})
MATCH (u)-[:AMIGO_DE|SIGUE]->(autor)-[:PUBLICA]->(p:Publicacion)
WHERE p.privacidad IN ['publica','seguidores']
RETURN autor.username, p.contenido
ORDER BY p.fechaPublicacion DESC LIMIT 50`}</pre>
          </div>
        </div>
        <div className="pipeline">
          {['Selección de candidatos', 'Puntuación', 'Filtro de privacidad y bloqueos', 'Presentación con explicación'].map((p, i) => <div key={p}><span>{i + 1}</span>{p}</div>)}
        </div>
      </Seccion>

      <Seccion eyebrow="Diseño de infraestructura" titulo="Persistencia políglota">
        <div className="grid4">
          {[
            ['Neo4j (grafo)', 'Fuente de verdad del modelo social.', ['Grafo de conexiones', 'Interacciones', 'Comunidades e intereses', 'Motor de recomendaciones']],
            ['PostgreSQL', 'Datos transaccionales.', ['Cuentas y credenciales', 'Configuración del perfil', 'Registros de auditoría', 'Facturación']],
            ['Redis (caché)', 'Almacenamiento en memoria.', ['Muros de publicaciones', 'Consultas frecuentes', 'Sesiones activas']],
            ['Objetos', 'Archivos multimedia.', ['Fotografías', 'Videos', 'Recursos compartidos']],
          ].map(([t, d, l]) => <div className="card plat" key={t}><IconServer size={22} /><h3>{t}</h3><p className="small muted">{d}</p><ul>{l.map((x) => <li key={x}>{x}</li>)}</ul></div>)}
        </div>
      </Seccion>

      <Seccion titulo="Escalabilidad, seguridad y privacidad">
        <div className="two">
          <div className="card plat"><IconGraph size={22} /><h3>Escalabilidad</h3><ul><li>Réplicas de lectura para muros y recomendaciones</li><li>Particionado social por afinidad</li><li>Caché de muros en Redis</li><li>Escritura asíncrona mediante colas</li><li>Paginación obligatoria por cursores</li></ul></div>
          <div className="card plat"><IconLock size={22} /><h3>Seguridad y privacidad</h3><ul><li>Autorización basada en el grafo (el bloqueo se aplica primero)</li><li>Cifrado de datos sensibles en reposo</li><li>Borrado lógico con anonimización</li><li>Privacidad granular por publicación</li><li>Visualizaciones solo agregadas y anónimas</li></ul></div>
        </div>
      </Seccion>

      <Seccion eyebrow="Comparación final" titulo="Nexo frente a las plataformas investigadas">
        <div className="table-scroll">
          <table className="tabla compara">
            <thead><tr><th>Característica</th><th className="nexo">Nexo</th><th>Instagram</th><th>LinkedIn</th><th>Reddit</th></tr></thead>
            <tbody>{COMPARA.map((r) => <tr key={r[0]}><td><b>{r[0]}</b></td><td className="nexo">{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td></tr>)}</tbody>
          </table>
        </div>
      </Seccion>

      <Seccion titulo="Conclusiones del proyecto" dark>
        <div className="concl">
          <div><b>Coherencia estructural.</b> El modelo de grafos representa naturalmente las conexiones sociales sin tablas intermedias.</div>
          <div><b>Viabilidad técnica.</b> La propuesta es realizable con tecnologías actuales, separando correctamente el contenido de sus autores.</div>
          <div><b>Diferenciador claro.</b> La mentoría explicable otorga a Nexo una identidad única en el mercado actual.</div>
        </div>
        <p className="autores">Hypatia García · Milagros Iglesias · Paz Gutierrez · Tobias Franco — Facultad de Ingeniería, Herramientas de Diseño 2026</p>
      </Seccion>
    </div>
  )
}
