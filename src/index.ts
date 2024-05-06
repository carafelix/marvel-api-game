import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { CharacterFetch } from "./endpoints/characterFetch";
import { CharacterList } from "./endpoints/characterList";

export const router = OpenAPIRouter({
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

export default {
	fetch: router.handle,
};
