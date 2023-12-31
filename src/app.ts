import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { orgsRoutes } from './http/controllers/orgs/routes'

import { env } from './env'

export const app = fastify()

// Register JWT plugin
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// Register Cookies plugin
app.register(fastifyCookie)

// Register routes
app.register(orgsRoutes)

// Register error handler
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    console.error(error.issues)

    return reply
      .status(400)
      .send({ message: 'Validation Error!', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Send error to Sentry/Datadog/NewRelic/etc
  }

  return reply.status(500).send({ message: 'Internal Server Error!' })
})
