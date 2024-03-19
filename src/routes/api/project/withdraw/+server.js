import { Wallet, getDefaultProvider, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import fs from "fs";
import { validateToken } from "$lib/validateToken.js";
import { SECRET_WALLET_PRIVATY_KEY } from "$env/static/private";

export async function POST({ request, cookies }) {
  const { contractAddress, amount, walletToRecive, project_user_id } =
    await request.json();

  const authToken = cookies.get("authToken")
  const user = await validateToken(authToken);

  if (user == undefined || user.id != project_user_id) {
    return new Response(JSON.stringify({ res: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const addressValue = ethers.utils.getAddress(contractAddress);
    const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
    const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);

    const compiled = JSON.parse(
      fs.readFileSync("artifacts/contracts/Project.sol/Project.json")
    );
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(addressValue, compiled.abi, signer);
    const uintValue = ethers.utils.parseEther(amount);

    await contract.withdraw(walletToRecive, uintValue, {
      gasLimit: 210000,
    });
    return new Response(JSON.stringify({ res: "Susses" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ res: error }), { status: 500 });
  }
}
