module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      //配置跨域
      "/api": {
        target: "https://element-interface-october.herokuapp.com/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};











// module.exports = {
//   // publicPath: '/wxzf/dist/', // 打包文件相对路径
//   devServer: {
//     open: true,
//     host: 'localhost',
//     port: 8080,
//     https: false,
//     hotOnly: false,
//     // proxy: {
//     //   // 配置跨域
//     //   '/api': {
//     //     target: 'https://eleme4-beyond-50440.herokuapp.com/api/',
//     //     ws: true,
//     //     changOrigin: true,
//     //     pathRewrite: {
//     //       '^/api': ''
//     //     }
//     //   }
//     // },
//     before: app => {}
//   }
// };
