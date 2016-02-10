var Discord = require("discord.js");
var config = require("./config.json");
var http = require("https");
var mybot = new Discord.Client();

mybot.on("message", function(message){
    var argv = message.content.split(" ");
    if(argv[0] === "!test")
    {
        mybot.reply(message, "test failed, you stupid baka");
    }
    if(argv[0] === "!help")
    {
        if(argv.length == 1)
            mybot.reply(message, "voici une liste non-exhaustive des commandes:\n"+
                                 "!test - Test\n"+
                                 "!help - Aide\n"+
                                 "!derpibooru - Rechercher une image dans Derpiboo.ru\n\n"+
                                 "Utilise \"!help commande\" pour de l'aide sur une commande particulière.\n"+
                                 process.env.npm_package_name+" v"+process.env.npm_package_version+" créé par "+process.env.npm_package_author_name);
        else
        {
            if(argv[1] === "test")
                mybot.reply(message, "test - vérifie le bon fonctionnement du bot\n"+
                                     "Utilisation: !test");
            if(argv[1] === "help")
                mybot.reply(message, "help - explique l'utilisation d'une commande\n"+
                                     "Utilisation: !help [commande]\n"+
                                     "Sans argument, donne la liste de toutes les commandes.");
            if(argv[1] === "derpibooru")
                mybot.reply(message, "derpibooru - recherche une image sur Derpibooru\n"+
                                     "Utilisation: !derpibooru <mots clés>\n"+
                                     "Lance une recherche sur Derpibooru avec les mots clés spécifiés et retourne la première image trouvée.");
        }
    }
    if(argv[0] === "!derpibooru")
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
});

console.log("Started Discord bot.");
mybot.login(config.email, config.password);
