     
import Documents from "@/models/documentModel";
import connect from "@/utils/database";
import Folders from "@/models/folderModel";
import Users from "@/models/user";
import { NextResponse } from "next/server";
export const PUT=async(request)=>{
    const body=await request.json(); 
    const workSpaceCode=body.workSpaceCode
    const collabUserEmail=body.email
    
    try {
        await connect();
        const collaborator = await Users.findOne({ gmail:collabUserEmail });
        if(!collaborator){
            return new NextResponse("User not found",{status:400});
        }
       
        const workSpace=await Folders.findOne({folderCode : workSpaceCode});
        if(!workSpace){
            return new NextResponse("Folder not found",{status:400});
        }
       
        const adminGmail=workSpace.gmail;
       
        const updateCollabRequest=await Users.updateOne(
            {gmail:adminGmail},
            {
                $push: {
                    collabRequests: {
                        
                            collaboratorId:collaborator._id,
                            workSpaceId:workSpace._id
                        
                    }
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

export const POST=async(request)=>{
    // console.log("hgfhj");
    const body=await request.json(); 
    const gmail=body.email
    // console.log("done");
    try {
        await connect();
        const user=await Users.findOne({gmail:gmail})
        

        const collabRequests=user.collabRequests;
       const collabRequestData=await Promise.all( collabRequests.map(async(req,index)=>{
         const collaborator=await Users.findOne({_id:req.collaboratorId})
         const workSpace=await Folders.findOne({_id:req.workSpaceId})
            return {
                collaboratorGmail:collaborator.gmail,
                workSpaceName:workSpace.name
            }

        }))
        console.log(collabRequestData);
        return new NextResponse(JSON.stringify(collabRequestData, null, 2), {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          });          
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}