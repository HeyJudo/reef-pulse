import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { BubbleBackground } from '../components/BubbleBackground'
import { WaveDivider } from '../components/WaveDivider'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { evidenceItems } from '../data/evidence'
import { pipelineStages, heroStats, prototypeDisclaimer } from '../data/pipeline'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function HomePage() {
  return (
    <Layout>
      <main>
        {/* ── Hero: The Hook ── */}
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
              Powered by 38.7M+ data points
            </span>
            <h1 className="hero-title">
              Philippine reefs are dying.{' '}
              <span className="highlight">We built the dashboard to fight back.</span>
            </h1>
            <p className="hero-desc">
              ReefPulse PH transforms a decade of NOAA satellite data, Allen Coral Atlas
              imagery, and eDNA biodiversity surveys into an interactive risk model — so
              policymakers can see which reefs will bleach <em>before</em> it happens.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/simulate">
                🔬 Open Data Explorer
              </Link>
              <a className="btn btn-secondary" href="#crisis">
                See the pipeline ↓
              </a>
            </div>
          </motion.div>

          <div className="stats-row">
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  duration={1400}
                />
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <WaveDivider />

        {/* ── The Crisis ── */}
        <section className="section" id="crisis">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">THE CRISIS</span>
            <h2 className="section-title">
              The Coral Triangle is collapsing under compounding pressures.
            </h2>
            <p className="section-desc">
              The Philippines sits at the center of the world's most biodiverse marine
              region. Its reefs support 25% of all marine fish species and the livelihoods
              of 1.5M+ Filipino fishers — but they face simultaneous threats that static
              monitoring cannot capture.
            </p>
          </motion.div>

          <div className="about-grid">
            {[
              {
                icon: '🌡️',
                title: '+1.2°C since 1990',
                body: 'Sea surface temperature anomaly in Philippine waters, triggering mass bleaching events cascading across connected reef networks.',
              },
              {
                icon: '🏗️',
                title: '47% of rivers at critical load',
                body: 'Mining and agricultural runoff delivers sediment that smothers coral polyps and blocks photosynthesis across coastal reef systems.',
              },
              {
                icon: '🎣',
                title: '60% of sites overharvested',
                body: 'Herbivorous fish removal lets algae outcompete slow-growing coral. Dynamite and cyanide fishing cause irreversible structural damage.',
              },
              {
                icon: '⚓',
                title: '3,000+ hectares damaged per decade',
                body: 'Anchoring, vessel grounding, and storm events physically break coral structures that take 20–50 years to recover.',
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

        {/* ── The Pipeline ── */}
        <section className="section">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">THE PIPELINE</span>
            <h2 className="section-title">
              From raw satellite feeds to actionable reef forecasts.
            </h2>
            <p className="section-desc">
              ReefPulse PH is the visualization layer of a 4-stage Big Data pipeline
              that transforms Earth observation data into zone-level reef risk predictions.
            </p>
          </motion.div>

          <div className="pipeline-flow">
            {pipelineStages.map((stage, i) => (
              <motion.article
                key={stage.tag}
                className="pipeline-card glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="pipeline-tag">{stage.tag}</span>
                <div className="step-number">{stage.num}</div>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <WaveDivider />

        {/* ── Ground Truth ── */}
        <section className="section">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">GROUND TRUTH</span>
            <h2 className="section-title">
              Field data validates what the models predict.
            </h2>
            <p className="section-desc">
              Real-world reporting from Philippine and international sources confirms
              the degradation patterns our pipeline is designed to detect and forecast.
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

        {/* ── CTA ── */}
        <motion.section
          className="cta-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Explore the data yourself.</h2>
          <p className="section-desc">
            Open the Data Explorer to adjust pressure scenarios and see how reef health,
            bleaching risk, and fish habitat shift across 16 connected zones in real time.
          </p>
          <Link className="btn btn-primary" to="/simulate" style={{ marginTop: 8 }}>
            🔬 Launch Data Explorer
          </Link>
        </motion.section>

        {/* ── Prototype Disclaimer ── */}
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
