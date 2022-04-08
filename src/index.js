const tmi = require('tmi.js')
const dotenv = require('dotenv')
dotenv.config()

const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.BOT_PASSWORD
    },
    channels: [process.env.CHANNEL]

}


const client = new tmi.client(options)

client.connect()

client.on('connected', (address, port) => {    //eventos del bot

    client.action('rakanishu12', 'hola ' + address + ' ' + port)

})

//chat, cuando usuario escriba algo
client.on('chat', (target, ctx, message, self) => {

    if (self) return

    const commandName = message.trim()

    if (commandName === 'hello') {
        client.say(target, 'Welcome ' + ctx.username)
    }

    if (commandName === '!game') {
        client.say(target, 'Paolo esta jugando...');
    }

    if (commandName === '!dice') {
        const num = rollDice(10)
        client.say(target, 'Rolled: ' + num)
    }


})


function rollDice(sides) {

    return Math.floor(Math.random() * sides) + 1
}