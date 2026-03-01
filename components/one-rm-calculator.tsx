"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ResultCard } from "@/components/result-card"

interface Results {
  oneRM: number
  percentages: { pct: number; weight: number; reps: string }[]
}

// Epley formula: 1RM = w * (1 + r/30)
function epley(weight: number, reps: number): number {
  if (reps === 1) return weight
  return weight * (1 + reps / 30)
}

const trainingZones = [
  { pct: 100, reps: "1" },
  { pct: 95, reps: "2" },
  { pct: 90, reps: "3-4" },
  { pct: 85, reps: "5-6" },
  { pct: 80, reps: "7-8" },
  { pct: 75, reps: "8-10" },
  { pct: 70, reps: "10-12" },
  { pct: 65, reps: "12-15" },
  { pct: 60, reps: "15-20" },
]

export function OneRMCalculator() {
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [results, setResults] = useState<Results | null>(null)

  function calculate() {
    const w = parseFloat(weight)
    const r = parseFloat(reps)
    if (!w || !r || r < 1) return

    const oneRM = Math.round(epley(w, r))
    const percentages = trainingZones.map((zone) => ({
      ...zone,
      weight: Math.round((oneRM * zone.pct) / 100),
    }))

    setResults({ oneRM, percentages })
  }

  function reset() {
    setWeight("")
    setReps("")
    setResults(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-5">
          {/* Weight */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="rm-weight" className="text-sm font-medium text-foreground">
              Peso levantado (kg)
            </Label>
            <Input
              id="rm-weight"
              type="number"
              placeholder="100"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Reps */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="rm-reps" className="text-sm font-medium text-foreground">
              Repeticiones realizadas
            </Label>
            <Input
              id="rm-reps"
              type="number"
              placeholder="5"
              min="1"
              max="30"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Introduce las repeticiones que completaste con buena tecnica (1-30).
            </p>
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
            Tu 1RM estimado
          </h2>

          <ResultCard
            label="1 Repeticion Maxima"
            value={results.oneRM.toLocaleString("es-ES")}
            unit="kg"
            highlight
          />

          {/* Percentage Table */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-3 border-b border-border bg-secondary/50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>%1RM</span>
              <span>Peso (kg)</span>
              <span>Reps aprox.</span>
            </div>
            {results.percentages.map((row) => (
              <div
                key={row.pct}
                className={`grid grid-cols-3 border-b border-border/50 px-4 py-3 text-sm transition-colors last:border-b-0 ${
                  row.pct === 100
                    ? "bg-primary/5 text-primary font-medium"
                    : "text-foreground"
                }`}
              >
                <span className="font-mono">{row.pct}%</span>
                <span className="font-mono font-medium">{row.weight}</span>
                <span className="text-muted-foreground">{row.reps}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            * Basado en la formula de Epley (1RM = peso x (1 + reps/30)).
            Los porcentajes son guias para planificar tus series de trabajo.
          </p>
        </div>
      )}
    </div>
  )
}
