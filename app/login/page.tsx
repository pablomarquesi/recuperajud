import { LoginForm } from "@/components/login-form"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-blue-200 opacity-20 blur-3xl dark:bg-blue-800"></div>
        <div className="absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full bg-indigo-200 opacity-20 blur-3xl dark:bg-indigo-800"></div>
      </div>
      <div className="z-10 w-full max-w-md rounded-lg border bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mb-6 flex flex-col items-center">
          <Logo className="mb-4 h-16 w-16" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">RecuperaJud</h1>
          <h2 className="text-center text-sm text-gray-600 dark:text-gray-400">
            Sistema de Gerenciamento de Recuperação Judicial
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
