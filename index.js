const express = require('express');
const app = express();

port = 3000;

app.get('/',(req,res)=>res.send('Working Properly'));

app.listen(port,()=>console.log("working"));