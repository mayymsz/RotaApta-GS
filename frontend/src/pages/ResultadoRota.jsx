import { Link, useParams } from 'react-router-dom'
import { useDados } from '../context/DadosContext'
import AvisoDados from '../components/AvisoDados'
import TituloPagina from '../components/TituloPagina'
import Mapa from '../components/Mapa'
import CardRelato from '../components/CardRelato'
import Icone from '../components/Icone'
import { montarPercurso } from '../utils/rotas'
import { formatarDistancia, idIgual, obterNivel } from '../utils/formatacao'

export default function ResultadoRota() {
  const { id } = useParams()
  const { recursos } = useDados()
  const { rotas, associacoes, pontos, trechos, obstaculos } = recursos
  const rota = rotas.dados.find((item) => idIgual(item.idRota, id))
  const percurso = rota ? montarPercurso(rota, associacoes.dados, trechos.dados, pontos.dados) : null
  const ids = new Set(associacoes.dados.filter((item) => idIgual(item.idRota, id)).map((item) => String(item.idTrecho)))
  const relatos = obstaculos.dados.filter((item) => ids.has(String(item.idTrecho)) && item.status === 'ATIVO')
  const nivel = rota && obterNivel(rota.notaAcessibilidade)
  const nome = (idPonto) => pontos.dados.find((p) => idIgual(p.idPonto, idPonto))?.nome || `Ponto ${idPonto}`
  const obstaculosProntos = associacoes.estado === 'pronto' && obstaculos.estado === 'pronto'
  return <>
    <TituloPagina titulo="Detalhes da rota" descricao={rota ? `${nome(rota.idPontoOrigem)} → ${nome(rota.idPontoDestino)}` : 'Consulte o percurso cadastrado.'} voltar="/"/>
    <AvisoDados nomes={['rotas', 'pontos', 'associacoes', 'trechos', 'obstaculos']}/>
    {!rota ? <section className="glass state-card"><h2>{rotas.estado === 'pronto' ? 'Rota não encontrada' : 'Aguardando os dados da rota'}</h2><Link className="button secondary" to="/">Voltar às rotas</Link></section> : <>
      <div className="result-grid"><div>
        <Mapa pontos={pontos.dados} trechos={percurso.etapas} obstaculos={relatos} rota={percurso.completo ? { pontos: percurso.pontos, trechos: percurso.etapas } : undefined} className="result-map"/>
        <p className="map-caption">{percurso.completo ? 'Traçado esquemático dos trechos cadastrados. Os marcadores de obstáculos indicam a região do trecho.' : 'O traçado não está disponível: faltam trechos conectados ou coordenadas nesta rota.'}</p>
      </div><aside className="result-sidebar">
        <section className="glass summary-card"><h2 className="section-title"><Icone nome="rota"/>Resumo da rota</h2>
          <dl className="summary-list"><div><dt><Icone nome="distancia"/>Distância</dt><dd>{formatarDistancia(rota.distanciaTotal)}</dd></div>
            <div><dt><Icone nome="acessibilidade"/>Acessibilidade</dt><dd><span className={`badge ${nivel.classe}`}>{nivel.texto} · {rota.notaAcessibilidade}/100</span></dd></div>
            <div><dt><Icone nome="alerta"/>Obstáculos ativos</dt><dd>{obstaculosProntos ? relatos.length : '—'}</dd></div>
            <div><dt><Icone nome="info"/>Status</dt><dd className="status-text">{rota.status}</dd></div>
          </dl>
        </section>
        <section className="glass route-details"><h2 className="section-title">Trechos do percurso</h2>
          <ol className="route-steps">{percurso.etapas.map((trecho, index) => <li key={trecho.idTrecho}><span className="step-number">{index + 1}</span><span><strong>{trecho.logradouro}</strong><small>{formatarDistancia(trecho.distancia)} · Inclinação {trecho.inclinacao}%</small></span></li>)}</ol>
          {!percurso.etapas.length && <p className="empty-copy">Nenhum trecho disponível para exibição.</p>}
        </section>
        <Link to="/registrar-obstaculo" className="button primary"><Icone nome="enviar"/>Registrar obstáculo</Link>
      </aside></div>
      <section className="glass route-obstacles"><h2 className="section-title"><Icone nome="alerta"/>Obstáculos no percurso</h2>
        {relatos.map((relato) => <div key={relato.idObstaculo}><CardRelato relato={relato} trecho={trechos.dados.find((t) => idIgual(t.idTrecho, relato.idTrecho))}/><p className="obstacle-description">{relato.descricao}</p></div>)}
        {obstaculosProntos && !relatos.length && <p className="empty-copy">{ids.size ? 'Nenhum obstáculo ativo registrado nos trechos desta rota.' : 'Sem trechos vinculados para consultar os obstáculos.'}</p>}
      </section>
    </>}
  </>
}
