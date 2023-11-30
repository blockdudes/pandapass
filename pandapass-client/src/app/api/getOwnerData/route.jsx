import { NextResponse } from "next/server";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";

export const POST = async (request) => {
    try {
        const data = await request.json(); // data is an array of tokenAddresses
        const tokenAddreses = data.arrayofTokens.map(token => token.tokenAddress)
        const ownersCollection = collection(db, "owner");
        
       
        const ownersData = [];
        for (let tokenAddress of tokenAddreses) {
            console.log(tokenAddress)
            const ownerDoc = doc(ownersCollection, tokenAddress.toLowerCase());
            const ownerSnapshot = await getDoc(ownerDoc);
            if (!ownerSnapshot.exists()) {
                continue; // skip if no document found for the tokenAddress
            }
            ownersData.push({ tokenAddress: tokenAddress.toLowerCase(), data: ownerSnapshot.data() });
            
        }

        const completeData = data.arrayofTokens.map ((token)=> {
            const ownerData = ownersData.find(owner => owner.tokenAddress === token.tokenAddress.toLowerCase());
            return { ...token, ownerData: ownerData?.data };
            
        })
      
        return NextResponse.json({data: completeData}, { status: 200 });
    } catch (error) {
        console.log("error",error)
        return NextResponse.json({ error: `unable to get owner data ${error}` }, { status: 500 });
    }
}