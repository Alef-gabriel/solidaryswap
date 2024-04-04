import { Wallet, ethers } from "ethers";
import { Database } from "@tableland/sdk";
import { json } from "@sveltejs/kit";
import { filecoinTestnet } from "$lib/providers.js";
import { SECRET_FILECOIN_TESTNET_PRIVATE_KEY } from "$env/static/private";

async function getBackersId(db, backers_table_name) {
  const { results } = await db
    .prepare(`SELECT * FROM ${backers_table_name}`)
    .all();
  return results;
}

export async function POST({ request }) {
  const { tableName, transaction, user_id } = await request.json();

  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);
  const signer = wallet.connect(provider);
  const db = new Database({ signer });

  const backers = await getBackersId(db, tableName);
  const id = backers.length + 1;

  const { meta: insert } = await db
    .prepare(`INSERT INTO ${tableName} (id, user_id) VALUES (?, ?);`)
    .bind(id, user_id)
    .run();
  await insert.txn?.wait();
  return new Response(JSON.stringify({ res: "Susses" }), {
    status: 201,
  });
}
