"use client"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";

  const userImage=""
    const userName=""
   
  export function ProfileCard({dataToShow}) {
    console.log("dataToShow",dataToShow)
    
    return (
      <Card className="w-2/5 flex flex-col">
        <CardBody className="text-center flex flex-col gap-4 items-center justify-center">
          <img  src={dataToShow?.ownerData?.photo} className=" rounded-full w-[15vh]" alt="profile-picture" />
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {dataToShow?.tokenName}
          </Typography>
        </CardBody>
       
      </Card>
    );
  }