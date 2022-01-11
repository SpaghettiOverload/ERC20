require('dotenv').config();
const { compile } = require('@ethereum-waffle/compiler');
const hre = require("hardhat");
const WETH = require('../artifacts/contracts/WETH.sol/WETH.json')
const ETHWrapper = require('../artifacts/contracts/ETHWrapper.sol/ETHWrapper.json')

const ETHWrapperContractAddress = process.env.ETH_Wrapper_CONTRACT_ADDRESS;

const run = async function() {
    // SET UP
    const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ROPSTEN_URL);
    const latestBlock = await provider.getBlock("latest");
    console.log("Latest block hash:", latestBlock.hash);

    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    let ETHbalance = await wallet.getBalance();
    console.log(hre.ethers.utils.formatEther(ETHbalance, 18));

    const ETHWrapperContract = new hre.ethers.Contract(ETHWrapperContractAddress, ETHWrapper.abi, wallet);
    
    const wethAddress =  await ETHWrapperContract.WETHToken();
    const tokenContract = new hre.ethers.Contract(wethAddress, WETH.abi, wallet);


    // INTERACT - WRAPPING 
    const wrapValue = hre.ethers.utils.parseEther("0.01");

    // const wrapTx = await ETHWrapperContract.wrap({value: wrapValue});
    const wrapTx = await wallet.sendTransaction(
        {to: ETHWrapperContractAddress, value: wrapValue})
    await wrapTx.wait();

    let balance = await tokenContract.balanceOf(wallet.address);
    console.log("Balance after wrapping: ", balance.toString());

    let contractETHBalance = await provider.getBalance(ETHWrapperContractAddress);
    console.log("Contract ETH balance after wrapping: ", contractETHBalance.toString());

    // INTERACT - UNWRAPPING
    // const approveTx = await tokenContract.approve(ETHWrapperContractAddress, wrapValue);
    // await approveTx.wait();

    // const unwrapTx = await ETHWrapperContract.unwrap(wrapValue);
    // await unwrapTx.wait();

    // balance = await tokenContract.balanceOf(wallet.address)
    // console.log("Balance after unwrapping: ", balance.toString());

    // contractETHBalance = await provider.getBalance(ETHWrapperContractAddress);
    // console.log("Contract ETH balance after unwrapping: ", contractETHBalance.toString());

};

run();
