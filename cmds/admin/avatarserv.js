const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating Avatar...");

    let embed = new Discord.RichEmbed()
        .setDescription(`${message.author} here is the avatar of ${message.guild.name}`)
        .setImage(message.guild.iconURL)
        .setFooter(`Copyright - ${bot.user.username}`)
    message.channel.send(embed)
  msg.delete();
}

module.exports.help = {
    name: "avatarserv",
    alias: "as"
}
