require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

const secret = fs.readFileSync(".secret").toString();

module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // chainId: 1337
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [secret]
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [secret]
    }
  }
};
