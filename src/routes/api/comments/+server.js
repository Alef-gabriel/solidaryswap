import { Database } from "@tableland/sdk";
import { Wallet, ethers } from "ethers";
import { filecoinTestnet } from "$lib/providers.js";
import { SECRET_FILECOIN_TESTNET_PRIVATE_KEY } from "$env/static/private";

export async function POST({ request }) {
  const { tableName } = await request.json();
  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

  const signer = wallet.connect(provider);
  const db = new Database({ signer });

  const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
  return new Response(JSON.stringify({ res: results }), {
    status: 200,
  });
}
