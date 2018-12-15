const Discord = require("discord.js")
const botSettings = require("../bot/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {
    let msg = await message.author.send("Generating Help Commands...");
    message.delete().catch();
    let fun_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("General Fun Commands :")
        .setThumbnail(message.guild.iconURL)
        .addField(" :hugging: **`" + prefix + "hug || hg`**", "Hug someone (image) {*hg [@...]}")
        .addField(" :hugging: **`" + prefix + "huggif || gh`**", "Hug someone (gif) {*hg [@...]}")
        .addField(" :kissing_heart: **`" + prefix + "kissgif || kg`**", "Kiss someone (gif) {*hg [@...]}")
        .addField(" :kissing_heart:  **`" + prefix + "kiss`**", "Kiss someone (image) {*kiss [@...]}")
        .addField(" :clap:  **`" + prefix + "slap`**", "Slap someone (gif) {*kiss [@...]}")
        .addField("**`" + prefix + "avatar`**", "Display user's avatar")
        .setFooter("Copyright - EternalRat")
    message.author.send(fun_embed)
    msg.delete()
}

module.exports.help = {
    name: "helpfun",
    alias: "hf"
}