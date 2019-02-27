//Déclaration des variables globales
const botSettings = require("./cmds/bot/botSettings.json")
const Discord = require("discord.js")
const prefix = botSettings.prefix
const fs = require("fs")
const moment = require("moment")
const bot = new Discord.Client({ disableEveryone: true })

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()
global.servers = {}
// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

//lecture des fichiers commandes
fs.readdir('./cmds', (err, files) => {

    if (err) return console.log(`err while reading ./cmds`)
    files.forEach((folder) => {
        fs.readdir(`./cmds/${folder}`, (err, files) => {
            if (err) return console.log(`err while reading ./cmds/${folder}`)
            var failed = 0

            files.filter(f => f.split(".").pop() === "js").forEach((file, i) => {
                try {
                    let props = require(`./cmds/${folder}/${file}`)
                    console.log(`${i + 1}: ${file} loaded!`)
                    bot.commands.set(props.help.name, props)
                    bot.commands.set(props.help.alias, props)
                } catch (e) {
                    console.log(`unable to load ./cmds/${folder}/${file}`)
                    console.log(e)
                    failed++
                }
            })
            console.log(`found ${files.length} commands, loaded ${files.length - failed}`)
        })
    })

})

//Annonce que le bot est prêt + set l'activité + option mute
bot.on("ready", async () => {
    console.log(`${bot.user.username} prêt !`)

    let status1 = [
        prefix + "help",
        "https://discord.gg/nKbD57b",
        "Coded in Javascript",
        "Version 1.0"
    ]

    bot.setInterval(function () {
        let status = status1[Math.floor(Math.random() * status1.length)]
        bot.user.setActivity(status)
        //console.log("Statut : " + status)
    }, 10000)
    
    bot.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
    
     setInterval(function () {
        var date = new Date()
        var h = date.getHours()
        var m = date.getMinutes()
        const msgchannel = bot.channels.find(channel => channel.name === "discussion")
        if(h === 11) {
            if(m === 00) {
            let embeded = new Discord.RichEmbed()
                .setColor("#FF0000")
                .setFooter('Copyright - ' + bot.user.username)
                .addField("Nous espérons que vous aimez le serveur !", "Si c'est le cas n'hésitez surtout pas à le partager à vos amis !")
            msgchannel.send(embeded);
            }
        }
     }, 60000)
})

