import { Wallet, getDefaultProvider, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import { backersTable } from "$lib/model/BackersTable.js";
import { commentsTable } from "$lib/model/CommentsTable.js";
import fs from "fs";
import {
  SECRET_WALLET_PRIVATY_KEY,
  SECRET_PROJECT_TABLE_CONTRACT,
} from "$env/static/private";

export async function POST({ request }) {
  const { title, description, image, video, location, user_contract_id } =
    await request.json();
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
  const backers_table_name = await backersTable();
  const comments_table_name = await commentsTable();

  await contract.insertIntoTable(
    "id,title,description,image,video,location,user_contract_id,backers_table_name,comments_table_name",
    `'${id}','${title}','${description}','${image}','${video}','${location}','${user_contract_id}','${backers_table_name}','${comments_table_name}'`
  );
  console.log(await contract.getTableName());
  return new Response(JSON.stringify({ id: id }), { status: 200 });
}
