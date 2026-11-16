const desenhos = {
  mapa: <><path d="m3 5 6-3 6 3 6-3v17l-6 3-6-3-6 3V5Z"/><path d="M9 2v17M15 5v17"/></>,
  rota: <><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M9 18h5a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8"/></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  usuario: <><circle cx="12" cy="7" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/></>,
  relatos: <><rect x="5" y="3" width="14" height="19" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></>,
  alerta: <><path d="m10.3 3.7-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.3l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 8v5M12 17h.01"/></>,
  check: <path d="m5 12 4 4L20 5"/>,
  baixo: <path d="m6 9 6 6 6-6"/>,
  direita: <path d="m9 5 7 7-7 7"/>,
  voltar: <><path d="m12 5-7 7 7 7M5 12h15"/></>,
  enviar: <><path d="m22 2-7 20-4-9L2 9 22 2Z"/><path d="m22 2-11 11"/></>,
  alvo: <><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/></>,
  acessibilidade: <><circle cx="11" cy="3" r="1.5"/><path d="m11 7-1 7h7l3 6M11 10h5M7 11a6 6 0 1 0 8 9"/></>,
  info: <><circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/></>,
  relogio: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 3"/></>,
  distancia: <><circle cx="5" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><path d="M5 8v7a4 4 0 0 0 4 4h7M12 5h7v7"/></>,
  foto: <><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><path d="m3 17 6-6 4 4 3-3 5 5"/></>,
  fechar: <path d="m6 6 12 12M18 6 6 18"/>,
  baixar: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,
  buscar: <><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/></>,
  trocar: <><path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/></>,
  atualizar: <><path d="M20 7a9 9 0 1 0 1 9M20 2v6h-6"/></>,
  camadas: <><path d="m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5"/></>,
  escada: <path d="M2 21h5v-6h5V9h5V3h5M2 15l16-13"/>,
  estrela: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z"/>,
}

export default function Icone({ nome, tamanho = 22, className = '', ...props }) {
  return <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" className={`icone ${className}`} {...props}>{desenhos[nome] || desenhos.pin}</svg>
}
