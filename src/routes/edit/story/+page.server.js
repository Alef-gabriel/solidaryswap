import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const getLocals = () => {
    let authedUser = locals.authedUser;
    if (!authedUser) {
      throw redirect(302, "/login");
    }
    return authedUser;
  };
  return {
    authedUser: getLocals(),
  };
}
