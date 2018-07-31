var express= require('express')
    router = express.Router();
var campground = require('../models/campground'),
    comment = require('../models/comment')
    
    
/////////////////////////////////////////
////////////////ROUTES//////////////////

// INDEX - Show all Campgrounds
router.get('/campgrounds', function(req,res){
    
    //process to get all data from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){console.log(err)
        } else{
            res.render('campgrounds/index', {data:allcampgrounds});
        }
    })
});
// NEW - displays form to add new campground 
router.get('/campgrounds/new' , isloggedIn, function(req,res){
    res.render('campgrounds/new');
});

// CREATE - add new campground to DB
router.post('/campgrounds', isloggedIn ,function(req,res){
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
                author: { //saves current user as author
                    id: req.user._id,
                    username: req.user.username,
                },
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
router.get('/campgrounds/:id', function(req,res){
    // find 'id' campground AND .populate.exec to add comments
    // from the other collections, instead of only the mongo ObjectId
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){console.log(err);}
        else{
            //show template with that found id
            //console.log(foundCampground)
            res.render('campgrounds/show', {campground:foundCampground})
        }
    });
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