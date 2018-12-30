const Discord = module.require("discord.js");
const botSettings = require("../bot/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the right to do this !");
    let msg = await message.author.send("Generating Moderation Commands...");
    message.delete().catch();

    let admin_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("**:cop:** Moderation help :")
        .setThumbnail(message.guild.iconURL)
        .addField("**`" + prefix + "kick`**", "Kick an user {_kick @... [reason]}")
        .addField("**`" + prefix + "announce`**", "Do an announce {" + prefix + "announce [#channel] [#HTMLCodes] [message]}")
        .addField("**`" + prefix + "ban`**", "Ban an user from this server {" + prefix + "ban @... [reason]}")
        .addField("**`" + prefix + "mute`**", "Mute an user from this server {" + prefix + "mute @...}")
        .addField("**`" + prefix + "unmute || um`**", "Unmute an user")
        .addField("**`" + prefix + "clear || c`**", "Clear messages {" + prefix + "clear [number]}")
        .addField("**`" + prefix + "nickname || nn`**", "Change the name of someone")
        .addField("**`" + prefix + "serverlist || sv`**", "Display servers where the bot is")
        .addField("**`" + prefix + "userinfo`**", "Display user's information")
        .addField("**`" + prefix + "nick || n`**", "Change user's username")
    .addField("**`" + prefix + "guinness || gs`**", "Add a new record to the guinness")
        .setFooter("Copyright - " + bot.user.username)
    message.author.send(admin_embed);
    msg.delete();

}

module.exports.help = {
    name: "helpadmin",
    alias: "ha"
}
