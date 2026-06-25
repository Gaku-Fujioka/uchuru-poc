import { properties, spots } from '../data/uchuru'
import type { MissionProgress, Property, RouteId, Spot } from '../types'

export function normalizePath(path: string) {
  if (!path || path === '/index.html') return '/'
  return path.replace(/\/$/, '') || '/'
}

export function routeFromPath(path: string): RouteId {
  if (path === '/') return 'top'
  if (path.startsWith('/stays')) return 'stays'
  if (path === '/missions') return 'missions'
  if (path === '/pre-register') return 'pre-register'
  if (path === '/survey') return 'survey'
  if (path === '/poc-dashboard') return 'poc-dashboard'
  return 'top'
}

export function propertyFromPath(pathname: string) {
  const id = pathname.startsWith('/stays/')
    ? pathname.split('/').filter(Boolean)[1]
    : properties[0].id
  return properties.find((property) => property.id === id) ?? properties[0]
}

export function yen(value: number) {
  return `${value.toLocaleString('ja-JP')}円`
}

export function completionFromProgress(progress: MissionProgress) {
  const completed = completedSteps(progress)
  return Math.round((completed / 4) * 100)
}

export function completedSteps(progress: MissionProgress) {
  return (
    Number(progress.workCompleted) +
    Math.min(progress.liveCompletedCount, 2) +
    Number(progress.connectCompleted)
  )
}

export function spotsByIds(ids: string[]): Spot[] {
  return spots.filter((spot) => ids.includes(spot.id))
}

export function stayDuration(property: Property) {
  const min = property.minStayDays === 7 ? '1週間' : `${property.minStayDays}日`
  const max = property.maxStayDays >= 30 ? '1ヶ月' : `${property.maxStayDays}日`
  return `${min}〜${max}`
}
