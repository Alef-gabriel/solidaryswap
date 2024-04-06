import { Database } from "@tableland/sdk";
import { Wallet, ethers } from "ethers";
import { filecoinTestnet } from "$lib/providers.js";
import { error } from "@sveltejs/kit";
import {
  SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
  SECRET_PROJECT_TABLE_NAME,
} from "$env/static/private";

export async function POST({ request }) {
  const { originalPageNumber } = await request.json();
  try {
    const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
    const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const { results } = await db
      .prepare(
        `SELECT * FROM ${SECRET_PROJECT_TABLE_NAME} LIMIT 10 OFFSET ${
          (originalPageNumber - 1) * 10
        }`
      )
      .all();
    return new Response(JSON.stringify({ res: results }), {
      status: 200,
    });
  } catch (err) {
    error(404, {
      message: "Contract Not deployed",
    });
  }
}
