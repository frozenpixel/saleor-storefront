const path = require("path");
const merge = require("webpack-merge");
const { WebpackConfigDumpPlugin } = require("webpack-config-dump-plugin");

const options = {
  // Path to store config dump
  outputPath: './',

  // Config dump filename
  name: 'webpack.config.dump',

  // Config depth. Since webpack config is circulary locked,
  // we can't dump whole config. This parameter sets how deep
  // config dump will be stored
  depth: 4

};

require("dotenv").config();

const baseConfig = require("./config/webpack/config.base");
const devConfig = require("./config/webpack/config.dev");
const prodConfig = require("./config/webpack/config.prod");
const workerConfig = require("./config/webpack/config.worker");

const sourceDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  const sw = !!argv["service-worker"];
  const paths = { sourceDir, distDir };

  const base = baseConfig(paths);
  const worker = workerConfig(paths);
  const dev = sw
    ? merge(base, worker, devConfig(paths))
    : merge(base, devConfig(paths));
  const prod = merge(base, worker, prodConfig(paths));

  // webpack config
  plugins: [new WebpackConfigDumpPlugin(options)];


  return devMode ? dev : prod;
};
