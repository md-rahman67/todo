const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todo.model.js");
const Task = require("./models/tasks.model.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const todoRouter = require("./routes/todos.route.js");
const taskRouter = require("./routes/tasks.route.js");
const userRouter = require("./routes/user.router.js");
const session = require("express-session");
const ExpressError = require("./utils/express-error.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.model.js");
const flash = require("connect-flash");

// 
const app = express();

//* Mongoose connection------
main().then(()=> console.log("connected")).catch(err => console.log(err));
 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/todo');
}


//* Middlewares--------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})
//todo routes-------------------

//* todo routes
app.use("/todos", todoRouter);

//* task routes
app.use("/todos/:id/tasks", taskRouter);

//* user routes
app.use("/", userRouter)


//! error handling----------------->
app.use((req, res, next) => {
    throw new ExpressError(404, "Page not Found!!");
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong, go back previous page"} = err;
    res.status(statusCode).render("err.ejs", {statusCode, message});
}) 

app.listen(8080, ()=>{
    console.log("responding to port: 8080");
})