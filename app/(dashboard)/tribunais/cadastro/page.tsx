"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Esquema de validação
const formSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  sigla: z.string().min(2, "A sigla deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  ativo: z.boolean().default(true),

  // Notificações
  notificacoesAtivas: z.boolean().default(false),

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
  integracaoConsultaAtiva: z.boolean().default(false),
  sistemaJudicial: z.string().optional(),
  urlConsulta: z.string().optional(),
  chaveConsulta: z.string().optional(),
  usuarioConsulta: z.string().optional(),
  senhaConsulta: z.string().optional(),
})

export default function CadastroTribunalPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tipoIntegracao, setTipoIntegracao] = useState<string>("nenhum")
  const [sistemaJudicial, setSistemaJudicial] = useState<string>("")
  const [integracaoConsultaAtiva, setIntegracaoConsultaAtiva] = useState(false)
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false)
  const [activeTab, setActiveTab] = useState("informacoes")

  // Inicializa o formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      sigla: "",
      email: "",
      telefone: "",
      ativo: true,
      notificacoesAtivas: false,
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
      // Campos para integração de consulta
      integracaoConsultaAtiva: false,
      sistemaJudicial: "",
      urlConsulta: "",
      chaveConsulta: "",
      usuarioConsulta: "",
      senhaConsulta: "",
    },
  })

  // Função para lidar com o envio do formulário
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Dados do formulário:", values)

      toast({
        title: "Tribunal cadastrado com sucesso!",
        description: `O tribunal ${values.nome} foi cadastrado com sucesso.`,
      })

      // Redireciona para a lista de tribunais
      router.push("/tribunais")
    } catch (error) {
      console.error("Erro ao cadastrar tribunal:", error)
      toast({
        title: "Erro ao cadastrar tribunal",
        description: "Ocorreu um erro ao cadastrar o tribunal. Tente novamente.",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cadastro de Tribunal</h1>
          <p className="text-muted-foreground">Cadastre um novo tribunal para comunicação</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 overflow-visible">
            <TabsList>
              <TabsTrigger value="informacoes">Informações do Tribunal</TabsTrigger>
              <TabsTrigger value="integracoes">Integrações</TabsTrigger>
            </TabsList>

            {/* Aba de Informações do Tribunal */}
            <TabsContent value="informacoes">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Tribunal</CardTitle>
                  <CardDescription>Preencha os dados básicos do tribunal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Integrações */}
            <TabsContent value="integracoes" className="overflow-visible">
              <div className="space-y-6">
                {/* Seção de Integração para Notificações */}
                <Card>
                  <CardHeader>
                    <CardTitle>Integração para Notificações</CardTitle>
                    <CardDescription>Configure como as notificações serão enviadas para este tribunal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 overflow-visible">
                    <FormField
                      control={form.control}
                      name="notificacoesAtivas"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Ativar Notificações</FormLabel>
                            <FormDescription>
                              Habilite para enviar notificações automáticas para este tribunal
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked)
                                setNotificacoesAtivas(checked)
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {notificacoesAtivas && (
                      <FormField
                        control={form.control}
                        name="tipoIntegracao"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Método de Integração</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value)
                                handleTipoIntegracaoChange(value)
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o método de integração" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="api">API REST</SelectItem>
                                <SelectItem value="webhook">Webhook</SelectItem>
                                <SelectItem value="filas">Filas de Mensagens</SelectItem>
                                <SelectItem value="mni">MNI (Modelo Nacional de Interoperabilidade)</SelectItem>
                                <SelectItem value="nenhum">Nenhum</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Selecione como as notificações serão enviadas para este tribunal
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {notificacoesAtivas && tipoIntegracao === "api" && (
                      <div className="mt-4 space-y-4 rounded-md border p-4 overflow-visible">
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

                    {notificacoesAtivas && tipoIntegracao === "webhook" && (
                      <div className="mt-4 space-y-4 rounded-md border p-4 overflow-visible">
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

                    {notificacoesAtivas && tipoIntegracao === "filas" && (
                      <div className="mt-4 space-y-4 rounded-md border p-4 overflow-visible">
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

                    {notificacoesAtivas && tipoIntegracao === "mni" && (
                      <div className="mt-4 space-y-4 rounded-md border p-4 overflow-visible">
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
                  </CardContent>
                </Card>

                {/* Seção de Integração para Consulta de Processos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Integração para Consulta de Processos</CardTitle>
                    <CardDescription>Configure como o sistema irá consultar processos neste tribunal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 overflow-visible">
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
                    )}

                    {integracaoConsultaAtiva && sistemaJudicial && (
                      <div className="rounded-md border p-4 space-y-4 overflow-visible">
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
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

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
    </div>
  )
}

