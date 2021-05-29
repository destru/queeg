const Discord = require('discord.js')
const { alphabetEmoji } = require('../../helpers')
const { embedColor } = require('../../config')

module.exports = {
  name: 'poll',
  description: 'Create a poll.',
  args: true,
  example: 'who are the CSC? | communists | socialists | creatives',
  execute(message, args) {
    if (args.includes('|')) {
      let description = ''
      let poll = args.join(' ').split('|')
      let question = poll.shift()

      poll.forEach((option, i) => {
        description = description + `${alphabetEmoji[i]} ${option.trim()}\n`
      })

      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle(question)
        .setDescription(description)

      message.delete()
      message.channel.send(embed).then((message) => {
        for (let i = 0; i < poll.length; i++) {
          message.react(alphabetEmoji[i])
        }
      })
    } else {
      message.channel.send('Poll malformed.')
    }
  },
}
