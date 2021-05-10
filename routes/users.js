const router = require('express').Router();
const User = require('../models/User');

//update user
//delete user
router.delete('/:id', async (req, res) => {

    try {
        const user = await User.findById({_id: req.params.id});
        if(!user) throw new Error("User not exists");
    
        await user.delete();
        return res.status(200).json({message: 'User deleted successfully'})
    } catch (e) {
        return res.status(401).json({
            errors: { body:[ e.message ]}
        })
    }
})
//get a user
router.get('/:id', async (req, res) => {

    try {
        const user = await User.findById({_id: req.params.id});
        if(!user) throw new Error("No user found");

        user.password = undefined;
        return res.status(200).json({ user })
    } catch (e) {
        return res.status(401).json({ 
            errors: { body:  [ e.message ]}
        })
    }
})
//follow a user
//unfollow user

module.exports = router;