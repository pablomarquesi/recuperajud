"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileSpreadsheet, FileText, Calendar, Filter } from "lucide-react"
import { EmpresasReport } from "@/components/reports/empresas-report"
import { DuracaoReport } from "@/components/reports/duracao-report"
import { SucessoReport } from "@/components/reports/sucesso-report"

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("mensal")
  const [formato, setFormato] = useState("visualizar")

  const handleExportExcel = (reportType: string) => {
    // Simulação de download Excel
    const link = document.createElement("a")
    link.href = "#"
    link.download = `${reportType}_${periodo}_${new Date().toISOString().split("T")[0]}.xlsx`

    // Simular download
    setTimeout(() => {
      alert(`Relatório ${reportType} exportado para Excel com sucesso!`)
    }, 1000)
  }

  const handleExportPDF = (reportType: string) => {
    // Simulação de download PDF
    const link = document.createElement("a")
    link.href = "#"
    link.download = `${reportType}_${periodo}_${new Date().toISOString().split("T")[0]}.pdf`

    // Simular download
    setTimeout(() => {
      alert(`Relatório ${reportType} exportado para PDF com sucesso!`)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Geração e visualização de relatórios detalhados do sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            Período: {periodo}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Filter className="h-3 w-3" />
            Atualizado: {new Date().toLocaleDateString("pt-BR")}
          </Badge>
        </div>
      </div>

      {/* Controles de Filtro */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Relatório</CardTitle>
          <CardDescription>Selecione o período e formato para geração dos relatórios</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium">Período</label>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">Formato</label>
            <Select value={formato} onValueChange={setFormato}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visualizar">Visualizar</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios */}
      <Tabs defaultValue="empresas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="empresas">Empresas em RJ</TabsTrigger>
          <TabsTrigger value="duracao">Duração dos Processos</TabsTrigger>
          <TabsTrigger value="sucesso">Estatísticas de Sucesso</TabsTrigger>
        </TabsList>

        <TabsContent value="empresas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Relatório de Empresas em Recuperação Judicial</CardTitle>
                  <CardDescription>
                    Listagem completa das empresas em processo de recuperação judicial - Período: {periodo}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExportExcel("empresas_rj")}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExportPDF("empresas_rj")}>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <EmpresasReport periodo={periodo} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duracao" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Análise de Duração dos Processos</CardTitle>
                  <CardDescription>
                    Análise temporal dos processos de recuperação judicial - Período: {periodo}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExportExcel("duracao_processos")}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExportPDF("duracao_processos")}>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DuracaoReport periodo={periodo} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sucesso" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Estatísticas de Sucesso em Recuperação Judicial</CardTitle>
                  <CardDescription>
                    Análise de taxa de sucesso e resultados dos processos - Período: {periodo}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExportExcel("estatisticas_sucesso")}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExportPDF("estatisticas_sucesso")}>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SucessoReport periodo={periodo} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
