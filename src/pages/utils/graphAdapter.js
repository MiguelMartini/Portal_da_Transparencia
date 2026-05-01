
import { capitalByState } from '../data/capitals'

export function adaptGraphData(apiData) {
  const adj = apiData.lista_adjacencias

  // Capitais
  const capitals = Object.keys(adj).map(uf => ({
    id: uf,
    name: capitalByState[uf]?.name || uf,
    state: uf,
    x: capitalByState[uf]?.x || 0,
    y: capitalByState[uf]?.y || 0
  }))

  // Conexões (sem duplicar)
  const seen = new Set()
  const connections = []

  Object.entries(adj).forEach(([from, neighbors]) => {
    Object.entries(neighbors).forEach(([to, distance]) => {
      const key = [from, to].sort().join('-')

      if (!seen.has(key)) {
        seen.add(key)

        connections.push({
          from,
          to,
          distance
        })
      }
    })
  })

  return { capitals, connections }
}