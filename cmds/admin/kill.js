const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
  let target = message.guild.members.get("348530295437525002").username
  
  message.channel.send(`${message.author} has killed ${target}`)
}

module.exports.help = {
  name: "kill"
}
