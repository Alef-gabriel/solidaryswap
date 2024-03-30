require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    filecoinTestnet: {
      url: "https://filecoin-calibration.chainup.net/rpc/v1",
      chainId: 314159,
      //accounts: [FILECOIN_TESTNET_PRIVATE_KEY]
    },
  },
};
