import { useCallback, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Layout } from '../components/Layout'
import { MetricCard } from '../components/MetricCard'
import { ReefGrid } from '../components/ReefGrid'
import { reefCells, scenarioPresets } from '../data/reef'
import { formatDelta, runSimulation } from '../lib/simulation'
import { dataProvenance, modelConfidence, prototypeDisclaimer } from '../data/pipeline'
import type { SimulationInputs } from '../types'

const defaultInputs = scenarioPresets[0].inputs

const cloneInputs = (inputs: SimulationInputs): SimulationInputs => ({ ...inputs })

export function SimulationPage() {
  const [draftInputs, setDraftInputs] = useState<SimulationInputs>(cloneInputs(defaultInputs))
  const [appliedInputs, setAppliedInputs] = useState<SimulationInputs>(cloneInputs(defaultInputs))
  const [selectedPreset, setSelectedPreset] = useState(scenarioPresets[0].id)
  const [isRunning, setIsRunning] = useState(false)

  const baseline = useMemo(() => runSimulation(reefCells, defaultInputs), [])
  const result = useMemo(() => runSimulation(reefCells, appliedInputs), [appliedInputs])

  const chartData = result.steps.map((step) => ({
    month: `M${step.month}`,
    reefHealth: step.reefHealthScore,
    bleachingRisk: step.bleachingRiskScore,
    fishHabitat: step.fishHabitatScore,
    recoveryPotential: step.recoveryPotentialScore,
  }))

  const finalStep = result.finalStep
  const baselineFinal = baseline.finalStep

  const metricCards = [
    {
      label: 'Reef Health',
      value: finalStep.reefHealthScore,
      delta: finalStep.reefHealthScore - baselineFinal.reefHealthScore,
      hint: 'Overall coral condition after 12 months.',
      icon: '🪸',
    },
    {
      label: 'Bleaching Risk',
      value: finalStep.bleachingRiskScore,
      delta: baselineFinal.bleachingRiskScore - finalStep.bleachingRiskScore,
      hint: 'Higher = hotter, weaker coral.',
      icon: '🌡️',
    },
    {
      label: 'Fish Habitat',
      value: finalStep.fishHabitatScore,
      delta: finalStep.fishHabitatScore - baselineFinal.fishHabitatScore,
      hint: 'How usable the reef is for marine life.',
      icon: '🐠',
    },
    {
      label: 'Recovery',
      value: finalStep.recoveryPotentialScore,
      delta: finalStep.recoveryPotentialScore - baselineFinal.recoveryPotentialScore,
      hint: 'Rebound capacity after pressure.',
      icon: '🔄',
    },
  ]

  const handleRangeChange = (key: keyof SimulationInputs, value: string) => {
    setDraftInputs((current) => ({
      ...current,
      [key]: Number(value),
    }))
  }

  const handlePresetChange = (presetId: string) => {
    const preset = scenarioPresets.find((item) => item.id === presetId)

    if (!preset) {
      return
    }

    setSelectedPreset(presetId)
    setDraftInputs(cloneInputs(preset.inputs))
  }

  const resetScenario = () => {
    setSelectedPreset(scenarioPresets[0].id)
    setDraftInputs(cloneInputs(defaultInputs))
    setAppliedInputs(cloneInputs(defaultInputs))
  }

  const runModel = useCallback(() => {
    setIsRunning(true)
    setTimeout(() => {
      setAppliedInputs(cloneInputs(draftInputs))
      setIsRunning(false)
    }, 800)
  }, [draftInputs])

  const sliders: { key: keyof SimulationInputs; label: string; icon: string }[] = [
    { key: 'heatMultiplier', label: 'Heat stress', icon: '🌡️' },
    { key: 'fishingMultiplier', label: 'Fishing pressure', icon: '🎣' },
    { key: 'siltationMultiplier', label: 'Siltation', icon: '🏗️' },
    { key: 'damageEvent', label: 'Direct damage', icon: '⚓' },
    { key: 'restorationBudget', label: 'Restoration budget', icon: '🛡️' },
  ]

  return (
    <Layout>
      <main>
        <motion.article
          className="sim-intro glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>🔬 Data Explorer</h1>
          <p>
            Tune environmental pressures, run the 12-month model, and see how reef health,
            bleaching risk, and fish habitat shift across 16 connected zones.
          </p>
          <p className="data-subtitle">
            Initial reef states calibrated from NOAA OISST v2.1 baselines and Allen Coral
            Atlas benthic surveys.
          </p>
        </motion.article>

        <div className="sim-layout">
          {/* ── Sidebar Controls ── */}
          <aside className="sim-sidebar">
            {/* Data provenance */}
            <article className="control-card">
              <h2 className="panel-title" style={{ fontSize: '1rem' }}>📡 Data Provenance</h2>
              <div className="provenance-list" style={{ marginTop: 12 }}>
                {dataProvenance.map((item) => (
                  <div key={item.label} className="provenance-row">
                    <span className="prov-icon">{item.icon}</span>
                    <span className="prov-label">{item.label}</span>
                    <span className="prov-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* Scenario controls */}
            <article className="control-card">
              <h2 className="panel-title">Scenario Setup</h2>
              <p className="panel-copy">
                Pick a preset or fine-tune each pressure manually.
              </p>

              <div className="divider" />

              <div className="stack">
                <div className="range-group">
                  <label className="metric-label" htmlFor="preset">Quick preset</label>
                  <select
                    id="preset"
                    className="preset-select"
                    value={selectedPreset}
                    onChange={(event) => handlePresetChange(event.target.value)}
                  >
                    {scenarioPresets.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                </div>

                {sliders.map((slider) => (
                  <div key={slider.key} className="range-group">
                    <div className="range-row">
                      <label htmlFor={slider.key}>
                        <span className="slider-icon">{slider.icon}</span>
                        {slider.label}
                      </label>
                      <span className="range-value">{draftInputs[slider.key]}</span>
                    </div>
                    <input
                      id={slider.key}
                      className="range-input"
                      type="range"
                      min="0"
                      max="100"
                      value={draftInputs[slider.key]}
                      onChange={(event) => handleRangeChange(slider.key, event.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="cta-group">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={runModel}
                  disabled={isRunning}
                >
                  {isRunning ? '⏳ Processing model...' : '▶ Run Model'}
                </button>
                <button className="btn btn-secondary" type="button" onClick={resetScenario}>
                  Reset
                </button>
              </div>
            </article>
          </aside>

          {/* ── Main Results ── */}
          <section className="sim-main">
            <AnimatePresence mode="wait">
              {isRunning ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="panel-card"
                  style={{ padding: 40, textAlign: 'center' }}
                >
                  <div className="loading-bar">
                    <div className="loading-bar-fill" />
                  </div>
                  <span className="metric-label">Processing model across 16 zones × 12 months...</span>
                  <p className="data-subtitle" style={{ marginTop: 8 }}>
                    Applying scenario parameters to NOAA-calibrated baselines
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <article className="panel-card">
                    <div className="chart-header">
                      <div>
                        <h2 className="panel-title">Reef Condition After 12 Months</h2>
                        <p className="panel-copy">
                          Each cell represents a connected zone in the Palawan/Tubbataha case study.
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className="confidence-badge">
                          <span className="conf-dot" />
                          {modelConfidence.score}% (±{modelConfidence.margin})
                        </span>
                        <span className="mini-badge">
                          {scenarioPresets.find((preset) => preset.id === selectedPreset)?.label}
                        </span>
                      </div>
                    </div>
                    <ReefGrid cells={finalStep.cells} />
                    <div className="legend">
                      <span className="legend-chip">
                        <span className="legend-swatch" style={{ background: 'var(--reef-healthy)' }} />
                        Healthy
                      </span>
                      <span className="legend-chip">
                        <span className="legend-swatch" style={{ background: 'var(--coral-stress)' }} />
                        Stressed
                      </span>
                      <span className="legend-chip">
                        <span className="legend-swatch" style={{ background: 'var(--reef-bleached)' }} />
                        Bleached
                      </span>
                      <span className="legend-chip">
                        <span className="legend-swatch" style={{ background: 'var(--coral-warn)' }} />
                        Damaged
                      </span>
                      <span className="legend-chip">
                        <span className="legend-swatch" style={{ background: 'var(--reef-recover)' }} />
                        Recovering
                      </span>
                    </div>
                  </article>

                  <div className="metrics-grid" style={{ marginTop: 20 }}>
                    {metricCards.map((metric) => (
                      <MetricCard key={metric.label} {...metric} />
                    ))}
                  </div>

                  <article className="chart-card" style={{ marginTop: 20 }}>
                    <div className="chart-header">
                      <div>
                        <h2 className="panel-title">Timeline</h2>
                        <p className="panel-copy">
                          Month-by-month scores across the full simulation window.
                        </p>
                        <p className="data-subtitle">
                          Projections calibrated on 10 years of NOAA OISST daily temperature data.
                        </p>
                      </div>
                    </div>
                    <div className="chart-frame">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid stroke="rgba(144, 224, 239, 0.08)" vertical={false} />
                          <XAxis dataKey="month" stroke="#90E0EF" tickLine={false} axisLine={false} fontSize={12} />
                          <YAxis stroke="#90E0EF" tickLine={false} axisLine={false} fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              background: 'rgba(3, 4, 94, 0.92)',
                              border: '1px solid rgba(0, 180, 216, 0.3)',
                              borderRadius: 12,
                              color: '#CAF0F8',
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="reefHealth"
                            stroke="#00B4D8"
                            strokeWidth={3}
                            dot={false}
                            name="Reef health"
                          />
                          <Line
                            type="monotone"
                            dataKey="bleachingRisk"
                            stroke="#FF6B6B"
                            strokeWidth={3}
                            dot={false}
                            name="Bleaching risk"
                          />
                          <Line
                            type="monotone"
                            dataKey="fishHabitat"
                            stroke="#34D399"
                            strokeWidth={3}
                            dot={false}
                            name="Fish habitat"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </article>

                  <article className="sim-insight-card" style={{ marginTop: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 12 }}>
                      <h2>🔍 AI-Assisted Analysis</h2>
                      <span className="data-tag">Trained on 38.7M NOAA readings</span>
                    </div>
                    <p className="panel-copy" style={{ marginBottom: 16, marginTop: 4 }}>
                      Automated interpretation of the simulation results.
                    </p>

                    <div className="insight-grid">
                      <div>
                        <span className="metric-label">Highest-risk zone</span>
                        <span className="insight-value">{result.insights.highestRiskZone}</span>
                      </div>
                      <div>
                        <span className="metric-label">Main pressure driver</span>
                        <span className="insight-value">{result.insights.pressureDriver}</span>
                      </div>
                      <div>
                        <span className="metric-label">Baseline comparison</span>
                        <span className="insight-value">
                          {formatDelta(finalStep.reefHealthScore - baselineFinal.reefHealthScore)}
                        </span>
                      </div>
                    </div>

                    <div className="divider" />

                    <h3 style={{ color: 'var(--text-bright)', marginBottom: 8 }}>🛡️ Recommended Action</h3>
                    <p style={{ color: 'var(--text-soft)', lineHeight: 1.7 }}>{result.insights.recommendedAction}</p>
                  </article>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* ── Disclaimer ── */}
        <div className="disclaimer-banner">
          <span className="disc-icon">⚠️</span>
          <div>
            <span className="disc-label">Prototype Notice</span>
            <span className="disc-text">{prototypeDisclaimer}</span>
          </div>
        </div>
      </main>
    </Layout>
  )
}
