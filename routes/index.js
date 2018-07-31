var express= require('express')
    router = express.Router(),
    passport     = require('passport');

var User = require('../models/users')

router.get('/', function(req,res){
    res.redirect('/campgrounds');
});

//////////////////////////////////////////
//////////////AUTH ROUTES////////////////

/*  ----- SignUp / register ------ */
router.get('/register', function(req,res){
    res.render('register')
});
router.post('/register', function(req,res){
    var newUserName = new User({username:req.body.username});

    User.register(newUserName, req.body.password, function(err,user){
        if(err){
            console.log('error creating user:')
            console.log(err);
            res.render('/register');
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/campgrounds');
        });
    });
});

/*  ----- Login ------ */
router.get('/login', function(req,res){
    res.render('login')
});
//use of middleware for authentication
router.post('/login', passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect:'/login'
}) , function(req,res){

});

/*  ----- Logout ------ */
router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/campgrounds')
});



/*  ----- Logout ------ */
function isloggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login')
    }
}


module.exports = router;