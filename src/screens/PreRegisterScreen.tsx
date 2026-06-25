import { useState } from 'react'
import type { FormEvent } from 'react'
import { missions } from '../data/uchuru'
import type { MissionType, PreRegisterForm, Property } from '../types'
import { PageIntro } from '../components/common'
import { stayDuration, yen } from '../utils/uchuru'

interface PreRegisterScreenProps {
  navigate: (to: string) => void
  selectedProperty: Property | null
  submitted: boolean
  setSubmitted: (submitted: boolean) => void
}

export function PreRegisterScreen({
  navigate,
  selectedProperty,
  submitted,
  setSubmitted,
}: PreRegisterScreenProps) {
  const [form, setForm] = useState<PreRegisterForm>({
    ageRange: '20s',
    attribute: 'nomad',
    reason: '',
    desiredDuration: 'one-week',
    desiredTiming: '',
    budgetMax: '',
    paidStayIntent: 'maybe',
    contact: '',
  })
  const [desiredMissions, setDesiredMissions] = useState<MissionType[]>([
    'work',
    'connect',
  ])

  const updateField = (field: keyof PreRegisterForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const toggleMission = (missionType: MissionType) => {
    setDesiredMissions((current) =>
      current.includes(missionType)
        ? current.filter((item) => item !== missionType)
        : [...current, missionType],
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  if (!selectedProperty) {
    return (
      <section className="page form-page">
        <PageIntro
          eyebrow="Step 2"
          lead="事前登録の前に、1週間の生活実験で使う滞在候補をひとつ選びます。"
          title="先に滞在候補を選びましょう"
        />
        <section className="success-panel">
          <h2>まだ滞在先が選ばれていません。</h2>
          <p>
            なんば・天王寺周辺の候補から、試してみたい暮らしの拠点を選んでください。
          </p>
          <button
            className="button primary"
            onClick={() => navigate('/stays')}
            type="button"
          >
            滞在候補を選ぶ
          </button>
        </section>
      </section>
    )
  }

  if (submitted) {
    return (
      <section className="page form-page">
        <PageIntro
          eyebrow="Step 2 Complete"
          lead="登録内容を受け付けました。次は、大阪で実際に試す生活ミッションへ進みます。"
          title="事前登録ありがとうございます"
        />
        <section className="success-panel">
          <p className="eyebrow">Selected Stay</p>
          <h2>{selectedProperty.name}</h2>
          <p>
            {selectedProperty.areaLabel} / {stayDuration(selectedProperty)} / 1週間{' '}
            {yen(selectedProperty.weeklyPrice)}
          </p>
          <div className="success-points">
            <span>予算と時期の検証</span>
            <span>有料滞在意思の検証</span>
            <span>使いたいミッションの検証</span>
          </div>
          <button
            className="button primary"
            onClick={() => navigate('/missions')}
            type="button"
          >
            生活ミッションへ進む
            <span aria-hidden="true">→</span>
          </button>
        </section>
      </section>
    )
  }

  return (
    <section className="page form-page">
      <PageIntro
        eyebrow="Step 2"
        lead={`${selectedProperty.areaLabel}の滞在候補をもとに、予算・時期・使いたいミッションを登録します。`}
        title="事前登録"
      />

      <section className="selected-context">
        <img alt={`${selectedProperty.name} の滞在イメージ`} src={selectedProperty.imageUrl} />
        <div>
          <span>選択中の滞在</span>
          <h2>{selectedProperty.name}</h2>
          <p>
            {selectedProperty.areaLabel} / {stayDuration(selectedProperty)} / 1週間{' '}
            {yen(selectedProperty.weeklyPrice)}
          </p>
        </div>
      </section>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            年齢
            <select
              onChange={(event) => updateField('ageRange', event.target.value)}
              value={form.ageRange}
            >
              <option value="under-20">20歳未満</option>
              <option value="20s">20代</option>
              <option value="30s">30代</option>
              <option value="40-plus">40代以上</option>
            </select>
          </label>

          <label>
            属性
            <select
              onChange={(event) => updateField('attribute', event.target.value)}
              value={form.attribute}
            >
              <option value="student">学生</option>
              <option value="worker">社会人</option>
              <option value="international">外国人</option>
              <option value="nomad">ノマド</option>
              <option value="other">その他</option>
            </select>
          </label>
        </div>

        <label>
          大阪に住んでみたい理由
          <textarea
            onChange={(event) => updateField('reason', event.target.value)}
            placeholder="例: 大阪で働きながら暮らす感覚を試したい"
            value={form.reason}
          />
        </label>

        <fieldset>
          <legend>希望滞在期間</legend>
          <div className="choice-row">
            {[
              ['one-week', '1週間'],
              ['two-weeks', '2週間'],
              ['one-month', '1ヶ月'],
            ].map(([value, label]) => (
              <label className="choice-pill" key={value}>
                <input
                  checked={form.desiredDuration === value}
                  name="desiredDuration"
                  onChange={() => updateField('desiredDuration', value)}
                  type="radio"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-grid">
          <label>
            希望時期
            <input
              onChange={(event) =>
                updateField('desiredTiming', event.target.value)
              }
              placeholder="例: 2026年秋"
              value={form.desiredTiming}
            />
          </label>
          <label>
            予算上限
            <input
              inputMode="numeric"
              onChange={(event) => updateField('budgetMax', event.target.value)}
              placeholder="例: 60000"
              value={form.budgetMax}
            />
          </label>
        </div>

        <fieldset>
          <legend>実際に有料で滞在する意思</legend>
          <div className="radio-stack">
            {[
              ['yes', 'はい、ぜひ参加したい'],
              ['maybe', '条件が合えば参加したい'],
              ['info', '今回は見送るが情報は欲しい'],
            ].map(([value, label]) => (
              <label key={value}>
                <input
                  checked={form.paidStayIntent === value}
                  name="paidStayIntent"
                  onChange={() => updateField('paidStayIntent', value)}
                  type="radio"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>使いたいミッション</legend>
          <div className="checkbox-grid">
            {missions.map((mission) => (
              <label key={mission.id}>
                <input
                  checked={desiredMissions.includes(mission.id)}
                  onChange={() => toggleMission(mission.id)}
                  type="checkbox"
                />
                <span>
                  {mission.shortTitle}: {mission.title}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          連絡先
          <input
            onChange={(event) => updateField('contact', event.target.value)}
            placeholder="mail@example.com"
            type="email"
            value={form.contact}
          />
        </label>

        <button className="button primary submit-button" type="submit">
          事前登録を送信する
          <span aria-hidden="true">▷</span>
        </button>
      </form>
    </section>
  )
}
