export interface FlowStep {
  id: string
  label: string
  route: string
  done: boolean
  active: boolean
  helper: string
}

interface ExperimentProgressProps {
  navigate: (to: string) => void
  nextLabel: string
  steps: FlowStep[]
}

export function ExperimentProgress({
  navigate,
  nextLabel,
  steps,
}: ExperimentProgressProps) {
  const completedCount = steps.filter((step) => step.done).length

  return (
    <section className="flow-shell" aria-label="生活実験の進行状況">
      <div className="flow-inner">
        <div className="flow-summary">
          <span>現在地</span>
          <strong>
            {completedCount}/{steps.length}
          </strong>
          <p>{nextLabel}</p>
        </div>
        <div className="flow-steps">
          {steps.map((step, index) => (
            <button
              className={`flow-step ${step.done ? 'done' : ''} ${
                step.active ? 'active' : ''
              }`}
              key={step.id}
              onClick={() => navigate(step.route)}
              type="button"
            >
              <span>{step.done ? '✓' : index + 1}</span>
              <strong>{step.label}</strong>
              <small>{step.helper}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
