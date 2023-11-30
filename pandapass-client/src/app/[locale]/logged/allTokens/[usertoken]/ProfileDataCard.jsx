import { appState } from "@/app/context/store";
import { buyTokens, sellToken,purchaseToken } from "@/utils/functionCalling";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleUp';
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export function ProfileDataCard({dataToShow}) {
  const indexOfDataToShow = useSearchParams().get('dataIndex')
  const { allTokensData, contract } = useContext(appState)
  const [amountOfToken, setAmountOfToken] = useState(0)
  console.log(dataToShow)

  useEffect(() => {
    if (allTokensData && indexOfDataToShow !== null) {
      setDatatoShow(allTokensData[indexOfDataToShow]);
    }

  }, [allTokensData, indexOfDataToShow])


  const handleBuyToken = async () => {
    
    const txnRes = await purchaseToken(contract, dataToShow?.sellerAddress, amountOfToken)
  }

  const handleSellToken = async () => {
    const txnRes = await sellToken(contract, dataToShow?.sellerAddress, amountOfToken)
    console.log(txnRes)
  }

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-3 p-3">
        <div className="flex gap-4 p-2 rounded-md">
          <p className="font-semibold text-gray-700">Token Name:</p>
          <p className="font-medium text-gray-700">{dataToShow?.tokenName}</p>
        </div>
        <div className="flex gap-4 p-2 rounded-md">
          <p className="font-semibold text-gray-700">Token Price:</p>
          <p className=" text-gray-700">{Number(dataToShow?.tokenPrice.hex)/1e18 || "nan"} KLAY</p>
        </div>
        <div className="flex gap-3">

          <div className="flex gap-3 items-center p-2">
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

          <Button disabled={amountOfToken === 0} onClick={() => handleBuyToken()}>Buy</Button>
          <Button disabled={amountOfToken === 0} onClick={() => handleSellToken()}>Sell</Button>

        </div>
      </div>
    </Card>
  );
}