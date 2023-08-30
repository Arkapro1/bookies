import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";
export const PUT=async(request)=>{
    const body=await request.json();
    try {
        // const {gmail}=useParams()
        console.log(body,"fgggggggggggggggggggs")
        // const session =await getServerSession(authOptions)
        
        await connect();
        const folders = await Folders.find({gmail:body.gmail,isWorkSpace:true});
        // const folders=await Folders.find();

    //  let filteredData=  folders.filter((ele)=>{
            // return ele.isWorkSpace;
        // })
        // filteredData=filteredData==null?[]:filteredData;
        // console.log(JSON.stringify(filteredData))
        
        return new NextResponse(JSON.stringify(folders),{status:200});
    } catch (error) {
        return new NextResponse("Error",{status:400});
    }
}

export const POST=async(request)=>{
    const body=await request.json();  
    // console.log(body)
    const folderCode=Math.floor(Math.random() * 9000000000) + 1000000000;
    console.log(folderCode);
    const newDoc=new Folders({...body,folderCode:`${folderCode}`});
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