import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";

export const PUT=async(request,{params})=>{
    const body=await request.json();
    if(body.contentLink==undefined){

        return new NextResponse("Error",{status:500});
    } 
    
    const {lid}=params;
    //      64f472c15a2b84e89f2609d9 lid
    // 64f06e34eda4c848391ee309 fid
    // const contentType="link";
   
    try {
        await connect();
        // const documents=await Documents.find({folderId:fid,contentType});
        const updateLink=await Documents.findByIdAndUpdate(lid,{
            $set:{
                contentLink:body.contentLink
            }
        })
        if(!updateLink){
            return new NextResponse("Error",{status:400});
        }
        return new NextResponse("link updated successfully",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}

export const DELETE=async(request,{params})=>{
    // const body=await request.json(); 
    const {lid}=params;
    //      64f472c15a2b84e89f2609d9 lid
    // 64f06e34eda4c848391ee309 fid
    // const contentType="link";
   
    try {
        await connect();
        const document=await Documents.findById(lid);
        if(document==null){
            return new NextResponse("No existence");
        }
        await Documents.findByIdAndDelete(lid);
        // if(!updateLink){
        //     return new NextResponse("Error",{status:400});
        // }
        return new NextResponse("link deleted successfully",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}