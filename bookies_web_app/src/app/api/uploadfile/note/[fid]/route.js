import Documents from "@/models/documentModel";
import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";
export const POST=async(request,{params})=>{
    const body=await request.json();
    const {name,description}=body;
    const {fid}=params
    const contentType="note";
   
    try {
        await connect();
        const newLink=await Documents.create({
            contentType,
            name,
            description,
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
export const GET=async(request,{params})=>{
    const {fid}=params
    const contentType="note";

    try {
        await connect();
       const documents=await Documents.find({folderId:fid,contentType});
        if(!documents){
            return new NextResponse("Document not found",{status:400});
        }
        
        return new NextResponse(JSON.stringify(documents, null, 2), {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          },{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}

