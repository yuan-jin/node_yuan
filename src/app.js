
//导包
const express = require('express')
const path = require('path')
const bodyParser=require('body-parser')
// 导入存储session的包
const session = require('express-session')


//创建app
const app = express()

// 导入存储session的包第二句话
app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false, cookie: { maxAge: 600000 }}))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



//处理请求
// app.get('/',(req,res)=>{
//     res.send('Hello World')
// })



//设置静态资源根目录
app.use(express.static(path.join(__dirname,"public")))


// 1导入路由对象(sccunt)
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))
app.use('/account',accountRouter)
//参数1/account()一级路径是自定义的自己取的一个一级路径,一级路径,参数2:处理该路径的路由



// 2导入路由对象(student)
const studentRouter = require(path.join(__dirname,"./routers/studentRouter.js"))
app.use('/student',studentRouter)
//参数1/account()一级路径是自定义的自己取的一个一级路径,一级路径,参数2:处理该路径的路由


//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start ok")
})