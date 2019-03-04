const fs = require("fs")
const Discord = require("discord.js")

module.exports.run = async(bot,message,args) => {

    let logs = JSON.parse(fs.readFileSync(`./json/logschannel.json`, "utf-8"))
    if (message.author.id === message.guild.ownerID) {
        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setTitle("Missing arguments !")
                .setAuthor(message.author.username, message.author.avatarURL)
                .addField("Please specify a command :", "`on`, `off`")
            message.channel.send(embed)
            message.delete()
        } else {
            switch (args[0].toLowerCase()) {
                case `off`:
                        logs[message.guild.id] = {
                            on: 0,
                        } 
                        message.channel.send("LogsChannel has been desactivated !")
                        message.delete()
                    
                    break;
                case `on`:
                        logs[message.guild.id] = {
                            on: 1,
                        }
                        message.channel.send("LogsChannel has been activated !")
                        message.delete()
            }
            fs.writeFile(`./json/logschannel.json`, JSON.stringify(logs), (err) => {
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
    name: "logschannel",
    alias: "logsc"
}