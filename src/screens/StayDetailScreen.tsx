import { missions } from '../data/uchuru'
import type { Property } from '../types'
import { MetricTile, PageIntro, PillList } from '../components/common'
import { spotsByIds, stayDuration, yen } from '../utils/uchuru'

interface StayDetailScreenProps {
  navigate: (to: string) => void
  onSelectStay: (propertyId: string, nextPath?: string) => void
  property: Property
  selectedPropertyId: string | null
}

export function StayDetailScreen({
  navigate,
  onSelectStay,
  property,
  selectedPropertyId,
}: StayDetailScreenProps) {
  const nearbySpots = spotsByIds(property.nearbySpotIds)
  const supportedMissions = missions.filter((mission) =>
    property.supportedMissions.includes(mission.id),
  )

  return (
    <section className="page detail-page">
      <button
        className="back-link"
        onClick={() => navigate('/stays')}
        type="button"
      >
        ← 住んでみる候補に戻る
      </button>

      <section
        className="detail-hero"
        style={{ backgroundImage: `url(${property.imageUrl})` }}
      >
        <div>
          <p>{property.areaLabel.toUpperCase()} AREA</p>
          <h1>
            {property.areaLabel}で働く・暮らす・関わるを
            1週間試せる滞在先
          </h1>
        </div>
      </section>

      <div className="detail-layout">
        <section className="detail-main">
          <PageIntro
            eyebrow={property.operatorType}
            lead={property.description}
            title={property.name}
          />
          <div className="detail-facts">
            <MetricTile label="エリア" value={property.areaLabel} />
            <MetricTile label="滞在期間" value={stayDuration(property)} />
            <MetricTile label="1週間" value={yen(property.weeklyPrice)} />
          </div>

          <section className="section-block compact">
            <div className="section-heading">
              <p className="eyebrow">Missions</p>
              <h2>この滞在でできる大阪トライアルミッション</h2>
            </div>
            <div className="mission-detail-grid">
              {supportedMissions.map((mission) => (
                <article className="mission-detail" key={mission.id}>
                  <div className={`mission-stamp ${mission.id}`}>
                    {mission.marker}
                  </div>
                  <h3>
                    {mission.shortTitle} ({mission.id})
                  </h3>
                  <p>{mission.description}</p>
                  <small>検証: {mission.verifies}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block compact">
            <div className="section-heading">
              <p className="eyebrow">Local Spots</p>
              <h2>周辺の生活スポット</h2>
            </div>
            <div className="spot-list">
              {nearbySpots.map((spot) => (
                <article className="spot-item" key={spot.id}>
                  <span>{spot.category}</span>
                  <h3>{spot.name}</h3>
                  <p>{spot.description}</p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <aside className="detail-side">
          <section className="side-panel">
            {selectedPropertyId === property.id && (
              <p className="selection-badge">この滞在を選択中</p>
            )}
            <h2>{property.areaLabel}での大阪トライアル</h2>
            <p>{property.address}</p>
            <PillList items={property.features} />
            <button
              className="button primary full"
              onClick={() => onSelectStay(property.id)}
              type="button"
            >
              この滞在で進める
            </button>
            <a
              className="button outline full"
              href={property.operatorPageUrl}
              rel="noreferrer"
              target="_blank"
            >
              事業者ページを見る
            </a>
            <button
              className="button ghost full"
              onClick={() => navigate('/stays')}
              type="button"
            >
              他の候補を見る
            </button>
          </section>

          <section className="operation-note">
            <h2>運営体制について</h2>
            <dl>
              <div>
                <dt>uchuru 担当</dt>
                <dd>トライアルミッション、滞在UX、アンケート分析。</dd>
              </div>
              <div>
                <dt>運営事業者 担当</dt>
                <dd>利用条件、料金のやり取り、鍵の受け渡し、清掃などの施設運営。</dd>
              </div>
            </dl>
            <p>{property.legalNote}</p>
          </section>
        </aside>
      </div>
    </section>
  )
}
