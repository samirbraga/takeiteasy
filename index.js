const express = require('express'),
	  app = express(),
	  http = require('http'),
	  load = require('express-load'),
	  favicon = require('serve-favicon'),
	  path = require('path');

const server = http.createServer(app);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/public', express.static(path.join(__dirname, 'public')));

// cookie and session setup
app.disable('x-powered-by');


load('controllers').
	then('routes').
		into(app);

const port = Number( process.env.PORT || 8000 );
server.listen(port, () => {
	console.log('TakeItEasy running in port ' + port);
});
