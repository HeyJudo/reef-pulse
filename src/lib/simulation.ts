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
  heatInputWeight: 0.34,
  monthlyHeatDrift: 0.65,
  heatRestorationRelief: 0.18,
  damageInputWeight: 0.22,
  siltationDamageWeight: 0.08,
  damageRestorationRelief: 0.34,
  fishingInputWeight: 0.18,
  restorationFishingRelief: 0.05,
  siltationInputWeight: 0.16,
  eventSiltationWeight: 0.04,
  stressWeights: {
    heat: 0.31,
    damage: 0.26,
    fishing: 0.22,
    siltation: 0.21,
  },
  coralStressPenalty: 0.085,
  restorationCoralBoost: 0.45,
  connectivityCoralBoost: 2.8,
  recoveryCoralBoost: 0.4,
  coralFishBoost: 0.05,
  fishingFishPenalty: 0.22,
  damageFishPenalty: 0.05,
  connectivityFishBoost: 1.7,
  restorationRecoveryBoost: 0.24,
  connectivityRecoveryBoost: 1.4,
  stressRecoveryPenalty: 0.03,
} as const

const getState = (
  coralCover: number,
  heatStress: number,
  damage: number,
  recoveryRate: number,
): ReefState => {
  if (damage >= 72 || coralCover <= 32) {
    return 'damaged'
  }

  if (heatStress >= 64 && coralCover <= 52) {
    return 'bleached'
  }

  if (recoveryRate >= 12 && heatStress < 36 && damage < 36 && coralCover >= 58) {
    return 'recovering'
  }

  if (heatStress >= 44 || damage >= 42 || coralCover <= 56) {
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
      const connectedCells = currentCells.filter((candidate) =>
        cell.connectivity.includes(candidate.id),
      )

      const neighborRecovery =
        connectedCells.length > 0
          ? average(connectedCells.map((candidate) => candidate.coralCover)) / 100
          : 0

      const restorationBoost = restorationTargets.includes(cell.id)
        ? inputs.restorationBudget * 0.09
        : inputs.restorationBudget * 0.03

      const heatStress = clamp(
        cell.heatStress +
          inputs.heatMultiplier * MODEL.heatInputWeight +
          month * MODEL.monthlyHeatDrift -
          restorationBoost * MODEL.heatRestorationRelief,
      )
      const damage = clamp(
        cell.damage +
          inputs.damageEvent * MODEL.damageInputWeight +
          inputs.siltationMultiplier * MODEL.siltationDamageWeight -
          restorationBoost * MODEL.damageRestorationRelief,
      )

      const fishingPressure = clamp(
        cell.fishingPressure +
          inputs.fishingMultiplier * MODEL.fishingInputWeight -
          inputs.restorationBudget * MODEL.restorationFishingRelief,
      )

      const siltation = clamp(
        cell.siltation +
          inputs.siltationMultiplier * MODEL.siltationInputWeight +
          inputs.damageEvent * MODEL.eventSiltationWeight,
      )

      const stressLoad =
        heatStress * MODEL.stressWeights.heat +
        damage * MODEL.stressWeights.damage +
        fishingPressure * MODEL.stressWeights.fishing +
        siltation * MODEL.stressWeights.siltation

      const coralCover = clamp(
        cell.coralCover -
          stressLoad * MODEL.coralStressPenalty +
          restorationBoost * MODEL.restorationCoralBoost +
          neighborRecovery * MODEL.connectivityCoralBoost +
          cell.recoveryRate * MODEL.recoveryCoralBoost,
      )

      const fishBiomass = clamp(
        cell.fishBiomass +
          coralCover * MODEL.coralFishBoost -
          fishingPressure * MODEL.fishingFishPenalty -
          damage * MODEL.damageFishPenalty +
          neighborRecovery * MODEL.connectivityFishBoost,
      )

      const recoveryRate = clamp(
        cell.recoveryRate +
          restorationBoost * MODEL.restorationRecoveryBoost +
          neighborRecovery * MODEL.connectivityRecoveryBoost -
          stressLoad * MODEL.stressRecoveryPenalty,
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
