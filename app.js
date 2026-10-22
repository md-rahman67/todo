const express = require("express");
const mongoose = require("mongoose")
const Todo = require("./models/todo.model.js");
const path = require("path");

const app = express();

//* Mongoose connection------
main().then(()=> console.log("connected")).catch(err => console.log(err));
 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/todo');
}


//* Middlewares--------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//* routes-------------------
app.get("/todos", async (req, res, next) => {
    let todos = await Todo.find();
    res.render("todo.ejs", { todos });
})

app.listen(8080, ()=>{
    console.log("responding to port: 8080");
})