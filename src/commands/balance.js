const { OOPS_TEXT } = require('../messages')
const { rateDogeEur } = require('../requests')

const BALANCE_TEXT = 'あなたは '

function balance (message, dogecoinNode) {
  var account = message.author.id

  dogecoinNode.getBalance(account, function (err, balance) {
    if (err) {
      console.error(err)
      message.channel.send(OOPS_TEXT)
      return
    }
    message.channel.send(BALANCE_TEXT + balance +" RIN所持しています。")
})
}

module.exports = balance
