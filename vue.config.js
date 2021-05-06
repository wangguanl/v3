// const CompressionWebpackPlugin = require('compression-webpack-plugin');
console.log(process.env.NODE_ENV);
module.exports = {
  // publicPath: './', // 相对路径
  productionSourceMap: false,
  devServer: {
    before: require("./mock"),
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
					@import "@/assets/css/variables.scss";
					@import "@/assets/css/mixin.scss";
					@import "@/assets/css/BEM.scss";
				`,
      },
    },
  },
  chainWebpack(config) {
    // if (process.env.NODE_ENV === "development") {
      // 可以提高第一屏的速度，建议开启预加载
      config.plugin("preload").tap(() => [
        {
          rel: "preload",
          fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
          include: "initial",
        },
      ]);
      // 当页面太多时，会导致太多无意义的请求
      config.plugins.delete("prefetch");
    // }
    // 打包模块图 npm run build --report 查看模块划分npm命令
    // config
    //   .plugin("webpack-bundle-analyzer")
    //   .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
  },
  /* configureWebpack: (config) => {
    // gzip
    config.plugins.push(
      new CompressionWebpackPlugin({
        // 正在匹配需要压缩的文件后缀
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        // 大于10kb的会压缩
        threshold: 10240,
        // 其余配置查看compression-webpack-plugin
      })
    );
    config["performance"] = {
      //打包文件大小配置
      maxEntrypointSize: 10000000,
      maxAssetSize: 30000000,
    };
  }, */
};
