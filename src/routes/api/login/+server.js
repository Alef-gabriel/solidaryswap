import bcrypt from "bcrypt";
import { json } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { redirect } from "@sveltejs/kit";
import { SECRET_INGREDIENT } from "$env/static/private";
import { findUserByEmail } from "$lib/findUserBy.js";

export async function POST({ event, request }) {
  const { email, password } = await request.json();

  const user = await findUserByEmail(email);

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
    event.cookies.set("authToken", authToken, {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return redirect(302, "/");
  }
  return new Response(JSON.stringify({ res: "error" }), { status: 400 });
}
