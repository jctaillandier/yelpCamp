var   mongoose = require('mongoose'),
    Campground = require('./models/campground'),
       Comment = require('./models/comment');

    var data = [
        {
            name:'Clouds rest',
            image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            description: 'Nonne vides quid sit? Tu es ... Jesse me respice. Tu ... blowfish sunt. A blowfish! Cogitare. Statura pusillus, nec sapientium panem, nec artificum. Sed predators facile prædam blowfish secretum telum non se habet. Non ille? Quid faciam blowfish, Isai. Blowfish quid faciat? In blowfish inflat, purus? s'
        },
        {
            name:'Sleepy Hollow',
            image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            description: 'Blowfish librantur in se quatuor, quinquies maior quam normalis, et quare? Quare id faciam? Ut terrorem facit, qui quid. Terrent! Ut alter, scarier pisces agminis off. Et quod tu es? Vos blowfish. Tu iustus in omnibus visio. Vides ... suus  suus non aliud aerem. Nunc ... qui cum partibus blowfish Isai? Tu damnare ius. Vos blowfish. Dicere iterum. Dicere illam quasi velis eam. Es BLOWFISH! '
        },
        {
            name:'Waking fire',
            image: 'https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            description: 'Ludum mutavit. Verbum est ex. Et ... sunt occidat. Videtur quod est super omne oppidum. Quis transfretavit tu iratus es contudit cranium cum dolor apparatus. Qui curis! Modo nobis certamen est, qui non credunt at. '
        },
        {
            name:'New Mexico\'s Very Own',
            image: 'https://images.unsplash.com/photo-1465256410760-10640339c72c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=37a168df6f641186f19b4a5781be0f7c&auto=format&fit=crop&w=1050&q=80',
            description: 'No speeches. Short speech. You lost your partner today. What\'s his name - Emilio? Emilio is going to prison. The DEA took all your money, your lab. You got nothing. Square one. But you know the business and I know the chemistry. I\'m thinking... maybe you and I could partner up.<br> I\'m sorry, what were you asking me? Oh, yes, that stupid plastic container I asked you to buy. You see, hydrofluoric acid won\'t eat through plastic. It will, however, dissolve metal, rock, glass, ceramic. So there\'s that. How about something with some protein, maybe? Something green, huh? How are you even alive? '
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
                        author:'Homer'
                    }, function(err,comment){
                        if(err){console.log(err)}
                        else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log('created new comments')
                        }
                    })
                }
            });
        });
        
    });
    
}

module.exports = seedDB;

