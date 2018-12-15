const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating Avatar...");
    let target = message.mentions.users.first()

    if(message.mentions.users.first()) {
    let embed = new Discord.RichEmbed()
        .setDescription(`${message.author} here is the avatar of ${target}`)
        .setImage(target.displayAvatarURL)
        .setFooter(`Copyright - ${bot.user.username}`)
    message.channel.send(embed)
    } else {
        let embedalone = new Discord.RichEmbed()
            .setDescription(`Here is your avatar ${message.author}`)
            .setImage(message.author.displayAvatarURL)
            .setFooter(`Copyright - ${bot.user.username}`)
        message.channel.send(embedalone)
    }
    msg.delete();
}

module.exports.help = {
    name: "avatar"
}