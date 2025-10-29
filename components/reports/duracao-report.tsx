"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, TrendingUp, Calendar, Target } from "lucide-react"

interface DuracaoReportProps {
  periodo: string
}

const duracaoMediaData = [
  { status: "Em vigor", duracao: 18, casos: 62 },
  { status: "Prorrogado", duracao: 24, casos: 43 },
  { status: "Concluído", duracao: 15, casos: 37 },
]

const tendenciaTemporalData = [
  { mes: "Jan", duracaoMedia: 16, novosCasos: 8 },
  { mes: "Fev", duracaoMedia: 17, novosCasos: 12 },
  { mes: "Mar", duracaoMedia: 18, novosCasos: 15 },
  { mes: "Abr", duracaoMedia: 19, novosCasos: 10 },
  { mes: "Mai", duracaoMedia: 18, novosCasos: 14 },
  { mes: "Jun", duracaoMedia: 17, novosCasos: 11 },
]

const distribuicaoSetorData = [
  { setor: "Tecnologia", duracao: 14, casos: 25, cor: "#8884d8" },
  { setor: "Indústria", duracao: 22, casos: 35, cor: "#82ca9d" },
  { setor: "Varejo", duracao: 16, casos: 30, cor: "#ffc658" },
  { setor: "Serviços", duracao: 19, casos: 28, cor: "#ff7300" },
  { setor: "Outros", duracao: 20, casos: 24, cor: "#00ff00" },
]

const detalhesProcessosData = [
  {
    empresa: "Acme Tecnologia S.A.",
    dataInicio: "15/03/2024",
    duracaoAtual: 4,
    duracaoEstimada: 18,
    etapaAtual: "Apresentação do Plano",
    progresso: 22,
  },
  {
    empresa: "XYZ Indústria Ltda.",
    dataInicio: "10/01/2024",
    duracaoAtual: 6,
    duracaoEstimada: 24,
    etapaAtual: "Assembleia de Credores",
    progresso: 45,
  },
  {
    empresa: "ABC Comércio S.A.",
    dataInicio: "05/12/2023",
    duracaoAtual: 7,
    duracaoEstimada: 15,
    etapaAtual: "Homologação",
    progresso: 85,
  },
  {
    empresa: "Tech Solutions Ltda.",
    dataInicio: "20/11/2023",
    duracaoAtual: 8,
    duracaoEstimada: 16,
    etapaAtual: "Execução do Plano",
    progresso: 60,
  },
]

const resumoEstatisticas = {
  duracaoMediaGeral: 18.5,
  menorDuracao: 12,
  maiorDuracao: 36,
  desviopadrao: 6.2,
  processosMaisRapidos: 15,
  processosMaisLentos: 8,
}

export function DuracaoReport({ periodo }: DuracaoReportProps) {
  return (
    <div className="space-y-6">
      {/* Estatísticas Gerais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duração Média</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoEstatisticas.duracaoMediaGeral} meses</div>
            <p className="text-xs text-muted-foreground">Todos os processos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menor Duração</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoEstatisticas.menorDuracao} meses</div>
            <p className="text-xs text-muted-foreground">Processo mais rápido</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Duração</CardTitle>
            <Calendar className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoEstatisticas.maiorDuracao} meses</div>
            <p className="text-xs text-muted-foreground">Processo mais longo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desvio Padrão</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">±{resumoEstatisticas.desviopadrao}</div>
            <p className="text-xs text-muted-foreground">Variação média</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Análise */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Duração Média por Status</CardTitle>
            <CardDescription>Comparação da duração média entre diferentes status</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={duracaoMediaData}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value} meses`, "Duração Média"]} />
                <Bar dataKey="duracao" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendência Temporal</CardTitle>
            <CardDescription>Evolução da duração média ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tendenciaTemporalData}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="duracaoMedia" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Setor */}
      <Card>
        <CardHeader>
          <CardTitle>Duração por Setor</CardTitle>
          <CardDescription>Análise da duração média dos processos por setor econômico</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicaoSetorData}
                    dataKey="casos"
                    nameKey="setor"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ setor, casos }) => `${setor}: ${casos}`}
                  >
                    {distribuicaoSetorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {distribuicaoSetorData.map((setor) => (
                <div key={setor.setor} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: setor.cor }} />
                    <span className="font-medium">{setor.setor}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{setor.duracao} meses</div>
                    <div className="text-sm text-muted-foreground">{setor.casos} casos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes dos Processos */}
      <Card>
        <CardHeader>
          <CardTitle>Processos em Andamento</CardTitle>
          <CardDescription>Detalhamento dos processos ativos e seu progresso</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead>Duração Atual</TableHead>
                <TableHead>Duração Estimada</TableHead>
                <TableHead>Etapa Atual</TableHead>
                <TableHead>Progresso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detalhesProcessosData.map((processo, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{processo.empresa}</TableCell>
                  <TableCell>{processo.dataInicio}</TableCell>
                  <TableCell>{processo.duracaoAtual} meses</TableCell>
                  <TableCell>{processo.duracaoEstimada} meses</TableCell>
                  <TableCell>{processo.etapaAtual}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: `${processo.progresso}%` }} />
                        </div>
                      </div>
                      <span className="text-sm font-medium">{processo.progresso}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
