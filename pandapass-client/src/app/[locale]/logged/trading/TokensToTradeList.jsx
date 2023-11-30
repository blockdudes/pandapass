"use client"
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
  Tooltip,
} from "@material-tailwind/react";
import { TradingDialog } from "./TradingDialog";
import { useContext, useEffect, useState } from "react";
import { appState } from "@/app/context/store";
import { getListingArray, removeListingAndRefund } from "@/utils/functionCalling";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const TABLE_HEAD = ["Token Name", "price/token", "token for sale", "Status", ""];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    tokenName: "uweruywe",
    price: "3000"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    tokenName: "uweruywe",
    price: "3000"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    tokenName: "uweruywe",
    price: "3000"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    tokenName: "uweruywe",
    price: "3000"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    tokenName: "uweruywe",
    price: "3000"
  },
];

const TokensToTradeList = () => {
  const [openTradingDialog, setOpenTradingDialog] = useState(false)
  const [indexOfData, setIndexOfData] = useState(0)
  const [loading, setLoading] = useState(false)
  const { tradeTokenList, setTradeTokenList, contract, allTokensData, indexOfTradingData, indexOfTrading, setIndexOfTrading } = useContext(appState)

  const handleRemoveFromList = async (tokenName) => {
    try {
      const transaction = await removeListingAndRefund(contract, indexOfData)
      const receipt = await transaction.wait();
      if (receipt.status) {
        toast.success(' Listing successfully removed!', {
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
      toast.success('Transaction Failed!', {
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

  }

  console.log(indexOfData)

  console.log("tradeTokens-->", tradeTokenList)
  return (
    <>
      <TradingDialog openTradingDialog={openTradingDialog} setOpenTradingDialog={setOpenTradingDialog} dataToShow={tradeTokenList ? tradeTokenList[indexOfData] : {}} />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" className="text-gray-700">
                Trade Tokens
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                It contains the list of tokens that anyone can trade
              </Typography>
            </div>
            {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div> */}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs> */}
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
              {tradeTokenList?.map(
                ({ tokenName, pricePerToken, tokenAmount, sold }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">

                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {tokenName}
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
                          {parseFloat(parseInt(pricePerToken?._hex, 16))} wei
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {parseFloat(parseInt(tokenAmount?._hex, 16))}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {sold ? "SOLD" : "UNSOLD"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex gap-4">
                          <Button onClick={() => {
                            setOpenTradingDialog(true)
                            setIndexOfTrading(index)
                          }}>Buy</Button>
                          {!sold && (
                            <Button onClick={() => handleRemoveFromList(tokenName)}>Remove</Button>

                          )}
                        </div>
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
  );
}
export default TokensToTradeList