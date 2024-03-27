import { Wallet, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { filecoinTestnet } from "$lib/providers";
import fs from "fs";
import {
  SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
  SECRET_PROJECT_TABLE_CONTRACT,
} from "$env/static/private";

export async function POST({ request, params }) {
  const { data } = await request.json();

  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

  const compiled = JSON.parse(
    fs.readFileSync("artifacts/contracts/ProjectsTable.sol/ProjectsTable.json")
  );
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract(
    SECRET_PROJECT_TABLE_CONTRACT,
    compiled.abi,
    signer
  );
  await contract.updateTable(`'${params.id}'`, `data='${data}'`);
  return new Response(JSON.stringify({ id: params.id }), { status: 200 });
}
