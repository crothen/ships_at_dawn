export interface Project {
  id: string
  dayNumber: number
  title: string
  description: string
  youtubeId: string // YouTube Shorts video ID
  prototypeUrl?: string // Optional link to live prototype
  githubPath?: string // Path within repo, e.g., "prototypes/001-name"
  tags: string[]
  createdAt: Date
  published: boolean
}
