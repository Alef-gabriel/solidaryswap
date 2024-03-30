import { redirect } from "@sveltejs/kit";

export async function load({locals}) {
	if (!locals.authedUser) {
		return redirect(302, "/login")
	}
}