import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

import { RegisterOrgUseCase } from '../register-org'

export const makeRegisterOrgUseCase = (): RegisterOrgUseCase => {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()

  const registerOrgUseCase = new RegisterOrgUseCase(
    prismaOrgsRepository,
    prismaAddressesRepository,
  )

  return registerOrgUseCase
}
