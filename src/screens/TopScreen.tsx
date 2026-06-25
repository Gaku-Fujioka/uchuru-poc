import type { PocStats, Property } from '../types'
import { MetricTile, MissionPills } from '../components/common'
import { stayDuration, yen } from '../utils/uchuru'

interface TopScreenProps {
  missionCompletionRate: number
  navigate: (to: string) => void
  nextAction: {
    label: string
    path: string
  }
  preRegisterSubmitted: boolean
  selectedProperty: Property | null
  stats: PocStats
  surveyComplete: boolean
}

export function TopScreen({
  missionCompletionRate,
  navigate,
  nextAction,
  preRegisterSubmitted,
  selectedProperty,
  stats,
  surveyComplete,
}: TopScreenProps) {
  return (
    <section className="page home-page app-home">
      <header className="home-app-header">
        <div>
          <p className="eyebrow">Osaka Life Experiment</p>
          <h1>大阪生活実験ノート</h1>
          <p>
            1週間だけ大阪に住んでみるための、滞在先・生活ミッション・振り返りをここから進めます。
          </p>
        </div>
        <button
          className="button primary"
          onClick={() => navigate(nextAction.path)}
          type="button"
        >
          {nextAction.label}
          <span aria-hidden="true">→</span>
        </button>
      </header>

      <div className="home-workspace">
        <section className="next-action-card">
          <span>次の一歩</span>
          <h2>{nextAction.label}</h2>
          <p>{getNextActionCopy(nextAction.path)}</p>
          <button
            className="button accent"
            onClick={() => navigate(nextAction.path)}
            type="button"
          >
            進める
            <span aria-hidden="true">→</span>
          </button>
        </section>

        <section className="experiment-state-card">
          <h2>現在の生活実験</h2>
          {selectedProperty ? (
            <div className="mini-stay-card">
              <img
                alt={`${selectedProperty.name} の滞在イメージ`}
                src={selectedProperty.imageUrl}
              />
              <div>
                <span>{selectedProperty.areaLabel}</span>
                <h3>{selectedProperty.name}</h3>
                <p>
                  {stayDuration(selectedProperty)} / 1週間{' '}
                  {yen(selectedProperty.weeklyPrice)}
                </p>
                <MissionPills missionTypes={selectedProperty.supportedMissions} />
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <h3>滞在候補はまだ選ばれていません</h3>
              <p>
                まずは、なんば・天王寺周辺から1週間の拠点を選びましょう。
              </p>
              <button
                className="button outline"
                onClick={() => navigate('/stays')}
                type="button"
              >
                滞在候補を見る
              </button>
            </div>
          )}
        </section>

        <section className="home-status-card">
          <h2>進行状況</h2>
          <div className="status-list">
            <StatusRow
              done={Boolean(selectedProperty)}
              label="滞在候補"
              value={selectedProperty?.areaLabel ?? '未選択'}
            />
            <StatusRow
              done={preRegisterSubmitted}
              label="事前登録"
              value={preRegisterSubmitted ? '完了' : '未登録'}
            />
            <StatusRow
              done={missionCompletionRate === 100}
              label="生活ミッション"
              value={`${missionCompletionRate}%`}
            />
            <StatusRow
              done={surveyComplete}
              label="振り返り"
              value={surveyComplete ? '完了' : '未回答'}
            />
          </div>
        </section>

        <section className="home-stats-card">
          <h2>実証メモ</h2>
          <p>
            uchuruは滞在件数だけでなく、生活ミッション実行率と関係人口候補化率を見ます。
          </p>
          <div className="home-metric-row">
            <MetricTile label="事前登録" value={`${stats.preRegistrations}人`} />
            <MetricTile
              label="関係人口候補化"
              value={`${stats.relationshipCandidateRate}%`}
            />
          </div>
        </section>
      </div>
    </section>
  )
}

function StatusRow({
  done,
  label,
  value,
}: {
  done: boolean
  label: string
  value: string
}) {
  return (
    <div className={`status-row ${done ? 'done' : ''}`}>
      <span>{done ? '✓' : ''}</span>
      <strong>{label}</strong>
      <p>{value}</p>
    </div>
  )
}

function getNextActionCopy(path: string) {
  if (path === '/stays') {
    return '1週間の大阪生活を試す拠点をひとつ選びます。'
  }

  if (path === '/pre-register') {
    return '選んだ滞在候補をもとに、予算・時期・使いたいミッションを登録します。'
  }

  if (path === '/missions') {
    return '働く・暮らす・関わるの体験を少しずつ完了していきます。'
  }

  if (path === '/survey') {
    return '体験後の気持ちを答えて、大阪との継続的な関わりを確認します。'
  }

  return '生活実験の結果と関係人口候補化の状態を確認します。'
}
