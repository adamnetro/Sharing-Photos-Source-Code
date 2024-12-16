const User = require('../models/user')
const jwtHelpers = require('../utils/jwt')
const bcrypt = require('bcrypt')



exports.register = async (req, res) => {
    const { name, email, password } = req.body
    const user = User({
        name,
        email,
        password: bcrypt.hashSync(password, 8)
    })
    try {
        await user.save()
        res.status(200).json({
            title: 'Success',
            message: 'Your account has been created!',
        })
    } catch (e) {
        if (e.code == 11000) {
            res.json({
                title: 'Alert',
                message: 'Email already in use'
            })
        } else {
            res.status(500).json({
                title: 'Alert',
                message: 'Something is wrong'
            })
        }
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({
            title: 'Success',
            message: 'welcome to Sharing Photos',
            token: jwtHelpers.sign({ sub: user.id })
        })
    } else {
        res.json({
            title: 'Alert',
            message: 'Incorrect email or password'
        })
    }
}

exports.me = async (req, res) => {
    const userId = req.currentUser
    try {
        const user = await User.findById(userId.sub).select('-password -__v')
        res.json(user)
    } catch (e) {
        res.status(500).json({
            title: 'Alert',
            message: 'Internal server error'
        }
        )
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.currentUser
        const { name, email, password } = req.body
        const updatedData = {}
        if (name) updatedData.name = name
        if (email) updatedData.email = email
        if (password) {
            const hashPassword = bcrypt.hashSync(password, 8)
            updatedData.password = hashPassword
        }

        const user = await User.updateOne({ _id: id.sub }, { $set: updatedData})
        if (user) {
            res.json({
                title: 'Success',
                message: 'Your data has been updated!'
            })
        }

    } catch (e) {
        res.status(500).json({
            title: 'Alert',
            message: 'Internal server error'
        }
        )
    }
}