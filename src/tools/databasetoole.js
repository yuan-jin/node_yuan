// Mangodb的封装

// 1.导包
const MongoClient = require('mongodb').MongoClient;
// 2.
const ObjectId = require("mongodb").ObjectId;

// 2.
const url = 'mongodb://localhost:27017';

// 3.数据库名称
// const dbName = 'accountInfo';
const dbName = 'szhmqd27';

// 4.封装函数

 


/**
 * 暴露出一个方法，插入一条数据
 * @param {*} collectionName 集合名称 
 * @param {*} data 数据
 * @param {*} callback 回调,把结果告知控制器
 */


const insertSingle = (collectionName,data,callback)=>{

    // 5.mongdb
    MongoClient.connect(url, function(err, client) {
      
    //    5.1拿到db
        const db = client.db(dbName);

        // 5.2拿到集合
        const collection = db.collection(collectionName);


        //6 
        collection.insertOne(data,(err,result)=>{
            // 6.1.关闭数据库
            client.close();

            // 6.2执行回调函数,传递结果给控制器
            callback(err,result)
        })
           
       
        
      });
}


/**
 * 查询一个
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */

// 封装函数2
const findYige  = (collectionName,data,callback)=>{

    // 5.mongdb
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
      
    //    5.1拿到db
        const db = client.db(dbName);

        // 5.2拿到集合
        const collection = db.collection(collectionName);

        //6 
        collection.findOne(data,(err,doc)=>{
            // 6.1.关闭数据库
            client.close();

            // 6.2执行回调函数,传递结果给控制器
            callback(err,doc)
        })
           
      });
}




/**
 * 查询多个
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const findMany = (collectionName,data,callback) => {
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          // 拿到db对象
          const db = client.db(dbName);

          // 要到要操作的集合 accountInfo
          const collection = db.collection(collectionName);

          // 查询多个
          collection.find(data).toArray((err,docs)=>{
              // 关闭数据库
              client.close();
              // 执行回调函数，把结果传递调用它的控制器
              callback(err,docs)
          })
    })
}


/**
 * 修改一个
 * @param {*} collectionName 集合名称
 * @param {*} condition 条件
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const updateYige = (collectionName, condition, data, callback) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function(err, client) {
        // 拿到db对象
        const db = client.db(dbName);
  
        // 要到要操作的集合 accountInfo
        const collection = db.collection(collectionName);
  
        // 修改一个
        collection.updateOne(condition, { $set: data }, (err, result) => {
          // 关闭数据库
          client.close();
          // 执行回调函数，把结果传递调用它的控制器
          callback(err, result);
        });
      }
    );
  };

 
/**
 * 删除一个
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */


const deleteYige = (collectionName,data,callback)=>{
    gather(collectionName,(collection,client)=>{
        collection.deleteOne(data,(err,result)=>{
           // 操作完毕之后，关闭数据库，并且把结果传递给控制器
           client.close()
     
           // 执行回调把结果传递给控制器
           callback(err,result)
        })
    })

}


/**
 * 封装的函数(拿到集合跟client)
 */
const gather = (collectionName,collback)=>{
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          // 拿到db对象
          const db = client.db(dbName);

          // 要到要操作的集合 accountInfo
          const collection = db.collection(collectionName);

          // 把结果传递出去
          collback(collection,client)
        }
    )
}






// 导出
module.exports ={
    ObjectId,//获取id的方法
    insertSingle,//插入一条数据
    findYige,//查询一个
    findMany,//查询多个
    updateYige,// 修改一个
    deleteYige
    //删除一个

   

}