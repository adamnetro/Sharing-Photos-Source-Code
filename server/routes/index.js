const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const post = require('../controllers/post')
const isLoggedIn = require('../middelwares/auth')

router.post('/register', user.register)
router.post('/login', user.login)
router.get('/me', isLoggedIn, user.me)
router.put('/update', isLoggedIn, user.update)

router.post('/upload', isLoggedIn, post.upload)
router.get('/show', post.show)
router.get('/showmyposts', isLoggedIn, post.showMyPosts)
router.post('/like', isLoggedIn, post.like)
router.post('/showLikes', post.showLikes)
router.post('/delete', isLoggedIn, post.delete)
router.post('/savepost', isLoggedIn, post.savePost)
router.post('/showsave', isLoggedIn, post.showSave)
router.get('/showmysavelist', isLoggedIn, post.showMySaveList)
router.post('/postedit', isLoggedIn, post.postEdit)

module.exports = router