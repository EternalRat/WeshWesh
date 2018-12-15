const Discord = module.require("discord.js");
const fs = require("fs");
const botSettings = require("../bot/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have the permission to use this");
    var embedColor = '#ffffff'
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `' + prefix + 'unmute [@User]')
        .setTimestamp();
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.sendMessage(missingArgsEmbed);
    message.delete().catch();

    let role = message.guild.roles.find(r => r.name === "Muted");

    if (!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This utilisateur is unmute");

    await toMute.removeRole(role);

}

module.exports.help = {
    name: "unmute",
    alias: "u"
}
