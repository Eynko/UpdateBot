const Discord = require('discord.js');
const fs = require('fs');
var tagstxt = require("./tagstxt");
var tagshtml = require("./tagshtml");


function fileExists(path, file) {
    //Library funciton, replaced the old function that checked for empty string.
    if (fs.existsSync(path + file)) {
        return true;
    }
    return false;
}

//Checks if the path exists and then sets it to the path passed in if it does
function setPath(message, arg)
{
    if (fs.existsSync(arg[1])) {
        message.channel.send("path set to: " + arg[1]);
        return arg[1]
    }
    else {
        message.channel.send("Path not found, path set to base directory");
        {
            return "./";
        }
    }
}

function resPath(message)
{
    message.channel.send("Path set to base directory and file has reset.");
    return "./"
    
}


//checks if the file exists, if it does then the file is returned to be set as the file
function setFile(message, path, arg) {
    if(!arg[1]) {
        message.channel.send("No file entered, please enter a valid file")
        return "";
    }

    
    // Check if the file format is supported
    var flag = isSupportedFormat(message, arg[1])
    if(flag != -1)
    {
        file = arg[1];
        //puts the directory and file together
        var filepath = path + file;
        if (fileExists(path, file)) {
            // Attempt to access the file
            fs.access(filepath, fs.F_OK, (err) => {
                
                if (err) {
                    // If the file does not exists, reset the file
                    console.log(err);
                    message.channel.send(file + " does not exist.");
                    return "";
                }
                // If the file exists, set the file
                if (file != "") {
                    message.channel.send('File set to ' + file);
                }
            })
            // Check if txt or html
            // if txt file
            if (flag == 0)
            {
                // Print out the tags for the user
                tagstxt.tagTxtList(path, file, message);
                return file;
            }
            // if html file
            if (flag == 1)
            {
                // Print out the tags for the user
                tagshtml.tagHtmlList(path, file, message);
                return file;
            }
        }
        else {
            message.channel.send(arg[1] + " does not exist in current directory.");
            return "";
        }
    }
    else
    {
        return;
    }

}


//puts all of the files in the current directory into a string and prints it
function listdir(message, path) {
    //libarary function that lists the current directory
    fs.readdir(path, (err, files) => {
        if (err)
            console.log(err);
        else {
            var ourMessage = ("```Current directory files:\n");
            files.forEach(file => {
                ourMessage = ourMessage + file + "\n";
            })
            ourMessage = ourMessage + ("```");
            message.channel.send(ourMessage);
        }
    })
}

function isSupportedFormat(message, file) {
    if(file != "") {
        var check = file
    }
    else 
        return message.channel.send("No file selected, type `!help` for help.")

    if(check.slice(-3) != "txt" && check.slice(-4) != "html")
    {
        message.channel.send("Error: File format is not supported. Only supports txt and htmls.");
        return -1;
    }
    else
    {
        if(check.slice(-3) == "txt")
        {
            // txt file
            return 0;
        }
        else if(check.slice(-4) == "html")
        {
            // html file
            return 1;
        }
    }
}

module.exports = { fileExists, setPath, setFile, listdir, isSupportedFormat, resPath };