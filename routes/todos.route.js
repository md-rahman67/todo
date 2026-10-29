const express = require("express");
const Todo = require("../models/todo.model.js");
const {validateTodos, isLoggedIn} = require("../middleware.js");
const ExpressError = require("../utils/express-error.js");

const router = express.Router({mergeParams: true});


//* Root route
router.get("/",isLoggedIn, async (req, res, next) => {
    let todos = await Todo.find({
        createdBy: req.user._id
    });
    res.render("todo.ejs", { todos });
})


//* add route
router.post("/",isLoggedIn, validateTodos, async (req, res) => {
    let { title } = req.body;
    let createdBy = req.user._id;
    console.log(createdBy);
    let newTodo = new Todo({
        title: title,
        createdBy: createdBy
    });

    await Todo.create(newTodo)
    req.flash("success", "New Todo Created");
    res.redirect("/todos");
})

//* logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You're logged out")
        res.redirect("/todos");
    })
})

//* delete route
router.delete("/:id",isLoggedIn, async(req, res) => {
    let { id } = req.params;
    let deleted = await Todo.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("error", "Todo deleted");
    res.redirect("/todos");
})

//* show route
router.get("/:id", async (req, res) => {
    let { id } = req.params;
    let todo = await Todo.findById(id).populate("tasks").populate("createdBy");
    // const todo = await Todo.find({
    //     createdBy: req.user._id
    // }).populate("tasks").populate("createdBy");

    if(!todo){
        throw new ExpressError(404, "Resource not found");
    }
    res.render("show.ejs", { todo });
})



//* edit form route
// router.get("/:id/edit", async (req, res) => {
//     let { id } = req.params;
//     let todo = await Todo.findById(id);
//     res.render("edit.ejs", { todo });
// })

//* edit route
router.put("/:id", isLoggedIn, async(req, res) => {
    let { id } = req.params;
    let { title } = req.body;

    await Todo.findByIdAndUpdate(id, {
        $set: {
            title: title
        }
    });

    req.flash("success", "Todo Name changed");

    res.redirect("/todos");
})




module.exports = router;