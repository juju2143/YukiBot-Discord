module.exports = {
    "name": "derpibooru",
    "author": {
        "name": "Julien \"juju2143\" Savard",
        "url": "http://juju2143.ca",
        "email": "juju@juju2143.ca",
    },
    "homepage": "https://github.com/juju2143/YukiBot-Discord",
    "version": "0.1.0",
    "description": "Lance une recherche sur Derpibooru",
    "usage": "<mots clés>",
    "help": "Lance une recherche sur Derpibooru avec les mots clés spécifiés et retourne la première image trouvée.",
    "main": (bot, message, argv) => {
        var http = require("https");
        bot.startTyping(message);
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
                bot.stopTyping(message);
                try
                {
                    var s = JSON.parse(chunk);
                }
                catch(e)
                {
                    bot.reply(message, "il y a eu une erreur. Rien de trop grave. Essaie encore?");
                }
                if(s)
                    if(s["total"] == 0)
                        bot.reply(message, "no results found. Try again?");
                    else
                    {
                        //bot.sendFile(message, "https:"+s["search"][0]["image"], s["search"][0]["file_name"]);
                        bot.reply(message, "https://derpiboo.ru/"+s["search"][0]["id_number"]);
                    }
            });
            res.on('error', () => {
                bot.reply(message, "il y a eu une erreur. Rien de trop grave. Essaie encore?");
            });
        });
    }
}
