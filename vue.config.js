const webpack = require('webpack')
module.exports = {
    chainWebpack: (config) => {
        config.resolve.symlinks(false)
      }
  }
