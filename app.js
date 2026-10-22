const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todo.model.js");
const path = require("path");
const methodOverride = require("method-override")

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

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

//* routes-------------------
app.get("/todos", async (req, res, next) => {
    let todos = await Todo.find();
    res.render("todo.ejs", { todos });
})

//* show route
app.get("/todos/:id", async (req, res) => {
    let { id } = req.params;
    let todo = await Todo.findById(id);
    res.render("show.ejs", { todo });
})

//* edit form route
app.get("/todos/:id/edit", async (req, res) => {
    let { id } = req.params;
    let todo = await Todo.findById(id);
    res.render("edit.ejs", { todo });
})

//* edit route
app.put("/todos/:id", async(req, res) => {
    let { id } = req.params;
    let { title } = req.body;

    await Todo.findByIdAndUpdate(id, {
        $set: {
            title: title
        }
    });

    res.redirect("/todos");
})

app.listen(8080, ()=>{
    console.log("responding to port: 8080");
})