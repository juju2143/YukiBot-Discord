module.exports = {
    "name": "seen",
    "author": {
        "name": "Julien \"juju2143\" Savard",
        "url": "http://juju2143.ca",
        "email": "juju@juju2143.ca",
    },
    "homepage": "https://github.com/juju2143/YukiBot-Discord",
    "version": "0.1.0",
    "description": "Have you seen me?",
    "usage": "<@user>",
    "help": "Recherche le dernier message l'utilisateur en argument a envoyé sur le canal.",
    "main": (bot, message, argv, config) => {
        if(argv.length > 1)
        {
            bot.startTyping(message);
            bot.getChannelLogs(message, config.seenLastMsgs, {before: message}, (error, messages) => {
                if(!error)
                {
                    var msgs = messages.filter((item) => {
                        return item.author.toString() == argv[1];
                    });
                    if(msgs.length == 0)
                    {
                        bot.reply(message, "je ne l'ai pas vu récemment.");
                    }
                    else
                    {
                        var max = 0;
                        var msg;
                        msgs.forEach((item) => {
                            if(item.timestamp > max)
                            {
                                msg = item;
                                max = item.timestamp;
                            }
                        });
                        bot.reply(message, "la dernière fois que j'ai vu "+argv[1]+", c'était le "+Date(msg.timestamp)+
                                           ", il avait dit, et je cite:\n\""+msg.content+"\"");
                    }
                }
                bot.stopTyping(message);
            });
        }
    }
}
