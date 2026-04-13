import { useEffect, useRef } from 'react';
import { capitals, connections } from '../data/capitals.js';

export function GraphVisualizer({ highlightedPath = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuração de escala e offset para melhor visualização
    const scale = 1.2;
    const offsetX = 50;
    const offsetY = 50;

    // Criar mapa de capitais para fácil acesso
    const capitalMap = new Map();
    capitals.forEach(c => capitalMap.set(c.id, c));

    // Criar set de conexões destacadas
    const highlightedConnections = new Set();
    if (highlightedPath.length > 1) {
      for (let i = 0; i < highlightedPath.length - 1; i++) {
        const from = highlightedPath[i];
        const to = highlightedPath[i + 1];
        highlightedConnections.add(`${from}-${to}`);
        highlightedConnections.add(`${to}-${from}`);
      }
    }

    // Desenhar todas as conexões primeiro
    connections.forEach(conn => {
      const from = capitalMap.get(conn.from);
      const to = capitalMap.get(conn.to);

      if (!from || !to) return;

      const isHighlighted =
        highlightedConnections.has(`${conn.from}-${conn.to}`) ||
        highlightedConnections.has(`${conn.to}-${conn.from}`);

      ctx.beginPath();
      ctx.moveTo(from.x * scale + offsetX, from.y * scale + offsetY);
      ctx.lineTo(to.x * scale + offsetX, to.y * scale + offsetY);

      if (isHighlighted) {
        ctx.strokeStyle = '#22c55e'; // Verde para rota destacada
        ctx.lineWidth = 4;
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 10;
      } else {
        ctx.strokeStyle = '#94a3b8'; // Cinza para outras rotas
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 0;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      // Desenhar distância no meio da linha
      if (!isHighlighted) {
        const midX = (from.x + to.x) / 2 * scale + offsetX;
        const midY = (from.y + to.y) / 2 * scale + offsetY;

        ctx.fillStyle = '#64748b';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${conn.distance}km`, midX, midY - 5);
      }
    });

    // Desenhar nós (capitais)
    capitals.forEach(capital => {
      const x = capital.x * scale + offsetX;
      const y = capital.y * scale + offsetY;
      const isInPath = highlightedPath.includes(capital.id);
      const isStartOrEnd =
        capital.id === highlightedPath[0] ||
        capital.id === highlightedPath[highlightedPath.length - 1];

      // Círculo do nó
      ctx.beginPath();
      ctx.arc(x, y, isInPath ? 8 : 6, 0, 2 * Math.PI);

      if (isStartOrEnd) {
        ctx.fillStyle = '#ef4444'; // Vermelho para início/fim
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 15;
      } else if (isInPath) {
        ctx.fillStyle = '#22c55e'; // Verde para caminho
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = '#3b82f6'; // Azul para outros nós
        ctx.shadowBlur = 0;
      }

      ctx.fill();
      ctx.shadowBlur = 0;

      // Borda do nó
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label da capital
      ctx.fillStyle = '#1e293b';
      ctx.font = isInPath ? 'bold 12px sans-serif' : '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(capital.name, x, y - 15);
      ctx.fillStyle = '#64748b';
      ctx.font = '9px sans-serif';
      ctx.fillText(capital.state, x, y - 4);
    });

  }, [highlightedPath]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-lg border-2 border-slate-200 overflow-auto">
      <canvas
        ref={canvasRef}
        width={1000}
        height={800}
        className="max-w-full"
      />
    </div>
  );
}
