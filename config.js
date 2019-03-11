const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var users = {
    "id":111, 
    "username":"support", 
    "password":"support"
};



passport.serializeUser(function (user, done) {
    done(null, users.id);
});
passport.deserializeUser(function (id, done) {
    done(null, users);
});


passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
        if (username === users.username && password === users.password) {
            return done(null, users);
        } else {
            return done(null, false, {"message": "User not found."});
        }
    })
);


