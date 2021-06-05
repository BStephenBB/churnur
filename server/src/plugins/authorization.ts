import fastifyPlugin from 'fastify-plugin'
import OAuth from 'fastify-oauth2'
import Cookie from 'fastify-cookie'
import Csrf from 'fastify-csrf'
import undici from 'undici'
import type { GoogleUserInfo } from '../types'
import type {
  FastifyServerOptions,
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify'

async function authorization(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  const { httpErrors, config } = app

  const userInfoClient = undici('https://openidconnect.googleapis.com', {}) // TODO types?? also url

  app.register(OAuth, {
    name: 'googleOAuth2',
    credentials: {
      client: {
        id: config.GOOGLE_CLIENT_ID,
        secret: config.GOOGLE_CLIENT_SECRET,
      },
      auth: OAuth.GOOGLE_CONFIGURATION,
    },
    // register a fastify url to start the redirect flow
    startRedirectPath: '/login/google',
    // google redirect here after the user logs in
    // callbackUri: `http://localhost:3000/login/google/callback`, // TODO change if in prod? this is where they go afterwards I think?
    callbackUri: `http${config.NODE_ENV === 'development' ? '' : 's'}://${
      config.SERVER_DOMAIN
    }/login/google/callback`, // TODO change if in prod → just change env variables in prod
    scope: ['email', 'profile'], // TODO maybe 'userinfo' instead of just user see https://developers.google.com/identity/protocols/oauth2/scopes#oauth2
  })

  // TODO look into what this secret is for
  app.register(Cookie, {
    secret: config.COOKIE_SECRET,
  })

  // When using session w/ cookies, should use CSRF
  app.register(Csrf, {
    sessionPlugin: 'fastify-cookie',
    cookieOpts: { signed: true },
  })

  app.decorate('authorize', authorize)

  app.decorate('isUserAllowed', isUserAllowed)

  app.decorate('getGoogleProfileInfo', getGoogleProfileInfo)

  // decorate each request with the user
  app.decorateRequest('user', null)

  async function authorize(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { user_session, user_id } = request.cookies
    if (!user_session) {
      throw httpErrors.unauthorized('Missing session cookie')
    }

    const cookie = request.unsignCookie(user_session)
    if (!cookie.valid) {
      throw httpErrors.unauthorized('Invalid cookie signature')
    }

    if (cookie.value === null) {
      throw httpErrors.unauthorized('missing cookie vaule')
    }

    try {
      const isAllowed = await app.isUserAllowed(cookie.value) // TODO better way to do this
      const userId = request.unsignCookie(user_id)
      if (isAllowed && userId.value) {
        request.user = { id: Number(userId.value) }
      } else {
        // TODO here is where we should get the user from their googleID from db (needs to be returned from isUserAllowed), and then set
      }
    } catch (error) {
      request.log.warn(
        `Invalid user tried to authenticate: ${JSON.stringify(error.user)}`
      )
      // clear the cookie as well in case of errors:
      // this way if a user retries the request we'll have an additional request to Google
      reply.clearCookie('user_session', { path: '/' })
      // clear user id cookie too
      reply.clearCookie('user_id', { path: '/' })
      throw error
    }
  }

  async function isUserAllowed(token: string): Promise<boolean | void> {
    const response = await userInfoClient.request({
      method: 'GET',
      path: '/v1/userinfo',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.statusCode >= 400) {
      throw httpErrors.unauthorized('Authenticate again')
    } else {
      // if the reponse didn't fail, user must be allowed
      return true
    }

    // let payload: any = ''
    // response.body.setEncoding('utf8')
    // for await (const chunk of response.body) {
    //   payload += chunk
    // }
    // payload = JSON.parse(payload)

    // const allowedUsers = ['sbrownbourne@gmail.com']
    // const isAllowed = payload.some((element: any) =>
    //   allowedUsers.includes(element.email)
    // )
    // if (!isAllowed) {
    //   const error = httpErrors.forbidden('You are not allowed to access this')
    //   // let's store the user info so we can log them later
    //   error.user = payload
    //   throw error
    // }

    // for (const element of payload) {
    //   if (element.primary) {
    //     return element.email
    //   }
    // }
    // throw httpErrors.badRequest('The user does not have a primary email')
  }

  // TODO probably just move this to the user section
  async function getGoogleProfileInfo(token: string): Promise<GoogleUserInfo> {
    const response = await userInfoClient.request({
      method: 'GET',
      path: '/v1/userinfo',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.statusCode >= 400) {
      throw httpErrors.unauthorized('Authenticate again')
    }

    let payload: any = ''
    response.body.setEncoding('utf8')
    for await (const chunk of response.body) {
      payload += chunk
    }
    payload = JSON.parse(payload) // TODO really need to log this out and figure out what the types are
    return payload
  }
}

export default fastifyPlugin(authorization, {
  name: 'authorization',
})
