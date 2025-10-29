"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, ChevronDown, LogOut, Menu, Moon, Settings, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavbarProps {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

interface Notification {
  id: number
  type: "alert" | "info"
  title: string
  description: string
  time: string
}

function NotificationItem({ type, title, description, time }: Notification) {
  return (
    <div className="flex items-start space-x-2 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800">
      <div className={cn("mt-0.5 h-2 w-2 rounded-full", type === "alert" ? "bg-red-500" : "bg-blue-500")} />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        <time className="text-xs text-gray-500 dark:text-gray-400">{time}</time>
      </div>
    </div>
  )
}

export function Navbar({ sidebarOpen, toggleSidebar }: NavbarProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [notificationCount, setNotificationCount] = useState(3)

  const handleLogout = () => {
    // Lógica de logout
    router.push("/login")
  }

  const notifications: Notification[] = [
    {
      id: 1,
      type: "alert",
      title: "Stay period próximo do vencimento",
      description: "O stay period da empresa ABC Ltda expirará em 7 dias. Processo RJ: 001234567.2025.8.11.0000",
      time: "Há 10 minutos",
    },
    {
      id: 2,
      type: "info",
      title: "Nova recuperação judicial cadastrada",
      description: "XYZ Indústria - CNPJ: 99.888.777/0001-66. Cadastrada em: 01/01/2025",
      time: "Há 2 horas",
    },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="ml-auto flex items-center space-x-2">
        {/* Botão de tema */}
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Alternar tema</span>
        </Button>

        {/* Notificações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                  variant="destructive"
                >
                  {notificationCount}
                </Badge>
              )}
              <span className="sr-only">Notificações</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96">
            <div className="flex items-center justify-between p-2">
              <span className="text-sm font-medium">Notificações</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-blue-600 dark:text-blue-400"
                onClick={() => setNotificationCount(0)}
              >
                Marcar todas como lidas
              </Button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-[400px] overflow-auto">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} {...notification} />
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-2 text-center">
              <Link href="/notificacoes" className="text-xs text-blue-600 hover:underline dark:text-blue-400">
                Ver todas as notificações
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Perfil do usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-03-12%20154048-xVKHditX7HbZTwW4dCV4kJCowRR8r8.png"
                  alt="Foto do usuário"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <div className="text-sm font-medium">Admin</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Administrador</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/perfil" className="flex cursor-pointer items-center">
                <User className="mr-2 h-4 w-4" />
                Meu Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/configuracoes" className="flex cursor-pointer items-center">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex cursor-pointer items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
