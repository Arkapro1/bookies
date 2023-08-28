import Folders from "@/models/folderModel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";
<<<<<<< HEAD
<<<<<<< HEAD
import  authOptions  from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
export const GET=async(req,res)=>{
    try {
        // const body=await request.json(); 
        // console.log(body)
        const session =await getServerSession(authOptions)
        
        await connect();
        const folders = await Folders.find({gmail:session?.user?.email});
=======

export const GET=async(request)=>{
    try {
        await connect();
        const folders = await Folders.find();
>>>>>>> parent of 8b57270 (Merge branch 'main' of https://github.com/Arkapro1/bookies)
=======

export const GET=async(request)=>{
    try {
        await connect();
        const folders = await Folders.find();
>>>>>>> parent of 8b57270 (Merge branch 'main' of https://github.com/Arkapro1/bookies)

     let filteredData=  folders.filter((ele)=>{
            return ele.isWorkSpace;
        })
        filteredData=filteredData==null?[]:filteredData;
        console.log(JSON.stringify(filteredData))
        return new NextResponse(JSON.stringify(filteredData),{status:200});
    } catch (error) {
        return new NextResponse("Error",{status:400});
    }
}

export const POST=async(request)=>{
    const body=await request.json(); 
    console.log(body)
    const newDoc=new Folders(body);
    // const newDoc=body;
    try {
        await connect();
        await newDoc.save();     
        // return new NextResponse(body);
        return new NextResponse("Folder created",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:400});
    }
}




