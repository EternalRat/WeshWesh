const Discord = require("discord.js")
const moment = require("moment")

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You haven't the right for this !")
    var infos_embed = new Discord.RichEmbed()
        .setTitle("Information about the user : " + target.username)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL)
        .addField("ID :", target.id, true)
        .addField("Username :", target.username, true)
        .addField("Discrim : ", target.discriminator, true)
        .addField("Bot?", target.bot,true)
        .addField("Joined at :", moment.utc(message.guild.member(target).joinedAt).format("dddd Do MMMM in YYYY, HH:mm:ss"))
        .addField("Account created at :", moment.utc(target.createdAt).format("dddd Do MMMM in YYYY, HH:mm:ss"))
    message.channel.send(infos_embed)
    message.delete()
}

module.exports.help = {
    name: "userinfo"
}