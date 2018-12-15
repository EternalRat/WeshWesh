const Discord = require("discord.js");
const ytdl = require("ytdl-core");
function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if(server.queue[0]) play(connection, messsage);
        else connection.disconnect();
    })
}
var servers = {};
module.exports.run = async (bot, message, args, ops) => {
    //play
    if (!args[0]) {
         message.channel.send("Please specify a link");
         return
    }

    let validate = await ytdl.validateURL(args[0]);

    if(!validate) {
        let commandfile = require('./search.js')
        return commandfile.run(bot,message,args,ops)
    }

    let info = await ytdl.getInfo(args[0]);
    
    if(!message.member.voiceChannel) {
        message.channel.sendd("I think it may work better if you are in a voice channel!");
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    }
    var server = servers[message.guild.id];

    server.queue.push(args[0]);
    message.channel.send(`Now playing: ${info.title}`)
    if(!message.member.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
    })
}

module.exports.help = {
    name: "play",
    alias: "p"
}