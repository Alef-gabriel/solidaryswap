import bcrypt from "bcrypt";
import { Wallet, getDefaultProvider, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import fs from "fs";
import {
  SECRET_WALLET_PRIVATY_KEY,
  SECRET_PROJECT_TABLE_CONTRACT,
  SECRET_SALT,
} from "$env/static/private";

export async function POST({ request }) {
  const { name, email, data, password, location } = await request.json();

  const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
  const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);

  console.log(SECRET_PROJECT_TABLE_CONTRACT);
  const compiled = JSON.parse(
    fs.readFileSync("artifacts/contracts/UsersTable.sol/UsersTable.json")
  );
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract(
    SECRET_PROJECT_TABLE_CONTRACT,
    compiled.abi,
    signer
  );

  const id = btoa(name);

  const encryptedPassword = bcrypt.genSalt(SECRET_SALT, function (err, salt) {
    return bcrypt.hash(password, salt, function (err, hash) {
      return hash;
    });
  });

  const encryptedEmail = bcrypt.genSalt(SECRET_SALT, function (err, salt) {
    return bcrypt.hash(email, salt, function (err, hash) {
      return hash;
    });
  });

  await contract.insertIntoTable(
    "id,name,email,data,password,location",
    `'${id}','${name}','${encryptedEmail}','${data}','${encryptedPassword}','${location}'`
  );
  console.log(await contract.getTableName());
  return new Response(JSON.stringify({ id: id }), { status: 200 });
}
