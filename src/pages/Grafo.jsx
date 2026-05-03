import { useEffect, useState } from "react";
import Header from "./Home/Header.jsx";
import Footer from "./Home/Footer.jsx";
import GraphVisualizer from "../Components/GraphVisualizer.jsx";
import { adaptGraphData } from "./utils/graphAdapter.js";
import { Spinner } from "@/Components/ui/spinner.jsx";
import RouteConfig from "../Components/RouteConfig.jsx";
import { getGraph, selectAlgorithm } from "@/services/graphService.js";

function Grafo() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [algorithm, setAlgorithm] = useState("");

  const [result, setResult] = useState(null);
  const [cost, setCost] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  // capitals = vertices | connections = arestas
  const [capitals, setCapitals] = useState([]);
  const [connections, setConnections] = useState([]);

  // gerando grafo
  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const data = await getGraph();
        const { capitals, connections } = adaptGraphData(data);
        setCapitals(capitals);
        setConnections(connections);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGraph();
  }, []);

  // func geradora do calculo
  const connect = async () => {
    try {
      const normalized = algorithm.trim().toLowerCase();
      const data = await selectAlgorithm(normalized, origin, destination);
      console.log(data);
      setResult(data.path);
      setCost(data.cost);
      setTotalCost(data.total_cost ?? null);

      console.log(
        "Path:",
        data.path,
        "cost:",
        data.cost,
        "TotalCost:",
        data.total_cost,
      );
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // Limpa os estados para que reinicie o resultado
  useEffect(() => {
    setResult(null);
    setCost(null);
    setTotalCost(null);
  }, [origin, destination, algorithm]);

  // conversao da rota para string de vertices
  const parsePath = (rawPath) => {
    if (!rawPath) return [];

    return rawPath.map((item) => {
      const [from, to, type] = item.split(" - ");

      return {
        from,
        to,
        type: type?.trim().toLowerCase(),
      };
    });
  };

  const parsedEdges = parsePath(result);

  const highlightedNodes = (() => {
    if (!parsedEdges.length) return [];

    const nodes = [parsedEdges[0].from];
    parsedEdges.forEach((edge) => nodes.push(edge.to));

    return nodes;
  })();

  // limpa selecao
  const clear = () => {
    setOrigin("");
    setDestination("");
    setAlgorithm("");
    setResult(null);
    setCost(null);
    setTotalCost(null);
  };

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
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                capitals={capitals}
                connect={connect}
                clear={clear}
              />

              {/* Resultado */}
              {result && result.length > 0 && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Melhor Rota</h3>
                  <p className="text-md font-semibold mb-2">
                    Algoritmo: {algorithm}
                  </p>

                  <p className="mb-3">Custo: R${cost.toFixed(2)}</p>
                  {(algorithm === "kruskal" || algorithm === "genetico") &&
                    totalCost !== null && (
                      <p className="mb-3">
                        Custo Cosntrução: Só nos de ferrovia R$
                        {totalCost.toFixed(2)}
                      </p>
                    )}

                  {result.map((id, index) => (
                    <div key={id}>
                      {index + 1}. {getCapitalName(id)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grafo */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 h-212.5">
                {capitals.length > 0 && connections.length > 0 ? (
                  <GraphVisualizer
                    capitals={capitals}
                    connections={connections}
                    highlightedPath={highlightedNodes}
                    highlightedEdges={parsedEdges}
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
