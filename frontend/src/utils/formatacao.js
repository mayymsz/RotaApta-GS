export const TIPOS_OBSTACULO = {
  CALCADA_DANIFICADA: 'Calçada danificada', SEM_RAMPA: 'Ausência de rampa',
  ESCADA: 'Escada no caminho', OBRA: 'Obra na via', OBSTRUCAO: 'Passagem obstruída', OUTRO: 'Outro obstáculo',
}

export function formatarDistancia(metros) {
  const valor = Number(metros)
  return valor >= 1000
    ? `${(valor / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} km`
    : `${Math.round(valor).toLocaleString('pt-BR')} m`
}

export function formatarData(valor) {
  if (!valor) return 'Data não informada'
  const data = new Date(valor)
  return Number.isNaN(data.getTime()) ? 'Data não informada'
    : data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function dataLocalISO(agora = new Date()) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${agora.getFullYear()}-${pad(agora.getMonth() + 1)}-${pad(agora.getDate())}T${pad(agora.getHours())}:${pad(agora.getMinutes())}:${pad(agora.getSeconds())}`
}

export function obterNivel(nota) {
  return Number(nota) >= 80 ? { texto: 'Alto', classe: 'success' }
    : Number(nota) >= 50 ? { texto: 'Moderado', classe: 'warning' }
      : { texto: 'Baixo', classe: 'danger' }
}

/** ID positivo de 31 bits: compatível com Long e exato em JavaScript. */
export function gerarId() {
  const numeros = new Uint32Array(1)
  crypto.getRandomValues(numeros)
  return (numeros[0] % 2147483647) + 1
}

export const idIgual = (a, b) => String(a) === String(b)
