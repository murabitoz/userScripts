# UserScripts
[村人(ENo.307, @lv0_murabito)](https://twitter.com/lv0_murabito)の制作したイバラシティ向けのユーザースクリプト等のツールを置いてます。

### UserScriptって何？
ユーザーが作成したスクリプト（プログラム）をブラウザで実行する為の仕組みのことです。そのスクリプト自体もユーザースクリプトと呼ばれます。
ブラウザごとに利用可能な**「アドオン」**の親戚のようなものですね。  
仕組みを実行するために表示が重くなってしまうのがネックですが、本来のページに無い動きをURLを指定して実行できます。

### で、UserScriptってどうやって使うの？
1. Google Chrome / Firefoxなどのモダンブラウザをインストールします。（なければ）  
2. 次のアドオンを使用したいブラウザごとに**一つだけ**インストールします。（作者は現時点でGoogle ChromeのTampermonkeyでだけ動作を確認しています。）  
- Google Chrome
[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
[Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
- Firefox
[Tampermonkey](https://addons.mozilla.org/ja/firefox/addon/tampermonkey/)
[Violentmonkey](https://addons.mozilla.org/ja/firefox/addon/violentmonkey/)
(Greasemonkeyには対応していません。)

3. 以下の一覧からインストールしたいスクリプトを選び、見出しをクリックすると「スクリプトをインストールする画面」が表示されますので、インストールボタンをクリックします。  
（この画面でインストール前にスクリプトの中身を確認することができます。）

### Ibaracity Searchable Battle Formについて
戦闘設定画面のスキル選択フォームを検索機能を追加した複合フォームにするためのスクリプトです。  
スキルリストをテキストで絞り込みできるようになります。  

騒乱イバラシティはスキル習得システムの都合上、いくつかの複合ツリーを伸ばしていくだけで、習得スキル数が物凄いことになります。  
公式の機能でスキルページから除外設定を行うことも出来ますが、「めったに使わないスキルを除外したまま忘れそう！」「スキル毎に除外するか悩むのが面倒くさい！」そういう作者の怠惰な気持ちから生まれた願望を形にしてみました。


[IbaracitySearchableBattleForm.user.js](https://github.com/murabitoz/userScripts/blob/master/IbaracitySearchableBattleForm.user.js)

### 機能の説明
![はうとぅーゆーず](https://github.com/murabitoz/userScripts/blob/master/pic/howToUse.png "使い方")

スキル使用設定のフォームをクリックすると通常通りセレクトボックスのように機能します。  
スキル使用設定のフォームにテキスト入力が出来、入力されたテキストに応じて選択肢が絞り込まれます。  
リストから項目を選択すると、選択が画面に反映されます。
