var express = require("express");
var router = express.Router({mergeParams:true});
var Blog = require("../models/blog");
var Comment = require("../models/comment");

// Comment Routes

//New
router.get("/new", isLoggedIn, function(req, res){
    //find blog by ID
    Blog.findById(req.params.id, function(err, blog){
        if(err){
        console.log(err);
        } else {
        res.render("comments/new", {blog: blog});
        }
    });
});

// Create
router.post("/", isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
        console.log(err);
        res.redirect("/blogs");
        } else {
        Comment.create(req.body.comment, function(err, comment){
            if(err){
            console.log(err);
            } else {
                // Add username and ID to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // Save comment
                comment.save();
                // Connect new coment to blog
                blog.comments.push(comment);
                blog.save();
                // Redirect to blog show page
                res.redirect("/blogs/" + blog._id);
            }
        });
        }
    })
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
};

module.exports = router;