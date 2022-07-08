import { getChannels, addChannel } from '../db/Channels'
// 初期チャンネル設定を行う
export async function setIniatialChannelSetting() {
  console.log('⚒️ [チャンネル] 初期設定')
  const channels = [
    process.env.CHID_TP,
    process.env.CHID_A,
    process.env.CHID_B,
    process.env.CHID_C,
    process.env.CHID_D
  ]
  for (let i = 0; i < channels.length; i++) {
    await addChannel(i, channels[i] || '')
  }
  console.log('⚒️ [チャンネル] 初期設定完了')
}
