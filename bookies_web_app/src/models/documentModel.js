import { model, models, Schema } from "mongoose";

const docSchema = new Schema(
    {
        name:{
            type:String,
            // required:true
        },
        folderId:{
            type:String,
            required:true
        },
        contentType:{
            type:String,
            required:true
        },
        contentLink:{
            type:String,
            // required:true
        },
        description:{
            type:String,
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    }
)

const Documents=models.Documents || model("Documents",docSchema);
export default Documents; 