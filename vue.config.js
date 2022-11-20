const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// module.exports = {
//   devServer: {
//     disableHostCheck: true,
//     proxy: {
//       '/api': {
//         target: 'http://152.136.127.186:30002', // 修改为你的Django服务器地址
//         changOrigin: true,
//         // pathRewrite: { "^/api": "" }
//       }
//     }
//
//   }
// }

