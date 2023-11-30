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
import { ListToken } from "@/utils/functionCalling";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function EnterPricePerTokenDialog({ openPriceDialog, setOpenPriceDialog, setPricePerToken, pricePerToken, dataToShow }) {
  const { tradeTokenList, setTradeTokenList, contract } = useContext(appState)
  const [amountOfToken, setAmountOfToken] = useState(0)

  const handleOpen = () => setOpenPriceDialog(!openPriceDialog);

  console.log("enterPrice--<", dataToShow)

  const handleTradeList = async () => {
    try {
      const transaction = await ListToken(contract, dataToShow?.tokenAddress, amountOfToken, pricePerToken * Math.pow(10, 18))
      const receipt = await transaction.wait();
      if (receipt.status) {
        toast.success('successfully Listed!', {
          position:"bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
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
    }

    // const isDuplicate=tradeTokenList?.some((item)=>item.img===dataToShow.img)
    // console.log(isDuplicate)

    // if(!isDuplicate){
    //   // setTradeTokenList((prev)=>[...prev,{...dataToShow,pricePerToken:pricePerToken * Math.pow(10,18),tokenForSale:amountOfToken}])
    // }
    setOpenPriceDialog(false)
  }

  return (
    <>
      <Dialog
        open={openPriceDialog}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >

        <DialogBody className="flex gap-4 justify-center">
          <div className="flex items-center gap-3 p-4">
            <label htmlFor="pricePerToken" className="text-gray-800 text-sm w-[150px] font-semibold">Set Price/token</label>
            <Input label="Enter price per token here..." value={pricePerToken} onChange={(e) => setPricePerToken(e.target.value)} />
          </div>
        </DialogBody>
        <DialogFooter className="gap-4 flex justify-center bg-gray-500/50 rounded-md">
          <div className="flex gap-3 items-center">
            <p className="text-sm font-semibold">Amount of Token </p>
            <div className="flex gap-2 items-center">
              <button className="" onClick={() => setAmountOfToken((prev) => prev === 0 ? 0 : prev - 1)}>
                <ArrowCircleUpIcon className="rotate-180" />
              </button>
              <p className="font-semibold">{amountOfToken}</p>
              <button className="" onClick={() => setAmountOfToken((prev) => prev + 1)}>
                <ArrowCircleDownIcon />
              </button>
            </div>
          </div>
          <Button disabled={amountOfToken === 0} onClick={() => handleTradeList()}>List Token</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}