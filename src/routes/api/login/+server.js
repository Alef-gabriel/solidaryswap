import bcrypt from "bcrypt";
import { json } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { SECRET_INGREDIENT } from "$env/static/private";
import { findUserByEmail } from "$lib/findUserBy.js";

export async function POST({ request }) {
  const { email, password } = await request.json();

  const user = await findUserByEmail(email);
  console.log(user)
  if (!user || user.length == 0) {
    return new Response(JSON.stringify({ res: "Invalid email or password" }), {
      status: 200,
    });
  }
  const authAttempt = await bcrypt.compare(password, user[0].password);
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
    return new Response(JSON.stringify({ authToken }), { status: 201 });
  }
  return new Response(JSON.stringify({ res: "error" }), { status: 400 });
}
