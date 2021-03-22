const Discord = require('discord.js');
const client = new Discord.Client();
const {token, discord_server_id, discord_channel_id, irc_server, irc_nick, irc_nickserv, irc_hostserv, irc_channel} = require('./config.json');
const Irc = require("irc");
discordchannel = "";
var connected = { "discord": false, "irc": false };
client.on('ready', () => {
  console.log("Ready!");
  discordchannel = client.channels.cache.get(`${discord_channel_id}`);
  console.log(`${discordchannel}`);
  discordchannel.send('**Connected**');
  console.log("[Discord] connected!");
  connected["discord"] = true;
  return discordchannel;
});
const irc_bot = new Irc.Client(`${irc_server}`, `${irc_nick}`, {
	userName: `${irc_nick}`,
	realName: "j45's IRC<->Discord relay",
	encoding: 'utf-8',
	autoConnect: false
});
function ConnectIrc() {
    irc_bot.connect(0, function(reply) {
	irc_bot.say("NickServ", `IDENTIFY ${irc_nickserv}`);
        console.log("[IRC] connected!");
        irc_bot.join(`${irc_channel}`);
        connected["irc"] = true;
    });
};
client.on("message", message => {
	if (connected["irc"] != true) return;
	if (message.author.bot == true) return;
	if (message.channel.id != `${discord_channel_id}`) return;
	sendIrc(message);
});
function sendIrc(message) {
	var author = message.author.username;
	var content = message.content;
	irc_bot.say(`${irc_channel}`, `<${author}>: ${content}`);
};
irc_bot.addListener('message', function (from, to, message) {
	if (connected["discord"] != true) return;
	discordchannel.send(`**<${from}>**: ${message}`);
});
irc_bot.addListener("join", function(channel, nick, message) {
	if (connected["discord"] != true) return;
	discordchannel.send(`**${nick}** has joined the channel!`);
});
irc_bot.addListener("part", function(channel, nick, reason, message) {
	if (connected["discord"] != true) return;
	discordchannel.send(`**${nick}** left the channel ${reason}`);
});
irc_bot.addListener('error', function(message) {
    console.log('error: ', message);
});
ConnectIrc();
client.login(`${token}`);
