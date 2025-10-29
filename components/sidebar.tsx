"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Building, Home, Settings, Users, X, Scale, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  isCollapsed: boolean
}

export function Sidebar({ open, setOpen, isCollapsed }: SidebarProps) {
  return (
    <>
      {/* Overlay para mobile */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-900 lg:static",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "w-[4rem]" : "w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-blue-600"></div>
            {!isCollapsed && <span className="text-lg font-bold text-gray-900 dark:text-white">RecuperaJud</span>}
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
            <span className="sr-only">Fechar menu</span>
          </Button>
        </div>

        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2">
            <NavItem href="/dashboard" icon={Home} label="Dashboard" isCollapsed={isCollapsed} />
            <NavItem href="/empresas" icon={Building} label="Empresas em RJ" isCollapsed={isCollapsed} />
            <NavItem href="/tribunais" icon={Scale} label="Tribunais" isCollapsed={isCollapsed} />
            <NavItem href="/usuarios" icon={Users} label="Usuários" isCollapsed={isCollapsed} />
            <NavItem href="/relatorios" icon={FileText} label="Relatórios" isCollapsed={isCollapsed} />
            <NavItem href="/configuracoes" icon={Settings} label="Configurações" isCollapsed={isCollapsed} />
          </ul>
        </nav>

        {!isCollapsed && (
          <div className="border-t p-4 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              RecuperaJud v1.0
              <br />© 2025 Todos os direitos reservados
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  isCollapsed: boolean
}

function NavItem({ href, icon: Icon, label, isCollapsed }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
          isCollapsed && "justify-center",
        )}
      >
        <Icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
        {!isCollapsed && <span>{label}</span>}
      </Link>
    </li>
  )
}
