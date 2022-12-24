const Discord = require('discord.js')
const fs = require('fs')
var myfs = require("./myfs");

function isHtmlTag(listOfTags, tag) {

    if (listOfTags.includes(tag)) {
        return true;
    }
    return false;
}

// Finds all the tags
function findHtmlTags(path, file, message) {
    const puppeteer = require('puppeteer');
    var url = require('url');
    const paths = (`${__dirname}` + "\\../" + "files\\" + file);
    (async () => {
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url.pathToFileURL(paths));

        headings = await page.evaluate(() => {
            headings_elements = document.querySelectorAll('*[id]');
            headings_array = Array.from(headings_elements);
            return headings_array.map(heading => heading.id);
            
         
        });
        listOfTags = headings;
        /*
        console.log(headings);
        listOfTags = headings;
        console.log(listOfTags[0]);
        //await page.waitFor(3000);*/
        await browser.close();
    })();

 /*
    setTimeout(test, 1000);
    function test(){
    console.log(listOfTags[1]);
    }*/
}

//Lists the array in passedTags
function tagHtmlList(path, file, message) {
    // use a string and append all the tags on to the same string
    findHtmlTags(path, file, message);
    setTimeout(listHtmlTag, 2000);
    function listHtmlTag() {
        var list = "List of Tags:\n```";
        listOfTags.forEach(function (entry) {
            list = list + entry + " \n";
        })
        list += "```"
        message.channel.send(list);
    }
}

function editHtmlTag(message, path, file, arg) {

    var userInput = arg[1];
    
    // Look if the user input tag is a real tag
    if(isHtmlTag(listOfTags, userInput))
    {
        // User input to be inserted
        // Skips the firsts 2 arguments and puts in a string
        var myArgs = arg.splice(2).join(' '); // Combine the array together and separate each element with a space
        // Create regex for user input
        let replace = "(id(\\s)*=(\\s)*\"" + userInput + "\")([^>]*(?=>))>";
        //console.log(replace);
        let userInputRE = new RegExp(replace);

        // Read in the file
        data = fs.readFileSync(path + file, 'utf8');
                //Old hardcode: /(id = "maintitle")([^>]*(?=>))>/

        // Each index of this array will correspond to the index of its corresponding tag index in the tags array
        beforetext = data.split(userInputRE); 
                //console.log("Before Text Array \n\n" + beforetext);

        //RE that does something
        let dataFinderRE = /^(?:(?!<\/).)+/;

        //The bottom half of the text is in the last element, we want to split that for the text array
        text = beforetext[(beforetext.length - 1)].split(dataFinderRE);
                //console.log("Text Array \n\n" + text);
        
        //Remove the last element in this array as its the bottom half
        beforetext.pop();
        //Gets all the elements in the part before we modify into 1 string
        let i = 0;
        let topHalf = "";
        while (i < beforetext.length)
        {
            //console.log(beforetext[i]);
            if (beforetext[i] !== undefined)
            {
                if (beforetext[i] != " ")
                    topHalf = topHalf + beforetext[i];
            }
            i++;
        }
                //console.log("Tophalf \n\n" + topHalf);

        // Text to be edited   
        text[0] = myArgs;
        //console.log(text);
        //Puts together the text array into 1 string, so we dont have to add seperate array elements
        let botHalf = text.join("");
                //console.log("Bot half \n\n" + botHalf);

        //put together the top half and the bottom half, we spilt by the > so we need to re add it
        let finalText = topHalf + ">" + botHalf;

        // Write it back to the file
        fs.writeFileSync(path + file, finalText, 'utf-8');
        message.channel.send(userInput + " has been updated.");

    }
    // If user input is not a tag
    else
    {
        message.channel.send("Tag \"" + userInput + "\" does not exist.");
    }

}
module.exports = { isHtmlTag, findHtmlTags, tagHtmlList, editHtmlTag};