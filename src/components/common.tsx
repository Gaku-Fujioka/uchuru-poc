import { missionLabels } from '../data/uchuru'
import type { MissionType } from '../types'

export function PageIntro({
  eyebrow,
  lead,
  title,
}: {
  eyebrow: string
  lead: string
  title: string
}) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{lead}</p>
    </header>
  )
}

export function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-tile">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export function PillList({ items }: { items: string[] }) {
  return (
    <div className="pill-list">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}

export function MissionPills({
  missionTypes,
}: {
  missionTypes: MissionType[]
}) {
  return (
    <div className="mission-pill-row">
      {missionTypes.map((missionType) => (
        <span className={`mission-pill ${missionType}`} key={missionType}>
          {missionLabels[missionType]}
        </span>
      ))}
    </div>
  )
}
