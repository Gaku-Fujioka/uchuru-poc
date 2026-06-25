import type { MouseEvent } from 'react'
import { BrandLogo } from './BrandLogo'
import {
  bottomNavItems,
  navItems,
  routeIcons,
  routeLabels,
  routePaths,
} from '../data/uchuru'
import type { RouteId } from '../types'

interface NavigationProps {
  activeRoute: RouteId
  navigate: (to: string) => void
  nextAction?: {
    label: string
    path: string
  }
}

export function Header({ activeRoute, navigate, nextAction }: NavigationProps) {
  const action = nextAction ?? {
    label: '次のステップ',
    path: '/stays',
  }

  return (
    <header className="topbar">
      <a
        aria-label="トップへ"
        className="brand"
        href="/"
        onClick={(event) => handleInternalLink(event, '/', navigate)}
      >
        <BrandLogo />
      </a>
      <nav aria-label="主要ナビゲーション" className="desktop-nav">
        {navItems.map((item) => (
          <a
            className={`nav-link ${activeRoute === item ? 'active' : ''}`}
            href={routePaths[item]}
            key={item}
            onClick={(event) =>
              handleInternalLink(event, routePaths[item], navigate)
            }
          >
            {routeLabels[item]}
          </a>
        ))}
      </nav>
      <a
        className="topbar-cta"
        href={action.path}
        onClick={(event) =>
          handleInternalLink(event, action.path, navigate)
        }
      >
        {action.label}
      </a>
    </header>
  )
}

export function BottomNav({ activeRoute, navigate }: NavigationProps) {
  return (
    <nav aria-label="モバイルナビゲーション" className="bottom-nav">
      {bottomNavItems.map((item) => (
        <a
          className={`bottom-nav-link ${activeRoute === item ? 'active' : ''}`}
          href={routePaths[item]}
          key={item}
          onClick={(event) =>
            handleInternalLink(event, routePaths[item], navigate)
          }
        >
          <span aria-hidden="true" className="nav-icon">
            {routeIcons[item]}
          </span>
          <span>{routeLabels[item]}</span>
        </a>
      ))}
    </nav>
  )
}

function handleInternalLink(
  event: MouseEvent<HTMLAnchorElement>,
  to: string,
  navigate: (to: string) => void,
) {
  event.preventDefault()
  navigate(to)
}
