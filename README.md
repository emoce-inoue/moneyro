# 1.環境構築手順

Node.js 24 を使ってください。

```bash
npm install      # 依存パッケージをインストール
npm run start    # 開発サーバー起動
```

## npm スクリプト一覧

```bash
# 開発
npm run start         # 開発サーバーを起動

# ビルド
npm run build         # 本番用ビルド（dist/ に出力）

# Lint / Format
npm run check         # format → lint:js → lint:css → lint:html をまとめて実行
npm run format        # JS・CSS・HTML を Prettier で自動整形
npm run format:check  # 整形されているかだけ確認する。ファイルは変更しない
npm run lint:js       # JavaScript の lint
npm run lint:css      # CSS の lint
npm run lint:html     # HTML の lint
```


# 2.ブランチ管理

feature/xxx-xxx-xxxでブランチを作成して作業を行なってください。作業が完了したらmainブランチにPRを投げてください。

# 3.確認サーバー
- https://emoce-inoue.github.io/xxx-xxx

# 4.ディレクトリ構成

```
src/
├── css/
│   ├── style.css       # エントリーポイント。各CSSファイルを @import でまとめて読み込む
│   ├── variables.css   # CSS カスタムプロパティ（変数）の定義。
│   ├── base.css        # リセット・ベーススタイル。
│   ├── animation.css   # アニメーション定義。
│   ├── common.css      # 共通ユーティリティ。表示切り替え（.no-sp / .no-pc）など汎用クラスを置く
│   └── layout.css      # レイアウト専用スタイル。
├── js/
│   ├── index.js        # エントリーポイント。
│   ├── utils.js        # 汎用ユーティリティ。
│   └── common.js       # ページ共通の処理。
├── images/             # 画像ファイル
└── index.html          # HTMLファイル
```

# 5.開発について

モバイルファーストでのコーディング

基本は、メディアクエリ（min-width:768px）とし、デザインに沿って適宜決定とします。

デザイン内同レイアウトに関しては、コンポーネントの概念で記述すること。

## 命名規則

### 省略しない・可読性を優先した命名

チームで読み書きするコードの可読性を高めるため、名前の省略は原則禁止とする。
一目で意味が伝わる完全な単語を使用すること。

| ❌ 省略（使わない） | ✅ 完全な単語（使う） |
|---|---|
| `btn` | `button` |
| `img` | `image` |
| `nav` | `navigation` |
| `txt` | `text` |
| `msg` | `message` |
| `err` | `error` |
| `cb` | `callback` |
| `fn` | `function` |
| `el` / `elem` | `element` |
| `e` | `event` |
| `i` | `index` |
| `num` | `number` |
| `val` | `value` |
| `res` | `response` |
| `req` | `request` |
| `prev` | `previous` |

```css
/* ❌ */
.c-btn { }
.c-btn__img { }

/* ✅ */
.c-button { }
.c-button__image { }
```

```js
// ❌
const btn = document.querySelector('.c-btn');
btn.addEventListener('click', (e) => { ... });

// ✅
const button = document.querySelector('.c-button');
button.addEventListener('click', (event) => { ... });
```

一般的に確立した略語（`URL`・`ID`・`API`など）はそのまま使用してよい。

### クラス命名 (BEM記法)
- Block: `.block`（コンポーネントを示す）
- Element: `.block__element`（Block内の要素を示す）
- Modifier: `.block--modifier`（BlockやElementの状態やバリエーションを示す）

参考
https://qiita.com/sueshin/items/dcbaf3d8a0adb6b087db


***Components***

コンポーネントにする場合は、`c-`をプレフィックスとしてつけるようにお願いします。

***Layouts***

3カラムの配置やコンポーネント間のスペース調整など、配置場所に関わるスタイルは`l-`をプレフィックスとしてつけるようにお願いします。

### ID命名 (キャメルケース)
```<div id="userProfile"></div>```

### JavaScript関数・変数命名 (キャメルケース)
```
hogeData() => {
  const userName = 'hoge';
}
```

### CSS変数命名 (ケバブケース)
```--main-color: #fff;```

## HTML
ユーザビリティやアクセシビリティを意識した構造化マークアップ

HTMLにスタイルやスクリプトを直接埋め込まない。



## CSS

### 論理プロパティの使用

物理プロパティ（`width` / `height` など）ではなく、論理プロパティを使用する。

| 物理プロパティ（❌ 使わない） | 論理プロパティ（✅ 使う） |
|---|---|
| `width` | `inline-size` |
| `height` | `block-size` |
| `min-width` | `min-inline-size` |
| `max-width` | `max-inline-size` |
| `min-height` | `min-block-size` |
| `max-height` | `max-block-size` |
| `margin-top` / `margin-bottom` | `margin-block-start` / `margin-block-end` （両方同値なら `margin-block`）|
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end`（両方同値なら `margin-inline`）|
| `padding-top` / `padding-bottom` | `padding-block-start` / `padding-block-end`（両方同値なら `padding-block`）|
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end`（両方同値なら `padding-inline`）|
| `top` / `bottom` | `inset-block-start` / `inset-block-end` |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |
| `border-top` | `border-block-start` |
| `text-align: left` | `text-align: start` |

