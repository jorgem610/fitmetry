import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalculatorLayout } from "@/components/calculator-layout"
import { MacrosCalculator } from "@/components/macros-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calculadora de Macros - FITMETRIC",
  description:
    "Calcula gratis tu distribución de macronutrientes. Proteínas, carbohidratos y grasas según tu objetivo: pérdida de grasa, mantenimiento o ganancia muscular.",
  keywords: "calculadora macros, macronutrientes, proteinas carbohidratos grasas, distribucion macros fitness",
  openGraph: {
    title: "Calculadora de Macros - FITMETRIC",
    description: "Calcula gratis tu distribución de macronutrientes según tu objetivo fitness.",
    url: "https://fitmetric-app.vercel.app/macros",
  },
}

export default function MacrosPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <CalculatorLayout
        title="Calculadora de Macros"
        description="Calcula la distribucion optima de proteinas, carbohidratos y grasas segun tu objetivo y calorias diarias."
      >
        <MacrosCalculator />
      </CalculatorLayout>
      <div className="flex-1" />
      <Footer />
    </main>
  )
}
