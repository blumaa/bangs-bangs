export interface Review {
  id: string
  bandName: string
  content: string
  timestamp: number
}

export interface SharePlatform {
  name: string
  icon: string
  getShareUrl: (text: string, url: string) => string
}
