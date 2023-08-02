// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract SongContract {

    mapping(address => uint) public Users;
    
    mapping(string => address) public SongsOwner;
    mapping(string => uint) public SongFee;
    mapping(string => uint) public SongBalance;

    // for updating the Users balance
    function updateBalance(uint newBalance) public payable  {
      Users[msg.sender] += newBalance;
   }
    // for getting the Users balance
   function viewBalance(address accID) public view returns (uint){
      uint balance =  Users[accID];
      return balance;
   }
    // for uploading a Song (setting the Song owner , Song fees and Song balance)
   function setOwner(string memory SongID , address accID , uint fee) public {
      SongsOwner[SongID] = accID;
      SongFee[SongID]=fee;
   }
    // for accesing the owner of the Song
   function getOwner(string memory SongID) public view returns (address){
      address Owner =  SongsOwner[SongID];
      return Owner;
   }
    // for setting the Song fee
//    function setSongFee(string memory SongID , uint fee) public {
//       ideoFee[SongID]=fee;
//    }

    // for accessing the Song fee
   function getSongFee(string memory SongID) public view returns (uint){
      uint fee =  SongFee[SongID];
      return fee;
   }
    // for vewing the Song
   function listenSong(string memory SongID , address accID , uint fee) public {
       Users[accID] -= fee;
       SongBalance[SongID] +=fee;
   }

    function transfer (address payable user,string memory SongID , uint amount) public payable {
        require(amount <= Users[user]);
        payable(user).transfer(amount);
        Users[user] -= amount;
        SongBalance[SongID] +=amount;
    }
    function deposit (address payable user, uint amount) public payable {
        Users[user] += amount;
    }


    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }
    receive() external payable{

     }



}