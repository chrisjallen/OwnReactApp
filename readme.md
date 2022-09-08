# 1. Project Init (usual stuff)

```
git init
npm init (yes, blah)
npm i
touch .git_ignore
## in git_ignore
node_modules

```

# 2. Install essential npm packages

## lets start with webpack

```
npm i webpack webpack-cli webpack-dev-server --save-dev
```

## Webpack in a nutshell for context help...

Webpack is a framework that starts with an 'entry' file(s), goes through all the imports and makes one big concatenated file, the 'output'. Thats it, this is all managed in a very simple config file... implicit file name is webpack.config.js

### Webpack loaders

So as mentioned webpack just concatenates, but it has the concept of loaders (3rd party). This is what makes it so powerful and configurable, but also a pain to setup as they're so many!

### Lets install webpack loaders

```
npm i babel-loader css-loader url-loader style-loader raw-loader  --save-dev
```

### Lets install webpack dev server (this is the localhost server)

```
npm i webpack-dev-server html-webpack-plugin --save-dev
```

## Babel, nutshell.... sorry if you know this stuff but might helpful....

webpack just moves code into an output, singular file, Babel transpiles latest js code into older js standards

### Lets install babel,

```
npm i @babel/core @babel/preset-env @babel/preset-typescript @babel/preset-react --save-dev
```

## Typescript

you know this bit

### Lets install typescript

```
npm i typescript --save-dev
```

### React

```
npm i react react-dom --save
```

## Installing done!

# 3. Build some code using webpack

## Babel configuration file

create this in root
babel.config.js

```
module.exports = {
  presets: [
    "@babel/preset-env" ,
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
};
```

## Webpack configuration file

create this in root
webpack.config.js

```
const path = require("path");
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
};
```

## Lets build our src!

create a folder src/ with a file to match our entry in webpack, so 'index.tsx'

ok lets webpack the files together (only one in this case)

add to package json a script

```
...in scripts package.json, add
"build": "webpack"
```

now lets build

```
npm run build
```

you should see a build file, this is webpack, its got the entry file, and spat out the gathered 'assets', in this case one file into a single entity.

# Setup a server

so webpack doesnt roll with a host, its was the package we still earlier that needs to be added to config

```
//add this to the webpack config as a property...

  devServer: {
    hot: true,
    host: "0.0.0.0",
    static: path.resolve(__dirname, "build"),
    historyApiFallback: true,
  },

```

add to package json a new script

```
...in scripts package.json, add
"start": "webpack-dev-server"
```

now if you run and open localhost:8080, youll get a server! But its a 404, this is because this dev server does nothing to inject code

## The final config addition (probably not!)

so we need a plugin that can create an html page for us with the code built out in memory

```

//add this at the top of the file

const HtmlWebpackPlugin = require("html-webpack-plugin");

//add this to the webpack config as a property...

plugins: [
  new HtmlWebpackPlugin({}),
],

```

```
npm run start
```
