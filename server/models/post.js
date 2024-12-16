const mongoose = require('mongoose')

const ModelSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    },
    title:{
        type:String,
        required:true,
        maxlength: 40
    },
    description:{
        type:String,
        maxlength: 200
    },
    image:{
        type:String,
    },
    likes:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User'
            }
        }
    ],
    date: {
        type: String,
    }
})

const Model = mongoose.model('Post', ModelSchema)

module.exports = Model