import type { FastifyInstance, FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import type { OAuth2Namespace } from 'fastify-oauth2'
import type { GoogleUserInfo } from '../types'

import type { PrismaClient as PrismaClientType } from '@prisma/client'
// TODO look into this to fix this issue: https://stackoverflow.com/questions/44058101/typescript-declare-third-party-modules
// @ts-ignore: silly lack of common js or support or something
import pkg from '@prisma/client'
const { PrismaClient } = pkg

// TODO put this in a spot that makes more sense probably
declare module 'fastify' {
  export interface FastifyInstance {
    prisma: PrismaClientType
    isUserAllowed: (token: string) => Promise<string | void>
    googleOAuth2: OAuth2Namespace
    getGoogleProfileInfo: (token: string) => Promise<GoogleUserInfo>
    authorize: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    config: {
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      COOKIE_SECRET: string
      NODE_ENV: 'production' | 'development'
      SERVER_DOMAIN: string
      CLIENT_DOMAIN: string
    }
  }
  export interface FastifyRequest {
    user: { id: number } // probably make this match real user type at some point
  }
}

const prismaPlugin: FastifyPluginCallback = (app: FastifyInstance, _, done) => {
  const prisma: PrismaClientType = new PrismaClient()
  // use decorator to share prisma instance across application
  app.decorate('prisma', prisma)
  done()
}

export default fastifyPlugin(prismaPlugin, {
  name: 'prismaClient',
})
