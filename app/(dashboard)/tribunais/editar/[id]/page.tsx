"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Esquema de validação
const formSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  sigla: z.string().min(2, "A sigla deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  ativo: z.boolean().default(true),

  // Tipo de integração para notificações
  tipoIntegracao: z.enum(["api", "webhook", "filas", "mni", "nenhum"]),

  // Campos para API
  enderecoApi: z.string().optional(),
  chaveApi: z.string().optional(),

  // Campos para Webhook
  urlWebhook: z.string().optional(),
  secretWebhook: z.string().optional(),

  // Campos para Filas
  servidorFila: z.string().optional(),
  portaFila: z.string().optional(),
  usuarioFila: z.string().optional(),
  senhaFila: z.string().optional(),
  nomeFila: z.string().optional(),

  // Campos para MNI
  urlMni: z.string().optional(),
  certificadoMni: z.string().optional(),
  senhaCertificado: z.string().optional(),
  versaoMni: z.string().optional(),

  // Integração para consulta de processos
  sistemaJudicial: z.string().optional(),
  integracaoConsultaAtiva: z.boolean().default(false),
  urlConsulta: z.string().optional(),
  chaveConsulta: z.string().optional(),
  usuarioConsulta: z.string().optional(),
  senhaConsulta: z.string().optional(),
  autoSync: z.boolean().default(false),
  syncInterval: z.number().optional(),
})

// Dados simulados para o tribunal
const tribunalSimulado = {
  id: 1,
  nome: "Tribunal de Justiça de São Paulo",
  sigla: "TJSP",
  email: "comunicacoes.rj@tjsp.jus.br",
  telefone: "(11) 3123-4567",
  ativo: true,
  tipoIntegracao: "api",
  enderecoApi: "https://api.tjsp.jus.br/comunicacoes",
  chaveApi: "chave-secreta-api",
}

