```yml
title: Azure Blockchain Service に Solidity のスマートコントラクトをデプロイする
description: Azure Blockchain Service で Solidity のテストをしたらとても簡単だった。
image: /asset/image/azure-blockchain-service/setting.png
```

# Azure Blockchain Service に Solidity のスマートコントラクトをデプロイする

[Dev Protocol](https://github.com/dev-protocol/protocol) という Ethereum ベースのプロトコルを開発している。

プロトコルのテストは Truffle Suite を使ってローカルマシンの VM で実行しているが、理想的には Ethereum のメインネットと同等の環境でテストするのが望ましいと思う。

そこで Azure Blockchain Service を試してみた。

Azure Blockchain Service は Azure によるマネージド Ethereum のようなものと認識している。Ethereum ではなく [Quorum](https://www.goquorum.com/) というブロックチェーンを使っているが、Quorum は Ethereum フォークでエンタープライズ向けの改変が加えられているだけであり、Ethereum のアップデートに追従すると宣言されているのでほぼ同等の環境として考えている。

Azure Blockchain Service で構築したノードは PoA アルゴリズムを利用するためガスを消費しない。マイニングすることなく無限にトランザクションを送れるのでテスト用の環境としてちょうどいいはず。

## Azure Blockchain Service を作成

[Azure](https://portal.azure.com/) のナビゲーションから Create a resorce > Blockchain > Azure Blockchain Service を選択する。

次のような画面から初期設定をしていく。設定項目はこれですべてである。

![Azure Blockchain Service: Create a blockchain member](/asset/image/azure-blockchain-service/setting.png)

Review + create ボタンを押して設定内容をレビューする。

![Azure Blockchain Service: Create a blockchain member: Review](/asset/image/azure-blockchain-service/review.png)

バリデーションが終わると Create ボタンが有効になるので押す。環境構築が始まって、数十分くらいすると環境が出来上がる。

じつに簡単だった。

## Truffle との接続

開発プロジェクトは Truffle で管理しているので、Truffle から Azure を使うために設定する。

VSCode プラグインで Azure Blockchain Development Kit というのがあってそれを使うとプラグインが Truffle のコードを追加してくれるのだが、追加するコードはわずかなのでプラグインを使わずに手動で作業するほうが早かった。

### ウォレットの準備

Azure Blockchain Service にデプロイするときにウォレットが必要なので、[truffle-hdwallet-provider](https://github.com/trufflesuite/truffle/tree/develop/packages/truffle-hdwallet-provider) を使う。

```bash
npm i -D truffle-hdwallet-provider
```

### 設定

`truffle-config.js` の設定に Azure を追加する。

```js
const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
	compilers: {
		solc: {
			version: '^0.5.9'
		}
	},
	networks: {
		azure: {
			provider: () => new HDWalletProvider('mnemonic words...', 'https://...'),
			network_id: '*',
			gas: 0,
			gasPrice: 0
		}
	}
}
```

`HDWalletProvider` の引数には、12 単語以上からなるニーモニックと Azure Blockchain Service のノードエンドポイントを指定する。

いずれも `.env` などを使って環境変数にするといいと思う。

実際にプロジェクトで使っている内容は [ここ](https://github.com/dev-protocol/protocol/blob/master/truffle-config.js) にあるので参考までに。

Azure Blockchain Service のノードエンドポイントは Azure ポータルから (Azure Blockchain Service リソース) > Transaction nodes > (ノード) > Connection strings に入ると _HTTPS (Access key 1)_ の値が見れるので、それを使う。

## テスト

Truffle から Azure に接続できるようになったので、実際にテストしてみる。

```bash
npx truffle test --network azure
```

ローカルで実行したときと同じテストが Azure でも実行できる。

Azure ポータルのモニタリングからもトランザクションを処理したことが確認できた。

## デプロイ

Truffle から Azure にデプロイするために、Truffle のマイグレーションファイルを作る。

命名は数字から始まる規則さえ守っていればなんでもいいので、今回は `1_azure.js` とする。

デプロイして動作確認したいコントラクトは今回、Allocator, MarketFactory, PropertyFactory, State の 4 つだ。

```js
const load = deployerFn => contract =>
	deployerFn.deploy(artifacts.require(contract))

module.exports = (deployer, network) => {
	if (network !== 'azure') {
		return
	}

	const deploy = load(deployer)

	deploy('Allocator')
	deploy('MarketFactory')
	deploy('PropertyFactory')
	deploy('State')
}
```

`deployer.deploy(artifacts.require('Contract name string'))` が実行できればいい。

余談だがプロジェクトではテストを TypeScript で書くために [typechain](https://github.com/ethereum-ts/TypeChain) を使っていて、コントラクトの型を TypeScript から扱うことができる。そのためマイグレーションファイルも TypeScript で書けるのだが、こういったコンフィグレーションの類を書くたびに `tsc` しないといけないことに煩わしさを感じたので素直に js で書くことにした。

typechain はコントラクトのテストには非常におすすめである。

### 実際にデプロイしてみる

`truffle migrate` でデプロイを実行する。

```bash
npx truffle migrate --reset --network azure
```

4 つのコントラクトのデプロイが進行する。

実際にデプロイしたコントラクトが動作しているのかを確認するため、以下のようなファイルを作って `truffle exec` で確かめた。

```js
// azure.js
module.exports = done => {
	artifacts
		.require('State')
		.deployed()
		.then(res => res.token())
		.then(res => {
			console.log(res)
			done()
		})
}
```

State コントラクトのゲッター `token()` を呼び出して戻り値を確認している。

```bash
npx truffle exec azure.js --network azure
```

結果はデフォルト値の `address public token = 0x98626E2C9231f03504273d55f397409deFD4a093` のとおり、正しく返ってきた。

![](/asset/image/azure-blockchain-service/exec.png)

## プロトコル開発を効率化する Azure Blockchain Service と Truffle

Azure Blockchain Service はプライベートな Ethereum をわずかなステップで構築できた。

Truffle との接続も容易であり、この組み合わせは Ethereum でプロトコルを開発するプロジェクトにとっていい選択肢になると思う。
