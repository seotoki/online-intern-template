import { defineConfig } from 'vite';

//import設定を追記
import { resolve } from 'path';

/**
 * HTMLの複数出力を自動化する
 * ./src配下のファイル一式を取得
 * 2階層目まで取得する
 */
import fs from 'fs';
// const fileNameList = fs.readdirSync(resolve(__dirname, './src/'));
const fileNameList = [];
const getFiles = (dir, fileList, nested) => {
  // assets, components, data, publicは除外
  if (/assets|components|data|public/i.test(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      getFiles(dir + '/' + file, fileList, nested ? nested + '/' + file : file);
    }
    else {
      nested ? fileList.push(nested + '/' + file) : fileList.push(file);
    }
  }
  );
};
getFiles(resolve(__dirname, './src/'), fileNameList, '');

//htmlファイルのみ抽出
const htmlFileList = fileNameList.filter(file => /.html$/.test(file));

//build.rollupOptions.inputに渡すオブジェクトを生成
const inputFiles = {};
for (let i = 0; i < htmlFileList.length; i++) {
  const file = htmlFileList[i];
  inputFiles[file.slice(0,-5)] = resolve(__dirname, './src/' + file );
}

/**
 * ページ単位の基本情報
 */
//import設定を追記
import handlebars from 'vite-plugin-handlebars';
import pageDataJson from './src/data/pageData.json';

//HTML上で出し分けたい各ページごとの情報
const pageData = pageDataJson;

/**
 * config情報
 */
export default defineConfig({
  base: './', //ルートパスの設定。デフォルトは'/
  root: './src', //開発ディレクトリ設定
  plugins: [
    handlebars({
      //コンポーネントの格納ディレクトリを指定
      partialDirectory: resolve(__dirname, './src/components'),
      //各ページ情報の読み込み
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
  build: {
    outDir: '../dist', //出力場所の指定
    rollupOptions: { //ファイル出力設定
      input: inputFiles,
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          //Webフォントファイルの振り分け
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name][extname]`;
          }
          //ビルド時のCSS名を明記してコントロールする
          if(extType === 'css') {
            if(assetInfo.name === 'index.css') {
              return `assets/css/index-[hash].css`;
            }
            return `assets/css/[name].css`;
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },
});