const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Idea = require('../models/Idea');

const Ideas = mongoose.model('ideas');

router.get('/add_new', (req,res)=>{
    res.render('ideas/add_new');
});

// process add_new form
router.post('/', (req,res)=>{
    
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
                res.redirect('ideas');
            });
    }
});

router.get('/', (req,res)=>{

    Ideas.find({})
        .sort({date:'desc'})
        .then((Ideas)=>{
          res.render('ideas/index', {
              Ideas: Ideas
          });
        });
});


// edit ideas 

router.get('/edit/:id', (req,res)=>{
      Ideas.findOne({
          _id: req.params.id
      }).then((Ideas)=>{
        res.render('ideas/edit', {
            Ideas: Ideas
        });
      });
      
});

// update

router.post('/update_form/:id', (req,res)=>{
     Ideas.findOne({
         _id: req.params.id
     }).then((prevValue) =>{
        prevValue.title   = req.body.title;
        prevValue.details = req.body.details;
        prevValue.save();
     }).then((prevValue) =>{
         res.redirect("/ideas");
     })
});

// delete

router.delete('/delete/:id', (req,res)=>{
     Ideas.remove({_id:req.params.id})
     .then(()=>{
        res.redirect("/ideas");
     });
});


module.exports = router;