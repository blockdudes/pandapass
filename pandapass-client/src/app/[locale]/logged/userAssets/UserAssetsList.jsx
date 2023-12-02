"use client"
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { UserAssetTradeDialog } from "./UserAssetTradeDialog";
import { useContext, useEffect, useState } from "react";
import { getUserTokens } from "@/utils/functionCalling";
import { appState } from "@/app/context/store";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleUp';
import { EnterPricePerTokenDialog } from "./EnterPricePerTokenDialog";
import { setData } from "@/app/(serverRequest)/serverRequest";

const TABLE_HEAD = ["Token Name", "Price", "Token Amount", ""];

const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    tokenName: "dsfkjhfdshk",
    price: "2,500",
    status: "paid",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
    tokenName: "kjfdhfg",
    price: "$5,000",
    status: "paid",

  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
    tokenName: "dfjest",
    price: "3,400",
    status: "pending",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
    tokenName: "fsdhg",
    price: "3000",
    status: "paid",

  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
    tokenName: "dahgs",
    price: "2000",
    status: "cancelled",
  },
];

const UserAssetsList = () => {
  const { sign, contract, address } = useContext(appState)
  const [openUserTradeDialog, setOpenUserTradeDialog] = useState(false)
  const [indexOfData, setIndexOfData] = useState(0)
  const [UserAssetsListData, setUserAssetsListData] = useState([])
  const [openPriceDialog, setOpenPriceDialog] = useState(false)
  const [pricePerToken, setPricePerToken] = useState(0)
  const [enterPriceData, setEnterPriceData] = useState({})

  useEffect(() => {

    const getData = async () => {
      const data = await setData(`https://pandapass.blockdudes.com/api/userOwnedTokens/${address}`);
      const allTokensData = JSON.parse(localStorage.getItem("allTokens"));
      
      console.log(allTokensData, data)
      const filterTokenList = allTokensData?.map(token => {
        const matchingUserToken = data?.data?.tokenData?.find(userToken => userToken?.token.toLowerCase() === token?.tokenAddress.toLowerCase());
        if (matchingUserToken) {
          return { ...token, ...matchingUserToken };
          // Create a new object with combined properties
        } 
      });
      console.log(filterTokenList)
      setUserAssetsListData(filterTokenList)
    }
    getData()

    // const getUserTokenData=async()=>{
    //   const data=await getUserTokens(contract,address)

    //   // const filterTokenList=allTokensData.filter(token=>{
    //   //   return data.some(userToken=>userToken.sellerAddress===token.sellerAddress)
    //   // })

      // const filterTokenList = allTokensData?.map(token => {
      //   const matchingUserToken = data?.find(userToken => userToken?.sellerAddress === token?.sellerAddress);
      //   if (matchingUserToken) {
      //     // Create a new object with combined properties
      //     return { ...token, ...matchingUserToken };
      //   } else {
      //     return token;
      //   }
      // });
    //   const userAssetData=filterTokenList?.filter(item=>item.tokenAmount>0)
    //   console.log(userAssetData)
    //   setUserAssetsListData(userAssetData)

    // }
    // getUserTokenData()
  }, [contract])

  // },[contract,allTokensData])

  console.log("heloo-->",UserAssetsListData)

  return (
    <>
      {
        (
          <>
            <EnterPricePerTokenDialog openPriceDialog={openPriceDialog} setOpenPriceDialog={setOpenPriceDialog} setPricePerToken={setPricePerToken} pricePerToken={pricePerToken} dataToShow={UserAssetsListData ? enterPriceData : {}} />

            <UserAssetTradeDialog openUserTradeDialog={openUserTradeDialog} setOpenUserTradeDialog={setOpenUserTradeDialog} setOpenPriceDialog={setOpenPriceDialog} dataToShow={UserAssetsListData ? UserAssetsListData[indexOfData]: []} setEnterPriceData={setEnterPriceData} />
            <Card className="h-full w-full">
              <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div>
                    <Typography variant="h5" color="blue-gray" className="text-gray-700">
                      User Assets
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                      These are the list of tokens owned by the user
                    </Typography>
                  </div>
                  <div className="flex w-full shrink-0 gap-2 md:w-max">
                    {/* <div className="w-full md:w-72">
                      <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                      />
                    </div> */}
                    {/* <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button> */}
                  </div>
                </div>
              </CardHeader>
              <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
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
                    {UserAssetsListData?.map(
                      (
                        data,
                        index,
                      ) => {
                        if (!data) return <></>
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={data.tokenName}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <Avatar src={data.ownerData?.photo} size="md" className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"/>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {data.tokenName}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                
                                {Number(data.tokenPrice?.hex)/1e18} KLAY
                              </Typography>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {/* {parseInt(tokenAmount?._hex, 16)} */}
                                  {data.amount}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Button onClick={() => {
                                setIndexOfData(index)
                                setOpenUserTradeDialog(true)
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
                {/* <Button variant="outlined" size="sm">
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  <IconButton variant="outlined" size="sm">
                    1
                  </IconButton>
                  <IconButton variant="text" size="sm">
                    2
                  </IconButton>
                  <IconButton variant="text" size="sm">
                    3
                  </IconButton>
                  <IconButton variant="text" size="sm">
                    ...
                  </IconButton>
                  <IconButton variant="text" size="sm">
                    8
                  </IconButton>
                  <IconButton variant="text" size="sm">
                    9
                  </IconButton>
                  <IconButton variant="text" size="sm">
                    10
                  </IconButton>
                </div>
                <Button variant="outlined" size="sm">
                  Next
                </Button> */}
              </CardFooter>
            </Card>

          </>
        )
      }

    </>
  );
}

export default UserAssetsList