import { Database } from "@tableland/sdk";
import { Wallet, ethers } from "ethers";
import { filecoinTestnet, botanixTestnet } from "$lib/providers.js";
import { contractBalance } from "$lib/contractBalance.js";
import fs from "fs";
import {
  SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
  SECRET_BOTANIX_TESTNET_PRIVATE_KEY,
  SECRET_PROJECT_TABLE_NAME,
  SECRET_USER_TABLE_NAME,
} from "$env/static/private";

const fetchProjects = async (params) => {
  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

  const signer = wallet.connect(provider);
  const db = new Database({ signer });

  const { results } = await db
    .prepare(
      `SELECT * FROM ${SECRET_PROJECT_TABLE_NAME} WHERE id='${params.id}'`
    )
    .all();
  return results;
};

export const load = async ({ params }) => {
  const project = await fetchProjects(params);

  const fetchUser = async (id) => {
    const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
    const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const { results } = await db
      .prepare(`SELECT * FROM ${SECRET_USER_TABLE_NAME} WHERE id='${id}'`)
      .all();
    return results;
  };

  const fetchComments = async (tableName) => {
    const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
    const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
    return results;
  };

  const backersLenght = async (contractId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(botanixTestnet);
      const addressValue = ethers.utils.getAddress(contractId);
      const wallet = new Wallet(SECRET_BOTANIX_TESTNET_PRIVATE_KEY, provider);

      const compiled = JSON.parse(
        fs.readFileSync("artifacts/contracts/Project.sol/Project.json")
      );
      const signer = wallet.connect(provider);
      const contract = new ethers.Contract(addressValue, compiled.abi, signer);

      const backersCount = await contract.getAddressCount();

      const backersCountString = backersCount.toString();
      return backersCountString;
    } catch (error) {
      console.error("Error invalid address:", error);
      return 0;
    }
  };

  return {
    project: project,
    owner: await fetchUser(project[0].user_contract_id),
    comments: await fetchComments(project[0].comments_table_name),
    balance: await contractBalance(project[0].project_contract_id),
    backers: await backersLenght(project[0].project_contract_id),
  };
};
