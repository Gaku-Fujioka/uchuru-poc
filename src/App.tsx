import { useEffect, useMemo, useState } from 'react'
import { ExperimentProgress } from './components/ExperimentProgress'
import { BottomNav, Header } from './components/Navigation'
import { baseStats, properties } from './data/uchuru'
import { MissionsScreen } from './screens/MissionsScreen'
import { PocDashboardScreen } from './screens/PocDashboardScreen'
import { PreRegisterScreen } from './screens/PreRegisterScreen'
import { StayDetailScreen } from './screens/StayDetailScreen'
import { StaysScreen } from './screens/StaysScreen'
import { SurveyScreen } from './screens/SurveyScreen'
import { TopScreen } from './screens/TopScreen'
import type { MissionProgress, PocStats } from './types'
import {
  completionFromProgress,
  normalizePath,
  propertyFromPath,
  routeFromPath,
} from './utils/uchuru'
import './App.css'

function App() {
  const [pathname, setPathname] = useState(() =>
    normalizePath(window.location.pathname),
  )
  const [missionProgress, setMissionProgress] = useState<MissionProgress>({
    workCompleted: false,
    liveCompletedCount: 0,
    connectCompleted: false,
  })
  const [preRegisterSubmitted, setPreRegisterSubmitted] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  )
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({})
  const [surveyStep, setSurveyStep] = useState(0)
  const [surveyComplete, setSurveyComplete] = useState(false)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const route = routeFromPath(pathname)
  const currentProperty = useMemo(() => propertyFromPath(pathname), [pathname])
  const selectedProperty =
    properties.find((property) => property.id === selectedPropertyId) ?? null
  const missionCompletionRate = completionFromProgress(missionProgress)
  const isRelationshipCandidate =
    surveyAnswers.wantsRevisit === 'yes' ||
    surveyAnswers.wantsLongerStay === 'yes' ||
    surveyAnswers.wantsLocalInfo === 'yes' ||
    surveyAnswers.wantsJoinEvents === 'yes' ||
    surveyAnswers.considersRelocation === 'yes'

  const stats = useMemo<PocStats>(
    () => ({
      ...baseStats,
      preRegistrations:
        baseStats.preRegistrations + Number(preRegisterSubmitted),
      missionCompletionRate: Math.max(
        baseStats.missionCompletionRate,
        missionCompletionRate,
      ),
      relationshipCandidateRate:
        surveyComplete && isRelationshipCandidate
          ? Math.max(baseStats.relationshipCandidateRate, 64)
          : baseStats.relationshipCandidateRate,
    }),
    [
      isRelationshipCandidate,
      missionCompletionRate,
      preRegisterSubmitted,
      surveyComplete,
    ],
  )

  const navigate = (to: string) => {
    const normalized = normalizePath(to)
    window.history.pushState({}, '', normalized)
    setPathname(normalized)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectStay = (propertyId: string, nextPath = '/pre-register') => {
    setSelectedPropertyId(propertyId)
    navigate(nextPath)
  }

  const nextAction = getNextAction({
    hasSelectedStay: Boolean(selectedProperty),
    missionCompletionRate,
    preRegisterSubmitted,
    surveyComplete,
  })

  const flowSteps = [
    {
      id: 'stay',
      label: '滞在を選ぶ',
      route: '/stays',
      done: Boolean(selectedProperty),
      active: !selectedProperty,
      helper: selectedProperty ? selectedProperty.areaLabel : '未選択',
    },
    {
      id: 'register',
      label: '事前登録',
      route: '/pre-register',
      done: preRegisterSubmitted,
      active: Boolean(selectedProperty) && !preRegisterSubmitted,
      helper: preRegisterSubmitted ? '完了' : '予算・時期',
    },
    {
      id: 'missions',
      label: 'トライアルミッション',
      route: '/missions',
      done: missionCompletionRate === 100,
      active:
        Boolean(selectedProperty) &&
        preRegisterSubmitted &&
        missionCompletionRate < 100,
      helper: `${missionCompletionRate}%`,
    },
    {
      id: 'survey',
      label: '振り返り',
      route: '/survey',
      done: surveyComplete,
      active:
        Boolean(selectedProperty) &&
        preRegisterSubmitted &&
        missionCompletionRate === 100 &&
        !surveyComplete,
      helper: surveyComplete ? '完了' : '未回答',
    },
    {
      id: 'result',
      label: '結果',
      route: '/poc-dashboard',
      done: surveyComplete,
      active: surveyComplete,
      helper: surveyComplete ? '表示可' : '準備中',
    },
  ]

  return (
    <div className="app-shell">
      <Header activeRoute={route} navigate={navigate} nextAction={nextAction} />
      <ExperimentProgress
        navigate={navigate}
        nextLabel={nextAction.label}
        steps={flowSteps}
      />
      <main>
        {route === 'top' && (
          <TopScreen
            missionCompletionRate={missionCompletionRate}
            navigate={navigate}
            nextAction={nextAction}
            preRegisterSubmitted={preRegisterSubmitted}
            selectedProperty={selectedProperty}
            stats={stats}
            surveyComplete={surveyComplete}
          />
        )}
        {route === 'stays' &&
          (pathname.startsWith('/stays/') ? (
            <StayDetailScreen
              navigate={navigate}
              onSelectStay={selectStay}
              property={currentProperty}
              selectedPropertyId={selectedPropertyId}
            />
          ) : (
            <StaysScreen
              navigate={navigate}
              onSelectStay={selectStay}
              selectedPropertyId={selectedPropertyId}
            />
          ))}
        {route === 'missions' && (
          <MissionsScreen
            navigate={navigate}
            progress={missionProgress}
            setProgress={setMissionProgress}
          />
        )}
        {route === 'pre-register' && (
          <PreRegisterScreen
            navigate={navigate}
            setSubmitted={setPreRegisterSubmitted}
            selectedProperty={selectedProperty}
            submitted={preRegisterSubmitted}
          />
        )}
        {route === 'survey' && (
          <SurveyScreen
            answers={surveyAnswers}
            complete={surveyComplete}
            isRelationshipCandidate={isRelationshipCandidate}
            navigate={navigate}
            setAnswers={setSurveyAnswers}
            setComplete={setSurveyComplete}
            setStep={setSurveyStep}
            step={surveyStep}
          />
        )}
        {route === 'poc-dashboard' && (
          <PocDashboardScreen
            missionCompletionRate={missionCompletionRate}
            stats={stats}
            surveyComplete={surveyComplete}
          />
        )}
      </main>
      <BottomNav activeRoute={route} navigate={navigate} />
    </div>
  )
}

function getNextAction({
  hasSelectedStay,
  missionCompletionRate,
  preRegisterSubmitted,
  surveyComplete,
}: {
  hasSelectedStay: boolean
  missionCompletionRate: number
  preRegisterSubmitted: boolean
  surveyComplete: boolean
}) {
  if (!hasSelectedStay) {
    return { label: '滞在候補を選ぶ', path: '/stays' }
  }

  if (!preRegisterSubmitted) {
    return { label: '事前登録へ進む', path: '/pre-register' }
  }

  if (missionCompletionRate < 100) {
    return { label: 'トライアルミッションを進める', path: '/missions' }
  }

  if (!surveyComplete) {
    return { label: '振り返りへ進む', path: '/survey' }
  }

  return { label: '結果を見る', path: '/poc-dashboard' }
}

export default App
