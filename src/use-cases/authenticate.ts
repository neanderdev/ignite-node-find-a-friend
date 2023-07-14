import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, org.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
