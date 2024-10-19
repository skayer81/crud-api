// Generated using webpack-cli https://github.com/webpack/webpack-cli
import { resolve } from "path";
import ESLintPlugin from "eslint-webpack-plugin";

// export default {
//   mode: 'production',
//   entry: resolve(__dirname, 'src', 'index'),
//   output: { clean: true, filename: 'index.js' },
//   module: { rules: [{ test: /\.ts$/i, loader: 'ts-loader' }] },
//   resolve: { extensions: ['.ts', '.js'] },
//   target: 'node',
//   plugins: [new ESLintPlugin({ extensions: ['ts'], fix: false })],
// };







import { resolve as _resolve, dirname } from "path";
//import path, { dirname } from 'node:path';
//import { fileURLToPath } from 'node:url';

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

const config = {
  mode: "development",
  entry: "./src/index.ts",
  // output: {
  //   path: _resolve(__dirname, "dist"),
  // },
  output: {
    filename: 'bundle.js', // Имя выходного файла
  //  path: path.resolve(__dirname, 'dist'),
  path: _resolve(__dirname, "dist"),
    clean: true, // Очищает выходную папку перед каждой сборкой
    libraryTarget: 'commonjs' , // Указывает на использование ES-модулей
  },
  //  experiments: {
  //    outputModule: true 
  //  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new ESLintPlugin({ extensions: ["ts"], fix: false }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
  target: "node",
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
