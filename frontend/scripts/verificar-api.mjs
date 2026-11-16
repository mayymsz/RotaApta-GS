import { loadEnv } from 'vite'

const env = loadEnv('development', process.cwd(), '')
const base = (env.BACKEND_URL || 'http://localhost:8080').replace(/\/$/, '')
console.log(`Verificando API Java em ${base}\n`)
let falhas = 0
for (const path of ['/pontos', '/trechos', '/rotas', '/rotas-trechos', '/obstaculos', '/usuarios']) {
  try {
    const response = await fetch(base + path, { signal: AbortSignal.timeout(6000) })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const dados = await response.json()
    if (!Array.isArray(dados)) throw new Error('A resposta não é uma lista JSON')
    console.log(`OK ${path}: ${dados.length} registro(s)`)
  } catch (error) {
    falhas++
    console.log(`FALHA ${path}: ${error.message}`)
  }
}
if (falhas) {
  console.log('\nInicie a aplicação Java e confira a porta em .env. Se o Java já estiver rodando, verifique no terminal dele se há erro de acesso ao Oracle.')
  process.exitCode = 1
} else console.log('\nAPI acessível. Execute npm run dev para abrir a interface.')
