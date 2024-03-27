// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";
import { Wallet, ethers } from "ethers";
import { filecoinTestnet } from "../src/lib/providers.js";
import fs from "fs";
import "dotenv/config";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const wallet = new Wallet(
    process.env.SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
    provider
  );

  const contractFactory = await hre.ethers.getContractFactory(
    "SolidarySwap",
    wallet
  );

  const contract = await contractFactory.deploy();
  console.log(`SolidarySwap deployed to ${contract.address}`);
  contract.connect(wallet);
  const projectContractId = await contract.getProjectsContractId();
  console.log(`ProjectTable contract Id ${projectContractId}`);

  const compiled = JSON.parse(
    fs.readFileSync("artifacts/contracts/ProjectsTable.sol/ProjectsTable.json")
  );
  const signer = wallet.connect(provider);
  const projectContract = new ethers.Contract(
    projectContractId,
    compiled.abi,
    signer
  );
  console.log(`ProjectTable name ${await projectContract.getTableName()}`);

  const userContractId = await contract.getUsersContractId();
  console.log(`UserTable contract Id ${userContractId}`);

  const userCompiled = JSON.parse(
    fs.readFileSync("artifacts/contracts/UsersTable.sol/UsersTable.json")
  );
  const userContract = new ethers.Contract(
    userContractId,
    userCompiled.abi,
    signer
  );
  console.log(`ProjectTable name ${await userContract.getTableName()}`);
  //process.env.PUBLIC_CONTRACT_ADDRESS = contract.address;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
