import fastifyPlugin from 'fastify-plugin'
import OAuth from 'fastify-oauth2'
import Cookie from 'fastify-cookie'
import Csrf from 'fastify-csrf'
import undici from 'undici'
import {
  FastifyServerOptions,
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify'

// TODOs

// add https errors
// add config to app

async function authorization(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  const { httpErrors, config } = app

  const client = undici('https://www.googleapis.com', {}) // TODO types?? also url

  app.register(OAuth, {
    name: 'google',
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
    callbackUri: 'http://localhost:3000/login/google/callback', // TODO change if in prod?
    scope: ['user:email', 'user:profile'], // TODO maybe 'userinfo' instead of just user see https://developers.google.com/identity/protocols/oauth2/scopes#oauth2

    // add tags for the scheme TODO look into if/when we need to do this:
    tags: ['google', 'oauth2'],
    schema: {
      tags: ['google', 'oauth2'],
    },
  })

  app.register(Cookie, {
    secret: 'CONFIG.COOKIE_SECRET', // TODO
  })

  // When using session w/ cookies, should use CSRF
  app.register(Csrf, {
    sessionPlugin: 'fastify-cookie',
    cookieOpts: { signed: true },
  })

  app.decorate('authorize', authorize)

  app.decorate(
    'isUserAllowed',
    'testing' === 'testing' ? isUserAllowedMock : isUserAllowed
  )

  app.decorateRequest('user', null)

  async function authorize(request: FastifyRequest, reply: FastifyReply) {
    const { user_session } = request.cookies
    if (!user_session) {
      throw httpErrors.unauthorized('Missing session cookie')
    }

    const cookie = request.unsignCookie(user_session)
    if (!cookie.valid) {
      throw httpErrors.unauthorized('Invalid cookie signature')
    }

    let mail
    try {
      mail = await app.isUserAllowed(cookie.value ?? 'NOT REAL USER') // TODO better way to do this
    } catch (error) {
      request.log.warn(
        `Invalid user tried to authenticate: ${JSON.stringify(error.user)}`
      )
      // clear the cookie as well in case of errors:
      // this way if a user retries the request we'll have an additional request to Google
      // reply.clearCookie('user_session', { path: '/_app' }) // TODO what do I use for path? TODO see if we need to add path like <-- this
      reply.clearCookie('user_session')
      throw error
    }

    // TODO this is where we should probably create the user if the user doesn't already exist
    // behavior etc. will be different depending on if user exists or not

    // add the user's email to the request object
    request.user = { mail }
  }

  async function isUserAllowed(token: string): Promise<string | void> {
    // TODO the undici types seem really poor
    const response = await client.request({
      method: 'GET',
      path: '/user/emails',
      headers: {
        'User-Agent': 'scurte', // TODO figure out this user agent thing?
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

    // TODO don't really need this, but good to keep here cuz might be a useful pattern for roles/permissions
    const allowedUsers = ['sbrownbourne@gmail.com']
    const isAllowed = payload.some((element: any) =>
      allowedUsers.includes(element.email)
    )
    if (!isAllowed) {
      const error = httpErrors.forbidden('You are not allowed to access this')
      // let's store the user info so we can log them later
      error.user = payload
      throw error
    }

    for (const element of payload) {
      if (element.primary) {
        return element.email
      }
    }
    throw httpErrors.badRequest('The user does not have a primary email')
  }

  // this mock only tests the success case, make sure to test/mock the failure case
  async function isUserAllowedMock(token: string) {
    // TODO magic number
    if (token === 'invalid') {
      throw httpErrors.forbidden('You are not allowed to access this')
    }
    const allowedUsers = ['sbrownbourne@gmail.com']
    return allowedUsers[0]
  }
}

export default fastifyPlugin(authorization, {
  name: 'authorization',
})
