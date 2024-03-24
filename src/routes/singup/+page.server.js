import bcrypt from "bcrypt";
import { Wallet, getDefaultProvider, ethers } from "ethers";
import { json } from "@sveltejs/kit";
import { PUBLIC_PROVIDER_URL } from "$env/static/public";
import jwt from "jsonwebtoken";
import fs from "fs";
import { redirect } from "@sveltejs/kit";
import {
  SECRET_WALLET_PRIVATY_KEY,
  SECRET_USER_TABLE_CONTRACT,
  SECRET_INGREDIENT,
} from "$env/static/private";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");
	const name = data.get("name");

    const provider = getDefaultProvider(PUBLIC_PROVIDER_URL);
    const wallet = new Wallet(SECRET_WALLET_PRIVATY_KEY, provider);

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
    const encryptedEmail = await bcrypt.hash(email, salt);
    const id = btoa(encryptedEmail);

    await contract.insertIntoTable(
      "id,password, email, name",
      `'${id}','${hash}','${encryptedEmail}','${name}'`
    );
    const authToken = jwt.sign({ authUser: id }, SECRET_INGREDIENT, {
      expiresIn: "24h",
    });
    cookies.set("authToken", authToken, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
    });
    throw redirect(302, "/");
  },
};
