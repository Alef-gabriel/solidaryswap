import jwt from "jsonwebtoken";
import { json } from "@sveltejs/kit";
import { SECRET_INGREDIENT } from "$env/static/private";

export async function POST({ request }) {
  const { authToken } = await request.json();
  console.log(authToken);
  const claims = jwt.verify(authToken, SECRET_INGREDIENT);
  console.log(claims);
  if (!claims) {
    return new Response(JSON.stringify({ res: "error user not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify({ user: claims.authUser[0] }), {
    status: 200,
  });
}
