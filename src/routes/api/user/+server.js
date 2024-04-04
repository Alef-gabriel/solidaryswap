import { findUserById } from "$lib/findUserBy.js";

export async function POST({ request }) {
  const { userId } = await request.json();
  const users = await findUserById(userId);
  const user = users[0];
  return new Response(JSON.stringify({ user: user }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
