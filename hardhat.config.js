require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy-LimeToken-testnet", "Deploys contract on the given test network.").setAction(async (taskArguments, hre, runSuper) => {
  const deployLimeTokenContract = require("./scripts/deployLimeToken");
  await deployLimeTokenContract(taskArguments);
});

task("deploy-ETHWrapper-testnet", "Deploys contract on the given test network.").setAction(async (taskArguments, hre, runSuper) => {
  const deployETHWrapperContract = require("./scripts/deployETHWrapper");
  await deployETHWrapperContract(taskArguments);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 module.exports = {
  solidity: {
      version: '0.7.6',
      settings: {
          optimizer: {
              enabled: true,
              runs: 200
          },
      }, 
  },
  networks: {
    ropsten: {
        url: process.env.ROPSTEN_URL,
        accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
};
