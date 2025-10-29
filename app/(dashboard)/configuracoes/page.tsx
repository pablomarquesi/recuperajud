"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

const configSchema = z.object({
  companyName: z.string().min(2, {
    message: "O nome da empresa deve ter pelo menos 2 caracteres.",
  }),
  defaultTheme: z.enum(["light", "dark", "system"]),
  notificationsEnabled: z.boolean(),
  notificationFrequency: z.enum(["realtime", "daily", "weekly"]),
  autoSaveInterval: z.number().min(1).max(60),
})

const integrationSchema = z.object({
  systemType: z.string().min(1, "Selecione um sistema"),
  enabled: z.boolean(),
  apiUrl: z.string().url("URL inválida").optional(),
  apiKey: z.string().min(10, "Chave da API deve ter pelo menos 10 caracteres").optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  autoSync: z.boolean(),
  syncInterval: z.number().min(1).max(24),
})

type ConfigValues = z.infer<typeof configSchema>
type IntegrationValues = z.infer<typeof integrationSchema>

const defaultConfigValues: Partial<ConfigValues> = {
  companyName: "RecuperaJud",
  defaultTheme: "system",
  notificationsEnabled: true,
  notificationFrequency: "daily",
  autoSaveInterval: 5,
}

const defaultIntegrationValues: Partial<IntegrationValues> = {
  systemType: "",
  enabled: false,
  apiUrl: "",
  apiKey: "",
  username: "",
  password: "",
  autoSync: true,
  syncInterval: 6,
}

export default function ConfiguracoesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("geral")
  const [selectedSystem, setSelectedSystem] = useState<string>("")

  const configForm = useForm<ConfigValues>({
    resolver: zodResolver(configSchema),
    defaultValues: defaultConfigValues,
  })

  const integrationForm = useForm<IntegrationValues>({
    resolver: zodResolver(integrationSchema),
    defaultValues: defaultIntegrationValues,
  })

  function onSubmitConfig(data: ConfigValues) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log(data)
      toast({
        title: "Configurações atualizadas",
        description: "Suas configurações foram salvas com sucesso.",
      })
      setIsLoading(false)
    }, 1000)
  }

  function onSubmitIntegration(data: IntegrationValues) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log(data)
      toast({
        title: `Configurações de integração com ${data.systemType} atualizadas`,
        description: `Suas configurações de integração com o ${data.systemType} foram salvas com sucesso.`,
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleSystemChange = (value: string) => {
    setSelectedSystem(value)
    integrationForm.setValue("systemType", value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da sua aplicação</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="geral">Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Personalize a aparência e o comportamento da aplicação de acordo com suas preferências.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...configForm}>
                <form onSubmit={configForm.handleSubmit(onSubmitConfig)} className="space-y-8">
                  <FormField
                    control={configForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Empresa</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>Este nome será exibido no cabeçalho da aplicação.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={configForm.control}
                    name="defaultTheme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tema Padrão</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um tema" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="light">Claro</SelectItem>
                            <SelectItem value="dark">Escuro</SelectItem>
                            <SelectItem value="system">Sistema</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Escolha o tema padrão para a aplicação.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={configForm.control}
                    name="notificationsEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Notificações</FormLabel>
                          <FormDescription>Receba notificações sobre atualizações importantes.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={configForm.control}
                    name="notificationFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequência de Notificações</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a frequência" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="realtime">Tempo real</SelectItem>
                            <SelectItem value="daily">Diária</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Escolha com que frequência deseja receber notificações.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={configForm.control}
                    name="autoSaveInterval"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intervalo de Auto-salvamento (minutos)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Define o intervalo em minutos para o auto-salvamento de dados.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar configurações"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
