let pageMethod = require('./util/getPages.js');
pages = pageMethod.pages();

module.exports = {
    pages,
    // 基本路径
    // baseUrl: process.env.NODE_ENV === 'production' ? '/videocontroller-web/' : '/',
    // 输出文件目录
    // outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // chainWebpack: () => {},
    chainWebpack: config => {
        Object.keys(pages).forEach(entryName => {
            // 干掉preload 和 prefetch 活动页面因为inline js 和 css 如果preload 会导致引入资源被打包进去两次
            config.plugins.delete(`preload-${entryName}`)
            config.plugins.delete(`prefetch-${entryName}`)
        })
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 32,
                        unitPrecision: 5,
                        propList: ['*'],
                        selectorBlackList: [],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 12
                    })
                ]
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 3000,
        https: false,
        hotOnly: true,
        proxy: null,
        disableHostCheck: true,
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    },
    configureWebpack: {
		optimization: {
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: 1,
				minSize: 0,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name (module) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
							// or node_modules/packageName
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
							// npm package names are URL-safe, but some servers don't like @ symbols
							return `npm.${packageName.replace('@', '')}`
						}
					}
				}
			}
		}
	}
}