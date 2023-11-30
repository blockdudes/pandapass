"use client"
import React, { useContext, useEffect, useState } from 'react'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
import { TradeTokenDialog } from './TradeTokenDialog';
import { getAllTokens } from '@/utils/functionCalling';
import { appState } from '@/app/context/store';

const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];

const TABLE_HEAD = ["Owner", "Price", "Token Name",""];

  

const TokenCard = () => {
    const router=useRouter()
    const [openTradeDialog,setOpenTradeDialog]=useState(false)
    const [indexOfData,setIndexOfData]=useState(0)
    const {allTokensData}=useContext(appState)

    const handleRoute=(dataIndex)=>{
        router.push(`/en/logged/allTokens/${dataIndex}`)
    }
  console.log(allTokensData)
    
  return (
    <>
      <>
      <TradeTokenDialog openTradeDialog={openTradeDialog} setOpenTradeDialog={setOpenTradeDialog} dataToShow={allTokensData?.data ? allTokensData?.data[indexOfData] : [] }/>
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" className='text-gray-700'>
              List of Tokens
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              It is a list of all celebrity Tokens
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          
          {/* <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div> */}
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allTokensData?.data?.map(
              ({ tokenPrice,tokenName,sellerAddress, ownerData}, index) => {
                const isLast = index === allTokensData?.data?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 ";
 
                return (
                  <tr className='cursor-pointer' key={tokenName} onClick={()=>handleRoute(index)}>
                    <td className={classes} >
                      <div className="flex items-center gap-3">
                      <Avatar
                        src={ownerData?.photo}
                        alt={ownerData?.name}
                        size='md'
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tokenName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {/* {email} */}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {/* {parseInt(tokenInitialPrice?._hex, 16)/Math.pow(10,18)} eth */}
                        {/* {parseInt(tokenPrice?.hex,10)/Math.pow(10,18)} eth  */}
                        {Number(tokenPrice?.hex)/Math.pow(10,18)} KLAY
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {tokenName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {/* <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip> */}
                      <Button onClick={(e)=>{
                        e.stopPropagation()
                        setOpenTradeDialog(true)
                        setIndexOfData(index)
                        }}>Trade</Button>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        {/* <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div> */}
      </CardFooter>
    </Card>
      </>
    </>
  )
}

export default TokenCard