     
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
        console.log(user.collaborators);

     return new NextResponse(JSON.stringify(user.collaborators, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      },{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}



export const POST=async(request)=>{
    const body=await request.json(); 
    const workSpaceId=body.workSpaceId
    const collaboratorId=body.collaboratorId
    const adminGmail=body.gmail
    
    try {
        await connect();
        const deleteCollabRequest=await Users.updateOne(
            {gmail:adminGmail},
            {
                $pull: {
                    collabRequests: {
                        
                            collaboratorId:collaboratorId,
                            workSpaceId:workSpaceId
                        
                    }
                }
                }
        )

       
         if(!deleteCollabRequest){
                return new NextResponse("Collab deleted failed",{status:400});
            }

        return new NextResponse("Collab deleted",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}