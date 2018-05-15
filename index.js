const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

// express-handlebars config 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

port = 3000;

app.get('/', (req,res)=>{
    const title = "Welcome";
    res.render('home',{
        title: title
    });
});

app.get('/about', (req,res)=>{
    res.render('about');
})

app.listen(port, ()=>console.log("working"));