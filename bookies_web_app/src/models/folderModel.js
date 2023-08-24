import { model, models, Schema } from "mongoose";
const folderSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        subFolders:{
            type:[{type:Schema.Types.ObjectId}],
            ref:"Folders"
        },
        documents:{
            type:[{type:Schema.Types.ObjectId}],
            ref:"Documents"
        },

        createAt: {
            type: Date,
            default: Date.now
        }
    }
)

// module.exports = mongoose.model('Folders', Folder);
const Folders=models.Folders || model("Folders",folderSchema);
export default Folders; 