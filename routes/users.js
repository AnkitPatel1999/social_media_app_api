const router = require('express').Router();
const User = require('../models/User');
const { getUserById, getUser, deleteUser, updateUser, followUser, unfollowUser } = require('../controllers/user')

router.param('id',getUserById);

//update user
router.put('/:id', updateUser);

//delete user
router.delete('/:id', deleteUser)

//get a user
router.get('/:id', getUser)

//follow a user
router.put('/:id/follow', followUser);

//unfollow user
router.put('/:id/unfollow', unfollowUser);


module.exports = router;