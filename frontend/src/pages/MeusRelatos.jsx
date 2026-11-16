import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDados } from '../context/DadosContext'
import { atualizarObstaculo } from '../services/api'
import TituloPagina from '../components/TituloPagina'
import AvisoDados from '../components/AvisoDados'
import Icone from '../components/Icone'
import { TIPOS_OBSTACULO, formatarData, idIgual } from '../utils/formatacao'

export default function MeusRelatos() {
  const { recursos, usuario, atualizarRelato } = useDados()
  const { obstaculos, trechos } = recursos
  const location = useLocation()
  const [mensagem, setMensagem] = useState(location.state?.mensagem || '')
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('TODOS')
  const [salvando, setSalvando] = useState(null)
  const meus = usuario ? obstaculos.dados.filter((item) => idIgual(item.idUsuario, usuario.idUsuario)).sort((a, b) => (Date.parse(b.dataReporte) || 0) - (Date.parse(a.dataReporte) || 0)) : []
  const local = (id) => trechos.dados.find((item) => idIgual(item.idTrecho, id))?.logradouro || `Trecho ${id}`
  const lista = meus.filter((item) => (filtro === 'TODOS' || item.status === filtro) && `${local(item.idTrecho)} ${item.descricao} ${TIPOS_OBSTACULO[item.tipoObstaculo]}`.toLowerCase().includes(busca.toLowerCase().trim()))
  async function alterar(relato) {
    if (salvando !== null) return
    setErro(''); setMensagem(''); setSalvando(relato.idObstaculo)
    const dados = { idObstaculo: relato.idObstaculo, idTrecho: relato.idTrecho, idUsuario: relato.idUsuario,
      tipoObstaculo: relato.tipoObstaculo, descricao: relato.descricao, severidade: relato.severidade,
      dataReporte: relato.dataReporte, status: relato.status === 'ATIVO' ? 'RESOLVIDO' : 'ATIVO' }
    try { await atualizarObstaculo(dados); atualizarRelato(dados); setMensagem('Status atualizado com sucesso.') }
    catch (error) { setErro(error.message) }
    finally { setSalvando(null) }
  }
  return <>
    <div className="heading-with-action"><TituloPagina titulo="Meus relatos" icone="relatos" etiqueta="SUA CONTRIBUIÇÃO TRANSFORMA CAMINHOS" descricao="Acompanhe seus registros e mantenha as informações atualizadas."/>
      <Link className="button primary" to="/registrar-obstaculo"><Icone nome="enviar"/>Novo relato</Link></div>
    <AvisoDados nomes={['obstaculos', 'trechos', 'usuarios']}/>
    {mensagem && <p className="notice success" role="status"><Icone nome="check"/>{mensagem}<button className="dismiss-notice" onClick={() => setMensagem('')} aria-label="Fechar mensagem"><Icone nome="fechar" tamanho={16}/></button></p>}
    {erro && <p className="notice danger" role="alert">{erro}</p>}
    <div className="stats-grid">{[['relatos', 'Relatos enviados', meus.length], ['alerta', 'Obstáculos ativos', meus.filter((r) => r.status === 'ATIVO').length], ['check', 'Situações resolvidas', meus.filter((r) => r.status === 'RESOLVIDO').length]].map(([icone, titulo, valor]) => <div className="glass stat-card" key={titulo}><span className="stat-icon"><Icone nome={icone}/></span><div><strong>{usuario && obstaculos.estado === 'pronto' ? valor : '—'}</strong><span>{titulo}</span></div></div>)}</div>
    <section className="glass my-reports"><div className="reports-toolbar"><div><h2>Suas contribuições</h2><p>{usuario ? `Registros de ${usuario.nome}` : 'Selecione um usuário no topo da página.'}</p></div><div className="input-shell search-shell"><Icone nome="buscar"/><input aria-label="Buscar relatos" placeholder="Buscar por local ou descrição" value={busca} onChange={(event) => setBusca(event.target.value)}/></div></div>
      <div className="report-filters">{[['TODOS', 'Todos'], ['ATIVO', 'Ativos'], ['RESOLVIDO', 'Resolvidos']].map(([valor, texto]) => <button key={valor} className={`filter-tab ${valor === filtro ? 'active' : ''}`} aria-pressed={valor === filtro} onClick={() => setFiltro(valor)}>{texto}</button>)}</div>
      {!usuario ? <p className="empty-copy">Escolha um usuário cadastrado para consultar os relatos vinculados a ele.</p> : obstaculos.estado === 'pronto' && !lista.length ? <p className="empty-copy">Nenhum relato encontrado para esta seleção.</p> : null}
      {lista.map((relato) => <article className="my-report" key={relato.idObstaculo}><span className={`report-icon ${relato.status === 'RESOLVIDO' ? 'resolved' : ''}`}><Icone nome={relato.status === 'RESOLVIDO' ? 'check' : 'alerta'}/></span><div className="my-report-content">
        <div className="my-report-heading"><h3>{TIPOS_OBSTACULO[relato.tipoObstaculo] || relato.tipoObstaculo}</h3><span className={`badge ${relato.status === 'RESOLVIDO' ? 'success' : 'warning'}`}>{relato.status === 'RESOLVIDO' ? 'Resolvido' : 'Ativo'}</span></div>
        <p className="report-location"><Icone nome="pin" tamanho={15}/>{local(relato.idTrecho)} · {formatarData(relato.dataReporte)}</p><p className="report-description">{relato.descricao}</p>
        <div className="my-report-bottom"><span className="severity-indicator">Severidade <strong>{relato.severidade}/5</strong></span><button disabled={salvando !== null} className="button secondary small-button" onClick={() => alterar(relato)}>{idIgual(salvando, relato.idObstaculo) ? 'Salvando…' : relato.status === 'ATIVO' ? 'Marcar como resolvido' : 'Reabrir relato'}</button></div>
      </div></article>)}
    </section>
  </>
}
