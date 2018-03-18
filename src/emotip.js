
const emotiplist = require('../emotiplist.json')


const TIP_TEXT = '指定先へRingoをお届けしました！'
const PROPER_AMOUNT_TEXT = 'お届け数量が分かりません。半角数字かどうか確認して下さい。'
const NOT_ENOUGH_FUNDS = '残高が足りないかゼロです。balanceで残高を確認して下さい。'


function emotip(reaction, user, coind) {
    //絵文字IDを表示
    if (reaction.message.content.startsWith("EMOJI_ID")) {
        sendDM(user, reaction.emoji.id)
    }

    if (emotiplist[reaction.emoji.id]) {
        let fromAccount = user.id
        let toAccount = reaction.message.author.id
        let amount = parseInt(emotiplist[reaction.emoji.id])
        if (fromAccount == toAccount || reaction.message.author.bot) return
        console.log(fromAccount + ":" + toAccount + "+" + amount)
        coind.getBalance(fromAccount, function (err, balance) {
            if (err) {
                console.error(err)
                reaction.remove()
                return
            }
            console.log(balance + "+" + amount)
            // We don't have enough funds...
            if (balance - amount <= 0) {
                reaction.remove()
                sendDM(user, NOT_ENOUGH_FUNDS)
                return
            }

            coind.move(fromAccount, toAccount, amount, function (err, result) {
                if (err) {
                    console.error(err)
                    reaction.remove()
                    return
                }
                console.log(fromAccount + ">" + fromAccount + "=" + amount)
                sendDM(reaction.message.author, user.username + "さんから" + amount)

            })
        })

    }
}

function sendDM(to, message) {
    to.createDM().then(function (DM) {
        DM.send(message)
    })
}
module.exports = emotip
