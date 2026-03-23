import type {
  ReefCell,
  ReefState,
  SimulationCell,
  SimulationInputs,
  SimulationInsights,
  SimulationResult,
  SimulationStep,
} from '../types'

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value))

const average = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0) / values.length

// These coefficients tune the prototype toward visually readable month-to-month changes.
// They are heuristic weights for the demo, not field-validated ecological parameters.
const MODEL = {
  heatInputWeight: 0.35,
  damageHeatWeight: 0.03,
  siltationHeatWeight: 0.015,
  heatReliefWeight: 0.35,
  heatConvergenceRate: 0.35,
  passiveCoolingWeight: 0.08,
  damageInputWeight: 0.33,
  siltationDamageWeight: 0.12,
  damageReliefWeight: 0.4,
  damageConvergenceRate: 0.28,
  connectivityDamageRelief: 1.6,
  fishingInputWeight: 0.35,
  fishingReliefWeight: 0.12,
  fishingConvergenceRate: 0.3,
  siltationInputWeight: 0.34,
  eventSiltationWeight: 0.08,
  siltationReliefWeight: 0.1,
  siltationConvergenceRate: 0.26,
  stressThresholds: {
    heat: 36,
    damage: 18,
    fishing: 24,
    siltation: 20,
  },
  stressWeights: {
    heat: 0.08,
    damage: 0.09,
    fishing: 0.05,
    siltation: 0.06,
  },
  restorationCoralBoost: 0.16,
  connectivityCoralBoost: 1.1,
  recoveryCoralBoost: 0.1,
  stableCoralBonus: 1.25,
  resilientCoralBonus: 0.75,
  coralFishBoost: 0.05,
  restorationFishBoost: 0.03,
  connectivityFishBoost: 0.7,
  fishingFishPenalty: 0.14,
  damageFishPenalty: 0.06,
  heatFishPenalty: 0.04,
  restorationRecoveryBoost: 0.08,
  connectivityRecoveryBoost: 0.9,
  stressRecoveryPenalty: 0.18,
  extremeHeatRecoveryPenalty: 0.04,
} as const

const getState = (
  coralCover: number,
  heatStress: number,
  damage: number,
  recoveryRate: number,
): ReefState => {
  if (damage >= 78 || coralCover <= 30) {
    return 'damaged'
  }

  if (heatStress >= 64 && coralCover <= 50) {
    return 'bleached'
  }

  if (recoveryRate >= 11 && heatStress < 38 && damage < 34 && coralCover >= 60) {
    return 'recovering'
  }

  if (heatStress >= 46 || damage >= 48 || coralCover <= 58) {
    return 'stressed'
  }

  return 'healthy'
}

const summarizePressureDriver = (inputs: SimulationInputs) => {
  const pressures = [
    { label: 'Heat stress', score: inputs.heatMultiplier * 1.2 },
    { label: 'Fishing pressure', score: inputs.fishingMultiplier },
    { label: 'Siltation', score: inputs.siltationMultiplier * 1.05 },
    { label: 'Direct damage', score: inputs.damageEvent * 1.15 },
  ]

  return pressures.sort((a, b) => b.score - a.score)[0].label
}

const pickRecommendation = (
  inputs: SimulationInputs,
  finalCells: SimulationCell[],
): SimulationInsights => {
  const highestRisk = [...finalCells].sort(
    (a, b) =>
      b.damage + b.heatStress + (100 - b.coralCover) -
      (a.damage + a.heatStress + (100 - a.coralCover)),
  )[0]

  const dominantPressure = summarizePressureDriver(inputs)

  let recommendedAction = 'Target restoration on the most damaged outer reef cells.'

  if (inputs.heatMultiplier >= 60) {
    recommendedAction =
      'Prioritize reef closures and triage the hottest zones before bleaching spreads.'
  } else if (inputs.damageEvent >= 55 || inputs.siltationMultiplier >= 48) {
    recommendedAction =
      'Stabilize disturbed reef sections first and reduce sediment or anchor-related damage.'
  } else if (inputs.fishingMultiplier >= 45) {
    recommendedAction =
      'Reduce fishing pressure around stressed corridors so fish habitat can recover.'
  } else if (inputs.restorationBudget >= 55) {
    recommendedAction =
      'Focus restoration around connected nursery zones to accelerate reef-wide recovery.'
  }

  return {
    highestRiskZone: highestRisk.label,
    pressureDriver: dominantPressure,
    recommendedAction,
  }
}

