import { TIPOS_OBSTACULO, formatarData } from '../utils/formatacao'
import Icone from './Icone'

export default function CardRelato({ relato, trecho, onClick }) {
  const resolvido = relato.status === 'RESOLVIDO'
  const conteudo = <>
    <span className={`report-icon ${resolvido ? 'resolved' : ''}`}><Icone nome={resolvido ? 'check' : 'alerta'} tamanho={25}/></span>
    <span className="report-text"><strong>{TIPOS_OBSTACULO[relato.tipoObstaculo] || relato.tipoObstaculo}</strong><small>{trecho?.logradouro || 'Trecho cadastrado'} <span>•</span> {formatarData(relato.dataReporte)}</small></span>
    {onClick ? <Icone nome="direita" tamanho={18}/> : <span className={`badge ${resolvido ? 'success' : 'warning'}`}>{resolvido ? 'Resolvido' : 'Ativo'}</span>}
  </>
  return onClick ? <button className="report-row" onClick={onClick}>{conteudo}</button>
    : <div className="report-row">{conteudo}</div>
}
