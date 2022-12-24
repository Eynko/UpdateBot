const Discord = require('discord.js')

//delete a message
function deleteMsg(message, arg) {
    //if(message.author.id != "342034424008933396")
    if (message.member.roles.cache.some(role => role.name === "Admin")) {
        if (!arg[1])
            return message.channel.send('Error, please enter how many messages to delete')
        else if (arg[1] > 0 && arg[1] < 11) {
            message.channel.bulkDelete(arg[1]); return;
        }
        else
            return message.channel.send("I can only delete 10 messages at a time!")
    }
    else
        return message.channel.send("You do not have permission to use this command.")
}

function sendHelp(message) {
    var helpMessage = "```py\nPrefix: '!'\n```";
    helpMessage += "```css\ncommands - Prefix[command]\n"
    helpMessage += "#General\n"
    helpMessage += "[coinflip] - Flips coin\n"
    helpMessage += "[rps <hand>] - Play RPS\n"
    helpMessage += "[reddit <string>] - View random images from specific subreddit\n"
    helpMessage += "[filecmd] - View file commands\n"
    helpMessage += "```"
    message.channel.send(helpMessage)
}

function fileCommands(message) {
    
    var cmdMessage = "```py\nPrefix: '!'\n```";
    cmdMessage += "```css\n"
    cmdMessage += "[setpath] - Path you want to go to\n"
    cmdMessage += "[resetpath] - Set path to base directory\n"
    cmdMessage += "[setfile] - File you want to access\n"
    cmdMessage += "[currentpath] - List the current directory\n"
    cmdMessage += "[currentfile] - Lists the file currently set for editing\n"
    cmdMessage += "[ls] - Lists all the files in current directory\n"
    cmdMessage += "[taglist] - lists all the tags in the document selected\n"
    cmdMessage += "[update <tag> <string>] - Edit text in the file\n"
    cmdMessage += "[output] - View contents of current file\n"
    cmdMessage += "```"
    message.channel.send(cmdMessage)
}



module.exports = { deleteMsg, sendHelp, fileCommands };