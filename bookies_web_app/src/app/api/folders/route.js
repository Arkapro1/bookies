import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";

export const GET=async(request)=>{
    try {
        // const session = await session({request})
        // console.log(session.user.email,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        await connect();
        const folders = await Folders.find({});

     let filteredData=  folders.filter((ele)=>{
            return ele.isWorkSpace;
        })
        filteredData=filteredData==null?[]:filteredData;
        console.log(JSON.stringify(filteredData))
        return new NextResponse(JSON.stringify(filteredData),{status:200});
    } catch (error) {
        return new NextResponse("Error",{status:400});
    }
}

export const POST=async(request)=>{
    const body=await request.json(); 
    console.log(body)
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




