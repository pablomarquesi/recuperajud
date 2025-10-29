"use client"

import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const durationData = [
  { status: "Em vigor", duracao: 18 },
  { status: "Prorrogado", duracao: 24 },
  { status: "Concluído", duracao: 15 },
]

const successRateData = [
  { status: "Bem-sucedido", valor: 65 },
  { status: "Em andamento", valor: 25 },
  { status: "Malsucedido", valor: 10 },
]

const sectorsData = [
  { setor: "Tecnologia", quantidade: 30 },
  { setor: "Varejo", quantidade: 25 },
  { setor: "Indústria", quantidade: 20 },
  { setor: "Serviços", quantidade: 15 },
  { setor: "Outros", quantidade: 10 },
]

const trendData = [
  { mes: "Jan", casos: 10 },
  { mes: "Fev", casos: 15 },
  { mes: "Mar", casos: 12 },
  { mes: "Abr", casos: 18 },
  { mes: "Mai", casos: 20 },
  { mes: "Jun", casos: 17 },
]

interface AnalysisChartsProps {
  type: "duration" | "success-rate" | "sectors" | "trend"
}

export function AnalysisCharts({ type }: AnalysisChartsProps) {
  switch (type) {
    case "duration":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={durationData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duracao" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )
    case "success-rate":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie dataKey="valor" data={successRateData} fill="#82ca9d" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    case "sectors":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sectorsData}>
            <XAxis dataKey="setor" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )
    case "trend":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="casos" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )
    default:
      return null
  }
}
