const Discord = require("discord.js")

module.exports.run = async(message, bot) => {
  let author = message.mentions.users.first()
  
  message.channel.send(`${message.author} has killed ${author}`)
}

module.exports.help = {
  name: "kill"
}
