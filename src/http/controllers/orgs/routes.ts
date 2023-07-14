import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { registerOrg } from './register-org'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/sessions', authenticate)
}
