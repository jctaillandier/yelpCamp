var   mongoose = require('mongoose'),
    Campground = require('./models/campground'),
       Comment = require('./models.comment');

    var data = [
        {
            title:'Clouds rest',
            image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            description: 'Not a bad place, not a great place. It depends'
        },
        {
            title:'Sleepy Hollow',
            image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            description: 'So so'
        },
        {
            title:'Waking fire',
            image: 'https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            description: 'It smells weirds here'
        }
    ]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){console.log(err)}
        
        console.log('removed campgrounds!');
        
        //add a few campgrounds from 'data'
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){console.log(err)}
                else{
                    console.log('added a campground');

                    //create comment on each (same comment on each campgrounds)
                    Comment.create({
                        text:'This place is the best!',
                        author: 'Homer'
                    }, function(err,comment){
                        if(err){console.log(err)}
                        else{
                            campground.comment.push(comment);
                            campground.save();
                            console.log('created new comments')
                        }
                    })
                }
            });
        });
        
    });
    

    //add a few comments
}

module.exports = seedDB;

