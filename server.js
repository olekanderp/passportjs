var express         = require('express'),
    app             = express(),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    bodyParser      = require('body-parser'),
    session         = require('express-session');
 

 
// body-parser for retrieving form data
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
const urlencodedParser = bodyParser.urlencoded({extended: false}); 
// initialize passposrt and and session for persistent login sessions


app.use(session({
    secret: "tHiSiSasEcRetStr",
    resave: true,
    saveUninitialized: true }));


require('./config.js');
app.use(passport.initialize());
app.use(passport.session());
 
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
 
    res.sendStatus(401);
}
 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/first.html");
});
 
// api endpoints for login, content and logout
//app.get("/login", function (req, res) {
//    res.send("<p>Please login!</p><form method='post' action='/login'><input type='text' name='username'/><input type='password' name='password'/><button type='submit' value='submit'>Submit</buttom></form>");
//});


//форма для заповення
app.get("/login", function (request, response) {
    response.sendFile(__dirname + "/register.html");
});


//обробка форми
app.post("/login", 
    passport.authenticate("local-login", { failureRedirect: "/login"}),
    function (req, res) {
        res.redirect("/content");
});


app.get("/content", isLoggedIn, function (req, res) {
    res.sendFile(__dirname + "/logout.html");
});



app.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
});
 
// launch the app
app.listen(3030);
console.log("App running at localhost:3030");
