import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const HomePage = lazy(async () => {
  const module = await import('./pages/HomePage')
  return { default: module.HomePage }
})

const SimulationPage = lazy(async () => {
  const module = await import('./pages/SimulationPage')
  return { default: module.SimulationPage }
})

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/simulate" element={<SimulationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
