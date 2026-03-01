import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface CalculatorLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export function CalculatorLayout({
  title,
  description,
  children,
}: CalculatorLayoutProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono sm:text-3xl text-balance">
          {title}
        </h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {children}
    </div>
  )
}
