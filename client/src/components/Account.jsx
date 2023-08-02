import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import Web3 from "web3";
var Tx = require("ethereumjs-tx").Transaction;
/* global BigInt */
const Account = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [deposit, setDeposit] = useState();
  const [withdraw, setWithdraw] = useState();
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

  const navigate = useNavigate();

  const handleDeposit = async (e) => {
    e.preventDefault();

    const inputData = new FormData();
    inputData.append("deposit", deposit);

    console.log("Amount to be Deposited : " + deposit);

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
        var depositAmount = Web3.utils.toWei(deposit, "ether");
        depositAmount = depositAmount / 100;

        const data = songContract.methods.deposit(temp[0], deposit).encodeABI();
        //Build the Transaction
        const txObject = {
          from: temp[0],
          gasLimit: web3.utils.toHex(1000000),
          gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
          to: contractAdress,
          value: depositAmount,
          data: data,
        };
        const sendHash = web3.eth.sendTransaction(txObject);
        console.log("txnHash is " + sendHash);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please install Metamasak.");
    }
  };
  const handleWithdraw = async (e) => {
    e.preventDefault();

    const inputData = new FormData();
    inputData.append("withdraw", withdraw);

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
        var withdrawAmount = Web3.utils.toWei(withdraw, "ether");
        withdrawAmount = withdrawAmount / 100;
        const data = songContract.methods
          .transfer(temp[0], withdraw)
          .encodeABI();
        //Build the Transaction
        const txObject = {
          from: temp[0],
          gasLimit: web3.utils.toHex(26000),
          gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
          to: contractAdress,
          value: withdraw,
          data: data,
        };
        const sendHash = web3.eth.sendTransaction(txObject);
        console.log("txnHash is " + sendHash);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please install Metamasak.");
    }
  };

  return (
    <div className="flex flex-col  items-center mt-24">
      <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 ">
              Deposit
            </h1>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Amount
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              placeholder="Amount"
              name="Amount"
              value={deposit}
              onChange={(e) => {
                const value = e.target.value;
                setDeposit(value);
              }}
            />
          </div>

          <div class="flex flex-col  items-center justify-between">
            <button
              class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDeposit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 ">
              Withdraw
            </h1>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Amount
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              placeholder="Amount"
              name="Amount"
              value={withdraw}
              onChange={(e) => {
                const value = e.target.value;
                setWithdraw(value);
              }}
            />
          </div>

          <div class="flex flex-col  items-center justify-between">
            <button
              class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleWithdraw}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
