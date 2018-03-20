const { OOPS_TEXT } = require('../messages')

const TIP_TEXT = '指定先へRingoをお届けしました！'
const PROPER_AMOUNT_TEXT = 'お届け数量が分かりません。半角数字かどうか確認して下さい。'
const NO_COMMA_TEXT = '区切り文字 "," は使えません。小数点 "." を使って下さい。'
const NEED_USER_TEXT = 'お届け先がわかりません。tip <数量> の続きに相手先を指定して下さい。'
const NOT_ENOUGH_FUNDS = '残高が足りないかゼロです。balanceで残高を確認して下さい。'

function tip (message, dogecoinNode, amount) {
  var to = message.mentions.users.first()

  if (!to) {
    message.reply(NEED_USER_TEXT)
    return
  }

  var amountInt = parseFloat(amount)  //Intだと小数点が潰されてしまうのでfloatに
  //parseFloat(amount).toFixed(8)という手段もあるけど、これだと四捨五入で0.123456789と入れると0.12345679という結果になるので除外。
  //そのため、Math.floorで８桁ほど移動させ、残りをfloorで潰して再度8桁戻す。ちなみにsliceは数値には使えないらしい。
  //他に良い方法があれば、そのやり方でお願いします。もしかして "amouintInt = "のところは要らない？
  amountInt = Math.floor(amountInt * 100000000) /100000000

  if (!amountInt) {
    message.reply(PROPER_AMOUNT_TEXT)
    return
  }

  // If amount has a comma
  if (amount.indexOf(',') >= 0) {
    message.reply(NO_COMMA_TEXT)
    return
  }

  var fromAccount = message.author.id
  var toAccount = to.id

  dogecoinNode.getBalance(fromAccount, function (err, balance) {
    if (err) {
      console.error(err)
      message.channel.send(OOPS_TEXT)
      return
    }

    // We don't have enough funds...
    if (balance - amountInt <= 0) {
      message.reply(NOT_ENOUGH_FUNDS)
      return
    }

    dogecoinNode.move(fromAccount, toAccount, amountInt, function (err, result) {
      if (err) {
        console.error(err)
        message.channel.send(OOPS_TEXT)
        return
      }
      console.log("tip:"+fromAccount+"=>"+toAccount+" amount:"+amountInt)
      message.reply(TIP_TEXT)
    })
  })
}

module.exports = tip
