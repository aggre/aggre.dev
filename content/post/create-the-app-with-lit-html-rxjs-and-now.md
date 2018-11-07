```yml
title: lit-html + RxJS + now でアプリケーションを作る
description: lit-html + RxJS で FRP な構成のアプリケーションをつくり、now で SSR もしてみた
image: /asset/image/og.png
```

# lit-html + RxJS + now でアプリケーションを作る

このホームページが、それ。

突然なんだけどホームページというものを 10 年以上ぶりにつくった。いや、もしかして 18 年ぶりかも。だとすると 20 年ぶりって言ってもいいくらいだが...

本当はそのきっかけとかを最初に軽く書いて、さっそく lit-html の話に入ろうと思っていたが、書いているうちに熱くなってきてしまい、つい長くなりそうだったので、それはそれで分けて書くことにした。

なので今回は lit-html を使ったアプリケーションの話にする。

ソースコードは [GitHub](https://github.com/aggre/aggre.io) で公開しているし、今さらライブラリのスタックとかで記事にするのもどうなんだろう、という気がしないでもない。でも、lit-html はとても良い選択だと思う一方でマイナーだという印象があり、そこに最近よくトピックにあがる関数型のパラダイムが重なり、書いてみることにした。

ついでに lit-html はじめ Web Components 界隈のスタックは SSR に無頓着というか、実際 SSR しづらい問題もあったので、その辺に対する _ひとつの_ 回答も示したいと思った。

## なぜ lit-html?

What's [lit-html](https://github.com/Polymer/lit-html)、は省略する。

一言でいえば **すべてが 関数 になる** という点。ビューを返すただの関数の集合がアプリケーションになる。純粋関数で書くことを意識すれば、関数型プログラミングの恩恵を受けることができる。ライブラリ自体が TypeScript で書かれているのも安心感がある。

次はすごくシンプルな例だが、これがすべてと言っても過言ではないと思う。

```ts
import { html, render } from 'lit-html'

const helloTemplate = (name: string) => html`<div>Hello ${name}!</div>`

render(helloTemplate('Kevin'), document.body)
```

テンプレートは TemplateResult という型を返す関数として定義できる。テンプレートはネストできるので、複数のテンプレートを組み合わせることで複雑なビューが構築できる。基本的には副作用を生まないことを目指したいので、すべてのテンプレートをアロー関数で表現するのがプラクティスだと思っている。

ちなみに以前こういう記事を書いた。

[lit-html とバニラ Web Components でコンポーネントを実装する](https://qiita.com/aggre/items/3ed2558a9fb8ba887385)

この記事では Custom Elements のテンプレートとして lit-html を採用している。この方法論は、今では個人的には推奨したくない。Custom Elements の境界を超えると、型の恩恵が受けられないためだ。

例えば `x-app` という要素があって、属性なりセッターなりで値を受け取るとする。このとき、呼び出し側のテンプレート `<x-app hoge="foo"></x-app>` はただの文字列なので、型検査ができない。Custom Elements の境界をなるべく減らして、より多くをテンプレート関数で定義することで型のメリットを最大限享受できると思う。

ちなみに、Web Components では **文字列しか渡せない** という制約があったが、lit-html を使えば `<x-app .hoge="${foo}"></x-app>` で `this.hoge` に対してセットすることができる(これもいずれ詳しくまとめたい)。とはいえ、受け取った値が変更されてもそれを知るライフサイクルがないので、限定的な用途になるとは思う。

---

長くなってしまったが、要するに関数の組み合わせで複雑なテンプレートでも表現できる、というのが lit-html の大きな利点だ。テンプレート表現以外の API を持っていないので、ライフサイクル的な役割は別に実装する必要がある。その分、lit-html によるコンポーネント実装は見通しがよくなる。コードで表現されていないことは起きない。

ではライフサイクルをどう表現するか、だが、そこは RxJS のようなリアクティブライブラリとの相性がいい。

基本的に下位のコンポーネントは、上位のコンポーネントによる Subscription によってのみ更新されることになる。純粋なテンプレート関数は純粋関数なので、任意のタイミングで自身の値を操作できない。ゆえに、設計の一貫性も担保できる。

...という理由から、僕は lit-html を使っている。

でもちょっとした問題がある。

### lit-html だけでは補えないもの

lit-html によるテンプレートは、`render()` を実行する度に差分を再描画する。

大きなテンプレートのうち一部を更新したいときでも、都度 `render()` による全体の再評価を挟まないといけない。これは面倒だし、処理のコストも大きい。

幸い、lit-html には `directive` という API がある。これを使って独自の更新ロジックを部分的に適用できる。たとえば、RxJS の Subscribe を購読してテンプレートを更新するとかもできる。

僕は、アプリケーション構築に必要な `directive` 関数群を [ullr](https://github.com/aggre/ullr) というライブラリにして公開していたので、これを使って問題を補った。

## アプリケーションの構築

ソースコードは [GitHub](https://github.com/aggre/aggre.io) にあるので詳しくはそちらを参考にしてもらえればと思う。

ここでは簡単にコードを追ってみたい。

まずは lit-html アプリケーションを HTML にアタッチする箇所。DOM に対して `render()` を呼ぶだけだ。

こんなふうに。

```ts
render(html`${root}`, document.getElementById('root'))
```

ソースでいうと https://github.com/aggre/aggre.io/blob/master/src/index.ts にあたる。

ここでマウントされる `root` というテンプレートは、RxJS の BehaviorSubject を購読して、中身を書き換える。

```ts
import { html, directive } from 'lit-html'
import { content } from '../store/content'
import { markedHTML } from '../lib/marked-html'

export const root = directive(part => {
	content.subscribe(x => {
		part.setValue(html`<x-app>${markedHTML(x ? x.body : '')}</x-app>`)
		part.commit()
	})
})
```

https://github.com/aggre/aggre.io/blob/master/src/component/root.ts

テンプレートに `x-app` という要素が出てくるが、後述する SSR のために登場する Custom Elements で、アプリケーションで唯一の Custom Elements だ。実装は単純で、すべての振る舞いを lit-html 側に寄せている。

```ts
import { customElements } from 'ullr'
import { app } from '../component/app'

export const xApp = customElements(() => app())
```

https://github.com/aggre/aggre.io/blob/master/src/element/x-app.ts

`app()` というのがアプリケーションの本体になる。

アプリケーションの中身はこんな感じ。

```ts
import { html } from 'lit-html'
import { header } from './header'

export const app = () => html`
<style>
	.app {
		margin: auto;
		max-width: 980px;
		display: grid;
		grid-template-areas:
			'header'
			'main';
		grid-gap: 3rem;
		grid-template-columns: 100%;
	}
	.header {
		grid-area: header
	}
	main {
		grid-area: main;
	}
</style>
<div class=app>
	<div class=header>
		${header()}
	</div>
	<main>
		<slot></slot>
	</main>
</div>
`
```

https://github.com/aggre/aggre.io/blob/master/src/component/app.ts

Custom Elements 内の Shadow DOM でカプセル化されるため、`style` 要素はそのまま記述する。あとは、`<slot></slot>` に `x-app` の子要素が入ってくる。もちろん標準仕様としての `slot` なので、実装はランタイムに委ねている。

`header` の中は、ナビゲーションのための BehaviorSubject を購読して `nav` を書き換えるテンプレートになっている。

```ts
import { html } from 'lit-html'
import { nav } from './nav'
import { navs } from '../store/navs'
import { subscribe, component } from 'ullr/directive'
import { a } from './a'

export const header = () =>
	component(html`
<style>
	header {
		display: grid;
		grid-template-areas: 'brand nav';
		grid-template-columns: 1fr auto;
		align-items: center;
	}
	.brand {
		grid-area: brand;
		& a {
			color: blue;
			text-decoration: none;
			font-weight: 700;
		}
	}
	.nav {
		grid-area: nav;
	}
</style>
<header>
	<div class=brand>
		${a({ href: '/', content: 'aggre.io' })}
	</div>
	<div class=nav>
		${subscribe(navs, x => nav(x))}
	</div>
</header>
`)
```

https://github.com/aggre/aggre.io/blob/master/src/component/header.ts

このアプリケーションもといホームページはシンプルなので、大体こんな感じだ。

lit-html と RxJS の組み合わせで、シンプルに記述できた。

## SSR

このホームページはすでに SSR している。

さっきまでのサンプルコードでは Shadow DOM を前提とした `style` の直書きが普通に出てきたが、Shadow DOM 内部のコンテンツは SSR することができない。スクリプトが実行できないと Shadow DOM は使えないが、SSR は非スクリプト環境に対する施策となるから、もう **まったく相性が悪い** 状況だ。[Declarative Shadow DOM](https://github.com/whatwg/dom/issues/510) という提案もあったが、前進しない感じになっている。

そこで、今回はアプリケーションすべてを SSR することを放棄した。Dev Tools でソースを見てもらえれば分かるが、SSR しているのは Shadow DOM の外側だけで、こんな感じになっているはずだ。

```html
<body>
	<x-app>
		<h1>...</h1>
		<p>...</p>
		...
	</x-app>
</body>
```

`x-app` の内側にはスクリプトによって Shadow DOM が生やされて、その中にナビゲーションや本文が入ってくる。本文は `slot` によって外側から宣言されることを期待していて、SSR しているのは、その `slot` に置き換わる予定の要素だけだ。

**SSR の目的は非スクリプト環境に対するドキュメントの生成** なので、アプリケーションすべてをサーバ側でがんばらなくてもいいのでは？と考えている。今回は、本文がちゃんとレスポンスできさえすればいいと考えた。そうすれば Pocket のようなサービスでも読み込めるし、Google だったらスクリプトを実行してくれるはずだ。(パフォーマンスのために SSR するのはもう不要だとする Google I/O での発表があった。あとで URL 見つかったら更新しておく)

### Slotted SSR

Slotted なのか Slotting なのか Slots なのか不安だが、`slot` による部分書き換えを前提にした部分的 SSR をこう呼んでみた。すでに名称があるかもしれないが、知らない。

これは AMP の方法論とも似ている。アプリケーション全体ではなく、表向きの宣言としては文書的意味合いを持つ要素だけにしている。`nav` とか `main` は不要なのかっていうとそうではないが、そこまで評価しようとする環境は Google くらいしか知らないし、Google の bot はスクリプト実行環境がある。だから、気持ち的なドキュメントになっていれば十分なんじゃないかと思う。

さらに言えば、フロントエンドのためのアプリケーションを isomorphic に構築するコストを払いたくない、という事情もある。[Worker DOM](https://github.com/ampproject/worker-dom) のようにフロントエンドの生態系はブラウザが先行するので、Nodejs との共存を捨てたほうが健全なのではないかと思う。

### サーバ側のレンダラー

何の工夫もないが puppeteer を使った。

`jsdom` を使って実装するのも試したし、実際限定的ではあるが ullr にも SSR API を入れた。が、不安定極まりなかった。

[当初は SSR サーバを書いていた](https://github.com/aggre/aggre.io/blob/1666d5b4fd2f77dc7454eec60ed62c1f57189cec/index.js) が、デプロイしてみると PaaS で puppeteer が動かないことが分かった。サーバーレス環境とかで puppeteer が走らないことはよくあって、Docker でサーブするとかも試したものの、疲弊してきたので今回はローカルか CI で **puppeteer を使って静的ファイルを書き出す** というアプローチにスイッチした。

意図せず lit-html 製の Static Site Generator を作ってしまった。

即席で書いたのでコードはかなり汚い。もし興味があったら [これ](https://github.com/aggre/aggre.io/blob/master/pre-render.js) がソースなので、優しいまなざしで見てほしい。

## デプロイ

サーバはメンテナンスしたくないので、Now を使った。Now については次の記事に詳しく書いた。

[Now でクラウドの複雑さから解放されよう、今すぐに](https://qiita.com/aggre/items/f0cb9f8b8e8c54768e50)

CLI で、

```bash
now
```

とするだけでデプロイできる。CI 用のトークンを使えば CI からの自動デプロイも簡単だ。

Now は、開発者からアプリケーション以外の関心事を一切取り除いてくれるのが気に入っている。Now にはベンダーロックインを助長する独自仕様がほとんど存在しない。だからアプリケーションで表現されていないことは、Now でも起きない。ローカルの Nodejs 環境で動くのと同じように動くから、ローカルとリモートの差異を意識する必要がない。

Now の母体 である Zeit は [micro](https://github.com/zeit/micro) や [serve](https://github.com/zeit/serve) というライブラリを公開している。これらライブラリが PaaS の **親切機能** を代替しているから、コードの記述量が増えるというわけでもない。ベンダーロックインがないサーバーレス環境というと分かりやすい。

---

という感じで、かなり長くなってしまったが、lit-html + RxJS + Now で SSR も可能なアプリケーションが構築できた。

今後、個々の要素について詳しい記事も書いていきたいと思っている。

あ、そういえば公開日時の機能を実装してなかった...

とにかく、最後まで読んでいただいた稀有な方、ありがとうございました。

これからもよろしくお願いします。
