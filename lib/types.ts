export interface ArchNode {
  n: string
  hi?: 'hi' | 'lime'
}

export interface ArchLayer {
  lbl: string
  nodes: ArchNode[]
}

export interface Outcome {
  v: string
  l: string
  s: string
  green: boolean
}

export type VisualKind = 'chat' | 'chart' | 'flow' | 'vision' | 'reco' | 'voice'
export type ProjectStatus = 'shipping' | 'live' | 'archived'

export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  stack: string[]
  status: ProjectStatus
  users: string
  uptime: string
  visual: VisualKind
  role: string
  year: string
  duration: string
  client: string
  problem: string
  challenges: string[]
  outcomes: Outcome[]
  arch: ArchLayer[]
  liveUrl?: string
  storeUrls?: { play?: string; apple?: string }
}
