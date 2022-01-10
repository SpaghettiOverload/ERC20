const hre = require("hardhat");
const ethers = hre.ethers;
require('dotenv').config();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function deployETHWrapper() {

  await hre.run('compile');
  const [owner] = await ethers.getSigners();

  console.log('Deploying contracts with the account: ', owner.address);
  console.log('Account balance: ', (await owner.getBalance()).toString());
 
  const ETHWrapper = await hre.ethers.getContractFactory("ETHWrapper");
  const ethWrapperContract = await ETHWrapper.deploy();

  console.log('Waiting for ETHWrapper deployment...');

  await ethWrapperContract.deployed();

  console.log("ETHWrapper deployed to:", ethWrapperContract.address);

  console.log("Waiting for the deployed contract to reach Etherscan backend...")
  await sleep(20000);
  await hre.run("verify:verify", {
    address: ethWrapperContract.address,
    constructorArguments: [
      // none
    ],
  });
}

module.exports = deployETHWrapper;