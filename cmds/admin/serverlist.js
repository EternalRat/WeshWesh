const Discord = require("discord.js")

module.exports.run = async(bot,message,args) => {
    if(message.author.id === "291646942038196224") {
            message.channel.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** membres` /*+ bot.guilds.*/))
    }
}

module.exports.help = {
    name: "serverlist",
    alias: "sv"
}