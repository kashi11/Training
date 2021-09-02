var express = require('express');
const { uuid } = require('uuidv4');
var router = express.Router();
var TodoModel = require("../models/todo");

router.get("/",(req, res)=>{
    if(req.session.isLoggedIn){
        TodoModel.find({userId: req.session.userId, isDeleted: false},(err, todos)=>{
            res.render("todo",{todos: todos});
        })
     }
     else{
        res.redirect("/login");
     }
})

router.post("/",(req, res)=>{
    const {todo} = req.body;
    const todoId = uuid();
    const userId = req.session.userId;
    TodoModel.create({todo,todoId, userId},(err,todo)=>{
        if(err){
            
        }
        else{
            res.redirect("/");
        }
    });
})

router.delete("/:todoId",(req, res)=>{
    const {todoId} = req.params;
    TodoModel.updateOne({todoId: todoId},{isDeleted: true},(err,todo)=>{
        if(err){
            res.send({message: "error"});
        }
        else{
            res.send({message: "deleted successfully"})
        }
    });
})

module.exports = router;