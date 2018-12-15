const Discord = module.require("discord.js")
const botSettings = require("../bot/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {

    let msg = await message.author.send("Generating Music Commands...");
    message.delete().catch();
    let music_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("**:musical_note:** Music :")
        .setThumbnail(message.guild.iconURL)
        .addField("**`" + prefix + "play || p`**", "The bot will play a music [with link]")
        .addField("**`" + prefix + "stop || s`**", "The bot will leave the channel")
        .addField("**`" + prefix + "skip`**", "Skip the actual music [Some problem actually]")
        .addField("**`" + prefix + "join || j`**", "The bot will join your channel")
        .addField("**`" + prefix + "leave || l`**", "The bot will leave your channel")
        .setFooter("Copyright - EternalRat")
    message.author.send(music_embed);

    msg.delete();

}

module.exports.help = {
    name: "helpmusic",
    alias: "hm"
}