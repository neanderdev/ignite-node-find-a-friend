import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticate } from './authenticate'
import { findNotAdoptedPets } from './find-not-adopted-pets'
import { refresh } from './refresh'
import { registerOrg } from './register-org'
import { registerPet } from './register-pet'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/orgs/pets', findNotAdoptedPets)

  app.post(
    '/orgs/pets',
    {
      onRequest: [verifyJwt],
    },
    registerPet,
  )
}
