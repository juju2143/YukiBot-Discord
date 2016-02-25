module.exports = {
    "name": "color",
    "author": {
        "name": "Julien \"juju2143\" Savard",
        "url": "http://juju2143.ca",
        "email": "juju@juju2143.ca",
    },
    "homepage": "https://github.com/juju2143/YukiBot-Discord",
    "version": "0.1.0",
    "description": "Output a color",
    "usage": "<color>",
    "help": "Generate an image from a color given in argument.",
    "main": (bot, message, argv, config) => {
        var RGBColor = require('rgbcolor');
        var color = new RGBColor(argv.slice(1).join(" "));
        if(color.ok)
        {
            bot.startTyping(message);
            var gd = require('node-gd');
            gd.createTrueColor(config.colorSize[0], config.colorSize[1], (error, img) => {
                if(error)
                {
                    bot.reply(message, "erreur à la création de l'image.");
                }
                else
                {
                    var colour = img.colorAllocate(color.r, color.g, color.b);
                    img.filledRectangle(0, 0, 200, 200, colour);
                    var pic = new Buffer(img.pngPtr(9), "binary");
                    bot.sendFile(message, pic, argv.slice(1).join("_")+".png");
                }
                bot.stopTyping(message);
            });
        }
        else
        {
            bot.reply(message, "ce n'est pas une couleur!");
        }
    }
}
