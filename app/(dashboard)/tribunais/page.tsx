"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, PlusCircle, Search, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

// Dados de exemplo para tribunais - apenas TJMT e TJRO
const tribunais = [
  {
    id: 1,
    nome: "Tribunal de Justiça de Mato Grosso",
    sigla: "TJMT",
    email: "comunicacoes.rj@tjmt.jus.br",
    telefone: "(65) 3617-3000",
    ativo: true,
  },
  {
    id: 2,
    nome: "Tribunal de Justiça de Rondônia",
    sigla: "TJRO",
    email: "rj.comunicacoes@tjro.jus.br",
    telefone: "(69) 3217-1152",
    ativo: true,
  },
]

export default function TribunaisPage() {
  const [filtro, setFiltro] = useState("")
  const [tribunalParaExcluir, setTribunalParaExcluir] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Filtra os tribunais com base no critério
  const tribunaisFiltrados = tribunais.filter(
    (tribunal) =>
      tribunal.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      tribunal.sigla.toLowerCase().includes(filtro.toLowerCase()) ||
      tribunal.email.toLowerCase().includes(filtro.toLowerCase()),
  )

  // Função para confirmar exclusão
  const confirmarExclusao = (id: number) => {
    setTribunalParaExcluir(id)
    setDialogOpen(true)
  }

  // Função para excluir tribunal
  const excluirTribunal = () => {
    // Simulação de exclusão
    console.log(`Excluindo tribunal com ID: ${tribunalParaExcluir}`)
    toast({
      title: "Tribunal excluído",
      description: "O tribunal foi excluído com sucesso.",
    })
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tribunais</h1>
          <p className="text-muted-foreground">Gerenciamento de tribunais para comunicação</p>
        </div>
        <Button asChild>
          <Link href="/tribunais/cadastro">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Tribunal
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="flex items-center border-b p-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, sigla ou email..."
              className="pl-8"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Sigla</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tribunaisFiltrados.length > 0 ? (
                tribunaisFiltrados.map((tribunal) => (
                  <TableRow key={tribunal.id}>
                    <TableCell className="font-medium">{tribunal.nome}</TableCell>
                    <TableCell>{tribunal.sigla}</TableCell>
                    <TableCell>{tribunal.email}</TableCell>
                    <TableCell>{tribunal.telefone}</TableCell>
                    <TableCell>
                      <Badge variant={tribunal.ativo ? "success" : "destructive"}>
                        {tribunal.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                          <Link href={`/tribunais/editar/${tribunal.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => confirmarExclusao(tribunal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum tribunal encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este tribunal? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={excluirTribunal}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

