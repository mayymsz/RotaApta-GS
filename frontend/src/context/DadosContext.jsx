import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { listar } from '../services/api'

const Context = createContext(null)
const caminhos = { pontos: '/pontos', trechos: '/trechos', rotas: '/rotas', associacoes: '/rotas-trechos', obstaculos: '/obstaculos', usuarios: '/usuarios' }
const inicial = Object.fromEntries(Object.keys(caminhos).map((key) => [key, { dados: [], estado: 'carregando', erro: '' }]))

export function DadosProvider({ children }) {
  const [recursos, setRecursos] = useState(inicial)
  const [tentativa, setTentativa] = useState(0)
  const [usuarioId, setUsuarioId] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    // Cada resposta atualiza apenas seu recurso: falhar em usuários não esconde as rotas.
    for (const [key, path] of Object.entries(caminhos)) {
      setRecursos((prev) => ({ ...prev, [key]: { dados: [], estado: 'carregando', erro: '' } }))
      listar(path, { signal: controller.signal }).then((dados) => {
        if (!controller.signal.aborted) setRecursos((prev) => ({ ...prev, [key]: { dados, estado: 'pronto', erro: '' } }))
      }).catch((error) => {
        if (!controller.signal.aborted) setRecursos((prev) => ({ ...prev, [key]: { dados: [], estado: 'erro', erro: error.message } }))
      })
    }
    return () => controller.abort()
  }, [tentativa])

  const atualizarRelato = useCallback((novo) => {
    setRecursos((prev) => ({ ...prev, obstaculos: {
      ...prev.obstaculos,
      dados: [novo, ...prev.obstaculos.dados.filter((item) => String(item.idObstaculo) !== String(novo.idObstaculo))],
    } }))
  }, [])
  const usuario = recursos.usuarios.dados.find((item) => String(item.idUsuario) === usuarioId)
  return <Context.Provider value={{ recursos, usuario, usuarioId, selecionarUsuario: setUsuarioId,
    atualizarRelato, recarregar: () => setTentativa((value) => value + 1),
  }}>{children}</Context.Provider>
}

export function useDados() { return useContext(Context) }
