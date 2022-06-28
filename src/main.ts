import { Message, Client, VoiceState } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const ENV = {
  channelId: process.env.WATCH_CHANNEL_ID,
  token: process.env.TOKEN,
  targetChannel: process.env.TELEPORT_TARGET_CHANNEL || ''
}

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'], 
})

client.once('ready', () => {
  console.log('Ready!')
  if (!client.user) return
  console.log(client.user.tag)
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return
  if (message.content.startsWith('!ping')) {
    message.channel.send('Pong!')
  }
})

client.on('voiceStateUpdate', (oldState:VoiceState, newState:VoiceState) => {
  console.log("voice state Updated")
  const watchTarget = ENV.channelId;
  if (!oldState && !newState) return

  // 振り分け用チャンネルに入ったら
  if (newState.channelId === watchTarget) {
    if (oldState.member === null) return
    console.log(`> 参加 - ${oldState.member.user.tag}さんが入室しました。`)
    oldState.member.voice.setChannel(ENV.targetChannel)
  }  
});

client.login(ENV.token)
