var express      = require('express'),
    app          = express(),
    bodyparser   = require('body-parser'),
    request      = require('request'),
    mongoose     = require('mongoose'),
    passport     = require('passport'),
    LocalStrategy= require('passport-local'),
    user         = require('./models/users')
    Campground   = require('./models/campground'),
    User         = require('./models/users'),
    Comment      = require('./models/comment'),
    seedDB       = require('./seeds');

    // Routes files
    var commentRoutes = require('./routes/comments'),
        campgroundRoutes = require('./routes/campgrounds'),
        indexRoutes = require('./routes/index')

mongoose.connect('mongodb://localhost/yelp_camp');

app.set('view engine', 'ejs') //prevent having to write .ejs
app.use(express.static(__dirname + '/public')) //to fetch css from public
app.use(bodyparser.urlencoded({extended:true})); //__dirname returns current file's directory


    //////////////////////////
           // seedDB();
    ////////////////////////


///////PASSPORT CONFIGURATION///////
app.use(require('express-session')({
    secret:'ham cheese meal veal socket blue water',
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
////////////////////////////////////////////

//Middleware that will run for everysingle code
// to send currentUser var all the time
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

var myPort = 3000;
app.listen(3000, function(){
    console.log();
    console.log('******************************')
    console.log('Listening on port ' + myPort);
    console.log('******************************')
});

