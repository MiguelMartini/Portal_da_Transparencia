function RouteConfig({
  origin,
  setOrigin,
  destination,
  setDestination,
  algorithm,
  setAlgorithm,
  capitals,
  connect,
  clear,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#3F3F3F] mb-4">
        Configuração da Rota
      </h2>

      {/* Origem */}
      <select
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="w-full p-3 border mb-3 rounded-lg"
      >
        <option value="">Selecione a origem</option>
        {capitals.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.state})
          </option>
        ))}
      </select>

      {/* Destino */}
      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full p-3 border mb-4 rounded-lg"
      >
        <option value="">Selecione o destino</option>
        {capitals.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.state})
          </option>
        ))}
      </select>

      {/* Algoritmo */}

      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="w-full p-3 border mb-4 rounded-lg"
      >
        <option value="">Selecione o algoritmo</option>
        <option value="A-Estrela">A* (A Estrela)</option>
        <option value="kruskal">Kruskal</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={connect}
          disabled={!origin || !destination || !algorithm || origin === destination}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-300"
        >
          Calcular Rota
        </button>

        <button onClick={clear} className="px-6 bg-gray-200 py-3 rounded-lg">
          Limpar
        </button>
      </div>
    </div>
  );
}
export default RouteConfig;
