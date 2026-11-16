import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.BACKEND_URL || 'http://localhost:8080'
  const proxy = { '/api': {
    target, changeOrigin: true, proxyTimeout: 9000,
    rewrite: (path) => path.replace(/^\/api(?=\/|$)/, ''),
    configure(server) {
      server.on('error', (_error, _request, response) => {
        if (response && 'writeHead' in response && !response.headersSent) {
          response.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' })
          response.end(JSON.stringify({ message: 'Não foi possível alcançar a API Java. Confira BACKEND_URL em .env.' }))
        }
      })
    },
  } }
  return { plugins: [react()], server: { proxy }, preview: { proxy } }
})
