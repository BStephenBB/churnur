import type { GoogleUserInfo } from '../types'
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from 'fastify'
import { OAuth2Namespace } from 'fastify-oauth2'

export default async function auth(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  app.get('/logout', {}, async (_, reply) => {
    reply.clearCookie('user_session', { path: '/' })
    // clear user id cookie too
    reply.clearCookie('user_id', { path: '/' })
    reply.redirect(302, 'http://localhost:3001/login/')
  })

  app.route({
    method: 'GET',
    url: '/login/google/callback',
    handler: onLoginCallback,
  })

  async function onLoginCallback(
    this: {
      googleOAuth2: OAuth2Namespace
      getGoogleProfileInfo: (token: string) => Promise<GoogleUserInfo>
      config: { NODE_ENV: 'production' | 'development' } // TODO type this better
    },
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { prisma, config, httpErrors } = app
    // TODO error handling, or maybe just pass in a callback for that. Prob just use try/catch though
    const token =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    const userInfo = await this.getGoogleProfileInfo(token.access_token) // TODO maybe check if `userInfo.email_verified` is true before making account

    // temporary email blocking
    const ALLOWED_EMAILS = ['sbrownbourne@gmail.com', 'bbchristo@gmail.com']
    if (!ALLOWED_EMAILS.includes(userInfo.email)) {
      throw httpErrors.unauthorized('Not an allowed account')
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        googleId: userInfo.sub,
      },
    })

    if (existingUser) {
      // make id cookie
      reply.setCookie('user_id', existingUser.id.toString(), {
        secure: this.config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: true,
        path: '/',
        signed: true,
        maxAge: 604_800, // one week in seconds
        expires: new Date(Date.now() + 604_800 * 1_000),
      })
    } else {
      // create new user
      const { email, name, family_name, given_name, sub, picture } = userInfo
      const newUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          firstName: given_name,
          lastName: family_name,
          googleId: sub,
          picture: picture,
        },
      })
      // make id cookie
      reply.setCookie('user_id', newUser.id.toString(), {
        secure: this.config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: true,
        path: '/',
        signed: true,
        maxAge: 604_800, // one week in seconds
        expires: new Date(Date.now() + 604_800 * 1_000),
      })
    }

    // make user session from google auth cookie
    reply.setCookie('user_session', token.access_token, {
      // The cookie should be sent only over https
      secure: this.config.NODE_ENV === 'production',
      // The cookie should not be accessible via js in the browser
      httpOnly: true,
      // The cookie should be sent only to this domain
      sameSite: true,
      path: '/',
      // The cookie should be signed (handled by `fastify-cookie`)
      signed: true,
      maxAge: 604_800, // one week in seconds
      expires: new Date(Date.now() + 604_800 * 1_000),
    })

    // reply.redirect(302, 'http://localhost:3001/')
    reply.redirect(302, `http://${config.CLIENT_DOMAIN}/`)
  }
}
