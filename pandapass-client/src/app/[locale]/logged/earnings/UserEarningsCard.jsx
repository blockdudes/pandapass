"use client"
import React, { useContext, useEffect, useState } from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
import { getRewardStatus, redeemRewards } from '@/utils/functionCalling';
import { appState } from '@/app/context/store';
import { ChangeRedeemAddressDialog } from './ChangeRedeemAddressDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserEarningsCard = () => {
  const [openRedeemDialog,setOpenRedeemDialog]=useState(false)
  const {contract,userEarnings,address}=useContext(appState)
  const [balance, setBalance] = useState(null)

  const handleRedeemAmount=async(contractInstance,redeemAddress,tokenAmount)=>{
    try {
      const transaction =await redeemRewards(contractInstance,redeemAddress,tokenAmount)
      const receipt = await transaction.wait();
        console.log(receipt)
        if (receipt.status) {
          toast.success('successfully registered!', {
            position:"bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });}
    } catch (error) {
      toast.error('Transaction Failed!', {
        position:"bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return error;
      
    }
    console.log(redeemAddress,tokenAmount)

  }

  const getRedeemAmount = async() => {
    const rewards = await getRewardStatus(contract,address)
    setBalance(rewards)
  };

  useEffect(() => {

    getRedeemAmount()
  },[address,contract])


  
  return (
    <div className='w-[80vh] h-[100vh]'>
    <ChangeRedeemAddressDialog openRedeemDialog={openRedeemDialog} setOpenRedeemDialog={setOpenRedeemDialog} handleRedeemAmount={handleRedeemAmount}/>
    <Card className=" bg-white flex items-center justify-center h-[30vh]">
        <div className="flex flex-col gap-8 p-6">

            <div className="flex gap-4 rounded-md">
                <p className="font-semibold text-gray-700">User Address:</p>
                <p className="font-medium text-gray-700">{address ? address : "..."}</p>
            </div>
            <div className="flex gap-4 rounded-md">
                <p className="font-semibold text-gray-700">Balance:</p>
                <p className="font-medium text-gray-700">{balance ? Number(balance)/1e18:  "..." } wei </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={()=>handleRedeemAmount(contract,address,1)} >Redeem Amount</Button>
              <Button onClick={()=>setOpenRedeemDialog(true)}>Change Redeem Address</Button>

            </div>
        </div>
      </Card>
    </div>
  )
}

export default UserEarningsCard