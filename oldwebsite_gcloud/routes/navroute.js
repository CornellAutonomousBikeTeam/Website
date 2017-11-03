'use strict';

const request = require('request');

module.exports = function(app){

	var jsonfile = require('jsonfile')

	var file = 'public/data/nav.json'

	app.get('/getwaypoints', function (req, res) { //Handles sending data
			jsonfile.readFile(file, function(err, obj) {
				console.log(JSON.stringify(obj))
				res.send(JSON.stringify(obj));
			});	
		})
		
	app.post('/postwaypoints', function (req, res) { //Handles recieving data
	  		jsonfile.writeFile(file, req.body, function (err) {
  				console.error(err)
			})
		});

}