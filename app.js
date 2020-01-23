const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var pg = require('pg');
//const engine = require(__dirname + "/engine.js");    //module
var conString = "postgres://postgres:pass@localhost:5432/league";
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
	var conString = "postgres://postgres:pass@localhost:5432/league";
	console.log(req.body.teamName);
	var name=req.body.teamName;
	var client = new pg.Client(conString);
	 client.connect();
	 const text = "create table "+name+" (id integer UNIQUE, name varchar(20) primary key, team varchar(3),position varchar(3), cost decimal, total_points integer, FOREIGN KEY (id, total_points) references playersdb(id, total_points) on update cascade);"+"create function check_budget_"+name+"() returns trigger as '"+ "Begin if NEW.cost +(select sum(cost) from "+name+")>100 then raise notice ''Budget exceeded''; return null; "
+"else return new; end if; end; 'Language 'plpgsql';"+"create trigger budget_trigger"+name+" before insert on "+name+" for each row execute procedure check_budget();"
	const values = [req.body.teamName]
// callback
	client.query(text, (err, res) => {
	  if (err) {
		console.log(err.stack)
	  } else {
		console.log(res)
		
	  }

	  client.end();
	
	})

	

	res.redirect('/wyborZawodnika');
});
app.post("/addPlayer", async function(req,res){    //tworze druzyne podana przez usera
	var conString = "postgres://postgres:pass@localhost:5432/league";
	console.log(req.body.plName);
	var pname=req.body.plName;
	var tname = req.body.teamName;
	var client = new pg.Client(conString);
	 client.connect();
	
	const text= "insert into "+tname+" (select * from playersdb where name='"+pname+"');"  
	//zamia
// callback
	client.query(text, (err, res) => {
	  if (err) {
		console.log(err.stack)
	  } else {
		console.log(res)

	  }
	  client.end();
	})

	res.redirect('/wyborZawodnika');
});
app.get("/", async function(req,res){
	var name;

	var conString = "postgres://postgres:pass@localhost:5432/league";
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
app.post("/list", async function(req,res){    //tworze druzyne podana przez usera
	//var conString = "postgres://postgres:password@localhost:5432/leagueproj";
	var conString = "postgres://postgres:pass@localhost:5432/league";

	var client = new pg.Client(conString);
	console.log(req.body.cost);
	console.log(req.body.team);
	console.log(req.body.pos);
	 client.connect();
	 var name=req.body.playerName;
	 var cena=req.body.cost;
	 var team=req.body.team;
	 var pos=req.body.pos;

	
	const text= "select * from playersdb where name='"+name+"' or cost>"+cena+" and team='"+team+"' and position='"+pos+"';" ///ni chuja nie wiem jak wypisac tych zawodników
	//const values=[req.body.Cena, req.body.teamName, req.body.Pozycja];
	//zamia
// callback
	client.query(text, (err, response) => {
	  if (err) {
		console.log(err.stack)
	  } else {
		console.log(response.rows)
	
	  }
	 
	  client.end();
	})

	res.redirect('/wyborZawodnika');
});
app.get("/wyborZawodnika", async function(req,res){
  res.render('wyborZawodnika', {team: teamName});
});

app.listen(3000, function(){
  console.log("Server started on port 3000...........................................................................................................................");
});
