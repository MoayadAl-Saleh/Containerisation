
const express = require('express');
const PORT = 3001;
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:false}));

app.post('/' ,  (req, res) => {
    let name = req.body.name;
    let password = req.body.password;

    if(name == "moayad" && password =="123")
        res.redirect("http://localhost:3000/enterdata")
    else
        res.redirect("http://localhost:3000/")
});

app.post('/AuthenticationServiceShow' ,  (req, res) => {
    let name = req.body.name;
    let password = req.body.password;

    if(name == "moayad" && password =="123")
        res.redirect("http://localhost:3004/ShowResults")
    else
        res.redirect("http://localhost:3004/")

});



    
app.listen(PORT,()=>{console.log(`Running on http://localhost:${PORT}`);});
