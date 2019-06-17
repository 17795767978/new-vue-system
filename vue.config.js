/**
 * GLOBAL VUE CLI CONFIGURATIONS
 */
const webpack = require('webpack')

module.exports = {
  runtimeCompiler: true,
  publicPath: './',
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/)
    ],
    resolve: {
      alias: {
        'assets': 'src/assets',
        'components': 'src/components',
        'views': 'src/views',
        'utils': 'src/utils'
      }
    }
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  chainWebpack: config => {
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/commonStyle/common.scss";`
      }
    }
  }
}
