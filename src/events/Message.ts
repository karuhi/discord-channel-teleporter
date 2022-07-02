import { Message } from 'discord.js'
export async function eventMessageCreate(message: Message) {
  if (message.author.bot) return
  if (message.content.startsWith('!ping')) {
    message.channel.send('Pong!')
  }
}
