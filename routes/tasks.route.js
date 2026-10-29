const express = require("express");
const Todo = require("../models/todo.model.js");
const Task = require("../models/tasks.model.js");
const {isLoggedIn} = require("../middleware.js");

const router = express.Router({mergeParams: true});


//* add tasks route
router.post("/", isLoggedIn, async(req, res) => {
    let { id } = req.params;
    let todo = await Todo.findById(id);

    let { task } = req.body;

    let newTask = new Task({
        tasks: task
    });

    todo.tasks.push(newTask);

    await newTask.save();
    await todo.save();
    req.flash("success", "Task Created");
    res.redirect(`/todos/${id}`);
})

//* delete tasks
router.delete("/:taskId", async(req, res, next) => {
    let { id, taskId } = req.params;

    await Todo.findByIdAndUpdate(id, {$pull: {tasks: taskId}});
    await Task.findByIdAndDelete(taskId);
    req.flash("error", "Task Deleted");
    res.redirect(`/todos/${id}`);
})

router.post("/:taskId", async(req, res) => {
    let { id, taskId } = req.params;
    let { checked } = req.body;
    let task = await Task.findById(taskId)
    task.checked = req.body.checked;
    await task.save();
    console.log(checked);
    req.flash("success", "Task Completed");
    res.redirect(`/todos/${id}`);
})

module.exports = router;