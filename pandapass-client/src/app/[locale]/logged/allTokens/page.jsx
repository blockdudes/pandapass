"use client"
import SearchBar from '@/app/components/SearchBar'
import React, { useContext, useEffect, useState } from 'react'
import AllTokensList from './AllTokensList'
import { getAllTokens } from '@/utils/functionCalling'
import { appState } from '@/app/context/store'
import { usePathname } from 'next/navigation'
import { setData } from '@/app/(serverRequest)/serverRequest'

const page = () => {
  const {contract,allTokensData,setAllTokensData}=useContext(appState)


  useEffect(() => {
    const getAllTokensData=async()=>{ 
      const res=await getAllTokens(contract)
      const arrayofTokens=res?.map((item)=>{
        return {
            tokenName:item.tokenName,
            tokenSymbol:item.tokenSymbol,
            sellerAddress:item.sellerAddress,
            tokenInitialPrice:item.tokenInitialPrice,
            tokenAddress:item.tokenAddress,
            tokenPrice: item.tokenPrice,
        }
      })

      if(arrayofTokens){
        
        const completeData =await setData("https://pandapass.blockdudes.com/api/getOwnerData",{arrayofTokens});
        setAllTokensData(completeData);
        localStorage.setItem("allTokens",JSON.stringify(completeData?.data))
      }

    
    }
    getAllTokensData()
  }, [contract,allTokensData?.data?.length])

  console.log(allTokensData?.data?.length)

  
  return (
    <div className='p-4 w-full'>
      {/* <SearchBar/> */}
      { 
        <AllTokensList/>
      }
    </div>
  )
}

export default page