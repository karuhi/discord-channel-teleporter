import { Interaction } from 'discord.js'

import { getChannelByTeamId } from '../db/Channels'
import { addUser } from '../db/Users'

export async function onInteraction(interaction: Interaction) {
  if (!interaction.isCommand()) return
  if (!interaction.guildId) {
    await interaction.reply({
      content: 'サーバーで実行する必要があります。'
    })
    return
  }
  await interaction.deferReply({ ephemeral: true })
  if (interaction.commandName === 'setchannel') {
    const recievedOption = interaction.options.getString('チャンネル名')
    const recievedOptionNumber = Number(recievedOption)
    if (!recievedOption) return
    const teamData = getChannelByTeamId(recievedOptionNumber)
    let teamNames = ['A', 'B', 'C', 'D']
    await interaction.editReply({
      content: `せやね。\nチーム${
        teamNames[recievedOptionNumber - 1]
      }に転送するように設定や`
    })
    await addUser({
      user_id: interaction.user.id,
      team_id: recievedOptionNumber
    })
      .then(async () => {
        await interaction.editReply({
          content: `チーム${
            teamNames[recievedOptionNumber - 1]
          }に転送するように設定したでｂ\n次からは覚えてるから自動やで！\nあっ、そうや!? 初めての時は1回通話切ってからこのチャンネルに参加しなおしてな！`
        })
      })
      .catch(async (err) => {
        await interaction.editReply({
          content: `ちょっと設定できんかも… \`\`\`${err}\`\`\``
        })
      })
  }
}
