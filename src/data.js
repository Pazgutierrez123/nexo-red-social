export const ME = {
  id: 'sofia',
  nombre: 'Sofía Ramírez',
  carrera: 'Ing. en Sistemas',
  universidad: 'Universidad del Norte',
  bio: 'Estudiante de 4.º año. Me interesan los datos y el diseño de software.',
  intereses: [
    { nombre: 'Bases de datos', nivel: 'alto' },
    { nombre: 'Desarrollo web', nivel: 'alto' },
    { nombre: 'Inteligencia artificial', nivel: 'medio' },
    { nombre: 'UX / UI', nivel: 'bajo' },
  ],
}

export const USERS = {
  sofia: { nombre: 'Sofía Ramírez', rol: 'Ing. en Sistemas', org: 'Universidad del Norte', color: '#2c3e50' },
  ana: { nombre: 'Ana Torres', rol: 'Ing. en Sistemas', org: 'Universidad del Norte', color: '#3d5163' },
  carlos: { nombre: 'Carlos Méndez', rol: 'Data Engineer', org: 'Mercado Libre', color: '#4e6274' },
  lucia: { nombre: 'Lucía Fernández', rol: 'Diseño UX', org: 'Universidad de Palermo', color: '#5a6e7e' },
  martin: { nombre: 'Martín Gómez', rol: 'Backend Developer', org: 'Globant', color: '#354858' },
  valen: { nombre: 'Valentina Ruiz', rol: 'Lic. en Datos', org: 'Universidad del Norte', color: '#45596a' },
  diego: { nombre: 'Diego Paredes', rol: 'ML Engineer', org: 'Google', color: '#64788a' },
  julia: { nombre: 'Julia Sosa', rol: 'Product Manager', org: 'Accenture', color: '#52677a' },
  tomas: { nombre: 'Tomás Herrera', rol: 'Ing. Industrial', org: 'Universidad Tecnológica', color: '#485c6d' },
  camila: { nombre: 'Camila Ortiz', rol: 'Cloud Architect', org: 'Amazon Web Services', color: '#6b7f8e' },
}

// Grafo AMIGO_DE (bidireccional) para calcular rutas de mentoría con BFS
export const AMIGO_DE = [
  ['sofia', 'ana'], ['sofia', 'lucia'], ['sofia', 'tomas'],
  ['ana', 'carlos'], ['ana', 'valen'], ['lucia', 'julia'],
  ['tomas', 'martin'], ['valen', 'diego'], ['martin', 'camila'],
  ['julia', 'martin'],
]

export const EMPRESAS = ['Mercado Libre', 'Globant', 'Google', 'Accenture', 'Amazon Web Services']

export function vecinos(id) {
  const out = []
  for (const [a, b] of AMIGO_DE) {
    if (a === id) out.push(b)
    if (b === id) out.push(a)
  }
  return out
}

// shortestPath((a)-[:AMIGO_DE*1..5]-(m)-[:TRABAJA_EN]->(e))
export function rutaMentoria(origen, empresa) {
  const prev = { [origen]: null }
  const cola = [origen]
  while (cola.length) {
    const actual = cola.shift()
    if (actual !== origen && USERS[actual].org === empresa) {
      const ruta = []
      let n = actual
      while (n) { ruta.unshift(n); n = prev[n] }
      return ruta.length - 1 <= 5 ? ruta : null
    }
    for (const v of vecinos(actual)) {
      if (!(v in prev)) { prev[v] = actual; cola.push(v) }
    }
  }
  return null
}

