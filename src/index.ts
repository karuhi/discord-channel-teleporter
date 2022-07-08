import { Client, Interaction, VoiceState } from 'discord.js'
import dotenv from 'dotenv'

require('newrelic')

import { eventMessageCreate } from './events/Message'
import { eventReady } from './events/System'
import { eventVoiceStateUpdate } from './events/Voice'
import { onInteraction } from './events/Interaction'

const environment = process.env.NODE_ENV
dotenv.config({ path: __dirname + `.env.${environment}` })

class Main {
  private readonly client: Client
  constructor() {
    this.client = new Client({
      intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILD_VOICE_STATES'
      ],
      restTimeOffset: 0
    })
  }

  async run() {
    this.client.once('ready', (client) => eventReady(client))

    this.client.on('interactionCreate', (interaction) => {
      console.log('interactionCreate')
    })

    this.client.on('messageCreate', (message) => eventMessageCreate(message))

    this.client.on(
      'voiceStateUpdate',
      (oldState: VoiceState, newState: VoiceState) =>
        eventVoiceStateUpdate(oldState, newState)
    )
    this.client.on('interactionCreate', (interaction: Interaction) =>
      onInteraction(interaction)
    )

    this.client.login(process.env.TOKEN).catch((error) => {
      console.error('Shit went wrong:', error)
    })
  }
}
;(async () => {
  await new Main().run()
})()
