const Post = require('../models/post')
const User = require('../models/user')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const date = Date.now()
        cb(null, `${date}.jpg`)
    }
})

const uploadSetting = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 7
    }
})

exports.upload = [uploadSetting.single('image'), async (req, res) => {
    const { title, description, date } = req.body
    const id = req.currentUser
    const post = Post({ title, description, image: req.file.filename, user: id.sub, date })
    try {
        await post.save()
        if (post) {
            res.json({
                title: 'Success',
                message: 'Your post has been posted!',
                date:'kkkkk',
            })
        }
    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }

}]

exports.show = async (req, res) => {
    try {
        const post = await Post.find().sort({ _id: -1 }).limit(7).populate('user', 'name').select('-likes')
        res.send(post)
    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }

}

exports.showMyPosts = async (req, res) => {
    const id = req.currentUser
    try {
        const user = await Post.find({ user: id.sub }).sort({ _id: -1 }).select('-likes')
        res.json(user)
    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }

}

exports.like = async (req, res) => {
    const id = req.currentUser
    const { postId } = req.body
    try {
        const post = await Post.findById(postId)
        const index = post.likes.findIndex(e => e.user == id.sub)
        if (index > -1) {
            post.likes.splice(index, 1)
        } else {
            post.likes.push({ user: id.sub })
        }
        await post.save()
        res.json({
            title: 'Success',
            message: 'Good like :) 👍'
        })
    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }
}

exports.showLikes = async (req, res) => {
    const { postId, userId } = req.body
    try {
        const post = await Post.findById(postId)
        const response = {
            likes: post.likes.length,
            liked: false,
        }
        if (userId) {
            const index = post.likes.findIndex(e => e.user == userId)
            if (index > -1) {
                response.liked = true
            }
        }

        res.json(response)
    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }
}

exports.delete = async (req, res) => {
    const id = req.currentUser
    try {
        const { postId } = req.body
        const post = await Post.findById(postId)
        await Post.deleteOne({ _id: postId, user: id.sub })
        fs.unlink(`./uploads/${post.image}`, err => {
            if (err) {
                res.json({
                    title: 'Alert',
                    message: 'Somthing is wrong'
                })
            } else {
                res.json({
                    title: 'Success',
                    message: 'You deleted your post.'
                })
            }
        })

    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }

}

exports.savePost = async (req, res) => {
    const id = req.currentUser
    const { postId } = req.body
    try {
        const user = await User.findById(id.sub)
        const index = user.saveList.findIndex(e => e.post == postId)
        if (index > -1) {
            user.saveList.splice(index, 1)
        } else {
            user.saveList.push({ post: postId })
        }
        await user.save()
        res.json({
            title: 'Success',
            message: 'Successfully completed'
        })
    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }
}

exports.showSave = async (req, res) => {
    const id = req.currentUser
    const { postId } = req.body
    try {
        const user = await User.findById(id.sub)
        const index = user.saveList.findIndex(e => e.post == postId)
        if (index > -1) {
            res.json({
                saved: true
            })
        } else {
            res.json({
                saved: false
            })
        }
    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }
}

exports.showMySaveList = async (req, res) => {
    const id = req.currentUser
    try {
        const user = await User.findById(id.sub).populate({path:'saveList.post', populate:{path:'user',select:'name'}}).select('-name -email -password')
        res.json(user)
    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }
}

exports.postEdit = async (req, res) => {
    const { title, description, postId } = req.body
    try {
        const post = await Post.updateOne({ _id: postId }, { $set: { title, description } })
        if (post) {
            res.json({
                title: 'Success',
                message: 'Your data has been updated!'
            })
        }

    } catch (e) {
        res.json({
            title: 'Alert',
            message: 'Somthing is wrong'
        })
    }
}