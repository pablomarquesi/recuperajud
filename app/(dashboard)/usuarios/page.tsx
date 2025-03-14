"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, UserPlus, Edit, Trash, Mail } from "lucide-react"

// Dados de exemplo atualizados para ter apenas os 2 tipos de cargo
const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@example.com",
    cargo: "Magistrado",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    permissao: "Administrador Nacional",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    cargo: "Servidor",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    permissao: "Operador",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro.santos@example.com",
    cargo: "Magistrado",
    tribunal: "Tribunal de Justiça de Rondônia",
    permissao: "Administrador Regional",
    status: "Ativo",
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana.costa@example.com",
    cargo: "Magistrado",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    permissao: "Operador",
    status: "Ativo",
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    email: "carlos.ferreira@example.com",
    cargo: "Servidor",
    tribunal: "Tribunal de Justiça de Rondônia",
    permissao: "Administrador Regional",
    status: "Ativo",
  },
  {
    id: 6,
    nome: "Fernanda Lima",
    email: "fernanda.lima@example.com",
    cargo: "Servidor",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    permissao: "Operador",
    status: "Inativo",
  },
  {
    id: 7,
    nome: "Roberto Alves",
    email: "roberto.alves@example.com",
    cargo: "Servidor",
    tribunal: "Tribunal de Justiça de Rondônia",
    permissao: "Administrador Regional",
    status: "Ativo",
  },
  {
    id: 8,
    nome: "Juliana Martins",
    email: "juliana.martins@example.com",
    cargo: "Magistrado",
    tribunal: "Tribunal de Justiça de Rondônia",
    permissao: "Administrador Nacional",
    status: "Ativo",
  },
  {
    id: 9,
    nome: "Marcos Pereira",
    email: "marcos.pereira@example.com",
    cargo: "Servidor",
    tribunal: "Tribunal de Justiça de Rondônia",
    permissao: "Administrador Regional",
    status: "Inativo",
  },
  {
    id: 10,
    nome: "Luciana Gomes",
    email: "luciana.gomes@example.com",
    cargo: "Magistrado",
    tribunal: "Tribunal de Justiça de Mato Grosso",
    permissao: "Operador",
    status: "Inativo",
  },
]

export default function UsuariosPage() {
  const [filtro, setFiltro] = useState("")

  // Filtra os usuários com base no critério
  const usuariosFiltrados = usuarios.filter((usuario) => {
    return (
      filtro === "" ||
      usuario.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.email.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.cargo.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.tribunal.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.permissao.toLowerCase().includes(filtro.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários do sistema</p>
        </div>
        <Button asChild>
          <Link href="/usuarios/cadastro">
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar usuários..."
            className="pl-8"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Tribunal</DropdownMenuItem>
            <DropdownMenuItem>Permissão</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Tribunal</TableHead>
              <TableHead>Permissão</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.cargo}</TableCell>
                  <TableCell>{usuario.tribunal}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        usuario.permissao === "Administrador Nacional"
                          ? "default"
                          : usuario.permissao === "Administrador Regional"
                            ? "secondary"
                            : "success"
                      }
                    >
                      {usuario.permissao}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={usuario.status === "Ativo" ? "success" : "destructive"}>{usuario.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/usuarios/editar/${usuario.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

