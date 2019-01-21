// 2学生管理系统,这个页面负责处理具体的二级请求

//1.导包
const express = require('express');
const path = require('path')

//  2.创建路由对象
const studentrouter = express.Router()

// 3.导入控制器模块(这个页面负责处理具体的二级请求)
const studentController = require(path.join(__dirname,"../controllers/studentController"))

// 4.处理请求
studentrouter.get('/list',studentController.getStudentListPage)

// 4.导出
// router.get('/list',studentRouter.getstudes)
module.exports = studentrouter;
