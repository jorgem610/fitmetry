import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalculatorLayout } from "@/components/calculator-layout"
import { CalorieCalculator } from "@/components/calorie-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calculadora de Calorias - FitCalc",
  description:
    "Calcula tu gasto calorico diario con la ecuacion de Mifflin-St Jeor. Obten tus calorias de mantenimiento, deficit y superavit.",
}

export default function CaloriasPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <CalculatorLayout
        title="Calculadora de Calorias"
        description="Calcula tu gasto energetico diario total (TDEE) basado en la ecuacion de Mifflin-St Jeor, una de las formulas mas precisas disponibles."
      >
        <CalorieCalculator />
      </CalculatorLayout>
      <div className="flex-1" />
      <Footer />
    </main>
  )
}
