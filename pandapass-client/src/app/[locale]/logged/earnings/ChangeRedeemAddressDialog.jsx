"use client"
import React, { useContext, useState } from "react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleUp';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { appState } from "@/app/context/store";

 
export function ChangeRedeemAddressDialog({openRedeemDialog,setOpenRedeemDialog,handleRedeemAmount}) {
  const {contract}=useContext(appState)
    const [redeemAddress,setRedeemAddress]=useState("")


  const handleOpen = () => setOpenRedeemDialog(!openRedeemDialog);
  
  
 
  return (
    <>
      <Dialog
        open={openRedeemDialog}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        
        <DialogBody className="flex gap-4 justify-center">
        <div className="flex items-center gap-3 p-4">
            <label htmlFor="pricePerToken" className="text-gray-800 text-sm w-[250px] font-semibold">Set Redeem Address</label>
            <Input label="Enter address you want to send rewards to" value={redeemAddress} onChange={(e)=>setRedeemAddress(e.target.value)}/>
          </div>
        </DialogBody>
        <DialogFooter className="gap-4 flex justify-center bg-gray-500/50 rounded-md">
        
          <Button onClick={()=>handleRedeemAmount(contract,redeemAddress,1)}>Redeem</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}