import { useState } from 'react'
import { missions, properties } from '../data/uchuru'
import type { MissionType } from '../types'
import { MissionPills, PageIntro, PillList } from '../components/common'
import { stayDuration, yen } from '../utils/uchuru'

interface StaysScreenProps {
  navigate: (to: string) => void
  onSelectStay: (propertyId: string, nextPath?: string) => void
  selectedPropertyId: string | null
}

export function StaysScreen({
  navigate,
  onSelectStay,
  selectedPropertyId,
}: StaysScreenProps) {
  const [filter, setFilter] = useState<MissionType | 'all'>('all')
  const filteredProperties =
    filter === 'all'
      ? properties
      : properties.filter((property) =>
          property.supportedMissions.includes(filter),
        )

  return (
    <section className="page">
      <PageIntro
        eyebrow="Trial Stays"
        lead="まずは1週間の拠点をひとつ選びます。選んだ滞在先に合わせて、事前登録とトライアルミッションがつながります。"
        title="滞在候補を選ぶ"
      />

      <div className="filter-panel">
        <p>ミッションで絞り込む</p>
        <div className="filter-row">
          <button
            className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            type="button"
          >
            すべて
          </button>
          {missions.map((mission) => (
            <button
              className={`filter-chip ${filter === mission.id ? 'active' : ''}`}
              key={mission.id}
              onClick={() => setFilter(mission.id)}
              type="button"
            >
              {mission.shortTitle}を試したい
            </button>
          ))}
        </div>
      </div>

      <div className="stay-grid">
        {filteredProperties.map((property) => (
          <article
            className={`stay-card ${
              selectedPropertyId === property.id ? 'selected' : ''
            }`}
            key={property.id}
          >
            <button
              className="stay-image-button"
              onClick={() => navigate(`/stays/${property.id}`)}
              type="button"
            >
              <img alt={`${property.name} の共用スペース`} src={property.imageUrl} />
              <span>{property.areaLabel}</span>
              <small>
                {selectedPropertyId === property.id
                  ? '選択中'
                  : property.operatorType}
              </small>
            </button>
            <div className="stay-card-body">
              <h2>{property.name}</h2>
              <p>{property.description}</p>
              <div className="fact-row">
                <span>滞在期間: {stayDuration(property)}</span>
                <strong>1週間 {yen(property.weeklyPrice)}</strong>
              </div>
              <PillList items={property.features} />
              <MissionPills missionTypes={property.supportedMissions} />
              <div className="card-actions">
                <button
                  className="button primary"
                  onClick={() => onSelectStay(property.id)}
                  type="button"
                >
                  この滞在で進める
                </button>
                <button
                  className="button outline"
                  onClick={() => navigate(`/stays/${property.id}`)}
                  type="button"
                >
                  詳細を見る
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
