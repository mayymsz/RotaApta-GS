// @vitest-environment jsdom
import React from 'react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../src/App'
import { DadosProvider } from '../src/context/DadosContext'
import { montarPercurso } from '../src/utils/rotas'

vi.mock('../src/components/Mapa', () => ({ default: () => <div>Mapa dos pontos cadastrados</div> }))
const pontos = [{ idPonto: 1, nome: 'Origem do teste', latitude: -23.55, longitude: -46.63 }, { idPonto: 2, nome: 'Destino do teste', latitude: -23.56, longitude: -46.64 }]
const trechos = [{ idTrecho: 10, idPontoOrigem: 1, idPontoDestino: 2, logradouro: 'Rua de teste', distancia: 350, inclinacao: 2, notaAcessibilidade: 80, status: 'ATIVO' }]
const rota = { idRota: 20, idUsuario: 5, idPontoOrigem: 1, idPontoDestino: 2, distanciaTotal: 350, notaAcessibilidade: 80, status: 'ATIVA' }
const associacoes = [{ idRota: 20, idTrecho: 10, ordem: 1, custoAcessibilidade: 1 }]
let banco, falha, requests
beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  falha = ''; requests = []
  banco = { '/pontos': pontos, '/trechos': trechos, '/rotas': [rota], '/rotas-trechos': associacoes,
    '/usuarios': [{ idUsuario: 5, nome: 'Usuário teste' }, { idUsuario: 6, nome: 'Outro usuário' }],
    '/obstaculos': [{ idObstaculo: 30, idTrecho: 10, idUsuario: 5, tipoObstaculo: 'OBRA', descricao: 'Obra registrada no teste', severidade: 2, dataReporte: '2026-11-15T10:00:00', status: 'ATIVO' }],
  }
  vi.stubGlobal('fetch', vi.fn(async (url, options = {}) => {
    const path = url.replace('/api', '')
    if (path === falha) return new Response('{}', { status: 502 })
    if (options.method) {
      const body = JSON.parse(options.body)
      requests.push({ path, method: options.method, body })
      if (options.method === 'POST') { banco['/obstaculos'].push(body); return new Response(JSON.stringify(body), { status: 201 }) }
      banco['/obstaculos'] = banco['/obstaculos'].map((item) => item.idObstaculo === body.idObstaculo ? body : item)
      return new Response('Obstáculo atualizado com sucesso!', { status: 200 })
    }
    return new Response(JSON.stringify(banco[path]), { status: 200 })
  }))
})
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })
function montar(path = '/') {
  window.history.replaceState({}, '', path)
  return render(<BrowserRouter><DadosProvider><App/></DadosProvider></BrowserRouter>)
}
async function pronto() { await waitFor(() => expect(screen.queryAllByText('Consultando os dados…')).toHaveLength(0)) }
it('exibe a rota retornada pela API e abre os dados de distância e acessibilidade', async () => {
  montar(); await pronto()
  fireEvent.click(screen.getByRole('link', { name: /Origem do teste → Destino do teste/ }))
  expect(await screen.findByRole('heading', { name: 'Resumo da rota' })).toBeTruthy()
  expect(screen.getByText('350 m', { selector: 'dd' })).toBeTruthy()
  expect(screen.getByText(/Alto · 80\/100/)).toBeTruthy()
})
it('busca apenas as rotas salvas, sem inventar caminhos quando o filtro não encontra dados', async () => {
  montar(); await pronto()
  fireEvent.change(screen.getByLabelText('Origem'), { target: { value: '2' } })
  fireEvent.click(screen.getByRole('button', { name: 'Buscar rotas' }))
  expect(screen.getByText('Nenhuma rota cadastrada para esses locais.')).toBeTruthy()
  expect(screen.queryByRole('link', { name: /Origem do teste → Destino do teste/ })).toBeNull()
})
it('mantém o formulário e o layout disponíveis mesmo com falha 502 e permite nova tentativa', async () => {
  falha = '/rotas'; montar(); await pronto()
  expect(screen.getByLabelText('Origem')).toBeTruthy()
  expect(screen.getByRole('alert').textContent).toContain('HTTP 502')
  expect(screen.queryByRole('link', { name: /Origem do teste → Destino do teste/ })).toBeNull()
  falha = ''; fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }))
  expect(await screen.findByRole('link', { name: /Origem do teste → Destino do teste/ })).toBeTruthy()
})
it('falhar na consulta de usuários não impede a consulta de rotas', async () => {
  falha = '/usuarios'; montar(); await pronto()
  expect(screen.getByRole('link', { name: /Origem do teste → Destino do teste/ })).toBeTruthy()
  expect(screen.getByLabelText('Usuário cadastrado').disabled).toBe(true)
})
it('envia o ObstaculoDTO completo, mostra sucesso apenas após o POST e usa os IDs da API', async () => {
  montar('/registrar-obstaculo'); await pronto()
  fireEvent.change(screen.getByLabelText('Usuário cadastrado'), { target: { value: '5' } })
  fireEvent.change(screen.getByLabelText('Local do obstáculo *'), { target: { value: '10' } })
  fireEvent.change(screen.getByLabelText('Tipo de obstáculo *'), { target: { value: 'OBSTRUCAO' } })
  fireEvent.change(screen.getByLabelText('Descrição *'), { target: { value: 'Relato enviado pela interface.' } })
  fireEvent.click(screen.getByRole('radio', { name: '4', exact: true }))
  fireEvent.submit(screen.getByRole('button', { name: 'Registrar obstáculo', exact: true }).closest('form'))
  expect(await screen.findByText('Obstáculo registrado com sucesso.')).toBeTruthy()
  expect(requests[0].path).toBe('/obstaculos')
  expect(Object.keys(requests[0].body).sort()).toEqual(['idObstaculo','idTrecho','idUsuario','tipoObstaculo','descricao','severidade','dataReporte','status'].sort())
  expect(requests[0].body).toMatchObject({ idTrecho: 10, idUsuario: 5, tipoObstaculo: 'OBSTRUCAO', severidade: 4, status: 'ATIVO' })
  expect(requests[0].body.dataReporte).toMatch(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d$/)
  expect(screen.getByText('Relato enviado pela interface.')).toBeTruthy()
})
it('atualiza status com PUT e resposta textual, e filtra os relatos do usuário', async () => {
  montar('/meus-relatos'); await pronto()
  fireEvent.change(screen.getByLabelText('Usuário cadastrado'), { target: { value: '5' } })
  fireEvent.click(screen.getByRole('button', { name: 'Marcar como resolvido' }))
  expect(await screen.findByText('Status atualizado com sucesso.')).toBeTruthy()
  expect(requests[0]).toMatchObject({ path: '/obstaculos/30', method: 'PUT', body: { status: 'RESOLVIDO', idUsuario: 5, idTrecho: 10 } })
  fireEvent.click(screen.getByRole('button', { name: 'Ativos', exact: true }))
  expect(screen.queryByRole('article')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Resolvidos', exact: true }))
  expect(screen.getByRole('article')).toBeTruthy()
  fireEvent.change(screen.getByLabelText('Usuário cadastrado'), { target: { value: '6' } })
  expect(screen.queryByRole('article')).toBeNull()
})
it('não desenha um percurso inexistente quando faltam associações no banco', () => {
  expect(montarPercurso(rota, [], trechos, pontos).completo).toBe(false)
  expect(montarPercurso(rota, associacoes, trechos, pontos).completo).toBe(true)
  const invalidos = [{ ...trechos[0], idPontoOrigem: 2, idPontoDestino: 1 }]
  expect(montarPercurso(rota, associacoes, invalidos, pontos).pontos).toEqual([])
})
