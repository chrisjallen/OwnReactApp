const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // this is preset ignore zipping assets, dont worry about this...
  mode: "development",
  // this is to help with globalthis and other contexual references only available in web (eg window)
  target: "web",
  // keep this for dev tool help
  devtool: "source-map",
  // entry property we mentioned...
  entry: path.resolve(__dirname, "src", "index.tsx"),
  // output, where its smushing all together...
  output: {
    path: path.resolve(__dirname, "./build"),
  },
  // this is where the 'loaders' i mentioned are used
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx|js)$/,
        exclude: /node_modules/,
        // we use just one loader atm...
        use: "babel-loader",
      },
    ],
  },
  // like node, this is the resolving engine for webpack, when we require or import it intervenes as part of the grouping of files...
  //  atm we are only requiring extensions of js and ts types, but you will need to add more for css
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    // so when we require, look in node_modules, but also in our current directory...
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {},
  },
  plugins: [new HtmlWebpackPlugin({})],

  devServer: {
    hot: true,
    host: "0.0.0.0",
    static: path.resolve(__dirname, "build"),
    historyApiFallback: true,
  },
};
