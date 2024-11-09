export interface User {
  tgId: number
  firstName: string | null
  lastName: string | null
  username: string | null
  allowsWriteToPM: boolean
}


export interface Habit {
  id: number
  authorId: number // telegram user id
  repeatEveryCount: number
  repeatEveryType: 'hour' | 'day' | 'week' | 'month'
  name: string
  notificationsStartFrom: Date
}