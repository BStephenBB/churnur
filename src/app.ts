import AutoLoad from 'fastify-autoload'
import Environment from 'fastify-env'
import S from 'fluent-json-schema'
import { join } from './desm.js'
import type { FastifyInstance, FastifyServerOptions } from 'fastify'

export default async function (
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  // fastify-autoload loads all plugins found in a directory and automatically configures routes matching the folder structure.
  //

  app.register(Environment, {
    schema: S.object()
      .prop('GOOGLE_CLIENT_ID', S.string().required())
      .prop('GOOGLE_CLIENT_SECRET', S.string().required())
      .valueOf(),
  })

  // register all plugins
  app.register(AutoLoad, {
    dir: join(import.meta.url, 'plugins'),
  })

  // register all routes
  app.register(AutoLoad, {
    dir: join(import.meta.url, 'routes'),
  })
}
