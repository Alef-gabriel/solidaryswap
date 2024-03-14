import { Wallet, getDefaultProvider, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import fs from "fs";
import {
  SECRET_WALLET_PRIVATY_KEY,
  SECRET_USER_TABLE_CONTRACT,
} from "$env/static/private";

export async function POST({ request, params }) {
  const { name, biography, image, location } = await request.json();

  const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
  const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);

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
  console.log(await contract.getTableName());
  return new Response(JSON.stringify({ message: "Created" }), { status: 200 });
}
