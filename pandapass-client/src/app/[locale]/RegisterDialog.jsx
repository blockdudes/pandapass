import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { registerToken } from "@/utils/functionCalling";
import { appState } from "../context/store";
 
export function RegisterDialog({openRegister,setOpenRegister}) {
    const {contract}=useContext(appState)
    const [registerTokenData,setRegisterTokendata]=useState({
        tokenName:"",
        tokenSymbol:""
    })
  const handleOpen = () => setOpenRegister(!openRegister);
  console.log(registerTokenData)

  const handleRegisterToken=async()=>{
    const txn=await registerToken(contract,registerTokenData.tokenName,registerTokenData.tokenSymbol)
    console.log(txn)

  }
 
  return (
    <>
      <Dialog
        size="xs"
        open={openRegister}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Register Token
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your token name and token symbol to register your token.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Token Name
            </Typography>
            <Input label="Enter your Token Name" value={registerTokenData.tokenName} size="lg" onChange={(e)=>setRegisterTokendata({...registerTokenData,tokenName:e.target.value})} />
            <Typography className="-mb-2" variant="h6">
              Your Token Symbol
            </Typography>
            <Input label="token symbol" value={registerTokenData.tokenSymbol} onChange={(e)=>setRegisterTokendata({...registerTokenData,tokenSymbol:e.target.value})} size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={()=>handleRegisterToken()} fullWidth>
              Register
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}