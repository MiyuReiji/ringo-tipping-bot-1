const HELP_TEXT = '```Command list : \n \
  - **help** : コマンド一覧を表示します \n \
  - **tip** : Ringoを送信します。tip <数量> <送信先>形式です  \n \
  - **balance** : 現在のRingo残高を表示します。 \n \
  - **address** : 預入れ用のRingoアドレスを表示します \n \
  - **withdraw** : Ringoを引出します。withdeaw <数量> <Ringoアドレス>形式です \n \
  - **qrcode** : ＱＲコードを表示します。 \n \
  - 注意 : withdrawには引出手数料 0.0001Rinが必要です。 \n \
  - tipについて : 複数人へ送信することはできません。 \n \
  - 預入用アドレスは時々変わりますので、都度確認してください。\n \
```'

function help(message) {
  message.channel.send(HELP_TEXT)
}

module.exports = help
