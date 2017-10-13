const rest 			= require('restler');
const express 		= require('express');
const fs			= require('fs');


const router = express.Router()

router.get('/all', function(req, res) {
	console.log(req.query.var);
	fs.readFile('./data/data.json', 'utf8', function(err, data){

		if(err) throw err;

		res.json(JSON.parse(data));
	});

});

module.exports = router;