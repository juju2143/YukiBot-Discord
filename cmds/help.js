module.exports = {
    "name": "help",
    "author": {
        "name": "Julien \"juju2143\" Savard",
        "url": "http://juju2143.ca",
        "email": "juju@juju2143.ca",
    },
    "homepage": "https://github.com/juju2143/YukiBot-Discord",
    "version": "0.1.0",
    "description": "Aide en ligne",
    "usage": "[commande]",
    "help": "Sans argument, donne la liste de toutes les commandes.\nAvec argument, explique l'utilisation d'une commande.",
    "main": (bot, message, argv, config, cmds) => {
        if(argv.length == 1)
        {
            var list = "";
            cmds.forEach((item) => {
                list += config.cmdchar+item.name+" - "+item.description+"\n";
            });
            bot.reply(message, "voici une liste non-exhaustive des commandes disponibles:\n"+
                               list+
                               "Utilise \""+config.cmdchar+module.exports.name+" commande\" pour de l'aide sur une commande particulière.\n"+
                               process.env.npm_package_name+" v"+process.env.npm_package_version+" créé par "+process.env.npm_package_author_name+"\n"+
                               "Powered by "+process.env.npm_config_user_agent);
        }
        else
        {
            if(argv[1].startsWith(config.cmdchar))
                argv[1] = argv[1].substring(config.cmdchar.length);
            var cmd = cmds.filter((item) => {
                return item.name == argv[1];
            });
            if(cmd.length >= 1)
                cmd.forEach((item) => {
                    bot.reply(message, item.name+" - "+item.description+"\n"+
                                       "Utilisation: "+config.cmdchar+item.name+" "+item.usage+"\n"+
                                       item.help+"\n"+
                                       item.name+" v"+item.version+" créé par "+item.author.name);
                });
            else
                bot.reply(message, "aucune aide là-dessus, désolé.");
        }
    }
}
