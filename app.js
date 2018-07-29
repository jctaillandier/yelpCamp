var express      = require('express'),
    app          = express(),
    bodyparser   = require('body-parser'),
    request      = require('request'),
    mongoose     = require('mongoose'),
    Campground   = require('./models/campground'),
    User         = require('./models/users'),
    Comment      = require('./models/campground'),
    seedDB       = require('./seeds');


seedDB();

mongoose.connect('mongodb://localhost/yelp_camp');

// Campground.create(
//     {
//         name:'Saint Michel des saints',
//         image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1050&q=80',
//         description: 'Peaceful place 2 hours north of Montreal. Ideal to reconnect with nature'
//     }    ,  function(err, campground){
//             if(err){
//                 console.log(err);
//             } else{
//                 console.log('New campground');
//                 console.log(campground);
//             }
//         });

app.set('view engine', 'ejs') //prevent having to write .ejs
app.use(express.static('public')) //to fetch css from public
app.use(bodyparser.urlencoded({extended:true}));


app.get('/', function(req,res){
    res.render('index');
});

// INDEX - Show all Campgrounds
app.get('/campgrounds', function(req,res){
    //process to get all data from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){console.log(err)
        } else{
            res.render('index', {data:allcampgrounds});
        }
    })
});
// NEW - displays form to add new campground 
app.get('/campgrounds/new' , function(req,res){
    res.render('new');
});

// CREATE - add new dog to DB
app.post('/campgrounds', function(req,res){
    //get data from form, add campground to DB, redirect back
    var newname = req.body.name;
    var newimage = req.body.image;
    var newdesc = req.body.description;

    if((newname != '') && (newimage != "")){
        //create new campground object with new data
        //add it to DB with 'create'
        Campground.create(
            {
                name: newname,
                image: newimage,
                description: newdesc
            }, function(err, campground){
                if(err){
                    console.log('could not inser to database..');
                    console.log(err);
                }
                else{
                    res.redirect('/campgrounds');
                }
            }
        );
    }  
    
});

// SHOW - show page of specified ID - HAs to come after '/campgrounds/anythingElse'
app.get('/campgrounds/:id', function(req,res){
    //find 'id' campground
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){console.log(err);}
        else{
            //show template with that found id
            res.render('show', {campground:foundCampground})
        }
    });
})



var myPort = 3000;
app.listen(3000, function(){
    console.log();
    console.log('******************************')
    console.log('Listening on port ' + myPort);
    console.log('******************************')
})