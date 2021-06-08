const fetch = require('node-fetch')

module.exports = {
  name: 'guildMemberAdd',
  execute(member, client) {
    const channelWelcome = client.channels.cache.get('844871570211995678')
    const roleSuspect = '829420138079846471'
    const tag = encodeURI('welcome to the club')

    if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * 7) {
      member.roles.add(roleSuspect)
      channelWelcome.send(`${member} has been flagged for _Voight-Kampff_.`)
    } else {
      fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=${tag}&rating=pg13`
      )
        .then((response) => response.json())
        .then((data) => {
          channelWelcome.send(data.data.embed_url)
        })
    }
  },
}
