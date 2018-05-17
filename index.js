const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const mongoose = require('mongoose');
const Idea = require('./models/Idea');
const bodyParser = require('body-parser');

// express-handlebars config 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose config

mongoose.connect('mongodb://rubel:rubel@ds119820.mlab.com:19820/rubel2585')
.then(()=>console.log("mongodb connected"));

// body-parser config

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Ideas = mongoose.model('ideas');

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
});

app.get('/ideas/add_new', (req,res)=>{
    res.render('ideas/add_new');
});

// process add_new form
app.post('/ideas', (req,res)=>{
    
    let errors = [];

    if(!req.body.title){
       errors.push({text:'Title Should Not Empty'});
    }

    if(!req.body.details){
       errors.push({text:"The Details Should Not Be Empty"});
    }

    if(errors.length>0){

        res.render('ideas/add_new', {
            errors: errors
        });
    }else {
        const usersData = {
            title: req.body.title,
            details: req.body.details
        }

        new Ideas(usersData)
            .save()
            .then((ideas) => {
                res.redirect('single_page');
            });
    }
});

app.get('/single_page', (req,res)=>{
     res.send("success");
});

app.listen(port, ()=>console.log("working"));