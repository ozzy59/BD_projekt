const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var pg = require('pg');
//const engine = require(__dirname + "/engine.js");    //module
var connect = 'postgresql://postgres:password@localhost/leagueproj'
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.locals.userValue = null;
    next();
})

app.post('/team/add',function(req,res){
    var team = {
        first : req.body.fname,
    }
    console.log(team);
    res.render('index',{
        userValue : team
    });
    //res.json(student);
     
});

app.get("/", async function(req,res){
	var test;
  const { Pool, Client } = require('pg')
  const connectionString = 'postgresql://postgres:password@localhost/leagueproj'
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
  
    res.render('index', {
        test: test
    });
	
	
  
});


app.listen(3000, function(){
  console.log("Server started on port 3000...........................................................................................................................");
});
