import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";

export const GET=async(request)=>{
    try {
        await connect();
        const folders = await Folders.find();
        return new NextResponse(JSON.stringify(folders),{status:200});
    } catch (error) {
        return new NextResponse("Error",{status:400});
    }
}

export const POST=async(request)=>{
    const body=await request.json(); 
    const newDoc=new Folders(body);
    // const newDoc=body;
    try {
        await connect();
        await newDoc.save();     
        // return new NextResponse(body);
        return new NextResponse("Folder created",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}