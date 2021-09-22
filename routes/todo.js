var express = require('express');
require("dotenv").config();
const { uuid } = require('uuidv4');
var router = express.Router();
var TodoModel = require("../mongoModels/todo");
var Todo = require("../SequelizeModels").Todo;
router.get("/",(req, res)=>{
    if(req.session.isLoggedIn){
        if(process.env.DRIVER==="mongo"){
            TodoModel.find({userId: req.session.userId, isDeleted: false},(err, todos)=>{
                res.render("todo",{todos: todos});
            })
        }
        else{
            Todo.findAll({where:{userId: req.session.userId, isDeleted: false}}).then(todos=>{
                res.render("todo",{todos: todos});
            }).catch(e=>{
                res.send(e);
            })
        }
     }
     else{
        res.redirect("/login");
     }
})

router.post("/",(req, res)=>{
    const {todo} = req.body;
    const todoId = uuid();
    const userId = req.session.userId;
    if(process.env==="mongo"){
        TodoModel.create({todo,todoId, userId},(err,todo)=>{
            if(err){
                
            }
            else{
                res.redirect("/");
            }
        });
    }
    else{
        Todo.create({todo,todoId, userId, isDeleted: false}).then(todo=>{
            res.redirect("/");
        });
    }
})

router.delete("/:todoId",(req, res)=>{
    const {todoId} = req.params;
    if(process.env.DRIVER==="mongo"){
        TodoModel.updateOne({todoId: todoId},{isDeleted: true},(err,todo)=>{
            if(err){
                res.send({message: "error"});
            }
            else{
                res.send({message: "deleted successfully"})
            }
        });
    }
    else{
        Todo.update({isDeleted: true},{where: {todoId: todoId}}).then(todo=>{
            res.send({message: "deleted successfully"})
        })
    }
})

module.exports = router;