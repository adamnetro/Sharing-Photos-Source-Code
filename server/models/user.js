const mongoose = require('mongoose')

const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 17
    },
    email: {
        type: String,
        required: true,
        maxlength: 70,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    saveList: [
        {
            post: {
                type: mongoose.Schema.ObjectId,
                ref: 'Post'
            }
        }
    ],
})

const Model = mongoose.model('User', ModelSchema)

module.exports = Model