var irc = require("tmi.js");
var robot = require("robotjs");
var fs = require("fs");

var config = JSON.parse(fs.readFileSync("config.json", "utf8"));

robot.setMouseDelay(200);

var options = {
	options:
	{
		debug: true
	},
	connection:
	{
		random: "chat",
		reconnect: true
	},
	identity:
	{
		username: config.username,
		password: config.password
	},
	channels: ["#twitchplayswordpress"]
};

var client = new irc.client(options);

// Connect the client to the server..
client.connect();

client.on("chat", function(channel, user, message, self)
{
	console.log(user['display-name'] + ":");
	command(message);
});

/**
 * Process the chat to find commands.
 * @param  {string} message The chat line to process.
 */
function command(message)
{
	var commandArray = message.split(" ");

	switch (commandArray[0])
	{
		case "click":
			robot.moveMouse(commandArray[1], commandArray[2]);
			robot.mouseClick();
			console.log("Clicked " + commandArray[1] + ", " + commandArray[2] + ".");
			break;
		case "type":
            //The rest of the string after the command.
            var stringToType = message.substr(message.indexOf(" ") + 1);
            
			robot.typeString(stringToType);
			console.log("Typed " + stringToType + ".");
			break;
		default:
			console.log("No command.");
	}
}