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
var pg = require('pg');

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

var x;
app.get("/", async function(req,res){
	var name;

	var conString = "postgres://postgres:password@localhost:5432/leagueproj";

	var client = new pg.Client(conString);
	client.connect();
	client.query('SELECT * from playersdb where id=20', (err, res) => {
	  console.log(err ? err.stack : res.rows[0].name) // Hello World!
	  
	client.end()
	});
	res.render('index',{
        userValue : name
    });

});


app.listen(3000, function(){
  console.log("Server started on port 3000...........................................................................................................................");
});
