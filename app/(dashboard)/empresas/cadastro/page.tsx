"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Loader2, Plus, Trash2, UserPlus, FileText } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Atualizar o esquema de validação
const formSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  endereco: z.string().min(5, "Endereço inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("Email inválido"),
  site: z.string().optional(),
  setor: z.string().min(2, "Setor inválido"),

  // Informações do processo
  numeroProcesso: z.string().min(1, "Número do processo inválido"),
  tribunal: z.string().min(3, "Tribunal inválido"),
  vara: z.string().min(3, "A vara judicial deve ter pelo menos 3 caracteres"),
  dataDeferimento: z.string().min(1, "Data de deferimento é obrigatória"),
  dataPublicacaoEdital: z.string().optional(),
  administradorJudicial: z.string().optional(),
  status: z.string().min(1, "Status é obrigatório"),
  descricao: z.string().optional(),
  stayPeriodDias: z.number().min(1, "O stay period deve ter pelo menos 1 dia"),
})

// Esquema para consulta automática
const consultaSchema = z.object({
  numeroProcessoConsulta: z.string().min(1, "Número do processo é obrigatório"),
})

// Esquema para etapas do processo
const etapaSchema = z.object({
  titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  data: z.string().min(1, "A data é obrigatória"),
  descricao: z.string().optional(),
})

// Esquema para sócios
const socioSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().min(11, "CPF inválido"),
  email: z.string().email("Email inválido").optional(),
  telefone: z.string().optional(),
  cargo: z.string().optional(),
})

// Tipos de etapas disponíveis
const tiposEtapas = [
  { id: "peticao-inicial", titulo: "Petição Inicial" },
  { id: "deferimento-processamento", titulo: "Deferimento do Processamento" },
  { id: "publicacao-edital", titulo: "Publicação do Edital" },
  { id: "apresentacao-plano", titulo: "Apresentação do Plano de Recuperação" },
  { id: "assembleia-credores", titulo: "Assembleia de Credores" },
  { id: "homologacao-plano", titulo: "Homologação do Plano" },
  { id: "encerramento", titulo: "Encerramento da Recuperação" },
  { id: "outro", titulo: "Outra Etapa" },
]

