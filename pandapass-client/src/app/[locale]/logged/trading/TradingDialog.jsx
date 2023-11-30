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
} from "@material-tailwind/react";
import { buyResellTokens } from "@/utils/functionCalling";
import { appState } from "@/app/context/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function TradingDialog({ openTradingDialog, setOpenTradingDialog, dataToShow, indexofData }) {
  const [amountOfToken, setAmountOfToken] = useState(0)
  const [loading, setLoading] = useState(false)
  const { contract, indexOfTrading } = useContext(appState)
  console.log(indexofData)
  const handleOpen = () => setOpenTradingDialog(!openTradingDialog);
  const handleBuyToken = async () => {
    try {
      setLoading(true)
      const transaction = await buyResellTokens(contract, indexOfTrading, amountOfToken, parseInt(dataToShow?.pricePerToken, 10));
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
        });
      }
    } catch (error) {
      toast.error('transaction Failed', {
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
    setLoading(false)
  }
  return (
    <>
      <Dialog
        open={openTradingDialog}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >

        <DialogBody className="flex gap-4">
          <div className="flex flex-col w-1/2 items-center p-3  rounded-md text-center">
            <img className="rounded-full object-cover w-[10vh] h-[10vh]" src={dataToShow?.img} alt="token-img" />
            <p className="text-sm font-medium text-gray-800">{dataToShow?.name}</p>
            <p className="text-xs text-gray-800">{dataToShow?.email}</p>
          </div>
          <div className="flex flex-col gap-3  w-full p-3 rounded-md">
            <div className="flex gap-4 p-2 bg-gray-200 rounded-md">
              <p className="font-semibold text-gray-700">Token Name:</p>
              <p className="font-medium text-gray-700">{dataToShow?.tokenName}</p>
            </div>
            <div className="flex gap-4 p-2 bg-gray-200 rounded-md">
              <p className="font-semibold text-gray-700">price/token:</p>
              <p className=" text-gray-700">{parseInt(dataToShow?.pricePerToken, 10)} wei</p>
            </div>
            <div className="flex gap-4 p-2 bg-gray-200 rounded-md">
              <p className="font-semibold text-gray-700">tokens for sale:</p>
              <p className=" text-gray-700">{parseInt(dataToShow?.tokenAmount, 10)}</p>
            </div>
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
          <Button disabled={amountOfToken === 0}
            onClick={() => handleBuyToken()}

          >Buy</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}