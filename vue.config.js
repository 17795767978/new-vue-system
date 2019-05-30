/**
 * GLOBAL VUE CLI CONFIGURATIONS
 */
const webpack = require('webpack')

module.exports = {
  runtimeCompiler: true,
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
  // devServer: {
  // open: process.platform === 'darwin',
  // host: 'localhost',
  // port: 8071,
  // open: true, // 配置自动启动浏览器
  // proxy: {
  //   '/': {
  //     // mockBaseUrl: 'http://117.34.118.30:8089/',
  //     // mockBaseUrl: 'http://192.168.10.23:8089/',
  //     target: 'http://192.168.10.81:8081', // 对应自己的接口
  //     changeOrigin: true
  //     // ws: true
  //   }
  // }
  // }
}
