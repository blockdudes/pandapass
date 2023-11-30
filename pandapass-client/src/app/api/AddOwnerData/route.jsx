import { NextResponse } from "next/server";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase.config";


export const POST = async (request) => {
    try {
        //  address, tokenAddress,
        const {data} = await request.json();

        const response = await setDoc(doc(db, "owner", data.tokenAddress),{owner: data.address, name: data.name, photo:data.photo});

        return NextResponse.json({ data: response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: `unable to save owner ${error}` }, { status: 500 })
    }

}

// "address": "abc"
