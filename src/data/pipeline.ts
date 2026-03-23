export const pipelineStages = [
  {
    num: '01',
    tag: 'INGEST',
    title: 'Satellite SST ingestion',
    body: 'Pull 10+ years of daily NOAA OISST v2.1 sea-surface temperature grids at 0.25° resolution for Philippine waters — ~38.7 million readings.',
    icon: '📡',
  },
  {
    num: '02',
    tag: 'MAP',
    title: 'Benthic classification',
    body: 'Overlay Allen Coral Atlas habitat maps derived from Sentinel-2 imagery — classifying coral, algae, sand, and rubble across 2,500 km² of reef area.',
    icon: '🗺️',
  },
  {
    num: '03',
    tag: 'ENRICH',
    title: 'eDNA biodiversity layer',
    body: 'Integrate environmental DNA metabarcoding surveys — 100M+ molecular reads identifying species composition without physical capture.',
    icon: '🧬',
  },
  {
    num: '04',
    tag: 'MODEL',
    title: 'Multi-zone projection',
    body: 'Feed combined datasets into a connected reef health model with 16 zones and 12-month time-step projections under variable pressure scenarios.',
    icon: '⚙️',
  },
]

export const heroStats = [
  { icon: '📡', end: 38.7, suffix: 'M', label: 'NOAA SST readings ingested', decimals: 1 },
  { icon: '🗺️', end: 2500, suffix: ' km²', label: 'Coral coverage mapped via satellite', decimals: 0 },
  { icon: '🧬', end: 100, suffix: 'M+', label: 'eDNA molecular reads processed', decimals: 0 },
]

export const dataProvenance = [
  { icon: '📡', label: 'SST Source', value: 'NOAA OISST v2.1 (2015–2025)' },
  { icon: '🗺️', label: 'Benthic', value: 'Allen Coral Atlas — Sentinel-2' },
  { icon: '🧬', label: 'Biodiversity', value: 'eDNA metabarcoding (PhilBio)' },
]

export const modelConfidence = {
  score: 94.2,
  margin: 2.1,
}

export const prototypeDisclaimer =
  'This is a prototype demonstration of the proposed ReefPulse PH visualization dashboard. ' +
  'The Big Data pipeline (NOAA OISST ingestion, Allen Coral Atlas mapping, eDNA enrichment) ' +
  'is theoretical — illustrating what a full deployment would deliver. The simulation engine ' +
  'runs client-side with representative reef data for demonstration purposes, not live satellite feeds.'
