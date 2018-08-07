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
    var newCamp = req.body.campground
        //create new campground object with new data
        //add it to DB with 'create'
        Campground.create(newCamp, function(err, campground){
                if(err){
                    console.log('could not inser to database..');
                    console.log(err);
                }
                else{
                    res.redirect('/campgrounds');
                }
            }
        );
    
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

//EDIT CAMPGROUND ROUTE - of specified /campground/:id/edit as PUT
router.get('/campgrounds/:id/edit', checkOwnership , function(req,res){

    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground : foundCampground});            
    });
    
});

//UPDATE ROUTE - 
router.put('/campgrounds/:id', checkOwnership , function(req,res){
    var data = req.body.campground;
                                //first param is id of object, second is data to change for
    Campground.findByIdAndUpdate(req.params.id, req.body.campground ,function(err,updatedCampground){
        if(err){
            console.log(err)
            res.redirect('/campgrounds')
        }
        else{ 
            res.redirect('/campgrounds/' + updatedCampground._id );
        }
    });
});

//DELETE route 

router.delete('/campgrounds/:id', checkOwnership , function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/campgrounds')
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

function checkOwnership(req,res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                console.log(err)
            }
            else{
                //does user own the post?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect('back')
                }
            }
        });
    }
    else{
        //sends a page baack
        res.redirect('back')
    }
}

module.exports = router;