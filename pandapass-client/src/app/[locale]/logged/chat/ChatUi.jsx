import { appState } from '@/app/context/store';
import { getFirebaseData, handleRoom, subscribeToRoomMessages } from '@/utils/functionCalling';
import React, { useContext, useEffect, useRef, useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Badge, Button } from "@material-tailwind/react";
import { setData } from '@/app/(serverRequest)/serverRequest';
import { Spinner } from "@material-tailwind/react";


const ChatUi = () => {
  const { chats, setChats, address,userChatData } = useContext(appState);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(chats && chats[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetching, setFetching] = useState(false);

  const pickerRef = useRef(null);

  const YourImageUrl = "https://camo.githubusercontent.com/854a93c27d64274c4f8f5a0b6ec36ee1d053cfcd934eac6c63bed9eaef9764bd/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67";


  const getData = async () => {
    try {
      const address = localStorage.getItem("status")
      const fetchRoms = await setData(`http://localhost:3004/api/getRoomsInUser/${address}`)
      console.log(fetchRoms);
      if (fetchRoms.roomIds.length > 0) {
        const Chats = await getFirebaseData()
        const filteredData = Chats.data.rooms.filter((validRoom) => {
          return fetchRoms.roomIds.includes(validRoom.roomId)
        })
        console.log(filteredData)
        console.log(Chats)
        setChats(filteredData)
        console.log(Chats.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getRooms = async () => {
    setFetching(true);
    await getData()
    setFetching(false);
  }

  useEffect(()=> {
    getRooms()
  },[])

  const colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];

  function getColor(name) {
    let hash = 0;
    for (let i = 0; i < name?.length; i++) {
      hash += name.charCodeAt(i);
    }
    return colors[hash % colors.length];
  }

  useEffect(() => {
    if (!chats) {
      getData();
    }
  }, [address, chats]);

  useEffect(() => {
    if (selectedRoom) {
      subscribeToRoomMessages(selectedRoom, setSelectedRoom);
    }
  }, [chats]);


  useEffect(() => {
    if(!selectedRoom) {

      setSelectedRoom(chats && chats[0]); // Set the default selected user
    }
  }, [chats]);


  useEffect(() => {
    if (showPicker && pickerRef.current) {
      const picker = pickerRef.current;
      picker.addEventListener('emoji-click', event => {
        setInputMessage(prev => prev + event.detail.unicode);
        setShowPicker(false);  // Hide the picker after an emoji is selected
      });

      // Clean up function to remove the event listener when the component unmounts
      return () => {
        picker.removeEventListener('emoji-click', event => {
          setInputMessage(prev => prev + event.detail.unicode);
          setShowPicker(false);  // Hide the picker after an emoji is selected
        });
      };
    }
  }, [showPicker]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (tokenAddress, userID,  message) => {
    // chatting function
    await setData("http://localhost:3004/api/sendMessageInRoom", {data: {tokenAddress, userID,  message}})
    setInputMessage('')
    await getData()
  };
  


  const getUserIDFromRoomID = async (roomIDs) => {
    
  }
  console.log(chats)
  
  return (
<div className="container">
      {
        fetching ?
         <div className="flex justify-center items-center text-xl w-full h-[100vh]" >
           <Spinner />
         </div> :
          <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                onChange={handleSearchChange}
                required
              />
            </div>
          </div>

          <ul className="overflow-auto h-[30rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>


            {/* {chats?.rooms?.filter(room => room?.roomName?.toLowerCase().includes(searchTerm.toLowerCase())).map((chat, index) => ( */}
            {chats && chats?.map((room, index) => (
              <a
                key={index}
                className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                onClick={() => {
                  setInputMessage('');
                  setSelectedRoom(room);
                }}
              >
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  // src={chat?.roomPhoto}
                  src={room?.photo}
                  alt="name"
                />
                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-gray-600">
                      {/* {chat?.roomName} */}
                      {/* {room?.roomId} */}
                    {room?.name || "room"}
                    </span>
                    {/* <span className="block ml-2 text-sm text-gray-600">
                      {chat.timestamp}
                    </span> */}
                  </div>
                  <span className="block ml-2 text-sm text-gray-600">
                    {room?.messages[room?.messages?.length - 1]?.message || ''}
                  </span>
                </div>
              </a>
            ))}
          </ul>
        </div>

        <div className="hidden lg:col-span-2 lg:block bg-[rgb(214 211 209)]" style={{ backgroundImage: `url(${YourImageUrl})` }}>
          <div className="w-full ">
            <div className="relative flex items-center p-3 border-b border-gray-300 bg-gray-100">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={selectedRoom?.photo}
              // src={selectedRoom?.roomPhoto}
              // alt={selectedRoom?.roomName}
              />
              <span className="block ml-2 font-bold text-gray-600">
                {/* {selectedRoom?.roomName} */}
                {selectedRoom?.name}
              </span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>

            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul className="space-y-2">
                {selectedRoom?.messages.map((message, index) => {
                  const date = message?.timeStamp?.toDate();
                  const formattedTime = date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                  // const firstLetter = message.name.charAt(0).toUpperCase();
                  const firstLetter= "C";

                  return (
                    <li key={index} className={`flex justify-${message.userId === address ? 'end' : 'start'}`}>
                      <div className='flex justify-start items-center gap-3'>
                        <div className={`w-8 h-8 text-white text-center rounded-full flex items-center justify-center bg-${getColor(message.name)}-500`}>
                          <p>{firstLetter}</p>
                        </div>
                        <div className={`relative max-w-xl px-4 py-2 text-gray-700 ${message.userId === address ? 'bg-[#d1fae5]' : 'bg-gray-100'} rounded shadow`}>
                          <span className={`block -ml-2 text-xs text-${getColor(message.userId)}-900`}>{message.name}</span>
                          <span className="block">{message.message}</span>
                          <span className="block text-right text-xs text-gray-500">
                            {formattedTime}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <div className='relative'>
                {showPicker && <div className='absolute bottom-10 left-8'><emoji-picker class="light" ref={pickerRef}></emoji-picker></div>}
                <button onClick={() => setShowPicker(!showPicker)} onBlur={() => setShowPicker(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                onChange={(e) => setInputMessage(e.target.value)}
                value={inputMessage}
                required
              />
              <button type="submit"
              //  onClick={() => handleSubmit(selectedRoom?.roomId, address, chats.name, inputMessage)}
                  onClick={() => handleSubmit(selectedRoom?.roomId, address, inputMessage)}
               >
                <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>

              </button>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )

  // return {
  //   fetching ? 
  //   <Spinner/>:
  //   <></>
  // }
};

export default ChatUi;
