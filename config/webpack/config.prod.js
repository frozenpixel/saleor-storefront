const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackConfigDumpPlugin } = require("webpack-config-dump-plugin");

const options = {
  // Path to store config dump
  outputPath: './config',

  // Config dump filename
  name: 'webpack.config.dump',

  // Config depth. Since webpack config is circulary locked,
  // we can't dump whole config. This parameter sets how deep
  // config dump will be stored
  depth: 8

};

module.exports = ({ sourceDir, distDir }) => ({
  output: {
    filename: "js/[name].[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new WebpackConfigDumpPlugin(options),
  ]
});
