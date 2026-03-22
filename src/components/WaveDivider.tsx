export function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`wave-divider${flip ? ' wave-divider--flip' : ''}`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
        <path
          d="M0 40C240 70 480 10 720 40C960 70 1200 10 1440 40V80H0V40Z"
          fill="rgba(0, 180, 216, 0.06)"
        />
        <path
          d="M0 50C240 75 480 25 720 50C960 75 1200 25 1440 50V80H0V50Z"
          fill="rgba(0, 119, 182, 0.04)"
        />
      </svg>
    </div>
  )
}
