var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.redirect("/blogs");
});

// AUTH Routes

// Show Register form
router.get("/register", function(req, res){
    res.render("register");
});

//Handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
        req.flash("error", err.message);
        return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
        req.flash("success", "Sucessfully signed up! Nice to meet you " + user.username);    
        res.redirect("/blogs");
        });
    });
});

//Show Login form
router.get("/login", function(req, res){
    res.render("login");
});

// Handle Login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/blogs",
        failureRedirect: "/login"
    }), function(req, res){
});


// Logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/blogs");
});



module.exports = router;