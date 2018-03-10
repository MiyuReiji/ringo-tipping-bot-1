const Discord = require('discord.js')
const dogecoin = require('node-dogecoin')()

const settings = require('./settings')
const Commands = require('./commands')
const emotip = require('./emotip')

// Init the Discord client
const client = new Discord.Client()

// Set our dogecoin node IP and port
dogecoin.set('host', settings.RPC_HOST)
dogecoin.set('port', settings.RPC_PORT)

// Register auth value
dogecoin.auth(settings.RPC_USER, settings.RPC_PASSWORD)

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
        Commands.tip(message, dogecoin, args[2])
        break
      case 'balance':
        Commands.balance(message, dogecoin)
        break
      case 'rate':
        Commands.rate(message)
        break
      case 'address':
        Commands.address(message, dogecoin)
        break
      case 'withdraw':
        Commands.withdraw(message, dogecoin, args[2], args[3])
        break
      case 'adopt':
        message.reply('Wow wow')
        break
      case 'qrcode':
        Commands.qrcode(message, dogecoin, Discord)
        break
      case 'voucher':
        Commands.voucher(message, dogecoin, args[2])
        break
      default:
        message.reply('pong')
    }
  } else {
    // Special maxslayer44
    if (message.content.indexOf('wow') >= 0) {
      message.reply('To the MOOoooooooOOOOOOOOOOnnNNN !!')
    }
  }
})

client.on('messageReactionAdd', (reaction, user) => {
      emotip(reaction,user,dogecoin)
  })

client.login(settings.DISCORD_TOKEN)
