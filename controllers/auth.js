const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.signin = async (req, res) => {
    try {
        //create hash password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(req.body.password,saltRounds);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });

        //save user and respond
        const user = await newUser.save();
        user.password = undefined;
        return res.status(201).json({user });

    } catch (e) {
        return res.status(401).json({
            errors: {body:[e.message]}
        })
    }
}

exports.signup = async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });
        if(!user) throw new Error("User not exists!!!");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) throw new Error("Password is incorrect!");

        user.password = undefined;
        return res.status(200).json({user})
        
    } catch (e) {
        return res.status(401).json({
            errors: { body: [e.message ]}
        })
    }
}

exports.isAuthenticated = async (req, res, next) => {

}