import { cn } from "@/lib/utils"

interface ResultCardProps {
  label: string
  value: string
  unit?: string
  highlight?: boolean
}

export function ResultCard({
  label,
  value,
  unit,
  highlight = false,
}: ResultCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all",
        highlight
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span
          className={cn(
            "text-2xl font-bold font-mono tabular-nums",
            highlight ? "text-primary" : "text-foreground"
          )}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground">{unit}</span>
        )}
      </div>
    </div>
  )
}
