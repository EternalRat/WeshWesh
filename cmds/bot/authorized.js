const fs = require("fs")
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1])
    if (!target) return
    let add = []

    try {
        add = fs.readFileSync(`./json/authorized/authorizedpeople${message.guild.id}.txt`).toString().split(/\s/)
    } catch (error) {
        //console.log(error)
    }
    if (message.author.id === message.guild.ownerID) {
        switch (args[0]) {
            case "add":
                if (add.includes(target.id)) {
                    message.channel.send("This user is already in the list")
                    message.delete()
                } else {
                    add.push(target.id)
                    let embedadd = new Discord.RichEmbed()
                        .setTitle("An user has been added to the allowlist (swearing)")
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .addField("This user is allowed to swear :", target)
                    message.channel.send(embedadd)
                    message.delete()
                }
                
                break;
            case "remove":
                if (add.includes(target.id)) {
                    add = add.filter(id => id != target.id)
                    let embedremove = new Discord.RichEmbed()
                        .setTitle("An user has been removed to the allowlist (swearing)")
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .addField("This user isn't allowed to swear :", target)
                    message.channel.send(embedremove)
                    message.delete()
                } else {
                    message.channel.send("This user isn't in the list")
                    message.delete()
                }
                break;
            //default:
            /* let embed = new Discord.RichEmbed()
                .setTitle("Missing arguments !")
                .setAuthor(message.author.username, message.author.avatarURL)
                .addField("Please specify a command :", "`add`, `remove`")
            message.channel.send(embed)
            message.delete() */
        }
        fs.writeFile(`./json/authorized/authorizedpeople${message.guild.id}.txt`, add.join(" "), (err) => {
            if (err) console.log(err)
        })
    } else {
        let missing = new Discord.RichEmbed()
            .setTitle("Missing Permission !")
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField("You aren't the owner of this guild to do this command !", `Please contact the owner ${message.guild.owner} !`)
            .setFooter(bot.user.username)
            .setTimestamp()
        message.channel.send(missing)
        message.delete()
    }
}

module.exports.help = {
    name: "authorize"
}