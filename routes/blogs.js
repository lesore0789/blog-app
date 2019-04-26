var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");

// BLOG Routes
  
//Index Route
router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
        console.log("Error!");
        } else {
        res.render("blogs/index", {blogs: blogs});
        }
    });
});

//New Route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blogs/new");
});

//Create Route
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to blogs array
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newBlogPost = {title: title, image: image, body: body, author: author};
    //create blog
    Blog.create(newBlogPost, function(err, newBlog){
        if(err){
            res.render("blogs/new");
        } else {
            //then redirect to the index
            res.redirect("/blogs");
        }
    });
});

//Show Route
router.get("/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
        res.redirect("/blogs");
        } else {
        res.render("blogs/show", {blog: foundBlog});
        }
    });
});

//Edit Route
router.get("/:id/edit", middleware.checkBlogOwnership, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
        res.redirect("/blogs");
        } else {
        res.render("blogs/edit", {blog: foundBlog});
        }
    });
});

// Update Route
router.put("/:id", middleware.checkBlogOwnership, function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var blogPost = {title: title, image: image, body: body, author: author};
    Blog.findByIdAndUpdate(req.params.id, blogPost, function(err, updatedBlog){
        if(err){
        res.redirect("/blogs");
        } else {
        res.redirect("/blogs/" + req.params.id);
        }
    });
});

// Delete Route
router.delete("/:id", middleware.checkBlogOwnership, function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
        res.redirect("/blogs");
        } else {
        res.redirect("/blogs");
        }
    });  
});



module.exports = router;