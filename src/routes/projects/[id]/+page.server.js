import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import {
  SECRET_WALLET_PRIVATY_KEY,
  SECRET_PROJECT_TABLE_NAME,
  SECRET_USER_TABLE_NAME,
} from "$env/static/private";

export const load = async ({ params, locals }) => {
  //TODO: create function to SELECT on Users with project table user id
  const fetchProjects = async () => {
    const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
    const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const { results } = await db
      .prepare(
        `SELECT * FROM ${SECRET_PROJECT_TABLE_NAME} WHERE id='${params.id}'`
      )
      .all();
    return results;
  };

  const fetchUsers = async () => {
    let authedUser = locals.authedUser;
    if (!authedUser) {
      return undefined;
    }

    const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
    const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const { results } = await db
      .prepare(
        `SELECT * FROM ${SECRET_USER_TABLE_NAME} WHERE id='${authedUser.id}'`
      )
      .all();
    return results;
  };
  return {
    project: await fetchProjects(),
    owner: await fetchUsers(),
  };
};
