import { Client, ApplicationCommandDataResolvable } from 'discord.js'
import dotenv from 'dotenv'
const environment = process.env.NODE_ENV
dotenv.config({ path: `.env.${environment}` })
const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES']
})

const setChannel: ApplicationCommandDataResolvable = {
  name: 'setchannel',
  description: 'いぬやまさんに送ってもらうチャンネルを設定します。',
  options: [
    {
      type: 'STRING',
      name: 'チャンネル名',
      description: 'どのチャンネルに参加するかを設定します。',
      required: true,
      choices: [
        {
          name: 'チームA',
          value: '1'
        },
        {
          name: 'チームB',
          value: '2'
        },
        {
          name: 'チームC',
          value: '3'
        },
        {
          name: 'チームD',
          value: '4'
        }
      ]
    }
  ]
}
const Commands = [setChannel]

client.on('ready', async () => {
  if (!client.application) return

  if (environment === 'development') {
    // ギルドコマンド(開発環境)
    if (process.env.TARGET_GUILD)
      await client.application.commands.set(Commands, process.env.TARGET_GUILD)
  } else if (environment === 'production') {
    // グローバルコマンド登録(本番環境)
    await client.application.commands.set(Commands)
  } else {
    console.log('unknown environment value')
  }
})

client.login(process.env.TOKEN)
