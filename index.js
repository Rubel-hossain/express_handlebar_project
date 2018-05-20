const express        = require('express');
const exphbs         = require('express-handlebars');
const app            = express();
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');

// ideas router
const ideasRouter = require('./routes/ideas');

// express-handlebars config 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose config

mongoose.connect('mongodb://rubel:rubel@ds119820.mlab.com:19820/rubel2585')
.then(()=>console.log("mongodb connected"));

// body-parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// method-override config
app.use(methodOverride('_method'));

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

// use idea router

app.use('/ideas', ideasRouter);

app.listen(port, ()=>console.log("working"));