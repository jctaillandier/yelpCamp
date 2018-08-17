var express= require('express')
    router = express.Router();
var Campground = require('../models/campground'),
    comment = require('../models/comment'),
    middleware = require('../middleware');
    
    
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
router.get('/campgrounds/new' , middleware.isloggedIn, function(req,res){
    res.render('campgrounds/new');
});

// CREATE - add new campground to DB
router.post('/campgrounds', middleware.isloggedIn ,function(req,res){
    //get data from form, add campground to DB, redirect back
    var newCamp = {
        name:  req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
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
router.get('/campgrounds/:id/edit', middleware.checkOwnership , function(req,res){

    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground : foundCampground});            
    });
    
});

//UPDATE ROUTE - 
router.put('/campgrounds/:id', middleware.checkOwnership , function(req,res){
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

router.delete('/campgrounds/:id', middleware.checkOwnership , function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/campgrounds')
    });
});


module.exports = router;