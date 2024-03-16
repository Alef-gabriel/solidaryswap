export async function load({ locals }) {
  const getLocals = () => {
    let authedUser = undefined;
    if (locals.authedUser) {
      authedUser = locals.authedUser;
    }
    console.log("Locals ", authedUser);
    return authedUser;
  };
  return {
    authedUser: getLocals(),
  };
}
