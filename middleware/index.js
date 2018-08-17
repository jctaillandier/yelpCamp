var Campground = require('../models/campground'),
    Comment    = require('../models/comment');
    
//all middleware here
var middlewareObj = {};

middlewareObj.checkOwnership = function (req,res,next){
    //is user logged in?
    if(req.isAuthenticated()){
     Comment.findById(req.params.commentId, function(err,foundComment){
         if(err){
             console.log(err)
         }
         else{
             //does user own the post? (.equals is mongoose method, cant do === becasue not same object type)
             if(foundComment.author.id.equals(req.user._id)){
                 next();
             }
             else{
                 res.redirect('back')
             }
         }
     });
    }
}

middlewareObj.isloggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login')
    }
}
middlewareObj.checkCommentOwnership = function (req,res,next){
       //is user logged in?
       if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err,foundComment){
            if(err){
                console.log(err)
            }
            else{
                //does user own the post? (.equals is mongoose method, cant do === becasue not same object type)
                if(foundComment.author.id.equals(req.user._id)){
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


module.exports = middlewareObj;