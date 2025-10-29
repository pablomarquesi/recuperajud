"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, CheckCircle2, Clock, FileText } from "lucide-react"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivities } from "@/components/recent-activities"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnalysisCharts } from "@/components/analysis-charts"
import { ReportList } from "@/components/report-list"
import Link from "next/link"

export default function DashboardPage() {
  const [reportPeriod, setReportPeriod] = useState("mensal")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das empresas em recuperação judicial</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">+6 empresas no último mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Vigor</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">62</div>
                <p className="text-xs text-muted-foreground">48% do total de empresas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prorrogados</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">43</div>
                <p className="text-xs text-muted-foreground">34% do total de empresas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expirados</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">18% do total de empresas</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Empresas por Status</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] pt-4">
                <DashboardCharts />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>Últimas atualizações nos processos</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Dados</CardTitle>
              <CardDescription>Insights sobre os processos de recuperação judicial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Duração Média dos Processos</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <AnalysisCharts type="duration" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Taxa de Sucesso</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <AnalysisCharts type="success-rate" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Setores mais Afetados</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <AnalysisCharts type="sectors" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tendência de Novos Casos</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <AnalysisCharts type="trend" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Relatórios</CardTitle>
                  <CardDescription>Geração e visualização de relatórios detalhados</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={reportPeriod} onValueChange={setReportPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensal">Mensal</SelectItem>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                      <SelectItem value="anual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button asChild>
                    <Link href="/dashboard/relatorios">Ver Todos os Relatórios</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ReportList period={reportPeriod} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
