"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  Scale,
  Phone,
  Mail,
  Globe,
  Gavel,
  UserCheck,
  Calendar,
  MapPin,
  FileText,
  Edit,
  ArrowLeft,
  Users,
} from "lucide-react"
import { Timeline } from "@/components/timeline"
import { format, addDays } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Vamos atualizar os dados de exemplo para serem mais realistas
// Substitua a constante empresa por:

const empresa = {
  id: 1,
  nome: "Acme Tecnologia S.A.",
  cnpj: "12.345.678/0001-90",
  endereco: "Av. Paulista, 1000, São Paulo - SP",
  telefone: "(11) 3456-7890",
  email: "contato@acmetecnologia.com.br",
  setor: "Tecnologia",
  fundacao: "2005",
  site: "www.acmetecnologia.com.br",

  // Informações do processo
  numeroProcesso: "1023456-78.2024.8.26.0100",
  tribunal: "Tribunal de Justiça de São Paulo",
  vara: "2ª Vara Empresarial",
  dataDeferimento: "2024-03-15",
  dataPublicacaoEdital: "2024-04-01",
  administradorJudicial: "Silva & Associados",
  status: "Em vigor",
  stayPeriodDias: 180, // Duração padrão
  descricao:
    "Empresa do setor de tecnologia que entrou com pedido de recuperação judicial devido a dificuldades financeiras causadas pela pandemia e alta competitividade no mercado. A empresa possui cerca de 300 funcionários e atua no desenvolvimento de software para o setor financeiro.",

  etapas: [
    {
      id: 1,
      titulo: "Petição Inicial",
      data: "15/03/2024",
      status: "Concluída",
      descricao: "Protocolo da petição inicial com pedido de recuperação judicial",
    },
    {
      id: 2,
      titulo: "Deferimento do Processamento",
      data: "30/03/2024",
      status: "Concluída",
      descricao: "Decisão judicial que deferiu o processamento da recuperação judicial",
    },
    {
      id: 3,
      titulo: "Publicação do Edital",
      data: "15/04/2024",
      status: "Concluída",
      descricao: "Publicação do edital contendo o resumo do pedido e a relação de credores",
    },
    {
      id: 4,
      titulo: "Apresentação do Plano de Recuperação",
      data: "14/06/2024",
      status: "Em Andamento",
      descricao: "Apresentação do plano de recuperação judicial pela empresa",
    },
    {
      id: 5,
      titulo: "Assembleia de Credores",
      data: "Pendente",
      status: "Pendente",
      descricao: "Realização da assembleia geral de credores para aprovação do plano",
    },
    {
      id: 6,
      titulo: "Homologação do Plano",
      data: "Pendente",
      status: "Pendente",
      descricao: "Homologação judicial do plano de recuperação aprovado",
    },
  ],

  // Adicionando sócios
  socios: [
    {
      nome: "João da Silva",
      cpf: "123.456.789-00",
      email: "joao.silva@exemplo.com",
      telefone: "(11) 98765-4321",
      cargo: "Diretor Presidente",
    },
    {
      nome: "Maria Oliveira",
      cpf: "987.654.321-00",
      email: "maria.oliveira@exemplo.com",
      telefone: "(11) 91234-5678",
      cargo: "Diretora Financeira",
    },
  ],
}

