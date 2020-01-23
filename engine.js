const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var pg = require('pg');
const conString = 'postgresql://OZ:123456@localhost/league';
global.name2='testin';

exports.addPlayer = function(teamName, plName){
  // var conString = "postgres://postgres:pass@localhost:5432/league";
  // var conString = 'postgresql://OZ:123456@localhost/league';
	console.log(plName);
	var client = new pg.Client(conString);
	 client.connect();

	const text= "insert into "+ teamName +" (select * from playersdb where name='"+plName+"');"
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
}

exports.removePlayer = function(teamName, playersName){
  //var conString = "postgres://postgres:password@localhost:5432/leagueproj";
  // var conString = 'postgresql://OZ:123456@localhost/league';

  var client = new pg.Client(conString);
   client.connect();

  const text= "delete from "+teamName+" where name = '"+playersName+"';" 
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
}

exports.getFilteredList = function(position){ // zwraca druzyne pilkarza
  // var conString = 'postgresql://OZ:123456@localhost/league';
  // console.log(position);
  var client = new pg.Client(conString);
  var sql="select * from playersdb where position = '"+position+"';"

  client.connect();
  client.query(sql).then(res => {
    const result = (res.rows);
    // console.log(result);
    // console.log(err ? err.stack : res.rows) // Hello World!
  client.end()
  });
}

exports.getUsersList = function(teamName){ // zwraca druzyne pilkarza
  // var conString = 'postgresql://OZ:123456@localhost/league';

  var client = new pg.Client(conString);
  var sql="select * from "+teamName+";"

  client.connect();
  client.query(sql).then(res => {
    const result = (res.rows);
    console.log(result);
    // console.log(err ? err.stack : res.rows) // Hello World!
  client.end()
  });
}


exports.createTeam = function(teamName){
  // var conString = 'postgresql://OZ:123456@localhost/league';
	console.log(teamName);
	var name=teamName;
	var client = new pg.Client(conString);
	 client.connect();
	 const text = "create table "+name+" (id integer UNIQUE, name varchar(20) primary key, team varchar(3),position varchar(3), cost decimal, total_points integer, FOREIGN KEY (id) references playersdb(id) on update cascade);"+"create function check_budget_"+name+"() returns trigger as '"+ "Begin if NEW.cost +(select sum(cost) from "+name+")>100 then raise notice ''Budget exceeded''; return null; "
+"else return new; end if; end; 'Language 'plpgsql';"+"create trigger budget_trigger"+name+" before insert on "+name+" for each row execute procedure check_budget();";
	const values = [teamName];
// callback
	client.query(text, (err, res) => {
	  if (err) {
		console.log(err.stack)
	  } else {
		console.log(res)
    }
	  client.end();
	})
}
