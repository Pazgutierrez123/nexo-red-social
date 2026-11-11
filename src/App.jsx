import { useState } from 'react'
import { COMUNIDADES } from './data'
import Inicio from './Inicio'
import { Comunidades, Mentoria } from './Secciones'
import ComoFunciona from './ComoFunciona'
import Search from './Search'

const TABS = ['Inicio', 'Comunidades', 'Mentoría', 'Cómo funciona']

function Logo() {
  return (
    <div className="logo">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#1a1a1a" />
        <circle cx="10" cy="11" r="3" fill="#fff" /><circle cx="22" cy="11" r="3" fill="#a5a6ff" /><circle cx="16" cy="22" r="3" fill="#fff" />
        <path d="M10 11 16 22 22 11" stroke="#fff" strokeWidth="1.6" fill="none" />
      </svg>
      <span>Nexo</span>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('Inicio')
  const [comunidades, setComunidades] = useState(COMUNIDADES)
  const toggleComunidad = (id) => setComunidades((cs) => cs.map((c) => c.id === id
    ? { ...c, mio: !c.mio, miembros: c.miembros + (c.mio ? -1 : 1) }
    : c))
  const ir = (t) => { setTab(t); window.scrollTo({ top: 0 }) }

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <button className="plain" onClick={() => ir('Inicio')}><Logo /></button>
          <Search comunidades={comunidades} toggleComunidad={toggleComunidad} />
          <div className="tabs">
            {TABS.map((t) => <button key={t} className={tab === t ? 'active' : ''} onClick={() => ir(t)}>{t}</button>)}
          </div>
        </div>
      </nav>
      {tab === 'Inicio' && <Inicio comunidades={comunidades} toggleComunidad={toggleComunidad} />}
      {tab === 'Comunidades' && <Comunidades comunidades={comunidades} toggleComunidad={toggleComunidad} />}
      {tab === 'Mentoría' && <Mentoria />}
      {tab === 'Cómo funciona' && <ComoFunciona ir={ir} />}
    </>
  )
}
