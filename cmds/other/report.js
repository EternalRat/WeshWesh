const Discord = module.require("discord.js");
const botSettings = require("../bot/botSettings.json")
const prefix = botSettings.prefix

module.exports.run = async (bot, message, args) => {
    var embedColor = '#AD91CE'
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `' + prefix + 'report [@User] [Reason]')
        .setTimestamp();
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send(missingArgsEmbed);
    let rreason = args.join(" ").slice(22);
    if (!rreason) return message.channel.send(missingArgsEmbed);

    let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#ff0000")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports-venant-des-membres");
    if (!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o => { });
    reportschannel.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}