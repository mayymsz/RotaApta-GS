import { Navigate, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PlanejarRota from './pages/PlanejarRota'
import ResultadoRota from './pages/ResultadoRota'
import RegistrarObstaculo from './pages/RegistrarObstaculo'
import MeusRelatos from './pages/MeusRelatos'

export default function App() {
  return <Routes><Route element={<Layout/>}>
    <Route index element={<PlanejarRota/>}/>
    <Route path="rotas/:id" element={<ResultadoRota/>}/>
    <Route path="registrar-obstaculo" element={<RegistrarObstaculo/>}/>
    <Route path="meus-relatos" element={<MeusRelatos/>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Route></Routes>
}