bot.on("guildMemberAdd", async(member) => {
    
   
    let newMember = new Discord.RichEmbed()
        .setTitle(`Welcome ${member.user.username}, you're now on **${member.guild.name}**!`)
        .setThumbnail(member.guild.iconURL)
        .setDescription(`Don't forget to read the charts (rules) and approve it by leaving reactions in order to get your roles.`)
        .setFooter(`Copyright - ${bot.user.username}`)
    member.send(newMember)

     member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = bot.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === "logs-invite");
    if (member.guild.me.hasPermission('MANAGE_CHANNELS') && !logChannel) {
            member.guild.createChannel('logs-invite', 'text')
        } else if (!logChannel) {
            return
        }
    const lognew = new Discord.RichEmbed() 
        .setTitle("New member has arrived")
        .setAuthor(member.user.username)
        .setThumbnail(member.guild.iconURL)
        .addField("Inviter :", inviter.tag)
        .addField("Invite code :", invite.code)
        .addField("Utilisation count since its creation :", invite.uses)
    
         logChannel.send(lognew);

        const role1 = member.guild.roles.find(r => r.name === "Débutant")
        const role2 = member.guild.roles.find(r => r.name === "Initié")
        const role3 = member.guild.roles.find(r => r.name === "Pro")
        const role4 = member.guild.roles.find(r => r.name === "Expert")
        const role5 = member.guild.roles.find(r => r.name === "Confirmé")
        if (invite.uses == 5) {
            if (!member.guild.members.get(invite.inviter.id).roles.has(role1.id)) {
                const upgrade = new Discord.RichEmbed()
                    .addField(`Congratulations ${inviter.username} you had invited 5 peoples or more, you won a grade !`, role1)
                const discussion = member.guild.channels.find(channel => channel.name === "discussion")
                member.guild.members.get(invite.inviter.id).addRole(role1)
                discussion.send(upgrade)
            }
        }
        if (invite.uses == 10) {
            if (!member.guild.members.get(invite.inviter.id).roles.has(role2.id)) {
                const upgrade = new Discord.RichEmbed()
                    .addField(`Congratulations ${inviter.username} you had invited 10 peoples or more, you won a grade !`, role2)
                const discussion = member.guild.channels.find(channel => channel.name === "discussion")
                member.guild.members.get(invite.inviter.id).addRole(role2)
                discussion.send(upgrade)
            }
        }
        if (invite.uses == 15) {
            if (!member.guild.members.get(invite.inviter.id).roles.has(role3.id)) {
                const upgrade = new Discord.RichEmbed()
                    .addField(`Congratulations ${inviter.username} you had invited15 peoples or more, you won a grade !`, role3)
                const discussion = member.guild.channels.find(channel => channel.name === "discussion")
                member.guild.members.get(invite.inviter.id).addRole(role3)
                discussion.send(upgrade)
            }
        }
        if (invite.uses == 20) {
            if (!member.guild.members.get(invite.inviter.id).roles.has(role4.id)) {
                const upgrade = new Discord.RichEmbed()
                    .addField(`Congratulations ${inviter.username} you had invited 20 peoples or more, you won a grade !`, role4)
                const discussion = member.guild.channels.find(channel => channel.name === "discussion")
                member.guild.members.get(invite.inviter.id).addRole(role4)
                discussion.send(upgrade)
            }
        }
        if (invite.uses == 50) {
            if (!member.guild.members.get(invite.inviter.id).roles.has(role5.id)) {
                const upgrade = new Discord.RichEmbed()
                    .addField(`Congratulations ${inviter.username} you had invited 50 peoples or more, you won a grade !`, role4)
                const discussion = member.guild.channels.find(channel => channel.name === "discussion")
                member.guild.members.get(invite.inviter.id).addRole(role5)
                discussion.send(upgrade)
            }
        }
  });
    
    
    
    const channelc = member.guild.channels.find("name", "welcome")
    if (member.guild.me.hasPermission('MANAGE_CHANNELS') && !channelc) {
        await member.guild.createChannel('welcome', 'text')
    } else if (!channelc) {
        return
    }
    let Nm = new Discord.RichEmbed()
        .setTitle(`**${member.user.username}** has arrived in **${member.guild.name}**`)
        .setAuthor(member.user.username, member.user.avatarURL)
        .setThumbnail(member.guild.iconURL)
        .addField(`Welcome to ${member.guild.name} !`, `I hope you'll enjoy your days here !`)
        .setFooter(`Copyright - ${bot.user.username}`)
    channelc.send(Nm)
})

bot.on("guildMemberRemove", async (member) => {
    const bye = member.guild.channels.find('name', 'good-bye')
    if (member.guild.me.hasPermission('MANAGE_CHANNELS') && !bye) {
        await member.guild.createChannel('good-bye', 'text')
    } else if (!bye) {
        return
    }
    let Rm = new Discord.RichEmbed()
        .setTitle(`**${member.user.username}** has left **${member.guild.name}**`)
        .setAuthor(member.user.username, member.user.avatarURL)
        .setThumbnail(member.guild.iconURL)
        .addField(`Good bye to ${member.user.username} !`, `I hope he will be fine now !`)
        .setFooter(`Copyright - ${bot.user.username}`)
    bye.send(Rm)
})

bot.on('messageDelete', async (message) => {
    if (message.author.id === "523581195485839370") return
    const logs = message.guild.channels.find('name', 'logs-report')
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        await message.guild.createChannel('logs-report', 'text')
    } else if (!logs) {
        return console.log('The logs channel does not exist and cannot be created')
    }
    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first())
    let user
    if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)) {
        user = entry.executor.username
    } else {
        user = message.author
    }
    if (logs) {
        const logembed = new Discord.RichEmbed()
            .setTitle('Message Deleted')
            .setAuthor(user.tag, message.author.displayAvatarURL)
            .addField(`**Message sent by ${message.author.username} has been deleted in ${message.channel.name}**`, message.content)
            .setColor("#FF0000")
            .setFooter(`#${message.channel.name}`)
            .setTimestamp()
        //console.log(entry)
        logs.send(logembed)
    }
})

