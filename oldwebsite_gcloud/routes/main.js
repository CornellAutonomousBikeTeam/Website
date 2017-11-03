
'use strict';

const request = require('request');

module.exports = function(app, waypoints, data){
	// [START external_ip]
	// In order to use websockets on App Engine, you need to connect directly to
	// application instance using the instance's public external IP. This IP can
	// be obtained from the metadata server.
	const METADATA_NETWORK_INTERFACE_URL = 'http://metadata/computeMetadata/v1/' +
	    '/instance/network-interfaces/0/access-configs/0/external-ip';

	function getExternalIp (cb) {
	  const options = {
	    url: METADATA_NETWORK_INTERFACE_URL,
	    headers: {
	      'Metadata-Flavor': 'Google'
	    }
	  };

	  request(options, (err, resp, body) => {
	    if (err || resp.statusCode !== 200) {
	      console.log('Error while talking to metadata server, assuming localhost');
	      cb('localhost');
	      return;
	    }
	    cb(body);
	  });
	}
	// [END external_ip]

	app.get('/', (req, res) => {
	  getExternalIp((externalIp) => {
	    res.render('index.ejs', {externalIp: externalIp});
	  });
	});
	app.get('/data', (req, res) => {
		getExternalIp((externalIp) => {
			res.render('data.ejs', {externalIp: externalIp});
		});
	});
	app.get('/navigation', (req, res) => {
		res.render('navigation');
	});
	app.get('/about', (req, res) => {
		res.render('about');
	});
	app.get('/team', (req, res) => {
		res.render('team');
	});
	app.get('/subteams', (req, res) => {
		res.render('subteams');
	});
	app.get('/home', (req, res) => {
		res.render('home');
	});
	app.get('/recruitment', (req, res) => {
		res.render('recruitment');
	});


}