module.exports.run = async (bot, message, args) => {
    number = 24;
    imageNumber = Math.floor(Math.random() * (number - 1 + 1)) + 1;
    msg = { files: ['./images/kiss/' + imageNumber + '.png'] }

    var phrase = [
        "It's full of love between them ! ",
        "What a beautiful kiss ! ",
        "Wow, I want one too ! ",
        "They're so lucky to kiss themself ! ",
        "They're so beautiful together ! ",
        "I'm jealous of them ! ",
    ]
    var alone = [
        "You're alone ? ",
        "You must be sad for kiss yourself .. ",
    ]

    pl = Math.floor(Math.random() * alone.length);
    pa = Math.floor(Math.random() * phrase.length);

    message.delete();

    if (!message.mentions.users.first()) {
        message.channel.send(`${message.author} is kissing ${message.author} ! ` + alone[pl] + ":cry:")
    } else {
        message.channel.send(`${message.author} is kissing ${message.mentions.users.first() || message.author} ! ` + phrase[pa] + ":heart_eyes:")
    }
    message.channel.send(msg);
}

module.exports.help = {
    name: "kiss"
}