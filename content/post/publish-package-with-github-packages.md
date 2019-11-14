```yml
title: GitHub Packages でパッケージを公開する
description: GitHub Packages を使ってパッケージを公開してみた
image: /asset/image/get-started-with-github-packages.png
```

# GitHub Packages でパッケージを公開する

ベータ版だった GitHub Package Registry が [GitHub Packages](https://github.com/features/packages) と名前を変えて一般公開されたので、自分で公開している npm パッケージをいくつか GitHub Packages で公開してみた。

GitHub Packages を使うと GitHub がホストとなりパッケージマネージャーから配信ができる。GitHub の UI からシームレスにパッケージを見つけることができるほか、最近は npmjs.com のように急速にパッケージが増えて運営を圧迫するような状況もあり、レジストリの分散化が求められているのだと思う。

ちなみにビジネスモデルは同一のようで、GitHub Packages も npmjs.com もプライベートパッケージの利用に対して課金する。GitHub Packages には git ホスティングの強みがあるため npmjs.com は何らかの差別化を図っていくと思われる。

## GitHub Packages へパブリッシュ, npmjs.com を非推奨にする

GitHub リポジトリのページに行くと packages というナビゲーションメニューがあるのでそれを開く。だいぶ分かりやすく公開までの手順が書かれている。今回はそれに加えて、npmjs.com で公開したパッケージを非推奨にする方法もまとめてみる。

こんなページ:
![Get started with GitHub Packages](/asset/image/get-started-with-github-packages.png)

### package.json に追記

公開したい npm パッケージの `package.json` に次の設定を追加する。

```json
"publishConfig": { "registry": "https://npm.pkg.github.com/" }
```

これによって GitHub Packages をレジストリとして扱うことを宣言する。ちなみに他のレジストリを使う場合などは [npm ドキュメントにまとまっている](https://docs.npmjs.com/misc/registry) ので参考までに。

#### GitHub Packages は Scoped のみ対応

npm はスコープのないパッケージ( 例えば express など)も公開できたが、GitHub Packages では必ずスコープが求められる。

私のパッケージはスコープがなかったので、今回に合わせて `package.json` の `name` を `@aggre/ullr` のように書き換えた。

### GitHub Packages をレジストリとしてログイン

これから公開するパッケージを GitHub Packages で公開するために、レジストリを GitHub Packages に変えてログインする。通常のログインに `--registry` オプションを足して実行すればいい。

```bash
npm login --registry=https://npm.pkg.github.com/
```

このあと対話的に Username, Password, Email を聞かれるので GitHub のユーザーネーム, Personal access token, メールアドレスを入力する。メールアドレスは GitHub に登録しているものである必要があるかどうかは分からなかったが、私は GitHub に登録しているメールアドレスを使った。

GitHub の Personal access token は、GitHub の Settings -> Developer settings -> Personal access tokens で作成できる。許可するスコープは:

- `repo`
- `write:packages`
- `read:packages`

のようだ。スコープを空にしていても問題はなく、CLI が不足しているスコープを教えてくれるのでそれに合わせて更新すればいい。

### 公開

あとはいつもどおりのコマンドで公開するだけだ。

```bash
npm publish
```

GitHub リポジトリの packages を開くと、パッケージが追加されたのが分かる。

![Screenshot](/asset/image/github-packages-1.png)

今回は次の 2 つのパッケージを公開してみた。

- https://github.com/aggre/ullr/packages
- https://github.com/aggre/lit-style/packages

npmjs.com だと README がそのまま表示されたが、GitHub Packages だと個別に解説を追記するようだ。

![Screenshot](/asset/image/github-packages-2.png)

ちなみに GitHub Packages で公開したパッケージは npmjs.com には公開されていないので、もちろん npmjs.com のページは更新されない。

### npmjs.com を非推奨にする

複数のレジストリに公開するのは非効率なので、今後は GitHub Packages への公開を前提としたい。

そこで、npmjs.com のパッケージを非推奨とする。

[npm deprecate](https://docs.npmjs.com/cli/deprecate) コマンドを使って、npmjs.com で公開されているパッケージページに警告を表示するのと、インストール時には CLI にも警告を出力するように設定する。

まずはレジストリを npmjs.com に戻すために改めてログインする。

```bash
npm login
```

ここで使用するパスワードは npmjs.com のパスワードなので注意。

ログインできたら、今回の場合は次のように実行した。

```bash
npm deprecate ullr@"<=0.12.6" "WARNING: This project has been moved to GitHub Packages. Install using @aggre/ullr instead."
```

パッケージ名やバージョン、新しいパッケージをインストールするための方法などは適宜書き換えてほしい。

npmjs.com のパッケージページに警告が表示できるようになった。

![deprecated](/asset/image/npm-deprecated.png)

## GitHub Packages

GitHub Packages の登場により npmjs.com の負荷は徐々に下がっていくと思われる。プロトコルは共通のものの、検索に互換性はないのでクロスレジストリなプラットフォームが出てくるかもしれない。とはいえパッケージを探すときにレジストリのウェブサイトにアクセスして探すという行為を個人的にはあまりしないので、分断した世界線がひたすら伸び続ける可能性もある。

GitHub は開発, CI, スポンサー, 公開まで完結するプラットフォームとなりパッケージの開発者としては GitHub Packages を積極的に使う動機が強い。

ただしそれは GitHub が独裁的な権力を持つことも意味するので、オープンソースの開発者としては注意深く観察する眼も持ち合わせておく必要もある。今のところ GitHub にそんな兆候はない。
