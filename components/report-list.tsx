import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ReportListProps {
  period: string
}

const reportData = [
  {
    id: 1,
    nome: "Relatório de Empresas em Recuperação Judicial",
    periodo: "Junho 2025",
    geradoEm: "01/07/2025",
  },
  {
    id: 2,
    nome: "Análise de Duração dos Processos",
    periodo: "2º Trimestre 2025",
    geradoEm: "15/07/2025",
  },
  {
    id: 3,
    nome: "Estatísticas de Sucesso em Recuperação Judicial",
    periodo: "1º Semestre 2025",
    geradoEm: "10/07/2025",
  },
]

export function ReportList({ period }: ReportListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Relatório</TableHead>
          <TableHead>Período</TableHead>
          <TableHead>Gerado em</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reportData.map((report) => (
          <TableRow key={report.id}>
            <TableCell className="font-medium">{report.nome}</TableCell>
            <TableCell>{report.periodo}</TableCell>
            <TableCell>{report.geradoEm}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

