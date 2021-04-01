// const fastify = require("fastify")({
//   logger: true,
// });

// module.exports = start = async (fastify, options) => {
//   fastify.register(require("./out-first-route"));
//   try {
//     await fastify.listen(3000);
//   } catch (error) {
//     fastify.log.error(error);
//     process.exit(1);
//   }
// };
// // start();

"use strict";
module.exports = async function (fastify, opts) {
  fastify.get("/", async (request, reply) => {
    return { hello: "yeeeeee" };
  });
};
