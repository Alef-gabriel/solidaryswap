import { Database } from "@tableland/sdk";
import { Wallet, ethers } from "ethers";
import { redirect } from "@sveltejs/kit";
import { filecoinTestnet } from "$lib/providers.js";
import {
  SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
  SECRET_PROJECT_TABLE_NAME,
} from "$env/static/private";

export const load = async ({ params, locals }) => {
  const getLocals = () => {
    let authedUser = locals.authedUser;
    if (!authedUser) {
      throw redirect(302, "/login");
    }
    return authedUser;
  };

  const fetchProjects = async () => {
    const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
    const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const { results } = await db
      .prepare(
        `SELECT * FROM ${SECRET_PROJECT_TABLE_NAME} WHERE id='${params.projectId}'`
      )
      .all();
    return results;
  };

  return {
    project: await fetchProjects(),
    authedUser: getLocals(),
  };
};
