const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    tasks: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("Task", taskSchema);