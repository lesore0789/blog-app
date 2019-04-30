var Blog = require("../models/blog");
var Comment = require("../models/comment");

//All Middleware goes here
var middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
            if(err){
                req.flash("error", "Blog Post Not Found");
                res.redirect("back");
            } else {
                //Does user own the blog post?
                if(foundBlog.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You're Not the Blog Post Author");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please log in first")
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                // Does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You Are Not Author of the Comment")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please log in first")
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please log in first")
    res.redirect("/login");
};

module.exports = middlewareObj;