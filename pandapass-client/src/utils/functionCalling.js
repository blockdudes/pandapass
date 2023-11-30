import { getRedirectResult, TwitterAuthProvider, signInWithPopup, getIdToken } from "firebase/auth";
import { auth, Authprovider, db } from "../../firebase.config";
import firebase from 'firebase/compat/app';
import { doc, getDoc, setDoc, getFirestore, addDoc, collection, updateDoc, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { parseValue } from "graphql";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export async function registerToken(contract, name, symbol, email) {
  try {
    const transaction = await contract.registerToken(name, symbol, email)
    console.log('Token registered:', transaction);
    return transaction;
  } catch (error) {
    console.error('Error registering token:', error.message);
    return error;
  }
}

export async function sellToken(contract, sellerAddress, tokenAmount) {
  try {
    const transaction = await contract.sellToken(sellerAddress, tokenAmount)
    console.log('Token selled:', transaction);
    return transaction;
  } catch (error) {
    console.error('Error selling token:', error);
  }
}

export async function ListToken(contract, tokenAddress, tokenAmount, pricePerToken) {
  try {
    console.log(contract, tokenAddress, tokenAmount, pricePerToken)
    const transaction = await contract.listTokenForSale(tokenAddress, tokenAmount, pricePerToken)
    console.log('Token listed:', transaction);
    return transaction;
  } catch (error) {
    console.error('Error listing token:', error);
  }
}

export async function buyResellTokens(contract, listingId, amount, value) {
  console.log(contract, listingId, amount, value)
  try {
    const transaction = await contract.buyResellTokens(listingId, amount, { value: value })
    console.log('Token purchased:', transaction);
    return transaction;
  } catch (error) {
    console.error('Error purchased token:', error);
  }
}

// @todo- add token amt to be transact 
export async function getTokenAddr(contract, address) {
  try {
    const transaction = await contract.sellerTokenAddresses(address)
    console.log('success:', transaction);
    return transaction;
  } catch (error) {
    console.error('fail', error);
  }
}
export async function getAllTokens(contract) {
  try {
    const transaction = await contract.getAllTokens()
    console.log('success:', transaction);
    return transaction;
  } catch (error) {
    console.error('fail', error);
  }
}

export async function purchaseToken(contract, sellerAddress, tokenAmount) {
  try {
    const transaction = await contract.purchaseToken(sellerAddress, tokenAmount, { value: 50000000000000})
    console.log('success:', transaction);
    return transaction;
  } catch (error) {
    console.error('fail', error);
  }
}
export async function getUserTokens(contract, address) {
  console.log("first")
  try {
    const transaction = await contract.getAllUserTokens(address)
    console.log('success:', transaction);
    return transaction;
  } catch (error) {
    console.error('fail', error);
  }
}

export async function listTokenForSale(contract, tokenAddress, tokenAmount, pricePerToken) {
  try {
    const transaction = await contract.listTokenForSale(tokenAddress, tokenAmount, pricePerToken)
    console.log('success:', transaction);
    return transaction
  } catch (error) {
    console.error('fail', error);
  }
}
export async function removeListingAndRefund(contract, listingId) {
  try {
    const transaction = await contract.removeListingAndRefund(listingId)
    console.log('success:', transaction);
  } catch (error) {
    console.error('fail', error);
  }
}


export async function getRewardStatus(contract, address) {
 try {
   const transaction = await contract.sellerRewards(address);
   console.log(transaction);
   return transaction;
 } catch (error) {
  console.log(error)
 }
}

export async function redeemRewards(contract, address, amount) {
  try {
    const transaction = await contract.redeemRewards(address, amount)
    console.log('success:', transaction);
    return transaction
  } catch (error) {
    console.error('fail', error);
  }
}

export async function getListingArray(contract) {
  try {
    const transaction = await contract.getListings()
    console.log('success:', transaction);
    return transaction;
  } catch (error) {
    console.error('fail', error.message);
  }
}



//firebase  functions

export const getUserData = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("name", result);
      console.log("name", result?.user?.email);
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;
      const user = result.user;
      return { user }

    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const credential = TwitterAuthProvider.credentialFromError(error);
  }
}

export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, Authprovider);
    const user = result.user;
    return user;
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
  }
}

export const signOut = async () => {
  try {
    await auth.signOut();
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error)
  }

}


export const getTokenId = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      return user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        console.log(idToken)
        return idToken
      }).catch(function (error) {
        return error
      });
    } else {
      console.log('No user is signed in.');
    }
  } catch (error) {
    console.log(3)
  }
}

export const getFirebaseData = async () => {
  try {
    // Fetch the messages for all rooms
    const roomsData = [];
    const roomsRef = collection(db, "Rooms");
    const roomsSnapshot = await getDocs(roomsRef);

    // Iterate through each room document
    await Promise.all(roomsSnapshot.docs.map(async (roomDoc) => {
      const roomId = roomDoc.id;
      const roomRef = collection(db, "Rooms", roomId, "messages");
      const query_data = query(roomRef, orderBy("timeStamp"));
      // const query_data = query(roomRef);
      const roomMessagesSnapshot = await getDocs(query_data);

      // Convert the roomSnapshot to an array of message data, including the message ID
      const roomMessages = roomMessagesSnapshot.docs.map((messageDoc) => ({ id: messageDoc.id, ...messageDoc.data() }));


      // Fetch additional data from the "owner" collection
      const ownerRef = doc(db, "owner", roomId);
      const ownerSnapshot = await getDoc(ownerRef);
      console.log('ownerSnapshot:', ownerSnapshot);

      const ownerData = ownerSnapshot.data();
      console.log('ownerData:', roomId);
      // Combine room information with messages
      roomsData.push({ roomId: roomId, messages: roomMessages, ...ownerData });

      console.log(roomsData)
    }));

    // Return the rooms data
    return { success: true, data: { rooms: roomsData } };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Failed to fetch messages' };
  }
};



