var express = require("express"),
app = express(),
expressSanitizer = require("express-sanitizer"),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require("mongoose"), 
flash = require("connect-flash"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
Blog = require("./models/blog"),
User = require("./models/user"),
Comment = require("./models/comment");

// Requiring Routes
var commentRoutes = require("./routes/comments"),
blogRoutes = require("./routes/blogs"),
indexRoutes = require("./routes/index");

// App Config
mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require("moment");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "I love my whudda",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
 res.locals.currentUser = req.user;
 res.locals.error = req.flash("error");
 res.locals.success = req.flash("success");
 next();
});

app.use("/", indexRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);




var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Server is running!");
});