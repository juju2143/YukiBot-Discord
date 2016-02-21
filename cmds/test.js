module.exports = {
    "name": "test",
    "author": {
        "name": "Julien \"juju2143\" Savard",
        "url": "http://juju2143.ca",
        "email": "juju@juju2143.ca",
    },
    "homepage": "https://github.com/juju2143/YukiBot-Discord",
    "version": "1.0.0",
    "description": "Test",
    "usage": "",
    "help": "Vérifie le bon fonctionnement du bot.",
    "main": (bot, message, argv) => {
        bot.reply(message, "test failed, you stupid baka");
    }
}
