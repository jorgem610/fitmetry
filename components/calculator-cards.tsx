import Link from "next/link"
import { Flame, PieChart, Trophy, ArrowRight } from "lucide-react"

const calculators = [
  {
    href: "/calorias",
    icon: Flame,
    title: "Calculadora de Calorias",
    description:
      "Calcula tu gasto calorico diario segun tu peso, altura, edad y nivel de actividad. Obtiene tus calorias de mantenimiento, deficit y superavit.",
    tag: "Nutricion",
  },
  {
    href: "/macros",
    icon: PieChart,
    title: "Calculadora de Macros",
    description:
      "Distribuye tus macronutrientes de forma optima segun tu objetivo: perdida de grasa, mantenimiento o ganancia muscular.",
    tag: "Nutricion",
  },
  {
    href: "/1rm",
    icon: Trophy,
    title: "Calculadora de 1RM",
    description:
      "Estima tu repeticion maxima a partir de un peso y repeticiones realizadas. Incluye porcentajes de trabajo para planificar tu entrenamiento.",
    tag: "Fuerza",
  },
]

export function CalculatorCards() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-card/80"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <calc.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {calc.tag}
              </span>
            </div>

            <h3 className="text-base font-bold text-foreground font-mono">
              {calc.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {calc.description}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
              <span>Calcular ahora</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
