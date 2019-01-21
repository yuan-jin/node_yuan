// 3这个页面专门负责处理的逻辑处理

// 1.导包
const path = require('path')

// 2.导入temlate包
const template = require('art-template')



const getStudentListPage = (req,res)=>{
    // 基于模板名渲染模板
const html = template(path.join(__dirname,"../public/views/list.html"), {});
res.send(html)
}

// 导出
module.exports = {
    getStudentListPage
}