import bcrypt from "bcrypt";
import { Wallet, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { filecoinTestnet } from "$lib/providers.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import { redirect } from "@sveltejs/kit";
import {
  SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
  SECRET_USER_TABLE_CONTRACT,
  SECRET_INGREDIENT,
} from "$env/static/private";

export async function POST({ request }) {
  const { email, password, name } = await request.json();
  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

  const compiled = JSON.parse(
    fs.readFileSync("artifacts/contracts/UsersTable.sol/UsersTable.json")
  );
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract(
    SECRET_USER_TABLE_CONTRACT,
    compiled.abi,
    signer
  );

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const id = btoa(email);

  await contract.insertIntoTable(
    "id,password, email, name",
    `'${id}','${hash}','${email}','${name}'`
  );
  const authToken = jwt.sign({ authUser: id }, SECRET_INGREDIENT, {
    expiresIn: "24h",
  });
  return new Response(JSON.stringify({ authToken }), {
    status: 201,
  });
}
