var express = require('express');
require("dotenv").config();
var router = express.Router();
const UserModel = require("../mongoModels/user");
const bycrypt = require("bcrypt");
const User = require('../SequelizeModels').User;
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
 if(process.env.DRIVER === "mongo"){
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
 }
 else{
     User.findOne({
         Where: {
             email: email
         }
     }).then((user)=>{
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
     }).
     catch(e=>{
        res.send(e);
     });
 }
})

module.exports = router;