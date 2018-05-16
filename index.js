const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const mongoose = require('mongoose');

// express-handlebars config 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose config

mongoose.connect('mongodb://rubel:rubel@ds119820.mlab.com:19820/rubel2585')
.then(()=>console.log("mongodb connected"));

mongoose.Promise = global.Promise;

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