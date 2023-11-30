"use client"
import React, { useContext, useEffect } from 'react'
import TokensToTradeList from './TokensToTradeList'
import { appState } from '@/app/context/store'
import { getAllTokens, getListingArray } from '@/utils/functionCalling'

const page = () => {
  const {contract,allTokensData,setTradeTokenList}=useContext(appState)
  useEffect(() => {
    const getTradeTokens=async()=>{
      const alltradeTokens=await getListingArray(contract)
      const allTokensList=await getAllTokens(contract)
      console.log("allTradeToken--->",alltradeTokens)
      console.log("allTokensData--->",allTokensData)
      const filteredArray=alltradeTokens?.map((tradeToken)=>{
        const matchedToken = allTokensList?.find(allTokensSingleToken => allTokensSingleToken?.sellerAddress  === tradeToken?.seller);
        if(matchedToken){
          return { ...tradeToken, ...matchedToken };
        }
      })
      setTradeTokenList(filteredArray)
    }
    getTradeTokens()
    console.log("hello from trading page")
  }, [contract])
  return (
    <div className='p-8 w-full'>
      <TokensToTradeList/>
    </div>
  )
}

export default page