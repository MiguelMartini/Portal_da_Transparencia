import { api } from "./api";

export const selectAlgorithm = (algorithm, origin, destination) => {
    switch(algorithm){
        case "a-estrela":
          return getPath(origin, destination);
        case "kruskal":
          return getKruskalPath(origin, destination);
        case "genetico":
          return getGeneticPath(origin, destination);
        
        default:
          console.log("Algoritmo inválido:");
      }     
}

// Caminhos: Caminho mais curto com o custo da viagem

//A estrela
const getPath = async (start, end) => {
  const response = await api.get("/rota", {
    params: { start, end },
  });
  return response.data;
}

const getKruskalPath = async (start, end) => {
  const response = await api.get("/rota/kruskal", {
    params: { start, end },
  });
  const totalCoast = await api.get("/grafo/kruskal");

  return {...response.data,
    total_cost: totalCoast.data.total_cost
  }
};

const getGeneticPath = async (start, end) => {
    const response = await api.get("/rota/genetico", {
        params : {start, end},
    });
    const totalCost = await api.get("/grafo/genetico");
    return {...response.data,
      total_cost: totalCost.data.total_cost
    }
}

// Grafos: 
export const getGraph = async () => {
  const response = await api.get("/grafo");
  return response.data;
};

export const getGraph2 = async (algorithm = "") => {
  switch(algorithm){
    case "kruskal":
      return (await api.get("/gerar/kruskal")).data;

    case "genetico":
      return (await api.get("/gerar/genetico")).data;

    default:
      return (await api.get("/grafo")).data
    }
};