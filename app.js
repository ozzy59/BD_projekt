const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var pg = require('pg');
//const engine = require(__dirname + "/engine.js");    //module
var connect = 'postgresql://postgres:pass@localhost/league'
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());
var pg = require('pg');
global.name;

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
app.get("/create", async function(req,res){    //tworze druzyne podana przez usera
	//var name='user3';
	const readline = require('readline').createInterface({
	  input: process.stdin,
	  output: process.stdout
	})
	
	readline.question(`Enter team name?`, (name) => {
    console.log(`Hi ${name}!`)
    readline.close()                                              //te linie do czytania z konsoli
	

	var conString = "postgres://postgres:pass@localhost:5432/league";
	
	var client = new pg.Client(conString);
	var sql='create table '+name+' (id integer UNIQUE, name varchar(20) primary key, team varchar(3),position varchar(3), cost decimal, total_points integer, FOREIGN KEY (id, total_points) references playersdb(id, total_points) on update cascade);' 

	client.connect();
	client.query(sql, (err, res) => {
	  console.log(err ? err.stack : res) // Hello World!
	  
	client.end()
	});
	res.render('index',{
        userValue : name
    });
})
	
});
app.get("/insert", async function(req,res){  //robie insert pilkarza podanego przez usera
	var team='arsenal';
	var player;
	const readline = require('readline').createInterface({
	  input: process.stdin,
	  output: process.stdout
	})
	
	readline.question(`Enter player name name?`, (player) => {
	
    console.log('${player}')
    readline.close()
	
	var conString = "postgres://postgres:pass@localhost:5432/league";
	
	var client = new pg.Client(conString);
	var sql="insert into "+team+" select * from playersdb where name='"+player+"';"

	client.connect();
	client.query(sql, (err, res) => {
	  console.log(err ? err.stack : res) // Hello World!
	  
	client.end()
	});
		res.render('index',{
        userValue : team
    });
})

	
});
app.get("/list", async function(req,res){    //wypisuje druzyne usera
	//var name='user3';
	const readline = require('readline').createInterface({
	  input: process.stdin,
	  output: process.stdout
	})
	
	readline.question(`Enter team name?`, (name) => {
    console.log(`Hi ${name}!`)
    readline.close()
	

	var conString = "postgres://postgres:pass@localhost:5432/league";
	
	var client = new pg.Client(conString);
	var sql='select * from '+name+';' 

	client.connect();
	client.query(sql, (err, res) => {
	  console.log(err ? err.stack : res.rows) // Hello World!
	  
	client.end()
	});
	res.render('index',{
        userValue : name
    });
})
	
});

app.get("/", async function(req,res){
	var name;

	var conString = "postgres://postgres:pass@localhost:5432/league";

	var client = new pg.Client(conString);
	client.connect();
	
	client.query('SELECT * from playersdb where name=20', (err, res) => {
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
