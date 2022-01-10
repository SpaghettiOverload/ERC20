require('dotenv').config();
const { compile } = require('@ethereum-waffle/compiler');
const hre = require("hardhat");

const LimeToken = require('../artifacts/contracts/LimeToken.sol/LimeToken.json');

const run = async function() {
    // SET UP
    const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ROPSTEN_URL);
    const latestBlock = await provider.getBlock("latest");
    console.log("Latest block hash:", latestBlock.hash);

    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const balance = await wallet.getBalance();
    console.log(hre.ethers.utils.formatEther(balance, 18));

    const LimeTokenContract = new hre.ethers.Contract(process.env.LIME_TOKEN_CONTRACT_ADDRESS, LimeToken.abi, wallet);

    const recepientAddress = "0x465b2b6CC578268BA33f24A7e151D144b0E44D29";
    const ownerAddress = wallet.address;

    // // CHECK OWNER BALANCE
    // let tokenBalance = await LimeTokenContract.balanceOf(ownerAddress);
    // console.log(`Balance of: ${ownerAddress} is ${hre.ethers.utils.formatEther(tokenBalance, 18)} MLT`);

    // // CHECK RECEPIENT BALANCE
    // tokenBalance = await LimeTokenContract.balanceOf(recepientAddress);
    // console.log(`Balance of: ${recepientAddress} is ${hre.ethers.utils.formatEther(tokenBalance, 18)} MLT`);

    // // TRANSFER TO RECEPIENT
    // const transferAmount = 1430000000000000000n;
    // console.log(`Transfering ${hre.ethers.utils.formatEther(transferAmount, 18)} MLT from ${ownerAddress} to ${recepientAddress}`);
    // const transactionTransferTokens = await LimeTokenContract.transfer(recepientAddress, transferAmount);
    // let = transactionReceipt = await transactionTransferTokens.wait();
    // if (transactionReceipt.status != 1) {
    //     console.log("Transaction was not successfull");
    // }

    // // CHECK OWNER BALANCE
    // tokenBalance = await LimeTokenContract.balanceOf(ownerAddress);
    // console.log(`Balance of: ${ownerAddress} is ${hre.ethers.utils.formatEther(tokenBalance, 18)} MLT`);

    // // CHECK RECEPIENT BALANCE
    // tokenBalance = await LimeTokenContract.balanceOf(recepientAddress);
    // console.log(`Balance of: ${recepientAddress} is ${hre.ethers.utils.formatEther(tokenBalance, 18)} MLT`);

    // // BURNING REMAINING TOKENS
    // const remainingAmount = 570000000000000000n;
    // console.log('Burning remaining tokens...')
    // const transactionBurnTokens = await LimeTokenContract.burn(remainingAmount);
    // transactionReceipt = await transactionBurnTokens.wait();
    // if (transactionReceipt.status !=1) {
    //     console.log("Transaction was not successfull");
    // }

    // // CHECK OWNER BALANCE
    // tokenBalance = await LimeTokenContract.balanceOf(ownerAddress);
    // console.log(`Balance of: ${ownerAddress} is ${hre.ethers.utils.formatEther(tokenBalance, 18)} MLT`);
    
};

run();
