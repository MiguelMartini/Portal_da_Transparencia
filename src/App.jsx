import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Grafo from './pages/Grafo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grafo" element={<Grafo />} />
      </Routes>
    </Router>
  )
}

export default App
