// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";
import { Wallet, getDefaultProvider } from "ethers";

async function main() {
  const privateKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const provider = getDefaultProvider("http://127.0.0.1:8545");
  const wallet = new Wallet(privateKey, provider);

  const contractFactory = await hre.ethers.getContractFactory(
    "ProjectTable",
    wallet
  );

  const contract = await contractFactory.deploy();

  console.log(`ProjectTable deployed to ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
