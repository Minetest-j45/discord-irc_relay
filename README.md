# discord-irc_relay
<br>
<br>
installation<br>
install node.js on your device<br>
make a directory for your bot<br>
change directory to the bot directory in the command line and type `npm init`<br>
press enter for all the things that come up<br>
now type `npm install discord.js`<br>
now type `npm install irc`<br>
change the following in config.json:<br>
token to your discord bot token<br>
discord_server_id to the id of the server you want the bot to relay in<br>
discord_channel_id to the id of the channel you want the bot to relay in<br>
irc_server to the irc server you want the bot to relay to<br>
irc_nick to the nickname of the bot in irc<br>
irc_nickserv (just leave this a it is, it doesnt really matter)<br>
irc_hostserv (just leave this as false)<br>
irc_channel to the irc channel you want the bot to relay to (remember to leave the # there)<br>
go back to the command line and change directory to the bot directory<br>
type `node index.js`<br>
the bot should now work<br>
