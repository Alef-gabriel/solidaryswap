import { Wallet, getDefaultProvider, ethers } from "ethers";
import { Database } from "@tableland/sdk";
import { json } from "@sveltejs/kit";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import { SECRET_WALLET_PRIVATY_KEY } from "$env/static/private";

async function getBackersId(db, backers_table_name) {
  const { results } = await db
    .prepare(`SELECT * FROM ${backers_table_name}`)
    .all();
  return results;
}

async function isValidTransaction(provider, transaction) {
  const transactionReceipt = await provider.getTransactionReceipt(transaction);

  if (transactionReceipt.status != 1) {
    console.log("Transaction failed!");
    return false;
  }
  return true;
}

export async function POST({ request }) {
  const { tableName, transaction, user_id } = await request.json();

  console.log("I'm Here omen");
  const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
  const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);
  const signer = wallet.connect(provider);
  const db = new Database({ signer });

  const backers = await getBackersId(db, tableName);
  const id = backers.length + 1;

    if (!isValidTransaction(provider, transaction)) {
      throw new Error("Signed transaction doesn't match retrieved transaction");
    }
  const { meta: insert } = await db
    .prepare(`INSERT INTO ${tableName} (id, user_id) VALUES (?, ?);`)
    .bind(id, user_id)
    .run();
  await insert.txn?.wait();
  console.log("finish pai");
  return new Response(JSON.stringify({ res: "Susses" }), { status: 200 });
}
