# DDNS自動Updater

## やりたいこと

家の鯖でDDNSするものの自動化

## 現状

IPを渡すと自動で変更してくれるところまで

## つかいかた

nodeでつかうものインストール
```
$ npm i
```

認証情報を ./credential.js に以下のフォーマットで作成
```
imodule.exports = {
    'email': <ログインID>,
    'password': <ログインPW>,
    'ip': <変更後のIP>,
    'domainId': <設定画面で使われているID>
}
```