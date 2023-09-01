import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import Users from "@/models/user";
import Documents from "@/models/documentModel";
import { NextResponse } from "next/server";
export const GET=async(request,{params})=>{
    const {fid}=params
    const contentType="img";

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
