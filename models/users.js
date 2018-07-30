var mongoose = require('mongoose');
var passportLocalMongoose= require('passport-local-mongoose');


var userSchema = mongoose.Schema({
    username: String,
    password: String
});

//takes care or all auth methods for user
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;