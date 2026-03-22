import { describe, expect, it } from 'vitest'
import { reefCells, scenarioPresets } from '../data/reef'
import { runSimulation } from './simulation'

describe('runSimulation', () => {
  it('returns one step per simulated month', () => {
    const result = runSimulation(reefCells, scenarioPresets[0].inputs)

    expect(result.steps).toHaveLength(scenarioPresets[0].inputs.months)
    expect(result.finalStep.month).toBe(scenarioPresets[0].inputs.months)
  })

  it('keeps summary metrics bounded between 0 and 100', () => {
    const result = runSimulation(reefCells, scenarioPresets[2].inputs)

    expect(result.finalStep.reefHealthScore).toBeGreaterThanOrEqual(0)
    expect(result.finalStep.reefHealthScore).toBeLessThanOrEqual(100)
    expect(result.finalStep.bleachingRiskScore).toBeGreaterThanOrEqual(0)
    expect(result.finalStep.bleachingRiskScore).toBeLessThanOrEqual(100)
    expect(result.finalStep.fishHabitatScore).toBeGreaterThanOrEqual(0)
    expect(result.finalStep.fishHabitatScore).toBeLessThanOrEqual(100)
    expect(result.finalStep.recoveryPotentialScore).toBeGreaterThanOrEqual(0)
    expect(result.finalStep.recoveryPotentialScore).toBeLessThanOrEqual(100)
  })

  it('shows harsher scenarios performing worse than the baseline', () => {
    const baseline = runSimulation(reefCells, scenarioPresets[0].inputs)
    const heatSurge = runSimulation(reefCells, scenarioPresets[1].inputs)

    expect(heatSurge.finalStep.bleachingRiskScore).toBeGreaterThan(
      baseline.finalStep.bleachingRiskScore,
    )
    expect(heatSurge.finalStep.reefHealthScore).toBeLessThan(
      baseline.finalStep.reefHealthScore,
    )
  })
})
