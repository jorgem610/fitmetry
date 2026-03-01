import { Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-16 sm:pb-16 sm:pt-24">
      {/* Glow effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[400px] w-[600px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">
            Herramientas gratuitas de fitness
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground font-mono sm:text-5xl lg:text-6xl text-balance">
          Calcula. Entrena.{" "}
          <span className="text-primary">Progresa.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Calculadoras de fitness precisas para optimizar tu nutricion y
          entrenamiento. Sin registro, sin complicaciones.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>100% Gratis</span>
          </div>
          <span className="text-border">{"/"}</span>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Sin registro</span>
          </div>
          <span className="text-border">{"/"}</span>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Resultados al instante</span>
          </div>
        </div>
      </div>
    </section>
  )
}
