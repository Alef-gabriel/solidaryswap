import { botanixTestnet } from "$lib/providers.js";
import { ethers } from "ethers";

export async function POST({ request }) {
  const { contractId } = await request.json();
  try {
    const provider = new ethers.providers.JsonRpcProvider(botanixTestnet);
    const addressValue = ethers.utils.getAddress(contractId);
    const balance = await provider.getBalance(addressValue);

    const balanceInString = ethers.utils.formatEther(balance);
    return new Response(JSON.stringify({ ...balanceInString }), {
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({ res: "Error invalid address:" }), {
      status: 404,
    });
  }
}
