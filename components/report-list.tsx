"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, FileText, Eye } from "lucide-react"
import Link from "next/link"

interface ReportListProps {
  period: string
}

const reportData = [
  {
    id: 1,
    nome: "Relatório de Empresas em Recuperação Judicial",
    tipo: "empresas",
    periodo: "Junho 2025",
    geradoEm: "01/07/2025",
    status: "Disponível",
  },
  {
    id: 2,
    nome: "Análise de Duração dos Processos",
    tipo: "duracao",
    periodo: "2º Trimestre 2025",
    geradoEm: "15/07/2025",
    status: "Disponível",
  },
  {
    id: 3,
    nome: "Estatísticas de Sucesso em Recuperação Judicial",
    tipo: "sucesso",
    periodo: "1º Semestre 2025",
    geradoEm: "10/07/2025",
    status: "Disponível",
  },
]

export function ReportList({ period }: ReportListProps) {
  const handleExportExcel = (reportType: string) => {
    setTimeout(() => {
      alert(`Relatório ${reportType} exportado para Excel com sucesso!`)
    }, 1000)
  }

  const handleExportPDF = (reportType: string) => {
    setTimeout(() => {
      alert(`Relatório ${reportType} exportado para PDF com sucesso!`)
    }, 1000)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Relatório</TableHead>
          <TableHead>Período</TableHead>
          <TableHead>Gerado em</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reportData.map((report) => (
          <TableRow key={report.id}>
            <TableCell className="font-medium">{report.nome}</TableCell>
            <TableCell>{report.periodo}</TableCell>
            <TableCell>{report.geradoEm}</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                {report.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/relatorios">
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleExportExcel(report.tipo)}>
                  <FileSpreadsheet className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleExportPDF(report.tipo)}>
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