// export const getFirebaseData = async (userId,setMessage) => {
//   try {
//     const userRef = doc(db, "users", `${userId}`);
//     const userSnapshot = await getDoc(userRef);

//     if (userSnapshot.exists()) {
//       const userData = userSnapshot.data();
//       console.log("user data - >", userData);

//       // Assuming the user's data includes a field 'rooms' that is an array of room IDs
//       const name = userData.name;
//       const photo = userData.photo;
//       const roomIds = userData.rooms;

//       // Fetch the messages for each room and listen for real-time updates
//       const roomsDataPromises = roomIds.map(async (roomId) => {
//         const roomRef = collection(db, "rooms", roomId, "message");
//         const messagesQuery = query(roomRef, orderBy('timeStamp'));

//         const messagesPromise = new Promise((resolve, reject) => {
//           onSnapshot(messagesQuery, async (querySnapshot) => {

//               let messages = querySnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//               }));
//               console.log(messages)
//               setMessage(messages)
//               resolve(messages);
//           });
//         });

//         const roomData = {
//           roomId,
//           messages: await messagesPromise,
//         };

//         // Get room admin data
//         const lowerCaseRoomId = roomId.toLowerCase();
//         const roomAdminRef = doc(db, "users", `${lowerCaseRoomId}`);
//         const roomAdminSnapshot = await getDoc(roomAdminRef);

//         roomData.roomName = roomAdminSnapshot.data().name;
//         roomData.roomPhoto = roomAdminSnapshot.data().photo;

//         console.log(roomData)
//         return roomData;
//       });

//       // Wait for all roomsData promises to resolve
//       const roomsData = await Promise.all(roomsDataPromises);

//       // Include the rooms data in the returned data
//       console.log(userData,  roomsData )
//       return { success: true, data: { ...userData, rooms: roomsData } };
//     } else {
//       return { success: false, message: "User not exists" };
//     }
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: "User not exists" };
//   }
// };





export const addUser = async (userId, name, photoUrl, celebrity_id) => {
  try {
    console.log(userId, name, photoUrl, celebrity_id)
    const ref = doc(db, "users", `${userId}`);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      // If user is celebrity, add the celebrity_id to the rooms array

      await setDoc(ref, {
        name: name,
        photo: photoUrl,
        // timeStamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        rooms: []
      }, { merge: true });

      console.log('User added successfully');
      return { success: true, message: 'User added successfully' };
    } else {
      console.log('User already exists');
      return { success: false, message: 'User already exists' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

export const handleRoom = async (tokenAddress, userID, message) => {
  try {
    const ref = collection(db, "Rooms", `${tokenAddress}/messages`)
    const data = await addDoc(ref, {
      message: message,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: userID
    })
    console.log(data)
    return data

  } catch (error) {
    return error;
  }
}

//user metamask id to roomid(celebrity id || seller address)
export const addRoomToUser = async (userId, roomId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const existingRooms = userData.rooms;

      // Check if roomId already exists
      if (!existingRooms.includes(roomId)) {
        const updatedRooms = [...existingRooms, roomId];

        await updateDoc(userRef, {
          rooms: updatedRooms
        });

        console.log(`Room ${roomId} added to user ${userId}`);
      } else {
        console.log(`Room ${roomId} already exists for user ${userId}`);
      }
    } else {
      console.log(`User ${userId} does not exist`);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};


export const subscribeToRoomMessages = (selectedUser, setSelectedUser) => {
  const messagesRef = collection(db, "Rooms", selectedUser?.roomId, "messages");
  const messagesQuery = query(messagesRef, orderBy('timeStamp'));

  return onSnapshot(messagesQuery, (querySnapshot) => {
    const newMessages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Check if there's an actual change in the messages
    const hasChanged = JSON.stringify(selectedUser.messages) !== JSON.stringify(newMessages);

    if (hasChanged) {
      // Update the messages array in the state only if there's a change
      const updatedSelectedUser = { ...selectedUser, messages: newMessages };
      setSelectedUser(updatedSelectedUser);
    }
  });
};


//frontend normal function


export const checkSignExpired = () => {
  const signatureData = JSON.parse(localStorage.getItem("signature"));
  if (!signatureData) {
    handlePersonalSign('Signature');

  }
  const signatureTime = signatureData.timeStamp;
  const signature = signature.sign;

  const expirationTime = 60 * 60 * 1000 * 24; // 1 hour

  if (Date.now() - signatureTime > expirationTime) {
    console.log("signature has expired");

    const timestamp = Date.now();
    localStorage.setItem("signature", JSON.stringify({ sign: false, signatureTime, signature: signature.sign }));
    console.log(JSON.stringify({ sign: false, signatureTime, signature: signature.sign }))
    return false;
  } else {
    console.log("signature is valid")
    return true;
  }
}