'use client'
import { useContext, useEffect, useState } from 'react'
import { appState } from '../context/store'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
    Spinner
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConnectWallet = () => {
    const { connectWallet, connected, setConnected, address, handlePersonalSign, VerifyMessages, setSign, status, setStatus } = useContext(appState);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [loader, setLoader] = useState(false);

    const handleConnect = async () => {
        setLoader(true);
        await connectWallet();
        // await handleVerification();
        setLoader(false);
        setOpen((cur) => !cur)
    }
    const handleSignIn = async() => {
        const sign = await handlePersonalSign("Signature");
        const address = localStorage.getItem("status")
        address && await handleverify(address,sign);
    };

    useEffect(() => {
        let result = localStorage.getItem("status");
        setStatus(result);
        if(result){
            setConnected(true);
            handleConnect()
        }else{
            setConnected(false);
        }
    },connected)

    useEffect(() => {
        if(connected){
            const signStatus = localStorage.getItem("signature");
            if (signStatus) {
            } else {
                handleSignIn()
            } 
        }
    }, [connected]);


    const handleverify = async (address,sign) => {
        try {
           
            const isValid = await VerifyMessages({
                message: "Signature",
                address: address,
                signature: sign
            });
                
            
            if(isValid) {
                toast.success('Signature verified', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                toast.error('Invalid Signature', {
                    position: "bottom-right",
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
            toast.error('Invalid Signature', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

   
    return (
        <div>
            <Button onClick={handleOpen}>
                {
                    address ? "Connected" : "Connect Wallet"
                }
            </Button>
            <Dialog size="xs" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Connect a Wallet
                        </Typography>
                        <Typography color="gray" variant="paragraph">
                            Choose which card you want to connect
                        </Typography>
                    </div>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody className="overflow-y-scroll !px-5">
                    <div className="mb-6">
                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="py-3 font-semibold uppercase opacity-70"
                        >
                            Popular
                        </Typography>
                        <ul className="mt-3 -ml-2 flex flex-col gap-1" >
                            <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md" onClick={handleConnect} disabled={address} >
                                {
                                    address ? <>
                                        <img
                                            src="https://docs.material-tailwind.com/icons/metamask.svg"
                                            alt="metamast"
                                            className="h-6 w-6"
                                        />
                                        <Typography
                                            className="uppercase"
                                            color="blue-gray"
                                            variant="h6"
                                        >
                                            {
                                                address.slice(0, 6) + "..." + address.slice(-4)
                                            }
                                        </Typography>
                                    </> :
                                        loader ? <>
                                            <Spinner size="sm" color="blue" />
                                            <p>Connecting...</p>
                                        </> :
                                            <>
                                                <img
                                                    src="https://docs.material-tailwind.com/icons/metamask.svg"
                                                    alt="metamast"
                                                    className="h-6 w-6"
                                                />
                                                <Typography
                                                    className="uppercase"
                                                    color="blue-gray"
                                                    variant="h6"
                                                >
                                                    Connect with MetaMask
                                                </Typography>
                                            </>


                                }

                            </MenuItem>
                            <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md">
                                <img
                                    src="https://docs.material-tailwind.com/icons/coinbase.svg"
                                    alt="metamast"
                                    className="h-6 w-6 rounded-md"
                                />
                                <Typography
                                    className="uppercase"
                                    color="blue-gray"
                                    variant="h6"
                                >
                                    Connect with Coinbase
                                </Typography>
                            </MenuItem>
                        </ul>
                    </div>
                    {/* <div>
                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="py-4 font-semibold uppercase opacity-70"
                        >
                            Other
                        </Typography>
                        <ul className="mt-4 -ml-2.5 flex flex-col gap-1">
                            <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md outline-1" onClick={disconnectWallet}>
                                <img
                                    src="https://docs.material-tailwind.com/icons/trust-wallet.svg"
                                    alt="metamast"
                                    className="h-7 w-7 rounded-md border border-blue-gray-50"
                                />
                                <Typography
                                    className="uppsecase"
                                    color="blue-gray"
                                    variant="h6"
                                >
                                    Disconnect Wallet
                                </Typography>
                            </MenuItem>
                        </ul>
                    </div> */}
                </DialogBody>
                <DialogFooter className="justify-between gap-2">
                    <Typography variant="small" color="gray" className="font-normal">
                        New to Ethereum wallets?
                    </Typography>
                    <Button variant="outlined" size="sm">
                        Learn More
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </div>
    )
}

export default ConnectWallet

