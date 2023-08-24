import { NextResponse } from "next/server";

export const GET=async(request)=>{
    return new NextResponse("Testing",{status:200});
}