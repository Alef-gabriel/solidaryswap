import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import {
  SECRET_WALLET_PRIVATY_KEY,
  SECRET_PROJECT_TABLE_NAME,
} from "$env/static/private";


export const load = async ({ url }) => {
  const fetchProjects = async () => {
    let originalPageNumber = 1;
	const params = url.searchParams.get("page")
    if (params != undefined) originalPageNumber = params;

    const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
    const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const { results } = await db
      .prepare(
        `SELECT * FROM ${SECRET_PROJECT_TABLE_NAME} LIMIT 10 OFFSET ${
          (originalPageNumber - 1) * 10
        }`
      )
      .all();
    return results;
  };

  return {
    projects: await fetchProjects(),
  };
};
