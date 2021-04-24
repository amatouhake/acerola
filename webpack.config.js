//const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
  let plugins = [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/client/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: 'acerola.min.css',
    })
  ];

  return {
    entry: "./src/client/Main.tsx",
    output: {
      path: `${__dirname}/public`,
      filename: "acerola.min.js"
    },
    resolve: {
      extensions: [ ".scss", ".css", ".tsx", ".ts", ".jsx", "..." ]
    },
    module: { rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [ "@babel/preset-env", {
                  "targets": {
                    "edge": 44,
                    "ie": 11
                  },
                  "useBuiltIns": "usage",
                  "corejs": 3
                }],
                "@babel/preset-react"
              ]
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: "webpack.tsconfig.json",
            },
          },
        ]
      },
      
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [
            [ "@babel/preset-env", {
              "targets": {
                "edge": 44,
                "ie": 11
              },
              "useBuiltIns": "usage",
              "corejs": 3
            }],
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [ "autoprefixer", {
                    grid: true,
                    browsersList: [
                      "edge >= 44",
                      "ie >= 11"
                    ]
                  }],
                ],
              },
            },
          },
          "sass-loader"
        ]
      },
    ]},
    plugins
  };
};