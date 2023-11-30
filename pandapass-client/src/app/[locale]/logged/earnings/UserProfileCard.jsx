"use client"
import React, { useContext } from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Avatar
  } from "@material-tailwind/react";
import { appState } from '@/app/context/store';
  const userImage=localStorage.getItem("user").photoURL || "https://source.unsplash.com/random";
  // const userName=JSON?.parse(localStorage.getItem("user")).displayName
const UserProfileCard = () => {
  const {address} = useContext(appState);
  return (
    <Card className="w-2/4">
        <CardBody className="flex items-center justify-center">
        <h2>User Address</h2>
          <Typography variant="h4"  color="blue-gray" className="mb-2 text-sm font-light">
          {address}
          </Typography>
        </CardBody>
       
      </Card>
  )
}

export default UserProfileCard