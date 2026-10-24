const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("./tasks.model.js");

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task" 
        }
    ]
});


todoSchema.post("findOneAndDelete", async(data) => {
    if(data){
        await Task.deleteMany({_id: {$in: data.tasks}});
    }
})

module.exports = mongoose.model("Todo", todoSchema);