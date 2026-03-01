import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalculatorLayout } from "@/components/calculator-layout"
import { OneRMCalculator } from "@/components/one-rm-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calculadora de 1RM - FitCalc",
  description:
    "Estima tu repeticion maxima con la formula de Epley. Incluye tabla de porcentajes para planificar tu entrenamiento de fuerza.",
}

export default function OneRMPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <CalculatorLayout
        title="Calculadora de 1RM"
        description="Estima tu repeticion maxima (1RM) a partir de un peso y las repeticiones completadas. Ideal para planificar tu progresion de fuerza."
      >
        <OneRMCalculator />
      </CalculatorLayout>
      <div className="flex-1" />
      <Footer />
    </main>
  )
}
