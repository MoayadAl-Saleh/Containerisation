
const express = require('express');
var mongo = require('mongodb');
const app = express();
let max ;
// Constants
const PORT = 3004;
// const HOST = '0.0.0.0';

// App
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:false}));

app.get('/' ,  (req, res) => {
  res.sendFile(__dirname+'/loginShowPage.html');
  });

app.get('/ShowResults' ,  (req, res) => {

  var MongoClient = mongo.MongoClient;
  var url= "mongodb://mongodatabase:27017/";
  
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var mysort = { num: -1 };
      dbo.collection("number_t").find({}).sort(mysort).limit(1).toArray(function(err, result) {
      if (err) throw err;
      console.log("result[0].num = " + result[0].num);
      console.log("result  " + result );
      db.close(); 
        
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="style/style1.css" rel="stylesheet"  type="text/css">
          <link href="style/stylebody.css" rel="stylesheet"  type="text/css">
          <title>ShowResults</title>
      </head>
      <body>
      <div class="area" >
          <ul class="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ul>
      </div >
            <form class="login" >
            <h1>Max is 
            `+result[0].num+`
            </h1>
            </form>
            </body>
      </html>
        `);
      });
  });

  });
  
app.listen(PORT,()=>{console.log(`Running on http://localhost:${PORT}`);});
