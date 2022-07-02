import { Client } from 'discord.js'
import { setIniatialChannelSetting } from './Initial'
import { ActivityTypes } from 'discord.js/typings/enums'

export function eventReady(client: Client) {
  console.log('[Discord.js] Ready!')
  if (!client.user) return
  client.user.setActivity('Loading...')

  // 初期設定的な👏
  setIniatialChannelSetting()

  client.user.setActivity(`⛺`, {
    type: ActivityTypes.PLAYING
  })
  console.log(`[Discord.js] Running on account ${client.user.tag}`)
}
