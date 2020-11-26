/**
 * 跨域插件使用步骤
 * 1. yarn add http-proxy-middleware
 * 2. 在src目录中新建setupProxy.js文件
 */
const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(createProxyMiddleware('/lottery', {
        target: 'https://t600test.bellonline.cn/',
        changeOrigin: true,
        pathRewrite: {'^/lottery': '/marketing/index.php/api/lottery'}  // 重写  /lottery  为  /marketing/index.php/api/lottery
    })) // 开发环境
}
