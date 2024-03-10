import { Wallet, getDefaultProvider, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import fs from "fs";
import {
  SECRET_WALLET_PRIVATY_KEY,
  SECRET_PROJECT_TABLE_CONTRACT,
} from "$env/static/private";

export async function POST({ request }) {
  const { title, description, image, video, location } = await request.json();
  const id = btoa(title);

  const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
  const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);

  console.log(SECRET_PROJECT_TABLE_CONTRACT);
  const compiled = JSON.parse(
    fs.readFileSync("artifacts/contracts/ProjectsTable.sol/ProjectsTable.json")
  );
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract(
    SECRET_PROJECT_TABLE_CONTRACT,
    compiled.abi,
    signer
  );
  await contract.insertIntoTable(
    "id,title,description,image,video,location",
    `'${id}','${title}','${description}','${image}','${video}','${location}'`
  );
  console.log(await contract.getTableName());
  return new Response(JSON.stringify({ id: id }), { status: 200 });
}
