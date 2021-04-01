async function routes(fastify, options) {
  fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" });
  });
}

module.exports = routes;
