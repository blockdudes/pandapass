"use client";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { appState } from "../context/store";
import { setData } from "../(serverRequest)/serverRequest";
import { Payment } from "../components/Payment";
import { getTokenAddr, getAllTokens, buyTokens, getUserTokens, sellToken, redeemRewards, removeListingAndRefund, listTokenForSale, signIn, signOut, getTokenId, getUserData, addUser, addRoomToUser, registerToken, handleRoom, getUserFirebaseData, purchaseToken, getListingArray, checkSignExpired } from "@/utils/functionCalling";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@material-tailwind/react";
import { redirect } from "next/navigation";

const hexNumberFromContract = "0x0a"; // replace this with the actual hex number from your smart contract
const decimalNumber = parseInt(hexNumberFromContract, 16);
console.log(decimalNumber)

export default function Home() {
  const { address, sign, getTokenAddress, contract, setChats, chats, provider } = useContext(appState);
  const [userData, setUserData] = useState()
  const [res, setRes] = useState()
  const [openRegister, setOpenRegister] = useState(false)
  // const t = useTranslations("Index");

  useEffect(() => {
      redirect("/en/logged")
  },[])
  // const handleClick = async () => {
  //   try {
  //     const data = await signIn();
  //     try {
  //       const transaction = await registerToken(contract, data.displayName, data.displayName.substring(0, 3));
  //       const receipt = await transaction.wait();
  //       console.log(receipt)
  //       if (receipt.status) {
  //         toast.success('successfully registered!', {
  //           position:"bottom-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         const result = {
  //           address: address,
  //           name: data.displayName,
  //           photo: data.photoURL,
  //           tokenAddress: receipt.events[0].args.tokenAddress.toLowerCase(),
  //         }
  //         const addOwner = setData(`https://pandapass.blockdudes.com/api/AddOwnerData`, { data: result })
        
  //         localStorage.setItem("user", JSON.stringify({
  //           email: data.email,
  //           displayName: data.displayName,
  //           photoURL: data.photoURL
  //         }));
  //       }

  //     } catch (error) {
  //       console.log("unable to register token", error)
  //       toast.error(` Registration Failed!!!`, {
  //         position:"bottom-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         });
  //       return error;
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const handleGetTokenId = async () => {
  //   try {
  //     const result = await getTokenId();
  //     if (result) {
  //       const response = await setData(`https://pandapass.blockdudes.com/api/decodeToken/${result}`)
  //       console.log("enter response", response)
  //     }
  //     setRes(result)
  //   } catch (error) {
  //     console.log(error)
  //     return error
  //   }
  // }


  // const handleUpdateChats = async () => {
  //   try {
  //     console.log("first")
  //     // '0xc11c70b789a3c56dd09631593089b0d1d30c2166'
  //     const response = await setData(`https://pandapass.blockdudes.com/api/checkUserChatStatus/${address}`)
  //   }
  //   catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }

  // const handleAddUser = async () => {

  // }





  return (
    // <main className="flex min-h-screen w-[100vw] flex-col items-center justify-between p-24">
    //   <div className="flex flex-col items-center justify-center border-2 border-black w-full p-4">






    //     <p>{t("title")}</p>
    //     <p>{address}</p>
    //     <p>{sign}</p>
    //     <button className="bg-black p-2 text-white mb-5" onClick={handleClick}> Login</button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={signOut}> signout</button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={handleGetTokenId}> getTokenId</button>

    //     {/* after register make room named register */}
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => addUser(address, "name", "photoUrl", "token_address")}> Add user </button>


    //     {/* it holds message records */}
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => handleRoom("celebrity_uid", "userID", "name", "message")}> Message </button>

    //     {/* get user data */}
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => getUserFirebaseData(address)}> Get User Data </button>

    //     <button className="bg-black p-2 text-white mb-5" onClick={() => getTokenAddr(contract, "0x20c9192b145ca6d6274704b244614f356361db59")}> get token Address</button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => getTokenAddr(contract, "0x20c9192b145ca6d6274704b244614f356361db59")}> Give token from celebrity </button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => buyResellTokens(contract, "0x20c9192b145ca6d6274704b244614f356361db59", 1)}> Buy Resell Tokens</button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => getAllTokens(contract)}> Get all tokens </button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => purchaseToken(contract, "0x78777B174f4591330c354732935094250167C2AF", 1)}> purchaseToken </button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => getUserTokens(contract, "0x78777b174f4591330c354732935094250167c2af")}> getUsersTokens </button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => sellToken(contract, "0x78777b174f4591330c354732935094250167c2af", 1)}> Sell </button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => listTokenForSale(contract, "tokenAddr", 1, 1)}> listTokenForSale </button>  {/* contract, tokenAddress, tokenAmount, pricePerToken */}
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => removeListingAndRefund(contract, 0)}> remove listing </button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => redeemRewards(contract, "0x0000000000000000000000000000000000000000", 1)}> Reward </button> {/* reciever address if want to send to another */}
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => getListingArray(contract)}> Get Listing array </button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => handleUpdateChats()}> Update Chats</button>
    //     <button className="bg-black p-2 text-white mb-5" onClick={() => checkSignExpired()}> check sign</button>



    //     {/* celebrity_id == roomId */}

    //     <Payment />
    //     <p>{userData}</p>
    //     {/* <p style={{wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%'}}>{res}</p> */}
    //     <p className="break-words overflow-auto max-w-full">{res}</p>
    //   </div>
      // <ToastContainer
      //   position="bottom-right"
      //   autoClose={5000}
      //   hideProgressBar={false}
      //   newestOnTop={false}
      //   closeOnClick
      //   rtl={false}
      //   pauseOnFocusLoss
      //   draggable
      //   pauseOnHover
      //   theme="light"
      // />
      // {/* Same as */}
      // <ToastContainer />
    // </main>
//     <main className="flex min-h-screen w-[100vw] flex-col items-center justify-between px-16 py-8">
//       {/* <RegisterDialog openRegister={openRegister} setOpenRegister={setOpenRegister}/> */}
//     <div className="flex flex-col items-center justify-center  w-full p-4">
//       <div className="flex flex-col items-center gap-6">
//         {/* pandapass logo */}
//         <div className=" flex flex-col items-center gap-6">
//           {/* <p className="text-sm text-center italic font-semibold">lets connect with you friends</p> */}
//           <img width={400} height={400} className="rounded-full" src="https://as1.ftcdn.net/v2/jpg/02/28/19/82/1000_F_228198251_U0WuKNEW6STzIMfQIQ5TRFxbiGp50UmK.jpg" alt="" />
//           <h1 className="text-6xl font-bold w-[600px]  text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent ">Lets Connect with your favorite person</h1>
//         </div>

//         <div>
//           <Button onClick={handleClick}>Register your token</Button>
//         </div>
//       </div>   
//     </div>
//     <ToastContainer
//         position="bottom-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       {/* Same as */}
//       <ToastContainer />
// </main>
<></>
  )
}




