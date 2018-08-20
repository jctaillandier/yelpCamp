var express      = require('express'),
    app          = express(),
    bodyparser   = require('body-parser'),
    request      = require('request'),
    flash        = require('connect-flash'),
    mongoose     = require('mongoose'),
    passport     = require('passport'),
    LocalStrategy= require('passport-local'),
    user         = require('./models/users'),
    Campground   = require('./models/campground'),
    User         = require('./models/users'),
    Comment      = require('./models/comment'),
    seedDB       = require('./seeds'),
    methodOverride= require('method-override');

    // Routes files
    var commentRoutes = require('./routes/comments'),
        campgroundRoutes = require('./routes/campgrounds'),
        indexRoutes = require('./routes/index')

// mongoose.connect('mongodb://localhost/yelp_camp');
mongoose.connect('mongodb://jctaillandier:Taillandier1@ds125872.mlab.com:25872/yelpcamp2905');

app.use(flash());
app.set('view engine', 'ejs') //prevent having to write .ejs
app.use(express.static(__dirname + '/public')) //to fetch css from public
app.use(bodyparser.urlencoded({extended:true})); //__dirname returns current file's directory
app.use(methodOverride('_method'));
app.locals.moment = require('moment');

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

/////// ----  Middleware that will run for everysingle route calls
//                  to send currentUser var all the time
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT, process.env.IP);

