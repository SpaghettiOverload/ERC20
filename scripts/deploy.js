const hre = require("hardhat");
const ethers = hre.ethers;
require('dotenv').config();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function deployLimeTokenContract() {

  await hre.run('compile');
  const [owner] = await ethers.getSigners();

  console.log('Deploying contracts with the account: ', owner.address);
  console.log('Account balance: ', (await owner.getBalance()).toString());
 
  const LimeToken = await hre.ethers.getContractFactory("LimeToken");
  const LimeTokenContract = await LimeToken.deploy();

  console.log('Waiting for LimeToken deployment...');

  await LimeTokenContract.deployed();

  console.log("LimeToken deployed to:", LimeTokenContract.address);

  console.log("Waiting for the deployed contract to reach Etherscan backend...")
  await sleep(20000);
  await hre.run("verify:verify", {
    address: LimeTokenContract.address,
    constructorArguments: [
      // none
    ],
  });
}

module.exports = deployLimeTokenContract;

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });