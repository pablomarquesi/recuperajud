"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)

    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md px-4">
        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-6 items-center text-center pb-8">
            <div className="w-full flex justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_RecuperaJUD%20%281%29-mE3Flp0pPxhJdhb87rlN1ePHXigfQj.png"
                alt="RecuperaJud"
                width={300}
                height={80}
                priority
                className="object-contain"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <Button
              onClick={handleLogin}
              className="w-full h-12 bg-[#1B3B5F] hover:bg-[#152d47] text-white font-medium text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar no Sistema"}
            </Button>

            <p className="text-center text-xs text-slate-500 pt-4">
              © 2025 RecuperaJud - Banco de Recuperações Judiciais
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
