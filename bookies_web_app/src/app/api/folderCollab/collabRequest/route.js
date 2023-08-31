     
import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import Folders from "@/models/folderModel";
import Users from "@/models/user";
import { NextResponse } from "next/server";
export const POST=async(request)=>{
    const body=await request.json(); 
    const workSpaceCode=body.workSpaceCode
    const collabUserEmail=body.email
    try {
        await connect();
        const collaborator = (await  Users.findOne({ gmail:collabUserEmail }));
        if(!collaborator){
            return new NextResponse("User not found",{status:400});
        }
        const workSpace=(await Folders.findOne({folderCode : workSpaceCode}));
        if(!workSpace){
            return new NextResponse("Folder not found",{status:400});
        }
        const adminGmail=workSpace.gmail;
        const updateCollabRequest=Users.updateOne(
            {gmail:adminGmail},
            {
                $push: {
                    collabRequests: [
                        {
                            collaboratorId:collaborator._id,
                            workSpaceId:workSpace._id
                        }]
                }
                }
        )
        if(!updateCollabRequest){
            return new NextResponse("Collab request failed",{status:400});
        }

        

       

        return new NextResponse("Collab request succseccfull",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}

export const GET=async(request)=>{
    const body=await request.json(); 
    const gmail=body.gmail
    try {
        await connect();
        const user=await Users.findOne({gmail:gmail}).populate({path:"collabRequests"})
        const collabRequests=user.collabRequest;
        
        return new NextResponse(collabRequests,{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}