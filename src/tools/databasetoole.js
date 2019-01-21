// Mangodb的封装

// 1.导包
const MongoClient = require('mongodb').MongoClient;

// 2.
const url = 'mongodb://localhost:27017';

// 3.数据库名称
const dbName = 'accountInfo';

// 4.封装函数

 


/**
 * 
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
        const collection = db.collection('documents');

        //6 
        collection.insertOne(data,(err,restult)=>{
            // 6.1.关闭数据库
            client.close();

            // 6.2执行回调函数,传递结果给控制器
            callback(err,result)
        })
           
       
        
      });
}


/**
 * 
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */

// 封装函数2
const findYige  = (collectionName,data,callback)=>{

    // 5.mongdb
    MongoClient.connect(url, function(err, client) {
      
    //    5.1拿到db
        const db = client.db(dbName);

        // 5.2拿到集合
        const collection = db.collection('documents');

        //6 
        collection.insertOne(data,(err,doc)=>{
            // 6.1.关闭数据库
            client.close();

            // 6.2执行回调函数,传递结果给控制器
            callback(err,doc)
        })
           
       
        
      });
}

// 导出
module.exports ={
    insertSingle,
    findYige
}