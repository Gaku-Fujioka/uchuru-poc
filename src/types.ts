export type Area = 'namba' | 'tennoji' | 'shinsekai' | 'abeno'

export type MissionType = 'work' | 'live' | 'connect'

export type RouteId =
  | 'top'
  | 'stays'
  | 'missions'
  | 'pre-register'
  | 'survey'
  | 'poc-dashboard'

export interface Property {
  id: string
  name: string
  area: Area
  areaLabel: string
  address: string
  description: string
  imageUrl: string
  minStayDays: number
  maxStayDays: number
  weeklyPrice: number
  monthlyPrice?: number
  features: string[]
  operatorName: string
  operatorType: string
  operatorPageUrl: string
  supportedMissions: MissionType[]
  nearbySpotIds: string[]
  legalNote: string
}

export interface Mission {
  id: MissionType
  marker: string
  title: string
  shortTitle: string
  description: string
  requiredCount: number
  verifies: string
  spotIds: string[]
}

export interface Spot {
  id: string
  name: string
  area: Area
  category: string
  description: string
  tags: string[]
}

export interface MissionProgress {
  workCompleted: boolean
  liveCompletedCount: number
  connectCompleted: boolean
}

export interface PreRegisterForm {
  ageRange: string
  attribute: string
  reason: string
  desiredDuration: string
  desiredTiming: string
  budgetMax: string
  paidStayIntent: string
  contact: string
}

export interface PocStats {
  salesTargets: number
  partnerOperators: number
  listedRooms: number
  preRegistrations: number
  inquiries: number
  plannedStays: number
  missionCompletionRate: number
  relationshipCandidateRate: number
  revisitHope: number
  longerStayHope: number
}

export interface SurveyQuestion {
  id: string
  text: string
  options: readonly (readonly [string, string])[]
}
