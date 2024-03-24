import bcrypt from "bcrypt";
import { json } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import AES from "crypto-js/aes"
import { redirect } from "@sveltejs/kit";
import { SECRET_INGREDIENT, SECRET_PASSPHRASE } from "$env/static/private";
import { findUserByEmail } from "$lib/findUserBy.js";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ event, request }) => {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");

    const encryptedEmail = AES.encrypt(email, SECRET_PASSPHRASE);
    const user = await findUserByEmail(encryptedEmail);

    const authAttempt = await bcrypt.compare(password, user.password);
    if (!authAttempt) {
      return new Response(
        JSON.stringify({ res: "Invalid email or password" }),
        {
          status: 200,
        }
      );
    }
    if (authAttempt) {
      const { password, ...userAttempt } = user;
      const authToken = jwt.sign({ authUser: userAttempt }, SECRET_INGREDIENT, {
        expiresIn: "24h",
      });
      event.cookies.set("authToken", authToken, {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      throw redirect(302, "/");
    }
    return new Response(JSON.stringify({ res: "error" }), { status: 400 });
  },
};
