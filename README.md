# Marvel fighters api game
- [Swagger UI](https://characters-api.heroprotagonist32.workers.dev/)
- [ReDocs](https://characters-api.heroprotagonist32.workers.dev/docs)
### Implements this ["game"](./specs/implementation.pdf), and split it into api endpoints.

Just wanna check what is it? run in your terminal:
```
curl -X 'GET' 'https://characters-api.heroprotagonist32.workers.dev/api/game/full' -H 'accept: application/json' | jq
 ```

Utils used to build the api data at this [repo](https://github.com/carafelix/marvel-api-utils)

### Differences with the pdf:
- FB positive factor starts at 2
- If a team loses a member, the team alignment is recalculated. e.g: a 3-2 heros team loses 2 heros and becomes a 1-2 villain team. Equally balanced teams become neutral teams with a FB factor of 2
- FB is recalculated at every round, same goes for its random factor

## Features
- Server schema validation, returns error
- Rate limit (set to 30 request per minute for all endpoints, just for good measure)
- It is possible to hook a front-end chaining the api methods
    - getCharacters returns a list of characters
    - getFighters will take that list of characters and return a tuple of 2 teams
    - InitField takes that tuple and add's them into a BattleField
    - PlayRound takes a BattleField and returns the new State of the BattleField. can be done recursively feeding it's own output for advancing the battle until finished.

In reality the BattleField state should not be handled inside the client, besides it's schema being validated in the server, the server should store the state and receive different actions, also post request, and check if that action at that moment is valid, e.g: client selects to attack a character, check if that player is in turn and if that action is valid, updates the battlefield state, sends the update to the client.   

## Why and why's?
- Found it fun enough. 
- Why the chain is split like that? I taught to be necessary for hooking a front end with the following flow:
    - user request a character list
    - user selects it's desired's characters
    - fight starts
- initField and getFighters could be merged inside one single endpoint, but I preferred this way to test and learn the schema validations process.

## Disclaimer
- Code for fullgame and play round should reuse the same functions, but the part of this project I was interested was the request / schema validation
- Code readability for the logic parts of the game its indeed garbage, I was really more focus into the endpoint / request part of things. That part its okay. It's using class-based routes / schemas  

## should do
- add a same origin .request method (like Hono), to call inner endpoints like fetch but internally, to remove some code repetition. I think this is possible in itty router using [CORS](https://itty.dev/itty-router/cors). That would make indeed a request, instead of bypassing it, but would make code concise.

## Test
- run ```bun test```
