var express= require('express')
    router = express.Router();

var comments = require('../models/comment'),
    campground = require('../models/campground');

//////////////////////////////////////////////////////////////////////
//////////////////////////Nested COMMENTS routes///////////////////////////////

// NEW FORM
router.get('/campgrounds/:id/comments/new', isloggedIn , function(req,res){
    //find campground._id and send it with
    Campground.findById(req.params.id, function(err, campground){
        if(err){console.log(err)}
        else{
            res.render('comments/new', {campground: campground})
        }
    });
});
//CREATE
router.post('/campgrounds/:id/comments',isloggedIn ,function(req,res){
    // Find campground using Id  
    // Then add comments to it      
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){console.log(err)}
        else{
            Comment.create(req.body.comment, function(err, newComment){
                if(err){console.log(err)}
                else{
                    //first add username and id to Comment
                    //saves current user as author
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    //save comment
                    foundCamp.comments.push(newComment);
                    foundCamp.save();
                    res.redirect('/campgrounds/'+ foundCamp._id);
                }
            });
        }
    })
        
    
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