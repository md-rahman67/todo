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
const session = require("express-session");

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

//todo routes-------------------

//* todo routes
app.use("/todos", todoRouter);

//* task routes
app.use("/todos/:id/tasks", taskRouter);





app.listen(8080, ()=>{
    console.log("responding to port: 8080");
})