var express      = require('express'),
    app          = express(),
    bodyparser   = require('body-parser'),
    request      = require('request'),
    mongoose     = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name:'Saint Michel des saints',
//         image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1050&q=80'
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
app.get('/campgrounds', function(req,res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){console.log(err)
        } else{
            res.render('campgrounds', {data:allcampgrounds});
        }
    })
});
//restfull 
app.get('/campgrounds/new' , function(req,res){
    res.render('new');
})

//restfull
app.post('/campgrounds', function(req,res){
    //get data from form, add campground to DB, redirect back
    var newname = req.body.name;
    var newimage = req.body.image;
    if((newname != '') && (newimage != "")){
        Campground.insertMany(
            {
                name: newname,
                image: newimage
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



var myPort = 3000;
app.listen(3000, function(){
    console.log();
    console.log('******************************')
    console.log('Listening on port ' + myPort);
    console.log('******************************')
})