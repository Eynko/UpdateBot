const Discord = require('discord.js')
const fs = require('fs')
var myfs = require("./myfs");
// Regex to find tags
regex = /[A-z]\w+:/g;
const prefix = '!';//Prefix to access command

function isTxtTag(listOfTags, tag) {

    if (listOfTags.includes(tag)) {
        return true;
    }
    return false;
}

// Finds all the tags
function findTxtTags(path, file) {
    // Read in the file
    var data = fs.readFileSync(path + file, 'utf8');
    // Find all the tags in the file and put them in the tags array
    listOfTags = data.match(regex);
}

//Lists the array in passedTags
function tagTxtList(path, file, message) {
    // use a string and append all the tags on to the same string
    findTxtTags(path, file);
    var list = "List of Tags:\n```";
    listOfTags.forEach(function (entry) {
        list = list + entry + " \n";
    })
    list += "```"
    message.channel.send(list);
}

// Edits the tag with user input
function editTxtTag(message, path, file, arg) {
    if(message.member.roles.cache.some(role => role.name === "Admin")) {
        let tag = arg[1];
        tag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
        if(tag.slice(-1) != ":")
            tag += ":"
        findTxtTags(path, file);

            if (isTxtTag(listOfTags, tag)) {
                // User input to be inserted
                // Skips the firsts 2 arguments and puts in a string
                var myArgs = " " + arg.splice(2).join(' '); // Combine the array together and separate each element with a space

                // Read in the file
                data = fs.readFileSync(path + file, 'utf8');
                // Array of the textfile split by each tag
                title = data.split(listOfTags[0]);
                text = data.split(regex); // Each index of this array will correspond to the index of its corresponding tag index in the tags array

                // Find index of the tag in the tags array
                index = listOfTags.indexOf(tag);
                // Count the amount of new line characters
                var newlineCount = text[index + 1].split('\n').length - 1;
                // Add the new line character(s) to the input
                for (var i = 0; i < newlineCount; i++) {
                    myArgs += "\n";
                }
                // Locate the text to be replaced and insert input
                text[index + 1] = myArgs;
                var finalText = title[0];
                // Combine the text again with the tags
                for (var i = 0; i < listOfTags.length; i++) {
                    finalText += listOfTags[i];
                    finalText += text[i + 1];
                }
                // Write it back to the file
                fs.writeFileSync(path + file, finalText, 'utf-8');
                message.channel.send(tag + " has been updated.");
            } 
            else
            {
                message.channel.send("Tag \"" + tag + "\" does not exist.");
            }
    }
    else
        message.channel.send("You do not have permissions to use this command")
}

function outputTxt(path, file, message) {
    message.channel.send("```" + fs.readFileSync(path + file) + "```")
}


module.exports = { isTxtTag, tagTxtList, editTxtTag, findTxtTags, outputTxt };