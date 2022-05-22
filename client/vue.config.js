module.exports = {
  configureWebpack: {
      resolve: {
          alias: {
              '@': __dirname
          }
      },
      entry: {
          app: './src/main.js'
      },
      optimization: {
          splitChunks: {
              chunks: 'all'
          }
      }
  },
  devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:3000',
              changeOrigin: true
          }
      }
  }
};