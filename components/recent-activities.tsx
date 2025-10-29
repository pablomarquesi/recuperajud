"use client"

import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FileText, RefreshCcw, UserCheck } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "status",
    company: "Acme Inc.",
    description: "Status atualizado para 'Em Andamento'",
    date: new Date(2025, 2, 15, 14, 30),
    icon: RefreshCcw,
  },
  {
    id: 2,
    type: "document",
    company: "XYZ Ltda.",
    description: "Novo documento anexado ao processo",
    date: new Date(2025, 2, 15, 10, 15),
    icon: FileText,
  },
  {
    id: 3,
    type: "user",
    company: "ABC S.A.",
    description: "Responsável alterado para Maria Silva",
    date: new Date(2025, 2, 14, 16, 45),
    icon: UserCheck,
  },
  {
    id: 4,
    type: "document",
    company: "Tech Solutions",
    description: "Relatório mensal enviado",
    date: new Date(2025, 2, 14, 9, 20),
    icon: FileText,
  },
  {
    id: 5,
    type: "status",
    company: "Global Industries",
    description: "Status atualizado para 'Concluída'",
    date: new Date(2025, 2, 13, 11, 10),
    icon: RefreshCcw,
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div
            className={`mt-0.5 rounded-full p-1.5 ${
              activity.type === "status"
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                : activity.type === "document"
                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.company}</p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(activity.date, {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
