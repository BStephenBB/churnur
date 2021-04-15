import { join } from './desm.js'
import type { FastifyInstance, FastifyServerOptions } from 'fastify'

export default async function (
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  // fastify-autoload loads all plugins found in a directory and automatically configures routes matching the folder structure.

  // register all plugins
  app.register(import('fastify-autoload'), {
    dir: join(import.meta.url, 'plugins'),
  })

  // register all routes
  app.register(import('fastify-autoload'), {
    dir: join(import.meta.url, 'routes'),
  })
}
