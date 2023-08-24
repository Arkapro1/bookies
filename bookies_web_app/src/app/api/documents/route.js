import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import Folders from "@/models/folderModel";
import { NextResponse } from "next/server";

export const GET=async(request)=>{
    try {
        await connect();
        const {fid}=useParams();
        const documents = await Folders.findById(fid).populate({path:"documents"})
        return new NextResponse(JSON.stringify(documents),{status:200});
    } catch (error) {
        return new NextResponse("Error",{status:400});
    }
}

export const POST=async(request)=>{
    const body=await request.json(); 
    const newDoc=new Documents(body);
    // const newDoc=body;
    try {
        await connect();
        await newDoc.save();     
        // return new NextResponse(body);
        return new NextResponse("Doc created",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}