     
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
        const user = (await  Users.findOne({ email:collabUserEmail }));
        if(!user){
            return new NextResponse("User not found",{status:400});
        }
        const folder=(await Folders.findOne({folder_code : folderCode}));
        if(!folder){
            return new NextResponse("Folder not found",{status:400});
        }
        
        const updateCollabRequest=Users.updateOne(
            {email:collabUserEmail},
            {
                $push: {
                    collabRequest: [folder._id]
                }
                }
        )
        

       

        return new NextResponse("Collab request succseccfull",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}