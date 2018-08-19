var express= require('express')
    router = express.Router(),
    passport     = require('passport'),
    middleware = require('../middleware');

var User = require('../models/users')

router.get('/', function(req,res){
    res.render('campgrounds/landing');
});

//////////////////////////////////////////
//////////////AUTH ROUTES////////////////

/*  ----- SignUp / register ------ */
router.get('/register', function(req,res){
    res.render('register');
});
router.post('/register', function(req,res){
    var newUserName = new User({username:req.body.username});

    User.register(newUserName, req.body.password, function(err,user){
        if(err){
            req.flash('error', err.message);
            console.log(err);
             res.redirect('/register');
        }
        passport.authenticate('local')(req,res,function(){
            req.flash('success','Welcome to Yelp Camp ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});

/*  ----- Login ------ */
router.get('/login', function(req,res){
    res.render('login', {message: req.flash('error')})
});
//use of middleware for authentication
router.post('/login', passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect:'/login'
}) , function(req,res){

});

/*  ----- Logout ------ */
router.get('/logout', function(req,res){
    req.flash("success", 'You just logged out');
    req.logout();
    res.redirect('/campgrounds')
});


module.exports = router;