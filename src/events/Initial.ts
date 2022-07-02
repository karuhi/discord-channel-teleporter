import { getChannels, addChannel } from '../db/Channels'
// 全部のチャンネル数
const FULL_CHANNEL_COUNT = 5
// 初期チャンネル設定を行う
export async function setIniatialChannelSetting() {
  console.log('⚒️ [チャンネル] 初期設定')
  const channels = await getChannels()
  if (channels.length !== FULL_CHANNEL_COUNT) {
    console.log('⚡[チャンネル] 初期化中')
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
    console.log('✅ [チャンネル] 初期化完了')
  } else console.log('✅ [チャンネル] 初期設定済')
}
