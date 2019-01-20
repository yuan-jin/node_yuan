

// 导出对象(导出的一个方法,该方法获取注册页面)

const path = require('path')

// maogodb
const MongoClient = require('mongodb').MongoClient;

// url
const url = 'mongodb://localhost:27017';


// 
const dbName = 'accountInfo';

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

  /**
   * 导出的注册方法
   */
  exports.register = (req,res)=>{
    const result = {
        status:0,
        message:'注册成功'
    }
   console.log(req.body);
  //1. 拿到浏览器传输过来的数据(body-parser ===> app.js)
  const {username} = req.body
//   console.log(username);



  // 2.先判断数据库中的用户名,是否存在,如果存在返回提示(mongodb)
  MongoClient.connect(url,{useNewUrlParser:true},function(err,client){

        // 拿到db
      const db = client.db(dbName);

      // 拿到集合
      const collection = db.collection("accountInfo");

      console.log(collection);

     
      

    //   查询一个
    collection.findOne({username},(err,doc)=>{
        //如果result == null 没有查询到，就可以插入，如果查询到了，说明用户名已经存在
        if(doc){
            result.status = 1;
            result.message = '用户名已经存在';

            // 关闭数据库
          client.close();
          
        //   返回
        res.json(result)

        }else{
            // 3.如果用户名不存在,插入到数据库中
            // result2有值,代表成功,result2为null就是失败
            collection.insertOne(req.body,(err,retult2)=>{
                if(!retult2){
                    // 表示插入失败
                    result.status = 2;
                   result.message = '注册失败';
                
                //    关闭数据库
                client.close();

                // 返回
                res.json(result)

                }
            })
        }
    })


      }
  )

  
  
// res.json(result)
}
