global.name2='testin';

exports.getUsersList = function(){ // zwraca druzyne pilkarza
  var conString = 'postgresql://OZ:123456@localhost/league'

  var client = new pg.Client(conString);
  var sql='select * from '+name2+';'

  client.connect();
  client.query(sql, (err, res) => {
    console.log(err ? err.stack : res.rows) // Hello World!
  client.end()
  });
}

exports.insertPlayer = function(team){ //insert pilkarza do druzyny
	var player;
	console.log(name2);
	const readline = require('readline').createInterface({
	  input: process.stdin,
	  output: process.stdout
	})

	readline.question(`Enter player name name?`, (player) => {


    readline.close()

	// var conString = "postgres://postgres:pass@localhost:5432/league";
	var conString = 'postgresql://OZ:123456@localhost/league'
	var client = new pg.Client(conString);
	var sql="insert into "+name2+" select * from playersdb where name='"+player+"';"

	client.connect();
	client.query(sql, (err, res) => {
	  console.log(err ? err.stack : res) // Hello World!

	client.end()
	});
	})
}

exports.createTeam = function(){
  console.log(name2);
  // var conString = "postgres://postgres:pass@localhost:5432/league";
	var conString = 'postgresql://OZ:123456@localhost/league'

	var client = new pg.Client(conString);
	var sql='create table '+name2+' (id integer UNIQUE, name varchar(20) primary key, team varchar(3),position varchar(3), cost decimal, total_points integer, FOREIGN KEY (id, total_points) references playersdb(id, total_points) on update cascade);'

	client.connect();
	client.query(sql, (err, res) => {
	  console.log(err ? err.stack : res) // Hello World!

	client.end()
	});
//}
}
