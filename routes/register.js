var express = require('express');
require("dotenv").config();
const User = require('../SequelizeModels').User;
var router = express.Router();
var UserModel = require("../mongoModels/user");
const bycrypt = require("bcrypt");
const { uuid } = require('uuidv4');

router.get("/",(req, res)=>{
    res.render("register");
})

router.post("/",(req, res)=>{
    const body = req.body;
    const {email, password, name} = body;
    if(process.env.DRIVER === "mongo"){
        UserModel.findOne({email: email},(err, user)=>{
            if(user){
                res.render("register",{error: "User Already exists"});
            }
            else{
                const userId = uuid();
                bycrypt.hash(password,10,(err, hash)=>{
                    if(hash){
                        UserModel.create({email,password: hash, name, userId});
                        res.redirect("/");
                    }
                    else{
                        res.render("register",{error: "something went wrong"});
                    }
                })
            }
        })
    } else {
        User.findOne({where: {email: email}}).then(user=>{
            if(user.length!==0){
                res.render("register",{error: "User Already exists"});
            }
            else{
                const userId = uuid();
                bycrypt.hash(password,10,(err, hash)=>{
                    if(hash){
                        User.create({email,password: hash, name, userId});
                        res.redirect("/");
                    }
                    else{
                        res.render("register",{error: "something went wrong"});
                    }
                })
            }
        }).catch(e=>{
            res.send(e);
        })
    }
})

module.exports = router;