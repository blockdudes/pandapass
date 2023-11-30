import React from 'react'
import UserAssetsList from './UserAssetsList'

const page = () => {
  return (
    <div className='p-8 w-full'>
      {/* <h1 className='font-semibold text-gray-700 text-2xl'>User Assets</h1> */}
      <UserAssetsList/>
    </div>
  )
}

export default page