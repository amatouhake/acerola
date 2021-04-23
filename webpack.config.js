const debug   = process.env.NODE_ENV !== "production";
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./src/client/Main.js",
  module: {
    rules: [{
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
                "@babel/preset-react",
                "@babel/preset-typescript"
              ]
            }
          }
        ]
      }]
    },
    output: {
      path: `__dirname/${public}`,
      filename: "client.min.js"
    },
    plugins: debug ? [] : [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};