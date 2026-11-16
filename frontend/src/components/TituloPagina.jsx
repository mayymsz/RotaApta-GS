import { Link } from 'react-router-dom'
import Icone from './Icone'

export default function TituloPagina({ titulo, descricao, icone = 'rota', voltar, etiqueta }) {
  return <header className="page-heading">
    {etiqueta && <p className="eyebrow">{etiqueta}</p>}
    <div className="heading-line">
      {voltar && <Link to={voltar} className="icon-button back-button" aria-label="Voltar para planejar rota"><Icone nome="voltar" /></Link>}
      <span className="heading-symbol"><Icone nome={icone} tamanho={35} /></span>
      <h1>{titulo}</h1>
    </div>
    {descricao && <p className="heading-description">{descricao}</p>}
  </header>
}
