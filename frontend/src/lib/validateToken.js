import jwt from "jsonwebtoken";
import { SECRET_INGREDIENT } from "$env/static/private";
import  { findUserById}  from "$lib/findUserBy.js";

export async function validateToken(authToken) {
  try {
    if (!authToken) return undefined;
    const claims = jwt.verify(authToken, SECRET_INGREDIENT);
    if (!claims) return undefined;
    if (authToken && claims) {
      const fullUser = await findUserById(claims.authUser);
      return fullUser[0];
    }
  } catch {
    return undefined;
  }
}
