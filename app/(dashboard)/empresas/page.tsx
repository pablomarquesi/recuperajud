"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, PlusCircle, Search, ExternalLink } from "lucide-react"
import { format, addDays, differenceInDays } from "date-fns"

// Atualizar os dados de exemplo com diferentes durações do stay period
const empresas = [
  {
    id: 1,
    nome: "Acme Inc.",
    cnpj: "12.345.678/0001-90",
    numeroProcesso: "0001234-56.2024.8.26.0100",
    dataDeferimento: "2024-03-15",
    status: "Em vigor",
    vara: "2ª Vara Empresarial",
    stayPeriodDias: 180, // Padrão
  },
  {
    id: 2,
    nome: "XYZ Ltda.",
    cnpj: "98.765.432/0001-10",
    numeroProcesso: "0002345-67.2024.8.26.0200",
    dataDeferimento: "2024-01-10",
    status: "Em vigor",
    vara: "1ª Vara Empresarial",
    stayPeriodDias: 120, // Reduzido por decisão judicial
  },
  {
    id: 3,
    nome: "ABC S.A.",
    cnpj: "45.678.901/0001-23",
    numeroProcesso: "0003456-78.2023.8.26.0300",
    dataDeferimento: "2023-12-05",
    status: "Prorrogado",
    vara: "3ª Vara Empresarial",
    stayPeriodDias: 240, // Prorrogado por 60 dias
  },
  {
    id: 4,
    nome: "Tech Solutions",
    cnpj: "34.567.890/0001-45",
    numeroProcesso: "0004567-89.2023.8.26.0400",
    dataDeferimento: "2023-11-20",
    status: "Em vigor",
    vara: "4ª Vara Empresarial",
    stayPeriodDias: 150, // Reduzido por decisão judicial
  },
  {
    id: 5,
    nome: "Global Industries",
    cnpj: "56.789.012/0001-67",
    numeroProcesso: "0005678-90.2023.8.26.0500",
    dataDeferimento: "2023-10-15",
    status: "Expirado",
    vara: "2ª Vara Empresarial",
    stayPeriodDias: 180, // Padrão
  },
  {
    id: 6,
    nome: "Mega Corporação",
    cnpj: "67.890.123/0001-89",
    numeroProcesso: "0006789-01.2023.8.26.0600",
    dataDeferimento: "2023-09-01",
    status: "Em vigor",
    vara: "1ª Vara Empresarial",
    stayPeriodDias: 300, // Prorrogado por 120 dias
  },
  {
    id: 7,
    nome: "Indústrias Reunidas",
    cnpj: "78.901.234/0001-01",
    numeroProcesso: "0007890-12.2023.8.26.0700",
    dataDeferimento: "2023-08-10",
    status: "Expirado",
    vara: "3ª Vara Empresarial",
    stayPeriodDias: 90, // Reduzido por decisão judicial
  },
]

export default function EmpresasPage() {
  const [filtro, setFiltro] = useState("")
  const [statusFiltro, setStatusFiltro] = useState("todos")

  // Função para calcular o fim do stay period
  const calcularFimStayPeriod = (dataDeferimento: string, stayPeriodDias: number) => {
    const data = new Date(dataDeferimento)
    return addDays(data, stayPeriodDias)
  }

  // Função para calcular os dias restantes do stay period
  const calcularDiasRestantes = (dataDeferimento: string, stayPeriodDias: number) => {
    const hoje = new Date()
    const fimStayPeriod = calcularFimStayPeriod(dataDeferimento, stayPeriodDias)
    const diasRestantes = differenceInDays(fimStayPeriod, hoje)
    return Math.max(0, diasRestantes)
  }

  // Filtra as empresas com base nos critérios
  const empresasFiltradas = empresas.filter((empresa) => {
    const matchFiltro =
      filtro === "" ||
      empresa.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      empresa.cnpj.includes(filtro) ||
      empresa.numeroProcesso?.includes(filtro) ||
      empresa.vara.toLowerCase().includes(filtro.toLowerCase())

    const matchStatus = statusFiltro === "todos" || empresa.status.toLowerCase() === statusFiltro.toLowerCase()

    return matchFiltro && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
          <p className="text-muted-foreground">Consulta de empresas em recuperação judicial</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/empresas/cadastro">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Empresa
            </Link>
          </Button>
          <Button variant="outline" asChild onClick={() => window.open("/consulta-publica", "_blank")}>
            <Link href="/consulta-publica" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visão Pública
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="flex flex-col items-center gap-4 border-b p-4 md:flex-row">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, CNPJ ou responsável..."
              className="pl-8"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
          <Select value={statusFiltro} onValueChange={setStatusFiltro}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="em vigor">Em vigor</SelectItem>
              <SelectItem value="prorrogado">Prorrogado</SelectItem>
              <SelectItem value="expirado">Expirado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Nº do Processo</TableHead>
                <TableHead>Data de Deferimento</TableHead>
                <TableHead>Duração Stay Period</TableHead>
                <TableHead>Fim do Stay Period</TableHead>
                <TableHead>Dias Restantes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vara Judicial</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empresasFiltradas.length > 0 ? (
                empresasFiltradas.map((empresa) => (
                  <TableRow key={empresa.id}>
                    <TableCell className="font-medium">{empresa.nome}</TableCell>
                    <TableCell>{empresa.cnpj}</TableCell>
                    <TableCell>{empresa.numeroProcesso}</TableCell>
                    <TableCell>{format(new Date(empresa.dataDeferimento), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{empresa.stayPeriodDias} dias</TableCell>
                    <TableCell>
                      {format(calcularFimStayPeriod(empresa.dataDeferimento, empresa.stayPeriodDias), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{calcularDiasRestantes(empresa.dataDeferimento, empresa.stayPeriodDias)} dias</TableCell>
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8" title="Ver detalhes">
                          <Link href={`/detalhes/${empresa.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8" title="Ver documentos">
                          <Link href={`/detalhes/${empresa.id}/documentos`}>
                            <FileText className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    Nenhuma empresa encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
