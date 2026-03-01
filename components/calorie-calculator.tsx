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

type Gender = "male" | "female"
type Activity =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active"

const activityLabels: Record<Activity, string> = {
  sedentary: "Sedentario (poco o nada de ejercicio)",
  light: "Ligero (1-3 dias/semana)",
  moderate: "Moderado (3-5 dias/semana)",
  active: "Activo (6-7 dias/semana)",
  "very-active": "Muy activo (2x al dia / trabajo fisico)",
}

const activityMultipliers: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
}

interface Results {
  bmr: number
  maintenance: number
  deficit: number
  surplus: number
}

export function CalorieCalculator() {
  const [gender, setGender] = useState<Gender>("male")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [activity, setActivity] = useState<Activity>("moderate")
  const [results, setResults] = useState<Results | null>(null)

  function calculate() {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseFloat(age)
    if (!w || !h || !a) return

    // Mifflin-St Jeor Equation
    let bmr: number
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161
    }

    const maintenance = bmr * activityMultipliers[activity]
    setResults({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      deficit: Math.round(maintenance - 500),
      surplus: Math.round(maintenance + 300),
    })
  }

  function reset() {
    setGender("male")
    setAge("")
    setWeight("")
    setHeight("")
    setActivity("moderate")
    setResults(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-5">
          {/* Gender */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">Sexo</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  gender === "male"
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                Masculino
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  gender === "female"
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                Femenino
              </button>
            </div>
          </div>

          {/* Age & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="age" className="text-sm font-medium text-foreground">
                Edad
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="weight" className="text-sm font-medium text-foreground">
                Peso (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="75"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Height */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="height" className="text-sm font-medium text-foreground">
              Altura (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Activity */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">
              Nivel de actividad
            </Label>
            <Select
              value={activity}
              onValueChange={(val) => setActivity(val as Activity)}
            >
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {(Object.keys(activityLabels) as Activity[]).map((key) => (
                  <SelectItem key={key} value={key} className="text-foreground hover:bg-secondary">
                    {activityLabels[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
            Resultados
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Metabolismo basal"
              value={results.bmr.toLocaleString("es-ES")}
              unit="kcal"
            />
            <ResultCard
              label="Mantenimiento"
              value={results.maintenance.toLocaleString("es-ES")}
              unit="kcal"
              highlight
            />
            <ResultCard
              label="Deficit (-500)"
              value={results.deficit.toLocaleString("es-ES")}
              unit="kcal"
            />
            <ResultCard
              label="Superavit (+300)"
              value={results.surplus.toLocaleString("es-ES")}
              unit="kcal"
            />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            * Basado en la ecuacion de Mifflin-St Jeor. Los resultados son
            estimaciones y pueden variar segun factores individuales.
          </p>
        </div>
      )}
    </div>
  )
}
