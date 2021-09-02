var express = require('express');
var router = express.Router();
const UserModel = require("../models/user");
const bycrypt = require("bcrypt");

router.get("/",(req, res)=>{
    if(req.session.isLoggedIn){
        res.redirect("/");
     }
     else{
        res.render("login");
     }
})

router.post("/",(req, res)=>{
 const {email, password} = req.body;
 UserModel.findOne({email},(err, user)=>{
     if(user){
         bycrypt.compare(password,user.password,(err, matched)=>{
             if(matched){
                 req.session.isLoggedIn = true;
                 req.session.userId = user.userId;
                 res.redirect("/");
             }
             else{
                res.render("login",{error: "x Wrong password!"});
             }
         })
     }
     else{
        res.render("login",{error: "x User not found!"});
     }
 })
})

module.exports = router;