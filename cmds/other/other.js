const Discord = module.require("discord.js");
const botSettings = require("../bot/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {

    let msg = await message.author.send("Generating Others Commands...");
    message.delete().catch();
    let other_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("**:tada:** Others :")
        .setThumbnail(message.guild.iconURL)
        .addField("**`" + prefix + "report`**", "Report an user from this server {*report @... [reason]}")
        .addField("**`" + prefix + "infos`**", "Display bot's information")
        .addField("**`" + prefix + "serverinfos`**", "Display server's information")
        .addField("**`" + prefix + "calculation || c`**", "Execute a calculation")
        .addField("**`" + prefix + "invite`**", "Send a link to invite the bot on your own server")
        .setFooter("Copyright - EternalRat")
    message.author.send(other_embed);

    msg.delete();

}

module.exports.help = {
    name: "helpother",
    alias: "ho"
}