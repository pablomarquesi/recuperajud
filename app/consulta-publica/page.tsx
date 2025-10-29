"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Building, Calendar, MapPin, Scale, FileText } from "lucide-react"
import { format, addDays } from "date-fns"

// Dados de exemplo
const empresas = [
  {
    id: 1,
    nome: "Acme Inc.",
    cnpj: "12.345.678/0001-90",
    numeroProcesso: "0001234-56.2024.8.26.0100",
    dataDeferimento: "2024-03-15",
    status: "Em vigor",
    vara: "2ª Vara Empresarial",
    tribunal: "Tribunal de Justiça de São Paulo",
    endereco: "Av. Paulista, 1000, São Paulo - SP",
    stayPeriodDias: 180,
    descricao: "Empresa do setor de tecnologia em processo de recuperação judicial.",
  },
  {
    id: 2,
    nome: "XYZ Ltda.",
    cnpj: "98.765.432/0001-10",
    numeroProcesso: "0002345-67.2024.8.26.0200",
    dataDeferimento: "2024-01-10",
    status: "Em vigor",
    vara: "1ª Vara Empresarial",
    tribunal: "Tribunal de Justiça de São Paulo",
    endereco: "Rua Augusta, 500, São Paulo - SP",
    stayPeriodDias: 120,
    descricao: "Empresa do setor de varejo em processo de recuperação judicial.",
  },
  {
    id: 3,
    nome: "ABC S.A.",
    cnpj: "45.678.901/0001-23",
    numeroProcesso: "0003456-78.2023.8.26.0300",
    dataDeferimento: "2023-12-05",
    status: "Prorrogado",
    vara: "3ª Vara Empresarial",
    tribunal: "Tribunal de Justiça de São Paulo",
    endereco: "Av. Brigadeiro Faria Lima, 2000, São Paulo - SP",
    stayPeriodDias: 240,
    descricao: "Empresa do setor industrial em processo de recuperação judicial.",
  },
  {
    id: 4,
    nome: "Tech Solutions",
    cnpj: "34.567.890/0001-45",
    numeroProcesso: "0004567-89.2023.8.26.0400",
    dataDeferimento: "2023-11-20",
    status: "Em vigor",
    vara: "4ª Vara Empresarial",
    tribunal: "Tribunal de Justiça de São Paulo",
    endereco: "Rua Vergueiro, 1500, São Paulo - SP",
    stayPeriodDias: 150,
    descricao: "Empresa do setor de tecnologia em processo de recuperação judicial.",
  },
  {
    id: 5,
    nome: "Global Industries",
    cnpj: "56.789.012/0001-67",
    numeroProcesso: "0005678-90.2023.8.26.0500",
    dataDeferimento: "2023-10-15",
    status: "Expirado",
    vara: "2ª Vara Empresarial",
    tribunal: "Tribunal de Justiça de São Paulo",
    endereco: "Av. Rebouças, 800, São Paulo - SP",
    stayPeriodDias: 180,
    descricao: "Empresa do setor industrial em processo de recuperação judicial.",
  },
  {
    id: 6,
    nome: "Mega Corporação",
    cnpj: "67.890.123/0001-89",
    numeroProcesso: "0006789-01.2023.8.26.0600",
    dataDeferimento: "2023-09-01",
    status: "Em vigor",
    vara: "1ª Vara Empresarial",
    tribunal: "Tribunal de Justiça do Rio de Janeiro",
    endereco: "Av. Rio Branco, 100, Rio de Janeiro - RJ",
    stayPeriodDias: 300,
    descricao: "Empresa do setor de energia em processo de recuperação judicial.",
  },
]

export default function ConsultaPublicaPage() {
  const [filtro, setFiltro] = useState("")

  // Função para calcular o fim do stay period
  const calcularFimStayPeriod = (dataDeferimento: string, stayPeriodDias: number) => {
    const data = new Date(dataDeferimento)
    return addDays(data, stayPeriodDias)
  }

  // Função para gerar um número aleatório entre min e max
  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Função para calcular os dias restantes do stay period
  const calcularDiasRestantes = (dataDeferimento: string, stayPeriodDias: number) => {
    // Gera um número aleatório de dias restantes entre 0 e o total de dias do stay period
    return randomInt(0, stayPeriodDias)
  }

  // Filtra as empresas com base no critério
  const empresasFiltradas = empresas.filter((empresa) => {
    return (
      filtro === "" ||
      empresa.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      empresa.cnpj.includes(filtro) ||
      empresa.numeroProcesso.includes(filtro) ||
      empresa.vara.toLowerCase().includes(filtro.toLowerCase())
    )
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">RecuperaJud</h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Sistema de Consulta Pública de Recuperação Judicial
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por nome, CNPJ ou processo..."
                className="pl-10"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {empresasFiltradas.length > 0 ? (
            empresasFiltradas.map((empresa) => {
              const diasRestantes = calcularDiasRestantes(empresa.dataDeferimento, empresa.stayPeriodDias)
              const fimStayPeriod = calcularFimStayPeriod(empresa.dataDeferimento, empresa.stayPeriodDias)
              const percentualRestante = (diasRestantes / empresa.stayPeriodDias) * 100

              return (
                <Card key={empresa.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{empresa.nome}</CardTitle>
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
                    </div>
                    <CardDescription>{empresa.cnpj}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-0.5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Processo</p>
                        <p className="text-sm text-gray-500">{empresa.numeroProcesso}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Scale className="h-4 w-4 mt-0.5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Vara / Tribunal</p>
                        <p className="text-sm text-gray-500">
                          {empresa.vara} - {empresa.tribunal}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Endereço</p>
                        <p className="text-sm text-gray-500">{empresa.endereco}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-0.5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Stay Period</p>
                        <p className="text-sm text-gray-500">
                          {diasRestantes} dias restantes (até {format(fimStayPeriod, "dd/MM/yyyy")})
                        </p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            percentualRestante > 70
                              ? "bg-green-500"
                              : percentualRestante > 30
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{
                            width: `${Math.min(100, percentualRestante)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/consulta-publica/detalhes/${empresa.id}`}>Ver Detalhes</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })
          ) : (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="text-center">
                <Building className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Nenhuma empresa encontrada</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Tente ajustar os critérios de busca para encontrar o que procura.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <p className="font-medium">RecuperaJud</p>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} RecuperaJud - Sistema de Gerenciamento de Recuperação Judicial
            </p>
            <div className="flex gap-4">
              <Link
                href="/termos"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Termos de Uso
              </Link>
              <Link
                href="/privacidade"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
