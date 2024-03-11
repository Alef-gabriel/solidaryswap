import bcrypt from "bcrypt";
import { json } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { redirect } from "@sveltejs/kit";
import { SECRET_SALT, SECRET_INGREDIENT } from "$env/static/private";
import { findUserByEmail } from "$lib/findUserByEmail.js";

export async function POST({ event, request }) {
  const { email, password } = await request.json();

  const encryptedEmail = bcrypt.genSalt(SECRET_SALT, function (err, salt) {
    return bcrypt.hash(email, salt, function (err, hash) {
      return hash;
    });
  });
  const user = findUserByEmail(encryptedEmail);
  const authAttempt = await bcrypt.compare(password, user.password);
  if (!authAttempt) {
    return new Response(JSON.stringify({ res: "Invalid email or password" }), {
      status: 200,
    });
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
  return new Response(JSON.stringify({ res: "Sucess" }), { status: 200 });
}
