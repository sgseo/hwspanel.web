const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [new AntdDayjsWebpackPlugin()],
  },

  assetsDir: 'static'
}

import 'dayjs/locale/zh-cn'
