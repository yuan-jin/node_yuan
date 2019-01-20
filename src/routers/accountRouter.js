
/**
 * 注册和登录的处理
 */

//  1.导包
 const express = require('express')
 const path = require('path')

//  2.创建路由对象
const router = express.Router()


// 导入控制器模块()
const accountController = require(path.join(__dirname,"../controllers/accountController.js"))


// 3.获取页面的请求
router.get('/register',accountController.getRegisterPage)

// 注册
router.post('/register',accountController.register)


// 4.导出路由模块
module.exports = router 