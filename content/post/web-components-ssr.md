```yml
title: Web Components を SSR する方法
description: Web Components を SSR( Server Side Rendering ) する方法
image: /asset/image/web-components-ssr.png
```

この記事は [Web Components Advent Calendar 2018](https://qiita.com/advent-calendar/2018/web-components) の 1 日目の投稿です。

# Web Components を SSR する方法

SSR、面倒ですよね。

できれば関わりたくない問題です。

しかし Bot にコンテンツを読み込ませるためには当面避けては通れない問題です。

もうひとつ、パフォーマンスのために SSR すべきだという論調もありますが、パフォーマンスのため **だけ** なら SSR は不要だと考えています。パフォーマンスが目的なら SSR よりも [web.dev](https://web.dev/fast) にあるような改善を愚直にやっていくほうが効果的だと思ってます。

React とかであれば SSR の基盤が整っているので、アプリケーションを isomorphic に構築さえしていれば SSR はそう難しくない問題かと思います。しかし Web Components は事情が異なります。

( そもそも isomorphic を求められるのって嬉しいんだっけという議論は置いときます。フロントエンドはブラウザの生態系のほうが確実に早く進化するので、isomorphic を捨てて Puppeteer とかでレンダーしちゃったほうが良くない? など... これはまたいつか )

## Shadow DOM, SSR できない問題

Web Components を使ったアプリケーションなら、ほとんどの場合 Shadow DOM も併用しますよね。

でも Shadow DOM は HTML を文字列として取得したときには _隠れて_ しまいます。

SSR のためには HTML を文字列として表現する必要がありますが、文字列にしたとき Shadow DOM の内容が取れないようではそもそも SSR の意味がなくなってしまいます。

つまり、Shadow DOM を使ったアプリケーションは文字列にすることができず、結果的に SSR できないということになります。

SSR する必要性のあるアプリケーション、たとえばブログなどは Web Components を使うことができない... そんな結論に至ってしまうのは、まだ早いです。

## `slot` を思い出す

Shadow DOM の中で `slot` 要素を使うと、Shadow DOM の親要素( 普通は Custom Elements )の内容を Shadow DOM 内部にアサインできます。

この仕組みを使えば、Web Components でも SSR できます。

## Web Components の SSR

`slot` によって Shadow DOM から呼び出されることを期待したコンテンツだけを SSR します。

結果的にサーバから返ってくる HTML の `body` の中はこんな感じになります。

```html
<x-app>
	<article>
		<h1>Today's news</h1>
		<p>...</p>
	</article>
</x-app>
```

`x-app` 要素は Custom Elements で、この内側に Shadow DOM を生やします。Shadow DOM にはアプリケーションを構成する要素のほか、必ず `slot` 要素を含めます。

アプリケーションが構築された状態はこんな感じになります。

![shadowRoot にアプリと <slot> を render](/asset/image/web-components-ssr.png) ( [HTML5 Conference 2018](https://events.html5j.org/conference/2018/11/) でこのトピックを一瞬話したので、[そのときのスライド](https://speakerdeck.com/aggre/realistic-web-components) から引用しました。

アプリケーションは Shadow DOM の内部に構築されていますが、ドキュメントとして意味を持った要素は Shadow DOM の外側にあるので SSR が可能になります。

それだけでなく、アプリケーションのマウントポイントが常に初期状態であることが担保できるので、ハイドレーションも不要になります。

## SSR すべき要素

`slot` を使った部分的 SSR ではアプリケーションのほんの一部だけを SSR することになりますが、それでも問題はないと考えています。

SSR はドキュメントを Bot に読み込ませることが目的ですが、読み込ませる必要性のある要素は限られているはずだからです。

基本的に `head` のほか、文書的な意味合いをもつ要素があればいいはずです。`nav` とか `header`, `footer` も文書には必要ですが、フルスペックの文書を求めてくる Bot は Google ぐらいしか知りませんし、その Google の Bot はスクリプト実行環境を持っているので気にする必要はありません。

SSR のターゲットとして Feedly や Pocket のようにスクレイピングして簡易表示するような Bot に対して意味のある文書が SSR できていれば問題はないはずで、アプリケーション全体を SSR する必要はないのではないでしょうか。

サーバーのレスポンスも軽量化できるのでパフォーマンスにも貢献するはずです。

## SSR したコンテンツを無駄にしない

SSR の結果作られた _初期状態の要素_ を削除してしまうことなく活用したいと考えるはずです。

その方法は簡単で、_Custom Elements の内側に要素が存在している場合には 1 回目のレンダリングをスキップする_ ことで対応できます。

スキップする方法はいろいろあると思いますが、以下は、このサイトでのソースの一部です。

```ts
import { render, html } from 'lit-html'
import { xApp } from './element/x-app'
import { content } from './store/content'
import { skip } from 'rxjs/operators'
import { markedHTML } from './lib/marked-html'
const { customElements } = window
const APP = 'x-app'
const RENDERED = Boolean(document.querySelector(`${APP} > *`))
const ROOT = document.querySelector(APP)

customElements.define(APP, xApp)
customElements
	.whenDefined(APP)
	.then(() => (document.querySelector(APP) as Element).classList.add('show'))
	.catch((err) => console.warn(err))

content.pipe(skip(RENDERED ? 2 : 0)).subscribe((x) => {
	render(html` ${markedHTML(x ? x.body : '')} `, ROOT || document.body)
})
```

( 全体は https://github.com/aggre/aggre.io/blob/master/src/index.ts にて確認できます )

`customElements.define(APP, xApp)` によって Custom Elements が定義されると、Shadow DOM 内部にアプリケーションがレンダリングされます。この処理は必ず実行されます。

`content` という RxJS の BehaviorSubject を購読して `x-app` の内側の要素を書き換えます。この書き換え処理を、`RENDERED` が `true` なら 2 回スキップ、そうでなければスキップせずにレンダリングします。スキップがなぜ 2 回なのかは BehaviorSubject の仕様を配慮しています。

とにかく、SSR 済みであれば 1 回目のレンダリングをスキップできればいいということです。

## Web Components でも SSR できる

以上、Web Components における SSR の方法についての話でした。

記事のタイトルですが正確には _Web Components を使ったアプリケーションで SSR する方法_ になる気がしますが、目標としては Web Components を使ったアプリケーションにおいても SSR によって Bot に有効なドキュメントを返せることのはず。なので、このタイトルにしました。

ほかにも方法論はあると思いますが、`slot` という標準仕様を活用することでプロジェクトをシンプルに保てると思います。

参考になれば幸いです。

---

[Web Components Advent Calendar 2018](https://qiita.com/advent-calendar/2018/web-components) 2 日目は [hiro](https://twitter.com/hirodeath) さんです！
