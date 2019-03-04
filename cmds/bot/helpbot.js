const Discord = require("discord.js")
const botsettings = require("../bot/botSettings.json")
const prefix = botsettings.prefix

module.exports.run = async(bot,message,args) => {
	let helpbot = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.avatarURL)
		.setTitle("Bot setting's commands")
		.setColor("#40A497")
		.setThumbnail(message.guild.iconURL)
		.setFooter(bot.user.username)
		.setTimestamp()
		.addField("**`" + prefix + "welcome || welc`**", "Configure if yes or no you want a welcoming/leaving message and show your configuration")
		.addField("**`" + prefix + "authorize`**", "Authorize someone to swear or no")
		.addField("**`" + prefix + "insulte`**", "Configure if yes or no you want to delete swearing words")
		.addField("**`" + prefix + "membercount || mc`**", "Configure the channel for a membercount (must be a voice channel ID)")
		.addField("**`" + prefix + "setchannel || setc`**", "Set the channel about welcoming/leaving message")
		.addField("**`" + prefix + "logschannel || logsc`**", "Configure if yes or no you want to see deleted message since now")
		
	message.author.send(helpbot)
	message.delete()
}

module.exports.help = {
	name: "helpbot",
	alias: "hb"
}