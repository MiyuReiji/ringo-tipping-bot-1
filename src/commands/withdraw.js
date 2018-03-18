const { OOPS_TEXT } = require('../messages')

const WITHDRAW_TEXT = '指定先へ発送しました！'
const PROPER_AMOUNT_TEXT = 'お届け数量が分かりません。半角数字かどうか確認して下さい。'
const NO_COMMA_TEXT = '区切り文字 "," は使えません。小数点 "." を使って下さい。'
const NEED_ADDRESS_TEXT = 'お届け先が分かりません。withdraw <数量> の続きにお届け先Ringoアドレスを指定して下さい。'
const NO_FUNDS = 'あれ？ あなたのRingo所持量はゼロのようです。'
const NOT_ENOUGH_FUNDS = '残高が足りないかゼロです。balanceで残高を確認して下さい。（引出には0.0001Rinの手数料が必要です）'

function withdraw (message, dogecoinNode, amount, toAddress) {
  var amountInt = parseInt(amount)
  if (!amountInt) {
    message.reply(PROPER_AMOUNT_TEXT)
    return
  }

  // If amount has a comma
  if (amount.indexOf(',') >= 0) {
    message.reply(NO_COMMA_TEXT)
    return
  }

  if (!toAddress) {
    message.reply(NEED_ADDRESS_TEXT)
    return
  }

  var fromAccount = message.author.id
  dogecoinNode.getBalance(fromAccount, function (err, balance) {
    if (err) {
      console.log(err)
      message.channel.send(OOPS_TEXT)
      return
    }
    // We don't have funds...
    if (balance === 0) {
      message.reply(NO_FUNDS)
      return
    }

    // We don't have enough funds...
    if (balance - amountInt <= 0) {
      message.reply(NOT_ENOUGH_FUNDS)
      return
    }

    dogecoinNode.sendfrom(fromAccount, toAddress, amountInt, function (err, result) {
      if (err) {
        console.log(err)
        message.channel.send(OOPS_TEXT)
        return
      }
      message.reply(WITHDRAW_TEXT)
    })
  })
}

module.exports = withdraw
