'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  '#4f46e5', 
  '#06b6d4', 
  '#8b5cf6', 
  '#ec4899', 
  '#f59e0b', 
];

export function ExpenseChart({ data }: Props) {

  const chartDataWithColors = useMemo(() => {
    return data.map((entry, index) => ({
      ...entry,
      fill: COLORS[index % COLORS.length],
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(payload[0].value);

      return (
        <div className="bg-white p-3 border border-zinc-200 rounded-lg shadow-xl shadow-zinc-200/50">
          <p className="text-xs font-medium text-zinc-500 mb-1">{payload[0].name}</p>
          <p className="text-sm font-bold text-zinc-900">{formattedValue}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold text-zinc-900 mb-6">Distribuição de Gastos</h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartDataWithColors}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80} 
              outerRadius={120}
              paddingAngle={2}
              stroke="none"
            />
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}