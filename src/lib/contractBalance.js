import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import { getDefaultProvider } from "ethers";
import { ethers } from "ethers";

export const contractBalance = async (contractId) => {
  const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
  const addressValue = ethers.utils.getAddress(contractId);
  const balance = await provider.getBalance(addressValue);

  const balanceInString = ethers.utils.formatEther(balance);
  return balanceInString;
};
