import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Icone from './Icone'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('conteudo')?.focus({ preventScroll: true })
  }, [pathname])
  return <div className="app-layout">
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="ambient ambient-one" aria-hidden="true"/><div className="ambient ambient-two" aria-hidden="true"/>
    <Header/>
    <main id="conteudo" className="main-content" tabIndex={-1}><Outlet/></main>
    <footer className="site-footer"><span><Icone nome="acessibilidade" tamanho={16}/> A cidade é de todos. O caminho também.</span><span>RotaApta <span className="footer-dot">•</span> Mobilidade com autonomia</span></footer>
  </div>
}
