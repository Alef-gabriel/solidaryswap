import { botanixTestnet } from "./providers";
import { ethers } from "ethers";

export const contractBalance = async (contractId) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(botanixTestnet);
    const addressValue = ethers.utils.getAddress(contractId);
    const balance = await provider.getBalance(addressValue);

    const balanceInString = ethers.utils.formatEther(balance);
    return balanceInString;
  } catch (error) {
    console.error("Error invalid address:", error);
    return 0;
  }
};
