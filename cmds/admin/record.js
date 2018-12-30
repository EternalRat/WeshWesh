const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the right to do this !");

    let guinnesschannel = message.guild.channels.find('name', 'guinness-version-discord')
    if (!guinnesschannel) return message.channel.send("Missing the channel guinness-version-discord")

    let msg = args.join(" ").slice(0)

    let msgembed = new Discord.RichEmbed()
        .setTitle("__**New guinness record !**__")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL)
        .setDescription(msg)
        .setFooter(`Copyright - ${bot.user.username}`)

    guinnesschannel.send(msgembed)
}

module.exports.help = {
    name: "guinness",
    alias: "gs"
}
