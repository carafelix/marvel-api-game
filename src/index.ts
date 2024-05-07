import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import {
	getOneCharacter,
	getCharacters,
	getFighters,
	getOneFighter,
	playRound,
	fullGame
} from "./routes/routes";

const router = OpenAPIRouter({
	docs_url: "/",
	redoc_url: "/docs"
});

router.get("/api/characters", getCharacters);
router.get("/api/characters/:characterName", getOneCharacter);
router.get("/api/fighters", getFighters)
router.get("/api/fighters/:id", getOneFighter)

router.post("/api/game/playRound", playRound )
router.get("/api/game/full", fullGame)




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
	async fetch(request: Request, env: Env) {
		const { success } = await env.MY_RATE_LIMITER.limit({ key: '/*' })
		if (!success) {
			return new Response(`429 Failure: Too many Request's. Try again later.`, { status: 429 })
		}
		return await router.handle(request)
	}
};
