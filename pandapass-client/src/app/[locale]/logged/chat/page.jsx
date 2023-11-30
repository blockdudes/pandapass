"use client"
import React, { useContext, useEffect, useState } from 'react'
import ChatUi from './ChatUi'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { getData, setData } from '@/app/(serverRequest)/serverRequest'
import { appState } from '@/app/context/store'


const page = () => {
  const {address, contract,setUserChatData} = useContext(appState);
  

  const fetchUserChatData = async() => {
    
    const userData = await setData('http://localhost:3004/api/getUserDetails')
    // setUserChatData(userData)
  }
  useEffect(() => {
    if(address){
      fetchUserChatData();
    }
    
  },[contract, address])

  // useEffect(() => {

  // },[])
  return (
    <div className='w-full '>
      <ChatUi/>
    </div>
    
  )
}

export default page



// "use client"
// import React, { useEffect, useState } from 'react'
// import ChatUi from './ChatUi'
// import { ChatForm } from './ChatForm'
// import { Button } from '@material-tailwind/react'
// import { useRouter } from 'next/navigation'

// const page = () => {

//   const [openChatForm, setOpenChatForm] = useState(false)
//   let isSubmitted;
//   useEffect(() => {
//     if (typeof localStorage !== 'undefined') {
//       isSubmitted = localStorage.getItem("isUserDetailsSubmitted")
//     }
//     if (!isSubmitted) {
//       setOpenChatForm(true)
//     }
//   }, [])
//   return (
//     <div className='w-full'>
//       <ChatForm openChatForm={openChatForm} setOpenChatForm={setOpenChatForm} />
//       {isSubmitted
//         ? <ChatUi /> : (
//           <>
//             Submit user data
//             <Button onClick={() => setOpenChatForm(true)}>Submit details</Button>
//           </>
//         )}
//     </div>

//   )
// }

// export default page