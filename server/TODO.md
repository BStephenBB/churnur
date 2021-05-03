- figure out how to get oauth working
- figure out how to get permissoins working
- build endpoints to:
	- create user (oauth)
	- login as user (oauth)
	- delete a card

- coors?
- proper sessions and refresh?
- do I need to keep track of the token?
- rate limiting
- cloudflare?
- use `fluent-json-schema` package for all schema probably
- figure out a way to generate schema from types
- settup swagger or something similar so don't need to use postman
- look into relative routes etc.
- set up nice command to run everything, like nodemon, or that other tool


- make readme with steps to run
# in server folder
1. docker compose up # for db
2. npm run dev # for typescript compilation TODO, maybe use nodejs or something
3. npm run start # for running fastify server
# in client folder
1. npm run dev # to run nextjs server in dev mode
