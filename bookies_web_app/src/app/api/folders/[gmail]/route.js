import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
export const GET=async(req,res)=>{
    try {
        const {gmail}=useParams()
        await connect();
        const folders = await Folders.find({gmail,isWorkSpace:true});
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