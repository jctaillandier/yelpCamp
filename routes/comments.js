var express= require('express')
    router = express.Router();

var Comment = require('../models/comment'),
    Campground = require('../models/campground'),
    middleware = require('../middleware');

//////////////////////////////////////////////////////////////////////
//////////////////////////Nested COMMENTS routes///////////////////////////////

// NEW FORM
router.get('/campgrounds/:id/comments/new', middleware.isloggedIn , function(req,res){
    //find campground._id and send it with
    Campground.findById(req.params.id, function(err, campground){
        if(err){console.log(err)}
        else{
            res.render('comments/new', {campground: campground})
        }
    });
});
//CREATE
router.post('/campgrounds/:id/comments', middleware.isloggedIn ,function(req,res){
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
                    res.redirect('/campgrounds/'+ req.params.id);
                }
            });
        }
    })
});

// EDIT route 
router.get('/campgrounds/:id/comments/:commentId/edit', middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.commentId, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect('/campgrounds'+ req.params.id)
        }
        else{
            res.render('comments/edit', {campground_id : req.params.id, comment:foundComment});
        }
    })
});
//UPDATE route
router.put('/campgrounds/:id/comments/:commentId', middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment , function(err,foundComment){
        if(err){
            console.log(err);
        }
        res.redirect('/campgrounds/'+ req.params.id);
    });
});

//DESTROY route
router.delete('/campgrounds/:id/comments/:commentId', middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.commentId, function(err, deletedComment){
        if(err){
            console.log(err);
        }
        res.redirect('/campgrounds/' + req.params.id);
    })
});


module.exports = router;