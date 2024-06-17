const express = require('express');
const User = require('../models/userInfo');
const bcrypt = require('bcryptjs');

const router = express.Router();
//regex
const regexEmail = /^(.*)@([\w-]+\.)+[\w-]{2,4}$/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

router.post('/register', async (req, res) => {
    console.log("registering")
    console.log(req.body.name)
    // req.body = JSON.parse(req.body)
    //check input
    if (!regexEmail.test(req.body.email)) return res.send("not a valid email");
    if (!regexPassword.test(req.body.password)) return res.send("password must be 8 or more characters long and contain at least 1 capital letter and 1 number");

    //check if email exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);
    //create new user
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword
    });
    console.log(user);
    //save new user to the database
    try {
        const savedUser = await user.save();
        res.sendStatus(200)
    } catch (err) {
        console.log(err);
    }

});

router.post('/login', async (req, res) => {
    try {
        //check if email exists
        const user = await User.findOne({ "email": req.body.username });
        if (!user) {
            // console.log("Email not found");
            return res.status(400).send('Email or password is wrong');
        }
        //check if password matches
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Email or password is wrong');

        //create and assign token
        // req.session.userId = user._id;
            req.session.save(() => {
                req.session.logged_in = true;
                req.session.user = {
                  id: user._id,
                  name: user.name,
                };
                res.cookie("token", user._id, {
                    // can only be accessed by server requests
                    httpOnly: true,
                    // path = where the cookie is valid
                    path: "/",
                    // domain = what domain the cookie is valid on
                     domain: "localhost",
                    // secure = only send cookie over https
                    secure: false,
                    // sameSite = only send cookie if the request is coming from the same origin
                    sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
                    // maxAge = how long the cookie is valid for in milliseconds
                    maxAge: 3600000, // 1 hour
                  }).status(200).json({ message: 'Login successful' });
              });
        console.log(req.session.id);
        // res.status(200).json({ message: 'Login successful' });

    } catch (err) {
        console.log(err);
    }

});


router.delete('/logout', async (req, res) => {

    //delete token
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.send('User logged out');
    });


});


module.exports = router;