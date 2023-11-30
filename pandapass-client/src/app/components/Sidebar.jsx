"use client"
import React from 'react'
import Link from 'next/link';

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
  import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
  import TollIcon from '@mui/icons-material/Toll';
  import ChatIcon from '@mui/icons-material/Chat';
  import PaidIcon from '@mui/icons-material/Paid';
  import PaymentsIcon from '@mui/icons-material/Payments';

const Sidebar = () => {
  return (
    <div className='basis-1/5 min-h-screen bg-white border-r-2 border-gray-300'>
            

            {/* lower div  */}
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <Link href="/en/logged/allTokens">
            <ListItem>
            <ListItemPrefix>
                <TokenOutlinedIcon className="h-5 w-5" />
            </ListItemPrefix>
            All Tokens
            </ListItem>
        </Link>
        <Link href="/en/logged/userAssets">
            <ListItem>
            <ListItemPrefix>
                <TollIcon className="h-5 w-5" />
            </ListItemPrefix>
            User Assets
            </ListItem>
        </Link>
        <Link href="/en/logged/chat">
            <ListItem>
            <ListItemPrefix>
                <ChatIcon className="h-5 w-5" />
            </ListItemPrefix>
            Chats
            {/* <ListItemSuffix>
                <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix> */}
            </ListItem>
        </Link>
        <Link href={"/en/logged/trading"}>
            <ListItem>
            <ListItemPrefix>
                <PaidIcon className="h-5 w-5" />
            </ListItemPrefix>
            Trading
            </ListItem>
        </Link>
        <Link href={"/en/logged/earnings"}>
          <ListItem>
            <ListItemPrefix>
              <PaymentsIcon className="h-5 w-5" />
            </ListItemPrefix>
            Earnings
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
        </div>
  )
}

export default Sidebar