const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You haven't the right to do this !")
    let nickname = args.join(' ')
    message.guild.members.get("506151275990351923").setNickname(nickname);
    await message.channel.send({
        embed: new Discord.RichEmbed()
            .setTitle("Nickname has been changed")
            .setDescription(`**Changed the name of ${bot.user.username} to ${nickname}**`)
            .setThumbnail(message.guild.iconURL)
            .setFooter(`Copyright - ${bot.user.username}`)
    })
    message.delete()
}

module.exports.help = {
    name: "nick",
    alias: "n"
}