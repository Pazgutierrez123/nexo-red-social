import { useState } from 'react'
import { IconUsers, IconCompass, IconShield, IconLock, IconComment, IconCalendar, IconCheck } from './Icons'
import { Avatar } from './Inicio'

const PASOS = [
  ['Crea tu perfil', 'Cuéntanos qué estudias, dónde trabajas y qué temas te interesan. Con eso armamos tu red.'],
  ['Únete a círculos', 'Entra a comunidades pequeñas sobre los temas que te importan y conversa con gente que comparte tus intereses.'],
  ['Encuentra a tu mentor', 'Elige la empresa o el área a la que quieres llegar y te mostramos quién de tu red puede presentarte.'],
  ['Aprende y comparte', 'Haz preguntas, comparte apuntes y recursos, cuenta tus avances y asiste a talleres y charlas.'],
]

const DISTINTO = [
  [IconCompass, 'Mentoría con presentación', 'No te sugerimos un desconocido: te mostramos a quién conoces que puede presentarte, para que el primer contacto sea natural.'],
  [IconUsers, 'Círculos pequeños', 'Cada comunidad tiene cupo limitado. Menos ruido y más conversaciones de verdad.'],
  [IconShield, 'Sin competencia de likes', 'No mostramos contadores de seguidores ni de reacciones. Lo que importa es lo que aportas, no los números.'],
  [IconLock, 'Tú decides quién te ve', 'Cada publicación puede ser pública, solo para tus seguidores, tus conexiones o un círculo.'],
]

const PARA_QUIEN = [
  ['ana', 'Estudiantes', 'Resuelve dudas de la carrera, encuentra compañeros de estudio y descubre qué hacen los profesionales de tu área.'],
  ['tomas', 'Egresados', 'Mantén el vínculo con tu facultad y da el salto al mundo laboral con el apoyo de tu red.'],
  ['carlos', 'Profesionales', 'Comparte tu experiencia como mentor y conecta con el talento joven de las universidades.'],
]

const FAQ = [
  ['¿Nexo es gratis?', 'Sí. Crear tu perfil, unirte a círculos y pedir mentoría es gratuito.'],
  ['¿Quién puede ver mis publicaciones?', 'Tú lo eliges cada vez que publicas: público, seguidores, conexiones o un círculo en particular.'],
  ['¿Cómo funciona una solicitud de mentoría?', 'Le pides a tu contacto en común que te presente. Cuando acepta, el mentor recibe la solicitud con el contexto de quién eres y qué buscas.'],
  ['¿Qué pasa si un círculo está lleno?', 'Puedes esperar a que se libere un lugar o unirte a otro círculo del mismo tema.'],
  ['¿Puedo bloquear a alguien?', 'Sí. Al bloquear a una persona, ninguno de los dos verá el contenido del otro ni podrá interactuar.'],
  ['¿Puedo borrar mi cuenta?', 'Sí, cuando quieras. Eliminamos tus datos personales y tus publicaciones dejan de estar asociadas a ti.'],
]

function Pregunta({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq ${open ? 'open' : ''}`}>
      <button onClick={() => setOpen(!open)}><span>{q}</span><span className="faq-sign">{open ? '−' : '+'}</span></button>
      {open && <p>{a}</p>}
    </div>
  )
}

export default function ComoFunciona({ ir }) {
  return (
    <div>
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">Conoce Nexo</span>
          <h1>La red social para crecer<br />académica y profesionalmente</h1>
          <div className="rule" />
          <p>Nexo conecta a estudiantes, egresados y profesionales para compartir conocimiento, encontrar mentores y construir su camino profesional con el apoyo de una comunidad.</p>
          <div className="hero-cta">
            <button className="btn light" onClick={() => ir('Inicio')}>Ir a mi inicio</button>
            <button className="btn ghost" onClick={() => ir('Mentoría')}>Buscar un mentor</button>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="wrap">
          <span className="eyebrow">Cómo funciona</span>
          <h2>Empieza en cuatro pasos</h2>
          <ol className="pasos grid-pasos">
            {PASOS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="seccion">
        <div className="wrap">
          <span className="eyebrow">Lo que nos hace distintos</span>
          <h2>Pensada para aprender, no para competir</h2>
          <div className="grid2">
            {DISTINTO.map(([Icon, t, d]) => (
              <div className="feature card" key={t}><Icon size={26} /><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="wrap">
          <span className="eyebrow">Para quién es</span>
          <h2>Un lugar para cada etapa</h2>
          <div className="grid3">
            {PARA_QUIEN.map(([id, t, d]) => (
              <div className="card quien" key={t}><Avatar id={id} size={48} /><h3>{t}</h3><p className="muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="wrap two">
          <div>
            <span className="eyebrow">Qué puedes hacer</span>
            <h2>Todo lo que necesitas para crecer</h2>
          </div>
          <ul className="checks">
            {[
              [IconComment, 'Publicar preguntas, apuntes, recursos y avances de proyectos'],
              [IconUsers, 'Conectar con compañeros y seguir a profesionales'],
              [IconCompass, 'Pedir que te presenten a un mentor de tu área'],
              [IconCalendar, 'Inscribirte a talleres, charlas y ferias de empleo'],
              [IconCheck, 'Guardar publicaciones útiles para leerlas después'],
            ].map(([Icon, t]) => <li key={t}><span><Icon size={16} /></span>{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="seccion">
        <div className="wrap faq-wrap">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>¿Tienes dudas?</h2>
          {FAQ.map(([q, a]) => <Pregunta key={q} q={q} a={a} />)}
        </div>
      </section>

      <section className="seccion dark">
        <div className="wrap cta-final">
          <h2>Tu próxima oportunidad empieza con una conexión</h2>
          <button className="btn light" onClick={() => ir('Comunidades')}>Explorar círculos</button>
        </div>
      </section>
    </div>
  )
}
