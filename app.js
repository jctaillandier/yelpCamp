var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var request = require('request')

app.set('view engine', 'ejs') //prevent having to write .ejs
app.use(express.static('public')) //to fetch css from public
app.use(bodyparser.urlencoded({extended:true}));

var data = [
    {
        name: 'salmon creek',
        image:'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-0.3.5&s=2e8ad7a67f7c66a7440d86f0a711aa26&auto=format&fit=crop&w=649&q=80'
    },
    {
        name:'Saint Michel des saints',
        image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1050&q=80'
    },
    {
        name: 'Saint Goat',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&s=2e80ca86a30db7be648da0d9b9e21fae&auto=format&fit=crop&w=1950&q=80'
    },
    {
        name: 'salmon creek',
        image:'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-0.3.5&s=2e8ad7a67f7c66a7440d86f0a711aa26&auto=format&fit=crop&w=649&q=80'
    },
    {
        name:'Saint Michel des saints',
        image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1050&q=80'
    },
    {
        name: 'Saint Goat',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&s=2e80ca86a30db7be648da0d9b9e21fae&auto=format&fit=crop&w=1950&q=80'
    },
    {
        name: 'salmon creek',
        image:'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-0.3.5&s=2e8ad7a67f7c66a7440d86f0a711aa26&auto=format&fit=crop&w=649&q=80'
    },
    {
        name:'Saint Michel des saints',
        image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1050&q=80'
    },
    {
        name: 'Saint Goat',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&s=2e80ca86a30db7be648da0d9b9e21fae&auto=format&fit=crop&w=1950&q=80'
    }
]

app.get('/', function(req,res){
    res.render('index');
});
app.get('/campgrounds', function(req,res){
    res.render('campgrounds', {data:data});
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
    if(newname != ''){
        data.push({
            name: newname,
            image: newimage
        });
    }
    //redirect defaults a GET request, so no issue there
    res.redirect('/campgrounds');
});



var myPort = 3000;
app.listen(3000, function(){
    console.log('Listening on port ' + myPort);
})