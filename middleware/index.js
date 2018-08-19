var Campground = require('../models/campground'),
    Comment    = require('../models/comment');
    
//all middleware here
var middlewareObj = {};

middlewareObj.checkOwnership = function (req,res,next){
    //is user logged in?
    if(req.isAuthenticated()){
     Campground.findById(req.params.id, function(err,foundCamp){
         if(err){
             console.log(err)
         }
         else{
             //does user own the post? (.equals is mongoose method, cant do === because not same object type)
             if(foundCamp.author.id.equals(req.user._id)){
                 next();
             }
             else{
                 req.flash('error','You don\'t have permission to do that');
                 res.redirect('/campgrounds');
             }
         }
     });
    }
    else{
        req.flash('error','You need to be logged in to do that');
    }
}

middlewareObj.isloggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", 'You need to be loged in to do that');
        res.redirect('/login');
    }
    
}
middlewareObj.checkCommentOwnership = function (req,res,next){
       //is user logged in?
       if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err,foundComment){
            if(err){
                req.flash('error','Campground not found')
                console.log(err)
            }
            else{
                //does user own the post? (.equals is mongoose method, cant do === becasue not same object type)
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", 'You dont have permission to do that');
                    res.redirect('back')
                }
            }
        });
      
    }

    else{
        req.flash("error", 'You need to be loged in to do that');
        //sends a page baack
        res.redirect('back')
    }
}


module.exports = middlewareObj;