bot.on('message', async message => {

    //Déclaration des variabless
    let banlist = [
        'fdp',
        'fils de pute',
        'connard',
        'connasse',
        'fdp',
        'pute',
        "pd",
        'salope',
        'salop',
        'enfoire',
        "tg",
        "ta gueule",
        'ntm',
        'nique ta mere',
        'pederaste',
        'batard',
        'con',
        'conne',
        'petasse'
    ]

    let foundMatch = ''
    
    let owner = [
        "523581195485839370"
        ]

    if (message.author.id !== owner) {
            if (foundMatch = banlist.find((word) => (new RegExp(`\\b${word.replace(/(.)\1*/g, '$1').replace(/s\b/g, '')}\\b`)).test(message.content.toLowerCase().replace(/(.)\1*/g, '$1').replace(/s\b/g, '')))) {
                    let deleteword = new Discord.RichEmbed()
                        .setColor("#FF0000")
                        .setTitle("Banned words")
                        .setThumbnail(message.guild.iconURL)
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setDescription("You're not allowed to swear!") // c'est mieux formulé je pense
                        .addField("banned word found: ", `\`${foundMatch}\``)
                    message.delete()
                    message.channel.send(deleteword)
                    let channelsx = message.guild.channels.find('name', "logs")
                    channelsx.send(deleteword)
                    let owner = message.guild.owner
                    owner.send(`Someone has sent a wrong word ! ${foundMatch} has been sent by ${message.author.username}`)
                }
    }

    if (message.author.id !== "523581195485839370") {
        let str = [
            "chat",
        ]

        let catMatch = ''

        if (catMatch = str.find((word) => (new RegExp(`\\b${word.replace(/(.)\1*/g, '$1').replace(/s\b/g, '')}\\b`)).test(message.content.toLowerCase().replace(/(.)\1*/g, '$1').replace(/s\b/g, '')))) {
            let catembed = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setTitle("Cat image")
                .setImage("https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif")
                .setFooter("Copryight - " + "EternalRat")
            message.channel.send(catembed)
        }

        let slt = [
            "salut",
            "yo",
            "slt",
            "bonjour",
            "bonchour",
            "bonsoir",
            "hey",
            "hello"
        ]

        let sltMatch = ''

        if (sltMatch = slt.find((word) => (new RegExp(`\\b${word.replace(/(.)\1*/g, '$1').replace(/s\b/g, '')}\\b`)).test(message.content.toLowerCase().replace(/(.)\1*/g, '$1').replace(/s\b/g, '')))) {
            message.reply("Hey !")
        }

        let gn = [
            "bonne nuit",
            "good night",
        ]

        let gnMatch = ''

        if (gnMatch = gn.find((word) => (new RegExp(`\\b${word.replace(/(.)\1*/g, '$1').replace(/s\b/g, '')}\\b`)).test(message.content.toLowerCase().replace(/(.)\1*/g, '$1').replace(/s\b/g, '')))) {
            message.reply("Bonne nuit !")
        }
    }

    if (message.author.bot) return
    if (message.channel.type === "dm") return

    let messageArray = message.content.split(" ")
    let command = messageArray[0]
    if (!command.startsWith(prefix)) return
    let args = messageArray.slice(1)

    let cmd = bot.commands.get(command.slice(prefix.length))
    if (cmd) cmd.run(bot, message, args)

    if (cmd) fs.appendFileSync(`./logs/logs_${moment().format('YYYY-MM-DD')}.txt`, `${moment().format('YYYY-MM-DD, h:mm:ss a')} : La commande ${cmd.help.name} a été faite par ${message.author.username} sur le serveur ${message.guild.name} dans le salon ${message.channel.name} \n`)
    
   
})

bot.login(process.env.TOKEN)
