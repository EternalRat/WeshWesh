const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if (message.author.id === "291646942038196224") {
        message.channel.send(":gear: Reload in process")

        bot.destroy()
        bot.login("NTA2MTUxMjc1OTkwMzUxOTIz.DrjQjw.mQkCLJR5HZ67t4JVyQFPMTzc3X0")
        message.channel.send(":gear: Reload has been done")
    } else {
        message.channel.send("Only the Owner of this bot can do that !")

    }
}

module.exports.help = {
    name: "reload",
    alias: "r"
}