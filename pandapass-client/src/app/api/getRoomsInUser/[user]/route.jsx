import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { NextResponse } from "next/server";
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../firebase.config';


const client = new ApolloClient({
    uri: 'https://klaytn-indexer.blockdudes.com/subgraphs/name/pandapass',
    cache: new InMemoryCache(),
});


const GET_ACCOUNT_INFO = gql`
  query User($id: String!) {
    user(id: $id) {
         id
         memberships {
             room {
                 id
             }
         }
     }
    }`;

export const POST = async (request, { params }) => {
    try {
        const { data } = await client.query({
            query: GET_ACCOUNT_INFO,
            variables: { id: params.user },
        });

        const userData = data.user;
        const userId = userData.id;
        const roomIds = userData.memberships.map((membership) => membership.room.id);

        
        
        for (let roomid of roomIds) {
            // Check if the document with roomid exists in the "Rooms" collection
            const roomDocRef = doc(db, 'Rooms', roomid);
            const roomDocSnapshot = await getDoc(roomDocRef);
        
            if (!roomDocSnapshot.exists()) {
                // Document does not exist, so set the document
                await setDoc(roomDocRef, {});
        
                // Initialize the "messages" collection with a document with key "id"
                const messageDocRef = doc(roomDocRef, 'messages', 'id');
                await setDoc(messageDocRef, {
                    message: 'Initial message', // Replace with your actual data
                });
            }
        }


        return NextResponse.json({ userId, roomIds }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: `No balance found ${error}` }, { status: 500 })
    }

}