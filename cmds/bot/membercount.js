const fs = require("fs")
const Discord = require("discord.js")
let channel = JSON.parse(fs.readFileSync("./json/membercount.json", "utf-8"))

module.exports.run = async (bot, message, args) => {

    if (message.author.id === message.guild.ownerID) {
        if (!args[0]) {
                channel[message.guild.id] = {
                    count: "NONE",
                }
                message.channel.send("Channel set to : `NONE`")
                message.delete()
        } else if (args[0]) {
            channel[message.guild.id] = {
                count: args[0],
            }
            message.channel.send(`Channel set !`)
            message.delete()
        }
        fs.writeFile(`./json/membercount.json`, JSON.stringify(channel), (err) => {
            if (err) console.log(err)
        })
    } else {
        let embed2 = new Discord.RichEmbed()
            .setTitle("Permission")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`Sorry but you haven't the right to do this. If you're the owner of this server, contact the creator.`)
        message.channel.send(embed2)
        message.delete()
    }
}

module.exports.help = {
    name: "membercount",
    alias: "mc"
}