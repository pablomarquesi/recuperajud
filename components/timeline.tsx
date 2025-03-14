import { CheckCircle2, Clock, HelpCircle } from "lucide-react"

interface Etapa {
  id: number
  titulo: string
  data: string
  status: "Concluída" | "Em Andamento" | "Pendente"
  descricao: string
}

interface TimelineProps {
  etapas: Etapa[]
}

export function Timeline({ etapas }: TimelineProps) {
  return (
    <div className="space-y-8">
      {etapas.map((etapa, index) => (
        <div key={etapa.id} className="flex gap-4">
          <div className="relative flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                etapa.status === "Concluída"
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : etapa.status === "Em Andamento"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {etapa.status === "Concluída" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : etapa.status === "Em Andamento" ? (
                <Clock className="h-5 w-5" />
              ) : (
                <HelpCircle className="h-5 w-5" />
              )}
            </div>
            {index < etapas.length - 1 && (
              <div
                className={`h-full w-0.5 ${
                  etapa.status === "Concluída" ? "bg-green-200 dark:bg-green-900/30" : "bg-gray-200 dark:bg-gray-800"
                }`}
              />
            )}
          </div>
          <div className="flex-1 pb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{etapa.titulo}</h3>
              <span
                className={`text-sm ${
                  etapa.status === "Concluída"
                    ? "text-green-600 dark:text-green-400"
                    : etapa.status === "Em Andamento"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {etapa.data}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{etapa.descricao}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

