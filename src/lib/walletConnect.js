import { ethers } from "ethers";
import ProjectABI from "../../artifacts/contracts/Project.sol/Project.json";

export async function buyTokens(encodedAddress, amount) {
  try {
    const decodedAddress = ethers.utils.getAddress(encodedAddress);
    // Create a Web3Provider
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    console.log("Address of contract: ", decodedAddress);
    // Request account access (prompts user)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      decodedAddress,
      ProjectABI.abi,
      signer
    );

    const valueToSend = ethers.utils.parseEther(amount);
    const transaction = await contract.buy({
      value: valueToSend,
      gasLimit: 300000,
    });
    return transaction.hash;
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}

export async function deposit(contractAddress, amount) {
  try {
    const addressValue = ethers.utils.getAddress(contractAddress);
    // Create a Web3Provider
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Request account access (prompts user)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressValue, ProjectABI.abi, signer);
    const valueToSend = ethers.utils.parseEther(amount);
    const transaction = await contract.deposit({
      value: valueToSend,
      gasLimit: 210000,
    });

    return transaction.hash;
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}