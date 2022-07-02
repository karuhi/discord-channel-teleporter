export interface Database {
  users: User[]
  channels: Channel[]
}

export interface User {
  id?: number
  user_id: string
  team_id: number
}

export interface Channel {
  id?: number
  team_id: number
  channel_id: string
}
