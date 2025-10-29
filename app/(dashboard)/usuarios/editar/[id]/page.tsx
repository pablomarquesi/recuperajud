"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Lista de tribunais disponíveis
const tribunais = [
  { id: 1, nome: "Tribunal de Justiça de Mato Grosso" },
  { id: 2, nome: "Tribunal de Justiça de Rondônia" },
]

// Regiões disponíveis
const regioes = [
  { id: 1, nome: "Norte" },
  { id: 2, nome: "Nordeste" },
  { id: 3, nome: "Centro-Oeste" },
  { id: 4, nome: "Sudeste" },
  { id: 5, nome: "Sul" },
]

// Dados de exemplo para simulação
const usuariosData = [
  {
    id: 1,
    nome: "Admin",
    email: "admin@recuperajud.com",
    tribunal: null,
    regiao: null,
    permissao: "Administrador Nacional",
    cargo: "Servidor",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Pablo Marquesi",
    email: "pablo.marquesi@tjmt.jus.br",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    regiao: null,
    permissao: "Administrador Regional",
    cargo: "Magistrado",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Janaina Taques",
    email: "janaina.taques@tjmt.jus.br",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    regiao: null,
    permissao: "Operador",
    cargo: "Servidor",
    status: "Ativo",
  },
  {
    id: 4,
    nome: "Thomás Caetano",
    email: "thomas.caetano@tjmt.jus.br",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    regiao: null,
    permissao: "Operador",
    cargo: "Servidor",
    status: "Ativo",
  },
  {
    id: 5,
    nome: "Joseane Quinto",
    email: "joseane.quinto@tjmt.jus.br",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    regiao: null,
    permissao: "Operador",
    cargo: "Magistrado",
    status: "Ativo",
  },
  {
    id: 6,
    nome: "Vinicius Galhardo",
    email: "vinicius.galhardo@tjmt.jus.br",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    regiao: null,
    permissao: "Operador",
    cargo: "Servidor",
    status: "Ativo",
  },
  {
    id: 7,
    nome: "Carlos Mendes",
    email: "carlos.mendes@tjro.jus.br",
    tribunal: "Tribunal de Justiça de Rondônia",
    regiao: null,
    permissao: "Administrador Regional",
    cargo: "Magistrado",
    status: "Ativo",
  },
  {
    id: 8,
    nome: "Maria Silva",
    email: "maria.silva@recuperajud.com",
    tribunal: null,
    regiao: "Sudeste",
    permissao: "Administrador Regional",
    cargo: "Servidor",
    status: "Ativo",
  },
]

// Esquema de validação
const formSchema = z
  .object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    tribunal: z.string().optional(),
    regiao: z.string().optional(),
    permissao: z.string().min(1, "Permissão é obrigatória"),
    cargo: z.string().min(1, "Cargo é obrigatório"),
    status: z.string().min(1, "Status é obrigatório"),
    alterarSenha: z.boolean().default(false),
    senha: z.string().optional(),
    confirmarSenha: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.alterarSenha) {
        return data.senha && data.senha.length >= 6
      }
      return true
    },
    {
      message: "A senha deve ter pelo menos 6 caracteres",
      path: ["senha"],
    },
  )
  .refine(
    (data) => {
      if (data.alterarSenha) {
        return data.senha === data.confirmarSenha
      }
      return true
    },
    {
      message: "As senhas não coincidem",
      path: ["confirmarSenha"],
    },
  )
  .refine(
    (data) => {
      // Se for administrador regional, deve ter uma região selecionada
      if (data.permissao === "Administrador Regional") {
        return !!data.regiao
      }
      return true
    },
    {
      message: "Selecione uma região para o Administrador Regional",
      path: ["regiao"],
    },
  )
  .refine(
    (data) => {
      // Se for operador, deve ter um tribunal selecionado
      if (data.permissao === "Operador") {
        return !!data.tribunal
      }
      return true
    },
    {
      message: "Selecione um tribunal para este tipo de usuário",
      path: ["tribunal"],
    },
  )

