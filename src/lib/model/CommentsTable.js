import { Database } from "@tableland/sdk";
import { Wallet, ethers } from "ethers";
import { filecoinTestnet } from "$lib/providers.js";
import { SECRET_FILECOIN_TESTNET_PRIVATE_KEY } from "$env/static/private";

export async function commentsTable() {
  const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY);
  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const signer = wallet.connect(provider);

  // Create a database connection
  const db = new Database({ signer });
  const prefix = "comment_table";
  const { meta: create } = await db
    .prepare(
      `CREATE TABLE ${prefix} (id integer primary key, user_id text, val text);`
    )
    .run();
  await create.txn?.wait();

  const tableName = create.txn?.names[0] ?? "";
  return tableName;
}
