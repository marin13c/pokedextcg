import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressChartProps {
  obtenidos: number;
  total: number;
  nombresObtenidos: string[]; // Recibimos una lista con los nombres de los Pokémon obtenidos
}

export default function ProgressChart({
  obtenidos,
  total,
  nombresObtenidos,
}: ProgressChartProps) {
  const faltan = total - obtenidos;

  const data = {
    labels: ['Obtenidos', 'Faltan'],
    datasets: [
      {
        data: [obtenidos, faltan],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className="max-w-xs mx-auto">
      <h2 className="text-xl font-bold text-center mb-2">Progreso de Pokémon</h2>
      <Doughnut data={data} />
      <p className="text-center mt-2">{`${obtenidos} de ${total} obtenidos`}</p>
    
    </div>
  );
}
