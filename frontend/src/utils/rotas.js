export function coordenadas(ponto) {
  if (ponto?.latitude == null || ponto?.longitude == null) return null
  const lat = Number(ponto.latitude), lng = Number(ponto.longitude)
  return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? [lat, lng] : null
}

/** Apenas monta as ligações salvas no banco; não calcula nem inventa caminhos. */
export function montarPercurso(rota, associacoes, trechos, pontos) {
  const vinculos = associacoes.filter((item) => String(item.idRota) === String(rota.idRota)).sort((a, b) => a.ordem - b.ordem)
  const etapas = vinculos.map((item) => trechos.find((trecho) => String(trecho.idTrecho) === String(item.idTrecho)))
  if (!etapas.length || etapas.some((item) => !item)) return { etapas: etapas.filter(Boolean), pontos: [], completo: false }
  let atual = String(rota.idPontoOrigem)
  const sequencia = [pontos.find((p) => String(p.idPonto) === atual)]
  for (const trecho of etapas) {
    if (String(trecho.idPontoOrigem) !== atual) return { etapas, pontos: [], completo: false }
    atual = String(trecho.idPontoDestino)
    sequencia.push(pontos.find((p) => String(p.idPonto) === atual))
  }
  const completo = atual === String(rota.idPontoDestino) && sequencia.every(coordenadas)
  return { etapas, pontos: completo ? sequencia : [], completo }
}
