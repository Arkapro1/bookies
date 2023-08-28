
import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import Folders from "@/models/folderModel";
import { NextResponse } from "next/server";
// import { useParams } from 'next/navigation';

export const GET=async(request,{params})=>{
    try {
        await connect();
        const fid=params.fid;
        const folder = await Folders.findById(fid).populate({path:"documents"})
        let filteredData=folder.documents.filter((ele)=>{
            return ele.contentType=="img"
        })
        // filteredData.add("bv")
        // filteredData.add("bv")
        // filteredData.add("bv")
        // filteredData.add("bv")
        filteredData=[...filteredData,"jh","ijj"]
        return new NextResponse(JSON.stringify(filteredData),{status:200});
        // return new NextResponse(fid,{status:200});
    } catch (error) {
        return new NextResponse("Error",{status:400});
    }
}

export const POST=async(request,{params})=>{
    const body=await request.json(); 
    const newDoc=new Documents(body);
    
    try {
        await connect();
        await newDoc.save();    
       
        const fid=params.fid;
        await Folders.updateOne(
            { _id: fid},
            {
                $push: {
                    documents: [newDoc._id]
                }
            });
        return new NextResponse("Doc created",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}


