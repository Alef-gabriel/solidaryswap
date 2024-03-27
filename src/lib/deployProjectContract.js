import { botanixTestnet } from "./providers.js";
import * as project from "../../artifacts/contracts/Project.sol/Project.json";
import { Wallet, ethers } from "ethers";
import {
  SECRET_BOTANIX_TESTNET_PRIVATE_KEY,
  SECRET_WALLET_ADDRESS,
} from "$env/static/private";

export async function deployProjectContract() {
  const provider = new ethers.providers.JsonRpcProvider(botanixTestnet);
  const wallet = new Wallet(SECRET_BOTANIX_TESTNET_PRIVATE_KEY, provider);
  const signer = wallet.connect(provider);

  const contractFactory = new ethers.ContractFactory(
    project.abi,
    project.bytecode,
    signer
  );

  const addressValue = ethers.utils.getAddress(SECRET_WALLET_ADDRESS);
  const contract = await contractFactory.deploy(addressValue);
  return contract.address;
}
