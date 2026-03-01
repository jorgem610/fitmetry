import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { CalculatorCards } from "@/components/calculator-cards"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <CalculatorCards />
      <div className="flex-1" />
      <Footer />
    </main>
  )
}
