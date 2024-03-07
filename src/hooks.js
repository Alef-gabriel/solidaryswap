import "dotenv/config";
import { Wallet, getDefaultProvider, ethers } from "ethers";
import fs from "fs";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const provider = getDefaultProvider(process.env.PROVIDER_URL);
  const wallet = new Wallet(process.env.WALLET_PRIVATY_KEY, provider);

  const contractAddress = process.env.CONTRACT_ADDRESS;
  const compiled = JSON.parse(
    fs.readFileSync("artifacts/contracts/SolidarySwap.sol/SolidarySwap.json")
  );
  const contract = new ethers.Contract(contractAddress, compiled.abi, provider);
  contract.connect(wallet);
  event.cookies.set(
    "projectContractId",
    await contract.getProjectsContractId(),
    {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    }
  );
  event.cookies.set("userContractId", await contract.getUsersContractId(), {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  const response = await resolve(event);
  return response;
}
