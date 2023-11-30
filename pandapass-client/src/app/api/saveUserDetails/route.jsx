import { NextResponse } from "next/server";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase.config";


export const POST = async (request) => {
    try {
        // address, name, photo
        const {data} = await request.json();
        console.log(data)
        const response = await setDoc(doc(db, "users", data.address),{
            name: data.name,
            photoUrl: data.photoUrl
        });
        return NextResponse.json({ data: response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: `unable to save user data ${error}` }, { status: 500 })
    }

}







