import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

export const load = async () => {
  const fetchProjects = async () => {
    const privateKey =
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const provider = getDefaultProvider("http://127.0.0.1:8545");
    const wallet = new Wallet(privateKey, provider);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const tableName = "table_attributes_31337_2";
    const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
    return results;
  };

  return {
    projects: await fetchProjects(),
  };
};
