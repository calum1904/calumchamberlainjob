const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');
const flash    = require('connect-flash');
const routes = require('./routes/api');

//Set up express application
const app = express();

require('./config/passport')(passport);

//connect to mongo db
mongoose.connect('mongodb://calum:admin@ds117136.mlab.com:17136/jobbard');
mongoose.Promise = global.Promise;

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname + '/views/layouts/'),
	partialsDir: path.join(__dirname + '/views/layouts/partials')
	}));


app.set('views', path.join(__dirname, 'views'));

//app.use(express.static(__dirname + '/views'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'thisisasecretdonttellanyoneshhhh' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
 app.use(function(req, res, next) {
        res.locals.user = req.user; // This is the important line

        next();
    }); // persistent login sessions
app.use(flash());

app.use('/', routes);

//initialise the routes
//require('./routes/api')(app);
app.use('/api', require('./routes/api', passport));

/*app.get('/',function(req,res){
  res.sendFile('index.hbs');
});*/


//error handling
app.use(function(err, req, res, next){
	//console.log(err);
	res.status(422).send({error: err.message});
});


//listen for requests
app.listen(process.env.PORT || 4000, function(){
	console.log('port is now listening');
	console.log('The magic happens on port 4000');
});

module.exports = app;