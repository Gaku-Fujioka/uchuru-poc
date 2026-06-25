import type {
  Mission,
  MissionType,
  PocStats,
  Property,
  RouteId,
  Spot,
  SurveyQuestion,
} from '../types'

export const missionLabels: Record<MissionType, string> = {
  work: '働く',
  live: '暮らす',
  connect: '関わる',
}

export const routeLabels: Record<RouteId, string> = {
  top: 'ホーム',
  stays: '滞在候補',
  missions: 'トライアルミッション',
  'pre-register': '事前登録',
  survey: '振り返り',
  'poc-dashboard': '結果',
}

export const routePaths: Record<RouteId, string> = {
  top: '/',
  stays: '/stays',
  missions: '/missions',
  'pre-register': '/pre-register',
  survey: '/survey',
  'poc-dashboard': '/poc-dashboard',
}

export const navItems: RouteId[] = [
  'top',
  'stays',
  'pre-register',
  'missions',
  'survey',
  'poc-dashboard',
]

export const bottomNavItems: RouteId[] = [
  'top',
  'stays',
  'pre-register',
  'missions',
  'poc-dashboard',
]

export const routeIcons: Record<RouteId, string> = {
  top: '⌂',
  stays: '▭',
  missions: '✓',
  'pre-register': '+',
  survey: '?',
  'poc-dashboard': '▥',
}

export const properties: Property[] = [
  {
    id: 'namba-coliving',
    name: 'Namba Co-Living Hub',
    area: 'namba',
    areaLabel: 'なんば',
    address: '大阪市浪速区元町周辺',
    description:
      '作業机と共用キッチンがある、若手社会人やノマド向けのコリビング滞在先。なんばで働く、暮らす、関わるを短期間で試せます。',
    imageUrl: '/uchuru/namba-coliving.png',
    minStayDays: 7,
    maxStayDays: 30,
    weeklyPrice: 48000,
    monthlyPrice: 148000,
    features: ['Wi-Fi', '作業机', '駅徒歩5分', '共用キッチン'],
    operatorName: 'Namba Local Stay Partners',
    operatorType: 'シェアハウス',
    operatorPageUrl: 'https://example.com/namba-coliving',
    supportedMissions: ['work', 'live', 'connect'],
    nearbySpotIds: ['work-namba', 'market-kuromon', 'orientation-namba'],
    legalNote:
      '利用条件、料金のやり取り、鍵の受け渡し、清掃は運営事業者が担います。uchuruは送客導線、トライアルミッション、アンケート分析に絞って検証します。',
  },
  {
    id: 'tennoji-hostel',
    name: 'Tennoji Local Connect Hostel',
    area: 'tennoji',
    areaLabel: '天王寺',
    address: '大阪市天王寺区堀越町周辺',
    description:
      '地元店や生活情報オリエンテーションと接続しやすいホステル型滞在先。はじめて大阪で暮らす感覚を持ちやすい拠点です。',
    imageUrl: '/uchuru/tennoji-hostel.png',
    minStayDays: 7,
    maxStayDays: 14,
    weeklyPrice: 42000,
    features: ['Wi-Fi', 'ラウンジ', '生活案内', '駅徒歩7分'],
    operatorName: 'Tennoji Community Hostel',
    operatorType: 'ホステル',
    operatorPageUrl: 'https://example.com/tennoji-hostel',
    supportedMissions: ['live', 'connect'],
    nearbySpotIds: ['sento-tennoji', 'restaurant-abeno', 'event-tennoji'],
    legalNote:
      '利用条件や料金のやり取りは事業者ページで確認します。uchuruは滞在確定や料金の受け取りを行いません。',
  },
  {
    id: 'abeno-monthly',
    name: 'Abeno Work Trial Room',
    area: 'abeno',
    areaLabel: '阿倍野',
    address: '大阪市阿倍野区松崎町周辺',
    description:
      '静かに働ける個室と生活圏の近さを重視した小規模マンスリー。2週間以上の試し住みに向いています。',
    imageUrl: '/uchuru/hero-living-room.png',
    minStayDays: 14,
    maxStayDays: 30,
    weeklyPrice: 56000,
    monthlyPrice: 158000,
    features: ['個室', '高速Wi-Fi', '洗濯機', 'スーパー徒歩3分'],
    operatorName: 'Abeno Monthly Rooms',
    operatorType: '小規模マンスリー',
    operatorPageUrl: 'https://example.com/abeno-monthly',
    supportedMissions: ['work', 'live'],
    nearbySpotIds: ['work-tennoji', 'supermarket-abeno', 'sento-tennoji'],
    legalNote:
      '中期滞在の条件は運営事業者とユーザーの直接確認を前提にします。',
  },
]

