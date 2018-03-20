const Discord = require('discord.js')
const coind = require('node-dogecoin')()

const settings = require('./settings')
const Commands = require('./commands')
const emotip = require('./emotip')

// Init the Discord client
const client = new Discord.Client()

// Set our dogecoin node IP and port
coind.set('host', settings.RPC_HOST)
coind.set('port', settings.RPC_PORT)

// Register auth value
coind.auth(settings.RPC_USER, settings.RPC_PASSWORD)

client.on('ready', () => {
  console.log('I am ready!')
})

client.on('message', message => {
  // If message has been emitted by a bot do nothing
  if (message.author.bot) return

  if (message.content.startsWith(settings.BOT_PREFIX)) {
    var args = message.content.substring(1).split(' ')
    var command = args[1]

    switch (command) {
      case 'help':
        Commands.help(message)
        break
      case 'tip':
        Commands.tip(message, coind, args[2])
        break
      case 'balance':
        Commands.balance(message, coind)
        break
      /*case 'rate':
        Commands.rate(message)
        break*/
      case 'address':
        Commands.address(message, coind)
        break
      case 'withdraw':
        Commands.withdraw(message, coind, args[2], args[3])
        break
      case 'qrcode':
        Commands.qrcode(message, coind, Discord)
        break
      case 'voucher':
        Commands.voucher(message, coind, args[2])
        break
      default:
        message.reply('pong')
    }
  }
})

client.on('messageReactionAdd', (reaction, user) => {
  emotip(reaction, user, coind)
})

client.login(settings.DISCORD_TOKEN)

process.on("SIGTERM", () => {
  cliant.destroy().then(process.exit())
})