const BASE = '/api'

export async function request(path, { signal, ...options } = {}) {
  const controller = new AbortController()
  const abortar = () => controller.abort()
  if (signal?.aborted) abortar()
  signal?.addEventListener('abort', abortar, { once: true })
  const timer = setTimeout(abortar, 10000)
  try {
    const response = await fetch(`${BASE}${path}`, {
      ...options, signal: controller.signal,
      headers: { Accept: 'application/json, text/plain', ...(options.body ? { 'Content-Type': 'application/json' } : {}) },
    })
    const text = await response.text()
    let data
    try { data = JSON.parse(text) } catch { data = text }
    if (!response.ok) {
      let message = typeof data === 'string' && !data.trim().startsWith('<') ? data : data?.message
      if ([502, 503, 504].includes(response.status)) message = 'A API Java está indisponível. Inicie o backend e confira o endereço em .env.'
      if (response.status === 404) message = 'Endereço não encontrado. Confira a porta e o caminho da API em .env.'
      throw new Error(`${path} — ${message || 'Falha ao consultar o servidor.'} (HTTP ${response.status})`)
    }
    if (typeof data === 'string' && data.trim().startsWith('<')) throw new Error(`${path} — A resposta não veio da API. Confira o vite.config.js e reinicie o frontend.`)
    return data
  } catch (error) {
    if (error.name === 'AbortError' || error instanceof TypeError) throw new Error(`${path} — Não foi possível acessar a API Java. Confira se ela está rodando e tente atualizar.`)
    throw error
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', abortar)
  }
}

export async function listar(path, options) {
  const data = await request(path, options)
  if (!Array.isArray(data)) throw new Error(`${path} — A API não retornou uma lista válida.`)
  return data
}

export const salvarObstaculo = (dados) => request('/obstaculos', { method: 'POST', body: JSON.stringify(dados) })
export const atualizarObstaculo = (dados) => request(`/obstaculos/${dados.idObstaculo}`, { method: 'PUT', body: JSON.stringify(dados) })
