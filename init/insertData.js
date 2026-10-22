const data = require("./data.js");
const mongoose = require("mongoose");
const Todo = require("../models/todo.model.js");

main().then(()=> console.log("connected")).catch(err => console.log(err));
 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/todo');
}

const addData = async () => {
    let result = await Todo.insertMany(data);

    console.log(result);
}

addData();