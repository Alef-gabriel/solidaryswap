import { Wallet, ethers } from "ethers";
import { Database } from "@tableland/sdk";
import { json } from "@sveltejs/kit";
import { filecoinTestnet } from "$lib/providers.js";
import { SECRET_FILECOIN_TESTNET_PRIVATE_KEY } from "$env/static/private";

async function getCommentsId(db, comments_table_name) {
  const { results } = await db
    .prepare(`SELECT * FROM ${comments_table_name}`)
    .all();
  return results;
}

export async function POST({ request }) {
  const { tableName, userId, comment } = await request.json();

  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);
  const signer = wallet.connect(provider);
  const db = new Database({ signer });

  const comments = await getCommentsId(db, tableName);
  const id = comments.length + 1;

  const { meta: insert } = await db
    .prepare(`INSERT INTO ${tableName} (id, user_id, val) VALUES (?, ?, ?);`)
    .bind(id, userId, comment)
    .run();
  await insert.txn?.wait();
  return new Response(JSON.stringify({ res: "Susses" }), { status: 200 });
}
