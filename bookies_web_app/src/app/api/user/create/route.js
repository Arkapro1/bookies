import connect from "@/utils/database";
import Users from "@/models/user";
import { NextResponse } from "next/server";

export const POST=async(request)=>{
    const body=await request.json(); 
    const newUser=new Users(body);
    console.log(newUser);
    try {
        await connect();
        await newUser.save();
       
        return new NextResponse("User Created",{status:200});
    } catch (error) {
        return new NextResponse(error.massage,{status:400});
    }
}