import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { BubbleBackground } from '../components/BubbleBackground'
import { WaveDivider } from '../components/WaveDivider'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { evidenceItems } from '../data/evidence'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function HomePage() {
  return (
    <Layout>
      <main>
        {/* ── Hero ── */}
        <section className="hero">
          <BubbleBackground />
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Interactive reef simulation
            </span>
            <h1 className="hero-title">
              Explore how <span className="highlight">Philippine reefs</span> respond to pressure.
            </h1>
            <p className="hero-desc">
              ReefPulse PH models 16 connected reef zones across 12 months, combining heat
              stress, fishing pressure, siltation, and direct damage into one interactive
              simulation — so you can see cause and effect in real time.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/simulate">
                🧪 Launch Simulation
              </Link>
              <a className="btn btn-secondary" href="#problem">
                Learn More ↓
              </a>
            </div>
          </motion.div>

          <div className="stats-row">
            {[
              { icon: '🗺️', end: 16, suffix: ' zones', label: 'Connected reef cells tracked' },
              { icon: '📅', end: 12, suffix: ' months', label: 'Time-step simulation depth' },
              { icon: '⚡', end: 5, suffix: ' pressures', label: 'Heat, fishing, silt, damage, recovery' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <WaveDivider />

        {/* ── The Problem ── */}
        <section className="section" id="problem">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">🐠 The ecological crisis</span>
            <h2 className="section-title">Philippine reefs are under compounding stress.</h2>
            <p className="section-desc">
              Heat stress, sediment runoff, direct physical damage, and overfishing don't happen
              in isolation — they interact, amplify each other, and ripple across connected reef
              zones. Static reports capture snapshots, but they can't show the cascading effects
              that unfold over time.
            </p>
          </motion.div>

          <div className="about-grid">
            {[
              {
                icon: '🌡️',
                title: 'Rising water temperatures',
                body: 'Ocean surface temperatures around Philippine waters have been steadily climbing, triggering mass bleaching events that weaken even the healthiest reefs.',
              },
              {
                icon: '🏗️',
                title: 'Coastal development & runoff',
                body: 'Mining runoff, construction sediment, and agricultural pollution smother corals and block sunlight from reaching reef ecosystems.',
              },
              {
                icon: '🎣',
                title: 'Overfishing & destructive methods',
                body: 'Intensive fishing reduces fish populations that keep reef algae in check, while practices like dynamite fishing cause direct structural damage.',
              },
              {
                icon: '⚓',
                title: 'Physical reef damage',
                body: 'Anchoring, vessel grounding, and storm events physically break coral structures, creating damage that takes decades to recover from.',
              },
            ].map((item, i) => (
              <motion.article
                key={item.title}
                className="about-card glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="about-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <WaveDivider flip />

        {/* ── Evidence ── */}
        <section className="section">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">📰 Evidence from the field</span>
            <h2 className="section-title">Recent reporting confirms the urgency.</h2>
            <p className="section-desc">
              These are real stories from Philippine and international news showing that reef decline
              is not theoretical — it is actively happening.
            </p>
          </motion.div>

          <div className="evidence-grid">
            {evidenceItems.map((item, i) => (
              <motion.article
                key={item.title}
                className="evidence-card glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <span className="source-badge">📄 {item.source}</span>
                <span className="date-chip">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <a
                  className="read-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read source →
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <WaveDivider />

        {/* ── How It Works ── */}
        <section className="section">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">⚙️ How it works</span>
            <h2 className="section-title">Three steps to understand reef risk.</h2>
            <p className="section-desc">
              You don't need marine biology expertise. The simulation guides you through
              adjusting pressures, running the model, and reading the results.
            </p>
          </motion.div>

          <div className="steps-grid">
            {[
              {
                num: '01',
                title: 'Set the pressures',
                body: 'Use sliders to dial heat stress, fishing intensity, siltation, direct damage, and your restoration budget.',
              },
              {
                num: '02',
                title: 'Run 12 months',
                body: 'The engine updates 16 connected reef cells month by month, factoring in neighbor effects and recovery capacity.',
              },
              {
                num: '03',
                title: 'Read the outcome',
                body: 'View reef health scores, bleaching risk, fish habitat quality, and see which zones need intervention first.',
              },
            ].map((step, i) => (
              <motion.article
                key={step.num}
                className="step-card glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="step-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section
          className="cta-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Ready to explore?</h2>
          <p className="section-desc">
            Jump into the simulation and see how different pressures shape reef
            outcomes across 16 connected zones.
          </p>
          <Link className="btn btn-primary" to="/simulate" style={{ marginTop: 8 }}>
            🧪 Open the Simulation
          </Link>
        </motion.section>
      </main>
    </Layout>
  )
}
