import jwt from "jsonwebtoken";
import { SECRET_INGREDIENT } from "$env/static/private";
import  { findUserById}  from "$lib/findUserBy.js";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const authToken = event.cookies.get("authToken");
  try {
    if (!authToken) event.locals.authedUser = undefined;
    const claims = jwt.verify(authToken, SECRET_INGREDIENT);
    if (!claims) event.locals.authedUser = undefined;
    if (authToken && claims) {
      const fullUser = await findUserById(claims.authUser);
      event.locals.authedUser = fullUser[0];
    }
  } finally {
    const response = await resolve(event);
    return response;
  }
}
