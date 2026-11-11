import { useState } from 'react'
import { USERS, EMPRESAS, MENTORES, rutaMentoria } from './data'
import { Avatar, RutaVisual } from './Inicio'
import { IconCheck, IconUsers } from './Icons'

export function Comunidades({ comunidades, toggleComunidad }) {
  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">Círculos de interés</span>
        <h2>Comunidades curadas y de participación limitada</h2>
        <p className="muted">Cada círculo tiene un cupo máximo para favorecer la interacción de calidad sobre el volumen.</p>
      </div>
      <div className="grid3">
        {comunidades.map((c) => {
          const lleno = c.miembros >= c.cupo && !c.mio
          return (
            <div className="card comunidad" key={c.id}>
              <div className="com-top"><span className="tag">{c.categoria}</span><span className="small muted"><IconUsers size={14} /> {c.miembros}/{c.cupo}</span></div>
              <h3>{c.nombre}</h3>
              <p className="small muted">{c.desc}</p>
              <div className="bar"><div style={{ width: `${(c.miembros / c.cupo) * 100}%` }} /></div>
              <div className="com-admin"><Avatar id={c.admin} size={24} /><small>Administra: {USERS[c.admin].nombre}</small></div>
              <button disabled={lleno} className={`btn full ${c.mio ? 'done' : 'primary'}`} onClick={() => toggleComunidad(c.id)}>
                {lleno ? 'Cupo completo' : c.mio ? <><IconCheck size={15} /> Miembro · Salir</> : 'Unirme al círculo'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Mentoria() {
  const [empresa, setEmpresa] = useState('Mercado Libre')
  const [pedidos, setPedidos] = useState({})
  const ruta = rutaMentoria('sofia', empresa)

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">Mentoría</span>
        <h2>Encuentra a tu mentor</h2>
        <p className="muted">Elige la empresa donde te gustaría trabajar y te mostramos quién de tu red puede presentarte con alguien de allí.</p>
      </div>

      <div className="card">
        <div className="chips">
          {EMPRESAS.map((e) => <button key={e} className={`chip ${empresa === e ? 'on' : ''}`} onClick={() => setEmpresa(e)}>{e}</button>)}
        </div>
        {ruta ? (
          <>
            <RutaVisual ruta={ruta} empresa={empresa} />
            <ol className="explica">
              {ruta.slice(0, -1).map((id, i) => {
                const sig = ruta[i + 1]
                return <li key={id}><b>{id === 'sofia' ? 'Tú' : USERS[id].nombre}</b> {id === 'sofia' ? 'eres' : 'es'} amigo/a de <b>{USERS[sig].nombre}</b> ({USERS[sig].rol}, {USERS[sig].org})</li>
              })}
              <li><b>{USERS[ruta[ruta.length - 1]].nombre}</b> trabaja en <b>{empresa}</b> y puede ser tu mentor/a.</li>
            </ol>
          </>
        ) : <p className="muted">Todavía nadie de tu red conoce a alguien en esta empresa.</p>}
      </div>

      <h3 className="sub">Mentores disponibles</h3>
      <div className="grid2">
        {MENTORES.map((m) => (
          <div className="card sug" key={m.id}>
            <Avatar id={m.id} size={48} />
            <div className="grow"><b>{USERS[m.id].nombre}</b><small>{USERS[m.id].rol} · {USERS[m.id].org}</small><small className="accent">Área: {m.area}</small></div>
            <button disabled={m.estado !== 'Disponible'} className={`btn sm ${pedidos[m.id] ? 'done' : 'primary'}`} onClick={() => setPedidos({ ...pedidos, [m.id]: true })}>
              {m.estado !== 'Disponible' ? m.estado : pedidos[m.id] ? 'Solicitada' : 'Solicitar mentoría'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
