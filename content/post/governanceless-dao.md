```yml
title: Governanceless DAO
description: DAO にガバナンスは必要なのか?
image: /asset/image/governanceless-dao.jpg
```

(I'll publish English version later)

# Governanceless DAO

![](/asset/image/governanceless-dao.jpg)

DAO とは自律分散型組織のことを指し、分散型プロトコルにおいて DAO の存在は必要不可欠なものだ。プロトコルが”分散”なのだから組織も”分散”であるべきというのはとても当然のことのように聞こえる。

そして分散化された組織において昨今では、その意思決定プロセスを DAO 参加者による投票に委ねることが多い。組織が分散化されているので何者かの一存で何かを決定することができないというのがその基本原理として働いている。

それは理解できる。一方で、DAO とガバナンスがほぼ一対のものとして語られたり、ガバナンスがあるから DAO だ、というような印象を覚えることさえある今の状況には疑問を感じている。

DAO にガバナンスは不要。真の DAO では、ある参加者が正しいと考えた判断を遂行するのに、誰かの許可を必要としない。それが私の意見だ。

## 害としてのガバナンス

私は開発者なので、開発者として探求すべきなのはソフトウェアによる問題解決であり、合議の仕組みを模索することではないという考えは根本的に持っている。その上で、その一見有意義に見える合議には多くの弊害が伴っているとも考えている。

まず、正しい判断を下すのに十分に成熟したコミュニティが伴っている必要があり、これはプロトコルを維持するのに必要なコストを押し上げている。決定の精度がコミュニティの規模とナレッジレベルに依存するという事実は危険だ。ある時点における粗悪な決定はコミュニティを不可逆的に劣化させているが、人はその場でそのことに気づくことができないので、リカバリーすることができるのは人がそれを認識できるほど状況を悪化させてからだ。そしてそのリカバリーには多くの時間的/人的なコストを支払う必要がある。非ソフトウェア領域における依存関係はプロトコルの脆弱性と見なすべきだ。

さらに我々を困らせるのは、正しい決定を事前に知っている人間などいないということだ。少なくとも過去への時間旅行が実現しない限り、この問題は解決しない。もちろんそのことを認識していない DAO はないと思うが、それでもガバナンスを必要とするのは ”それが今できる最善だから” でしかない。しかし “今の最善” のために編み出したガバナンスをさもそれが永遠の最善であるかのように考え、あれこれと機能を追加することは、成長性のベクトルとして疑問に思う。もちろん多様性は重要だし複数の方法論があることはいいことだと思うが、今はあまりにもガバナンス一辺倒だ。

ガバナンスの方法論として一般的なのは、ステークによって議決権を分け与える考え方だ。これにも問題がある。ステークの購入によって自らの議決権を増やすことができるのならば、ある DAO を攻撃したいと考えている裕福な人、または DAO による戦争が可能となる。このことは株式会社でも起きている現象なので当然理解できるはずだ。ステークによる議決権の力は計測可能で、明快で平等だが、それを有意義たらしめている変数には、計測不可能な ”人の悪意” が含まれている。

悪意の希釈化のためにクアドラティックボーティング(QV)を用いることもできるが、QV は投票者が常に一意であることが担保されていなければならない。そしてデジタル空間においては、投票者の一意性とは本質的に無意味だ。ブロックチェーンで QV を正しく行うために投票者のアイデンティティとアドレスとを厳格に紐づける仕組みもあるが、そのアイデンティティを担保するために個人は個人情報の秘匿性を諦めなければならない。QV に関して言えば、それが本来、複数の選択肢に濃淡を与える複数勝者の投票のための選挙方法であるにも関わらず、万能の選挙方法として扱われている印象も受けている。

ガバナンスには発議から決定までに必ずアイドルタイムがある。所定の時間が選挙期間として割り当てられる場合や、投票者の数によって締め切る場合などさまざまだが、いずれにしても時間がかかることに違いはない。このガバナンスにかかる時間は常にプロトコルのアジリティを低下させる。新たな発議が誰から見ても有益なものだとしても、5 日間や 1 週間程度のアイドルタイムがあり、ガバナンスがなかった場合と比べてソフトウェアの更新頻度は低下し、その上、アイドルタイムに得られたはずの利益を失い DAO が損失を被っている。

また、発議された内容は可能な限り多くの参加者に理解される必要があることから、ガバナンスには並外れたドキュメンテーションスキルも求められる。論文さながらの正確性、公平性を持ちつつ冗長さは削ぎ落され、週間雑誌さながらの理解しやすさ、読みやすさも求められる。そんなライティングができる人は多くないし、そもそも発議にかかる時間的コストは、先述のアイドルタイムと相まってプロトコルのアジリティを低下させる。

ガバナンスは確かに今の我々にとって最善かもしれないが、それにはあまりにも多くの課題があることを認識すべきだ。そしてその課題を乗り越えてもなお、我々には正しい決定を事前に知ることができないという究極的な課題が直面している。

## 究極化した DAO

DAO が DAO として究極化した世界では、あらゆる決定が他人の許可によって実行される組織よりも、あらゆる決定が誰からの許可もなく実行できる組織のほうが強い組織であると信じている。なぜなら既存の組織論がそれを肯定しているし、多くの”成功”した組織では基本的に官僚型ではなく独立した意思が尊重される傾向にあるからだ。

現在の DAO 論の基本がガバナンスにあることへのアンチテーゼも含めて、私の理想を **Governanceless DAO** と呼んでみる。

Governanceless DAO の具体的な実装はまだ私にも分からない。あなたが開発者であれば、いま Serverless のことを連想したと思う。Serverless とは本当にサーバーが存在しないのではなく、サーバーの存在を意識する必要がないことを表した言葉だ。それはもしかしたらヒントになるかもしれない。いくつかのコンセプトを曖昧ながらも考えた。

**マスク**

参加者からガバナンスの存在を隠し、DAO の裏側で自動化されたガバナンス。Serverless がそうであるように。

**サンドボックス**

ある提案はサンドボックス環境のなかで稼働し、一定の指標を改善したことを検証されると自動的に昇格する。一定期間で昇格できない場合はステートをロールバックし、なかったことにする。これは未来余地ができない人間にはぴったりのコンセプトだと思う。ただしサンドボックス期間の設計には困難が伴いそうだ。

**シャドー**

そもそも提案の数だけ環境が分かれるという考え方。提案は互いに干渉しないよう閉ざされるが、基盤となるいくつかのアセットはシャドーの中からも参照される。基盤アセットに対するテーミングとも言えるかもしれない。

これらはどれも完ぺきではないが、私はこういった未知のアイデアを探ることをやめてはいけないと思う。ガバナンスの必要性は理解できるが、それを完璧化する過程には課題が多く、我々が歩むべき道のりとして本当にあっているのか振り返ることも大事だと思う。

これを書いているのは一日中開発をしたあとの朦朧とした時間なので、またあとで何か書き足そうと思っている。また、英語版も書こうと思っている。
