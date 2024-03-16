import { ethers } from "ethers";
import ProjectABI from "../../artifacts/contracts/Project.sol/Project.json";

export async function buyTokens(contractAddress, amount) {
  try {
    const uint256Value = ethers.BigNumber.from(contractAddress);

    // Convert uint256 to address
    const addressValue = ethers.utils.hexZeroPad(
      uint256Value.toHexString(),
      20
    );
    // Create a Web3Provider
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Request account access (prompts user)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(addressValue, ProjectABI.abi, signer);
    const valueToSend = ethers.utils.parseEther(amount);
    const transaction = await contract.buy({ value: valueToSend });
    return transaction.hash;
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}
