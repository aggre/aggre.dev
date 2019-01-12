```yml
title: Now 2 にアップグレードした
description: ホームページを Now 2 にアップグレードした
image: /asset/image/og.png
```

# Now 2 にアップグレードした

このページは [Now](https://zeit.co/now) でホスティングしているが、11 月 9 日に [Now 2.0](https://zeit.co/blog/now-2) がリリースされた。このサイトは [6 日前に対応](https://github.com/aggre/aggre.io/commit/5eadd67a65f924c8d5a5f2dc23c5815474303b43) していたのだが、引っ越しなどが続きなかなか記事にできなかった。

さて、[もろもろの変更点は公式を見ていただくのが一番分かりやすい](https://zeit.co/blog/now-2) として、実際に試した所感を超簡単に書く。

## (serve を使う静的サイトは)ローカルのまま動く環境、ではなくなった

会社でやっている [別プロジェクト](https://github.com/frame00/dev-badge) でも Now 2.0 を試したところ、そっちの方はよく動いている。どうやら問題は [serve](https://github.com/zeit/serve) を Now 2.0 で使うときに起きるようだ。

以下、その前提で見てほしい。

---

今までは、Node.js 環境のアプリケーションであれば基本的にローカルと同じように動作するサーバとして Now を使うことができた。

これは Now が `"start": "serve"` のような npm script を実行してくれる、という規約があったからだ。

Now 2.0 では npm script を実行しなくなった。代わりに `builds` というプロパティに指定したビルドプロセスを実行する。

このページは [serve](https://github.com/zeit/serve) が走ることでホスティングされていたが、Now 2.0 になってからはこれに頼ることができなくなった。

現時点での `now.json` はこうなっている。

```json
{
	"version": 2,
	"alias": "aggre.io",
	"builds": [{ "src": "dist/**", "use": "@now/static" }],
	"routes": [{ "src": "/(.*)", "dest": "/dist/$1" }]
}
```

このページは静的ファイルをエントリーポイントにした SPA なので、`dist/**` を `@now/static` というビルトインのビルダーでビルドしている。ここでいうビルドとは、Now のバックエンドとなる Now Lambdas へのデプロイ処理だ。Now Lambdas の実体はコンテナと思われる。

`routes` プロパティではすべてのリクエストを `dist` に転送している。

設定ファイルが複雑になったように見えるが、実際には Now の規約が薄くなり、開発者の裁量が増えたと考えるのが正しそうだ。

~~残念なのは、ローカルのまま動く環境ではなくなったという点だ。~~ ごく一般的な Node.js アプリなら、ローカルでは [micro](https://github.com/zeit/micro) を使うことで Now の環境を簡単に再現できる。設定例としては以下の( 会社でやっている )プロジェクトのほうを参照してほしい。

[frame00/dev-badge](https://github.com/frame00/dev-badge)

## CDN がフリープランでも使える

今回のアップデートで実は一番うれしいのがこれ。今まで、CDN は \$5/月 の課金( プライシングが更新されているのでうろ覚え )が必要だった。

実際に試すと、レスポンスヘッダに `x-now-cache` と `x-now-trace` が追加されているのが分かる。

ただ、常に `x-now-cache: MISS` が返ってきているように見えるので、実際に CDN が有効なのかどうかは分からなかった。[静的ファイルは常に全リージョンに配置される](https://zeit.co/docs/v2/deployments/concepts/cdn-and-global-distribution#basic-cdn) と書いてあるので、キャッシュと捉えるか実体と捉えるのかの差か? など疑問はある。

[追記] 静的サイトではなく Node.js アプリなら Cloudflare による CDN が利用されていることを確認できた。 https://dev-badge.now.sh/zengin-code は Now 2.0 上にデプロイされている。アクセスするとレスポンスヘッダに `server: cloudflare` が追加されている。が、`cf-cache-status` は `MISS` となってしまっている。

[追記] レスポンスヘッダに `cache-control` プロパティがセットされ、`s-maxage` などの CDN で有効なキャッシュ期限を指示する値があれば CDN によるキャッシングが有効になっていることを確認できた。考えてみれば至極当然の振る舞いである。ちなみに新しいデプロイが走るたびに古いキャッシュはパージされるらしい。ちなみに、Node.js アプリでのみ動作しているようで静的サイトでは `x-now-cache: MISS` となる。

---

今回のアップデートは _ロックインのないサーバーレス環境_ としての Now のミッションが大きく前進したと思う。

静的サイトに限らず、サーバーレスのコンピューティング環境としてさらに有効に使っていけるのではと思った。

おしまい。
