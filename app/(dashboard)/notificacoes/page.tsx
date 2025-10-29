"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Notification {
  id: number
  type: "alert" | "info" | "success"
  title: string
  description: string
  time: string
  read: boolean
}

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "alert",
      title: "Stay period próximo do vencimento",
      description: "O stay period da empresa ABC Ltda expirará em 7 dias. Processo RJ: 001234567.2025.8.11.0000",
      time: "Há 10 minutos",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "Nova recuperação judicial cadastrada",
      description: "XYZ Indústria - CNPJ: 99.888.777/0001-66. Cadastrada em: 01/01/2025",
      time: "Há 2 horas",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Comunicação enviada aos tribunais",
      description: "Comunicação sobre a recuperação judicial da empresa Tech Solutions foi enviada para 5 tribunais.",
      time: "Há 30 minutos",
      read: false,
    },
    {
      id: 4,
      type: "info",
      title: "Atualização do sistema",
      description: "O sistema RecuperaJud foi atualizado para a versão 2.1.0",
      time: "Há 1 dia",
      read: true,
    },
  ])

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
        <Button onClick={markAllAsRead}>Marcar todas como lidas</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as notificações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start space-x-4 rounded-lg border p-4",
                  !notification.read && "bg-blue-50 dark:bg-blue-900/10",
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 h-3 w-3 rounded-full",
                    notification.type === "alert"
                      ? "bg-red-500"
                      : notification.type === "success"
                        ? "bg-green-500"
                        : "bg-blue-500",
                  )}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{notification.title}</p>
                    <Badge variant={notification.read ? "secondary" : "default"}>
                      {notification.read ? "Lida" : "Não lida"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-gray-400">{notification.time}</p>
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        Marcar como lida
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
