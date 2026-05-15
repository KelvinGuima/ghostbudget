'use client';

import {PieChart, Pie, Tooltip, Sector, ResponsiveContainer} from 'recharts'

interface Props {
    data: {
        name: string;
        value: number;
    }[];
}

const COLORS = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff8042',
    '#0088fe'
];

export function ExpenseChart({ data }: Props) {

    const chartData = data.map((entry, index) => ({
        ...entry,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <div className="bg-white rounded-x1 shadow-sm p-6 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={chartData}
                    dataKey={"value"}
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    label
                    />
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}