var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    campgrounds: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Campground'
    }]
})

var User = mongoose.model('User', userSchema);
module.exports = User;