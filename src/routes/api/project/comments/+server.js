import { Wallet, getDefaultProvider, ethers } from "ethers";
import { Database } from "@tableland/sdk";
import { json } from "@sveltejs/kit";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import { SECRET_WALLET_PRIVATY_KEY } from "$env/static/private";

async function getCommentsId(db, comments_table_name) {
  const { results } = await db
    .prepare(`SELECT * FROM ${comments_table_name}`)
    .all();
  return results;
}

export async function POST({ request }) {
  const { tableName, userId, comment } = await request.json();

  console.log("I'm Here omen");
  const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
  const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);
  const signer = wallet.connect(provider);
  const db = new Database({ signer });

  const comments = await getCommentsId(db, tableName);
  const id = comments.length + 1;

  const { meta: insert } = await db
    .prepare(`INSERT INTO ${tableName} (id, user_id, val) VALUES (?, ?, ?);`)
    .bind(id, userId, comment)
    .run();
  await insert.txn?.wait();
  console.log("finish pai");
  return new Response(JSON.stringify({ res: "Susses" }), { status: 200 });
}