export default function CadastroEmpresaPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("informacoes")
  const [cadastroMode, setCadastroMode] = useState<"manual" | "automatico">("manual")
  const [isConsulting, setIsConsulting] = useState(false)
  const [consultaRealizada, setConsultaRealizada] = useState(false)
  const [etapas, setEtapas] = useState<
    Array<{ id: number; titulo: string; data: string; status: string; descricao: string }>
  >([])
  const [isAddingEtapa, setIsAddingEtapa] = useState(false)

  // Estado para sócios
  const [socios, setSocios] = useState<Array<z.infer<typeof socioSchema>>>([])
  const [isAddingSocio, setIsAddingSocio] = useState(false)

  // Inicializa o formulário principal
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cnpj: "",
      endereco: "",
      telefone: "",
      email: "",
      site: "",
      setor: "",
      numeroProcesso: "",
      tribunal: "",
      vara: "",
      dataDeferimento: "",
      dataPublicacaoEdital: "",
      administradorJudicial: "",
      status: "",
      descricao: "",
      stayPeriodDias: 180, // Valor padrão de 180 dias
    },
  })

  // Inicializa o formulário de consulta
  const consultaForm = useForm<z.infer<typeof consultaSchema>>({
    resolver: zodResolver(consultaSchema),
    defaultValues: {
      numeroProcessoConsulta: "",
    },
  })

  // Inicializa o formulário de etapas
  const etapaForm = useForm<z.infer<typeof etapaSchema>>({
    resolver: zodResolver(etapaSchema),
    defaultValues: {
      titulo: "",
      data: "",
      descricao: "",
    },
  })

  // Inicializa o formulário de sócios
  const socioForm = useForm<z.infer<typeof socioSchema>>({
    resolver: zodResolver(socioSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      cargo: "",
    },
  })

  // Função para lidar com o envio do formulário principal
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Dados do formulário:", values)
      console.log("Etapas do processo:", etapas)
      console.log("Sócios da empresa:", socios)

      toast({
        title: "Empresa cadastrada com sucesso!",
        description: `A empresa ${values.nome} foi cadastrada com sucesso.`,
      })

      // Redireciona para a lista de empresas
      router.push("/empresas")
    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error)
      toast({
        title: "Erro ao cadastrar empresa",
        description: "Ocorreu um erro ao cadastrar a empresa. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Função para lidar com a consulta automática
  const onConsulta = async (values: z.infer<typeof consultaSchema>) => {
    setIsConsulting(true)
    try {
      // Simulação de consulta na API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Dados simulados que seriam retornados pela API
      // Agora funciona com qualquer número digitado no campo
      const dadosSimulados = {
        nome: "Acme Tecnologia S.A.",
        cnpj: "12.345.678/0001-90",
        endereco: "Av. Paulista, 1000, São Paulo - SP",
        telefone: "(11) 3456-7890",
        email: "contato@acmetecnologia.com.br",
        site: "www.acmetecnologia.com.br",
        setor: "Tecnologia",

        numeroProcesso: values.numeroProcessoConsulta,
        tribunal: "Tribunal de Justiça de Mato Grosso",
        vara: "2ª Vara Empresarial",
        dataDeferimento: format(new Date(), "yyyy-MM-dd"),
        dataPublicacaoEdital: format(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
        administradorJudicial: "Silva & Associados",
        status: "Em vigor",
        descricao:
          "Empresa do setor de tecnologia que entrou com pedido de recuperação judicial devido a dificuldades financeiras causadas pela pandemia e alta competitividade no mercado.",
        stayPeriodDias: 180,
      }

      // Preenche o formulário principal com os dados obtidos
      form.reset(dadosSimulados)

      // Etapas simuladas
      const etapasSimuladas = [
        {
          id: 1,
          titulo: "Petição Inicial",
          data: format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
          status: "Concluída",
          descricao: "Protocolo da petição inicial com pedido de recuperação judicial",
        },
        {
          id: 2,
          titulo: "Deferimento do Processamento",
          data: format(new Date(), "yyyy-MM-dd"),
          status: "Concluída",
          descricao: "Decisão judicial que deferiu o processamento da recuperação judicial",
        },
        {
          id: 3,
          titulo: "Publicação do Edital",
          data: format(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
          status: "Em Andamento",
          descricao: "Publicação do edital contendo o resumo do pedido e a relação de credores",
        },
      ]

      setEtapas(etapasSimuladas)

      // Sócios simulados
      const sociosSimulados = [
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
      ]

      setSocios(sociosSimulados)

      toast({
        title: "Consulta realizada com sucesso!",
        description: "Os dados do processo foram preenchidos automaticamente.",
      })

      setConsultaRealizada(true)
    } catch (error) {
      console.error("Erro ao consultar processo:", error)
      toast({
        title: "Erro ao consultar processo",
        description: "Ocorreu um erro ao consultar os dados do processo. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsConsulting(false)
    }
  }

  // Função para adicionar uma nova etapa
  const adicionarEtapa = (data: z.infer<typeof etapaSchema>) => {
    const novaEtapa = {
      id: etapas.length + 1,
      titulo: data.titulo,
      data: data.data,
      status: "Concluída",
      descricao: data.descricao || "",
    }

    setEtapas([...etapas, novaEtapa])
    etapaForm.reset({
      titulo: "",
      data: "",
      descricao: "",
    })
    setIsAddingEtapa(false)

    toast({
      title: "Etapa adicionada",
      description: "A etapa foi adicionada com sucesso.",
    })
  }

  // Função para remover uma etapa
  const removerEtapa = (id: number) => {
    setEtapas(etapas.filter((etapa) => etapa.id !== id))

    toast({
      title: "Etapa removida",
      description: "A etapa foi removida com sucesso.",
    })
  }

  // Função para adicionar um novo sócio
  const adicionarSocio = (data: z.infer<typeof socioSchema>) => {
    setSocios([...socios, data])
    socioForm.reset({
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      cargo: "",
    })
    setIsAddingSocio(false)

    toast({
      title: "Sócio adicionado",
      description: "O sócio foi adicionado com sucesso.",
    })
  }

  // Função para remover um sócio
  const removerSocio = (index: number) => {
    setSocios(socios.filter((_, i) => i !== index))

    toast({
      title: "Sócio removido",
      description: "O sócio foi removido com sucesso.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cadastro de Empresa</h1>
          <p className="text-muted-foreground">Cadastre uma nova empresa em recuperação judicial</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Método de Cadastro</CardTitle>
          <CardDescription>Escolha como deseja cadastrar a empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue="manual"
            value={cadastroMode}
            onValueChange={(value) => setCadastroMode(value as "manual" | "automatico")}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />
              <label htmlFor="manual" className="font-medium cursor-pointer">
                Cadastro Manual
              </label>
              <p className="text-sm text-muted-foreground ml-6">
                Preencha todos os dados da empresa e do processo manualmente.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="automatico" id="automatico" />
              <label htmlFor="automatico" className="font-medium cursor-pointer">
                Cadastro Automático
              </label>
              <p className="text-sm text-muted-foreground ml-6">
                Consulte o número do processo para preencher os dados automaticamente.
              </p>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {cadastroMode === "automatico" && (
        <Card>
          <CardHeader>
            <CardTitle>Consulta de Processo</CardTitle>
            <CardDescription>Informe o número do processo para consulta automática</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...consultaForm}>
              <form onSubmit={consultaForm.handleSubmit(onConsulta)} className="space-y-4">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <FormField
                      control={consultaForm.control}
                      name="numeroProcessoConsulta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do Processo</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite qualquer número para simular" {...field} />
                          </FormControl>
                          <FormDescription>Digite qualquer número para simular a consulta automática</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" disabled={isConsulting}>
                    {isConsulting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Consultando...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Consultar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {(cadastroMode === "manual" || consultaRealizada) && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="informacoes">Informações da Empresa</TabsTrigger>
            <TabsTrigger value="processo">Informações do Processo</TabsTrigger>
            <TabsTrigger value="socios">Sócios</TabsTrigger>
            <TabsTrigger value="etapas">Etapas do Processo</TabsTrigger>
          </TabsList>

          <TabsContent value="informacoes">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>Dados cadastrais da empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Empresa</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome da empresa" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cnpj"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CNPJ</FormLabel>
                            <FormControl>
                              <Input placeholder="00.000.000/0000-00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="endereco"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input placeholder="Endereço completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(00) 0000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@empresa.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="site"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site</FormLabel>
                            <FormControl>
                              <Input placeholder="www.empresa.com.br" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="setor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Setor de Atuação</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Tecnologia, Varejo, Indústria" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processo">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Processo</CardTitle>
                <CardDescription>Dados do processo de recuperação judicial</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="numeroProcesso"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nº do Processo de Recuperação</FormLabel>
                            <FormControl>
                              <Input placeholder="0000000-00.0000.0.00.0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tribunal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tribunal</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tribunal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Tribunal de Justiça de Mato Grosso">
                                  Tribunal de Justiça de Mato Grosso
                                </SelectItem>
                                <SelectItem value="Tribunal de Justiça de Rondônia">
                                  Tribunal de Justiça de Rondônia
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="vara"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vara Judicial Competente</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 2ª Vara Empresarial" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="administradorJudicial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Administrador Judicial</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome do administrador judicial" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="dataDeferimento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Deferimento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dataPublicacaoEdital"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Publicação do Edital</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="stayPeriodDias"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stay Period (dias)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="180"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Duração do período de suspensão em dias (padrão: 180 dias)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Em vigor">Em vigor</SelectItem>
                                <SelectItem value="Prorrogado">Prorrogado</SelectItem>
                                <SelectItem value="Expirado">Expirado</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Informações adicionais sobre o processo"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Descreva detalhes relevantes sobre o processo de recuperação judicial.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="socios">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sócios da Empresa</CardTitle>
                  <CardDescription>Adicione os sócios da empresa em recuperação judicial</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsAddingSocio(true)} disabled={isAddingSocio}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Adicionar Sócio
                </Button>
              </CardHeader>
              <CardContent>
                {isAddingSocio ? (
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle>Novo Sócio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Form {...socioForm}>
                        <form onSubmit={socioForm.handleSubmit(adicionarSocio)} className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={socioForm.control}
                              name="nome"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome Completo</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nome do sócio" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={socioForm.control}
                              name="cpf"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CPF</FormLabel>
                                  <FormControl>
                                    <Input placeholder="000.000.000-00" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={socioForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="email@exemplo.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={socioForm.control}
                              name="telefone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Telefone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(00) 00000-0000" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={socioForm.control}
                            name="cargo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cargo</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ex: Diretor Presidente, Sócio Administrador" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsAddingSocio(false)}>
                              Cancelar
                            </Button>
                            <Button type="submit">Adicionar</Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                ) : socios.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>CPF</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead className="w-[80px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {socios.map((socio, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{socio.nome}</TableCell>
                          <TableCell>{socio.cpf}</TableCell>
                          <TableCell>{socio.email}</TableCell>
                          <TableCell>{socio.telefone}</TableCell>
                          <TableCell>{socio.cargo}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removerSocio(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <UserPlus className="h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">Nenhum sócio cadastrado</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clique no botão "Adicionar Sócio" para começar a cadastrar os sócios da empresa.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="etapas">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Etapas do Processo</CardTitle>
                  <CardDescription>Adicione as etapas do processo de recuperação judicial</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsAddingEtapa(true)} disabled={isAddingEtapa}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Etapa
                </Button>
              </CardHeader>
              <CardContent>
                {isAddingEtapa ? (
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle>Nova Etapa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Form {...etapaForm}>
                        <form onSubmit={etapaForm.handleSubmit(adicionarEtapa)} className="space-y-4">
                          <FormField
                            control={etapaForm.control}
                            name="titulo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Título da Etapa</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value === "outro" ? "" : value)
                                    if (value !== "outro") {
                                      const etapaSelecionada = tiposEtapas.find((e) => e.id === value)
                                      if (etapaSelecionada) {
                                        etapaForm.setValue("titulo", etapaSelecionada.titulo)
                                      }
                                    }
                                  }}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione o tipo de etapa" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {tiposEtapas.map((tipo) => (
                                      <SelectItem key={tipo.id} value={tipo.id}>
                                        {tipo.titulo}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {etapaForm.watch("titulo") === "" && (
                                  <Input
                                    placeholder="Digite o título da etapa"
                                    className="mt-2"
                                    onChange={(e) => etapaForm.setValue("titulo", e.target.value)}
                                  />
                                )}
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={etapaForm.control}
                            name="data"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Data da Etapa</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={etapaForm.control}
                            name="descricao"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Descrição detalhada da etapa"
                                    className="min-h-[80px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsAddingEtapa(false)}>
                              Cancelar
                            </Button>
                            <Button type="submit">Adicionar</Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                ) : etapas.length > 0 ? (
                  <div className="space-y-4">
                    {etapas.map((etapa) => (
                      <div key={etapa.id} className="flex items-start justify-between rounded-lg border p-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">{etapa.titulo}</h4>
                            <Badge variant="outline">{format(new Date(etapa.data), "dd/MM/yyyy")}</Badge>
                          </div>
                          {etapa.descricao && <p className="mt-1 text-sm text-muted-foreground">{etapa.descricao}</p>}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-8 w-8 text-destructive"
                          onClick={() => removerEtapa(etapa.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">Nenhuma etapa cadastrada</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clique no botão "Adicionar Etapa" para começar a cadastrar as etapas do processo.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {(cadastroMode === "manual" || consultaRealizada) && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="button" onClick={() => form.handleSubmit(onSubmit)()} disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      )}
    </div>
  )
}
