require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3033;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(morgan('combined'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// from https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./app/routes')( app );

app.get('/', function( request, response ) {
	response.json('Slash route is go.');
});

app.listen( port );
console.log(`A quokka is listening on port ${port}.`);
