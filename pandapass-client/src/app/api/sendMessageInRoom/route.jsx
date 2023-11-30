import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { NextResponse } from "next/server";
import { handleRoom } from '@/utils/functionCalling';
import { setData } from '@/app/(serverRequest)/serverRequest';


const client = new ApolloClient({
    uri: 'https://klaytn-indexer.blockdudes.com/subgraphs/name/pandapass',
    cache: new InMemoryCache(),
});


const GET_ACCOUNT_INFO = gql`
  query Room($id: String!) {
    room(id: $id) {
        id
        memberships {
            user {
                id
            }
        } 
    }
    }`;


    // verification before send message

export const POST = async (request) => {
    try {
        const {data} = await request.json()
        console.log(data)

        const response = handleRoom(data.tokenAddress, data.userID, data.message);
      

        // const roomData = data.room;
        // const roomId = roomData.id;
        // const userIds = roomData.memberships.map((membership) => membership.user.id);

        return NextResponse.json({ data: data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: `No balance found ${error}` }, { status: 500 })
    }

}
