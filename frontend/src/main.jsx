
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { DadosProvider } from './context/DadosContext'
import 'leaflet/dist/leaflet.css'
import './styles/global.css'
import './styles/ajustes.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter>
            <DadosProvider>
                <App />
            </DadosProvider>
        </HashRouter>
    </React.StrictMode>,
)
