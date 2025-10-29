"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts"

// Dados de exemplo para o gráfico
const dadosEmpresasPorStatus = [
  { name: "Em vigor", value: 65, color: "#16a34a" },
  { name: "Prorrogados", value: 25, color: "#eab308" },
  { name: "Expirados", value: 10, color: "#dc2626" },
]

export function DashboardCharts() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={dadosEmpresasPorStatus} margin={{ top: 10, right: 20, left: 70, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 14 }} />
        <Tooltip
          formatter={(value) => [`${value} empresas`, "Quantidade"]}
          labelFormatter={(name) => `Status: ${name}`}
        />
        <Legend />
        <Bar dataKey="value" name="Empresas" fill="#3b82f6" radius={[0, 4, 4, 0]}>
          {dadosEmpresasPorStatus.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
