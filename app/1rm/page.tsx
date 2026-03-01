import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalculatorLayout } from "@/components/calculator-layout"
import { OneRMCalculator } from "@/components/one-rm-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calculadora de 1RM - FITMETRIC",
  description:
    "Calcula gratis tu repetición máxima (1RM) con la fórmula de Epley. Obtén tu tabla de porcentajes para planificar tu entrenamiento de fuerza.",
  keywords: "calculadora 1rm, repeticion maxima, formula epley, porcentajes entrenamiento fuerza",
  openGraph: {
    title: "Calculadora de 1RM - FITMETRIC",
    description: "Calcula gratis tu repetición máxima y obtén tu tabla de porcentajes para entrenar.",
    url: "https://fitmetric-app.vercel.app/1rm",
  },
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
