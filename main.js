var Discord = require("discord.js");
var config = require("./config.json");
var http = require("https");
var mybot = new Discord.Client();

mybot.on("message", function(message){
    if(message.content.startsWith(config.cmdchar))
    {
        var argv = message.content.split(" ");
        argv[0] = argv[0].substring(config.cmdchar.length);
        if(argv[0] === "test")
        {
            mybot.reply(message, "test failed, you stupid baka");
        }
        if(argv[0] === "help")
        {
            if(argv.length == 1)
                mybot.reply(message, "voici une liste non-exhaustive des commandes:\n"+
                                     config.cmdchar+"test - Test\n"+
                                     config.cmdchar+"help - Aide\n"+
                                     config.cmdchar+"derpibooru - Rechercher une image dans Derpiboo.ru\n\n"+
                                     "Utilise \""+config.cmdchar+"help commande\" pour de l'aide sur une commande particulière.\n"+
                                     process.env.npm_package_name+" v"+process.env.npm_package_version+" créé par "+process.env.npm_package_author_name);
            else
            {
                if(argv[1].startsWith(config.cmdchar))
                    argv[1] = argv[1].substring(config.cmdchar.length);
                if(argv[1] === "test")
                    mybot.reply(message, "test - vérifie le bon fonctionnement du bot\n"+
                                         "Utilisation: "+config.cmdchar+"test");
                else if(argv[1] === "help")
                    mybot.reply(message, "help - explique l'utilisation d'une commande\n"+
                                         "Utilisation: "+config.cmdchar+"help [commande]\n"+
                                         "Sans argument, donne la liste de toutes les commandes.");
                else if(argv[1] === "derpibooru")
                    mybot.reply(message, "derpibooru - recherche une image sur Derpibooru\n"+
                                         "Utilisation: "+config.cmdchar+"derpibooru <mots clés>\n"+
                                         "Lance une recherche sur Derpibooru avec les mots clés spécifiés et retourne la première image trouvée.");
                else
                    mybot.reply(message, "aucune aide là-dessus, désolé.");
            }
        }
        if(argv[0] === "derpibooru")
        {
            mybot.startTyping(message);
            var q = encodeURI(argv.slice(1).join(" "));
            http.get({
                hostname: 'derpibooru.org',
                port: 443,
                path: "/search.json?q="+q
            }, (res) => {
                var chunk = "";
                res.on('data', (c) => {
                    chunk += c;
                });
                res.on('end', () => {
                    mybot.stopTyping(message);
                    try
                    {
                        var s = JSON.parse(chunk);
                    }
                    catch(e)
                    {
                        mybot.reply(message, "il y a eu une erreur. Rien de trop grave. Essaie encore?");
                    }
                    if(s)
                        if(s["total"] == 0)
                            mybot.reply(message, "no results found. Try again?");
                        else
                        {
                            //mybot.sendFile(message, "https:"+s["search"][0]["image"], s["search"][0]["file_name"]);
                            mybot.reply(message, "https://derpiboo.ru/"+s["search"][0]["id_number"]);
                        }
                });
                res.on('error', () => {
                    mybot.reply(message, "il y a eu une erreur. Rien de trop grave. Essaie encore?");
                });
            });
        }
    }
});

console.log("Started Discord bot.");
mybot.login(config.email, config.password);
