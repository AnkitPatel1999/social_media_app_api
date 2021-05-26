const router = require('express').Router();
const { createPost, updatePost, deletePost, getPost, likePost, getUserTimelinePost } = require('../controllers/post');

//create a post
router.post('/', createPost);

//update a post
router.put('/:id', updatePost)

//delete a post
router.delete('/:id', deletePost)

//like a post
router.put('/like/:id', likePost)

//get a post
router.get('/:id', getPost)

//get timeline post
router.get('/feed/all', getUserTimelinePost) 

module.exports = router;