
const emotiplist = require('../emotiplist.json')

const { OOPS_TEXT } = require('./messages')
const TIP_TEXT = 'Wow. Much coins.'
const PROPER_AMOUNT_TEXT = 'You need provide a proper amount to be send.'
const NO_COMMA_TEXT = 'Please avoid "," in your amount and use "."'
const NEED_USER_TEXT = 'Need a user as a third argument'
const NOT_ENOUGH_FUNDS = 'Not enough funds for this transfer. Please add some dogecoins.'

function emotip(reaction, user, coind) {
    if (emotiplist[reaction.emoji.id]) {
        let fromAccount = user.id
        let toAccount = reaction.message.author.id
        let amount = emotiplist[reaction.emoji.id]
        if(fromAccount==toAccount||reaction.message.author.bot)return

        coind.getBalance(fromAccount, function (err, balance) {
            if (err) {
                console.log(err)
                return
            }

            // We don't have enough funds...
            if (balance - amount <= 0) {
                return
            }

            coind.move(fromAccount, toAccount, amount, function (err, result) {
                if (err) {
                    console.log(err)
                    reaction.message.channel.send(OOPS_TEXT)
                    return
                }
                reaction.message.reply("<="+user.name+amount)
            })
        })
    }
}
module.exports = emotip