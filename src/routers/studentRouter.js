// 2学生管理系统,这个页面负责处理具体的二级请求

//1.导包
const express = require('express');
const path = require('path')

//  2.创建路由对象
const studentrouter = express.Router()

// 3.导入控制器模块(这个页面负责处理具体的二级请求)
const studentController = require(path.join(__dirname,"../controllers/studentController"))

// 4.处理请求(获取学生列表)
studentrouter.get('/list',studentController.getStudentListPage)

// 4.获取新增页面
studentrouter.get("/add", studentController.getAddStudentPage);

// 4.新增学生信息(不需要额外的配置)(取值:req.body)
studentrouter.post("/add", studentController.addStudent);

// 4.获取修改页面(添加动态路径参数,必须以:开头)(取值req.params)
studentrouter.get("/edit/:studentId",studentController.geteditStudent)

// 4.修改学生信息
studentrouter.post("/edit/:studentId",studentController.editStudent)

// 4.删除信息(添加动态路径参数,必须以:开头)(取值req.params)
studentrouter.get("/delete/:studentId",studentController.deleteStudent)




// 5.导出
// router.get('/list',studentRouter.getstudes)
module.exports = studentrouter;
