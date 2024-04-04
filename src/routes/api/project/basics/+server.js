import { Wallet, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { filecoinTestnet } from "$lib/providers.js";
import { backersTable } from "$lib/model/BackersTable.js";
import { commentsTable } from "$lib/model/CommentsTable.js";
import fs from "fs";
import {
  SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
  SECRET_PROJECT_TABLE_CONTRACT,
} from "$env/static/private";

export async function POST({ request }) {
  const {
    title,
    description,
    image,
    video,
    location,
    user_contract_id,
    category,
    subCategory,
    goal,
  } = await request.json();
  const id = btoa(title);

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

  const backers_table_name = await backersTable();
  const comments_table_name = await commentsTable();

  await contract.insertIntoTable(
    "id,title,description,image,video,location,user_contract_id,backers_table_name,comments_table_name, category, sub_category, goal",
    `'${id}','${title}','${description}','${image}','${video}','${location}','${user_contract_id}','${backers_table_name}','${comments_table_name}','${category}','${subCategory}','${goal}'`
  );
  return new Response(JSON.stringify({ id: id }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
