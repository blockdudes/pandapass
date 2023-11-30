"use client"
import React, { useContext, useEffect, useState } from 'react'
// import UserProfileCard from './UserProfileCard'
import UserEarningsCard from './UserEarningsCard'
import {  redeemRewards } from '@/utils/functionCalling'
import { appState } from '@/app/context/store'

const page = () => {
  const {contract,allTokensData,setUserEarnings,address}=useContext(appState)
  
  // useEffect(()=>{
  //   const getUserEarnings=async()=>{
  //     const amount = 1;
  //     const res=await redeemRewards(contract,address, amount)
  //     setUserEarnings(res)
  //   }
  //   getUserEarnings()
  // },[contract,allTokensData])
  return (
    <div className='flex gap-4 w-full  max-h-[500px] p-8'>
        {/* <UserProfileCard/>  */}
        <UserEarningsCard/>     
    </div>
  )
}

export default page