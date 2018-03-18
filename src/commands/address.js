const { OOPS_TEXT } = require('../messages')

const ADDRESS_TEXT = 'Ringoの出荷先はこちらです : '

function address (message, coind) {
  var account = message.author.id

  // Will create a new account if doesn't exist... ? Should we allow this ?
  // Yes
  coind.getAccountAddress(account, function (err, address) {
    if (err) {
      console.error(err)
      message.channel.send(OOPS_TEXT)
      return
    }

    message.channel.send(ADDRESS_TEXT + address)
  })
}

module.exports = address
