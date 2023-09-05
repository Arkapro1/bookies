import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";

export const PUT=async(request,{params})=>{
    const {nid}=params
    // const contentType="note";
    const body=await request.json();

    try {
        await connect();
       const documents=await Documents.findByIdAndUpdate(
        nid,{
            $set:{
                name:body.name,
                description:body.description
            }
        }
       );
        if(!documents){
            return new NextResponse("Document not found",{status:400});
        }
        return new NextResponse("Note updated successfully",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}

export const DELETE=async(request,{params})=>{
    // const body=await request.json(); 
    const {nid}=params; 
    try {
        await connect();
        const document=await Documents.findById(nid);
        if(document==null){
            return new NextResponse("No existence");
        }
        await Documents.findByIdAndDelete(nid);    
        return new NextResponse("Note deleted successfully",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}