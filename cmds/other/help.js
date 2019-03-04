const Discord = module.require("discord.js");
const botSettings = require("../bot/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {

    let msg = await message.author.send("Generating Help Commands...");
    message.delete().catch();
    let music_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("General Help Commands :")
        .setThumbnail(message.guild.iconURL)
        .addField(" :musical_note: **`" + prefix + "helpmusic || hm`**", "Display music's commands")
        .addField(" :cop: **`" + prefix + "helpadmin || ha`**", "Display admin's commands")
        .addField(" :gift: **`" + prefix + "helpfun || hf`**", "Display fun commands")
        .addField(" :tada: **`" + prefix + "helpother || ho`**", "Display others commands")
        .addField(" :: **`" + prefix + "helpbot || hb`**", "Display bot setting's commands")
        .setFooter("Copyright - EternalRat")
    message.author.send(music_embed);

    msg.delete();

}

module.exports.help = {
    name: "help",
    alias: "h"
}