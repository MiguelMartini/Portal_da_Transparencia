import { api } from "./api";

export const selectAlgorithm = (algorithm, origin, destination) => {
    switch(algorithm){
        case "a-estrela":
          return getPath(origin, destination);
        case "kruskal":
          return getKruskalPath(origin, destination);
        case "g-kruskal":
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
  // console.log(totalCoast.data.total_cost)

  return {...response.data,
    total_cost: totalCoast.data.total_cost
  }
};

const getGeneticPath = async (start, end) => {
    const response = await api.get("/rota/genetico", {
        params : {start, end},
    });
    return response.data
}

// Geradores: Gerar ferrovias (custo da ferrovia)
// export const generateKruskal = async () => {
//     const response = await api.get("/gerar/kruskal")
//     return response.data
// }

// export const generateGenetico = async () => {
//     const response = await api.get("/gerar/genetico");
//     return response.data
// }

// Grafos: 
export const getGraph = async () => {
  const response = await api.get("/grafo");
  return response.data;
};

export const getKruskalGraph = async () => {
  const response = await api.get("/grafo/kruskal");
  return response.data;
};

export const getGeneticGraph = async () => {
  const response = await api.get("/grafo");
  return response.data;
};