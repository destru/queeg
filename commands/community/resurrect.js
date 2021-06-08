const { role } = require('../../config')
const prettyMs = require('pretty-ms')

const data = require('flat-db')
data.configure({ dir: './data' })
const Resurrection = new data.Collection('resurrections', { uid: '' })

module.exports = {
  name: 'resurrect',
  description: 'Remove all death penalties.',
  restricted: 'voter',
  execute(message) {
    if (!message.member.roles.cache.has(role.ghost))
      return message.channel.send(`You're not dead.`)

    const matches = Resurrection.find().matches('uid', message.author.id).run()
    const hasResurrected = matches.length > 0
    let timeRemaining

    if (hasResurrected) {
      const expires = matches[0]._ts_ + 7 * 24 * 60 * 60 * 1000
      if (Date.now() < expires) timeRemaining = expires - Date.now()
    }

    if (!timeRemaining) {
      if (hasResurrected) Resurrection.remove(matches[0]._id_)
      Resurrection.add({ uid: message.author.id })
      message.member.roles.remove(role.ghost)
      message.channel.send(`You have been resurrected.`)
    } else {
      message.channel.send(
        `You have to wait \`${prettyMs(timeRemaining)}\` to resurrect.`
      )
    }
  },
}
