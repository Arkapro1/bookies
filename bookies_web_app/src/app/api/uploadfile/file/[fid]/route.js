import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import Users from "@/models/user";
import Documents from "@/models/documentModel";
import { NextResponse } from "next/server";
export const POST=async(request,{params})=>{
    const body=await request.json();
    const {contentLink,format}=body;
    const {fid}=params
    console.log(body,fid);
    const contentTypeList=["png","jpg","jpeg"]
    const contentType=contentTypeList.includes(format)?"img":"pdf";
   
    try {
        await connect();
        const newLink=await Documents.create({
            contentType,
            contentLink,
            folderId:fid
        })
        const uplosdLink=await Folders.updateOne({_id:fid},{
            $push:{
                documents:newLink
            }
        })
       
        if(!uplosdLink){

            return new NextResponse("Error",{status:400});
        }
        
        return new NextResponse("link upload successfully",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}

