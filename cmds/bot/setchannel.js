const fs = require("fs")
const Discord = require("discord.js")
let channel = JSON.parse(fs.readFileSync("./json/channel.json", "utf-8"))

module.exports.run = async (bot, message, args) => {

    let channel2 = message.mentions.channels.first()

    if (message.author.id === message.guild.ownerID) {
        if (!channel2) {
            channel[message.guild.id] = {
                channel: "NONE",
                name: "NONE"
            }
            message.channel.send(`Channel set to : \`NONE\``)
            message.delete()
        } else if (channel2) {
            channel[message.guild.id] = {
                channel: channel2.id,
                name: channel2.name
            }
            message.channel.send(`Channel set to : ${channel2}`)
            message.delete()
        }
        fs.writeFile(`./json/channel.json`, JSON.stringify(channel), (err) => {
            if (err) console.log(err)
        })
    } else {
        let embed2 = new Discord.RichEmbed()
            .setTitle("Permission")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`Sorry but you haven't the right to do this. If you're the owner of this server, contact the creator.`)
        message.channel.send(embed2)
    }



}

module.exports.help = {
    name: "setchannel",
    alias: "setc"
}