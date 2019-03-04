const fs = require("fs")
let on = JSON.parse(fs.readFileSync("./json/allow.json", "utf-8"))
const Discord = require("discord.js")
let channel = JSON.parse(fs.readFileSync("./json/channel.json", "utf-8"))
let membercount = JSON.parse(fs.readFileSync("./json/membercount.json", "utf-8"))

module.exports.run = async (bot, message, args) => {

    if (message.author.id === message.guild.ownerID) {
        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setTitle("Missing arguments !")
                .setAuthor(message.author.username, message.author.avatarURL)
                .addField("Please specify a command :", "`on`, `off`, `stat`")
            message.channel.send(embed)
            message.delete()
        } else {
            switch (args[0].toLowerCase()) {
                case `off`:
                    if (on[message.guild.id].on !== 0) {
                        on[message.guild.id] = {
                            on: 0,
                            off: 1
                        }
                        message.channel.send("AddMemberMessage has been desactivated !")
                        message.delete()
                        fs.writeFile(`./json/allow.json`, JSON.stringify(on), (err) => {
                            if (err) console.log(err)
                        })
                    } else if (on[message.guild.id].on === 0) {
                        message.channel.send("You already have desactivated this option !")
                        message.delete()
                    }else if (!on[message.guild.id]) {
                        on[message.guild.id] = {
                            on: 0,
                            off: 1
                        }
                        message.channel.send("AddMemberMessage has been desactivated !")
                        message.delete()
                    }
                    break;
                case `on`:
                    if (on[message.guild.id].on !== 1) {
                        on[message.guild.id] = {
                            on: 1,
                            off: 0
                        }
                        message.channel.send("AddMemberMessage has been activated !")
                        message.delete()
                        fs.writeFile(`./json/allow.json`, JSON.stringify(on), (err) => {
                            if (err) console.log(err)
                        })
                    } else if (on[message.guild.id].on === 1) {
                        message.channel.send("You already have activated this option !")
                        message.delete()
                    } else if (!on[message.guild.id]) {
                        on[message.guild.id] = {
                            on: 1,
                            off: 0
                        }
                        message.channel.send("AddMemberMessage has been activated !")
                        message.delete()
                    }
                    break;
                case `stat`:
                    if (on[message.guild.id].on === 1) {
                        var cste = "`On`"
                    } else {
                        var cste = "`Off`"
                    }
                    if (!on[message.guild.id] || !channel[message.guild.id] || !membercount[message.guild.id]) {
                        message.channel.send("Miss some configuration, please type _welc on/off or _setc #channel or _mc ID_Category !")
                    } else {
                        let config = new Discord.RichEmbed()
                            .setTitle("Configuration for the AddMemberMessage")
                            .addField(`Allow :`, cste)
                            .addField(`Channel :`, `\`${channel[message.guild.id].name}\``)
                            .addField(`MemberCount channel :`, `\`${membercount[message.guild.id].count}\``)
                        message.channel.send(config)
                        message.delete()
                    }
            }
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
    name: "welcome",
    alias: "welc"
}