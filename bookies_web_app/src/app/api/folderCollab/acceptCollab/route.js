
import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import Folders from "@/models/folderModel";
import Users from "@/models/user";
import { NextResponse } from "next/server";
export const POST=async(request)=>{
    const body=await request.json(); 
    const workSpaceId=body.workSpaceId
    const collaboratorId=body.collaboratorId
    console.log(body);
    try {
        await connect();
        const collaborator=await Users.findById(collaboratorId)
        if(!collaborator){
            return new NextResponse("User not found",{status:400});
        }
        const workspace =  (await Folders.findOne({_id : workSpaceId}));
        if(!workspace){
            return new NextResponse("Folder not found",{status:400});
        }

        const updateFolder= Folders.updateOne(
            { _id: workspace._id},
            {
                $push: {
                    collabUsers: [collaborator._id]
                }
            });
        const updateCollabUser=Users.updateOne(
            {_id:collaborator._id},
            {
                $push: {
                    collaborators: [workspace._id]
                }
             }
             
       )

       const update= await Promise.all([updateFolder,updateCollabUser])
         if(!update){
                return new NextResponse("Collab failed",{status:400});
            }

        return new NextResponse("Collab succseccfull",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}