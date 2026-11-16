import { Link, NavLink } from 'react-router-dom'
import { useDados } from '../context/DadosContext'
import Icone from './Icone'
import logo from '../assets/logo-rotaapta.svg'

export default function Header() {
  const { recursos, usuarioId, usuario, selecionarUsuario } = useDados()
  return <header className="site-header"><div className="header-content">
    <Link to="/" className="brand"><img src={logo} alt=""/><span>RotaApta</span></Link>
    <nav className="main-nav" aria-label="Navegação principal">
      <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icone nome="mapa"/>Rotas</NavLink>
      <NavLink to="/registrar-obstaculo" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icone nome="alerta"/>Registrar obstáculo</NavLink>
      <NavLink to="/meus-relatos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icone nome="relatos"/>Meus relatos</NavLink>
    </nav>
    <div className="user-selector"><Icone nome="usuario"/><div>
      <label htmlFor="usuario" className="sr-only">Usuário cadastrado</label>
      <select id="usuario" value={usuario ? usuarioId : ''} onChange={(event) => selecionarUsuario(event.target.value)} disabled={recursos.usuarios.estado !== 'pronto'}>
        <option value="">Selecionar usuário</option>{recursos.usuarios.dados.map((item) => <option key={item.idUsuario} value={item.idUsuario}>{item.nome}</option>)}
      </select><small>Identificação do relato · sem login</small>
    </div></div>
  </div></header>
}
