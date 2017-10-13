var express = require('express');

module.exports = function(app) {

	app.use(express.static('public'));

	app.use('/api/hoteles', require('./routes/hotels'));

}
