const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (e) {
        res.status(500).json(e)
    }

}

exports.updatePost = async (req, res) => {
    console.log("u");
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            res.status(200).json("post is updated successfully")
        } else {
            res.status(403).json("you can upate only your post")
        }
    } catch (e) {
        res.status(500).json(e)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post hash been deleted");
        } else {
            res.status(403).json("you can delete only your post")
        }
    } catch (e) {
        res.status(500).json(e+" == post not found")
    }
}

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post hash been liked")
        } else {
            await post.updateOne({$pull: { likes: req.body.userId } })
            res.status(200).json("The post hash been disliked")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getUserTimelinePost = async (req, res) => {
    
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId})
            })
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error+" erro r ");
    }
}
