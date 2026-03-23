import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { BubbleBackground } from '../components/BubbleBackground'
import {
  ActivitySquareIcon,
  AnchorIcon,
  BadgeDollarIcon,
  DatabaseIcon,
  FactoryIcon,
  ShieldCheckIcon,
  ThermometerIcon,
} from '../components/LandingIcons'
import { Layout } from '../components/Layout'
import { WaveDivider } from '../components/WaveDivider'
import { evidenceItems } from '../data/evidence'
import { heroStats, pipelineStages, prototypeDisclaimer } from '../data/pipeline'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const crisisCards = [
  {
    icon: ThermometerIcon,
    title: '293 Marine Heatwave Days',
    body: 'Driven by El Nino, regions like Lingayen Gulf endure devastating temperature spikes that trigger multi-species mortality across vulnerable coral networks (DOST/UPMSI).',
    sources: [
      {
        label: 'DOST / PCAARRD',
        href: 'https://www.pcaarrd.dost.gov.ph/index.php/quick-information-dispatch-qid-articles/boosting-coral-reef-resilience-through-marine-heatwave-tracking-and-coral-reef-monitoring',
      },
      {
        label: 'Research Study',
        href: 'https://www.researchgate.net/publication/389901123_Spatiotemporal_Dynamics_of_Marine_Heatwaves_and_Ocean_Acidification_Affecting_Coral_Environments_in_the_Philippines',
      },
    ],
  },
  {
    icon: FactoryIcon,
    title: '51% Habitat Decline',
    body: `In Palawan's "last ecological frontier," unregulated nickel mining and coastal development are actively smothering pristine offshore reefs under toxic laterite siltation.`,
    sources: [
      {
        label: 'Coral Reef Initiative',
        href: 'https://cri.org/reports/broken-promises/',
      },
      {
        label: 'Palawan 2024',
        href: 'https://www.researchgate.net/publication/389571753_Palawan_UNESCO_Biosphere_Reserve_Philippines_State_of_the_Marine_Environment_2024',
      },
    ],
  },
  {
    icon: AnchorIcon,
    title: '0% in "Excellent" Condition',
    body: 'A recent nationwide assessment confirmed zero Philippine reefs remain in excellent condition, worsened by a systemic capture fishery loss of 45,000 metric tons annually.',
    sources: [
      {
        label: 'SeafoodSource',
        href: 'https://www.seafoodsource.com/news/environment-sustainability/philippine-fisheries-losing-45-000-tons-of-fish-annually-due-to-weak-law-enforcement-oceana-report-says',
      },
      {
        label: 'Inquirer 2025',
        href: 'https://newsinfo.inquirer.net/2192443/philippine-fish-production-falls-anew-in-2025-2',
      },
    ],
  },
  {
    icon: BadgeDollarIcon,
    title: '$4 Billion at Stake',
    body: 'The collapse of these ecosystems threatens the food security of a nation where over 42% of animal protein intake relies directly on rapidly declining marine resources.',
    sources: [
      {
        label: 'FINS Report',
        href: 'https://oceana.org/wp-content/uploads/sites/18/2024/09/MRAG-AP_State-of-FINS-PH_PUBLIC.pdf',
      },
      {
        label: 'Reef Valuation',
        href: "https://www.researchgate.net/publication/324139772_National_Estimates_of_Values_of_Philippine_Reefs'_Ecosystem_Services",
      },
    ],
  },
]

const solutionPillars = [
  {
    icon: DatabaseIcon,
    title: 'Translating Big Data',
    body: 'We ingest massive datasets—including nearly 100 million eDNA molecular reads, satellite sea surface temperatures, and localized siltation reports—and translate them into a unified, visual dashboard. No more drowning in static 50-page PDF reports.',
  },
  {
    icon: ActivitySquareIcon,
    title: 'Simulating Cascading Effects',
    body: "Threats don't exist in isolation. ReefPulse's predictive engine calculates how overlapping pressures interact in real-time. Watch how a slight temperature bump becomes a catastrophic bleaching event when a reef is already weakened by mining runoff.",
  },
  {
    icon: ShieldCheckIcon,
    title: 'Testing Policy Before Spending',
    body: 'We provide Local Government Units (LGUs) and NGOs with a visual "time machine." Adjust the restoration budget, simulate interventions like fishing bans or siltation controls, and mathematically prove which actions will actually save the reef before deploying limited public funds.',
  },
]

export function HomePage() {
  return (
    <Layout>
      <main>
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
              imagery, and eDNA biodiversity surveys into an interactive risk model, so
              policymakers can see which reefs will bleach <em>before</em> it happens.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/simulate">
                Open Data Explorer
              </Link>
              <a className="btn btn-secondary" href="#crisis">
                See the pipeline
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
                  decimals={stat.decimals}
                />
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <WaveDivider />

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
              The Philippines sits at the apex of the Coral Triangle, supporting 1.5M+
              livelihoods. But static monitoring is failing to capture the real-time,
              cascading threats destroying these ecosystems. Here is what the latest data
              reveals:
            </p>
          </motion.div>

          <div className="about-grid">
            {crisisCards.map((item, i) => (
              <motion.article
                key={item.title}
                className="about-card glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="about-icon">
                  <item.icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="card-sources">
                  <span className="card-sources-label">Sources</span>
                  <div className="card-source-list">
                    {item.sources.map((source) => (
                      <a
                        key={source.href}
                        className="card-source-link"
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <WaveDivider flip />

        <section className="section">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">WHERE REEFPULSE COMES INTO PLAY</span>
            <h2 className="section-title">From Big Data to Proactive Policy</h2>
            <p className="section-desc">
              ReefPulse PH turns fragmented marine evidence into an interactive front-end
              visualization layer, bridging raw ecological signals with policy-ready
              scenario testing.
            </p>
          </motion.div>

          <div className="solution-grid">
            {solutionPillars.map((pillar, i) => (
              <motion.article
                key={pillar.title}
                className="solution-card glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="solution-icon">
                  <pillar.icon />
                </div>
                <div className="solution-copy">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

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
              ReefPulse PH is the visualization layer of a 4-stage Big Data pipeline that
              transforms Earth observation data into zone-level reef risk predictions.
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
            <h2 className="section-title">Field data validates what the models predict.</h2>
            <p className="section-desc">
              Real-world reporting from Philippine and international sources confirms the
              degradation patterns our pipeline is designed to detect and forecast.
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
                <span className="source-badge">{item.source}</span>
                <span className="date-chip">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <a className="read-link" href={item.href} target="_blank" rel="noreferrer">
                  Read source
                </a>
              </motion.article>
            ))}
          </div>
        </section>

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
            Launch Data Explorer
          </Link>
        </motion.section>

        <div className="disclaimer-banner">
          <span className="disc-icon">!</span>
          <div>
            <span className="disc-label">Prototype Notice</span>
            <span className="disc-text">{prototypeDisclaimer}</span>
          </div>
        </div>
      </main>
    </Layout>
  )
}
