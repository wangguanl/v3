// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// npm run build --report 查看模块划分npm命令
module.exports = {
    // publicPath: './', // 相对路径
    productionSourceMap: false,
    devServer: {
        before: require('./mock')
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
					@import "@/assets/css/variables.scss";
					@import "@/assets/css/mixin.scss";
				`,
            }
        }
    },
    /* configureWebpack: config => {
        // gzip
        config.plugins.push(
            new CompressionWebpackPlugin({
                // 正在匹配需要压缩的文件后缀
                test: /\.(js|css|svg|woff|ttf|json|html)$/,
                // 大于10kb的会压缩
                threshold: 10240
                // 其余配置查看compression-webpack-plugin
            })
        )
        config["performance"] = { //打包文件大小配置
            "maxEntrypointSize": 10000000,
            "maxAssetSize": 30000000
        }
    }, */
    /* chainWebpack: config => {
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    } */

}