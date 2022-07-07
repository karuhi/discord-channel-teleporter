# 自分のチームに送ってくれる犬山さん

モブ：「うーん、いちいちチャンネル選んで入るの面倒だから、ボイスチャンネルに入ったら自動で自分のチームのチャンネルに送ってくれる犬山さんって居ないかな〜。。。」

いぬやまさん：「あかんわ。悪魔のささやきや」

モブ：「いぬやまさん、どう思う？」

いぬやまさん：「にしても、ボイスチャンネルに入ったら自動でチームで入れるの、ええなあ」

モブ：「いぬやまさん、やってくれない？」

いぬやまさん：「せやな〜。あったらええけどやりたくはないな〜これ」

モブ：「…」

いぬやまさん：「うそやで〜」

ということで、某 Bot を~~パクって~~思想を受け継いで、便利そうな Bot を犬山さんがやってくれます。

## Bot について
### Bot の導入方法

1. Discordサーバーに [Botを追加する](https://discord.com/oauth2/authorize?client_id=クライアントはまだ非公開♡&scope=bot&permissions=8653899808&scope=bot%20applications.commands)
2. チャンネルを作成する（例の名前：参加でチームに移動）

### Bot の使用方法

1. チャンネルに参加する
2. 既に転送先チャンネルが指定されているか
   1. されていない場合：音声チャンネルのテキストチャンネルに @メンション で登録してない旨が通知されます。
   2. されている場合：転送先チャンネルに転送されます


## 機能（予定）

- [x] 特定のボイスチャンネルに入室すると、設定したボイスチャンネルに転送してくれる
- [x] スラッシュコマンドで転送先ボイスチャンネルを設定できる
- [x] 転送先ボイスチャンネルが設定されてなかったら設定をリマインドしてくれる
- [x] 次回以降（設定済みの場合）は設定したチャンネルに自動で飛ばしてくれる
- [ ] & more

## Packages

- PlanetScale (MySQL)
- Prisma Client
- TypeScript
- Node.js
- discord.js

## 必要な権限

- General permissions
  - Manage Server
  - Manage Events
- Text permissions
  - Send Messages
- Voice permissions
  - Connect
  - Use Voice Activity
  - Mute Members
  - Deafen Members
  - Move Members

基本的にVoice ChannelsとText操作のみ。

