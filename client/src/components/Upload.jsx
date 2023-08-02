import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Web3 from "web3";

const contractABI = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "SongID",
        type: "string",
      },
      {
        internalType: "address",
        name: "accID",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "listenSong",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "SongID",
        type: "string",
      },
      {
        internalType: "address",
        name: "accID",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "SongID",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "setSongFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "updateBalance",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "SongID",
        type: "string",
      },
    ],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "SongID",
        type: "string",
      },
    ],
    name: "getSongFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "SongBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "SongFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "SongsOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "Users",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "accID",
        type: "address",
      },
    ],
    name: "viewBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractAdress = "0x463342488CbD882A9e53f937241DC4404cBDF351";

const Upload = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [picture, setPicture] = useState(null);
  const [song, setSong] = useState();
  const [name, setName] = useState();
  const [account, setAccount] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const inputData = new FormData();
    inputData.append("userId", user._id);
    inputData.append("name", name);
    inputData.append("picturePath", picture.name);
    inputData.append("audioPath", song.name);
    inputData.append("picture", picture);
    inputData.append("song", song);

    const res = await fetch("http://localhost:3001/songs", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: inputData,
    });

    const response = await res.json();
    console.log(response._id);
    if (response.staus === 500 || !response) {
      window.alert("Invalid Song Upload");
      console.log("Invalid Song Upload");
    } else {
      // here to perform ethereum part

      //check for account
      let web3;
      // const connectWalletHandler = () => {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        const temp = await web3.eth.getAccounts();

        const songContract = new web3.eth.Contract(contractABI, contractAdress);
        try {
          const fee = 1;
          const data = songContract.methods
            .setOwner(response._id, temp[0], fee)
            .encodeABI();
          //Build the Transaction
          const txObject = {
            from: temp[0],
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
            to: contractAdress,
            data: data,
          };
          const sendHash = web3.eth.sendTransaction(txObject);
          console.log("txnHash is " + sendHash);
          window.alert("Song Upload Successful");
        } catch (err) {
          console.log(err.message);
        }
      } else {
        alert("Please install Metamasak.");
      }

      //navigate("/home");
    }
  };

  return (
    <div className="mt-24">
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit ">
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
              <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                  Upload
                </h1>
                <form method="POST" className="mt-6">
                  <div className="mb-2">
                    <label
                      for="firstName"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Name of Song :
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={name}
                      onChange={(e) => {
                        const value = e.target.value;
                        setName(value);
                      }}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      for="picturePath"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Thumbnail:
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      id="file"
                      name="picture"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setPicture(file);
                      }}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      for="picturePath"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Song:
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="song"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setSong(file);
                      }}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={handleRegister}
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="xl:sticky relative top-0 h-fit"></div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
