import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";
import Documents from "@/models/documentModel";

export const DELETE=async(request,{params})=>{
    const {did}=params;
    try {
        await connect();
        await Documents.findByIdAndDelete(did)
        return new NextResponse("Document deleted",{status:400}); ;
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}