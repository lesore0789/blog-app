This is a blog application where users can sign up and create a username so they can comment on the blog posts. This application only allows the Admin to create, edit, and delete new blog posts.

## App Features

* Responsive web design with [Bootstrap 4](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

* Manage comment posts with basic CRUD functionalities:

  * Create, edit and delete comments


* Authentication:
  
  * User login with username and password
  * If user knows admin code, they can register their username and password with it


* Authorization:

  * A user cannot edit or delete posts and comments created by other users
  * If user is an Admin, they can delete and edit other people's comments. 
  * Admin users are the only ones that can create new blog posts

* Flash messages responding to users' interaction with the app

## This Project Was Built With the Following:

### Front-end

* [Bootstrap 4](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
* [ejs](http://ejs.co/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [mongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [moment](https://momentjs.com/)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)