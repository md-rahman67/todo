const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.model.js");
const passport = require("passport");
const {validateUsers} = require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs");
})

router.post("/signup", validateUsers, async(req, res) => {
    let {username, email, password} = req.body;
    let newUser = new User({
        username: username,
        email: email
    });
    let kaboom = await User.register(newUser, password);
    console.log(kaboom); 
    res.redirect("/todos");
})

router.get("/login", (req, res) => {
    res.render("./users/login.ejs");
})

router.post("/login", passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), async(req, res) => {
    req.flash("success", "Welcome to TAYO");
    res.redirect("/todos");
})




module.exports = router;