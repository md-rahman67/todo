const express = require("express");
const Todo = require("../models/todo.model.js");
const Task = require("../models/tasks.model.js");
const {validateTasks} = require("../middleware.js");

const router = express.Router({mergeParams: true});


//* add tasks route
router.post("/", validateTasks, async(req, res) => {
    let { id } = req.params;
    let todo = await Todo.findById(id);

    let { task } = req.body;

    let newTask = new Task({
        tasks: task
    });

    todo.tasks.push(newTask);

    await newTask.save();
    await todo.save();
    res.redirect(`/todos/${id}`);
})

//* delete tasks
router.delete("/:taskId", async(req, res, next) => {
    let { id, taskId } = req.params;

    await Todo.findByIdAndUpdate(id, {$pull: {tasks: taskId}});
    await Task.findByIdAndDelete(taskId);
    res.redirect(`/todos/${id}`);
})

router.post("/:taskId", async(req, res) => {
    let { id, taskId } = req.params;
    let { checked } = req.body;
    let task = await Task.findById(taskId)
    task.checked = req.body.checked;
    await task.save();
    console.log(checked);
    res.redirect(`/todos/${id}`);
})

module.exports = router;