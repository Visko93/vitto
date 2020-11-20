const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: "file-loader",
        options: {
          outputPath: "assets/",
          publicPath: "assets/",
        },
      },
    ],
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new CopyPlugin({ patterns: [{ from: "_redirects" }] }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ["jpegtran", { progressive: true }],
          [
            "svgo",
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
