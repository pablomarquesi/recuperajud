"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, TrendingUp, Award } from "lucide-react"

interface SucessoReportProps {
  periodo: string
}

const taxaSucessoData = [
  { resultado: "Bem-sucedido", quantidade: 65, percentual: 45.8, cor: "#22c55e" },
  { resultado: "Em andamento", quantidade: 62, percentual: 43.7, cor: "#3b82f6" },
  { resultado: "Malsucedido", quantidade: 15, percentual: 10.5, cor: "#ef4444" },
]

const evolucaoSucessoData = [
  { ano: "2020", sucesso: 42, fracasso: 18, emAndamento: 25 },
  { ano: "2021", sucesso: 48, fracasso: 15, emAndamento: 30 },
  { ano: "2022", sucesso: 55, fracasso: 12, emAndamento: 35 },
  { ano: "2023", sucesso: 62, fracasso: 10, emAndamento: 45 },
  { ano: "2024", sucesso: 65, fracasso: 15, emAndamento: 62 },
]

const sucessoPorSetorData = [
  { setor: "Tecnologia", sucesso: 75, fracasso: 15, emAndamento: 10 },
  { setor: "Indústria", sucesso: 45, fracasso: 25, emAndamento: 30 },
  { setor: "Varejo", sucesso: 40, fracasso: 35, emAndamento: 25 },
  { setor: "Serviços", sucesso: 60, fracasso: 20, emAndamento: 20 },
  { setor: "Outros", sucesso: 50, fracasso: 30, emAndamento: 20 },
]

const fatoresSucessoData = [
  { fator: "Plano bem estruturado", impacto: 85, casos: 45 },
  { fator: "Apoio dos credores", impacto: 78, casos: 38 },
  { fator: "Gestão competente", impacto: 72, casos: 42 },
  { fator: "Mercado favorável", impacto: 65, casos: 28 },
  { fator: "Recursos adequados", impacto: 60, casos: 35 },
]

const detalhesResultadosData = [
  {
    empresa: "Tech Solutions Ltda.",
    setor: "Tecnologia",
    dataInicio: "20/11/2023",
    dataFim: "15/08/2024",
    resultado: "Bem-sucedido",
    fatoresChave: "Plano inovador, apoio dos credores",
    valorRecuperado: "85%",
  },
  {
    empresa: "ABC Comércio S.A.",
    setor: "Varejo",
    dataInicio: "05/12/2023",
    dataFim: "20/09/2024",
    resultado: "Malsucedido",
    fatoresChave: "Mercado desfavorável, resistência dos credores",
    valorRecuperado: "25%",
  },
  {
    empresa: "Indústria XYZ Ltda.",
    setor: "Indústria",
    dataInicio: "10/01/2024",
    dataFim: "-",
    resultado: "Em andamento",
    fatoresChave: "Plano em execução, credores colaborativos",
    valorRecuperado: "60%",
  },
]

const resumoEstatisticas = {
  taxaSucessoGeral: 45.8,
  tempoMedioSucesso: 16,
  valorMedioRecuperado: 68,
  empresasSalvas: 65,
  empregosMantidos: 1850,
  creditoresBeneficiados: 245,
}

export function SucessoReport({ periodo }: SucessoReportProps) {
  return (
    <div className="space-y-6">
      {/* Estatísticas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoEstatisticas.taxaSucessoGeral}%</div>
            <p className="text-xs text-muted-foreground">Processos bem-sucedidos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empresas Salvas</CardTitle>
            <Award className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoEstatisticas.empresasSalvas}</div>
            <p className="text-xs text-muted-foreground">Recuperações exitosas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Recuperado</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoEstatisticas.valorMedioRecuperado}%</div>
            <p className="text-xs text-muted-foreground">Média de recuperação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empregos Mantidos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoEstatisticas.empregosMantidos.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Postos de trabalho preservados</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição de Resultados */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Resultados</CardTitle>
          <CardDescription>Breakdown dos resultados dos processos de recuperação judicial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taxaSucessoData}
                    dataKey="quantidade"
                    nameKey="resultado"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ resultado, percentual }) => `${resultado}: ${percentual}%`}
                  >
                    {taxaSucessoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {taxaSucessoData.map((item) => (
                <div key={item.resultado} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.cor }} />
                    <span className="font-medium">{item.resultado}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{item.quantidade} casos</div>
                    <div className="text-sm text-muted-foreground">{item.percentual}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evolução Temporal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Taxa de Sucesso</CardTitle>
          <CardDescription>Tendência histórica dos resultados ao longo dos anos</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolucaoSucessoData}>
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sucesso" stackId="1" stroke="#22c55e" fill="#22c55e" />
              <Area type="monotone" dataKey="emAndamento" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
              <Area type="monotone" dataKey="fracasso" stackId="1" stroke="#ef4444" fill="#ef4444" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sucesso por Setor */}
      <Card>
        <CardHeader>
          <CardTitle>Taxa de Sucesso por Setor</CardTitle>
          <CardDescription>Comparação da efetividade entre diferentes setores econômicos</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sucessoPorSetorData}>
              <XAxis dataKey="setor" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sucesso" fill="#22c55e" name="Sucesso" />
              <Bar dataKey="emAndamento" fill="#3b82f6" name="Em Andamento" />
              <Bar dataKey="fracasso" fill="#ef4444" name="Fracasso" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Fatores de Sucesso */}
      <Card>
        <CardHeader>
          <CardTitle>Fatores Críticos de Sucesso</CardTitle>
          <CardDescription>Análise dos elementos que mais contribuem para o sucesso</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fatoresSucessoData.map((fator, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex-1">
                  <div className="font-medium">{fator.fator}</div>
                  <div className="text-sm text-muted-foreground">{fator.casos} casos analisados</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: `${fator.impacto}%` }} />
                    </div>
                  </div>
                  <span className="font-bold text-green-600">{fator.impacto}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detalhes dos Resultados */}
      <Card>
        <CardHeader>
          <CardTitle>Casos Detalhados</CardTitle>
          <CardDescription>Análise específica dos resultados por empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead>Data Fim</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Valor Recuperado</TableHead>
                <TableHead>Fatores Chave</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detalhesResultadosData.map((caso, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{caso.empresa}</TableCell>
                  <TableCell>{caso.setor}</TableCell>
                  <TableCell>{caso.dataInicio}</TableCell>
                  <TableCell>{caso.dataFim}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        caso.resultado === "Bem-sucedido"
                          ? "success"
                          : caso.resultado === "Malsucedido"
                            ? "destructive"
                            : "default"
                      }
                    >
                      {caso.resultado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        Number.parseInt(caso.valorRecuperado) > 70
                          ? "text-green-600 font-medium"
                          : Number.parseInt(caso.valorRecuperado) > 40
                            ? "text-yellow-600 font-medium"
                            : "text-red-600 font-medium"
                      }
                    >
                      {caso.valorRecuperado}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{caso.fatoresChave}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
