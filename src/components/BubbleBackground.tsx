const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 6 + Math.random() * 40,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: 10 + Math.random() * 14,
}))

export function BubbleBackground() {
  return (
    <div className="bubble-field" aria-hidden="true">
      {BUBBLES.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
