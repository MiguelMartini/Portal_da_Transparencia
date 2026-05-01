import { api } from "./api";

export const selectAlgorithm = (algorithm, origin, destination) => {
    switch(algorithm){
        case "a-estrela":
          return getRotaGenetico(origin, destination);
        case "kruskal":
          return getRotaKruskal(origin, destination);
        default:
          console.log("Algoritmo inválido:");
      }     
}
export const getRota = async () => {
  const response = await api.get("/grafo");
  return response.data;
};

const getRotaKruskal = async (start, end) => {
  const response = await api.get("/rota/kruskal", {
    params: { start, end },
  });
  return response.data;
};

const getRotaGenetico = async (start, end) => {
    const response = await api.get("/rota/genetico", {
        params : {start, end},
    });
    return response.data
}