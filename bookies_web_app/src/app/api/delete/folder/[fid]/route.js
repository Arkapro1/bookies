import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";
import Documents from "@/models/documentModel";
export const DELETE=async(request,{params})=>{
    const {fid}=params;
    try {
        await connect();
        return await deleteFolder(fid);
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}

const deleteFolder=async(fid)=>{

    try {
        const folder = await Folders.findById(fid);
    
        //deleting all the docs inside the folder
       await Promise.all(folder.documents.map((ele)=>{
            Documents.findByIdAndDelete(ele);
            }))
        
        // deleting the folder
        const subFolders= await folder.subFolders
        await Promise.all( subFolders.map((ele)=>{
            deleteFolder(ele);
            
        }))
    
       
            await Folders.findByIdAndDelete(fid)
            return new NextResponse("Folder deleted",{status:200});
        
    } catch (error) {
        new NextResponse(error,{status:400});
    }
    
  
}