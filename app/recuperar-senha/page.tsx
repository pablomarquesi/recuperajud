"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      // Simulação de envio de email de recuperação
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError("Ocorreu um erro ao tentar recuperar a senha. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="mr-2 h-10 w-10 rounded-full bg-blue-600"></div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">RecuperaJud</h1>
          </div>
          <h2 className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300">Recuperação de Senha</h2>
        </div>

        {success ? (
          <div className="space-y-4">
            <Alert className="border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Um link para redefinição de senha foi enviado para o seu email.</AlertDescription>
            </Alert>
            <Button asChild className="w-full">
              <Link href="/login">Voltar para o Login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar link de recuperação"}
            </Button>
            <div className="text-center">
              <Link href="/login" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                Voltar para o login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
