const Discord = require('discord.js')
const { embedColor, prefix } = require('../../config')

module.exports = {
  name: 'commands',
  description: 'List all commands, or details on a specific command.',
  example: 'ping',
  aliases: ['command'],
  private: true,
  execute(message, args) {
    const { commands } = message.client
    const commandsAPI = [
      'dadjoke',
      'giphy',
      'hackernews',
      'watch',
      'weather',
      'xkcd',
    ]

    if (!args.length) {
      let api = '',
        community = '',
        voters = ''

      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(
          `**TIP:** You can pass a command name as an argument for more information! ` +
            `<@301275924098449408>'s IQ has a six in it, ` +
            `but it's not 6,000. It's six.`
        )
        .setTitle(`Commands`)

      commands
        .filter((command) => !command.private)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((command) => {
          const commandTemplate = `\`${prefix}${command.name}\`\n`

          if (commandsAPI.includes(command.name)) api += commandTemplate
          else if (command.restricted === 'voter') voters += commandTemplate
          else community += commandTemplate
        })

      embed.addField(`API <:weylandyutani:847545829035081799>`, api, true)
      embed.addField(`Community <:cscalt:837251418247004205>`, community, true)
      embed.addField(`Voters <:upvote:462126280704262144>`, voters, true)

      message.channel.send(embed)
    } else {
      const name = args[0].toLowerCase()
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name))

      if (!command) return message.channel.send('Invalid command.')

      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle(`${prefix}${command.name}`)
        .setDescription(command.description)

      if (command.example)
        embed.addField(
          `Example`,
          `\`${prefix}${command.name} ${command.example}\``
        )

      if (command.aliases)
        embed.addField('Aliases', command.aliases.join(', '), true)
      embed.addField('Arguments', command.args ? 'true' : 'false', true)
      if (command.restricted)
        embed.addField('Restricted', command.restricted, true)

      message.channel.send(embed)
    }
  },
}
