import { Wallet, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { filecoinTestnet } from "$lib/providers.js";
import fs from "fs";
import {
  SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
  SECRET_USER_TABLE_CONTRACT,
} from "$env/static/private";

export async function POST({ request, params }) {
  const { name, biography, image, location } = await request.json();

  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

  const compiled = JSON.parse(
    fs.readFileSync("artifacts/contracts/UsersTable.sol/UsersTable.json")
  );
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract(
    SECRET_USER_TABLE_CONTRACT,
    compiled.abi,
    signer
  );
  await contract.updateTable(
    `'${params.id}'`,
    `name='${name}',biography='${biography}',image='${image}',location='${location}'`
  );
  return new Response(JSON.stringify({ message: "Created" }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
