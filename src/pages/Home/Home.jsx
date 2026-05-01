import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header/>
      <div className='flex-1 bg-linear-to-br from-blue-50 to-slate-100'>
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl font-bold text-[#3F3F3F]" id=''>
              Sistema de Rotas de Entrega
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ferramenta educacional para visualização e cálculo de rotas ótimas entre as capitais brasileiras usando diferentes algoritmos vistso na disciplinade Inteligência Artificial
            </p>
            <div className="pt-4">
              <Link
                to="/grafo"
                className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition-colors"
              >
                Acessar Simulação de Rotas
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 hover:border-blue-300 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#3F3F3F] text-center mb-3">Visualização Interativa</h3>
              <p className="text-gray-600 text-center">
                Explore o grafo completo com todas as 27 capitais brasileiras e suas conexões em uma interface visual intuitiva
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 hover:border-green-300 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#3F3F3F] text-center mb-3">Algoritmos</h3>
              <p className="text-gray-600 text-center">
                Diferentes algoritmos para calcular rotas: A*, A* com Kruskal, A* com algoritmo Genético, Kruskal (MST) e algoritmo Genético.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 hover:border-purple-300 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#3F3F3F] text-center mb-3">Dados Reais</h3>
              <p className="text-gray-600 text-center">
                Sistema utiliza dados das 27 capitais brasileiras com distâncias calculadas entre as principais rotas
              </p>
            </div>
          </div>

          {/* Como Usar */}
          <div className="bg-white rounded-lg shadow-md p-8 mt-16 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-[#3F3F3F] mb-8 flex items-center gap-3" id='Sobre'>
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Como Usar o Sistema
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-[#3F3F3F] text-lg mb-2">Acesse o Simulador</h4>
                  <p className="text-gray-600">
                    Clique no botão "Acessar Simulação de Rotas" ou use o menu de navegação
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-[#3F3F3F] text-lg mb-2">Selecione Origem e Destino</h4>
                  <p className="text-gray-600">
                    Escolha as capitais de origem e destino nos menus de seleção
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-[#3F3F3F] text-lg mb-2">Calcule a Rota</h4>
                  <p className="text-gray-600">
                    Clique em "Calcular Rota" para processar o caminho mais eficiente
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-[#3F3F3F] text-lg mb-2">Visualize o Resultado</h4>
                  <p className="text-gray-600">
                    A melhor rota aparecerá destacada em verde no grafo visual
                  </p>
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

export default Home
