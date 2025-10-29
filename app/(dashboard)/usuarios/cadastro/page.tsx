"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

// Esquema de validação
const formSchema = z
  .object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    tribunal: z.string().optional(),
    regiao: z.string().optional(),
    permissao: z.string().min(1, "Permissão é obrigatória"),
    cargo: z.string().min(1, "Cargo é obrigatório"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z.string().min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })
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

export default function CadastroUsuarioPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
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
      senha: "",
      confirmarSenha: "",
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
        title: "Usuário cadastrado com sucesso!",
        description: `O usuário ${values.nome} foi cadastrado com sucesso.`,
      })

      // Redireciona para a lista de usuários
      router.push("/usuarios")
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error)
      toast({
        title: "Erro ao cadastrar usuário",
        description: "Ocorreu um erro ao cadastrar o usuário. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cadastro de Usuário</h1>
          <p className="text-muted-foreground">Cadastre um novo usuário no sistema</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Usuário</CardTitle>
          <CardDescription>Preencha os dados do novo usuário e defina suas permissões</CardDescription>
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

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
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
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
