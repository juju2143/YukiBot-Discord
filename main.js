var Discord = require("discord.js");
var fs = require("fs");
var config = require("./config.json");
var bot = new Discord.Client();
var cmds = [];

bot.on("ready", () => {
    if(config.playing)
    {
        bot.setStatus("online", config.playing).then(() => {
            console.log("Status has been set.");
        });
    }
});

bot.on("disconnected", () => {
    console.log("We've been disconncted! Let's try again!");
    bot.login(config.email, config.password).then((token) => {
        console.log("Signed in. token="+token);
    }).catch((err) => {
        console.log("Error signing in. "+err);
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

config.cmds.forEach((item) => {
    cmds.push(require("./"+item));
    fs.watch(item, (event, filename) => {
        console.log("Reloaded "+item+".");
        delete require.cache[require.resolve("./"+item)];
        var newcmd = require("./"+item);
        cmds.filter((i)=>{return i.name == newcmd.name}).forEach((t)=>{
            cmds.splice(cmds.indexOf(t), 1);
        });
        cmds.push(newcmd);
    });
    console.log("Loaded "+item+".");
});

bot.login(config.email, config.password).then((token) => {
    console.log("Signed in. token="+token);
}).catch((err) => {
    console.log("Error signing in. "+err);
});

console.log("Started Discord bot.");
