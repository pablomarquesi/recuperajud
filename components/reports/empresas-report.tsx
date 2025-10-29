"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface EmpresasReportProps {
  periodo: string
}

const empresasData = [
  {
    id: 1,
    nome: "Acme Tecnologia S.A.",
    cnpj: "12.345.678/0001-90",
    setor: "Tecnologia",
    dataInicio: "15/03/2024",
    status: "Em vigor",
    vara: "2ª Vara Empresarial",
    tribunal: "TJSP",
    administrador: "Silva & Associados",
    valorDivida: "R$ 2.500.000,00",
    funcionarios: 300,
  },
  {
    id: 2,
    nome: "XYZ Indústria Ltda.",
    cnpj: "98.765.432/0001-10",
    setor: "Indústria",
    dataInicio: "10/01/2024",
    status: "Prorrogado",
    vara: "1ª Vara Empresarial",
    tribunal: "TJSP",
    administrador: "Santos Advocacia",
    valorDivida: "R$ 5.800.000,00",
    funcionarios: 150,
  },
  {
    id: 3,
    nome: "ABC Comércio S.A.",
    cnpj: "45.678.901/0001-23",
    setor: "Varejo",
    dataInicio: "05/12/2023",
    status: "Expirado",
    vara: "3ª Vara Empresarial",
    tribunal: "TJSP",
    administrador: "Oliveira & Partners",
    valorDivida: "R$ 1.200.000,00",
    funcionarios: 80,
  },
  {
    id: 4,
    nome: "Tech Solutions Ltda.",
    cnpj: "34.567.890/0001-45",
    setor: "Tecnologia",
    dataInicio: "20/11/2023",
    status: "Em vigor",
    vara: "4ª Vara Empresarial",
    tribunal: "TJSP",
    administrador: "Costa Consultoria",
    valorDivida: "R$ 800.000,00",
    funcionarios: 45,
  },
  {
    id: 5,
    nome: "Global Industries S.A.",
    cnpj: "56.789.012/0001-67",
    setor: "Indústria",
    dataInicio: "15/10/2023",
    status: "Em vigor",
    vara: "2ª Vara Empresarial",
    tribunal: "TJSP",
    administrador: "Pereira Advocacia",
    valorDivida: "R$ 12.000.000,00",
    funcionarios: 500,
  },
]

const resumoData = {
  totalEmpresas: 142,
  emVigor: 62,
  prorrogados: 43,
  expirados: 37,
  novosCasos: 12,
  valorTotalDividas: "R$ 45.300.000,00",
  funcionariosAfetados: 2850,
}

export function EmpresasReport({ periodo }: EmpresasReportProps) {
  return (
    <div className="space-y-6">
      {/* Resumo Executivo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoData.totalEmpresas}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{resumoData.novosCasos} novos casos
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Vigor</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoData.emVigor}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((resumoData.emVigor / resumoData.totalEmpresas) * 100)}% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total das Dívidas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoData.valorTotalDividas}</div>
            <p className="text-xs text-muted-foreground">Soma de todas as empresas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários Afetados</CardTitle>
            <Minus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoData.funcionariosAfetados.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total de empregos em risco</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Status */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Status</CardTitle>
          <CardDescription>Breakdown das empresas por status atual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{resumoData.emVigor}</div>
              <p className="text-sm text-muted-foreground">Em Vigor</p>
              <Badge variant="success" className="mt-2">
                {Math.round((resumoData.emVigor / resumoData.totalEmpresas) * 100)}%
              </Badge>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{resumoData.prorrogados}</div>
              <p className="text-sm text-muted-foreground">Prorrogados</p>
              <Badge variant="warning" className="mt-2">
                {Math.round((resumoData.prorrogados / resumoData.totalEmpresas) * 100)}%
              </Badge>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{resumoData.expirados}</div>
              <p className="text-sm text-muted-foreground">Expirados</p>
              <Badge variant="destructive" className="mt-2">
                {Math.round((resumoData.expirados / resumoData.totalEmpresas) * 100)}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela Detalhada */}
      <Card>
        <CardHeader>
          <CardTitle>Listagem Detalhada</CardTitle>
          <CardDescription>Informações completas das empresas em recuperação judicial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Data Início</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vara</TableHead>
                  <TableHead>Administrador</TableHead>
                  <TableHead>Valor da Dívida</TableHead>
                  <TableHead>Funcionários</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empresasData.map((empresa) => (
                  <TableRow key={empresa.id}>
                    <TableCell className="font-medium">{empresa.nome}</TableCell>
                    <TableCell>{empresa.cnpj}</TableCell>
                    <TableCell>{empresa.setor}</TableCell>
                    <TableCell>{empresa.dataInicio}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          empresa.status === "Em vigor"
                            ? "success"
                            : empresa.status === "Expirado"
                              ? "destructive"
                              : "warning"
                        }
                      >
                        {empresa.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{empresa.vara}</TableCell>
                    <TableCell>{empresa.administrador}</TableCell>
                    <TableCell>{empresa.valorDivida}</TableCell>
                    <TableCell>{empresa.funcionarios}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
