const Discord = require("discord.js")
const moment = require("moment")

module.exports.run = async (bot, message, args) => {

    var infos_embed = new Discord.RichEmbed()
        .setTitle("Information about this server asked by : " + message.author.username)
        .setColor("#0489B1")
        .setThumbnail(message.guild.iconURL)
        .addField("ID :", message.guild.id, true)
        .addField("Owner :", message.guild.owner, true)
        .setFooter("Date of creation : " + moment.utc(message.guild.createdAt).format("dddd Do MMMM in YYYY, HH:mm:ss"))
        .addField("Number of users :", message.guild.memberCount, true)
        .addField("Region", message.guild.region, true)
        .addField("Roles availables :", message.guild.roles.map(r => r.name + ",").join(' '))

    message.channel.send(infos_embed)
    message.delete()
}

module.exports.help = {
    name: "serverinfos"
}