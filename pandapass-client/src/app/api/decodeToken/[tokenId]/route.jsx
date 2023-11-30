import { NextResponse } from "next/server";
import { verifyToken } from "../../../../../firebase.admin.config";

export const POST = async (request, {params}) => {
 try {
    console.log("enter")
    console.log(params.tokenId)
    let response =  await verifyToken(params.tokenId);
    console.log(response)
    return NextResponse.json({data: response},{status : 200})
 } catch (error) {
    return NextResponse.json({error: error},{status : 500})
 }
    
}