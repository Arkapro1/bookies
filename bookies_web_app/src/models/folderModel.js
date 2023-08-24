const mongoose = require('mongoose')
const Folder = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        subFolders:{
            type:[{type:mongoose.Schema.Types.ObjectId}],

            ref:"Folders"
        },
        documents:{
            type:[{type:mongoose.Schema.Types.ObjectId}],
            ref:"Documents"
        },

        createAt: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Folders', Folder);