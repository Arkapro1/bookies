import { model, models, Schema } from "mongoose";
const userSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        gmail:{
            type:String, 
            required:true,
            unique:true
        },
       workspaces:{
        type:[{type:Schema.Types.ObjectId}],
        ref:"Folders"
       },
        collab:{
            type:[{type:Schema.Types.ObjectId}],
            ref:"Folders"
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    }
)

// module.exports = mongoose.model('Folders', Folder);
const Users=models.User || model("Users",userSchema);
export default Users; 