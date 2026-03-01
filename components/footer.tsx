import { Dumbbell } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Dumbbell className="h-4 w-4" />
          <span className="text-xs">
            FITMETRIC &mdash; Herramientas de fitness gratuitas
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Los resultados son estimaciones. Consulta a un profesional de la salud.
        </p>
      </div>
    </footer>
  )
}
