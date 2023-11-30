"use client"
import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { appState } from "@/app/context/store";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleUp';
import { EnterPricePerTokenDialog } from "./EnterPricePerTokenDialog";
import { sellToken } from "@/utils/functionCalling";

 
export function UserAssetTradeDialog({openUserTradeDialog,setOpenUserTradeDialog,setOpenPriceDialog,dataToShow,setEnterPriceData}) {
  const [amountOfToken,setAmountOfToken]=useState(0)
  const {contract}=useContext(appState)
  console.log(dataToShow)
 
  const handleOpen = () => setOpenUserTradeDialog(!openUserTradeDialog);
  const handleSellToken=async()=>{
    const txn = await sellToken(contract,dataToShow?.sellerAddress,amountOfToken)
    const res = txn.wait()
  }

 
  return (
    <>
      <Dialog
        open={openUserTradeDialog}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        
        <DialogBody className="flex gap-4">
            <div className="flex flex-col items-center p-3  rounded-md">
         
            </div>
            <div className="flex flex-col gap-3  w-full p-3 rounded-md">
                <div className="flex gap-4 p-2 bg-gray-200 rounded-md">
                    <p className="font-semibold text-gray-700">Token Name:</p>
                    <p className="font-medium text-gray-700">{dataToShow?.tokenName || "sam"}</p>
                </div>
                <div className="flex gap-4 p-2 bg-gray-200 rounded-md">
                    <p className="font-semibold text-gray-700">Token Price:</p>
                    <p className=" text-gray-700">
                      {/* {parseInt(dataToShow?.currentTokenPrice?._hex, 16)/Math.pow(10,18)} */}
                      0.1 KLAY</p>
                </div>
            </div>
        </DialogBody>
        <DialogFooter className="gap-4 flex justify-center bg-gray-500/50 rounded-md">
        <div className="flex gap-3 items-center">
            <p className="text-sm font-semibold">Token amount to sell  </p>
            <div className="flex gap-2 items-center">
                <button className="" onClick={()=>setAmountOfToken((prev)=>prev===0?0:prev-1)}>
                    <ArrowCircleUpIcon className="rotate-180"/>
                </button>
                <p className="font-semibold">{amountOfToken}</p>
                <button className="" onClick={()=>setAmountOfToken((prev)=>prev+1)}>
                    <ArrowCircleDownIcon />
                </button>
            </div>
          </div>
        
          <Button onClick={()=>handleSellToken()}>Sell</Button>
          <Button onClick={()=>{
            setOpenPriceDialog(true)
            setOpenUserTradeDialog(false)
            setEnterPriceData(dataToShow)
            }}>List</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}