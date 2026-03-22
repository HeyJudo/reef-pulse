export type ReefState = 'healthy' | 'stressed' | 'bleached' | 'damaged' | 'recovering'

export interface ReefCell {
  id: string
  label: string
  x: number
  y: number
  coralCover: number
  fishBiomass: number
  heatStress: number
  damage: number
  fishingPressure: number
  siltation: number
  recoveryRate: number
  connectivity: string[]
}

export interface SimulationInputs {
  heatMultiplier: number
  fishingMultiplier: number
  siltationMultiplier: number
  damageEvent: number
  restorationBudget: number
  months: number
}

export interface SimulationCell extends ReefCell {
  state: ReefState
}

export interface SimulationStep {
  month: number
  cells: SimulationCell[]
  reefHealthScore: number
  bleachingRiskScore: number
  fishHabitatScore: number
  recoveryPotentialScore: number
}

export interface ScenarioPreset {
  id: string
  label: string
  note: string
  inputs: SimulationInputs
}

export interface EvidenceItem {
  title: string
  date: string
  source: string
  summary: string
  href: string
}

export interface SimulationInsights {
  highestRiskZone: string
  recommendedAction: string
  pressureDriver: string
}

export interface SimulationResult {
  steps: SimulationStep[]
  finalStep: SimulationStep
  insights: SimulationInsights
}