export default function EditarTribunalPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [tipoIntegracao, setTipoIntegracao] = useState<string>("nenhum")
  const [sistemaJudicial, setSistemaJudicial] = useState<string>("")
  const [integracaoConsultaAtiva, setIntegracaoConsultaAtiva] = useState(false)

  // Inicializa o formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      sigla: "",
      email: "",
      telefone: "",
      ativo: true,
      tipoIntegracao: "nenhum",
      enderecoApi: "",
      chaveApi: "",
      urlWebhook: "",
      secretWebhook: "",
      servidorFila: "",
      portaFila: "",
      usuarioFila: "",
      senhaFila: "",
      nomeFila: "",
      urlMni: "",
      certificadoMni: "",
      senhaCertificado: "",
      versaoMni: "",
      // Novos campos para integração de consulta
      sistemaJudicial: "",
      integracaoConsultaAtiva: false,
      urlConsulta: "",
      chaveConsulta: "",
      usuarioConsulta: "",
      senhaConsulta: "",
      autoSync: false,
      syncInterval: 6,
    },
  })

  // Carrega os dados do tribunal
  useEffect(() => {
    const carregarTribunal = async () => {
      try {
        // Simulação de busca na API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Em um cenário real, você buscaria os dados do tribunal pelo ID
        // const response = await fetch(`/api/tribunais/${params.id}`)
        // const data = await response.json()

        // Usando dados simulados para demonstração
        const data = {
          ...tribunalSimulado,
          // Adicionando dados simulados para a integração de consulta
          sistemaJudicial: "PJe",
          integracaoConsultaAtiva: true,
          urlConsulta: "https://api.pje.jus.br/v1",
          chaveConsulta: "chave-secreta-consulta",
          usuarioConsulta: "usuario-consulta",
          senhaConsulta: "senha-consulta",
          autoSync: true,
          syncInterval: 12,
        }

        // Atualiza o estado do tipo de integração
        setTipoIntegracao(data.tipoIntegracao)
        setSistemaJudicial(data.sistemaJudicial || "")
        setIntegracaoConsultaAtiva(data.integracaoConsultaAtiva || false)

        // Preenche o formulário com os dados do tribunal
        form.reset({
          nome: data.nome,
          sigla: data.sigla,
          email: data.email,
          telefone: data.telefone,
          ativo: data.ativo,
          tipoIntegracao: data.tipoIntegracao as any,
          enderecoApi: data.enderecoApi || "",
          chaveApi: data.chaveApi || "",
          urlWebhook: data.urlWebhook || "",
          secretWebhook: data.secretWebhook || "",
          servidorFila: data.servidorFila || "",
          portaFila: data.portaFila || "",
          usuarioFila: data.usuarioFila || "",
          senhaFila: data.senhaFila || "",
          nomeFila: data.nomeFila || "",
          urlMni: data.urlMni || "",
          certificadoMni: data.certificadoMni || "",
          senhaCertificado: data.senhaCertificado || "",
          versaoMni: data.versaoMni || "",
          // Novos campos para integração de consulta
          sistemaJudicial: data.sistemaJudicial || "",
          integracaoConsultaAtiva: data.integracaoConsultaAtiva || false,
          urlConsulta: data.urlConsulta || "",
          chaveConsulta: data.chaveConsulta || "",
          usuarioConsulta: data.usuarioConsulta || "",
          senhaConsulta: data.senhaConsulta || "",
          autoSync: data.autoSync || false,
          syncInterval: data.syncInterval || 6,
        })
      } catch (error) {
        console.error("Erro ao carregar tribunal:", error)
        toast({
          title: "Erro ao carregar tribunal",
          description: "Ocorreu um erro ao carregar os dados do tribunal. Tente novamente.",
          variant: "destructive",
        })
        router.push("/tribunais")
      } finally {
        setIsLoading(false)
      }
    }

    carregarTribunal()
  }, [params.id, router, form])

  // Função para lidar com o envio do formulário
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Dados do formulário:", values)

      toast({
        title: "Tribunal atualizado com sucesso!",
        description: `O tribunal ${values.nome} foi atualizado com sucesso.`,
      })

      // Redireciona para a lista de tribunais
      router.push("/tribunais")
    } catch (error) {
      console.error("Erro ao atualizar tribunal:", error)
      toast({
        title: "Erro ao atualizar tribunal",
        description: "Ocorreu um erro ao atualizar o tribunal. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Atualiza o estado quando o tipo de integração muda
  const handleTipoIntegracaoChange = (value: string) => {
    setTipoIntegracao(value)
    form.setValue("tipoIntegracao", value as any)
  }

  const handleSistemaJudicialChange = (value: string) => {
    setSistemaJudicial(value)
    form.setValue("sistemaJudicial", value)
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Carregando dados do tribunal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Tribunal</h1>
          <p className="text-muted-foreground">Atualize os dados do tribunal</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Tribunal</CardTitle>
          <CardDescription>Atualize os dados do tribunal para comunicação de recuperações judiciais</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Tribunal</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Tribunal de Justiça de São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sigla"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sigla</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: TJSP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email para Comunicação</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@tribunal.jus.br" {...field} />
                      </FormControl>
                      <FormDescription>Email para onde serão enviadas as comunicações</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              </div>

              <FormField
                control={form.control}
                name="ativo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Ativo</FormLabel>
                      <FormDescription>Ative para enviar comunicações para este tribunal</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Método de Integração</h3>
                <FormField
                  control={form.control}
                  name="tipoIntegracao"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={handleTipoIntegracaoChange}
                          className="flex flex-wrap gap-4"
                        >
                          <FormItem className="flex flex-col items-center space-x-0 space-y-2 rounded-md border p-4 w-[140px]">
                            <FormControl>
                              <RadioGroupItem value="api" className="sr-only" />
                            </FormControl>
                            <div
                              className={`rounded-full p-2 ${tipoIntegracao === "api" ? "bg-primary/10" : "bg-muted"}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={tipoIntegracao === "api" ? "text-primary" : "text-muted-foreground"}
                              >
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                              </svg>
                            </div>
                            <FormLabel className={tipoIntegracao === "api" ? "font-bold" : ""}>API</FormLabel>
                            <FormDescription className="text-center text-xs">Integração via API REST</FormDescription>
                          </FormItem>

                          <FormItem className="flex flex-col items-center space-x-0 space-y-2 rounded-md border p-4 w-[140px]">
                            <FormControl>
                              <RadioGroupItem value="webhook" className="sr-only" />
                            </FormControl>
                            <div
                              className={`rounded-full p-2 ${tipoIntegracao === "webhook" ? "bg-primary/10" : "bg-muted"}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={tipoIntegracao === "webhook" ? "text-primary" : "text-muted-foreground"}
                              >
                                <path d="m22 9-10 13L2 9l10-5 10 5Z"></path>
                                <path d="M12 22V12"></path>
                                <path d="m2 9 10 3 10-3"></path>
                              </svg>
                            </div>
                            <FormLabel className={tipoIntegracao === "webhook" ? "font-bold" : ""}>Webhook</FormLabel>
                            <FormDescription className="text-center text-xs">
                              Receba notificações via webhook
                            </FormDescription>
                          </FormItem>

                          <FormItem className="flex flex-col items-center space-x-0 space-y-2 rounded-md border p-4 w-[140px]">
                            <FormControl>
                              <RadioGroupItem value="filas" className="sr-only" />
                            </FormControl>
                            <div
                              className={`rounded-full p-2 ${tipoIntegracao === "filas" ? "bg-primary/10" : "bg-muted"}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={tipoIntegracao === "filas" ? "text-primary" : "text-muted-foreground"}
                              >
                                <rect width="6" height="16" x="4" y="4" rx="2"></rect>
                                <rect width="6" height="9" x="14" y="11" rx="2"></rect>
                                <path d="M22 11h-2"></path>
                                <path d="M20 16h-2"></path>
                                <path d="M20 6h-2"></path>
                              </svg>
                            </div>
                            <FormLabel className={tipoIntegracao === "filas" ? "font-bold" : ""}>Filas</FormLabel>
                            <FormDescription className="text-center text-xs">
                              Integração via filas de mensagens
                            </FormDescription>
                          </FormItem>

                          <FormItem className="flex flex-col items-center space-x-0 space-y-2 rounded-md border p-4 w-[140px]">
                            <FormControl>
                              <RadioGroupItem value="mni" className="sr-only" />
                            </FormControl>
                            <div
                              className={`rounded-full p-2 ${tipoIntegracao === "mni" ? "bg-primary/10" : "bg-muted"}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={tipoIntegracao === "mni" ? "text-primary" : "text-muted-foreground"}
                              >
                                <path d="M21 7v6h-6"></path>
                                <path d="M3 17v-6h6"></path>
                                <path d="m8 16 4-8 4 8"></path>
                              </svg>
                            </div>
                            <FormLabel className={tipoIntegracao === "mni" ? "font-bold" : ""}>MNI</FormLabel>
                            <FormDescription className="text-center text-xs">
                              Modelo Nacional de Interoperabilidade
                            </FormDescription>
                          </FormItem>

                          <FormItem className="flex flex-col items-center space-x-0 space-y-2 rounded-md border p-4 w-[140px]">
                            <FormControl>
                              <RadioGroupItem value="nenhum" className="sr-only" />
                            </FormControl>
                            <div
                              className={`rounded-full p-2 ${tipoIntegracao === "nenhum" ? "bg-primary/10" : "bg-muted"}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={tipoIntegracao === "nenhum" ? "text-primary" : "text-muted-foreground"}
                              >
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                              </svg>
                            </div>
                            <FormLabel className={tipoIntegracao === "nenhum" ? "font-bold" : ""}>Nenhum</FormLabel>
                            <FormDescription className="text-center text-xs">Sem integração automática</FormDescription>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {tipoIntegracao === "api" && (
                <div className="mt-4 space-y-4 rounded-md border p-4 max-w-full overflow-hidden">
                  <h4 className="font-medium">Configuração da API</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="enderecoApi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço da API</FormLabel>
                          <FormControl>
                            <Input placeholder="https://api.tribunal.jus.br/comunicacoes" {...field} />
                          </FormControl>
                          <FormDescription>URL da API para integração direta</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="chaveApi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chave da API</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Chave de acesso à API" {...field} />
                          </FormControl>
                          <FormDescription>Chave de autenticação para a API</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {tipoIntegracao === "webhook" && (
                <div className="mt-4 space-y-4 rounded-md border p-4 max-w-full overflow-hidden">
                  <h4 className="font-medium">Configuração do Webhook</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="urlWebhook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL do Webhook</FormLabel>
                          <FormControl>
                            <Input placeholder="https://webhook.tribunal.jus.br/receber" {...field} />
                          </FormControl>
                          <FormDescription>Endereço para envio das notificações</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="secretWebhook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secret do Webhook</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Chave secreta para assinatura" {...field} />
                          </FormControl>
                          <FormDescription>Chave para validar a autenticidade das requisições</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {tipoIntegracao === "filas" && (
                <div className="mt-4 space-y-4 rounded-md border p-4 max-w-full overflow-hidden">
                  <h4 className="font-medium">Configuração de Filas</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="servidorFila"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Servidor</FormLabel>
                          <FormControl>
                            <Input placeholder="mq.tribunal.jus.br" {...field} />
                          </FormControl>
                          <FormDescription>Endereço do servidor de filas</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="portaFila"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Porta</FormLabel>
                          <FormControl>
                            <Input placeholder="5672" {...field} />
                          </FormControl>
                          <FormDescription>Porta de conexão</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="usuarioFila"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Usuário</FormLabel>
                          <FormControl>
                            <Input placeholder="usuario" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="senhaFila"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="senha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="nomeFila"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Fila</FormLabel>
                        <FormControl>
                          <Input placeholder="comunicacoes.rj" {...field} />
                        </FormControl>
                        <FormDescription>Nome da fila para envio das mensagens</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {tipoIntegracao === "mni" && (
                <div className="mt-4 space-y-4 rounded-md border p-4 max-w-full overflow-hidden">
                  <h4 className="font-medium">Configuração do MNI</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="urlMni"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL do Serviço MNI</FormLabel>
                          <FormControl>
                            <Input placeholder="https://mni.tribunal.jus.br/servico" {...field} />
                          </FormControl>
                          <FormDescription>Endereço do serviço MNI</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="versaoMni"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Versão do MNI</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a versão" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1.0">1.0</SelectItem>
                              <SelectItem value="2.0">2.0</SelectItem>
                              <SelectItem value="3.0">3.0</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Versão do protocolo MNI</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="certificadoMni"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificado Digital</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Cole o conteúdo do certificado digital em formato PEM"
                            className="font-mono text-xs"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Certificado digital para autenticação no serviço MNI</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="senhaCertificado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha do Certificado</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Senha do certificado digital" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Seção de Integração para Consulta de Processos */}
              <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-medium">Integração para Consulta de Processos</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Configure como o sistema irá consultar processos neste tribunal
                </p>

                <FormField
                  control={form.control}
                  name="integracaoConsultaAtiva"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Ativar Integração para Consulta</FormLabel>
                        <FormDescription>
                          Habilite a integração para consulta automática de processos neste tribunal
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                            setIntegracaoConsultaAtiva(checked)
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {integracaoConsultaAtiva && (
                  <div className="mt-4 space-y-4">
                    <FormField
                      control={form.control}
                      name="sistemaJudicial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sistema Judicial</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value)
                              handleSistemaJudicialChange(value)
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o sistema judicial" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="PJe">PJe - Processo Judicial Eletrônico</SelectItem>
                              <SelectItem value="Projudi">Projudi - Processo Judicial Digital</SelectItem>
                              <SelectItem value="Eproc">Eproc - Processo Eletrônico</SelectItem>
                              <SelectItem value="e-SAJ">e-SAJ - Sistema de Automação da Justiça</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Selecione o sistema judicial para configurar a integração</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {sistemaJudicial && (
                      <div className="rounded-md border p-4 space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="urlConsulta"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>URL da API de Consulta</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={`https://api.${sistemaJudicial.toLowerCase()}.jus.br/v1`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Endereço da API do {sistemaJudicial} para consulta de processos
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="chaveConsulta"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Chave da API</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Chave de acesso à API" {...field} />
                                </FormControl>
                                <FormDescription>Chave de autenticação para a API do {sistemaJudicial}</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="usuarioConsulta"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Usuário do {sistemaJudicial}</FormLabel>
                                <FormControl>
                                  <Input placeholder="Usuário de acesso" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Nome de usuário para autenticação no {sistemaJudicial}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="senhaConsulta"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Senha do {sistemaJudicial}</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Senha de acesso" {...field} />
                                </FormControl>
                                <FormDescription>Senha para autenticação no {sistemaJudicial}</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="autoSync"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Sincronização Automática</FormLabel>
                                <FormDescription>
                                  Sincronize automaticamente os dados com o {sistemaJudicial} nos intervalos definidos
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {form.watch("autoSync") && (
                          <FormField
                            control={form.control}
                            name="syncInterval"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Intervalo de Sincronização (horas)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Define o intervalo em horas para sincronização automática com o {sistemaJudicial}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

