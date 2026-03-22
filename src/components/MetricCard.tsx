interface MetricCardProps {
  label: string
  value: number
  delta?: number
  hint: string
  icon?: string
}

export function MetricCard({ label, value, delta = 0, hint, icon }: MetricCardProps) {
  const deltaClass =
    delta > 0 ? 'metric-delta--positive' : delta < 0 ? 'metric-delta--negative' : 'metric-delta--neutral'

  return (
    <article className="metric-card">
      {icon && <div className="metric-icon">{icon}</div>}
      <span className="metric-label">{label}</span>
      <div className="metric-value">{value}</div>
      <div className={`metric-delta ${deltaClass}`}>
        {delta > 0 ? `+${delta}` : delta}
      </div>
      <p className="metric-hint">{hint}</p>
    </article>
  )
}
