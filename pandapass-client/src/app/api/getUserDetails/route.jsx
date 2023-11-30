import { NextResponse } from "next/server";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../../../firebase.config";




export const POST = async (request) => {
    try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));

        return NextResponse.json(usersData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `unable to get user data ${error}` }, { status: 500 });
    }
}