export default function DetalhesEmpresaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [diasRestantes, setDiasRestantes] = useState(0)
  const [fimStayPeriod, setFimStayPeriod] = useState("")
  const [diasPassados, setDiasPassados] = useState(0)

  // Atualize a função useEffect para calcular o stay period de forma mais realista
  useEffect(() => {
    const calcularStayPeriod = () => {
      // Dados simulados para o stay period
      const dataDeferimento = new Date(empresa.dataDeferimento)
      const fimStayPeriod = addDays(dataDeferimento, empresa.stayPeriodDias)

      // Simulação de dias restantes (valor fixo para demonstração)
      const diasRestantesSimulados = 87

      // Dias já passados no stay period
      const diasPassadosSimulados = empresa.stayPeriodDias - diasRestantesSimulados

      setDiasRestantes(diasRestantesSimulados)
      setDiasPassados(diasPassadosSimulados)
      setFimStayPeriod(format(fimStayPeriod, "dd/MM/yyyy"))
    }

    calcularStayPeriod()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{empresa.nome}</h1>
            <Badge
              variant={
                empresa.status === "Em vigor" ? "success" : empresa.status === "Expirado" ? "destructive" : "warning"
              }
            >
              {empresa.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Detalhes da empresa em recuperação judicial</p>
        </div>
        <Button asChild>
          <Link href={`/empresas/editar/${params.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </Button>
      </div>

      {/* Descrição - Movida para cima */}
      <Card>
        <CardHeader>
          <CardTitle>Descrição</CardTitle>
          <CardDescription>Detalhes sobre o processo</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{empresa.descricao}</p>
        </CardContent>
      </Card>

      {/* Stay Period - Melhorado visualmente */}
      <Card>
        <CardHeader>
          <CardTitle>Stay Period</CardTitle>
          <CardDescription>Contagem regressiva do período de suspensão</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">{diasRestantes} dias restantes</p>
              <p className="text-sm text-muted-foreground">Término previsto: {fimStayPeriod}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Data de Deferimento: {format(new Date(empresa.dataDeferimento), "dd/MM/yyyy")}</p>
              <p className="text-sm text-muted-foreground">Duração total: {empresa.stayPeriodDias} dias</p>
            </div>
          </div>

          {/* Visualização gráfica do progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso: {Math.round((diasPassados / empresa.stayPeriodDias) * 100)}%</span>
              <span>{diasPassados} dias decorridos</span>
            </div>
            <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div
                className={`h-4 rounded-full ${
                  diasRestantes > empresa.stayPeriodDias * 0.5
                    ? "bg-green-500"
                    : diasRestantes > empresa.stayPeriodDias * 0.25
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(100, (diasPassados / empresa.stayPeriodDias) * 100)}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Timeline visual */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium mb-4">Linha do Tempo</h4>
            <div className="relative">
              {/* Linha do tempo */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>

              {/* Início */}
              <div className="relative flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                  {/* Início */}
                  <div className="flex flex-col items-center">
                    <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs">1</span>
                    </div>
                    <p className="mt-1 text-xs">Início</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(empresa.dataDeferimento), "dd/MM/yyyy")}
                    </p>
                  </div>

                  {/* Atual */}
                  <div className="flex flex-col items-center">
                    <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-white">
                      <span className="text-xs">2</span>
                    </div>
                    <p className="mt-1 text-xs">Atual</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(), "dd/MM/yyyy")}</p>
                  </div>

                  {/* Término */}
                  <div className="flex flex-col items-center">
                    <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      <span className="text-xs">3</span>
                    </div>
                    <p className="mt-1 text-xs">Término</p>
                    <p className="text-xs text-muted-foreground">{fimStayPeriod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas adicionais */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="rounded-lg border p-3 text-center">
              <p className="text-2xl font-bold text-green-500">{diasPassados}</p>
              <p className="text-xs text-muted-foreground">Dias Decorridos</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <p className="text-2xl font-bold text-blue-500">{diasRestantes}</p>
              <p className="text-xs text-muted-foreground">Dias Restantes</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <p className="text-2xl font-bold">{empresa.stayPeriodDias}</p>
              <p className="text-xs text-muted-foreground">Total de Dias</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informações da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
            <CardDescription>Dados cadastrais da empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <Building className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Nome da Empresa</p>
                <p className="text-sm text-muted-foreground">{empresa.nome}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">CNPJ</p>
                <p className="text-sm text-muted-foreground">{empresa.cnpj}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Endereço</p>
                <p className="text-sm text-muted-foreground">{empresa.endereco}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Telefone</p>
                <p className="text-sm text-muted-foreground">{empresa.telefone}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{empresa.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Site</p>
                <p className="text-sm text-muted-foreground">{empresa.site}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações do Processo */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Processo</CardTitle>
            <CardDescription>Dados do processo de recuperação judicial</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Nº do Processo</p>
                <p className="text-sm text-muted-foreground">{empresa.numeroProcesso}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Scale className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Tribunal</p>
                <p className="text-sm text-muted-foreground">{empresa.tribunal}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Gavel className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Vara Judicial</p>
                <p className="text-sm text-muted-foreground">{empresa.vara}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Data de Deferimento</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(empresa.dataDeferimento), "dd/MM/yyyy")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Data de Publicação do Edital</p>
                <p className="text-sm text-muted-foreground">{empresa.dataPublicacaoEdital}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <UserCheck className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Administrador Judicial</p>
                <p className="text-sm text-muted-foreground">{empresa.administradorJudicial}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sócios da Empresa */}
      <Card>
        <CardHeader>
          <CardTitle>Sócios da Empresa</CardTitle>
          <CardDescription>Quadro societário da empresa em recuperação judicial</CardDescription>
        </CardHeader>
        <CardContent>
          {empresa.socios && empresa.socios.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Cargo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empresa.socios.map((socio, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{socio.nome}</TableCell>
                    <TableCell>{socio.cpf}</TableCell>
                    <TableCell>{socio.email}</TableCell>
                    <TableCell>{socio.telefone}</TableCell>
                    <TableCell>{socio.cargo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">Nenhum sócio cadastrado</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Esta empresa não possui sócios cadastrados no sistema.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Etapas do Processo */}
      <Card>
        <CardHeader>
          <CardTitle>Etapas do Processo</CardTitle>
          <CardDescription>Acompanhamento das etapas da recuperação judicial</CardDescription>
        </CardHeader>
        <CardContent>
          <Timeline etapas={empresa.etapas} />
        </CardContent>
      </Card>
    </div>
  )
}

