const legendItems = [
  { label: 'Healthy', color: 'var(--healthy)' },
  { label: 'Stressed', color: 'var(--stressed)' },
  { label: 'Bleached', color: 'var(--bleached)' },
  { label: 'Damaged', color: 'var(--damaged)' },
  { label: 'Recovering', color: 'var(--recovering)' },
] as const

interface ReefLegendProps {
  includeRecovering?: boolean
}

export function ReefLegend({ includeRecovering = true }: ReefLegendProps) {
  const items = includeRecovering ? legendItems : legendItems.slice(0, 4)

  return (
    <div className="legend" aria-label="Reef state legend">
      {items.map((item) => (
        <span key={item.label} className="legend-chip">
          <span className="legend-swatch" style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  )
}
