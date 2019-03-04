const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if (!args[0]) {
        let embed2 = new Discord.RichEmbed()
            .setTitle("Missing Argument")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor("RANDOM")
            .setDescription("Right command : **`_invite bot`**")
            .setFooter("Copyright - " + bot.user.username)
        message.channel.send(embed2)
        message.delete()
    } else {
        switch (args[0].toLowerCase()) {
            case "bot":
                let embed = new Discord.RichEmbed()
                    .setTitle("Invite generator")
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setColor("RANDOM")
                    .setDescription("Here is the link for having my bot!\n[LINK TO INVITE THE BOT](https://discordapp.com/oauth2/authorize?client_id=506151275990351923&scope=bot&permissions=2146958847)")
                    .setFooter("Copyright - " + bot.user.username)
                message.channel.send(embed)
                break;
        }
    }

}

module.exports.help = {
    name: "invite"
}