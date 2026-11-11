import { useState } from 'react'
import { ME, USERS, POSTS, COMUNIDADES, EVENTOS, SUGERENCIAS, rutaMentoria } from './data'
import { IconHeart, IconComment, IconShare, IconBookmark, IconCalendar, IconArrow, IconCheck, IconReply, IconHash, IconLock } from './Icons'

export function Avatar({ id, size = 40 }) {
  const u = USERS[id]
  const ini = u.nombre.split(' ').map((p) => p[0]).slice(0, 2).join('')
  return <div className="avatar" style={{ width: size, height: size, background: u.color, fontSize: size * 0.38 }}>{ini}</div>
}

const REACCIONES = ['Útil', 'Me gusta', 'Apoyo', 'Interesante']

function Comentario({ c, onReply, depth = 0 }) {
  const [abierto, setAbierto] = useState(false)
  const [txt, setTxt] = useState('')
  return (
    <div className="comment" style={{ marginLeft: depth ? 28 : 0 }}>
      <Avatar id={c.autor} size={28} />
      <div className="comment-body">
        <div className="comment-bubble"><b>{USERS[c.autor].nombre}</b><p>{c.texto}</p></div>
        <button className="link" onClick={() => setAbierto(!abierto)}><IconReply size={13} /> Responder</button>
        {abierto && (
          <form className="reply-form" onSubmit={(e) => { e.preventDefault(); if (!txt.trim()) return; onReply(c.id, txt); setTxt(''); setAbierto(false) }}>
            <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Escribe una respuesta..." autoFocus />
          </form>
        )}
        {c.respuestas.map((r) => <Comentario key={r.id} c={r} onReply={onReply} depth={depth + 1} />)}
      </div>
    </div>
  )
}

function addReply(list, parentId, nuevo) {
  return list.map((c) => c.id === parentId
    ? { ...c, respuestas: [...c.respuestas, nuevo] }
    : { ...c, respuestas: addReply(c.respuestas, parentId, nuevo) })
}

function Post({ post, onUpdate }) {
  const u = USERS[post.autor]
  const [menu, setMenu] = useState(false)
  const [verCom, setVerCom] = useState(post.comentarios.length > 0)
  const [txt, setTxt] = useState('')
  const nuevoId = () => Date.now() + Math.random()

  return (
    <article className="card post">
      <header className="post-head">
        <Avatar id={post.autor} />
        <div className="grow">
          <b>{u.nombre}</b>
          <small>{u.rol} · {u.org}</small>
          <small className="muted">{post.fecha} · <IconLock size={11} /> {post.privacidad} · en <span className="accent">{post.comunidad}</span></small>
        </div>
        <span className={`tag tipo-${post.tipo.split(' ')[0].toLowerCase()}`}>{post.tipo}</span>
      </header>
      <p className="post-text">{post.contenido}</p>
      <div className="hashtags">{post.hashtags.map((h) => <span key={h}><IconHash size={12} />{h}</span>)}</div>
      {post.reaccion && <div className="reaccion-info"><IconCheck size={14} /> Reaccionaste: {post.reaccion}. Sin contadores públicos: solo el autor ve el impacto.</div>}
      <div className="actions">
        <div className="react-wrap">
          <button className={post.reaccion ? 'on' : ''} onClick={() => setMenu(!menu)}><IconHeart /> {post.reaccion || 'Reaccionar'}</button>
          {menu && (
            <div className="react-menu">
              {REACCIONES.map((r) => <button key={r} onClick={() => { onUpdate({ ...post, reaccion: post.reaccion === r ? null : r }); setMenu(false) }}>{r}</button>)}
            </div>
          )}
        </div>
        <button onClick={() => setVerCom(!verCom)}><IconComment /> Comentar</button>
        <button className={post.compartido ? 'on' : ''} onClick={() => onUpdate({ ...post, compartido: !post.compartido })}><IconShare /> {post.compartido ? 'Compartido' : 'Compartir'}</button>
        <button className={post.guardado ? 'on' : ''} onClick={() => onUpdate({ ...post, guardado: !post.guardado })}><IconBookmark /> {post.guardado ? 'Guardado' : 'Guardar'}</button>
      </div>
      {verCom && (
        <div className="comments">
          {post.comentarios.map((c) => (
            <Comentario key={c.id} c={c} onReply={(pid, t) => onUpdate({ ...post, comentarios: addReply(post.comentarios, pid, { id: nuevoId(), autor: 'sofia', texto: t, respuestas: [] }) })} />
          ))}
          <form className="comment-form" onSubmit={(e) => { e.preventDefault(); if (!txt.trim()) return; onUpdate({ ...post, comentarios: [...post.comentarios, { id: nuevoId(), autor: 'sofia', texto: txt, respuestas: [] }] }); setTxt('') }}>
            <Avatar id="sofia" size={28} />
            <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Escribe un comentario..." />
          </form>
        </div>
      )}
    </article>
  )
}

