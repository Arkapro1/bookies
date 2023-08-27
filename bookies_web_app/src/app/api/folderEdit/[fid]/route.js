import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import Folders from "@/models/folderModel";
import { NextResponse } from "next/server";

export const PUT=async(request,{params})=>{
    const body=await request.json(); 
    
    try {
        await connect();
        
       
        const fid=params.fid;
        await Folders.updateOne(
            { _id: fid},
            {
               name:body.name,
               description:body.description
            });
        return new NextResponse("folder renamed",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}