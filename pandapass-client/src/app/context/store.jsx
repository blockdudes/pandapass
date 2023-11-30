"use client"
import { createContext, useEffect, useState } from "react"
import { ethers } from 'ethers';
import { marketplaceAbi } from "@/utils/ContractsAbi/MarketplaceAbi";
import {registerToken, getTokenAddr, getAllTokens, getListingArray} from "@/utils/functionCalling";
import { useParams, usePathname } from "next/navigation";


export const appState = createContext();


const GlobalStateProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const pathName=usePathname()
    console.log(pathName)
    const [contract, setContract] = useState();
    const [signer, setSigner] = useState();
    const [provider, setProvider] = useState();
    const [address, setAddress] = useState();
    const [sign, setSign] = useState();
    const [status, setStatus] = useState();
    const [tradeTokenList, setTradeTokenList] = useState([]);
    const [chats, setChats] = useState();
    const [message, setMessage] = useState();
    const [allTokensData,setAllTokensData]=useState([])
    const [userEarnings,setUserEarnings]=useState(0)
    const marketplaceContractAddr = "0x91D44b3711C588Ae71797BEC7d6F56BaEF231A1e"; //Mar
    const apiUrl = "https://public-en-baobab.klaytn.net";
    const networkId = "0x3e9"
    const networkBlockExplorerUrl = "https://baobab.klaytnscope.com/"
    const [userChatData,setUserChatData]=useState([])
    const [indexOfTrading, setIndexOfTrading]=useState("");
    const [loginStatus, setLoginStatus]=useState("")
    // https://eth-sepolia.g.alchemy.com/v2/gFkrlIRMg8SzDl-0M2Gr_rVL0af-yF33
    // https://source.unsplash.com/random

    const nodeProvider = new ethers.providers.JsonRpcProvider(apiUrl);

    async function switchToContractNetwork() {
        const ethereum = window.ethereum;
    
        if (!ethereum) {
            console.log('MetaMask is not installed!');
            return false;
        }
    
        try {
            // Get the current network ID
            const currentNetworkId = ethereum.chainId;
    
            // Check if the current network matches the contract's network
            if (currentNetworkId !== networkId) {
                // Request to switch to the contract's network
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: networkId }],
                });
                return true
            }else{
                return true
            }
        } catch (error) {
            // Handle the case where the network is not available in MetaMask
            if (error.code === 4902) {
                try {
                    // Request to add the contract's network to MetaMask
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: networkId,
                                chainName: 'Klaytn Testnet Baobab',
                                nativeCurrency: {
                                    name: 'KLAY',
                                    symbol: 'KLAY', // 2-6 characters long
                                    decimals: 18,
                                },
                                rpcUrls: [apiUrl], // Your network's RPC URL
                                blockExplorerUrls: [networkBlockExplorerUrl], // (Optional) Block Explorer URL
                            },
                        ],
                    });
                    return true
                } catch (addError) {
                    // Handle errors while adding a new network
                    console.error('Error adding the network:', addError);
                }
            } else {
                // Handle other errors
                console.error('Error switching the network:', error);
            }
        }

        return false
    }
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const newProvider = new ethers.providers.Web3Provider(window.ethereum);
                await window.ethereum.enable();

                const marketplaceContract = new ethers.Contract(marketplaceContractAddr, marketplaceAbi.abi, newProvider.getSigner());
                console.log(marketplaceContract)
                setContract(marketplaceContract);
                setProvider(newProvider);
                setSigner(newProvider.getSigner());
                setAddress(window.ethereum.selectedAddress);
                const switchNetwork = await switchToContractNetwork()
                if(switchNetwork){
                    localStorage.setItem("status", window.ethereum.selectedAddress)
                    setConnected(true);
                }

            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("Please install Metamask!");
        }
    }

    const disconnectWallet = () => {
        localStorage.removeItem("status")
        localStorage.removeItem("signature")
        setProvider(null);
        setSigner(null);
        setAddress(null);
    };



    const handlePersonalSign = async (data) => {
        const exampleMessage = data;
        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            const from = accounts[0];
            const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
            const result = await ethereum.request({
                method: 'personal_sign',
                params: [msg, from],
            });
            setSign(result);

            // Store the current timestamp along with the signature
            const timestamp = Date.now();
            localStorage.setItem("signature", JSON.stringify({ signature: true, timestamp, sign: result }));

            return result;

        } catch (err) {
            console.log('Expired signature error:', err);
        }
    }

     const VerifyMessages = ({ message, address, signature }) => {
         console.log("this is", address, message)
         try {
             const signerAddr = ethers.utils.verifyMessage(message, signature).toLowerCase();
          if (signerAddr != address.toString()) {
            console.log("first")
            return false;
          }
          else {
            console.log("second")
            return true;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      };
 


    return (
        <appState.Provider
            value={{
                connected,
                setConnected,
                connectWallet,
                address,
                disconnectWallet,
                handlePersonalSign,
                VerifyMessages,
                sign,
                setSign,
                status,
                setStatus,
                tradeTokenList,
                setTradeTokenList,
                contract,
                chats, setChats,
                handlePersonalSign,
                setAllTokensData,
                userEarnings,
                setUserEarnings,
                allTokensData,
                userChatData,
                setUserChatData,
                indexOfTrading, setIndexOfTrading,
                loginStatus, setLoginStatus
            }}>
            {children}
        </appState.Provider>
    )
}



export default GlobalStateProvider;


// const filterTokenList = allTokens?.map(token => {
//     const matchingUserToken = res?.find(userToken => userToken?.seller === token?.sellerAddress);
//     if (matchingUserToken) {
//       // Create a new object with combined properties
//       return { ...token, ...matchingUserToken };
//     } else {
//       return token;
//     }
//   });