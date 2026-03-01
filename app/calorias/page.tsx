import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalculatorLayout } from "@/components/calculator-layout"
import { CalorieCalculator } from "@/components/calorie-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calculadora de Calorías Diarias - FITMETRIC",
  description:
    "Calcula gratis tu gasto calórico diario con la ecuación Mifflin-St Jeor. Obtén tus calorías de mantenimiento, déficit y superávit según tu nivel de actividad.",
  keywords: "calculadora calorias, gasto calorico diario, TDEE, metabolismo basal, calorias mantenimiento",
  openGraph: {
    title: "Calculadora de Calorías Diarias - FITMETRIC",
    description: "Calcula gratis tu gasto calórico diario. Obtén tus calorías de mantenimiento, déficit y superávit.",
    url: "https://fitmetric-app.vercel.app/calorias",
  },
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
