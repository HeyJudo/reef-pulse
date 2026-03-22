import { motion } from 'framer-motion'
import type { SimulationCell } from '../types'

interface ReefGridProps {
  cells: SimulationCell[]
  compact?: boolean
}

export function ReefGrid({ cells, compact = false }: ReefGridProps) {
  return (
    <div className={`reef-grid${compact ? ' reef-grid--compact' : ''}`}>
      {cells.map((cell, index) => (
        <motion.article
          key={cell.id}
          className={`reef-cell reef-cell--${cell.state}`}
          title={`${cell.label}: ${cell.state} (${Math.round(cell.coralCover)}%)`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03, duration: 0.35, ease: 'easeOut' }}
        >
          <span className="reef-cell-label">{cell.label}</span>
          <span className="reef-cell-state">{cell.state}</span>
          <span className="reef-cell-score">{Math.round(cell.coralCover)}</span>
        </motion.article>
      ))}
    </div>
  )
}
