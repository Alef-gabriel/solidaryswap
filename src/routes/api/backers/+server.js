import { Wallet, ethers } from "ethers";
import { botanixTestnet } from "$lib/providers.js";
import fs from "fs";
import { SECRET_BOTANIX_TESTNET_PRIVATE_KEY } from "$env/static/private";

export async function POST({ request }) {
  try {
    const { contractId } = await request.json();
    const provider = new ethers.providers.JsonRpcProvider(botanixTestnet);
    const addressValue = ethers.utils.getAddress(contractId);
    const wallet = new Wallet(SECRET_BOTANIX_TESTNET_PRIVATE_KEY, provider);

    const compiled = JSON.parse(
      fs.readFileSync("artifacts/contracts/Project.sol/Project.json")
    );
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(addressValue, compiled.abi, signer);

    const backersCount = await contract.getAddressCount();

    const backersCountString = backersCount.toString();
    return new Response(JSON.stringify({ backersCount: backersCountString }), {
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({ res: "Error invalid address:" }), {
      status: 404,
    });
  }
}
