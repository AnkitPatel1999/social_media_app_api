const User = require('../models/User');
const bcrypt = require('bcrypt')

exports.getUserById = async (req, res, next, id) => {
    await User.findById(id).exec((err, user ) => {
        if(err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user;
        next();
    })
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById({_id: req.profile._id});
        if(!user) throw new Error("User not exists");
    
        await user.delete();
        return res.status(200).json({message: 'User deleted successfully'})
    } catch (e) {
        return res.status(401).json({
            errors: { body:[ e.message ]}
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById({ _id:req.profile._id});
        if(!user) throw new Error("No user found");

        //user.password = undefined;
        const { password, isAdmin, ...other } = user._doc;
        return res.status(200).json({ other })
    } catch (e) {
        return res.status(401).json({ 
            errors: { body:  [ e.message ]}
        })
    }
}

exports.updateUser = async (req,res) => {

    if(req.params.id === req.body.userId || req.user.isAdmin) {
        if(req.body.password) {
            try {
                const saltRounds = 10;
                req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            } catch (e) {
                return res.status(403).json(e)
            }
        }
        try {
           const user = await User.findByIdAndUpdate(req.params.id, {
               $set: req.body
           }) 
           res.status(200).json("User updation successfully")
        } catch (e) {
            return res.status(403).json({e})
        }
    }

}

exports.followUser = async (req, res) => {
    console.log("req.profile._id ",req.body.userId,"req.params.id ",req.params.id);
    
    if(req.body.userId !== req.params.id) {

        console.log(req.params.id,req.body.userId);

        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId} });
                await currentUser.updateOne({ $push: { followings: req.params.id}})
                res.status(200).json("User has been followed")
            } else {
                res.status(200).json("You already follow this user");
            }
        } catch (e) {
            res.status(500).json(e)
        }
    } else {
        res.status(403).json("You can not follow yourself")
    }
}


exports.unfollowUser = async (req, res) => {
    
    if(req.body.userId !== req.params.id) {

        console.log(req.params.id,req.body.userId);

        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId} });
                await currentUser.updateOne({ $pull: { followings: req.params.id}})
                res.status(200).json("User has been unfollowed")
            } else {
                res.status(200).json("You don't follow this user");
            }
        } catch (e) {
            res.status(500).json(e)
        }
    } else {
        res.status(403).json("You can not unfollow yourself")
    }
}