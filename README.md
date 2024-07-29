# clone 後は下記コマンドを実行して下さい
npm ci
npx husky install

# 環境構成

コンパイルなどは Vite ベースで行っています

- scss：sass でコーディングするために css へコンパイルするため
- postcss：autoprefixer,メディアクエリの順番を自動で整理してくれる,文字コードを自動で保管してくれる,CSS のプロパティを自動で順番整理してくれる
- markuplint：マークアップの構文チェック
- stylelint：CSS の構文チェック
- eslint：JS の構文チェック

# 前提条件

node v18 以上

# コマンド

## 開発時のコマンド

npm run dev

## デプロイ時のコマンド

npm run build

# 概要

## meta 情報について

src/data/pageData.json 　内で管理しております

サンプル

```JSON
  "/index.html": {
    "title": "Main Page",
    "description": "Main Page",
    "url": "https://",
    "ogp": "https://",
    "sitename": "sample"
  }
```

各項目について補足

```JSON
  "パス名を記述": {
    "title": "タイトルを記述",
    "description": "ディスクリプションを記述",
    "url": "ページの本番のURLを記述",
    "ogp": "OGPのURLを記述",
    "sitename": "サイト名を記述"
  }
```

## html について

共通パーツの管理のため「vite-plugin-handlebars」を使っています
共通パーツ（2 か所以上で使いまわしたいパーツ）は components ディレクトリに記述して

```
{{> ファイル名}}
```

で引用してご利用下さい

## scss について

### クラスの命名規則

- c-Block**element**modifier
  コンポーネントクラス
  複数の画面で利用する場合に接頭語（c-）を使う
- p-Block**element**modifier
  プロジェクトクラス
  単一の画面で利用する場合に接頭語（p-）を使う
- l-Block**element**modifier
  レイアウトクラス
  ヘッダー、フッター、アサイド、メインなどのレイアウトで利用する場合に接頭語（l-）を使う
- u-Block**element**modifier
  ユーティリティクラス
  PC/SP のみ表示など便利クラスで利用する場合に接頭語（u-）を使う

※Block, Element では【スネークケース】snake*case（*で単語をつなぐ）を利用すること

# husky をインストールする

下記コマンドを実行する

```JSON
npx husky-init && npm install
```
