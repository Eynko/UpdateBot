const Discord = require('discord.js')
var ftpClient = require('ftp');
const fs = require('fs');

function downloadHtml(message, arg) {
    if(!arg[1])
    {
        message.channel.send("Please enter file name, no files were downloaded")
        return;
    }
    else
    {
        var file = arg[1];
        if(file.slice(-5) != ".html")
            file += ".html"
    }

    var c = new ftpClient()
    c.on('ready', function () {
        c.get('/htdocs/' + file, function (err, stream) {
            if (err) throw err;
            stream.once('close', function () { c.end(); });
            stream.pipe(fs.createWriteStream('files/' + file));
        });
    });


    c.connect({
        host: 'ftpupload.net',
        port: 21,
        user: '',
        password: '',
    });

    message.channel.send("Successfully downloaded " + file)
}

function editHtml(message, arg, path) {

    if(!arg[1])
    {
        return message.channel.send("Please enter file you wish to upload, no files were uploaded")
    }
    else
    {
        var file = arg[1];
        if(file.slice(-5) != ".html")
            file += ".html"
    }



    var c = new ftpClient();
    c.on('ready', function () { //local file, server file
        c.put('files/' + file, '/htdocs/' + file, function (err) {
            if (err) throw err;
            c.end();
        });
    });

    c.connect({
        host: 'ftpupload.net',
        port: 21,
        user: '',
        password: '',
    });
    //                                        v put site here
    message.channel.send('You can view file at ' + file)

}



module.exports = { downloadHtml, editHtml };