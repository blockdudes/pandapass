import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { NextResponse } from "next/server";


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

export const POST = async (request, { params }) => {
    try {
        const { data } = await client.query({
            query: GET_ACCOUNT_INFO,
            variables: { id: params.room },
        });

        const roomData = data.room;
        const roomId = roomData.id;
        const userIds = roomData.memberships.map((membership) => membership.user.id);

        return NextResponse.json({ roomId, userIds }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: `No balance found ${error}` }, { status: 500 })
    }

}
