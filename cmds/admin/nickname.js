const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You haven't the right for this !")
    let nickname = args.join(' ').slice('22')
    let msg = message.guild.member(message.mentions.users.first()).id
    message.guild.members.get(msg).setNickname(nickname);
    await message.channel.send({
        embed: new Discord.RichEmbed()
            .setTitle("Nickname has been changed")
            .setDescription(`**Changed the name of ${message.mentions.users.first().username} to ${nickname}**`)
            .setThumbnail(message.guild.iconURL)
            .setFooter(`Copyright - ${bot.user.username}`)
    })
    message.delete()
}

module.exports.help = {
    name: "nickname",
    alias: "nn"
}