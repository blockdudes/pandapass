"use client"
import Sidebar from "@/app/components/Sidebar"
import { appState } from "@/app/context/store"
import { useContext, useEffect } from "react"

const LoggedLayout = ({children}) => {

  const {loginStatus, setLoginStatus} = useContext(appState)
  useEffect(() => {
    const status = localStorage.getItem('status')
    if (!status) {
      setLoginStatus(false)
    }else{
      setLoginStatus(true)
    }
  })


  return (
  
    <div className='flex flex-row bg-gray-200/50'>
      {
        loginStatus ? 
        <>  <Sidebar/>
        {children}
        </>
        :
        <>
        <div className='flex flex-col justify-center items-center w-full h-screen'>
          <h1 className='text-3xl font-bold'>Please Connect your wallet to Continue</h1>
          </div>
        </>
      }
    </div>
  )
}

export default LoggedLayout