export const POSTS = [
  {
    id: 1, autor: 'carlos', tipo: 'Recurso', fecha: 'hace 2 h', privacidad: 'Pública', comunidad: 'Bases de Datos y Grafos',
    contenido: 'Comparto mis apuntes para empezar con Neo4j y Cypher: modelado de nodos, relaciones y las primeras consultas MATCH. Ideal si están cursando Bases de Datos.',
    hashtags: ['neo4j', 'cypher', 'grafos'],
    comentarios: [
      { id: 11, autor: 'valen', texto: '¡Gracias! ¿Cubre también shortestPath?', respuestas: [
        { id: 111, autor: 'carlos', texto: 'Sí, en la última sección con un ejemplo de rutas entre usuarios.', respuestas: [] },
      ] },
    ],
  },
  {
    id: 2, autor: 'ana', tipo: 'Pregunta', fecha: 'hace 4 h', privacidad: 'Conexiones', comunidad: 'Desarrollo Web',
    contenido: '¿Qué recomiendan para el proyecto final: React con Vite o Next.js? El equipo tiene poca experiencia con SSR.',
    hashtags: ['react', 'proyectofinal'],
    comentarios: [
      { id: 21, autor: 'martin', texto: 'Para un equipo nuevo, Vite: menos conceptos y arranque rapidísimo.', respuestas: [] },
    ],
  },
  {
    id: 3, autor: 'julia', tipo: 'Evento', fecha: 'hace 6 h', privacidad: 'Pública', comunidad: 'Carrera Profesional',
    contenido: 'Taller abierto: "Cómo armar tu primer CV tech". Jueves 19 h, modalidad virtual. Cupo limitado a 40 personas.',
    hashtags: ['empleo', 'taller'],
    comentarios: [],
  },
  {
    id: 4, autor: 'diego', tipo: 'Texto', fecha: 'ayer', privacidad: 'Seguidores', comunidad: 'Inteligencia Artificial',
    contenido: 'Hace 3 años estaba en su lugar. Mi consejo: construyan proyectos pequeños y publiquen el avance. La constancia vale más que el proyecto perfecto.',
    hashtags: ['mentoria', 'ia'],
    comentarios: [],
  },
  {
    id: 5, autor: 'lucia', tipo: 'Avance de proyecto', fecha: 'ayer', privacidad: 'Comunidad', comunidad: 'UX / UI',
    contenido: 'Terminamos el prototipo de alta fidelidad de nuestra app de turnos. Busco 5 personas para un test de usabilidad de 15 minutos.',
    hashtags: ['ux', 'prototipo'],
    comentarios: [],
  },
]

export const COMUNIDADES = [
  { id: 'c1', nombre: 'Bases de Datos y Grafos', categoria: 'Tecnología', miembros: 18, cupo: 25, admin: 'carlos', desc: 'Modelado, SQL, Neo4j y consultas Cypher.', interes: 'Bases de datos', mio: true },
  { id: 'c2', nombre: 'Desarrollo Web', categoria: 'Tecnología', miembros: 22, cupo: 25, admin: 'martin', desc: 'Frontend, backend y buenas prácticas.', interes: 'Desarrollo web', mio: true },
  { id: 'c3', nombre: 'Inteligencia Artificial', categoria: 'Tecnología', miembros: 14, cupo: 20, admin: 'diego', desc: 'Machine learning aplicado y papers comentados.', interes: 'Inteligencia artificial', mio: false },
  { id: 'c4', nombre: 'UX / UI', categoria: 'Diseño', miembros: 11, cupo: 20, admin: 'lucia', desc: 'Investigación de usuarios y prototipado.', interes: 'UX / UI', mio: false },
  { id: 'c5', nombre: 'Carrera Profesional', categoria: 'Empleo', miembros: 24, cupo: 30, admin: 'julia', desc: 'CVs, entrevistas y primeras búsquedas laborales.', interes: 'Empleo', mio: false },
  { id: 'c6', nombre: 'Cloud y DevOps', categoria: 'Tecnología', miembros: 9, cupo: 20, admin: 'camila', desc: 'Infraestructura, contenedores y despliegue.', interes: 'Cloud', mio: false },
]

export const EVENTOS = [
  { id: 'e1', nombre: 'Taller: tu primer CV tech', fecha: 'Jue 13 nov · 19:00', modalidad: 'Virtual' },
  { id: 'e2', nombre: 'Charla: Grafos en la industria', fecha: 'Mar 18 nov · 18:30', modalidad: 'Presencial' },
  { id: 'e3', nombre: 'Feria de empleo IT', fecha: 'Sáb 22 nov · 10:00', modalidad: 'Presencial' },
]

export const SUGERENCIAS = [
  { id: 'valen', motivo: '2 amigos en común: Ana Torres y Diego Paredes' },
  { id: 'julia', motivo: 'Amiga de Lucía Fernández · interés en Carrera Profesional' },
  { id: 'martin', motivo: 'Amigo de Tomás Herrera · interés en Desarrollo web' },
]

export const MENTORES = [
  { id: 'carlos', area: 'Ingeniería de datos', estado: 'Disponible' },
  { id: 'diego', area: 'Machine learning', estado: 'Disponible' },
  { id: 'camila', area: 'Arquitectura cloud', estado: 'Cupo completo' },
  { id: 'julia', area: 'Gestión de producto', estado: 'Disponible' },
]
