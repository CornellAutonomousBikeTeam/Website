//postgres


'use strict';

const request = require('request');

module.exports = function(app, data){

//usrename:password ... dbname
var conString = "postgres://postgres:postgres@localhost/ab_data";

var pg = require('pg');
//pg-promise version
var pgp = require('pg-promise')();
var db = pgp(conString);
var csv = require('csv');
var copyTo = require('pg-copy-streams').to;
var json2csv = require('json2csv');

app.get('/testnames', (req, res) => {
    db.any("select * from tests", [true])
    .then(data => {
        res.json(data);
    })
    .catch(error => {console.log("ERROR:", error.message || error);});
  });


app.post('/newData', (req, res) => {
  //insert test table
  //SELECT CURRENT_TIMESTAMP;
  var title = 'default title2';
  db.none('INSERT INTO tests(tid, time, note, title) VALUES((SELECT MAX(tid)+1 from tests),CURRENT_TIMESTAMP, $1, $2);', ['', title])
    .then(data => {
        console.log(data)
    })
    .catch(error => {console.log("test ERROR:", error.message || error);});

    var dataArray = randomArray(11,11);
    var dataCSV = randomCSV();

    /*for (var i = 0; i < 11; i++){
      db.none('INSERT INTO data(did, tid, lean_angle, lean_angular_rate, steer_angle, measured_steer_rate, desired_steer_rate, measured_steer_angle, desired_steer_angle, measured_velocity, desired_velocity, battery_voltage, time) VALUES((SELECT MAX(did)+1 from data), (SELECT MAX(tid) from tests), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', dataArray[i])
    .then(data => {
        console.log(data)
    })
    .catch(error => {console.log("data"+i"ERROR:", error.message || error);});

    }*/
    
/*
    db.none()
    .then(data => {
        console.log(data)
    })
    .catch(error => {console.log("ERROR:", error.message || error);});*/
})


app.get('/download', (req, res) => {
  /*
TO STDOUT WITH CSV
  */
  var id = req.headers["id"].toString();
  var query = "select D.lean_angle, D.lean_angular_rate, D.steer_angle, D.measured_steer_rate,\
  D.desired_steer_rate, D.measured_steer_angle, D.desired_steer_angle, D.measured_velocity, \
  D.desired_velocity, D.battery_voltage, D.time from tests T JOIN data D on T.tid = D.tid\
   where T.tid = "+id;
   //var csvquery = "copy ("+query+") TO STDOUT WITH (FORMAT CSV, HEADER)";

  db.any(query, [true])
    .then(data => {
        try {
          var result = json2csv({ data: data});
          //res.send(result)
          res.json(data)
        } catch (err) {
          // Errors are thrown for bad options, or if the data is empty and no fields are provided. 
          // Be sure to provide fields if it is possible that your data array will be empty. 
          console.error(err);
        }
    })
    .catch(error => {console.log("ERROR:", error.message || error);});

   /*var testQuery ="select * from tests";
   console.log(csvquery)
   db.any(csvquery, [true])
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(error => {console.log("ERROR:", error.message || error);});

    pg.connect(function(err, client, done) {
    var stream = client.query(copyTo(csvquery));
    stream.pipe(process.stdout);
    stream.on('end', done);
    stream.on('error', done);
    });*/
});

function randomArray(rows, cols){
  var arr = [];
  for (var i = 0; i < rows; i++){
    arr.push(randomRow(cols));
  }
  function randomRow(cols){
    var row = [];
    for (var i = 0; i < cols; i++){
      // random int between 
      row.push((Math.random() * 10) + 1  )
    }
    return row;
  }
  return arr
}

/* 
  Converts the 2d array into a csv String
*/
function dataToString(rawdata){
  var str = "";
  //Converting data to string
  for(var i = 0; i < rawdata.length; i++){
    for(var j = 0; j < rawdata[i].length; j++){
      str += rawdata[i][j];
      if(j < rawdata[i].length-1)
        str+=',';
    }
    str+='\n';
  }
  return str;
}

function randomCSV(){
  return dataToString(randomArray(11,11));
}

}

/*function query(query, fn){
  //query is a SQL query string
    pg.connect(conString, function(err, client, done){
      if(err) {return console.error('pg error', err);}
        client.query(query, function(err, result){
          if(err) {return console.error('query error', err);}
          fn(JSON.stringify(result.rows));
    });
  });
}

query('SELECT * FROM tests', function(result){
   console.log("async: "+result);
});
*/

/*
db.any("select * from tests", [true])
    .then(data => {
        console.log("data: "+JSON.stringify(data));
    })
    .catch(error => {console.log("ERROR:", error.message || error);});
db.any("select * from data", [true])
    .then(data => {
        console.log("data: "+JSON.stringify(data));
    })
    .catch(error => {console.log("ERROR:", error.message || error);});


router.post('/getTestsTable', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {text: req.body.text, complete: false};
  // Get a Postgres client from the connection pool
  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM tests');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      console.log(res.json(results));
      return res.json(results);
    });
  });
});
*/