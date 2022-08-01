const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      open: true,
      port: 3000,
      host: 'localhost',
      // 代理配置
      proxy: {
        '/ips': {
          target: 'http://www-wms-java.itheima.net', // 我们要代理的地址
          changeOrigin: true
        },
        '/api': {
          target: 'http://www-wms-java.itheima.net', // 我们要代理的地址
          changeOrigin: true
        }
      }
    }
  }
})
