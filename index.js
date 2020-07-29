const Discord = require('discord.js');
const auth = require('./auth.json');
const meta = require('./info.json');
const client = new Discord.Client();
const fs = require('fs');
const request = require('request');

const options = {
    url: 'https://api.exchangeratesapi.io/latest?base=INR',
    method: 'GET'
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    obj = json;
    json = JSON.stringify(json);
    
    fs.writeFile('info.json', json, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
    for(i in obj.rates){
        console.log(i + " : " + obj.rates[i]);
    }
});

client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
    
    if(msg.content === `Hello <@!${client.user.id}>`){
        msg.reply("Hello dear!");
        
        // const abc = {
        //     "name" : "Akashdeep",
        //     "info" : "Hola",
        // };

        // const jsonString = JSON.stringify(abc, null, 4);

        // fs.writeFile('./info.json', jsonString, err => {
        //     if (err) {
        //         console.log('Error writing file', err)
        //     } else {
        //         console.log('Successfully wrote file')
        //     }
        // });
    }
})

client.on('message', msg => {
    var charge_const;
    var bat_level;

	if (msg.content === '!!ping') {
		msg.channel.send('Pong.');
    }

    else if (msg.content === '!!charge') {
        charge_const = "charge";
        fs.readFile('../bat_level', (err, bat_level) => {
            if (err) throw err;
            console.log(bat_level.toString());
            msg.channel.send("Battery : " + bat_level.toString());
        });
        msg.channel.send('Device Charging ;)');
        fs.writeFile('../charge', charge_const, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });
    }

    else if (msg.content === '!!stopcharge') {
        charge_const = "stopcharge";
        fs.readFile('../bat_level', (err, bat_level) => {
            if (err) throw err;
            console.log(bat_level.toString());
            msg.channel.send("Battery : " + bat_level.toString());
        });
        msg.channel.send('Charging Stopped');
        fs.writeFile('../charge', charge_const, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });
    }

    else if (msg.content === '!!battery') {
        fs.readFile('../bat_level', (err, bat_level) => {
            if (err) throw err;
            console.log(bat_level.toString());
            msg.channel.send("Battery : " + bat_level.toString());
        });
    }
});

client.on('message', msg => {
    
    if(msg.content === '!!crcy'){
        fs.readFile('info.json',(err, json) => {
            if (err) throw err;
            json = json.toString();
            json = JSON.parse(json);
            msg.channel.send('Base = INR');
            for(i in json.rates){
                console.log(i + " : " + json.rates[i]);
                msg.channel.send(i + " : " + json.rates[i]);
            }
        });
    }

    var args = msg.content.split(' ');
    if(args[0] === '!!crcy' && args.length == 2){
        var base = args[1].toUpperCase();
        
        const options = {
            url: 'https://api.exchangeratesapi.io/latest?base=' + base,
            method: 'GET'
        };
        
        request(options, function(err, res, body) {
            let json = JSON.parse(body);
            obj = json;
            json = JSON.stringify(json);

            var size = 0;
            msg.channel.send('Base = ' + base);
            for(i in obj.rates){
                console.log(i + " : " + obj.rates[i]);
                msg.channel.send(i + " : " + obj.rates[i]);
                size++;
            }
            console.log(size);
            if(size == 0){
                console.log("Invalid arguments");
                msg.channel.send("Error : Invalid Arguments");
            }
        });
    }
    else if(args[0] === '!!crcy' && args.length == 3){
        var base = args[1].toUpperCase();
        var symbol = args[2].toUpperCase();

        const options = {
            url: 'https://api.exchangeratesapi.io/latest?base=' + base + '&symbols=' + symbol,
            method: 'GET'
        };
        
        request(options, function(err, res, body) {
            let json = JSON.parse(body);
            obj = json;
            json = JSON.stringify(json);
            // console.log(json);
            var size = 0;
            msg.channel.send('Base = ' + base);
            for(i in obj.rates){
                console.log(i + " : " + obj.rates[i]);
                size++;
                msg.channel.send(i + " : " + obj.rates[i]);
            }
            console.log(size);
            if(size == 0){
                console.log("Invalid arguments");
                msg.channel.send("Error : Invalid Arguments");
            }
        });
    }
    else if(args[0] === '!!crcy' && args.length > 3){
        console.log("Invalid arguments");
        msg.channel.send("Error : Invalid Arguments");
    }
});

client.login(auth.token);
