var express 	= require('express');
var app 		= express();

const config    = require('./app/config');

var http = require('http').Server(app);

require('./app/routes.js')(app);

http.listen(config.PORT, function(){
  console.log('listening on *:'+ config.PORT);
});