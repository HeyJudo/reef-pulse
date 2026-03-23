import { NavLink, type NavLinkProps } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

const navClassName: NavLinkProps['className'] = ({ isActive }) =>
  `nav-chip${isActive ? ' nav-chip--active' : ''}`

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">🌊</div>
          <div>
            <span className="brand-title">ReefPulse PH</span>
            <span className="brand-subtitle">Big Data reef-risk dashboard</span>
          </div>
        </div>
        <nav className="nav-links" aria-label="Primary">
          <NavLink className={navClassName} to="/" end>
            Overview
          </NavLink>
          <NavLink className={navClassName} to="/simulate">
            Data Explorer
          </NavLink>
        </nav>
      </header>
      {children}
    </div>
  )
}
