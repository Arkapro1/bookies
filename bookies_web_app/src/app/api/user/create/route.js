import connect from "@/utils/database";
import Users from "@/models/user";
import { NextResponse } from "next/server";

export const POST=async(request)=>{
    const body=await request.json(); 
    const newUser=new Users(body);
    console.log(body);
    try {
        await connect();
        const user =  await Users.findOne({gmail:body?.gmail});
        if(user){
            return new NextResponse("User already exist",{status:400});
        }
        console.log("debug 1");
       const newUserSave= await newUser.save();
       console.log("debug 2");
         if(!newUserSave){
                return new NextResponse("User not created",{status:400});
            }
       
        return new NextResponse("User Created",{status:200});
    } catch (error) {
        return new NextResponse(error.massage,{status:400});
    }
}