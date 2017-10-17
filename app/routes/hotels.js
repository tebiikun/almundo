const rest 			= require('restler');
const express 		= require('express');
const fs			= require('fs');
const _ 			= require('underscore');
const constants 	= require('../utils/constants');


const router = express.Router()

router.get('/', function(req, res) {
	let stars = req.query.stars;
	let name = req.query.name;
	fs.readFile('./data/data.json', 'utf8', function(err, data){

		if(err) throw err;
		var response = JSON.parse(data);

		if(stars){
			stars = stars.split(',');
			if(stars.length > 0){
				response = _.filter(response, function(hotel){
					return stars.indexOf(hotel.stars.toString()) != -1;
				});
			}
		}

		if(name){
			response = _.filter(response, function(hotel){
				return hotel.name.toLowerCase().includes(name.toLowerCase());
			});
		}

		res.json(response);
	});

});

module.exports = router;