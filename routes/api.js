const express = require('express');
const passport = require('passport');
const router = express.Router();

const Jobs = require('../models/jobs')
const User = require('../models/user')



router.get('/', function(req, res, next){
	//res.redirect('/jobs');
	console.log(req.user);
	res.render('index',{ title: 'Job Board', username: req.user});
});


//send the last 5 jobs to the index
router.get('/jobs', function(req, res, next){
	Jobs.find().sort({_id:-1}).limit(10).then(function(catJobs){
		res.json(catJobs)
	});
});

router.get('/jobs:cat', function(req, res, next){
	Jobs.find({category: req.params.cat }).sort({_id:-1}).limit(10).then(function(catJobs){
		console.log({category: req.params.cat })
		res.json(catJobs)
	});
});

router.post('/login', passport.authenticate('login', {
	successRedirect : '/#yay',
	failureRedirect : '/',
	failureFlash : true
	})
);

router.post('/signup', passport.authenticate('signup', {
	successRedirect : '/#signedup',
	failureRedirect : '/#nosignuploser',
	failureFlash : true
	})
);


router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    }
);


router.get('/users', function(req, res, next){
	console.log("get users");
	User.find({}).then(function(users){
		res.json(users);
	});
});


//Add a job to the database
router.post('/jobs', function (req, res, next){
	var item = {
		'title': req.body.title,
		'category': req.body.category,
		'location': req.body.location,
		'description': req.body.description,
		'apply': req.body.apply,
		'company': req.body.company,
		'website': req.body.website,
		'userid': req.user._id
	};
	console.log(item);
	Jobs.create(item).then(function(err, res){
		console.log('New job added');
	}).catch(next);
	res.redirect('/');
});

router.post('/users', function(req, res, next){
	console.log("get users");
	var user = {
		'firstName': req.body.firstName,
		'lastName': req.body.lastName,
		'email': req.body.email,
		'password': req.body.password
	};
	User.create(user).then(function(err, red){
		console.log('New user added');
		}).catch(next);
	res.redirect('/')
});

//update a job in the database
router.put('/jobs/:id', function(req, res, next){
	Jobs.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
		Jobs.findOne({_id: req.params.id}).then(function(job){
			res.send(job);
		});
	});
});

//delete a job from the database
router.delete('/jobs/:id', function(req, res, next){
	Jobs.findByIdAndRemove({_id: req.params.id}).then(function(job){
		res.send(job);
	});
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;