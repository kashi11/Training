var express = require('express');
var router = express.Router();
var UserModel = require("../models/user");
const bycrypt = require("bcrypt");

router.get("/",(req, res)=>{
    res.render("register");
})

router.post("/",(req, res)=>{
    const body = req.body;
    const {email, password, name} = body;
    UserModel.findOne({email: email},(err, user)=>{
        if(user){
            res.render("register",{error: "User Already exists"});
        }
        else{
            bycrypt.hash(password,10,(err, hash)=>{
                if(hash){
                    UserModel.create({email,password: hash, name});
                    res.redirect("/");
                }
                else{
                    res.render("register",{error: "something went wrong"});
                }
            })
        }
    })
})

module.exports = router;