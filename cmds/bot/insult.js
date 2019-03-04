const fs = require("fs")
const Discord = require("discord.js")
let insult = JSON.parse(fs.readFileSync(`./json/allowinsult.json`, "utf-8"))

module.exports.run = async (bot, message, args) => {

    if (message.author.id === message.guild.ownerID) {
        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setTitle("Missing arguments !")
                .setAuthor(message.author.username, message.author.avatarURL)
                .addField("Please specify a command :", "`on`, `off`")
            message.channel.send(embed)
            message.delete()
        } else {
            switch (args[0]) {
                case "on":
                        insult[message.guild.id] = {
                            on: 1
                        }
                        message.channel.send("Blacklisting words has been activated !")
                        message.delete()
                    break;
                case "off":
                        insult[message.guild.id] = {
                            on: 0
                        }
                        message.channel.send("Blacklisting words has been desactivated !")
                        message.delete()
            }
            fs.writeFile(`./json/allowinsult.json`, JSON.stringify(insult), (err) => {
                if (err) console.log(err)
            })
        }
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
    name: "insult"
}