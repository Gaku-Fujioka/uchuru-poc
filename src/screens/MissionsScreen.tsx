import { missions, spots } from '../data/uchuru'
import type { Mission, MissionProgress } from '../types'
import { PageIntro, PillList } from '../components/common'
import { completedSteps, completionFromProgress } from '../utils/uchuru'

interface MissionsScreenProps {
  navigate: (to: string) => void
  progress: MissionProgress
  setProgress: (progress: MissionProgress) => void
}

export function MissionsScreen({
  navigate,
  progress,
  setProgress,
}: MissionsScreenProps) {
  const completionRate = completionFromProgress(progress)

  const toggleWork = () => {
    setProgress({ ...progress, workCompleted: !progress.workCompleted })
  }

  const setLiveCount = (count: number) => {
    setProgress({ ...progress, liveCompletedCount: count })
  }

  const toggleConnect = () => {
    setProgress({ ...progress, connectCompleted: !progress.connectCompleted })
  }

  return (
    <section className="page missions-page">
      <PageIntro
        eyebrow="Life Missions"
        lead="大阪での新しい生活を少しずつ体験してみましょう。焦らず、自分のペースで街の空気を感じてください。"
        title="大阪生活実感ミッション"
      />

      <section className="progress-panel">
        <div>
          <p>現在の進捗</p>
          <h2>4つのステップ中、{completedSteps(progress)}つ完了</h2>
        </div>
        <strong>{completionRate}%</strong>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${completionRate}%` }} />
        </div>
      </section>

      <div className="mission-action-grid">
        <article className="mission-action-card">
          <MissionCardHeader mission={missions[0]} />
          <p>{missions[0].description}</p>
          <button
            className={`button full ${progress.workCompleted ? 'done' : 'primary'}`}
            onClick={toggleWork}
            type="button"
          >
            {progress.workCompleted ? '体験済み' : '体験した'}
          </button>
        </article>

        <article className="mission-action-card">
          <MissionCardHeader mission={missions[1]} />
          <p>{missions[1].description}</p>
          <div className="check-stack">
            {[1, 2].map((count) => (
              <button
                className={`check-row ${
                  progress.liveCompletedCount >= count ? 'checked' : ''
                }`}
                key={count}
                onClick={() =>
                  setLiveCount(
                    progress.liveCompletedCount >= count ? count - 1 : count,
                  )
                }
                type="button"
              >
                <span aria-hidden="true" />
                {count}か所目完了
              </button>
            ))}
          </div>
        </article>

        <article className="mission-action-card">
          <MissionCardHeader mission={missions[2]} />
          <p>{missions[2].description}</p>
          <button
            className={`button full ${
              progress.connectCompleted ? 'done' : 'primary'
            }`}
            onClick={toggleConnect}
            type="button"
          >
            {progress.connectCompleted ? '体験済み' : '体験した'}
          </button>
        </article>
      </div>

      <section className="spot-guide">
        <div className="section-heading">
          <p className="eyebrow">Spot Ideas</p>
          <h2>おすすめスポット例</h2>
        </div>
        <div className="spot-list">
          {spots.map((spot) => (
            <article className="spot-item" key={spot.id}>
              <span>{spot.category}</span>
              <h3>{spot.name}</h3>
              <p>{spot.description}</p>
              <PillList items={spot.tags} />
            </article>
          ))}
        </div>
      </section>

      <section className="survey-callout">
        <h2>
          {completionRate === 100
            ? 'ミッション完了。振り返りへ進みましょう。'
            : 'まずは4つのステップを完了しましょう。'}
        </h2>
        <p>
          {completionRate === 100
            ? 'あなたの体験や感想が、今後のより良いサポートにつながります。'
            : `現在の進捗は${completionRate}%です。働く・暮らす・関わるを体験すると振り返りに進めます。`}
        </p>
        <button
          className="button accent"
          disabled={completionRate < 100}
          onClick={() => navigate('/survey')}
          type="button"
        >
          振り返りに回答する
        </button>
      </section>
    </section>
  )
}

function MissionCardHeader({ mission }: { mission: Mission }) {
  return (
    <div className="mission-card-header">
      <div className={`mission-stamp ${mission.id}`}>{mission.marker}</div>
      <span>
        {mission.marker}. {mission.shortTitle}
      </span>
      <h2>{mission.title}</h2>
    </div>
  )
}
