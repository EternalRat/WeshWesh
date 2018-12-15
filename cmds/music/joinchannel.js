const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.member.voiceChannel) {

    if (!message.guild.voiceConnection) {
      message.member.voiceChannel.join().then(connection => {
        message.channel.send("Successfully joined !");
      })
    }
    
  }
  else {
    message.channel.send(`You must be in a channel, ${message.author}`);
  }
}

module.exports.help = {
  name: "join",
  alias: "j"
}