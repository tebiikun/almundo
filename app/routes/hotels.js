const rest 			= require('restler');
const express 		= require('express');
const fs			= require('fs');
const _ 			= require('underscore');
const constants 	= require('../utils/constants');


const router = express.Router()

router.get('/all', function(req, res) {
	console.log(req.query.var);
	fs.readFile('./data/data.json', 'utf8', function(err, data){

		if(err) throw err;
		var response = JSON.parse(data);
		res.json(parseImage(response));
	});

});

// reescribe la ruta de las imagenes y quita decimales al precio
function parseImage(data){
	if(data && data.length > 0){
      _.map(data, function(hotel) {
      	hotel.image = constants.IMAGE_HOTEL_ROUTE + hotel.image;
      	hotel.price = Math.trunc(hotel.price)
      });
    }
	console.log(data);
	return data;
}

module.exports = router;