export const runSimulation = (
  initialCells: ReefCell[],
  inputs: SimulationInputs,
): SimulationResult => {
  const baselineById = new Map(initialCells.map((cell) => [cell.id, cell]))

  let currentCells = initialCells.map<SimulationCell>((cell) => ({
    ...cell,
    state: getState(cell.coralCover, cell.heatStress, cell.damage, cell.recoveryRate),
  }))

  const steps: SimulationStep[] = []

  for (let month = 1; month <= inputs.months; month += 1) {
    const restorationTargets = [...currentCells]
      .sort(
        (a, b) =>
          b.damage + b.heatStress + (100 - b.coralCover) -
          (a.damage + a.heatStress + (100 - a.coralCover)),
      )
      .slice(0, 4)
      .map((cell) => cell.id)

    currentCells = currentCells.map((cell) => {
      const baselineCell = baselineById.get(cell.id) ?? cell
      const connectedCells = currentCells.filter((candidate) =>
        cell.connectivity.includes(candidate.id),
      )

      const neighborRecovery =
        connectedCells.length > 0
          ? average(connectedCells.map((candidate) => candidate.coralCover)) / 100
          : 0

      const restorationBoost = restorationTargets.includes(cell.id)
        ? inputs.restorationBudget * 0.14
        : inputs.restorationBudget * 0.07

      const heatTarget = clamp(
        baselineCell.heatStress +
          inputs.heatMultiplier * MODEL.heatInputWeight +
          inputs.damageEvent * MODEL.damageHeatWeight +
          inputs.siltationMultiplier * MODEL.siltationHeatWeight -
          restorationBoost * MODEL.heatReliefWeight,
      )

      const heatStress = clamp(
        cell.heatStress +
          (heatTarget - cell.heatStress) * MODEL.heatConvergenceRate -
          baselineCell.recoveryRate * MODEL.passiveCoolingWeight,
      )

      const damageTarget = clamp(
        baselineCell.damage +
          inputs.damageEvent * MODEL.damageInputWeight +
          inputs.siltationMultiplier * MODEL.siltationDamageWeight -
          restorationBoost * MODEL.damageReliefWeight,
      )

      const damage = clamp(
        cell.damage +
          (damageTarget - cell.damage) * MODEL.damageConvergenceRate -
          neighborRecovery * MODEL.connectivityDamageRelief,
      )

      const fishingTarget = clamp(
        baselineCell.fishingPressure +
          inputs.fishingMultiplier * MODEL.fishingInputWeight -
          inputs.restorationBudget * MODEL.fishingReliefWeight,
      )

      const fishingPressure = clamp(
        cell.fishingPressure +
          (fishingTarget - cell.fishingPressure) * MODEL.fishingConvergenceRate,
      )

      const siltationTarget = clamp(
        baselineCell.siltation +
          inputs.siltationMultiplier * MODEL.siltationInputWeight +
          inputs.damageEvent * MODEL.eventSiltationWeight -
          inputs.restorationBudget * MODEL.siltationReliefWeight,
      )

      const siltation = clamp(
        cell.siltation +
          (siltationTarget - cell.siltation) * MODEL.siltationConvergenceRate,
      )

      const stressLoad =
        Math.max(0, heatStress - MODEL.stressThresholds.heat) * MODEL.stressWeights.heat +
        Math.max(0, damage - MODEL.stressThresholds.damage) * MODEL.stressWeights.damage +
        Math.max(0, fishingPressure - MODEL.stressThresholds.fishing) *
          MODEL.stressWeights.fishing +
        Math.max(0, siltation - MODEL.stressThresholds.siltation) *
          MODEL.stressWeights.siltation

      const stabilityBonus = stressLoad < 1.3 ? MODEL.stableCoralBonus : 0
      const resilienceBonus = stressLoad < 0.7 ? MODEL.resilientCoralBonus : 0

      const coralCover = clamp(
        cell.coralCover -
          stressLoad +
          restorationBoost * MODEL.restorationCoralBoost +
          neighborRecovery * MODEL.connectivityCoralBoost +
          cell.recoveryRate * MODEL.recoveryCoralBoost +
          stabilityBonus +
          resilienceBonus,
      )

      const fishBiomass = clamp(
        cell.fishBiomass +
          Math.max(0, coralCover - 55) * MODEL.coralFishBoost +
          restorationBoost * MODEL.restorationFishBoost +
          neighborRecovery * MODEL.connectivityFishBoost -
          Math.max(0, fishingPressure - 20) * MODEL.fishingFishPenalty -
          Math.max(0, damage - 18) * MODEL.damageFishPenalty -
          Math.max(0, heatStress - 40) * MODEL.heatFishPenalty,
      )

      const recoveryRate = clamp(
        cell.recoveryRate +
          restorationBoost * MODEL.restorationRecoveryBoost +
          neighborRecovery * MODEL.connectivityRecoveryBoost -
          stressLoad * MODEL.stressRecoveryPenalty -
          Math.max(0, heatStress - 48) * MODEL.extremeHeatRecoveryPenalty,
      )

      return {
        ...cell,
        coralCover,
        fishBiomass,
        heatStress,
        damage,
        fishingPressure,
        siltation,
        recoveryRate,
        state: getState(coralCover, heatStress, damage, recoveryRate),
      }
    })

    const reefHealthScore = Math.round(
      average(currentCells.map((cell) => cell.coralCover - cell.damage * 0.24)),
    )
    const bleachingRiskScore = Math.round(
      average(currentCells.map((cell) => cell.heatStress * 0.72 + (100 - cell.coralCover) * 0.28)),
    )
    const fishHabitatScore = Math.round(
      average(currentCells.map((cell) => cell.fishBiomass * 0.72 + cell.coralCover * 0.28)),
    )
    const recoveryPotentialScore = Math.round(
      average(currentCells.map((cell) => cell.recoveryRate + cell.coralCover * 0.36 - cell.damage * 0.16)),
    )

    steps.push({
      month,
      cells: currentCells,
      reefHealthScore: clamp(reefHealthScore),
      bleachingRiskScore: clamp(bleachingRiskScore),
      fishHabitatScore: clamp(fishHabitatScore),
      recoveryPotentialScore: clamp(recoveryPotentialScore),
    })
  }

  const finalStep = steps[steps.length - 1]

  return {
    steps,
    finalStep,
    insights: pickRecommendation(inputs, finalStep.cells),
  }
}

export const formatDelta = (value: number) => {
  if (value > 0) {
    return `+${value}`
  }

  return `${value}`
}
