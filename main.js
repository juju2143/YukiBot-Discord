var Discord = require("discord.js");
var config = require("./config.json");
var bot = new Discord.Client();
var cmds = [];

bot.on("ready", () => {
    bot.setStatus("online", config.playing).then(() => {
        console.log("Status has been set.");
    });
});

bot.on("message", (message) => {
    if(message.content.startsWith(config.cmdchar))
    {
        var argv = message.content.split(" ");
        argv[0] = argv[0].substring(config.cmdchar.length);
        var cmd = cmds.filter((item) => {
            return item.name == argv[0];
        });
        cmd.forEach((item) => {
            item.main(bot, message, argv, config, cmds);
        });
    }
});
cmds = [];
config.cmds.forEach((item) => {
    cmds.push(require("./"+item));
    console.log("Loaded "+item+".");
});
console.log("Started Discord bot.");
bot.login(config.email, config.password).then((token) => {
    console.log("Signed in. token="+token);
}).catch((err) => {
    console.log("Error signing in. "+err);
});
