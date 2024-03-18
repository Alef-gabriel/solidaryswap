import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import {
  SECRET_WALLET_PRIVATY_KEY,
  SECRET_PROJECT_TABLE_NAME,
  SECRET_USER_TABLE_NAME,
} from "$env/static/private";

const fetchProjects = async (params) => {
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

export const load = async ({ params, locals }) => {
  const project = await fetchProjects(params);

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

  const fetchComments = async (tableName) => {
    const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
    const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
    return results;
  };

  const getLocals = () => {
    let authedUser = undefined;
    if (locals.authedUser) {
      authedUser = locals.authedUser;
    }
    console.log("Locals o Project ", authedUser);
    return authedUser;
  };

  return {
    project: project,
    owner: await fetchUsers(),
    comments: await fetchComments(project[0].comments_table_name),
    authedUser: getLocals(),
  };
};
