const Discord = module.require("discord.js");
const botSettings = require("../bot/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {

  let msgclear = `Clear ${args[0]} messages.`;
  var embedColor = "#FFFFFF"
  var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `' + prefix + 'clear [Number]')
        .setTimestamp();

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You haven't the right for this !");
  if (!args[0]) return message.channel.send(missingArgsEmbed);
  message.channel.bulkDelete(args[0]).then(() => {
    let clearing_embed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#20FC00")
      .setTitle("Clear has been realized !")
      .setThumbnail(message.guild.iconURL)
      .addField("**Number of message erased :**", args[0])
      .setFooter(`Copyright - ${bot.user.username}`)
    message.author.send(clearing_embed);
  })
  message.channel.send(msgclear)
}

module.exports.help = {
  name: "clear",
  alias: "c"
}
