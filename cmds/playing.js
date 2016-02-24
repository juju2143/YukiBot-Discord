module.exports = {
    "name": "playing",
    "author": {
        "name": "Julien \"juju2143\" Savard",
        "url": "http://juju2143.ca",
        "email": "juju@juju2143.ca",
    },
    "homepage": "https://github.com/juju2143/YukiBot-Discord",
    "version": "1.0.0",
    "description": "Set status field",
    "usage": "<message>",
    "help": "Sets \"Playing\" status. With no arguments, unsets it.",
    "main": (bot, message, argv) => {
        if(argv.length > 1)
            bot.setStatus("online", argv.slice(1).join(" "));
        else
            bot.setStatus("online", null);
    }
}
