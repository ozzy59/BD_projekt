const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var pg = require('pg');
//const engine = require(__dirname + "/engine.js");    //module
var conString = "postgres://postgres:password@localhost:5432/leagueproj";
//var connect = 'postgresql://OZ:123456@localhost/league';
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


app.post('/stworzDruzyne',function(req,res){
	res.render("create")
    res.redirect("/create");

});
app.post("/addTeam", async function(req,res){    //tworze druzyne podana przez usera
	var conString = "postgres://postgres:password@localhost:5432/leagueproj";
	console.log(req.body.teamName);
	var name=req.body.teamName;
	var client = new pg.Client(conString);
	 client.connect();
	const text = 'create table '+name+' (id integer UNIQUE, name varchar(20) primary key, team varchar(3),position varchar(3), cost decimal, total_points integer, FOREIGN KEY (id, total_points) references playersdb(id, total_points) on update cascade)'
	const values = [req.body.teamName]
// callback
	client.query(text, (err, res) => {
	  if (err) {
		console.log(err.stack)
	  } else {
		console.log(res.rows[0])
		// { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
	  }
	  client.end();
	})
	
	

	res.redirect('/wyborZawodnika');
});

app.get("/", async function(req,res){
	var name;

	var conString = "postgres://postgres:password@localhost:5432/leagueproj";
 // var conString = "postgres://OZ:123456@localhost:5432/league";

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
