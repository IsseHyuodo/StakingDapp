require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config() // dependency for env which allow us to read from env
require("@nomiclabs/hardhat-etherscan");

module.exports = {

  solidity: "0.8.6",
  // settings:{
  //   optimizer:{
  //     enabled:true,
  //     runs:200
  //   }
  //},
  
  networks:{
    hardhat:{
      chainId:1337 // chainId 1337 is for localhost
    },
    mumbai:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/${process.env.INFURA_API}`,
      accounts:[process.env.MAIN_ACCOUNT], // private key of metamask account
      chainId:80001, // mumbai testnet id
    },
 
    //go to metamask and select mumbai testnet
    //go to account details from the three dots option
    //select export private key
    //copy and paste pvt key .env Main_account 

  

    // goerli:{
    //   url: `https://goerli.infura.io/v3/${process.env.INFURA_API}`,
    //   accounts:[process.env.MAIN_ACCOUNT],
    //   chainId: 5,
    // },
    // mumbai:{
    //   url:`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API}`,
    //   accounts:[process.env.MAIN_ACCOUNT],
    //   chainId:80001,
    // },

  }
  
  // gasReporter:{
  //   enabled:true,
  //   currency:"INR",
  //   coinmarketcap:process.env.COINMARKETCAP,
  //   token:"matic",
  //   outputFile:"gasReports.txt",
  //   noColors:true
  // }
} 
// url:"https://polygon-mumbai.g.alchemy.com/v2/QxTSKb22k0gJ1HAO3mdQk1aW7S9hbV7_",  direct alchemy key first deployment successful and now using .env method