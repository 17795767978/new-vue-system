/**
 * GLOBAL VUE CLI CONFIGURATIONS
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

module.exports = {
  productionSourceMap:false,
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
    // 生产环境配置
    if (isProduction) {
    // 删除预加载
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/commonStyle/common.scss";`
      }
    }
  }
}
