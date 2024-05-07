import { OpenAPIRouter} from "@cloudflare/itty-router-openapi";
import { getOneCharacter, getCharacters } from "./routes/routes";
import { getOneFighter } from "routes/getOneFighter";
import { getOneTeam } from "routes/getOneTeam";

const router = OpenAPIRouter({
	docs_url: "/docs",
	redoc_url: "/"
});

router.get("/api/characters/", getCharacters);
router.get("/api/characters/:characterName/", getOneCharacter);

router.get("api/fighters/getOne", getOneFighter)
router.post("api/team/getOne", getOneTeam )
router.get("api/game/fightRound", )


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
