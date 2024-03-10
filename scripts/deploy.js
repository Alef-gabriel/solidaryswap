// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";
import { Wallet, getDefaultProvider } from "ethers";
import "dotenv/config"

async function main() {
  const provider = getDefaultProvider(process.env.PUBLIC_PROVIDER_URL);
  const wallet = new Wallet(process.env.SECRET_WALLET_PRIVATY_KEY, provider);

  const contractFactory = await hre.ethers.getContractFactory(
    "SolidarySwap",
    wallet
  );

  const contract = await contractFactory.deploy();
  process.env.PUBLIC_CONTRACT_ADDRESS = contract.address;
  console.log(`SolidarySwap deployed to ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
