import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Channel } from '../types'

// Channelをすべて参照する
export async function getChannels(): Promise<Channel[]> {
  return await prisma.channels.findMany()
}

// Channelのchannel_idからChannelデータを参照する
export async function getChannelByChannelId(channel_id: any): Promise<any> {
  if (channel_id == null) return null
  return await prisma.channels.findFirst({
    where: {
      channel_id: channel_id
    },
    orderBy: {
      id: 'desc'
    }
  })
}

// Channelのteam_idからChannelデータを参照する
export async function getChannelByTeamId(team_id: any): Promise<any> {
  return await prisma.channels.findFirst({
    where: {
      team_id: team_id
    },
    orderBy: {
      id: 'desc'
    }
  })
}

// Channelを追加する
export async function addChannel(
  team_id: number,
  channel_id: string
): Promise<void> {
  await prisma.channels.upsert({
    where: { team_id: team_id },
    update: {
      channel_id: channel_id
    },
    create: {
      team_id: team_id,
      channel_id: channel_id
    }
  })
}
