const Discord = require("discord.js")

module.exports.run = async(message, bot, args) => {
  let target = message.mentions.users.first() || message.guild.members.get(args[1])
  
  message.channel.send(`${message.author} has killed ${target}`)
}

module.exports.help = {
  name: "kill"
}
