const mongoose = require('mongoose')
const Documents = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        contentType:{
            type:String,
            enum:["pdf","img","txt"],
            required:true
        },
        contentLink:{
            type:String,
            required:true
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Documents', Documents);