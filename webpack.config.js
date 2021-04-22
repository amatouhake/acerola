var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/acerola.js",
  output: {
    path: path.join(__dirname, "pub"),
    filename: "acerola.min.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env", {
                  useBuiltIns: "usage",
                  corejs: 3
                }
              ],
              "@babel/preset-react"
            ]
          }
        }]
      },
      {
        test: /\.s?[ac]ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: debug ? [] : [
    new webpack.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};