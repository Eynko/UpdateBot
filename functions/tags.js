const Discord = require('discord.js')
const fs = require('fs')
var myfs = require("./myfs");
// Regex to find tags
regex = /[A-z]\w+:/g;
const prefix = '!';//Prefix to access command

function isTag(tags, tag) {

    if (tags.includes(tag)) {
        return true;
    }
    return false;
}

// Finds all the tags
function findTags(path, file) {
    // Read in the file
    var data = fs.readFileSync(path + file, 'utf8');
    // Find all the tags in the file and put them in the tags array
    tags = data.match(regex);
    return tags;
}

//Lists the array in passedTags
function tagList(path, file) {
    // use a string and append all the tags on to the same string
    tags = findTags(path, file);
    var list = "List of Tags:\n```";
    tags.forEach(function (entry) {
        list = list + entry + " \n";
    })
    list += "```"
    return list;
}

// Edits the tag with user input
function editTag(message, path, file) {
    let arg = message.content.substring(prefix.length).split(" ");
    let tag = arg[1];
    tags = findTags(path, file);

        if (isTag(tags, tag)) {
            // User input to be inserted
            // Skips the firsts 2 arguments and puts the rest in an array
            var myArgs = " " + arg.splice(2).join(' '); // Combine the array together and separate each element with a space

            // Read in the file
            data = fs.readFileSync(path + file, 'utf8');
            // Array of the textfile split by each tag
            text = data.split(regex); // Each index of this array will correspond to the index of its corresponding tag index in the tags array

            // Find index of the tag in the tags array
            index = tags.indexOf(tag);
            // Count the amount of new line characters
            var newlineCount = text[index + 1].split('\n').length - 1;
            // Add the new line character(s) to the input
            for (var i = 0; i < newlineCount; i++) {
                myArgs += "\n";
            }
            // Locate the text to be replaced and insert input
            text[index + 1] = myArgs;
            var finalText = "";
            // Combine the text again with the tags
            for (var i = 0; i < tags.length; i++) {
                finalText += tags[i];
                finalText += text[i + 1];
            }
            // Write it back to the file
            fs.writeFileSync(path + file, finalText, 'utf-8');
        } 
        message.channel.send(tag + " has been updated.");
}




module.exports = { isTag, tagList, editTag, findTags };