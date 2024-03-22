import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import { SECRET_WALLET_PRIVATY_KEY } from "$env/static/private";

export async function backersTable() {
  const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY);
  const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
  const signer = wallet.connect(provider);

  // Create a database connection
  const db = new Database({ signer });
  const prefix = "backers_table";
  const { meta: create } = await db
    .prepare(`CREATE TABLE ${prefix} (id integer primary key, user_id text);`)
    .run();
  await create.txn?.wait();

  const tableName = create.txn?.names[0] ?? "";
  return tableName;
}
