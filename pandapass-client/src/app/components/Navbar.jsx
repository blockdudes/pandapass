//navbar
"use client"
import { useTranslations } from 'next-intl'
import ConnectWallet from './ConnectWallet'
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip, Alert, Button } from '@material-tailwind/react';
import { useContext, useEffect, useState } from 'react'
import { appState } from '../context/store'
import { registerToken, signIn } from '@/utils/functionCalling';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setData } from '../(serverRequest)/serverRequest';

const Navbar = () => {
  // const t = useTranslations("Index")
  const router = useRouter();
  const { disconnectWallet, connected, address, setStatus, contract } = useContext(appState);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(true);
  const [register, setRegistered] = useState(false);
  const handleDisconnect = () => {
    localStorage.clear();
    setLoader(true);
    setTimeout(() => {
      disconnectWallet();
      setLoader(false);
      router.push("/en/logged");
    }, 2000);
  }
  const handleClick = async () => {
    try {
      const data = await signIn();
      console.log(data)
      try {
        const transaction = await registerToken(contract, data.displayName, data.displayName.substring(0, 3), data.email);
        toast('Transacting ....!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const receipt = await transaction.wait();
        if (receipt.status) {
          toast.success('successfully registered!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          const result = {
            address: address,
            name: data.displayName,
            photo: data.photoURL,
            tokenAddress: receipt.events[0].args.tokenAddress.toLowerCase(),
          }
          const addOwner = setData(`https://pandapass.blockdudes.com/api/AddOwnerData`, { data: result })
          // setUserData(JSON.stringify({
          //   email: data.email,
          //   displayName: data.displayName,
          //   photoURL: data.photoURL
          // }))
          localStorage.setItem("user", JSON.stringify({
            email: data.email,
            displayName: data.displayName,
            photoURL: data.photoURL
          }));
        }

      } catch (error) {
        console.log("unable to register token", error)
        toast.error(` Registration Failed!!!`, {
          position: "bottom-right",
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

    } catch (error) {
      console.log(error);
    }
  }
console.log(register)
  useEffect(() => {
    localStorage.getItem("user") && setRegistered(true)
  }, [])
  return (
    <>
      <div className='border p-4 px-4 shadow-sm flex justify-between'>
        <div className='flex gap-1 items-center'>
          <Link className='font-semibold text-lg text-blue-700 tracking-wider' href={"/en"}>{"Pandapass"}</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Button
            className={register ? "hidden" : ""}
            onClick={handleClick}
          >
            Launch Token
          </Button>
          <ConnectWallet />
          <Tooltip content="Disconnect" placement="bottom" className="bg-gray-600 rounded-md bg-opacity-80 text-white p-1">
            <LogoutIcon className='cursor-pointer' onClick={handleDisconnect} />
          </Tooltip>
        </div>
        {
          <Alert
            open={loader}
            variant="filled"
            onClose={() => setOpen(false)}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
            style={{ position: 'absolute', bottom: 0, right: 4 }}
            className="rounded-none border-l-4 bg-opacity-80 z-10"
          >
            {
              address ? "Disconnecting..." : "Already Disconnected"
            }
          </Alert>
        }
      </div>
    </>
  )
}

export default Navbar