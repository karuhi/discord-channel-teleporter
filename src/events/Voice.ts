import { VoiceState, Client } from 'discord.js'
import {
  getChannelByChannelId,
  getChannelByTeamId,
  getChannels
} from '../db/Channels'
import { getUserById } from '../db/Users'
export async function eventVoiceStateUpdate(
  oldState: VoiceState,
  newState: VoiceState
) {
  console.log('ð­ [ãã£ã³ãã«] é³å£°ã¹ãã¼ãæ´æ°')
  // DBã®ãã£ã³ãã«ãã¼ã¿ã¨æ´åãã

  // ãã¹ã¦ã®ãã£ã³ãã«
  const channelsList = await getChannels()
  // ã¤ãã³ããèµ·ãããã£ã³ãã«
  const eventTriggeredChannel = await getChannelByChannelId(newState.channelId)
  // ãã£ã³ãã«ãDBã«å­å¨ãããã

  if (oldState.member == null || newState.member == null) return
  const teleporterChannel = channelsList[0]
  const focusChannel = oldState.member.guild.channels.cache.get(
    teleporterChannel.channel_id
  )

  if (eventTriggeredChannel !== null) {
    // å¯¾è±¡ã®ãã£ã³ãã«æå ±ãDiscordããåå¾ãã
    // åå ããã®ãéåºããã®ãã§å¦çãåãã
    if (focusChannel && focusChannel.isText()) {
      if (newState.channelId !== null) {
        // ãã¬ãã¼ãé¨å±ã«å¥ã£ã¦ããã
        if (newState.channelId == teleporterChannel.channel_id) {
          focusChannel.send(`**åå ** > ${oldState.member.user.tag}`)

          const user = await getUserById(oldState.member.user.id)
          if (user) {
            console.log('userå­å¨ããã£ã³ãã«ã«è»¢éãã¾ãã')
            const moveChannel = await getChannelByTeamId(user.team_id)
            if (user.team_id !== 0) {
              oldState.member.voice.setChannel(moveChannel.channel_id)
            } else {
              await focusChannel.send({
                content: `ããã${oldState.member.user}ããã®ç§»ååãã£ã³ãã«ãè¨­å®ã§ãã¦ãªããã¤ããªã\n \`\`\`/setchannel\`\`\` ã£ã¦å¥åæ¬ã«æã£ã¦ã¿ãããããããªãï¼`
              })
            }
          } else {
            console.log('userä¸å¨ãã¢ã«ã¦ã³ãä½æãã­ã¼ã«é²ã¿ã¾ãã')
            await focusChannel.send({
              content: `ããã${oldState.member.user}ããã®ç§»ååãã£ã³ãã«ãè¨­å®ã§ãã¦ãªããã¤ããªã\n \`\`\`/setchannel\`\`\` ã£ã¦å¥åæ¬ã«æã£ã¦ã¿ãããããããªãï¼`
            })
          }
        }
      }
    } else console.log('ð­ å¯¾è±¡ã®ãã£ã³ãã«ãDiscordåã«è¦ã¤ããã¾ããã§ããã')
  } else {
    if (focusChannel && focusChannel.isText()) {
      if (oldState.channelId !== null && newState.channelId === null) {
        // ãã¬ãã¼ãé¨å±ããéåºãããªã
        if (oldState.channelId == teleporterChannel.channel_id) {
          focusChannel.send(`**éåº** < ${newState.member.user.tag}`)
        }
      }
    }
    // ããããå¯¾è±¡å¤ã®ãã£ã³ãã«ãªããã¹ã«ã¼ãã
    console.log('ð­ åä½æå®å¤ã®ãã£ã³ãã«ã§ãã')
  }
}
