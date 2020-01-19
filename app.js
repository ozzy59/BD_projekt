const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var pg = require('pg');
//const engine = require(__dirname + "/engine.js");    //module
var connect = "postgres://lolz:321654@localhost/BD_PROJEKT"
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", async function(req,res){
    const { Pool, Client } = require('pg')
  const connectionString = 'postgresql://OZ:123456@localhost/BD_PROJEKT'
  const pool = new Pool({
    connectionString: connectionString,
  })
  pool.query('select * from playersdb', (err, res) => {
  //  console.log(err, res)
    pool.end()
  })
  const client = new Client({
    connectionString: connectionString,
  })
  client.connect()
  client.query('select * from playersdb', (err, res) => {
  //  console.log(err, res)
    client.end()
  })
  res.render('index');
});

app.listen(3000, function(){
  console.log("Server started on port 3000...........................................................................................................................");
});
