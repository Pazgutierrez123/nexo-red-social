import { useEffect, useRef, useState } from 'react'
import { USERS, EVENTOS, vecinos } from './data'
import { Avatar } from './Inicio'
import { IconSearch, IconUsers, IconCalendar, IconCheck } from './Icons'

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Distancia en el grafo AMIGO_DE desde "sofia" (BFS)
function distancia(destino) {
  const dist = { sofia: 0 }
  const cola = ['sofia']
  while (cola.length) {
    const a = cola.shift()
    if (a === destino) return dist[a]
    for (const v of vecinos(a)) if (!(v in dist)) { dist[v] = dist[a] + 1; cola.push(v) }
  }
  return null
}

function Modal({ children, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Cerrar">×</button>
        {children}
      </div>
    </div>
  )
}

function PerfilModal({ id, onClose }) {
  const [conectado, setConectado] = useState(false)
  const u = USERS[id]
  const misAmigos = vecinos('sofia')
  const enComun = vecinos(id).filter((v) => misAmigos.includes(v))
  const d = distancia(id)
  const grado = d === 1 ? 'Conexión de 1.er grado' : d === 2 ? 'Conexión de 2.º grado' : d ? `Conexión de ${d}.º grado` : 'Sin conexión en tu red'
  return (
    <Modal onClose={onClose}>
      <div className="modal-head">
        <Avatar id={id} size={64} />
        <div className="grow"><h3>{u.nombre}</h3><small>{u.rol} · {u.org}</small><small className="accent">{grado}</small></div>
      </div>
      <p className="small">
        {enComun.length
          ? <>Amigos en común: <b>{enComun.map((x) => USERS[x].nombre).join(', ')}</b></>
          : 'No tienen amigos en común todavía.'}
      </p>
      <p className="small muted">Nexo no muestra seguidores ni métricas de popularidad en los perfiles.</p>
      {d !== 1 && (
        <button className={`btn full ${conectado ? 'done' : 'primary'}`} onClick={() => setConectado(true)}>
          {conectado ? <><IconCheck size={15} /> Solicitud enviada</> : 'Conectar'}
        </button>
      )}
      {d === 1 && <div className="btn full done"><IconCheck size={15} /> Ya son amigos (AMIGO_DE)</div>}
    </Modal>
  )
}

function EspacioModal({ c, toggleComunidad, onClose }) {
  const lleno = c.miembros >= c.cupo && !c.mio
  return (
    <Modal onClose={onClose}>
      <span className="tag">{c.categoria}</span>
      <h3 style={{ margin: '10px 0 6px' }}>{c.nombre}</h3>
      <p className="small muted">{c.desc}</p>
      <div className="bar" style={{ margin: '14px 0 6px' }}><div style={{ width: `${(c.miembros / c.cupo) * 100}%` }} /></div>
      <p className="small muted">{c.miembros} de {c.cupo} lugares ocupados · círculo de participación limitada</p>
      <div className="com-admin" style={{ marginTop: 12 }}><Avatar id={c.admin} size={24} /><small>Administra: {USERS[c.admin].nombre}</small></div>
      <button disabled={lleno} className={`btn full ${c.mio ? 'done' : 'primary'}`} onClick={() => toggleComunidad(c.id)}>
        {lleno ? 'Cupo completo' : c.mio ? <><IconCheck size={15} /> Miembro · Salir</> : 'Unirme al círculo'}
      </button>
    </Modal>
  )
}

export default function Search({ comunidades, toggleComunidad }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const t = norm(q.trim())
  const personas = t ? Object.entries(USERS).filter(([id, u]) => id !== 'sofia' && norm(`${u.nombre} ${u.rol} ${u.org}`).includes(t)) : []
  const espacios = t ? comunidades.filter((c) => norm(`${c.nombre} ${c.desc} ${c.categoria} ${c.interes}`).includes(t)) : []
  const eventos = t ? EVENTOS.filter((e) => norm(`${e.nombre} ${e.modalidad}`).includes(t)) : []
  const total = personas.length + espacios.length + eventos.length

  const elegir = (s) => { setSel(s); setOpen(false); setQ('') }
  const espacioSel = sel?.tipo === 'espacio' ? comunidades.find((c) => c.id === sel.id) : null

  return (
    <div className="search-wrap" ref={ref}>
      <div className="search">
        <IconSearch size={16} />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          placeholder="Buscar personas o espacios"
        />
      </div>
      {open && t && (
        <div className="search-results">
          {total === 0 && <p className="small muted sr-empty">Sin resultados para "{q}"</p>}
          {personas.length > 0 && <div className="sr-group">Personas</div>}
          {personas.map(([id, u]) => (
            <button key={id} className="sr-item" onClick={() => elegir({ tipo: 'persona', id })}>
              <Avatar id={id} size={32} />
              <div className="grow"><b>{u.nombre}</b><small>{u.rol} · {u.org}</small></div>
            </button>
          ))}
          {espacios.length > 0 && <div className="sr-group">Espacios</div>}
          {espacios.map((c) => (
            <button key={c.id} className="sr-item" onClick={() => elegir({ tipo: 'espacio', id: c.id })}>
              <div className="sr-icon"><IconUsers size={16} /></div>
              <div className="grow"><b>{c.nombre}</b><small>{c.categoria} · {c.miembros}/{c.cupo} miembros{c.mio ? ' · Eres miembro' : ''}</small></div>
            </button>
          ))}
          {eventos.length > 0 && <div className="sr-group">Eventos</div>}
          {eventos.map((e) => (
            <div key={e.id} className="sr-item static">
              <div className="sr-icon"><IconCalendar size={16} /></div>
              <div className="grow"><b>{e.nombre}</b><small>{e.fecha} · {e.modalidad}</small></div>
            </div>
          ))}
        </div>
      )}
      {sel?.tipo === 'persona' && <PerfilModal id={sel.id} onClose={() => setSel(null)} />}
      {espacioSel && <EspacioModal c={espacioSel} toggleComunidad={toggleComunidad} onClose={() => setSel(null)} />}
    </div>
  )
}
