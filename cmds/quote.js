module.exports = {
    "name": "quote",
    "author": {
        "name": "Julien \"juju2143\" Savard",
        "url": "http://juju2143.ca",
        "email": "juju@juju2143.ca",
    },
    "homepage": "https://github.com/juju2143/YukiBot-Discord",
    "version": "0.1.0",
    "description": "Quote",
    "usage": "",
    "help": "Sends a quote in the voice channel the user is connected to.",
    "main": (bot, message, argv) => {
        if(argv.length == 1)
        {
            bot.reply(message, "see full list at https://github.com/juju2143/YukiBot-Discord/wiki/Quotes");
        }
        else
        {
            var voicechan = message.sender.voiceChannel;
            if(voicechan)
            {
                bot.joinVoiceChannel(voicechan, (error, connection) => {
                    if(error) console.log(error);
                    connection.playFile("quotes/"+argv.slice(1).join(" ")+".mp3", (error, intent) => {
                        if(error) console.log(error);
                        intent.on('end', () => {
                            setTimeout(() => {bot.leaveVoiceChannel();}, 3000);
                        });
                    });
                });
            }
            else
            {
                bot.reply(message, "have you joined a voice channel?");
            }
        }
    }
}
