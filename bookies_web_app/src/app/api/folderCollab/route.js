
import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import Folders from "@/models/folderModel";
import Users from "@/models/user";
import { NextResponse } from "next/server";
export const POST=async(request)=>{
    const body=await request.json(); 
    const folderCode=body.folderCode
    const collabUserEmail=body.email
    try {
        await connect();
        const user=await Users.findOne({gmail:collabUserEmail})
        const workspace=await Folders.findOne({folderCode:folderCode})


        const updateFolder= Folders.updateOne(
            { folderCode: folderCode},
            {
                $push: {
                    collabUser: [user._id]
                }
            });
        const updateCollabUser=Users.updateOne(
            {gmail:collabUserEmail},
            {
                $push: {
                    collab: [workspace._id]
                }
             }
             
       )

       const update= await Promise.all([updateFolder,updateCollabUser])

        return new NextResponse("Collab succseccfull",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}