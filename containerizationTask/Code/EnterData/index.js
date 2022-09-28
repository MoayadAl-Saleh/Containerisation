const express = require('express');
const mysql = require('mysql2');
const PORT = 3000;
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
res.sendFile(__dirname+'/login.html');
});

app.post('/sendnumber', (req, res) => {
  var number = req.body.number ;

  var con = mysql.createConnection({
    host: "mysqldatabase",
    user: "root",
    password: "root",
    port: 3306 ,
    database: "mydb"
  });
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected! INSERT");
  var sql = "INSERT INTO number_t (num) VALUES ('"+ number +"')";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  });
  res.redirect("http://localhost:3003/")
});

app.get('/enterdata', (req, res) => {

  var con = mysql.createConnection({
    host: "mysqldatabase",
    user: "root",
    password: "root",
    port: 3306 ,
    database: "mydb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected! Database ");
    res.sendFile(__dirname+'/enterdata.html');
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected Table!");
  
    var sql = "CREATE TABLE IF NOT EXISTS number_t (num int)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });

});

app.listen(PORT,()=>{console.log(`Running on http://localhost:${PORT}`);});
