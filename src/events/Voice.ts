import { VoiceState } from 'discord.js'
import { getChannelByChannelId, getChannels } from '../db/Channels'
import { getUserById } from '../db/Users'
export async function eventVoiceStateUpdate(
  oldState: VoiceState,
  newState: VoiceState
) {
  console.log('💭 [チャンネル] voiceStateUpdate')
  // DBのチャンネルデータと整合する

  // すべてのチャンネル
  const channelsList = await getChannels()
  // イベントが起きたチャンネル
  const eventTriggeredChannel = await getChannelByChannelId(newState.channelId)
  // チャンネルがDBに存在したら、

  if (oldState.member == null || newState.member == null) return
  const teleporterChannel = channelsList[0]
  const focusChannel = oldState.member.guild.channels.cache.get(
    teleporterChannel.channel_id
  )

  if (eventTriggeredChannel !== null) {
    // 対象のチャンネル情報をDiscordから取得する
    // 参加するのか退出するのかで処理を分ける
    if (focusChannel && focusChannel.isText()) {
      if (oldState.channelId === null && newState.channelId !== null) {
        // テレポート部屋に入ってきたら
        if (newState.channelId == teleporterChannel.channel_id) {
          focusChannel.send(`**参加** > ${oldState.member.user.tag}`)

          const user = await getUserById(oldState.member.user.id)
          if (user) {
            console.log('user存在、チャンネルに転送します。')
            // oldState.member.voice.setChannel(ENV.focusChannel)
          } else {
            console.log('user不在、アカウント作成フローに進みます。')
          }
        }
      }
    } else console.log('💭 対象のチャンネルがDiscord内に見つかりませんでした。')
  } else {
    if (focusChannel && focusChannel.isText()) {
      if (oldState.channelId !== null && newState.channelId === null) {
        // テレポート部屋から退出するなら
        if (oldState.channelId == teleporterChannel.channel_id) {
          focusChannel.send(`**退出** < ${newState.member.user.tag}`)
        }
      }
    }
    // そもそも対象外のチャンネルなら、スルーする
    console.log('💭 動作指定外のチャンネルです。')
  }
}
