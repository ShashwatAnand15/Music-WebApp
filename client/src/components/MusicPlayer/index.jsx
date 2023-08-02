import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { nextSong, prevSong, playPause } from "../../state";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";
import Web3 from "web3";
var Tx = require("ethereumjs-tx").Transaction;

const web3 = new Web3(
  "https://sepolia.infura.io/v3/76b7b7167d264867ba89838651fcd298"
);

const account1 = "0x250c444e1E2c1ad52Ead27f31a740ceA007980c5";
const privateKey1 =
  "f28b4c70b2b7b2d65f4ceacbc300f793f345acb12c0b9e65820da2a52ce0cad9";

const MusicPlayer = () => {
  const activeSong = useSelector((state) => state.activeSong);
  const currentSongs = useSelector((state) => state.currentSongs);
  const currentIndex = useSelector((state) => state.currentIndex);
  const isActive = useSelector((state) => state.isActive);
  const isPlaying = useSelector((state) => state.isPlaying);

  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [account, setAccount] = useState("");
  const dispatch = useDispatch();
  let web32;
  let accounts;
  var address = "";

  useEffect(() => {
    connectWalletHandler();
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);
  const connectWalletHandler = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      window.ethereum.request({ method: "eth_requestAccounts" });
      web32 = new Web3(window.ethereum);
      accounts = await web32.eth.getAccounts();
      setAccount(accounts[0]);
      address = String(accounts[0]);
      console.log("Address :" + address);
      console.log("Account :" + account);
    } else {
      alert("Please install Metamasak.");
    }
  };
  const handlePlayPause = () => {
    if (!isActive) return;
    console.log("Pause button is clicked");

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };
  // we need to put our code
  const handleNextSong = async () => {
    console.log("Id : " + activeSong._id);
    dispatch(playPause(false));

    //we will make the payment
    //check for account

    // here to perform ethereum part
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

    var songContract = new web3.eth.Contract(contractABI, contractAdress);
    const fee = 1;
    console.log(address);
    const data = songContract.methods
      .listenSong(activeSong._id, account, fee)
      .encodeABI();
    //Build the Transaction
    const txObject = {
      from: account1,
      nonce: await web3.eth.getTransactionCount(account1),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      to: contractAdress,
      data: data,
    };

    // Sign the transaction
    const signedTransaction = web3.eth.accounts.signTransaction(
      txObject,
      privateKey1
    );

    //Broadcast the transaction
    signedTransaction.then((signedTx) => {
      console.log("tx object is signed");
      const sentTx = web3.eth.sendSignedTransaction(
        signedTx.raw || signedTx.rawTransaction
      );

      sentTx.on("receipt", (receipt) => {
        console.log("receipt: ", receipt);
      });

      sentTx.on("error", (err) => {
        console.log(err.message);
      });
    });

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(event) => setVolume(event.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};

export default MusicPlayer;
