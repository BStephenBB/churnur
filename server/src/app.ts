import AutoLoad from 'fastify-autoload'
import Environment from 'fastify-env'
import Sensible from 'fastify-sensible'
import UnderPressue from 'under-pressure'
import S from 'fluent-json-schema'
import Cors from 'fastify-cors'
import { join } from './desm.js'
import type { FastifyInstance, FastifyServerOptions } from 'fastify'

export default async function (
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  // fastify-autoload loads all plugins found in a directory and automatically configures routes matching the folder structure.

  // register env variables, configuration will be available under `fastify.config`
  app.register(Environment, {
    schema: S.object()
      .prop('GOOGLE_CLIENT_ID', S.string().required())
      .prop('GOOGLE_CLIENT_SECRET', S.string().required())
      .prop('COOKIE_SECRET', S.string().required())
      .valueOf(),
  })

  // add small useful utilitis, like nice http errors to fastify, since fastify is extremely lightweight
  app.register(Sensible)

  // register all plugins
  app.register(AutoLoad, {
    dir: join(import.meta.url, 'plugins'),
  })

  // load management
  app.register(UnderPressue, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1_000_000_000,
    maxRssBytes: 1_000_000_000,
    maxEventLoopUtilization: 0.98,
  })

  // Enable the use of CORS
  // https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
  app.register(Cors, {
    // origin: false, // TODO turn this on in dev
    origin: 'http://localhost:3001', // TODO turn this on in dev (or change the origin)
  })

  // register all routes
  app.register(AutoLoad, {
    dir: join(import.meta.url, 'routes'),
  })
}
