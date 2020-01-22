const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var pg = require('pg');
//const engine = require(__dirname + "/engine.js");    //module
// var connect = 'postgresql://postgress:pass@localhost/league';
var connect = 'postgresql://OZ:123456@localhost/league';
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());

var teamName = "coksaock";

app.use(function(req,res,next){
    res.locals.userValue = null;
    next();
})

app.post('/',function(req,res){
    // var team =  {teamName:req.body.teamName}
    // console.log(team);
    teamName = req.body.teamName;
    res.redirect("/wyborZawodnika");
    //res.json(student);

});

app.post('/wybórZawodnika',function(req,res){
    teamName = req.body.teamName;
    res.redirect("/wyborZawodnika");

});

app.get("/", async function(req,res){
	var name;

	// var conString = "postgres://postgres:pass@localhost:5432/league";
  var conString = "postgres://OZ:123456@localhost:5432/league";

	var client = new pg.Client(conString);
	client.connect();

	client.query('SELECT * from playersdb').then(res => {
	 // console.log(err ? err.stack : res.rows[0].name) // Hello World!

   const result = (res.rows);

       // console.log(result);
	}).finally(() => client.end());

	res.render('home',{
        userValue : name
    });

});
app.get("/wyborZawodnika", async function(req,res){
  res.render('wyborZawodnika', {team: teamName});
});

app.listen(3000, function(){
  console.log("Server started on port 3000...........................................................................................................................");
});
