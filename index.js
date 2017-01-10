const express = require('express'),
	  app = express(),
	  http = require('http'),
	  path = require('path');

const server = http.createServer(app);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/public', express.static(path.join(__dirname, 'public')));

// cookie and session setup
app.disable('x-powered-by');


app.get('/', (req, res) => {
	res.render('home/index')
})

const port = Number( process.env.PORT || 3000 )
server.listen(port, () => {
	console.log('TakeItEasy running in port ' + port);
});
