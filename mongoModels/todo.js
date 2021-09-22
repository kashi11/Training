const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    todo: String,
    isDeleted: {type:Boolean, default: false},
    todoId: String,
    userId: String
});

const todoModel = mongoose.model("todo",TodoSchema);
module.exports = todoModel;