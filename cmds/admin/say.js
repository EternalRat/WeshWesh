const Discord = module.require("discord.js");
const botSettings = require("../bot/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {

  let missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
    .setColor("#FFFFFF")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle('Missing Arguments!')
    .setDescription('Usage: ' + prefix + 'announce [#channel] [#HTMLcodes] [message]')
    .setTimestamp()

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You haven't the right for this !")
  let chan = message.mentions.channels.first()
  if (!chan) return message.channel.send(missingArgsEmbed)
  if (!message.member.hasPermission("ADMINISTRATOR")) return

  const sayMessage = args.join(" ").slice(22)
  if (!sayMessage) return message.channel.send(missingArgsEmbed)
  message.delete().catch();

  chan.send(sayMessage);
}

module.exports.help = {
  name: "say"
}