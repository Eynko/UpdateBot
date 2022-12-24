const Discord = require('discord.js')
const randomPuppy = require('random-puppy');
prefix = '!'

function flip(message) {
    val = Math.floor(Math.random()*2)
    if(val === 0)
        message.channel.send("Heads");
    else
        message.channel.send("Tails")
}

function rps(message, arg) {
    const acceptedReplies = ['rock', 'paper', 'scissors'];
    const random = Math.floor((Math.random() * acceptedReplies.length));
    const result = acceptedReplies[random];
    const choice = arg[1];
    if (!choice) {
        message.channel.send(`How to play: \`${prefix}rps <rock|paper|scissors>\``);
        return;
    }
    if (!acceptedReplies.includes(choice)) {
        message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
        return;
    }

    var choose = 'I chose ' + result + ", ";
    if (result === choice) {
        message.channel.send(choose + "It's a tie!");
        return;
    }

    switch (choice) {
        case 'rock': {
            if (result === 'paper') {
                message.channel.send(choose + 'I won!');
                return;
            }
            else {
                message.channel.send(choose + 'You won!');
                return;
            }
        }
        case 'paper': {
            if (result === 'scissors') {
                message.channel.send(choose + 'I won!');
                return;
            }
            else {
                message.channel.send(choose + 'You won!');
                return;
            }
        }
        case 'scissors': {
            if (result === 'rock') {
                message.channel.send(choose + 'I won!');
                return;
            }
            else {
                message.channel.send(choose + 'You won!');
                return;
            }
        }
        default: {
            {
                message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
                return;
            }
        }
    }
}

function redditURL(message, arg) {
    if(!arg[1]) {
        message.channel.send("Please enter a subreddit name")
        return;
    }
    else if(arg[2]) {
        message.channel.send("Invalid input")
        return;
    }
    randomPuppy(arg[1]).then(url => {
        if(url != null)
            message.channel.send(url);
        else
            message.channel.send("subreddit does not exist")
    })
}


module.exports = {flip, rps, redditURL};