function Composer({ onPublish }) {
  const [txt, setTxt] = useState('')
  const [tipo, setTipo] = useState('Texto')
  const [priv, setPriv] = useState('Pública')
  return (
    <form className="card composer" onSubmit={(e) => { e.preventDefault(); if (!txt.trim()) return; onPublish({ contenido: txt, tipo, privacidad: priv }); setTxt('') }}>
      <div className="row">
        <Avatar id="sofia" />
        <textarea value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Comparte una pregunta, un recurso o un avance de tu proyecto..." rows={2} />
      </div>
      <div className="composer-bar">
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          {['Texto', 'Pregunta', 'Recurso', 'Evento', 'Avance de proyecto'].map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={priv} onChange={(e) => setPriv(e.target.value)}>
          {['Pública', 'Seguidores', 'Conexiones', 'Comunidad'].map((t) => <option key={t}>{t}</option>)}
        </select>
        <button className="btn primary" type="submit">Publicar</button>
      </div>
    </form>
  )
}

export function RutaVisual({ ruta, empresa }) {
  return (
    <div className="ruta">
      {ruta.map((id, i) => (
        <div className="ruta-step" key={id}>
          <div className="ruta-node">
            <Avatar id={id} size={36} />
            <span>{id === 'sofia' ? 'Tú' : USERS[id].nombre.split(' ')[0]}</span>
          </div>
          {i < ruta.length - 1 && <div className="ruta-edge"><small>AMIGO_DE</small><IconArrow size={14} /></div>}
        </div>
      ))}
      <div className="ruta-step">
        <div className="ruta-edge"><small>TRABAJA_EN</small><IconArrow size={14} /></div>
        <div className="ruta-node empresa"><div className="emp-box">{empresa.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div><span>{empresa}</span></div>
      </div>
    </div>
  )
}

export default function Inicio({ comunidades, toggleComunidad }) {
  const [posts, setPosts] = useState(POSTS)
  const [conectados, setConectados] = useState({})
  const [asisto, setAsisto] = useState({})
  const [solicitado, setSolicitado] = useState(false)
  const ruta = rutaMentoria('sofia', 'Mercado Libre')
  const recomendadas = comunidades.filter((c) => !c.mio).slice(0, 3)

  const publicar = (p) => setPosts([{ id: Date.now(), autor: 'sofia', fecha: 'ahora', comunidad: 'Mi muro', hashtags: [], comentarios: [], ...p }, ...posts])

  return (
    <div className="layout">
      <aside className="col-left">
        <div className="card profile">
          <div className="profile-cover" />
          <Avatar id="sofia" size={64} />
          <h3>{ME.nombre}</h3>
          <p className="muted">{ME.carrera} · {ME.universidad}</p>
          <p className="small">{ME.bio}</p>
          <div className="no-metrics"><IconLock size={12} /> Perfil sin métricas públicas de popularidad</div>
        </div>
        <div className="card">
          <h4>Mis intereses</h4>
          {ME.intereses.map((i) => (
            <div className="interes" key={i.nombre}>
              <span>{i.nombre}</span>
              <span className={`nivel nivel-${i.nivel}`}>{i.nivel}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h4>Mis círculos</h4>
          {comunidades.filter((c) => c.mio).map((c) => <div className="mini-item" key={c.id}><span className="dot" />{c.nombre}</div>)}
        </div>
      </aside>

      <main className="col-main">
        <Composer onPublish={publicar} />
        {posts.map((p) => <Post key={p.id} post={p} onUpdate={(np) => setPosts(posts.map((x) => x.id === np.id ? np : x))} />)}
      </main>

      <aside className="col-right">
        <div className="card highlight">
          <h4>Ruta de mentoría sugerida</h4>
          <p className="small muted">Te interesa <b>Mercado Libre</b>. El grafo encontró este camino:</p>
          {ruta && <RutaVisual ruta={ruta} empresa="Mercado Libre" />}
          <p className="small">Conoce a <b>Ana</b>, quien estudia tu carrera y es amiga de <b>Carlos</b>, Data Engineer en Mercado Libre.</p>
          <button className={`btn ${solicitado ? 'done' : 'primary'} full`} onClick={() => setSolicitado(true)}>
            {solicitado ? <><IconCheck size={15} /> Presentación solicitada</> : 'Solicitar presentación'}
          </button>
        </div>

        <div className="card">
          <h4>Personas que quizá conozcas</h4>
          {SUGERENCIAS.map((s) => (
            <div className="sug" key={s.id}>
              <Avatar id={s.id} size={36} />
              <div className="grow"><b>{USERS[s.id].nombre}</b><small>{s.motivo}</small></div>
              <button className={`btn sm ${conectados[s.id] ? 'done' : ''}`} onClick={() => setConectados({ ...conectados, [s.id]: !conectados[s.id] })}>
                {conectados[s.id] ? 'Enviada' : 'Conectar'}
              </button>
            </div>
          ))}
        </div>

        <div className="card">
          <h4>Círculos recomendados</h4>
          {recomendadas.map((c) => (
            <div className="sug" key={c.id}>
              <div className="grow"><b>{c.nombre}</b><small>Por tu interés en {c.interes} · {c.miembros}/{c.cupo} lugares</small></div>
              <button className="btn sm" onClick={() => toggleComunidad(c.id)}>Unirme</button>
            </div>
          ))}
          {recomendadas.length === 0 && <p className="small muted">Ya te uniste a todos los círculos sugeridos.</p>}
        </div>

        <div className="card">
          <h4>Próximos eventos</h4>
          {EVENTOS.map((e) => (
            <div className="sug" key={e.id}>
              <div className="ev-icon"><IconCalendar size={16} /></div>
              <div className="grow"><b>{e.nombre}</b><small>{e.fecha} · {e.modalidad}</small></div>
              <button className={`btn sm ${asisto[e.id] ? 'done' : ''}`} onClick={() => setAsisto({ ...asisto, [e.id]: !asisto[e.id] })}>
                {asisto[e.id] ? 'Asistiré' : 'Asistir'}
              </button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
