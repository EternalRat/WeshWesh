const Discord = module.require("discord.js");
const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You haven't the right for this !");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.send("Specify a member please");
    message.delete().catch();
    let role = message.guild.roles.find(r => r.name === "Muted");
    if (!role) {
        try {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    if (toMute.roles.has(role.id)) return message.channel.send(`${toMute} is already muted`);

    await toMute.addRole(role);
    message.channel.send(`${toMute} has been muted by ${message.author}`);

}

module.exports.help = {
    name: "mute"
}