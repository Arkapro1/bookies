     
import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import Folders from "@/models/folderModel";
import Users from "@/models/user";
import { NextResponse } from "next/server";
export const PUT=async(request)=>{
    const body=await request.json(); 
    const userGmail=body.gmail
    console.log(userGmail);
    try {
        await connect();
        const user=await Users.findOne({gmail:userGmail}).populate({path:"collaborators"})
        console.log(user);

     return new NextResponse(user.collaborators,{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}
