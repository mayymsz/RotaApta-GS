import { useDados } from '../context/DadosContext'
import Icone from './Icone'

export default function AvisoDados({ nomes }) {
  const { recursos, recarregar } = useDados()
  const erros = nomes.map((nome) => recursos[nome]).filter((item) => item.estado === 'erro')
  const carregando = nomes.some((nome) => recursos[nome].estado === 'carregando')
  return <>
    {carregando && <p className="loading-line" role="status"><span className="spinner small"/>Consultando os dados…</p>}
    {!!erros.length && <div className="notice danger connection-notice" role="alert"><Icone nome="alerta"/>
      <div><strong>Não foi possível carregar alguns dados.</strong>{erros.map((item) => <p key={item.erro}>{item.erro}</p>)}
        <button className="text-link" onClick={recarregar} type="button">Tentar novamente</button></div>
    </div>}
  </>
}
