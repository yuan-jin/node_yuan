// 3这个页面专门负责处理的逻辑处理

// 导出对象(导出的一个方法,该方法获取注册页面)

const path = require('path')


// 2.导入封装的函数
const databasetool = require(path.join(__dirname, "../tools/databasetoole"));

// maogodb
const MongoClient = require('mongodb').MongoClient;

// 导入生成的图片验证码包
const captchapng = require('captchapng');



// url
const url = 'mongodb://localhost:27017';


// 
// const dbName = 'accountInfo';
const dbName = 'szhmqd27';



/**
 * module.exports = {
 *  getRegisterPage:箭头函数
 * }
 * 1导出的一个方法，该方法获取注册页面
 */


exports.getRegisterPage=(req,res)=>{

  // 内部就是对 fs.readFile 的封装(读文件)
  res.sendFile(path.join(__dirname,"../public/views/register.html"))

}

  /**
   * 2导出的注册方法
   */
  exports.register = (req,res)=>{
    const result = {
        status:0,
        message:'注册成功'
    }
   console.log(req.body);
     //1. 拿到浏览器传输过来的数据(body-parser ===> app.js)
     const {username} = req.body
      console.log(username);
     
    
    
    
     
     // 2.先判断数据库中的用户名,是否存在,如果存在返回提示(mongodb)
     MongoClient.connect(url,{useNewUrlParser:true},function(err,client){
    
           // 拿到db
         const db = client.db(dbName);
    
         // 拿到集合
         const collection = db.collection("accountInfo");
    
         console.log(collection);
  
         // 查询一个
      collection.findOne({ username }, (err, doc) => {
        // 如果result == null 没有查询到，就可以插入，如果查询到了，说明用户名已经存在
        if (doc) {
          // 存在
          result.status = 1;
          result.message = "用户名已经存在";
          // 关闭数据库
          client.close();
          // 返回
          res.json(result);
        } else {
          //3、如果用户名不存在，插入到数据库中
          // result2 有值，代表成功 result2 为null就是失败
          collection.insertOne(req.body, (err, result2) => {
            if (!result2) {
              // 失败
              result.status = 2;
              result.message = "注册失败";
            }
            // 关闭数据库
            client.close();
            // 返回
            res.json(result);
          });
        }
      });
    }
 


  );
  

 /**
  databasetool.findYige("accountInfo", { username }, (err, doc) => {
    // 如果result == null 没有查询到，就可以插入，如果查询到了，说明用户名已经存在
    if (doc) {
      // 存在
      result.status = 1;
      result.message = "用户名已经存在";

      // 返回
      res.json(result);
    } else {
      databasetool.insertSingle("accountInfo", req.body, (err, result2) => {
        if (!result2) {
          // 失败
          result.status = 2;
          result.message = "注册失败";
        }

        // 返回
        res.json(result);
      });
    
 
      };
  });

  */
  }



// 3导出获取登录页面的方法
exports.getLoginPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"../public/views/login.html"))

}

// 4导出验证码的方法
exports.getVcodeImg = (req,res)=>{
    const vcode = parseInt(Math.random()*9000+1000)

    req.session.vcode = vcode;//把voco的保存到session对象中
   console.log(req.session);
   
    

    var p = new captchapng(80,30,vcode); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
 
        var img = p.getBase64();
        // var imgbase64 = new Buffer(img,'base64');
        var imgbase64 = Buffer.from(img, "base64");
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);

}


 // 5导出登录的方法
exports.login = (req,res)=>{
  const result = {
    status:0,
    message:'登录成功'
  };



    // 把浏览器传递过来的验证码和req.session.vode中的验证码对比
    const {username,password,vcode} = req.body
    console.log(req.body);
    
  
    

    // 验证码
    if(vcode != req.session.vcode){
      result.status = 1;
      result.message = '验证码错误';
      res.json(result);
      return;

    }
    // 验证码正确
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    
      // 拿到db
      const db = client.db(dbName);
    
      // 拿到集合
      const collection = db.collection("accountInfo");
 
      // console.log(collection);
    
      

       // 查询一个
       collection.findOne({ username,password }, (err, doc) => {
        // 如果result == null 没有查询到，就可以插入，如果查询到了，说明用户名已经存在
        console.log(doc);
        
        if (!doc) {
          // 存在
          result.status = 2;
          result.message = "用户名或是密码错误";
  
        }
        // 关闭数据库
        client.close();
        // 返回
        res.json(result);

    

    });


  });  
    
}




