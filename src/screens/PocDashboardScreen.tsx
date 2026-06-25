import type { PocStats } from '../types'
import { MetricTile, PageIntro } from '../components/common'

interface PocDashboardScreenProps {
  missionCompletionRate: number
  stats: PocStats
  surveyComplete: boolean
}

export function PocDashboardScreen({
  missionCompletionRate,
  stats,
  surveyComplete,
}: PocDashboardScreenProps) {
  const funnelItems = [
    ['事前登録', stats.preRegistrations, '人'],
    ['問い合わせ', stats.inquiries, '件'],
    ['実滞在予定', stats.plannedStays, '件'],
    ['ミッション実行', stats.missionCompletionRate, '%'],
    ['関係人口候補', stats.relationshipCandidateRate, '%'],
  ] as const

  return (
    <section className="page dashboard-page">
      <PageIntro
        eyebrow="Dashboard"
        lead="大阪トライアルにおけるユーザーエンゲージメントと関係人口候補化の推移を可視化します。"
        title="大阪トライアルの結果"
      />

      <div className="dashboard-grid">
        <section className="big-stat mission-stat">
          <p>ミッション完了率</p>
          <strong>{stats.missionCompletionRate}%</strong>
          <span>
            参加ユーザーの67%が地域とのエンゲージメントミッションを完了し、
            泊まるだけを超えた参加意欲を示しています。
          </span>
        </section>
        <section className="big-stat relationship-stat">
          <p>関係人口候補化率</p>
          <strong>{stats.relationshipCandidateRate}%</strong>
          <span>
            滞在後アンケートに基づく、継続的な関係人口候補への
            コンバージョン率。
          </span>
        </section>
        <MetricTile label="営業目標" value={`${stats.salesTargets}件`} />
        <MetricTile label="提携事業者" value={`${stats.partnerOperators}社`} />
        <MetricTile label="掲載予定" value={`${stats.listedRooms}室`} />
        <MetricTile label="再訪希望" value={`${stats.revisitHope}人`} />
        <MetricTile label="長期滞在希望" value={`${stats.longerStayHope}人`} />
      </div>

      <section className="funnel-section">
        <div className="section-heading">
          <p className="eyebrow">Relationship Funnel</p>
          <h2>ユーザー行動ファネル</h2>
        </div>
        <div className="funnel-list">
          {funnelItems.map(([label, value, suffix], index) => (
            <article className="funnel-item" key={label}>
              <span className={index === funnelItems.length - 1 ? 'accent' : ''}>
                {index + 1}
              </span>
              <div>
                <h3>{label}</h3>
                <p>
                  {value}
                  {suffix}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-note">
        <h2>発表デモで伝えること</h2>
        <p>
          uchuruは、滞在件数だけでなく、トライアルミッション実行率と
          関係人口候補化率を検証します。
        </p>
        <p>
          あなたの現在のミッション進捗は {missionCompletionRate}%。
          {surveyComplete
            ? ' 滞在後アンケートの結果もダッシュボードに反映されています。'
            : ' アンケートに回答すると関係人口候補の判定まで確認できます。'}
        </p>
      </section>
    </section>
  )
}
