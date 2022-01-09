require('dotenv').config();
const { compile } = require('@ethereum-waffle/compiler');
const hre = require("hardhat");
const LimeToken = require('../artifacts/contracts/LimeToken.sol/LimeToken.json');

const run = async function() {
    // SET UP
    const [owner] = await hre.ethers.getSigners();
    const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ROPSTEN_URL);
    const latestBlock = await provider.getBlock("latest");
    console.log("Latest block hash:", latestBlock.hash);

    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const balance = await wallet.getBalance();
    console.log(hre.ethers.utils.formatEther(balance, 18));

    const LimeTokenContract = new hre.ethers.Contract(process.env.CONTRACT_ADDRESS, LimeToken.abi, wallet);

    // MINT
    // const amount = 2000000000000000000n;
    // console.log(`Minting ${hre.ethers.utils.formatEther(amount, 18)} MLT to ${owner.address}`);
    // const transactionMintTokenToDeployer = await LimeTokenContract.mint(owner.address, amount);
    // const transactionReceipt = await transactionMintTokenToDeployer.wait();
    // if (transactionReceipt.status !=1) {
    //     console.log("Transaction was not successfull");
    // }

    // CHECK BALANCE
    const addressToCheck = owner.address;
    const tokenBalance = await LimeTokenContract.balanceOf(addressToCheck);
    console.log(`Balance of: ${addressToCheck} is ${hre.ethers.utils.formatEther(tokenBalance, 18)} MLT`);

    // TRANSFER
    // const recepientAddress = "0x465b2b6CC578268BA33f24A7e151D144b0E44D29";
    // const amount = 1430000000000000000n;

    // const recepientBalance = await LimeTokenContract.balanceOf(recepientAddress);
    // console.log(`Balance of ${recepientAddress} is currently ${hre.ethers.utils.formatEther(recepientBalance, 18)} MLT`)

    // console.log(`Transfering ${hre.ethers.utils.formatEther(amount, 18)} MLT to ${recepientAddress}`);
    // const transactionTransferTokens = await LimeTokenContract.transfer(recepientAddress, amount);
    // const transactionReceipt = await transactionTransferTokens.wait();
    // if (transactionReceipt.status != 1) {
    //     console.log("Transaction was not successfull");
    //     return;
    // }
    // console.log("Done!")
    // recepientBalance = await LimeTokenContract.balanceOf(recepientAddress);
    // console.log(`Balance of ${recepientAddress} is now ${hre.ethers.utils.formatEther(recepientBalance, 18)} MLT`)

    // BURN
    // const transactionBurnTokens = await LimeTokenContract.burn(120000000000000000000n);
    // const transactionReceipt = await transactionBurnTokens.wait();
    // if (transactionReceipt.status !=1) {
    //     console.log("Transaction was not successfull");
    // }

    
    
};

run();
