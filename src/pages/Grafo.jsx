import { useState } from 'react'
import Header from './Home/Header.jsx'
import Footer from './Home/Footer.jsx'
import { GraphVisualizer } from '../pages/components/graph-visualizer.jsx'
import { capitals, getGraph } from '../pages/data/capitals.js'
import { dijkstra } from '../pages/utils/dijkstra.js'

function Grafo() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [result, setResult] = useState(null)

  const sortedCapitals = [...capitals].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  const calculateRoute = () => {
    if (!origin || !destination) return

    if (origin === destination) {
      setResult(null)
      return
    }

    const graph = getGraph()
    const pathResult = dijkstra(graph, origin, destination)

    if (pathResult) {
      setResult({
        path: pathResult.path,
        distance: pathResult.distance,
      })
    } else {
      setResult(null)
    }
  }

  const getCapitalName = (id) => {
    const capital = capitals.find(c => c.id === id)
    return capital ? `${capital.name} - ${capital.state}` : id
  }

  const resetForm = () => {
    setOrigin('')
    setDestination('')
    setResult(null)
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Header/>
      <div className='flex-1 bg-gradient-to-br from-blue-50 to-slate-100 p-6'>
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Painel de Controle */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-[#3F3F3F] flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Configuração da Rota
                  </h2>
                  <p className="text-gray-600 mt-2">Selecione as capitais de origem e destino</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#3F3F3F] mb-2">
                      Origem
                    </label>
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Selecione a origem</option>
                      {sortedCapitals.map(capital => (
                        <option key={capital.id} value={capital.id}>
                          {capital.name} - {capital.state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3F3F3F] mb-2">
                      Destino
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Selecione o destino</option>
                      {sortedCapitals.map(capital => (
                        <option key={capital.id} value={capital.id}>
                          {capital.name} - {capital.state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={calculateRoute}
                      disabled={!origin || !destination || origin === destination}
                      className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Calcular Rota
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-6 bg-gray-200 text-[#3F3F3F] font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Limpar
                    </button>
                  </div>
                </div>
              </div>

              {/* Resultado */}
              {result && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    Melhor Rota Encontrada
                  </h3>
                  <p className="text-green-700 font-semibold mb-4">
                    Distância total: {result.distance.toFixed(0)} km
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-900">
                      Caminho (em ordem):
                    </h4>
                    <div className="space-y-2">
                      {result.path.map((capitalId, index) => (
                        <div
                          key={capitalId}
                          className="flex items-center gap-3"
                        >
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm">
                            {index + 1}
                          </span>
                          <span className="text-green-900 font-medium">
                            {getCapitalName(capitalId)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t-2 border-green-200 mt-4">
                      <p className="text-green-800 font-semibold">
                        Paradas: {result.path.length} capitais
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Informações */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-blue-900 text-sm">
                    O grafo mostra todas as 27 capitais brasileiras. A melhor rota é calculada
                    usando o algoritmo de Dijkstra e aparece destacada em{' '}
                    <span className="text-green-600 font-bold">verde</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Visualização do Grafo */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 h-[850px]">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-[#3F3F3F]">Grafo de Rotas entre Capitais</h2>
                  <p className="text-gray-600 mt-1">
                    Visualização das conexões e distâncias entre as capitais brasileiras
                  </p>
                </div>
                <div className="h-[calc(100%-80px)]">
                  <GraphVisualizer highlightedPath={result?.path || []} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Grafo
