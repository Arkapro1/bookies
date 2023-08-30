
import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import Folders from "@/models/folderModel";
import { NextResponse } from "next/server";

export const GET=async(request,{params})=>{
    try {
        await connect();
        const fid=params.fid;
        const folder = await Folders.findById(fid).populate({path:"subFolders"})
        return new NextResponse(JSON.stringify(folder.subFolders),{status:200});
        
    } catch (error) {
        return new NextResponse("Error",{status:400});
    }
}

export const POST=async(request,{params})=>{
    const body=await request.json(); 
    const folderCode=Math.floor(Math.random() * 9000000000) + 1000000000;
    const newFolder=new Folders({...body,workSpace:false,folderCode});
    
    try {
        await connect();
        await newFolder.save();
       
        const fid=params.fid;
        await Folders.updateOne(
            { _id: fid},
            {
                $push: {
                    subFolders: [newFolder._id]
                }
            });
        return new NextResponse("Sub Doc created",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}