export default function EditarUsuarioPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alterarSenha, setAlterarSenha] = useState(false)
  const [usuario, setUsuario] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPermissao, setSelectedPermissao] = useState("")

  // Inicializa o formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      tribunal: "",
      regiao: "",
      permissao: "",
      cargo: "",
      status: "",
      alterarSenha: false,
      senha: "",
      confirmarSenha: "",
    },
  })

  // Simula a busca do usuário pelo ID
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        // Simulação de busca na API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const id = Number.parseInt(params.id)
        const usuarioEncontrado = usuariosData.find((u) => u.id === id)

        if (usuarioEncontrado) {
          setUsuario(usuarioEncontrado)
          setSelectedPermissao(usuarioEncontrado.permissao)
          form.reset({
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            tribunal: usuarioEncontrado.tribunal || "",
            regiao: usuarioEncontrado.regiao || "",
            permissao: usuarioEncontrado.permissao,
            cargo: usuarioEncontrado.cargo,
            status: usuarioEncontrado.status,
            alterarSenha: false,
            senha: "",
            confirmarSenha: "",
          })
        } else {
          toast({
            title: "Erro",
            description: "Usuário não encontrado",
            variant: "destructive",
          })
          router.push("/usuarios")
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error)
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao buscar os dados do usuário",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsuario()
  }, [params.id, router, form])

  // Função para lidar com o envio do formulário
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Dados do formulário:", values)

      toast({
        title: "Usuário atualizado com sucesso!",
        description: `Os dados do usuário ${values.nome} foram atualizados com sucesso.`,
      })

      // Redireciona para a lista de usuários
      router.push("/usuarios")
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
      toast({
        title: "Erro ao atualizar usuário",
        description: "Ocorreu um erro ao atualizar os dados do usuário. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Atualiza o estado de alterarSenha quando o valor do formulário muda
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "alterarSenha") {
        setAlterarSenha(value.alterarSenha as boolean)
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  // Atualiza o estado quando a permissão muda
  const handlePermissaoChange = (value: string) => {
    setSelectedPermissao(value)
    form.setValue("permissao", value)

    // Limpa o tribunal se for Administrador Nacional ou Regional
    if (value === "Administrador Nacional" || value === "Administrador Regional") {
      form.setValue("tribunal", "")
    }

    // Limpa a região se não for Administrador Regional
    if (value !== "Administrador Regional") {
      form.setValue("regiao", "")
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Usuário</h1>
          <p className="text-muted-foreground">Atualize os dados do usuário</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Usuário</CardTitle>
          <CardDescription>Edite os dados do usuário {usuario?.nome}</CardDescription>
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
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
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
                        <Input type="email" placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Servidor">Servidor</SelectItem>
                        <SelectItem value="Magistrado">Magistrado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Selecione o cargo do usuário</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permissao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permissão</FormLabel>
                    <Select onValueChange={handlePermissaoChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a permissão" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Administrador Nacional">Administrador Nacional</SelectItem>
                        <SelectItem value="Administrador Regional">Administrador Regional</SelectItem>
                        <SelectItem value="Operador">Operador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Define o nível de acesso do usuário no sistema</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedPermissao === "Administrador Regional" && (
                <FormField
                  control={form.control}
                  name="regiao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Região</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a região" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regioes.map((regiao) => (
                            <SelectItem key={regiao.id} value={regiao.nome}>
                              {regiao.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Região que o administrador irá gerenciar</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {selectedPermissao === "Operador" && (
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
                          {tribunais.map((tribunal) => (
                            <SelectItem key={tribunal.id} value={tribunal.nome}>
                              {tribunal.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Tribunal ao qual o usuário está vinculado</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Define se o usuário está ativo ou inativo no sistema</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alterarSenha"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Alterar Senha</FormLabel>
                      <FormDescription>Ative para definir uma nova senha para o usuário</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {alterarSenha && (
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nova Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmarSenha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Nova Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
