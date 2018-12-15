const math = require("mathjs")
const Discord = require("discord.js")

module.exports.run = async(bot,message,args) => {
    if(!args[0]) return message.channel.send("Please input a calculation !")

    let resp;
    try {
        resp = math.eval(args.join(' '))
    } catch(e) {
        return message.channel.send("Sorry, input a valid calculation")
    }

    var calcul = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Math calculation")
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField("Your calcul :", `\`\`\`js\n${args.join('')}\`\`\``)
        .addField("Results :", `\`\`\`js\n${resp}\`\`\``)
    message.delete()
    message.channel.send(calcul)
}

module.exports.help = {
    name: "calcul",
    alias: "cc"
}