import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { CharacterFetch } from "./endpoints/characterFetch";
import { CharacterList } from "./endpoints/characterList";
import { Env } from "types";

const router = OpenAPIRouter({
	docs_url: "/",
});

router.get("/api/characters/", CharacterList);
router.get("/api/characters/:characterName/", CharacterFetch);

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

router.handle

export default {
	async fetch(request: Request, env: Env) {
		const { success } = await env.MY_RATE_LIMITER.limit({ key: '/*' })
		if (!success) {
			return new Response(`429 Failure: rate limit exceeded for /*`, { status: 429 })
		}
		return await router.handle(request)
	}
};
