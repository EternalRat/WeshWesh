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
  const Colorembed = args.join(" ").slice(21)
  if (!Colorembed) return message.channel.send(missingArgsEmbed)
  const sayMessage = args.join(" ").slice(30)
  if (!sayMessage) return message.channel.send(missingArgsEmbed)
  let announce_embed = new Discord.RichEmbed()
    .setColor(Colorembed)
    .setTitle(`Announce of ${message.author.username}`)
    .setThumbnail(message.guild.iconURL)
    .setDescription(sayMessage)
    .setFooter("Copyright - " + bot.user.username)

  message.delete().catch();
  /* message.channel.send("Do you want to mention everyone ?")
  switch (args[0].toLowerCase) {
    case "yes", "Yes", "Oui", "oui":
    chan.send(announce_embed + message.mentions.roles.find(r => r.name === "everyone"));
  } */
  chan.send(announce_embed);
  message.author.send("Announce has been realized !")
}

module.exports.help = {
  name: "announce"
}
