# YukiBot Mk. III: Discord Edition

*(Not to be confused with my other YukiBots for IRC and Telegram, same spirit, but this one is a complete rewrite for another platform.)*

This is a simple modular IRC-like bot for Discord written in Node.js that does not much right now, but is expected to do way more. Right now it's in French since I made it for a French-language server, but I can easily translate it in English if I need to.

## Installation and running
```
cp config.example.json config.json
$EDITOR config.json # edit that file with your Discord credentials
npm install
npm start
```
It's this easy. The bot will now listen to any message on every server and PM it's on. It is recommended to create a separate account for your bot, just in case.

There's a few commands in the `cmds/` directory you can load in `config.json`, a good template to write your own would be `cmds/test.js`.

For help about the configuration options and writing commands, please check [the wiki](https://github.com/juju2143/YukiBot-Discord/wiki).

Type `!help` in the chat to see what commands are available and have fun ^_^

## Support
[Hop on the official server here](https://discord.gg/0pESCXo5ak2snRh6) and see YukiBot in action!
