import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { coordenadas } from '../utils/rotas'
import { idIgual, TIPOS_OBSTACULO } from '../utils/formatacao'
import Icone from './Icone'

const textoSeguro = (texto) => {
  const elemento = document.createElement('span')
  elemento.textContent = texto
  return elemento
}

export default function Mapa({ pontos = [], trechos = [], obstaculos = [], rota,
  trechoSelecionado, onPonto, onTrecho, className = '', compacto = false }) {
  const container = useRef(null)
  const mapa = useRef(null)
  const camadas = useRef(null)
  const acoes = useRef({ onPonto, onTrecho })
  const [falhaMapa, setFalhaMapa] = useState(false)
  acoes.current = { onPonto, onTrecho }

  useEffect(() => {
    const instance = L.map(container.current, {
      center: [-23.5505, -46.6333], zoom: 14, zoomControl: false, scrollWheelZoom: false,
    })
    mapa.current = instance
    instance.attributionControl.setPrefix(false)
    L.control.zoom({ position: 'topright', zoomInTitle: 'Aproximar', zoomOutTitle: 'Afastar' }).addTo(instance)
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(instance)
    L.tileLayer(import.meta.env.VITE_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
    }).on('tileerror', () => setFalhaMapa(true)).addTo(instance)
    camadas.current = L.layerGroup().addTo(instance)
    const observador = new ResizeObserver(() => instance.invalidateSize())
    observador.observe(container.current)
    return () => {
      observador.disconnect()
      instance.remove()
      mapa.current = null
      camadas.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapa.current || !camadas.current) return
    const camada = camadas.current
    camada.clearLayers()
    const encontrar = (id) => pontos.find((ponto) => idIgual(ponto.idPonto, id))
    for (const trecho of trechos) {
      const inicio = coordenadas(encontrar(trecho.idPontoOrigem))
      const fim = coordenadas(encontrar(trecho.idPontoDestino))
      if (!inicio || !fim) continue
      const selecionado = trechoSelecionado && idIgual(trecho.idTrecho, trechoSelecionado)
      const linha = L.polyline([inicio, fim], {
        color: selecionado ? '#4df59b' : '#5a8196', weight: selecionado ? 6 : 3, opacity: selecionado ? 1 : 0.5,
      }).addTo(camada)
      linha.bindTooltip(textoSeguro(trecho.logradouro || 'Trecho cadastrado'))
      linha.on('click', () => acoes.current.onTrecho?.(String(trecho.idTrecho)))
    }
    const trajeto = rota?.pontos?.map(coordenadas).filter(Boolean) || []
    if (trajeto.length > 1) {
      L.polyline(trajeto, { color: '#16dbd4', weight: 17, opacity: 0.12, interactive: false }).addTo(camada)
      for (let index = 0; index < trajeto.length - 1; index++) {
        L.polyline([trajeto[index], trajeto[index + 1]], {
          color: index < (trajeto.length - 1) / 2 ? '#03c8f0' : '#58f58c', weight: 6, opacity: 1, interactive: false,
        }).addTo(camada)
      }
    }
    for (const ponto of pontos) {
      const posicao = coordenadas(ponto)
      if (!posicao) continue
      const primeiro = rota?.pontos?.[0]
      const ultimo = rota?.pontos?.[rota.pontos.length - 1]
      const origem = primeiro && idIgual(ponto.idPonto, primeiro.idPonto)
      const destino = ultimo && idIgual(ponto.idPonto, ultimo.idPonto) && !origem
      const marcador = origem || destino
        ? L.marker(posicao, {
          icon: L.divIcon({ className: 'pin-wrapper', html: `<span class="map-pin ${destino ? 'destination' : ''}"><i></i></span>`, iconSize: [32, 42], iconAnchor: [16, 40] }),
          alt: `${destino ? 'Destino' : 'Origem'}: ${ponto.nome}`,
        })
        : L.circleMarker(posicao, { radius: 5, color: '#a1c7d4', fillColor: '#153544', fillOpacity: 1, weight: 2 })
      marcador.addTo(camada).bindTooltip(textoSeguro(ponto.nome || 'Local cadastrado'))
      marcador.on('click', () => acoes.current.onPonto?.(String(ponto.idPonto)))
    }
    for (const relato of obstaculos.filter((item) => item.status === 'ATIVO')) {
      const trecho = trechos.find((item) => idIgual(item.idTrecho, relato.idTrecho))
      const inicio = coordenadas(encontrar(trecho?.idPontoOrigem))
      const fim = coordenadas(encontrar(trecho?.idPontoDestino))
      if (!inicio || !fim) continue
      L.marker([(inicio[0] + fim[0]) / 2, (inicio[1] + fim[1]) / 2], {
        icon: L.divIcon({ className: 'obstacle-wrapper', html: '<span class="map-obstacle">!</span>', iconSize: [26, 28], iconAnchor: [13, 14] }),
        alt: TIPOS_OBSTACULO[relato.tipoObstaculo] || 'Obstáculo',
      }).addTo(camada).bindTooltip(textoSeguro(`${TIPOS_OBSTACULO[relato.tipoObstaculo] || 'Obstáculo'} · posição aproximada no trecho`))
    }
    const selecionado = trechos.find((item) => idIgual(item.idTrecho, trechoSelecionado))
    const foco = selecionado
      ? [coordenadas(encontrar(selecionado.idPontoOrigem)), coordenadas(encontrar(selecionado.idPontoDestino))].filter(Boolean)
      : trajeto.length ? trajeto : pontos.map(coordenadas).filter(Boolean)
    if (foco.length) mapa.current.fitBounds(L.latLngBounds(foco), { padding: [55, 55], maxZoom: compacto ? 16 : 17, animate: false })
  }, [pontos, trechos, obstaculos, rota, trechoSelecionado, compacto])

  return <section className={`map-card ${compacto ? 'compact' : ''} ${className}`} aria-label="Mapa dos pontos e trechos cadastrados">
    <div ref={container} className="map-container" />
    <span className="map-label"><span className="live-dot"/> {trechoSelecionado ? 'Local do obstáculo' : rota?.trechos ? 'Seu percurso' : 'Explore os caminhos'}</span>
    {falhaMapa && <p className="map-message"><Icone nome="info" tamanho={14}/>Mapa base indisponível. Os pontos e trechos continuam visíveis.</p>}
  </section>
}
