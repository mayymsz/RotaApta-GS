import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDados } from '../context/DadosContext'
import { salvarObstaculo } from '../services/api'
import TituloPagina from '../components/TituloPagina'
import AvisoDados from '../components/AvisoDados'
import Mapa from '../components/Mapa'
import Icone from '../components/Icone'
import { TIPOS_OBSTACULO, dataLocalISO, gerarId, idIgual } from '../utils/formatacao'

export default function RegistrarObstaculo() {
  const { recursos, usuario, atualizarRelato } = useDados()
  const { pontos, trechos, usuarios } = recursos
  const navegar = useNavigate()
  const [idTrecho, setIdTrecho] = useState('')
  const [tipo, setTipo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [severidade, setSeveridade] = useState('3')
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const pronto = trechos.estado === 'pronto' && usuarios.estado === 'pronto'

  async function enviar(event) {
    event.preventDefault()
    if (salvando) return
    setErro('')
    const trecho = trechos.dados.find((item) => idIgual(item.idTrecho, idTrecho))
    if (!usuario || !trecho || !tipo || !descricao.trim()) { setErro('Selecione o usuário, o local, o tipo e preencha a descrição.'); return }
    const dados = { idObstaculo: gerarId(), idTrecho: trecho.idTrecho, idUsuario: usuario.idUsuario,
      tipoObstaculo: tipo, descricao: descricao.trim(), severidade: Number(severidade), dataReporte: dataLocalISO(), status: 'ATIVO' }
    setSalvando(true)
    try {
      const criado = await salvarObstaculo(dados)
      if (!criado || typeof criado !== 'object' || criado.idObstaculo == null) throw new Error('O servidor não confirmou os dados do registro. Atualize os relatos antes de reenviar.')
      atualizarRelato(criado)
      navegar('/meus-relatos', { state: { mensagem: 'Obstáculo registrado com sucesso.' } })
    } catch (error) { setErro(error.message) }
    finally { setSalvando(false) }
  }

  return <>
    <TituloPagina titulo="Registrar obstáculo urbano" descricao="Compartilhe as barreiras encontradas no caminho. Seu relato ajuda outras pessoas." icone="pin" voltar="/"/>
    <AvisoDados nomes={['trechos', 'usuarios']}/>
    <form className="register-grid" onSubmit={enviar}>
      <fieldset className="glass register-form" disabled={salvando}><legend className="sr-only">Informações do obstáculo</legend>
        <div className="field-group"><label htmlFor="local-obstaculo">Local do obstáculo *</label><div className="input-shell"><Icone nome="pin"/>
          <select id="local-obstaculo" required value={idTrecho} onChange={(event) => setIdTrecho(event.target.value)} disabled={trechos.estado !== 'pronto'}><option value="">Selecione um trecho cadastrado</option>
            {trechos.dados.map((item) => <option key={item.idTrecho} value={item.idTrecho}>{item.logradouro} · trecho {item.idTrecho}</option>)}
          </select></div></div>
        <div className="field-group"><label htmlFor="tipo-obstaculo">Tipo de obstáculo *</label><div className="input-shell"><Icone nome="alerta"/>
          <select id="tipo-obstaculo" required value={tipo} onChange={(event) => setTipo(event.target.value)}><option value="">Selecione o tipo de obstáculo</option>
            {Object.entries(TIPOS_OBSTACULO).map(([valor, nome]) => <option key={valor} value={valor}>{nome}</option>)}
          </select></div></div>
        <div className="field-group"><label htmlFor="descricao">Descrição *</label><div className="textarea-shell">
          <textarea id="descricao" required maxLength={500} value={descricao} onChange={(event) => setDescricao(event.target.value)} placeholder="Descreva o problema e como ele afeta a passagem…"/><span className="character-count">{descricao.length} / 500</span>
        </div></div>
        <fieldset className="severity-fieldset"><legend>Severidade *</legend><div className="severity-options">{[1, 2, 3, 4, 5].map((n) => <label className={Number(severidade) === n ? 'selected' : ''} key={n}><input type="radio" name="severidade" value={n} checked={Number(severidade) === n} onChange={(event) => setSeveridade(event.target.value)}/>{n}</label>)}</div><div className="range-labels"><span>Impacto leve</span><span>Passagem muito difícil</span></div></fieldset>
        {erro && <p role="alert" className="notice danger">{erro}</p>}
        <button className="button primary full-width" disabled={salvando || !pronto || !usuario || !trechos.dados.length}>{salvando ? <span className="spinner dark"/> : <Icone nome="enviar"/>}{salvando ? 'Registrando…' : 'Registrar obstáculo'}</button>
        <p className="form-footnote">{usuario ? `Relato em nome de ${usuario.nome}.` : 'Selecione um usuário cadastrado no topo da página.'}</p>
        {trechos.estado === 'pronto' && !trechos.dados.length && <p className="empty-copy">É necessário ter um trecho cadastrado para registrar um obstáculo.</p>}
      </fieldset>
      <aside className="register-sidebar"><Mapa pontos={pontos.dados} trechos={trechos.dados} trechoSelecionado={idTrecho} onTrecho={(id) => { if (!salvando) setIdTrecho(id) }} compacto/>
        <AvisoDados nomes={['pontos']}/>
        <section className="glass information-card"><h2 className="section-title"><Icone nome="info"/>Uma cidade para todos</h2><ul className="check-list">
          <li><Icone nome="check"/>Selecione o trecho onde o obstáculo foi encontrado.</li><li><Icone nome="check"/>Descreva as condições da passagem com clareza.</li><li><Icone nome="check"/>Acompanhe o registro em “Meus relatos” e atualize o status quando a situação mudar.</li>
        </ul></section>
      </aside>
    </form>
  </>
}
