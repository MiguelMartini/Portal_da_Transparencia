import { useEffect, useState } from "react";
import Header from "./Home/Header.jsx";
import Footer from "./Home/Footer.jsx";
import { GraphVisualizer } from "../pages/components/graph-visualizer.jsx";
import axios from "axios";
import { adaptGraphData } from "./utils/graphAdapter.js";
import { Spinner } from "@/Components/ui/spinner.jsx";
import RouteConfig from "./components/RouteConfig.jsx";

function Grafo() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);

  const [capitals, setCapitals] = useState([]);
  const [connections, setConnections] = useState([]);

  // 🔥 Carregar grafo do backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/grafo")
      .then((res) => {
        const { capitals, connections } = adaptGraphData(res.data);
        setCapitals(capitals);
        setConnections(connections);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 Buscar rota
  const connect = () => {
    axios
      .get("http://127.0.0.1:8000/rota/kruskal", {
        params: {
          start: origin,
          end: destination,
        },
      })
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => console.log(err.response?.data));
  };

  // 🔥 Limpar tudo
  const clear = () => {
    setOrigin("");
    setDestination("");
    setResult(null);
  };

  // 🔥 Nome da capital
  const getCapitalName = (id) => {
    const cap = capitals.find((c) => c.id === id);
    return cap ? cap.name : id;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-linear-to-br from-blue-50 to-slate-100 p-6">
        <div className="max-w-400 mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Painel */}
            <div className="lg:col-span-1 space-y-4 ">
              
              <RouteConfig
                origin={origin}
                setOrigin={setOrigin}
                destination={destination}
                setDestination={setDestination}
                capitals={capitals}
                connect={connect}
                clear={clear}
              />

              {/* Resultado */}
              {result && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Melhor Rota</h3>

                  <p className="mb-3">Custo: R${result.cost.toFixed(2)}</p>

                  {result.path.map((id, index) => (
                    <div key={id}>
                      {index + 1}. {getCapitalName(id)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grafo */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 h-[850px]">
                {capitals.length > 0 && connections.length > 0 ? (
                  <GraphVisualizer
                    capitals={capitals}
                    connections={connections}
                    highlightedPath={result?.path || []}
                  />
                ) : (
                  <div className="flex items-center flex-col">
                    <p className="p-6 text-2xl">Carregando mapa...</p>
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Grafo;
