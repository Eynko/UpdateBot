const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS, RSA_PKCS1_OAEP_PADDING } = require('constants');
const Discord = require('discord.js')
const fs = require('fs')
const puppeteer = require('puppeteer');
var misc = require("./functions/misc");
var ftp = require("./functions/ftp");
var general = require("./functions/general");
var myfs = require("./functions/myfs");
var tagstxt = require("./functions/tagstxt");
var tagshtml = require("./functions/tagshtml")
const client = new Discord.Client();
var ftpClient = require('ftp');

// Put discord bot token here
const token = '';

const prefix = '!';//Prefix to access command

client.on('ready', () =>{
    console.log('Bot Online'); //Bot has successfully launched
});

//File name
var file = "";
var path = "./";
var ftpConfig = [];
var listOfTags = [];



client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    let arg = message.content.substring(prefix.length).split(" ");
    
    if((message.member.roles.cache.some(role => role.name === "Member")) || (message.member.roles.cache.some(role => role.name === "Admin")))
        console.log("Command has been input")
    else
        return message.channel.send("You must be a member to use commands");


    //Initial command of user
    var string = arg[0].toLowerCase();
    //------------------------------------------------------CASE STATEMENTS-----------------------------------------------------
    switch (string) {
        //Delete messages in bulk
        case 'delete':
            general.deleteMsg(message, arg);
            break;
        
        //Flip coin
        case 'coinflip':
            misc.flip(message);
            break;
        
        case 'rps':
            misc.rps(message, arg);
            break;

        case 'reddit':
            misc.redditURL(message, arg);
            break;

        case 'help':
            general.sendHelp(message);
            break;
        
        case 'filecmd':
            general.fileCommands(message);
            break;

    //------------------------------------------------------TAG SECTION-----------------------------------------------------
        case 'setpath':
            path = myfs.setPath(message, arg) + "/";
            break;
        
        // Set file to read/write
        case 'setfile': // ex: !setfile filename.txt
            file = myfs.setFile(message, path, arg);
            break;

        // Print current file
        case 'currentfile':
            // Check if the file exists
            if (file == "") 
                message.channel.send("No file set.");
            else    
                message.channel.send(file + " is the current file.");
            break;
        
        case 'currentpath':
            // Check if the file exists
            if (path == "")
                message.channel.send("No file set.");
            else
                message.channel.send(path + " is the current directory.");
            break;
        
        case 'resetpath':
            path = myfs.resPath(message)
            file = ""
            break;

        case 'ls':
            myfs.listdir(message, path);
            break;

        //Outputs tags for the current file selected
        case 'taglist':
            switch(myfs.isSupportedFormat(message, file)) {
                case 0:
                    // taglist for txt file
                    tagstxt.tagTxtList(path, file, message);
                    break;
                case 1:
                    // taglist for html file
                    tagshtml.tagHtmlList(path, file, message);
                    break;
                default: break;
            }
            break;
            
        // Update text of a certain tag
        case 'update': // ex: !update tag: text text text text
            switch(myfs.isSupportedFormat(message, file)) {
                case 0:
                    // Update txt file
                    tagstxt.editTxtTag(message, path, file, arg);
                    break;
                case 1:
                    // Update html file
                    tagshtml.editHtmlTag(message, path, file, arg);
                    break;
                default: break
            }
            break;

        case 'output':
            tagstxt.outputTxt(path, file, message);
            break;

        case 'getfile':   
            ftp.downloadHtml(message, arg);
            break;

        case 'uploadfile':
            ftp.editHtml(message, arg, path);
            break;

        //For commands that don't exist
        default:
            message.channel.send("Command not recongnized, type `!help` for help.");
        
    }
})
// For local machine start
client.login(token);
// For hosting on cloud service
//client.login(process.env.token);