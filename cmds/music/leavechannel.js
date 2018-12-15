const Discord = module.require("discord.js");
const YTDL = require("ytdl-core");

module.exports.run = async (bot, message, args) => 
{
  if(message.guild.voiceConnection) {
message.guild.voiceConnection.disconnect();
message.channel.send(`I've been disconnected, ${message.author}.`);
  } 
  else{
      message.channel.send(`I must be in a channel, ${message.author}.`);
  }
}

module.exports.help = {
  name: "leave",
  alias: "l"
}