import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDados } from '../context/DadosContext'
import TituloPagina from '../components/TituloPagina'
import AvisoDados from '../components/AvisoDados'
import Mapa from '../components/Mapa'
import Icone from '../components/Icone'
import CardRelato from '../components/CardRelato'
import { formatarDistancia, idIgual, obterNivel } from '../utils/formatacao'

export default function PlanejarRota() {
  const { recursos, recarregar } = useDados()
  const { pontos, rotas, trechos, obstaculos } = recursos
  const [origem, setOrigem] = useState('')
  const [destino, setDestino] = useState('')
  const [filtro, setFiltro] = useState({ origem: '', destino: '' })
  const lista = rotas.dados.filter((item) => (!filtro.origem || idIgual(item.idPontoOrigem, filtro.origem)) && (!filtro.destino || idIgual(item.idPontoDestino, filtro.destino)))
  const nomePonto = (id) => pontos.dados.find((p) => idIgual(p.idPonto, id))?.nome || `Ponto ${id}`
  const recentes = [...obstaculos.dados].sort((a, b) => (Date.parse(b.dataReporte) || 0) - (Date.parse(a.dataReporte) || 0)).slice(0, 3)
  return <>
    <TituloPagina titulo="Seu caminho, com mais autonomia." etiqueta="MOBILIDADE ACESSÍVEL" descricao="Consulte as rotas disponíveis e acompanhe as condições do percurso."/>
    <AvisoDados nomes={['pontos', 'rotas']}/>
    <div className="planning-grid">
      <div><form className="glass planning-form" onSubmit={(event) => { event.preventDefault(); setFiltro({ origem, destino }) }}>
        <div className="form-intro"><span className="tiny-label">ENCONTRE UMA ROTA</span><Icone nome="rota" className="green-color"/></div>
        {[['origem', 'Origem', origem, setOrigem], ['destino', 'Destino', destino, setDestino]].map(([id, titulo, valor, alterar]) => <div className="field-group" key={id}>
          <label htmlFor={id}>{titulo}</label><div className="input-shell"><Icone nome="pin"/>
            <select id={id} value={valor} onChange={(event) => alterar(event.target.value)} disabled={pontos.estado !== 'pronto'}>
              <option value="">{id === 'origem' ? 'Todos os locais de partida' : 'Todos os destinos'}</option>
              {pontos.dados.map((item) => <option key={item.idPonto} value={item.idPonto}>{item.nome}</option>)}
            </select></div></div>)}
        <button className="button primary full-width" disabled={rotas.estado !== 'pronto' || pontos.estado !== 'pronto'}><Icone nome="buscar"/>Buscar rotas</button>
        <p className="form-footnote">Rotas e locais cadastrados no sistema.</p>
      </form>
      <section className="glass route-list"><div className="section-heading"><h2 className="section-title">Rotas disponíveis</h2>
        <button className="icon-button" title="Atualizar dados" aria-label="Atualizar dados" onClick={recarregar}><Icone nome="atualizar" tamanho={17}/></button></div>
        {rotas.estado === 'pronto' && !lista.length && <p className="empty-copy">{rotas.dados.length ? 'Nenhuma rota cadastrada para esses locais.' : 'Ainda não há rotas cadastradas.'}</p>}
        {rotas.estado !== 'pronto' && <p className="empty-copy">As rotas aparecerão quando a consulta for concluída.</p>}
        {lista.map((rota) => { const nivel = obterNivel(rota.notaAcessibilidade); return <Link className="saved-route" to={`/rotas/${rota.idRota}`} key={rota.idRota}>
          <span className="title-icon"><Icone nome="rota"/></span><span className="saved-route-text"><strong>{nomePonto(rota.idPontoOrigem)} → {nomePonto(rota.idPontoDestino)}</strong><small>{formatarDistancia(rota.distanciaTotal)} · Acessibilidade {rota.notaAcessibilidade}/100</small></span><span className={`badge ${nivel.classe}`}>{nivel.texto}</span><Icone nome="direita" tamanho={16}/>
        </Link> })}
      </section></div>
      <div className="planning-sidebar"><Mapa pontos={pontos.dados} trechos={trechos.dados} obstaculos={obstaculos.dados} compacto/>
        <section className="glass recent-card"><h2 className="section-title"><Icone nome="relatos"/>Relatos recentes</h2>
          <AvisoDados nomes={['obstaculos', 'trechos']}/>
          {recentes.map((item) => <CardRelato key={item.idObstaculo} relato={item} trecho={trechos.dados.find((trecho) => idIgual(trecho.idTrecho, item.idTrecho))}/>)}
          {obstaculos.estado === 'pronto' && !recentes.length && <p className="empty-copy">Ainda não há relatos. Sua contribuição ajuda outras pessoas.</p>}
          <Link to="/registrar-obstaculo" className="text-link recent-link">Registrar um obstáculo <Icone nome="direita" tamanho={16}/></Link>
        </section>
      </div>
    </div>
  </>
}
