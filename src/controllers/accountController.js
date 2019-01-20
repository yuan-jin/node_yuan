

// 导出对象(导出的一个方法,该方法获取注册页面)

const path = require('path')

/**
 * module.exports = {
 *  getRegisterPage:箭头函数
 * }
 * 导出的一个方法，该方法获取注册页面
 */


exports.getRegisterPage=(req,res)=>{

  // 内部就是对 fs.readFile 的封装(读文件)
  res.sendFile(path.join(__dirname,"../public/views/register.html"))

}