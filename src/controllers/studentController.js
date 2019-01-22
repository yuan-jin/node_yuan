// 3这个页面专门负责处理的逻辑处理

// 1.导包
const path = require('path')

// 2.导入temlate包
const template = require('art-template')

//3.导入封装的函数
const databasetool = require(path.join(__dirname, "../tools/databasetoole"));


// 渲染学生列表页面
const getStudentListPage = (req, res) => {//调用分装的函数
  const keyword = req.query.keyword || '';
  console.log(keyword);
  
databasetool.findMany('studentInto',{name:{$regex:keyword}},(err,docs)=>{
  // console.log(docs);
  
  // 这个里面的代码，是当databasetool中findMany执行了callback
  // callback中会把 err,docs传递过来
  // 渲染页面的代码
  const html = template(path.join(__dirname, "../public/views/list.html"), {students:docs,keyword});
  res.send(html);
    });
   

  }
  



// 返回新增页面
const getAddStudentPage =(req,res)=>{
  const html = template(path.join(__dirname,"../public/views/add.html"),{});
  res.send(html);
}




// 新增学生信息
const addStudent = (req,res)=>{
  console.log(res);
  
  databasetool.insertSingle('studentInto',req.body, (err, result)=>{
    // req.body(获取所有的参数)

    if(!result){
      res.send(`<script>alert("插入失败")</script>`)
    }else{
      res.send(`<script>location.href='/student/list'</script>`)
    }
    
  })
}


// 获取修改页面
const geteditStudent = (req,res)=>{

  // 必须按照规定的处理,才能拿到数据
  const _id = databasetool.ObjectId(req.params.studentId);
  
  
  databasetool.findYige('studentInto',{_id},(err,doc)=>{
    // console.log(_id);数据id
    // console.log(doc);doc就是当前id的数据
    
    const html = template(path.join(__dirname,"../public/views/edit.html"),doc);//doc就是数据
    res.send(html)
    
  })
  
}


//修改操作
const editStudent = (req,res)=>{
  // 必须按照规定的处理,才能拿到数据_id的值
  const _id = databasetool.ObjectId(req.params.studentId);
  

  databasetool.updateYige("studentInto",{_id},req.body,(err,result)=>{
    if(!result){
      res.send(`<script>('修改失败')</script>`)

    }else{
      res.send(`<script>location.href='/student/list'</script>`)
    }
  })
}



// 删除操作
const deleteStudent = (req,res)=>{
  const _id = databasetool.ObjectId(req.params.studentId);
  databasetool.deleteYige("studentInto",{_id},(err,result)=>{
    console.log(_id);
    console.log(result);

    if (!result) {
      //失败
      res.send(`<script>alert("删除失败!")</script>`);
    } else {
      res.send(`<script>location.href='/student/list'</script>`);
    }
    

  })

}






// 导出
module.exports = {
    getStudentListPage,// 渲染学生列表页面
    getAddStudentPage,// 返回新增页面
    addStudent,// 新增学生信息
    geteditStudent,// 获取修改页面
    editStudent, //修改操作
    deleteStudent 
   //删除操作
};