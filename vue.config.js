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
    /* chainWebpack: config => {
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    } */

}