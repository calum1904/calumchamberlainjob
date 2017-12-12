const express = require('express');
const passport = require('passport');
const router = express.Router();
const moment = require('moment');

const Jobs = require('../models/jobs')
const User = require('../models/user')


//----------------------Get Home Page----------------------//
router.get('/', function(req, res, next){
	//res.redirect('/jobs');
	res.render('index',{ title: 'Job Board', username: req.user});
});


//----------------------Send Recent jobs----------------------//
router.get('/jobs', function(req, res, next){
	Jobs.find().sort({_id:-1}).limit(10).then(function(catJobs){
		res.json(catJobs)
	});
});


//----------------------Send Random job(android)----------------------//
router.get('/jobs/random', function(req, res, next){
	Jobs.count().exec(function (err, count) {
		var random = Math.floor(Math.random() * count)
		Jobs.findOne().skip(random).then(function(catJobs){
		res.json(catJobs)
	});
});


//----------------------Send Category jobs----------------------//
router.get('/jobs:cat', function(req, res, next){
	Jobs.find({category: req.params.cat }).sort({_id:-1}).limit(10).then(function(catJobs){
		console.log({category: req.params.cat })
		res.json(catJobs)
	});
});


//----------------------Get users jobs----------------------//
router.get('/profile', function(req, res, next){
	Jobs.find({userid: req.user._id }).sort({_id:-1}).limit(10).then(function(userJobs){
		res.json(userJobs)
	});
});


//----------------------Login / Signup / Logout----------------------//
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

//----------------------User list----------------------//
router.get('/user', function(req, res, next){
	console.log("hit");
	User.find({_id: req.user._id }).then(function(user){
		console.log(user);
		res.json(user);
	});
});


//----------------------Add job to collection----------------------//
router.post('/jobs', function (req, res, next){
	var item = {
		'title': req.body.title,
		'category': req.body.category,
		'location': req.body.location,
		'description': req.body.description,
		'apply': req.body.apply,
		'company': req.body.company,
		'website': req.body.website,
		'userid': req.user._id,
		'createdOn': moment().format("MMM Do YY")
	};
	console.log(item);
	Jobs.create(item).then(function(err, res){
		console.log('New job added');
	}).catch(next);
	res.redirect('/');
});

//----------------------Add user to collection----------------------//
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

//----------------------Update job in collection----------------------//
router.put('/jobs/:id', function(req, res, next){
	Jobs.findById(req.params.id).then(function(job){
			job.title = req.body.title || job.title;
			job.category = req.body.category || job.category;
			job.location = req.body.location || job.location;
			job.description = req.body.description || job.description;
			job.apply = req.body.apply || job.apply;
			job.company = req.body.company || job.company;
			job.website = req.body.website || job.website;
		
			job.save((job)).then(function(){
            res.status(200).send(job);
        	});

		})
	});

//----------------------Update User email in collection----------------------//
router.put('/user/:id', function(req, res, next){
	User.findById(req.params.id).then(function(user){
			user.email = req.body.email || user.email;
			user.save((user)).then(function(){
            res.status(200).send(user);
        	});

		})
	});

//----------------------Delete job from collection----------------------//
router.delete('/jobs/:id', function(req, res, next){
	Jobs.findByIdAndRemove({_id: req.params.id}).then(function(job){
		console.log(job);
		res.send(job);
	});
});

//----------------------Delete user from collection----------------------//
router.delete('/user/:id', function(req, res, next){
	User.findByIdAndRemove({_id: req.params.id}).then(function(user){
		console.log(user);
		res.send(user);
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