```css
/* ❌ 旧来の書き方 */
.example {
  width: 100%;
  margin-top: 16px;
  padding-left: 24px;
}

/* ✅ 論理プロパティ */
.example {
  inline-size: 100%;
  margin-block-start: 16px;
  padding-inline-start: 24px;
}
```

### モダン CSS 構文

**`display` の2値構文**
`block` / `inline` / `flex` / `grid` などの outer / inner を明示的に分けて記述する。

```css
/* ✅ */
display: block flow;
display: inline flex;
display: block grid;
```

**`transform` 系の独立プロパティ**
`transform: translateY()` ではなく、独立したプロパティで記述する。

```css
/* ❌ */
transform: translateY(50px) scale(1.2);

/* ✅ */
translate: 0 50px;
scale: 1.2;
```

**Viewport 単位**
`vw` / `vh` よりもアドレスバー等を考慮したモダン単位を優先する。

| 旧単位 | 推奨単位 |
|---|---|
| `100vw` | `100dvi`（dynamic viewport inline） |
| `100vh` | `100svb`（small viewport block） |

**`color-mix()` 関数**
透明度の調整やブレンドには `color-mix()` を使用する。

```css
/* ✅ */
color: color-mix(in srgb, currentcolor, transparent 40%);
```

**CSS カスタムプロパティ（変数）**
マジックナンバーは必ず `variables.css` に変数として定義してから使用する。
変数名はケバブケース（`--my-variable-name`）で統一する。

```css
/* variables.css に定義 */
--speed-quick: 0.3s;

/* 利用側 */
transition: opacity var(--speed-quick) ease;
```

### プロパティの記述順序

可読性とメンテナンス性の向上のためプロパティの順序を統一する。
外観に影響を与える要素から内側に向かって記述する。

***ボックスモデル・レイアウト関連***
- `display`
- `position`
- `inline-size`, `block-size`
- `margin`, `padding`
etc...

***背景・色関連***
- `background`
- `color`
- `border`
etc...

***フォント・テキストスタイル***
- `font-family`
- `font-size`
- `font-weight`
- `text-align`
- `line-height`
- `letter-spacing`
etc...

***アニメーション関連***
- `translate`, `scale`, `rotate`
- `transition`
- `animation`
etc...

### Lint ルールの補足

- IDセレクタ（`#id`）はスタイルに使用しない（`selector-max-id: 0`）
- `!important` は原則禁止。やむを得ない場合は stylelint-disable コメントで明示する
- 長さが `0` の場合は単位を省略する（`margin: 0` ✅ / `margin: 0px` ❌）
- メディアクエリは `min-width: 768px` のような prefix 記法で記述する（range 記法は使用しない）

## JavaScript

### 対応バージョン

ES2020（ECMAScript 2020）相当の記法を使用する。
ESLint の `ecmaVersion: 2020` / Babel の `@babel/preset-env` でトランスパイルされる。

**ES2015〜ES2020 で積極的に使う構文一覧**

| 機能 | 構文例 | 導入バージョン |
|---|---|---|
| `const` / `let` | `const name = 'foo';` | ES2015 |
| アロー関数 | `const fn = () => {};` | ES2015 |
| テンプレートリテラル | `` `Hello, ${name}!` `` | ES2015 |
| 分割代入 | `const { a, b } = obj;` | ES2015 |
| スプレッド構文 | `const arr = [...items];` | ES2015 |
| デフォルト引数 | `const fn = (x = 0) => x;` | ES2015 |
| クラス構文 | `class Foo { }` | ES2015 |
| モジュール（import/export） | `import './utils.js';` | ES2015 |
| Promise | `fetch(url).then(...)` | ES2015 |
| オブジェクトショートハンド | `{ name, value }` | ES2015 |
| async / await | `const data = await fetch(url);` | ES2017 |
| Object.entries / values | `Object.entries(obj).forEach(...)` | ES2017 |
| オプショナルチェイニング | `obj?.prop` | ES2020 |
| Null 合体演算子 | `value ?? 'default'` | ES2020 |
| `globalThis` | `globalThis.scrollY` | ES2020 |

### 基本ルール

- `var` は使用しない。`const` を優先し、再代入が必要な場合のみ `let` を使う
- 厳密等価演算子（`===` / `!==`）を使用し、`==` / `!=` は使わない
- 文字列はシングルクォート（`'`）を使用する
- 末尾カンマ（trailing comma）を付ける
- アロー関数の引数は常に括弧で囲む（`(x) => x` ✅ / `x => x` ❌）
- ブロック文には必ず波括弧を付ける（`if (cond) { ... }` ✅ / `if (cond) ...` ❌）
- `debugger` 文は残さない

### DOM 操作

- jQuery は使用しない（既存LPで使われている場合はOK。新規では原則 Vanilla JS）
- `document.querySelector` / `querySelectorAll` を使用する
- `addEventListener` でイベントを登録する

```js
// ❌
$('.js-btn').on('click', function() { ... });

// ✅
const btn = document.querySelector('.js-btn');
btn?.addEventListener('click', (event) => {
  // ...
});
```

### スコープ管理

ページ全体に影響するスクリプトは即時実行関数（IIFE）でスコープを閉じる。

```js
(() => {
  // ...
})();
```

### 非同期処理

Promise チェーンではなく `async/await` を優先する。

```js
// ❌
fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data));

// ✅
const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
```

### ライブラリ選定

スライダー等のUIライブラリは jQuery 非依存のものを選定する。