export const spots: Spot[] = [
  {
    id: 'work-namba',
    name: 'なんば作業カフェ',
    area: 'namba',
    category: '作業カフェ',
    description: '午前中に集中しやすい、電源とWi-Fiのあるカフェ。',
    tags: ['Wi-Fi', '電源', '朝から使える'],
  },
  {
    id: 'work-tennoji',
    name: '天王寺コワーキング',
    area: 'tennoji',
    category: 'コワーキング',
    description: '半日利用で大阪での仕事のしやすさを試せる場所。',
    tags: ['集中席', '交流', 'ドロップイン'],
  },
  {
    id: 'market-kuromon',
    name: '黒門市場周辺',
    area: 'namba',
    category: '商店街',
    description: '食材や日用品を買いながら、観光とは違う生活導線を歩けます。',
    tags: ['買い物', '食材', '徒歩圏'],
  },
  {
    id: 'sento-tennoji',
    name: '天王寺の銭湯',
    area: 'tennoji',
    category: '銭湯',
    description: '夜の生活ルーティンを試すためのローカルスポット。',
    tags: ['夜利用', '生活感', '徒歩移動'],
  },
  {
    id: 'restaurant-abeno',
    name: '阿倍野の地元飲食店',
    area: 'abeno',
    category: '地元飲食店',
    description: '常連さんの空気を感じられる、小さな飲食店。',
    tags: ['会話', '地元店', '夜ごはん'],
  },
  {
    id: 'orientation-namba',
    name: '生活情報オリエンテーション',
    area: 'namba',
    category: 'オリエンテーション',
    description: 'ゴミ出し、交通、買い物、働く場所をローカル視点で聞くセッション。',
    tags: ['生活情報', '地域接点', '初日向け'],
  },
  {
    id: 'event-tennoji',
    name: '天王寺ローカルイベント',
    area: 'tennoji',
    category: '地域イベント',
    description: '地元の人と自然に話すきっかけをつくる小規模イベント。',
    tags: ['交流', '週末', '地域接点'],
  },
]

export const missions: Mission[] = [
  {
    id: 'work',
    marker: 'A',
    title: 'ワーキング・作業カフェ利用',
    shortTitle: '働く',
    description:
      'コワーキングや作業カフェを1回利用し、大阪で仕事や勉強ができるかを試します。',
    requiredCount: 1,
    verifies: '大阪で仕事・勉強ができるか',
    spotIds: ['work-namba', 'work-tennoji'],
  },
  {
    id: 'live',
    marker: 'B',
    title: 'スーパー・銭湯・商店街利用',
    shortTitle: '暮らす',
    description:
      'スーパー、銭湯、商店街、地元飲食店などを2か所以上利用し、日常の解像度を上げます。',
    requiredCount: 2,
    verifies: '日常生活のイメージが持てるか',
    spotIds: ['market-kuromon', 'sento-tennoji', 'restaurant-abeno'],
  },
  {
    id: 'connect',
    marker: 'C',
    title: '生活情報オリエンテーション',
    shortTitle: '関わる',
    description:
      '生活情報を聞くセッションや地域イベントに1回参加し、地域と関わり続けたいかを試します。',
    requiredCount: 1,
    verifies: '地域と関わり続けたいと思えるか',
    spotIds: ['orientation-namba', 'event-tennoji'],
  },
]

export const baseStats: PocStats = {
  salesTargets: 30,
  partnerOperators: 4,
  listedRooms: 12,
  preRegistrations: 24,
  inquiries: 7,
  plannedStays: 3,
  missionCompletionRate: 67,
  relationshipCandidateRate: 62,
  revisitHope: 15,
  longerStayHope: 9,
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'wantsRevisit',
    text: '大阪にまた来たいですか？',
    options: [
      ['yes', 'はい、ぜひ来たい'],
      ['maybe', 'またいつか来たい'],
      ['no', '今は考えていない'],
    ],
  },
  {
    id: 'wantsLongerStay',
    text: '次はもっと長く滞在したいですか？',
    options: [
      ['yes', 'はい、1週間以上試したい'],
      ['maybe', '条件が合えば試したい'],
      ['no', '今回くらいで十分'],
    ],
  },
  {
    id: 'wantsLocalInfo',
    text: '大阪の地域情報を今後も受け取りたいですか？',
    options: [
      ['yes', 'はい、受け取りたい'],
      ['no', 'いいえ'],
    ],
  },
  {
    id: 'wantsJoinEvents',
    text: '地域イベントや地元店にまた関わりたいですか？',
    options: [
      ['yes', 'はい、関わりたい'],
      ['no', 'いいえ'],
    ],
  },
  {
    id: 'considersRelocation',
    text: '将来的に大阪を二地域居住・移住先として考えられますか？',
    options: [
      ['yes', 'はい、候補になる'],
      ['maybe', '少し考えられる'],
      ['no', 'まだ分からない'],
    ],
  },
]
