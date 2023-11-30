"use client"
import { useParams } from 'next/navigation'
import React,{useContext} from 'react'
import { ProfileCard } from './ProfileCard'
import { ProfileDataCard } from './ProfileDataCard'
import { appState } from '@/app/context/store'


const page = () => {
  const allTokensData=JSON.parse(localStorage.getItem("allTokens"))
    const {usertoken}=useParams()

  return (
    <div className='flex gap-4 w-full  max-h-[300px] p-8'>
        <ProfileCard dataToShow={allTokensData[usertoken] || []}/>
        <ProfileDataCard dataToShow={allTokensData[usertoken] || []}/>      
    </div>
  )
}

export default page