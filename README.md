# Marvel fighters api game
- (Swagger UI)[https://characters-api.heroprotagonist32.workers.dev/]
- (ReDocs)[https://characters-api.heroprotagonist32.workers.dev/docs]
### Implements this ["game"](./specs/implementation.pdf), and split it into api endpoints.
### Differences with the pdf:
- FB positive factor starts at 2
- If a team loses a member, the team alignment is recalculated. e.g: a 3-2 heros team loses 2 heros and becomes a 1-2 villain team. Equally balanced teams become neutral teams with a FB factor of 2
- FB is recalculated at every round, same goes for its random factor

## Features
- Server schema validation, returns error
- Rate limit (set to 30 request every 60 seconds for all endpoints, just for good measure)
- It is possible to hook a front-end chaining the api methods
    - getFighters returns a list of characters
    - InitField takes a list of characters and add's them into a BattleField
    - PlayRound takes a BattleField and returns the new State of the BattleField.

## should do
- add a same origin .request method (like Hono), to call inner endpoints like fetch but internally, to remove some code repetition. I think this is possible in itty router using [CORS](https://itty.dev/itty-router/cors). That would make indeed a request, instead of bypassing it, but would make code concise.

## Test
- run ```bun test```