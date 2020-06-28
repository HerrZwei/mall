module.exports = {
  configureWebpack: {
    resolve: {
      // extensions: []  扩展名
      alias: {
        // 'src': '@'默认已有
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
      }
    }
  }
}
