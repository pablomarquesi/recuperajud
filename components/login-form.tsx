"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export function LoginForm() {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular um pequeno delay para melhor UX
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_RecuperaJUD%20%281%29-mE3Flp0pPxhJdhb87rlN1ePHXigfQj.png"
          alt="RecuperaJUD"
          width={400}
          height={100}
          className="h-auto w-full max-w-sm"
          priority
        />
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usuario" className="text-sm font-medium text-gray-700">
              Usuário
            </Label>
            <Input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="h-11"
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="h-11"
              placeholder="Digite sua senha"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-[#1B3B5F] hover:bg-[#152e4a] text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  )
}
