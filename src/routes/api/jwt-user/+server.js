import jwt from "jsonwebtoken";
import { SECRET_INGREDIENT } from "$env/static/private";

/** @type {import('@sveltejs/kit').Handle} */
export async function POST({ request }) {
  const { authToken } = await request.json();
  try {
    const claims = jwt.verify(authToken, SECRET_INGREDIENT);
    if (!claims) {
      return new Response(JSON.stringify({ res: "error user not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ user: claims.authUser[0] }), {
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({ res: "error" }), {
      status: 500,
    });
  }
}
