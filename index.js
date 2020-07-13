const Discord = require('discord.js');
const auth = require('./auth.json');
const client = new Discord.Client();
const fs = require('fs');

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


client.login(auth.token);
