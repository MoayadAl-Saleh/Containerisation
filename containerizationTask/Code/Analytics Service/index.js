
const express = require('express');
const mysql = require('mysql2');
const mongo = require('mongodb');
const app = express();
const PORT = 3003;
let max ;

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:false}));

app.get('/' ,  (req, res) => {

function cinction1(cb){
  var con = mysql.createConnection({
    host: "mysqldatabase",
    user: "root",
    password: "root",
    port: 3306 ,
    database: "mydb"
  });   

  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("select MAX(num) as m from number_t;", function (err, result, fields) {
  if (err) throw err;
  console.log( "This is result[0].m = " + result[0].m ) ;  
  max = parseInt(result[0].m);
        cb(max);
    });
  });

}

function cinction2(){ 
  var MongoClient = mongo.MongoClient;
  var url= "mongodb://mongodatabase:27017/";
  
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  cinction1( 
    (a)=>{  var dbo = db.db("mydb");
    console.log("conction sucssfull !! mongo");
    var myobj = { num:a };
    dbo.collection("number_t").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("document inserted " + a);
    });
    
    dbo.collection("number_t").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      }); }
    )     
  });      
}

cinction2();
res.redirect("http://localhost:3000/enterdata")

});

    
app.listen(PORT,()=>{console.log(`Running on http://localhost:${PORT}`);});
