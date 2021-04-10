import { join } from "./desm.js";

export default async function (app, options) {
  // fastify-autoload loads all plugins found in a directory and automatically configures routes matching the folder structure.
  app.register(import("fastify-autoload"), {
    dir: join(import.meta.url, "routes"),
  });
}
