const express = require('express');
const app = express();

const route = require('./route');

app.use(express.json())

app.use('', route)

app.use((req, res, next)=>{
    res.status(404).send({message:"URL Not Found"});
    
  });

  module.exports = app;