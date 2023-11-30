import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { NextResponse } from "next/server";
import { addRoomToUser } from "@/utils/functionCalling";


const client = new ApolloClient({
    uri: 'https://klaytn-indexer.blockdudes.com/subgraphs/name/pandapass',
    cache: new InMemoryCache(),
  });


  const GET_ACCOUNT_INFO = gql`
  query account($id: String!) {
    account(id: $id) {
      id
      balances {
        token
        amount
      }
    }
  }
`; 
export const POST = async (request,{params}) => {
    try {
        const { data } = await client.query({
            query: GET_ACCOUNT_INFO,
            variables: { id: params.user },
          });
          
        
    //    let response2 =  await verifyToken(params.tokenId);
    const accountData = data.account;

    const responseData = {
      userID: accountData.id,
      tokenData: accountData.balances.map(balance => ({
          token: balance.token,
          amount: balance.amount,
      })),
  };


       return NextResponse.json({data: responseData},{status : 200})
    } catch (error) {
       return NextResponse.json({error: `No balance found ${error}`},{status : 500})
    }
       
   }