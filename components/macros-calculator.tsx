"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ResultCard } from "@/components/result-card"

type Goal = "cut" | "maintain" | "bulk"

const goalLabels: Record<Goal, string> = {
  cut: "Perdida de grasa",
  maintain: "Mantenimiento",
  bulk: "Ganancia muscular",
}

// Protein g/kg, Fat % of calories, rest carbs
const macroProfiles: Record<Goal, { proteinPerKg: number; fatPercent: number }> = {
  cut: { proteinPerKg: 2.2, fatPercent: 0.25 },
  maintain: { proteinPerKg: 1.8, fatPercent: 0.3 },
  bulk: { proteinPerKg: 2.0, fatPercent: 0.25 },
}

interface Results {
  calories: number
  protein: number
  fat: number
  carbs: number
  proteinCal: number
  fatCal: number
  carbsCal: number
}

export function MacrosCalculator() {
  const [weight, setWeight] = useState("")
  const [calories, setCalories] = useState("")
  const [goal, setGoal] = useState<Goal>("maintain")
  const [results, setResults] = useState<Results | null>(null)

  function calculate() {
    const w = parseFloat(weight)
    const cal = parseFloat(calories)
    if (!w || !cal) return

    const profile = macroProfiles[goal]

    const protein = Math.round(w * profile.proteinPerKg)
    const proteinCal = protein * 4

    const fatCal = Math.round(cal * profile.fatPercent)
    const fat = Math.round(fatCal / 9)

    const carbsCal = cal - proteinCal - fatCal
    const carbs = Math.round(carbsCal / 4)

    setResults({
      calories: Math.round(cal),
      protein,
      fat,
      carbs: Math.max(0, carbs),
      proteinCal,
      fatCal,
      carbsCal: Math.max(0, carbsCal),
    })
  }

  function reset() {
    setWeight("")
    setCalories("")
    setGoal("maintain")
    setResults(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-5">
          {/* Goal */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">Objetivo</Label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(goalLabels) as Goal[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setGoal(key)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all sm:text-sm ${
                    goal === key
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {goalLabels[key]}
                </button>
              ))}
            </div>
          </div>

          {/* Weight & Calories */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="macro-weight" className="text-sm font-medium text-foreground">
                Peso (kg)
              </Label>
              <Input
                id="macro-weight"
                type="number"
                placeholder="75"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="macro-cal" className="text-sm font-medium text-foreground">
                Calorias diarias
              </Label>
              <Input
                id="macro-cal"
                type="number"
                placeholder="2200"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Si no conoces tus calorias, usa primero la{" "}
            <a href="/calorias" className="text-primary underline underline-offset-2">
              calculadora de calorias
            </a>
            .
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              onClick={reset}
              className="border-border bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            >
              Reiniciar
            </Button>
            <Button
              onClick={calculate}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Calcular
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-lg font-bold text-foreground font-mono">
            Tu distribucion de macros
          </h2>

          {/* Macro bar */}
          <div className="overflow-hidden rounded-xl">
            <div className="flex h-3">
              <div
                className="bg-primary transition-all"
                style={{
                  width: `${((results.proteinCal / results.calories) * 100).toFixed(0)}%`,
                }}
              />
              <div
                className="bg-primary/50 transition-all"
                style={{
                  width: `${((results.carbsCal / results.calories) * 100).toFixed(0)}%`,
                }}
              />
              <div
                className="bg-muted-foreground/30 transition-all"
                style={{
                  width: `${((results.fatCal / results.calories) * 100).toFixed(0)}%`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Proteina</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span>Carbohidratos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span>Grasas</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ResultCard
              label="Proteina"
              value={results.protein.toString()}
              unit="g"
              highlight
            />
            <ResultCard
              label="Carbohidratos"
              value={results.carbs.toString()}
              unit="g"
            />
            <ResultCard
              label="Grasas"
              value={results.fat.toString()}
              unit="g"
            />
          </div>

          <div className="rounded-xl border border-border bg-secondary/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Calorias totales</span>
              <span className="font-bold font-mono text-foreground">
                {results.calories.toLocaleString("es-ES")} kcal
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            * Proteina: {macroProfiles[goal].proteinPerKg}g/kg de peso corporal.
            Grasas: {(macroProfiles[goal].fatPercent * 100).toFixed(0)}% de las calorias totales.
            El resto se asigna a carbohidratos.
          </p>
        </div>
      )}
    </div>
  )
}
