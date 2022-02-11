```yml
title: lit-html を使い倒す
description: lit-html と(周辺ライブラリと共に)使い倒します
image: /asset/image/og.png
```

この記事は [Web Components Advent Calendar 2018](https://qiita.com/advent-calendar/2018/web-components) の 19 日目の投稿です。

# lit-html を使い倒す

12 月 14 日に v1.0.0-rc.1 がリリースされ、そろそろ安定版が使えるようになる気配の lit-html について書きたいと思います。愛が強すぎて張り切った割に時間が足りず、結局最後グダってしまいました。ご容赦ください！

[![Published on npm](https://img.shields.io/npm/v/lit-html.svg)](https://www.npmjs.com/package/lit-html)

> 現在 v1.0.0-rc.1 は `next` タグがついているため、インストールは `npm i lit-html@next` とします。

lit-html は直接 Web Components とは関係ないですが、`<template>` を活用しているので... Web Components Advent Calendar でも問題ない... ですよね...? Polymer Project だし。

## lit-html とは

lit-html は [Polymer Project](https://www.polymer-project.org/) の一環で、Tagged Templetes によってビューを管理するライブラリです。

非常に単純なライブラリですが、単純ゆえに [エコシステムも広がって](https://github.com/web-padawan/awesome-lit-html) [![Mentioned in Awesome lit-html](https://awesome.re/mentioned-badge.svg)](https://github.com/web-padawan/awesome-lit-html) います。

ほんとうは lit-html の話だけにしようと思ったのですが、lit-html を使い倒していくと発生する問題と、その解決のために公開した拙作のライブラリも併用する話になってきてしまい、今回は [ullr](https://github.com/aggre/ullr) と [lit-style](https://github.com/aggre/lit-style) というライブラリと組み合わせていきます。

## lit-html の何がいいのか

lit-html はその特徴として、

- 小さな API
- 関数型
- Use The Platform

などのキーワードで説明ができます。

API は主に 3 つだけで、すぐに覚えられます。Tagged Templetes を使うために lit-html による開発は基本的に関数で表現することになります。ステートレスに書きやすく、テストも容易です。Use The Platform として、ブラウザランタイムに移譲できる処理は積極的に移譲しているため高速で軽量です。内部的には [HTML Template Instantiation](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md) という提案に基づいて、そのポリフィルのように実装されており、この提案が勧告される頃には lit-html のコードベースはさらに削減されると思われます。

あと、TypeScript で書かれているので型の安心感もあります。以下、サンプルコードは TypeScript にします。

---

## lit-html を使い倒す

今回は lit-html の API などは説明を省きます。

Polymer Japan で [先日公開した](https://qiita.com/howking/items/4470e9ca6da83ee1ca96) ばかりの、[ガイド(日本語訳)](https://lit-html.polymer-jp.org/guide) を見ればだいたい理解できると思います。( [@howking](https://qiita.com/howking) さん本当にありがとうございます )

lit-html は `html` と `render` という 2 つの API をよく使いますが、本格的に使うなら `directive` という強力な API も使います。

`directive` という同名の API をもつライブラリがよくありますが、lit-html における `directive` は一言でいうと **render の部分適用をする API** です。

### どういうことか

lit-html は基本的に `render` の実行によってのみテンプレートを更新します。ですが、lit-html プロジェクトだと `render` はエントリーポイントとなる 1 か所でしか使わません。React を想像してもらうと分かりやすいです。

ライブラリによるライフサイクルがないため、`render` を実行しない限りテンプレートは更新されません。これは不自由だと捉えるのではなく、ライブラリによる暗黙のライフサイクルを知る必要がないと考えます。ライブラリの知識を薄く保つことができます。

とはいえテンプレート更新のたびにルートの `render` を呼び出すのは現実的ではないですね。ほんの一部のテキストコンテントを書き換えるだけのために、テンプレート全体を再評価するのはコストが見合いません。

lit-html は DOM を差分更新するとはいえ、更新対象であるかどうかの計算は必要です。

そこで、例えば状態の変更にリアクトしてビューを更新するときには `directive` で部分的に更新したい、というモチベーションが発生します。

### RxJS と組み合わせる

`directive` を使って、RxJS の Observable を subscribe してテンプレートを更新する、ということもできます。

僕は [ullr](https://github.com/aggre/ullr) というライブラリを作り、この中に RxJS を購読する `directive` も入れています。

実際に RxJS と組み合わせるときはこんな感じで書けます。

```ts
import { html } from 'lit-html'
import { subscribe } from 'ullr/directive'
import { timer } from 'rxjs'

export const template = html`
	<main>
		${subscribe(
			timer(10, 1),
			(x) => html` <p>${x}</p> `,
			html` <p>Default content</p> `
		)}
	</main>
`
```

カウンターアプリならこんな感じです。

```ts
// button.ts
import { html } from 'lit-html'

export const button = (handleClick: (e: Event) => void) => html`
	<button @click=${handleClick}>Click</button>
`
```

```ts
// index.ts
import { html, render } from 'lit-html'
import { subscribe } from 'ullr/directive'
import { button } from './button'
import { BehaviorSubject } from 'rxjs'

const count = new BehaviorSubject(0)
const click =
	<T>(store: BehaviorSubject<T>) =>
	(next: () => T) =>
	() =>
		store.next(next())
const buttonClick = click(count)

const template = () => html`
	${button(buttonClick(() => count.value + 1))} ${subscribe(
		count,
		(x) => html` <p>Count: ${x}</p> `
	)}
`

render(template(), document.body)
```

`html` によるテンプレート関数はただの関数であるため、基本的には状態を持てません。すべてステートレスです。固有の状態を保持したいユースケースにおいては、クロージャにしてレキシカルスコープから状態を参照するような設計がとれます。

親から子へ状態を渡す構造が強制できます。

## CSS

lit-html で構築したアプリケーションの CSS ですが、Shadow DOM のスコープを前提にした `<style>` のインライン化が便利です。

または lit-html 版の styled-components のようなライブラリが今後出てくるかもしれません。どちらも Tagged Templetes なので相性がよさそうです。( すでにあったりして? )( lit-element の [styled-lit-element](https://www.npmjs.com/package/styled-lit-element) ならあった )

Shadow DOM を使う場合ですが、Shadow DOM には `Element.attachShadow()` を実行する必要があり、テンプレート操作だけを解決する lit-html では Shadow DOM の生成ができません。

そこで lit-html のテンプレート内で Shadow DOM を使う `directive` を [ullr](https://github.com/aggre/ullr) で作りました。

> 本来は `directive` ではなくテンプレート関数でも実現できるので... テンプレート関数に変えるという破壊的変更がいずれあるかもしれません。

`component()` にテンプレート関数を渡すことで、そのテンプレート関数を Shadow DOM の中にカプセル化します。

```ts
import { html } from 'lit-html'
import { component } from 'ullr/directive'

export default (title: string, desc: string) => html`
	${component(html`
		<style>
			h1 {
				font-weight: 400;
			}
			p {
				font-size: 1rem;
			}
		</style>
		<h1>${title}</h1>
		<p>${desc}</p>
	`)}
`
```

CSS がテンプレートと隣接しているので見通しがいいですよね！

でも、PostCSS のようなプリプロセッサを使いたいと思いますよね？ Rollup などのビルドプロセスを経ればテンプレート文字列の中の CSS を PostCSS にかけることもできますが、ビルド沼にはまるのが嫌なので実行時にプロセッサに渡したいと思います。

ちょうどいいライブラリが見当たらなかったので、 [lit-style](https://github.com/aggre/lit-style) というライブラリを作りました。

こんな感じで CSS のための Tagged Templetes 関数を作ります。

```ts
// style.ts
import { process, directive } from 'lit-style'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import postcssPresetEnv from 'postcss-preset-env'

const processor = process({
	plugins: [postcssPresetEnv({ stage: 3 })],
})

export const style = directive(
	processor,
	(css) =>
		html`
			<style>
				${until(css)}
			</style>
		`
)
```

使うときにはこうします。

```ts
import { html } from 'lit-html'
import { component } from 'ullr/directive'
import { style } from './style'

export default (title: string, desc: string) => html`
	${component(html`
		${style`
				h1 {
					font-weight: 400;
				}
				p {
					font-size: 1rem;
				}
			`}
		<h1>${title}</h1>
		<p>${desc}</p>
	`)}
`
```

実行時に PostCSS Plugin で CSS を変換できます。

---

## lit-html

基本的には `html` のテンプレート関数を組み合わせるだけでほとんどのユースケースに対応できるはずです。

最後間に合わなくなり、グダってしまって反省しています。すいません。

あー、どこかで思い切り lit-html の話したい！
