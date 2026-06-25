import { surveyQuestions } from '../data/uchuru'
import { PageIntro } from '../components/common'

interface SurveyScreenProps {
  answers: Record<string, string>
  complete: boolean
  isRelationshipCandidate: boolean
  navigate: (to: string) => void
  setAnswers: (answers: Record<string, string>) => void
  setComplete: (complete: boolean) => void
  setStep: (step: number) => void
  step: number
}

export function SurveyScreen({
  answers,
  complete,
  isRelationshipCandidate,
  navigate,
  setAnswers,
  setComplete,
  setStep,
  step,
}: SurveyScreenProps) {
  const question = surveyQuestions[step]
  const selected = answers[question.id]

  const answerQuestion = (value: string) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const goNext = () => {
    if (!selected) return
    if (step === surveyQuestions.length - 1) {
      setComplete(true)
      return
    }
    setStep(step + 1)
  }

  const resetSurvey = () => {
    setAnswers({})
    setComplete(false)
    setStep(0)
  }

  return (
    <section className="page survey-page">
      <PageIntro
        eyebrow="After Stay"
        lead="大阪での生活はいかがでしたか？体験を振り返ってみましょう。"
        title="滞在後アンケート"
      />

      {!complete ? (
        <section className="survey-card">
          <div
            aria-label={`質問 ${step + 1} / ${surveyQuestions.length}`}
            className="stepper"
          >
            {surveyQuestions.map((item, index) => (
              <span className={index <= step ? 'active' : ''} key={item.id}>
                {index + 1}
              </span>
            ))}
          </div>
          <h2>{question.text}</h2>
          <div className="answer-stack">
            {question.options.map(([value, label]) => (
              <button
                className={`answer-option ${selected === value ? 'selected' : ''}`}
                key={value}
                onClick={() => answerQuestion(value)}
                type="button"
              >
                <span aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <div className="survey-actions">
            <button
              className="button ghost"
              disabled={step === 0}
              onClick={() => setStep(Math.max(0, step - 1))}
              type="button"
            >
              戻る
            </button>
            <button
              className="button primary"
              disabled={!selected}
              onClick={goNext}
              type="button"
            >
              {step === surveyQuestions.length - 1 ? '結果を見る' : '次へ'}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      ) : (
        <section className="result-panel">
          <p className="eyebrow">診断完了</p>
          <h2>
            {isRelationshipCandidate
              ? 'あなたは「大阪の関係人口候補」です'
              : '大阪との関わり方をこれから探せます'}
          </h2>
          <p>
            {isRelationshipCandidate
              ? '地域文化への好奇心とつながりを求める姿勢は、大阪との継続的な関係を築く可能性を示しています。'
              : '今回の体験を出発点に、次に試したい暮らし方や地域接点を少しずつ探せます。'}
          </p>
          <div className="action-row">
            <button
              className="button primary"
              onClick={() => navigate('/poc-dashboard')}
              type="button"
            >
              生活実験の結果を見る
            </button>
            <button className="button outline" onClick={resetSurvey} type="button">
              回答し直す
            </button>
          </div>
        </section>
      )}
    </section>
  )
}
