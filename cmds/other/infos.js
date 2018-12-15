const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let infos_embed = new Discord.RichEmbed()
        .setTitle("Informations about this bot")
        .setColor("#0489B1")
        .setDescription("This bot has been created by EternalRat")
        .setThumbnail(message.guild.iconURL)
        .addField("Creator :", "EternalRat")
        .addField("Date of creation :", "30/10/2018")
        .addField("Language of programmation :", "Javascript, with Node.js and discord.js")
        .addField("Available commands :", "34 are working")

    message.channel.send(infos_embed)
}

module.exports.help = {
    name: "infos"
}